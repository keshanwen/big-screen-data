import { nextTick } from 'vue';
import { cloneDeep, createUuid } from '../utils/util';

let zIndex = 0
export function useMenuDragger(bigScreenStore) {
  let currentComponent = null;
  const dragenter = (e) => {
    e.dataTransfer.dropEffect = 'move'; // h5拖动的图标
  };
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragleave = (e) => {
    e.dataTransfer.dropEffect = 'none';
  };

  const drop = (e) => {
    // 先留在这
    let blocks = bigScreenStore.state.blocks; // 内部已经渲染的组件
    const temporaryValue = cloneDeep([
      ...blocks,
      {
        uuid: createUuid(),
        top: e.offsetY,
        left: e.offsetX,
        zIndex: zIndex++,
        key: currentComponent.key,
        width: currentComponent.width,
        height: currentComponent.height,
        alignCenter: true, // 希望松手的时候你可以居中
      },
    ]);
    bigScreenStore.updateBigScreenState('blocks', temporaryValue);
    console.log(bigScreenStore.state)
    currentComponent = null;
  };

  const dragstart = async (e, component) => {
    try {
      await nextTick();
      const canvasRef = document.getElementById(
        'editor-container-canvas__content'
      );
      // dragenter进入元素中 添加一个移动的标识
      // dragover 在目标元素经过 必须要阻止默认行为 否则不能触发drop
      // dragleave 离开元素的时候 需要增加一个禁用标识
      // drop 松手的时候 根据拖拽的组件 添加一个组件
      canvasRef.addEventListener('dragenter', dragenter);
      canvasRef.addEventListener('dragover', dragover);
      canvasRef.addEventListener('dragleave', dragleave);
      canvasRef.addEventListener('drop', drop);
      currentComponent = component;
    } catch (error) {
      console.log(error);
    }
  };

  const dragend = async (e) => {
    try {
      const canvasRef = document.getElementById(
        'editor-container-canvas__content'
      );
      canvasRef.removeEventListener('dragenter', dragenter);
      canvasRef.removeEventListener('dragover', dragover);
      canvasRef.removeEventListener('dragleave', dragleave);
      canvasRef.removeEventListener('drop', drop);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    dragstart,
    dragend,
  };
}
