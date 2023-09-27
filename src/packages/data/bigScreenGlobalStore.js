import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const usebigScreenStore = defineStore('bigScreenStore', () => {


  // 画布相关的信息
    let canvasContaniter = reactive({
      width: 600,
      height: 600,
      scale: 1
    })


/*
  blocks: [
      { top: 100, left: 100, zIndex: 1, key: 'text', uuid: 0 },
      { top: 200, left: 200, zIndex: 2, key: 'button', uuid: 1 },
      { top: 300, left: 300, zIndex: 3, key: 'bar', uuid: 2 },
      {
        top: 400, left: 100, zIndex: 6, uuid: 5,group: true ,groupName: '分组1',children: [
          { top: 400, left: 400, zIndex: 4, key: 'text', uuid: 3 },
          { top: 500, left: 500, zIndex: 5, key: 'button', uuid: 4 },
          {
            top: 400, left: 100, zIndex: 7, uuid: 6, group: true, groupName: '分组2',
            children: [
               { top: 400, left: 400, zIndex: 9, key: 'text', uuid: 7 },
              { top: 500, left: 500, zIndex: 10, key: 'button', uuid: 8 },
            ]
          }
      ]}, */

  // 画布上的组件
  let state = reactive({
    blocks: [
      // { top: 500, left: 100, zIndex: 1, key: 'text', uuid: 0 },
      // { top: 500, left: 500, zIndex: 2, key: 'button', uuid: 1 },
      // { top: 300, left: 300, zIndex: 3, key: 'bar', uuid: 2 },
      // {
      //   top: 400, left: 100, zIndex: 6, uuid: 5, group: true, groupName: '分组1', focus: true,
      //   children: [
      //     { top: 400, left: 400, zIndex: 4, key: 'text', uuid: 3, width: 90, height:24 },
      //     { top: 200, left: 200, zIndex: 5, key: 'button', uuid: 4, width: 116, height: 32 },
      // ]},

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
