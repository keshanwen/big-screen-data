import { onUnmounted } from 'vue';
import { cloneDeep } from '../utils/util';
import { events } from '../utils/events';
import { START, END } from '../config/eventName';
import { useCalculateEditorBlockGroup, useRemoveBlockGroup } from './useGroup';

export function useCommand(bigScreenStore) {
  const state = {
    // 前进后退需要指针
    current: -1, // 前进后退的索引值
    queue: [], //  存放所有的操作命令
    commands: {}, // 制作命令和执行功能一个映射表  undo : ()=>{}  redo:()=>{}
    commandArray: [], // 存放所有的命令
    destroyArray: [],
  };

  const registry = (command) => {
    state.commandArray.push(command);
    state.commands[command.name] = (...args) => {
      // 命令名字对应执行函数
      const { redo, undo } = command.execute(...args);
      redo();
      if (!command.pushQueue) {
        // 不需要放到队列中直接跳过即可
        return;
      }
      let { queue, current } = state;

      // 如果先放了 组件1 -》 组件2 => 组件3 =》 组件4 - -》 组件3
      // 组件1 -> 组件3
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1); // 可能在放置的过程中有撤销操作，所以根据当前最新的current值来计算新的对了
        state.queue = queue;
      }
      queue.push({ redo, undo }); // 保存指令的前进后退
      state.current = current + 1;
      console.log(queue);
    };
  };

  // 注册我们需要的指令
  /* 删除 */
  registry({
    name: 'delete', // 删除
    pushQueue: true,
    execute() {
      let state = {
        before: cloneDeep(bigScreenStore.state.blocks), // 当前的值
        after: bigScreenStore.focusData.unfocused, // 选中的都删除了 留下的都是没选中的
      };
      return {
        redo: () => {
          bigScreenStore.updateBigScreenState('blocks', state.after);
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', state.before);
        },
      };
    },
  });

  /* 分组 */
  registry({
    name: 'group', // 分组
    pushQueue: true,
    execute() {
      let befrorState = cloneDeep(bigScreenStore.state.blocks);
      return {
        redo: () => {
          let focusData = bigScreenStore.focusData.focus;
          let unfocused = bigScreenStore.focusData.unfocused;
          let focusDataParent = focusData[0].parent;
          let outerUnfocused = bigScreenStore.state.blocks.filter(
            (item) => !item.focus
          ); // 最外层没有获取焦点的数据

          let newBlock = useCalculateEditorBlockGroup(focusData);
          let parentBlock = cloneDeep(newBlock);

          console.log(focusDataParent, 'focusDataParent~~~~');
          newBlock.children = focusData;
          // 给子节点添加 parent 属性,
          // parent => '1,2,3,4,5' 将 uuid 组成一个 用逗号分割的字符串
          newBlock.children.forEach((item) => {
            const { uuid } = parentBlock;
            if (!item.parent?.length) {
              item.parent = [uuid];
            } else {
              item.parent.unshift(uuid);
            }
          });

          // 如果没有parent，则说明是最外层
          if (!focusDataParent?.length) {
            // 这里不能简单的将 unfocused 的 数据进行，合并。因为 focusData中有儿子，肯定也没有focused, 所以重复了
            let newBlocks = cloneDeep([newBlock, ...outerUnfocused]);
            bigScreenStore.updateBigScreenState('blocks', newBlocks);
          } else {
            const blocks = cloneDeep(bigScreenStore.state.blocks)
            let outerUnfocused = []
            let outerFocused = {}
            blocks.forEach(item => {
              if (item.uuid === focusDataParent[0]) {
               outerFocused = item
              } else {
                outerUnfocused.push(item)
              }
            })
            // 对 outerFocused 操作
            focusDataParent.reduce((aur,cur,index, arr) => {

            },outerFocused)
          }
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', befrorState);
        },
      };
    },
  });

  /* 解除分组 */
  registry({
    name: 'removeGroup',
    pushQueue: true,
    execute() {
      let befrorState = cloneDeep(bigScreenStore.state.blocks);
      return {
        redo: () => {
          let lastSelectBlock = bigScreenStore.lastSelectBlock;
          let unfocused = bigScreenStore.focusData.unfocused;
          let childrens = useRemoveBlockGroup(lastSelectBlock);
          let newBlocks = cloneDeep([...childrens, ...unfocused]);
          bigScreenStore.updateBigScreenState('blocks', newBlocks);
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', befrorState);
        },
      };
    },
  });

  onUnmounted(() => {
    // 清理绑定的事件
    state.destroyArray.forEach((fn) => fn && fn());
  });
  return state;
}
