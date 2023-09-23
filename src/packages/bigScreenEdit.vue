<template>
  <div ref="wrapper" class="big-screen-edit-home">
    <!-- 尺子组件 -->
    <SketchRule ref="sketchRuleRef"/>
    <div ref="screenRef" class="editor-container" @scroll="handleScroll"  @wheel="handleWheel">
      <!-- 这个是虚假内容， 为了产生滚动条 -->
      <div ref="containerRef" class="editor-container-canvas">
        <div ref="canvasRef" :style="canvasStyle" class="editor-container-canvas__content">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef,onMounted, computed, effect, reactive, watch, nextTick } from 'vue';
import SketchRule from "./components/sketchRule.vue"
import { useEditScreenStore } from './data/bigScreenGlobalStore'
import { THICK } from './config/sketchRuler'

let sketchRuleRef = shallowRef()
let wrapper = shallowRef()
let screenRef = shallowRef()
let canvasRef = shallowRef()

const editScreenStore = useEditScreenStore()

const canvasStyle = computed(() => {
  return {
      width: editScreenStore.canvasContaniter.width + 'px',
      height: editScreenStore.canvasContaniter.height + 'px',
      transform: `scale(${editScreenStore.canvasContaniter.scale})`
  }
})

 const getScreenWidthHeight = () => {
   let { width, height } = wrapper.value.getBoundingClientRect()
   sketchRuleRef.value.updateSketchRuleState({
      width, height
   })
}

const handleScroll = () => {
   const screensRect = screenRef.value.getBoundingClientRect()
  const canvasRect = canvasRef.value.getBoundingClientRect()
  const scale = editScreenStore.canvasContaniter.scale
  // 标尺开始的刻度
  const startX =
    (screensRect.left + THICK - canvasRect.left) / scale
  const startY = (screensRect.top + THICK - canvasRect.top) / scale
  sketchRuleRef.value.updateSketchRuleState({
    startX,
    startY
  })
}

 // 控制缩放值
const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const nextScale = parseFloat(
          Math.max(0.2, editScreenStore.canvasContaniter.scale - e.deltaY / 500).toFixed(2)
        )
        editScreenStore.updateCanvasContaniter({
          scale: nextScale
        })
        console.log(nextScale)
      }
      nextTick(() => {
        handleScroll()
      })
    }



const init = () => {
   getScreenWidthHeight()
}



onMounted(() => {
 init()
})

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
