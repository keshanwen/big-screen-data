import { onUnmounted } from 'vue';
import { cloneDeep, findOneBlock } from '../utils/util';
import { events } from '../utils/events';
import { START, END } from '../config/eventName';
import { useCalculateEditorBlockGroup, useRemoveBlockGroup } from './useGroup';
import { isLock } from '../hooks/useFocus'

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
      // console.log(queue);
    };
  };

  // 注册我们需要的指令
  /* 锁定  */
  registry({
    name: 'lock',
    pushQueue: true,
    execute(currentBlock) {
      let state = {
        before: cloneDeep(bigScreenStore.state.blocks), // 当前的值
        after: bigScreenStore.focusData.unfocused, // 选中的都删除了 留下的都是没选中的
      };
      return {
        redo: () => {
          if (currentBlock.focus) {
            let focusData = bigScreenStore.focusData.focus;
            focusData.forEach(block => {
              block.lock = true
              block.focus = false
            })
          } else {
            currentBlock.lock = true
          }

        },
        undo: () => {

        },
      };
    },
  });

  /* 解锁  */
  registry({
    name: 'unlock',
    pushQueue: true,
    execute(currentBlock) {
      let state = {
        before: cloneDeep(bigScreenStore.state.blocks), // 当前的值
        after: bigScreenStore.focusData.unfocused, // 选中的都删除了 留下的都是没选中的
      };
      return {
        redo: () => {
          currentBlock.lock = false
          // 解锁的时候要考虑，不同级的 focus 状态
          currentBlock.focus = !isLock(currentBlock, bigScreenStore)
        },
        undo: () => {

        },
      };
    },
  });

  /* 删除 */
  registry({
    name: 'delete', // 删除
    pushQueue: true,
    execute(currentBlock) {
      let state = {
        before: cloneDeep(bigScreenStore.state.blocks), // 当前的值
        after: bigScreenStore.focusData.unfocused, // 选中的都删除了 留下的都是没选中的
      };
      return {
        redo: () => {
          let focusData = cloneDeep(bigScreenStore.focusData.focus);
          let prevParent = cloneDeep(focusData[0].parent || []);
          if (!currentBlock.focus) {
            focusData = [currentBlock]
            prevParent = focusData[0].parent || []
          }
          let blocks = cloneDeep(bigScreenStore.state.blocks)
          if (prevParent.length) { // 删除的不是最外层的
            let parent = findOneBlock(prevParent, blocks)
            parent.children = parent.children.filter(item => !focusData.some(jtem => jtem.uuid === item.uuid))
            if (!parent?.children?.length) { // 如果删除掉了一个组的所有子元素，
              let { uuid, parent: grandParent = [] } = parent
              if (grandParent.length) {
                let grandParentBlock = findOneBlock(grandParent, blocks)
                grandParentBlock.children = grandParentBlock.children.filter( item => item.uuid !== uuid)
              } else { // 父元素是最外层元素
                blocks = blocks.filter( item => item.uuid !== uuid)
              }
            }
          } else { // 删除的是最外层的
            blocks = blocks.filter(item => !focusData.some( jtem => jtem.uuid === item.uuid))
          }
          bigScreenStore.updateBigScreenState('blocks', blocks);
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
          let focusData = cloneDeep(bigScreenStore.focusData.focus);
          let prevParent = cloneDeep(focusData[0].parent || []);
          let outerUnfocused = bigScreenStore.state.blocks.filter(
            (item) => !item.focus
          ); // 最外层没有获取焦点的数据

          let newBlock = useCalculateEditorBlockGroup(focusData);

          newBlock.children = focusData.map(item => {
            item.halfFocus = true
            return item
          })
          // 注意 newBlock 也要加上 parent 属性
          newBlock.parent = prevParent
          const { uuid } = newBlock;

          /*
            给子节点添加 parent 属性
            如何更新子节点的 parent 属性?


            1, 在最外层成组 -> children 没有 parent 属性， parent: [newBlokUuid]
               如果在最外层成组， 那么在更新 children 的 parent 属性时， newBlockUuid 应该放在子 children 的第一位， 判断依据是 获取焦点没有 parent 值

            2, 不是在最外层， 成组。 将新的 newBlockUuid 放到原先 parent 最后一位的后面。
            （或者， 拿到父节点的parent, [...父节点parent, 当前节点parent 的最后一位]）


          */
          function addParent(obj) {
            if (!obj.parent?.length) {
              obj.parent = [uuid]
            } else {
              if (prevParent.length) {
                let lastParent = prevParent[prevParent.length - 1]
                let index = obj.parent.findIndex(item => item === lastParent) + 1
                obj.parent.splice(index,0,uuid)
              } else {
                obj.parent.unshift(uuid)
              }
            }

            if (obj.children?.length) {
              obj.children.forEach( item => addParent(item))
            }
          }

          // 给子节点添加 parent 属性,
          newBlock.children.forEach((jtem) => {
           addParent(jtem)
          });


          function updateChildren(obj) {
            obj.children = obj.children.filter(item => {
              const exit = focusData.some(jtem => jtem.uuid === item.uuid)
              return !exit
            })
            obj.children.unshift(newBlock)
          }


          // 如果没有parent，则说明是最外层
          if (!prevParent?.length) {
            // 这里不能简单的将 unfocused 的 数据进行，合并。因为 focusData中有儿子，肯定也没有focused, 所以重复了
            let newBlocks = cloneDeep([newBlock, ...outerUnfocused]);
            bigScreenStore.updateBigScreenState('blocks', newBlocks);
          } else {
            let blocks = cloneDeep(bigScreenStore.state.blocks)
            prevParent.reduce((accumulator,currentValue,currentIndex, array) => {
              let obj = accumulator.find(item => item.uuid === currentValue)
              if (array.length - 1 === currentIndex) {
                updateChildren(obj)
                return obj
              } else {
                return obj.children
              }
            }, blocks)
            bigScreenStore.updateBigScreenState('blocks', blocks);

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
          let lastSelectBlock = cloneDeep(bigScreenStore.lastSelectBlock);
          let blocks = cloneDeep(bigScreenStore.state.blocks)
          let { parent, uuid } = lastSelectBlock

          function updateParentPoint(obj) {
            let { parent } = obj
            let index = parent.findIndex(item => item === uuid)
            obj.parent.splice(index, 1)

            obj.children?.forEach(item => updateParentPoint(item))
          }

          function updateChildren(obj) {
            // console.log(obj, 'obj~~~~~~')
            const newChildren = useRemoveBlockGroup(lastSelectBlock) || []
            // 改变 newChildren 的 parent 的指向
            newChildren.forEach(jtem => {
              updateParentPoint(jtem)
            })
            obj.children = obj.children.filter(item => item.uuid !== uuid)
            obj.children = [...newChildren, ...obj.children]
          }

          if (parent?.length) {
            parent.reduce((accumulator, currentValue, currentIndex, array) => {
              let obj = accumulator.find(item => item.uuid === currentValue)
              if (currentIndex === array.length - 1) {
                updateChildren(obj)
                return obj
              } else {
                return obj.children
              }
            }, blocks)
            bigScreenStore.updateBigScreenState('blocks', blocks);
          } else {
            const newChildren = useRemoveBlockGroup(lastSelectBlock) || []
            // 改变 newChildren 的 parent 的指向
            newChildren.forEach(jtem => {
              updateParentPoint(jtem)
            })
            blocks = blocks.filter(item => item.uuid !== uuid)
            blocks = [...newChildren, ...blocks]
            bigScreenStore.updateBigScreenState('blocks', blocks);
                      }
          // console.log(JSON.stringify(blocks, null, 2))
          // console.log(parent, 'parent~~~~')
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
