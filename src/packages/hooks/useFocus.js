export function useFocus(bigScreenStore, callback) {

  const containerMousedown = () => {
    bigScreenStore.clearBlockFocus(); // 点击容器让选中的失去焦点
  };

  const blockMousedown = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    // block上我们规划一个属性 focus 获取焦点后就将focus变为true
    if (e.shiftKey) {
      block.focus = !block.focus;
    } else {
      if (!block.focus) {
        bigScreenStore.clearBlockFocus();
        block.focus = true; // 要清空其他人foucs属性
      } else {
        block.focus = false;
      }
    }
    callback && callback(e);
  };

  return {
    containerMousedown,
    blockMousedown,
  };
}
