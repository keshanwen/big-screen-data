<template>
  <!-- width -->
  <div
    class="block-resize block-resize-left"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'start', vertical: 'center' })
    "
  ></div>
  <div
    class="block-resize block-resize-right"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'end', vertical: 'center' })
    "
  ></div>
  <!-- height -->
  <div
    class="block-resize block-resize-top"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'center', vertical: 'start' })
    "
  ></div>
  <div
    class="block-resize block-resize-bottom"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'center', vertical: 'end' })
    "
  ></div>
  <!-- width height  -->
  <div
    class="block-resize block-resize-top-left"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'start', vertical: 'start' })
    "
  ></div>
  <div
    class="block-resize block-resize-top-right"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'end', vertical: 'start' })
    "
  ></div>
  <div
    class="block-resize block-resize-bottom-left"
    @mousedown="
      (e) => onmousedown(e, { horizontal: 'start', vertical: 'end' })
    "
  ></div>
  <div
    class="block-resize block-resize-bottom-right"
    @mousedown="(e) => onmousedown(e, { horizontal: 'end', vertical: 'end' })"
  ></div>
</template>
<script setup>

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

let data = {};

const onmousedown = (e, direction) => {
  e.stopPropagation();
  data = {
    startX: e.clientX,
    startY: e.clientY,
    startWidth: props.block.width,
    startHeight: props.block.height,
    startLeft: props.block.left,
    startTop: props.block.top,
    direction,
  };
  document.body.addEventListener('mousemove', onmousemove);
  document.body.addEventListener('mouseup', onmouseup);
};

const onmousemove = (e) => {
  let { clientX, clientY } = e;
  let {
    startX,
    startY,
    startWidth,
    startHeight,
    startLeft,
    startTop,
    direction,
  } = data;

  if (direction.horizontal == 'center') {
    // 如果拖拽的是 中间的点 X轴是不变的
    clientX = startX;
  }
  if (direction.vertical == 'center') {
    // 只能改横向 纵向是不发生变化的
    clientY = startY;
  }

  let durX = clientX - startX;
  let durY = clientY - startY;

  if (direction.vertical == 'start') {
    // 针对反向拖拽的点 需要取反，拿到正确的组件top和left
    durY = -durY;
    props.block.top = startTop - durY;
  }
  if (direction.horizontal == 'start') {
    durX = -durX;
    props.block.left = startLeft - durX;
  }

  const width = startWidth + durX;
  const height = startHeight + durY;

  props.block.width = width;
  props.block.height = height; // 拖拽的时候 改变了宽高
  props.block.hasResize = true;
};

const onmouseup = () => {
  document.body.removeEventListener('mousemove', onmousemove);
  document.body.removeEventListener('mouseup', onmouseup);
};
</script>

<style lang="scss" scoped>
.block-resize {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgb(15, 65, 204);
  z-index: 1000;
  user-select: none;
}

.block-resize-top {
  top: -4px;
  left: calc(50% - 4px);
  cursor:n-resize
}

.block-resize-bottom {
  bottom: -4px;
  left: calc(50% - 4px);
  cursor:s-resize
}

.block-resize-left {
  top: calc(50% - 4px);
  left: -4px;
  cursor:e-resize
}

.block-resize-right {
  top: calc(50% - 4px);
  right: -4px;
  cursor:w-resize
}
.block-resize-top-left {
  top: -4px;
  left: -4px;
  cursor:nw-resize
}
.block-resize-top-right {
  top: -4px;
  right: -4px;
  cursor: ne-resize
}
.block-resize-bottom-left {
  bottom: -4px;
  left: -4px;
  cursor:sw-resize
}
.block-resize-bottom-right {
  bottom: -4px;
  right: -4px;
  cursor: se-resize
}
</style>
