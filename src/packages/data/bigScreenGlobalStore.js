import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const usebigScreenStore = defineStore('bigScreenStore', () => {


  // 画布相关的信息
    let canvasContaniter = reactive({
      width: 1000,
      height: 1000,
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
    let obj = {
      focus: [],
      unfocused: []
    }
    function getValue(block) {
      if (block.focus) {
        obj.focus.push(block)
      } else {
        obj.unfocused.push(block)
      }
      block?.children?.length && block.children.forEach(item => {
        getValue(item)
      })
    }
    state.blocks.forEach(block => getValue(block))
    return obj
  });

    // 最后选择的那一个
  // const lastSelectBlock = computed(()=>state.blocks[state.selectIndex])
  const lastSelectBlock = computed(() => {
    let lasteBlock
    function getValue(obj) {
      if (obj.uuid === state.selectIndex) {
        lasteBlock = obj
        return
      }
      if (obj.children?.length) {
        obj.children.forEach(item => getValue(item))
      }
    }

    state.blocks.forEach( block => getValue(block))

    return lasteBlock
  })


  // 让所有block 失去焦点
  const clearBlockFocus = (clearDoubleClick = true) => {
    function clearBlock(obj) {
      obj.focus = false
      if (clearDoubleClick) {
        obj.doubleClick = false
      }
      obj.children?.length && obj.children.forEach(item => {
        clearBlock(item)
      })
    }

    state.blocks.forEach(block =>  clearBlock(block));
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

  // 找到 blocks 的某一条数据
  const findOneBlock = (parent = []) => {
    let block = null
    if (!parent.length) return block
    parent.reduce((acur, cur, index, arr) => {
      let obj = acur.find( block => block.uuid === cur)
      if (index === arr.length - 1) {
        block = obj
        return obj
      } else {
        return obj.children
      }
    },state.blocks)
    return block
  }

  // 更新某一条 block 的数据
  const updateOneBlockData = (parent = [], data = {}) => {
    let block = findOneBlock(parent)
    Object.keys(data).forEach(key => {
      block[key] = data[key]
    })
  }



  return {
    canvasContaniter,
    state,
    focusData,
    lastSelectBlock,
    clearBlockFocus,
    updateCanvasContaniter,
    updateBigScreenState,
    findOneBlock,
    updateOneBlockData
  };
});
