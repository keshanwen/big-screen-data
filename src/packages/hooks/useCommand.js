import { onUnmounted } from 'vue';
import { cloneDeep } from '../utils/util';
import { events } from '../utils/events';
import { START, END } from '../config/eventName';
import { useCalculateEditorBlockGroup, useRemoveBlockGroup } from './useGroup'

export  function useCommand(bigScreenStore) {
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
          bigScreenStore.updateBigScreenState('blocks', state.after)
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', state.before)
        },
      };
    },
  });

  /* 分组 */
  registry({
    name: 'group', // 分组
    pushQueue: true,
    execute() {
      let befrorState = cloneDeep(bigScreenStore.state.blocks)
      return {
        redo: () => {
          let focusData = bigScreenStore.focusData.focus
          let unfocused = bigScreenStore.focusData.unfocused
          let newBlock = useCalculateEditorBlockGroup(focusData)
          newBlock.children = focusData
          let newBlocks = cloneDeep([newBlock, ...unfocused])
          bigScreenStore.updateBigScreenState('blocks', newBlocks)
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', befrorState)
        }
      }
    }
  })

  /* 解除分组 */
  registry({
    name: 'removeGroup',
    pushQueue: true,
    execute() {
      let befrorState = cloneDeep(bigScreenStore.state.blocks)
      return {
        redo: () => {
          let lastSelectBlock = bigScreenStore.lastSelectBlock
          let unfocused = bigScreenStore.focusData.unfocused
          let childrens = useRemoveBlockGroup(lastSelectBlock)
          let newBlocks = cloneDeep([...childrens, ...unfocused])
          bigScreenStore.updateBigScreenState('blocks', newBlocks)
        },
        undo: () => {
          bigScreenStore.updateBigScreenState('blocks', befrorState)
        }
      }
    }
  })

  onUnmounted(() => {
    // 清理绑定的事件
    state.destroyArray.forEach((fn) => fn && fn());
  });
  return state;
}
