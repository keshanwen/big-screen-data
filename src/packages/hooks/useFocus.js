import { cloneDeep } from '../utils/util'

function updateParentState() {

}


export function useFocus(bigScreenStore, callback) {

  const containerMousedown = (e) => {
    console.log(e, 'e~~~~')
    bigScreenStore.clearBlockFocus(); // 点击容器让选中的失去焦点
    bigScreenStore.updateBigScreenState('selectIndex',-1)
  };

  const updateBlockChildrenHalfFocus = (block) => {
    const { focus, parent = [], uuid, children = [] } = block
    const parentUuid = [...parent, uuid]
    if (!children.length) return
    bigScreenStore.updateOneBlockData(parentUuid, {}, (obj) => {
      if (obj.uuid === parentUuid[parentUuid.length - 1]) {
        obj.children.forEach( item => item.halfFocus = focus)
      }
    })
  }

    // 双击的回调
  const blockDoubleClick = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    bigScreenStore.clearBlockFocus()
    block.focus = true
    const { parent } = block
    if (parent?.length) {
      bigScreenStore.updateOneBlockData(parent, {
        doubleClick: true
      }, (obj) => {
        obj.halfFocus = true
      })
    }
    updateBlockChildrenHalfFocus(block)
  }

  const blockMousedown = (e, block, layerClick = false) => {
    // console.log(e.target, block, layerClick,'e~~~~~~')

    e.preventDefault();
    e.stopPropagation();
    let isNoLeve = false
    /* 只能聚焦同级节点 */
    if (block.parent?.length) {
      isNoLeve = bigScreenStore.focusData.focus.some(item => item.parent?.join() !== block.parent.join())
    } else {
      // 点的是最外层的节点
      isNoLeve = bigScreenStore.focusData.focus.some(item => item.parent?.length)
    }


    const { parent = [] } = block
    const grandParentBlockUuid = parent[0]

    let parentBlock;
    if (parent?.length) {
      parentBlock = bigScreenStore.findOneBlock(parent)
    }
    if (layerClick && parentBlock) {
      bigScreenStore.updateOneBlockData(parent, {
        doubleClick: true
      },(obj) => {
        obj.halfFocus = true
      })
    }
    // 如果不是双击，那么直接将 block 指向组先元素
    if(!parentBlock?.doubleClick && grandParentBlockUuid){
      // 改变 block 指向， 单击画布上的组件，将指向祖先 block 组件
      block = bigScreenStore.findOneBlock([grandParentBlockUuid])
    }
    if (isNoLeve) {
      // 如果从父节点 => 子节点， 那么会有问题， 会将 parentBlock.doubleClick重置为 false
      bigScreenStore.clearBlockFocus()
      if (layerClick && parentBlock) {
        bigScreenStore.updateOneBlockData(parent, {
          doubleClick: true
        },(obj) => {
          obj.halfFocus = true
        })
      }
      block.focus = true
    }
    // block上我们规划一个属性 focus 获取焦点后就将focus变为true
    if (e.shiftKey) {
      if (bigScreenStore.focusData.focus.length <= 1) {
        block.focus = true; // 当前只有一个节点被选中时 摁住shift键也不会切换focus状态
      } else {
          block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        bigScreenStore.clearBlockFocus(false);
        block.focus = true; // 要清空其他人foucs属性
      } // 当自己已经被选中了，在次点击时还是选中状态
    }
    bigScreenStore.updateBigScreenState('selectIndex', block.uuid)
    updateBlockChildrenHalfFocus(block)
    callback && callback(e);
  };


  return {
    containerMousedown,
    blockMousedown,
    blockDoubleClick
  };
}
