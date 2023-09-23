import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useEditScreenStore = defineStore('editScreenStore', () => {
  // 画布相关的信息
    const canvasContaniter = reactive({
      width: 550,
      height: 550,
      scale: 1
    })

  // 画布上的组件
  const state = reactive({
    blocks: [
      { top: 100, left: 100, zIndex: 1, key: 'text' },
      { top: 200, left: 200, zIndex: 1, key: 'button' },
      { top: 300, left: 300, zIndex: 1, key: 'input' },
    ],
  });



  return {
    canvasContaniter,
    state,
  };
});
