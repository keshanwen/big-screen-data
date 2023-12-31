<template>
  <div
    ref="blockRef"
    @mousedown="(e) => blockMousedown(e, props.block)"
    :style="blockStyles"
    :class="[
      props.block.focus ? 'editor-block-home-focus' : '',
      'editor-block-home',
    ]"
  >
    <component ref="componentRef" :is="getComponent()" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted,watch, nextTick } from 'vue';
import { registerConfig } from '../config/leftComponents';
import { usebigScreenStore } from '../data/bigScreenGlobalStore';
import { useFocus } from '../hooks/useFocus';
import { useBlockDragger } from '../hooks/useBlockDragger';

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
  mousedownFn: {
    type: Function,
  }
});

let blockRef = ref();
let componentRef = ref(null)

// 监听动态组件生成
watch(componentRef, (newVal, oldVal) => {
  if (newVal) {
    let { offsetWidth, offsetHeight } = blockRef.value;
    if (props.block.alignCenter) {
      // 说明是拖拽松手的时候才渲染的，其他的默认渲染到页面上的内容不需要居中
      props.block.left = props.block.left - offsetWidth / 2;
      props.block.top = props.block.top - offsetHeight / 2; // 原则上重新派发事件
      props.block.alignCenter = false; // 让渲染后的结果才能去居中
    }
    props.block.width = offsetWidth;
    props.block.height = offsetHeight;
  }
}, {
  deep: true,
  flush: 'post'
})

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore, (e) => {
  // 获取焦点后进行拖拽
  props.mousedownFn && props.mousedownFn(e)
  // mousedown(e);
});
// 实现组件拖拽
// let { mousedown, markLine } = useBlockDragger(bigScreenStore);


const blockStyles = computed(() => ({
  top: `${props.block.top}px`,
  left: `${props.block.left}px`,
  zIndex: `${props.block.zIndex}`,
}));

function getComponent() {
  // 通过block的key属性直接获取对应的组件
  const component = registerConfig.componentMap[props.block.key];
  // 获取render函数
  const RenderComponent = component.render;
  return RenderComponent;
}

</script>

<style lang="scss" scoped>
.editor-block-home {
  position: absolute;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.editor-block-home-focus {
  &::after {
    border: 2px dashed red;
  }
}
</style>
