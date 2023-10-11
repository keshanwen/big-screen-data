import { createUuid, createZIndex, cloneDeep } from '../utils/util';

function updateChildrenPosition(left, top, children, parent) {
  // 因为此时成组了。组先元素是 position: absolute. 那么其子元素现在定位是相对于，组的根节点，但是实际上为了其子节点的位置不变， 所以要减去差值
  children.forEach((item) => {
    if (parent) {
      item.left = item.left + left;
      item.top = item.top + top;
      // 要改变 parent 的指向
      // item.parent = parent;
    } else {
      item.left = item.left - left;
      item.top = item.top - top;
    }

    item.focus = false;
  });
}

// 是否需要更新所有父级元素
function ifUpdateAllParentState(bigScreenStore) {
  let focusData = bigScreenStore.focusData.focus || []
  if (!focusData[0]?.parent?.length) { // 如果操作的不是组内的元素
    return false
  }

  for (let i = 0; i < focusData.length; i++) {
    const block = focusData[i]
    const { left, top, parent, width, height } = block
    let parentBlock = bigScreenStore.findOneBlock(parent)
    let { width: parentWidth, height: parentHeight } = parentBlock

    if (left < 0 || top < 0 || left + width > parentWidth || top + height > parentHeight) {
      return true
    }
  }


  return false
}

// 找到最大偏移量
function findMaxOffset(bigScreenStore) {
  let state = {
    offsetTop: -Infinity,
    offsetBootom: -Infinity,
    offsetLeft: -Infinity,
    offsetRight: -Infinity
  }
  let focusData = bigScreenStore.focusData.focus

  for (let i = 0; i < focusData.length; i++) {
    const block = focusData[i]
    const { left, top, parent, width, height } = block
    let parentBlock = bigScreenStore.findOneBlock(parent)
    let { width: parentWidth, height: parentHeight } = parentBlock

    if (left < 0) {
      let absLeft = Math.abs(left)
      state.offsetLeft = state.offsetLeft < absLeft ? absLeft : state.offsetLeft
    }

    if (top < 0) {
      let absTop = Math.abs(top)
      state.offsetTop = state.offsetTop < absTop ? absTop : state.offsetTop
    }

    if (left + width > parentWidth) {
      let offsetRight = left + width - parentWidth
      state.offsetRight = state.offsetRight < offsetRight ? offsetRight : state.offsetRight
    }

    if (top + height > parentHeight) {
      let offsetBootom = top + height - parentHeight
      state.offsetBootom = state.offsetBootom < offsetBootom ? offsetBootom : state.offsetBootom
    }


  }

  return state
}

export const useCalculateEditorBlockGroup = (blocks) => {
  /* width height top left zindex */
  /*
    group 的 zIndex 是其所有子节点的最大值 + 1,
    left: minLfte,
    top: minY,
    // width: MaxLeft - minX + Max(width(MaxLeft)), (注意最小，最大值可能有重复)
    // height: MaxTop - minY + Max(height(MaxTop))  ----->> 逻辑有错误
    width: 最大的x - 最小的x
    height: 最大的y - 最小的y
    {
      top: 100,
      left: 100,
      zIndex: 3,
      group: true,
      groupName: xxxx,
      uuid: 2,
      width: xxx,
      height: xxxx,
      children: [
        { top: 100, left: 100, zIndex: 1, key: 'text', width: xxx, height: xxxx,uuid: 0 },
        { top: 100, left: 100, zIndex: 1, key: 'text',width: xxx, height: xxxx, uuid: 0 },
      ]
    }
    {
      left: 10,
      top: 10,
      zindex: 10,
      width:
    }
  */
  /*

   后期初始化的时候 将每个组件的 width height 写死，这样将不用去获取每个组件的 width heigh。 编辑的时候在获取位置信息时候，可能会有不同步的问题
  */
  let zIndex = -Infinity;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  blocks.forEach((item) => {
    const { zIndex: itemZIndex, left, top, width, height } = item;
    const blcokMaxX = left + width;
    const blockMaxY = top + height;
    if (itemZIndex > zIndex) {
      zIndex = itemZIndex;
    }
    if (left < minX) {
      minX = left;
    }
    if (top < minY) {
      minY = top;
    }
    if (blcokMaxX > maxX) {
      maxX = blcokMaxX;
    }
    if (blockMaxY > maxY) {
      maxY = blockMaxY;
    }
  });

  updateChildrenPosition(minX, minY, blocks);

  return {
    uuid: createUuid(),
    zIndex: createZIndex(), // zIndex 取当前的最大值，而不是子元素的最大值
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY,
    group: true,
    groupName: '分组',
    focus: true,
  };
};

export const useRemoveBlockGroup = (lastSelectBlock) => {
  const { left, top, parent = [] } = lastSelectBlock;
  // if (parent) {
  //   parent = cloneDeep(parent);
  // }
  updateChildrenPosition(left, top, lastSelectBlock.children, parent);
  return lastSelectBlock.children;
};

// 更新所有上级（组）的数据
export const useUpdateAllParentState = (bigScreenStore) => {
  /*

    找出所有 block 的 left 的最小值，正常情况 minLeft = 0, 如果 minLeft < 0 ||  minleft > 0 需要更新 parentBlock

    top 也是类此。

    找出所有 max(top + height) (实际上就是block 底部距离Parent block 的距离)
      max(top + height) 一定是等于 parentBlock 的 height，如果不相等那么需要更新 parentBlock

    max(left + width) 也是类此
  */
 if (ifUpdateAllParentState(bigScreenStore)) {
    let { offsetLeft, offsetRight, offsetTop, offsetBootom } = findMaxOffset(bigScreenStore)
    let focusData = bigScreenStore.focusData.focus
    let parentUuid = focusData[0].parent
    const parentBlock = bigScreenStore.findOneBlock(parentUuid)

    if (offsetTop > 0) {
      bigScreenStore.updateOneBlockData(parentUuid, {
        height: parentBlock.height + offsetTop,
        top: parentBlock.top - offsetTop,
        children: parentBlock.children.map(item => {
          item.top += offsetTop
          return item
        })
      })
    }
    if (offsetLeft > 0) {
      bigScreenStore.updateOneBlockData(parentUuid, {
        width: parentBlock.width + offsetLeft,
        left: parentBlock.left - offsetLeft,
        children: parentBlock.children.map(item => {
          item.left += offsetLeft
          return item
        })
      })
    }
    if (offsetRight > 0) {
      bigScreenStore.updateOneBlockData(parentUuid, {
        width: parentBlock.width + offsetRight,
      })
    }
    if (offsetBootom > 0) {
      bigScreenStore.updateOneBlockData(parentUuid, {
        height: parentBlock.height + offsetBootom,
      })
    }
  } else {
    console.log('no')
  }
}