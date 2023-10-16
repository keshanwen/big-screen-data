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
          <div
            v-for="block in bigScreenStore.state.blocks"
            :key="block.uuid"
            @contextmenu="(e) => onContextMenuBlock(e, block)"
            class="all-block-wrap"
          >
            <EditorBlockGroup v-if="block.group" :block="block" />
            <EditorBlock v-else :block="block" />
          </div>
          <!-- 对齐线 -->
          <snapline :markLine="markLine" />
          <!-- 勾选框 -->
          <CheckBox :positionData="positionData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import {
  ref,
  shallowRef,
  onMounted,
  computed,
  effect,
  reactive,
  watch,
  nextTick,
  inject,
  provide
} from 'vue';
import SketchRule from './layout/sketchRule.vue';
import { usebigScreenStore } from './data/bigScreenGlobalStore';
import { useSketchRule } from './hooks/useSketchRule';
import { useFocus } from './hooks/useFocus';
import { useBlockDragger } from './hooks/useBlockDragger';
import EditorBlock from './layout/block/editorBlock.vue';
import snapline from './layout/snapline.vue';
import EditorBlockGroup from './layout/block/editorBlockGroup.vue'
import { $dropdown, DropdownItem } from './layout/dialog/dropdown.jsx'
import { COMMAND, MOUSEDOWN } from './config/provideInjectKey'
import { useContextMenu } from './hooks/useContextMenu.jsx'
import CheckBox from './layout/checkBox.vue'
import { useCheckBox } from './hooks/useCheckBox'

const command = inject(COMMAND) as any


let sketchRuleRef = ref();
let wrapper = ref();
let screenRef = ref();
let canvasRef = ref();

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore, (e) => {
  // 获取焦点后进行拖拽
  mousedown(e)
});
const { handleScroll: handleScrollSketRule, handleWheel: handleWheelSketRule } =
  useSketchRule();
let { mousedown, markLine } = useBlockDragger(bigScreenStore);

// 将  mousedown 传递下去
provide(MOUSEDOWN, mousedown)

const { containerMousedown, positionData } = useCheckBox(bigScreenStore, canvasRef)

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

const onContextMenuBlock = (e, block) => {
  e.preventDefault();
  const showConent: any = useContextMenu(bigScreenStore, command,block)

  function content() {
    return showConent.map(item => {
      return (
        <DropdownItem
          key={ item.label }
          label={ item.label }
          icon={ item.icon }
          onClick={item.onClick}
           ></DropdownItem>
      )
    })
  }

  $dropdown({
    el: e.target, // 以哪个元素为准产生一个dropdown
    content
  });
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
      &__content:active {
        cursor: crosshair;
      }
    }
  }

  .all-block-wrap {
    cursor: move;
  }
}
</style>
