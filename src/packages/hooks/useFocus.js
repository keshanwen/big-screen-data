export function useFocus(bigScreenStore, callback) {

  const containerMousedown = () => {
    bigScreenStore.clearBlockFocus(); // 点击容器让选中的失去焦点
    bigScreenStore.updateBigScreenState('selectIndex',-1)
  };

  const blockMousedown = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    // block上我们规划一个属性 focus 获取焦点后就将focus变为true
    if (e.shiftKey) {
      if (bigScreenStore.focusData.focus.length <= 1) {
        block.focus = true; // 当前只有一个节点被选中时 摁住shift键也不会切换focus状态
      } else {
          block.focus = !block.focus;
      }
    } else {
      if (!block.focus) {
        bigScreenStore.clearBlockFocus();
        block.focus = true; // 要清空其他人foucs属性
      } // 当自己已经被选中了，在次点击时还是选中状态
    }
    bigScreenStore.updateBigScreenState('selectIndex', block.uuid)
    callback && callback(e);
  };

  return {
    containerMousedown,
    blockMousedown,
  };
}
