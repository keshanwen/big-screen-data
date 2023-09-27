import { createUuid } from '../utils/util'

function updateChildrenPosition(left, top, children) {
  // 因为此时成组了。组先元素是 position: absolute. 那么其子元素现在定位是相对于，组的根节点，但是实际上为了其子节点的位置不变， 所以要减去差值
  children.forEach(item => {
    item.left = item.left - left
    item.top = item.top - top
    item.focus = false
  })
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
  let zIndex = -Infinity
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity




  blocks.forEach(item => {
    const { zIndex: itemZIndex, left, top, width, height } = item
    const blcokMaxX = left + width
    const blockMaxY = top + height
    if (itemZIndex > zIndex) {
      zIndex = itemZIndex
    }
    if (left < minX) {
      minX = left
    }
    if (top < minY) {
      minY = top
    }
    if (blcokMaxX > maxX) {
      maxX = blcokMaxX
    }
    if (blockMaxY > maxY) {
      maxY = blockMaxY
    }
  });


  updateChildrenPosition(minX, minY, blocks)

  return {
    uuid: createUuid(),
    zIndex: zIndex + 1, // zIndex 取当前的最大值，而不是子元素的最大值
    left: minX,
    top: minY,
    width: maxX - minX,
    height: maxY - minY,
    group: true,
    groupName: '分组',
    focus: true
  };
};
