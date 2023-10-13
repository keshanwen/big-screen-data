import { reactive, nextTick } from "vue";
import { cloneDeep } from '../utils/util';

export function useCheckBox(bigScreenStore, canvasRef) {

  const positionData = reactive({
    top: null,
    left: null,
    width: null,
    height: null
  });
  const mouseData = {
    dragging: false,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }

  const judgeIsInner = (block) => {
    const { left: startX, top: startY, width, height } = block
    const endX = startX + width
    const endY = startY + height
     // block 全部在里面
/*     if (startX >= positionData.left && endX <= positionData.left + positionData.width && startY >= positionData.top && endY <= positionData.top + positionData.height) {
      return true
    }

    return false */

    // 交集
    if ((endX < positionData.left) || (endY < positionData.top) || (startX > positionData.left + positionData.width) || (startY > positionData.top + positionData.height)) {
      return false
    }
    return true

  }

  const containerMousedown = (e) => {
    mouseData.startX = e.offsetX
    mouseData.startY = e.offsetY
    setTimeout(() => {
      // 如果 300 毫秒后发现不是勾选功能，那么清空
      if (!mouseData.dragging) bigScreenStore.clearBlockFocus(); // 点击容器让选中的失去焦点
    },200)
    bigScreenStore.updateBigScreenState('selectIndex', -1);

    canvasRef.value.addEventListener('mousemove', containerMouseMove);
    canvasRef.value.addEventListener('mouseup', containerMouseUp);
  };

  const containerMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    mouseData.dragging = true
    mouseData.endX = mouseData.endX ? mouseData.endX + e.movementX : mouseData.startX + e.movementX
    mouseData.endY = mouseData.endY ? mouseData.endY + e.movementY : mouseData.startY + e.movementY
    positionData.width = Math.abs(mouseData.endX - mouseData.startX)
    positionData.height = Math.abs(mouseData.endY - mouseData.startY)
    positionData.left = Math.min(mouseData.startX,mouseData.endX)
    positionData.top = Math.min(mouseData.startY,mouseData.endY)
    bigScreenStore.state.blocks.forEach(item => {
      let isInner = judgeIsInner(item)
      item.checkFocus = isInner
    })
  };

  const containerMouseUp = (e) => {
    if (mouseData.dragging) {
      positionData.width = null
      positionData.height = null
      positionData.left = null
      positionData.top = null
      mouseData.startX = null
      mouseData.startY = null
      mouseData.endX = null
      mouseData.endY = null
      bigScreenStore.state.blocks.forEach(item => {
        if (item.checkFocus) item.focus = true
      })
    }
    mouseData.dragging = false
    canvasRef.value.removeEventListener('mousemove', containerMouseMove);
    canvasRef.value.removeEventListener('mouseup', containerMouseUp);
  };

  return {
    containerMousedown,
    containerMouseMove,
    containerMouseUp,
    positionData,
  };
}