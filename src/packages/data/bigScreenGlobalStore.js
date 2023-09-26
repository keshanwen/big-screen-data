import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const usebigScreenStore = defineStore('bigScreenStore', () => {


  // 画布相关的信息
    let canvasContaniter = reactive({
      width: 600,
      height: 600,
      scale: 1
    })

  // 画布上的组件
  let state = reactive({
    blocks: [
      // { top: 100, left: 100, zIndex: 1, key: 'text', uuid: 0 },
      // { top: 200, left: 200, zIndex: 1, key: 'button', uuid: 1 },
    ],
    selectIndex: -1, // 表示没有任何一个被选中
  });

  // 失焦，和未失焦的block
  const focusData = computed(() => {
      let focus = [];
      let unfocused = [];
      state.blocks.forEach(block => (block.focus ? focus : unfocused).push(block));
      return { focus, unfocused }
  });

    // 最后选择的那一个
  // const lastSelectBlock = computed(()=>state.blocks[state.selectIndex])
  const lastSelectBlock = computed(() => {
    return state.blocks.find((item) => {
      return item.uuid == state.selectIndex
    })
  })


  // 让所有block 失去焦点
   const clearBlockFocus = () => {
        state.blocks.forEach(block => block.focus = false);
    }

  // 更新画布相关的信息
  const updateCanvasContaniter = (obj) => {
    Object.keys(obj).forEach((key) => {
      canvasContaniter[key] = obj[key]
    })
  }

  // 更新状态
  const updateBigScreenState = (key, value) => {
    key.split('.').reduce((aum, cur, index, arr) => {
      if (index === arr.length - 1) {
        state[cur] = value
      }
      return state[cur]
    }, state)
  }



  return {
    canvasContaniter,
    state,
    focusData,
    lastSelectBlock,
    clearBlockFocus,
    updateCanvasContaniter,
    updateBigScreenState
  };
});
