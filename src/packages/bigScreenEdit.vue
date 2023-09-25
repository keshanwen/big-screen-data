<template>
  <div ref="wrapper" class="big-screen-edit-home">
    <!-- 尺子组件 -->
    <SketchRule ref="sketchRuleRef" />
    <div
      ref="screenRef"
      class="editor-container"
      @scroll="handleScroll"
      @wheel="handleWheel"
    >
      <!-- 这个是虚假内容， 为了产生滚动条 -->
      <div ref="containerRef" class="editor-container-canvas">
        <div
          ref="canvasRef"
          @mousedown="containerMousedown"
          :style="canvasStyle"
          id="editor-container-canvas__content"
          class="editor-container-canvas__content"
        >
          <template
            v-for="(block, index) in bigScreenStore.state.blocks"
            :key="block.uuid"
          >
            <EditorBlock :block="block" :index="index" :mousedownFn="mousedown" />
          </template>
          <!-- 辅助线 -->
          <GuideLines :markLine="markLine"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  shallowRef,
  onMounted,
  computed,
  effect,
  reactive,
  watch,
  nextTick,
} from 'vue';
import SketchRule from './layout/sketchRule.vue';
import { usebigScreenStore } from './data/bigScreenGlobalStore';
import { useSketchRule } from './hooks/useSketchRule';
import { useFocus } from './hooks/useFocus';
import { useBlockDragger } from './hooks/useBlockDragger';
import EditorBlock from './layout/editorBlock.vue';
import GuideLines from './layout/guideLines.vue';

let sketchRuleRef = ref();
let wrapper = ref();
let screenRef = ref();
let canvasRef = ref();

const bigScreenStore = usebigScreenStore();
const { containerMousedown } = useFocus(bigScreenStore);
const { handleScroll: handleScrollSketRule, handleWheel: handleWheelSketRule } =
  useSketchRule();
let { mousedown, markLine } = useBlockDragger(bigScreenStore);



const canvasStyle = computed(() => {
  return {
    width: bigScreenStore.canvasContaniter.width + 'px',
    height: bigScreenStore.canvasContaniter.height + 'px',
    transform: `scale(${bigScreenStore.canvasContaniter.scale})`,
  };
});

const getScreenWidthHeight = () => {
  let { width, height } = wrapper.value.getBoundingClientRect();
  sketchRuleRef.value.updateSketchRuleState({
    width,
    height,
  });
};

const handleScroll = () => {
  handleScrollSketRule(screenRef, canvasRef, sketchRuleRef, bigScreenStore);
};

// 控制缩放值
const handleWheel = (e) => {
  handleWheelSketRule(e, bigScreenStore, handleScroll);
};

const init = () => {
  getScreenWidthHeight();
};

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.big-screen-edit-home {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: aquamarine;
  box-sizing: border-box;
  .editor-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;

    &-canvas {
      width: 3000px;
      height: 3000px;
      position: relative;

      &__content {
        position: relative;
        top: 20px;
        left: 20px;
        background-color: ghostwhite;
        box-sizing: border-box;
        transform-origin: 0;
      }
    }
  }
}
</style>
