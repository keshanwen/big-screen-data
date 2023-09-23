<template>
  <div ref="wrapper" class="big-screen-edit-home">
    <div ref="screenRef" class="editor-container">
      <!-- 这个是虚假内容， 为了产生滚动条 -->
      <div ref="containerRef" class="editor-container-canvas">
        <div ref="canvasRef" :style="canvasStyle" class="editor-container-canvas__content"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useEditScreenStore } from './data/bigScreenGlobalStore'

const editScreenStore = useEditScreenStore()

const canvasStyle = computed(() => {
  return {
      width: editScreenStore.canvasContaniter.width + 'px',
      height: editScreenStore.canvasContaniter.height + 'px',
      transform: `scale(${editScreenStore.canvasContaniter.scale})`
  }
} )


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
        // width: 600px;
        // height: 600px;
        background-color: ghostwhite;

        transform-origin: 0;
      }
    }
  }
}
</style>
