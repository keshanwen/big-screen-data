import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const usebigScreenStore = defineStore('bigScreenStore', () => {


  // 画布相关的信息
    let canvasContaniter = reactive({
      width: 300,
      height: 300,
      scale: 1
    })

  // 画布上的组件
  let state = reactive({
    blocks: [
      { top: 100, left: 100, zIndex: 1, key: 'text' },
      { top: 200, left: 200, zIndex: 1, key: 'button' },
      { top: 300, left: 300, zIndex: 1, key: 'input' },
    ],
  });

  // 更新画布相关的信息
  const updateCanvasContaniter = (obj) => {
    Object.keys(obj).forEach((key) => {
      canvasContaniter[key] = obj[key]
    })
  }



  return {
    canvasContaniter,
    state,
    updateCanvasContaniter
  };
});
