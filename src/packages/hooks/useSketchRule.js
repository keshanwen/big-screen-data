import { nextTick } from 'vue';
import { THICK } from '../config/sketchRuler';

export function useSketchRule() {
  function handleScroll(screenRef, canvasRef, sketchRuleRef, editScreenStore) {
    if (!screenRef?.value || !canvasRef?.value || !sketchRuleRef?.value) {
      return;
    }
    const screensRect = screenRef.value.getBoundingClientRect();
    const canvasRect = canvasRef.value.getBoundingClientRect();
    const scale = editScreenStore.canvasContaniter.scale;
    // 标尺开始的刻度
    const startX = (screensRect.left + THICK - canvasRect.left) / scale;
    const startY = (screensRect.top + THICK - canvasRect.top) / scale;
    sketchRuleRef.value.updateSketchRuleState({
      startX,
      startY,
    });
  }

  function handleWheel(e, editScreenStore, cb) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const nextScale = parseFloat(
        Math.max(
          0.2,
          editScreenStore.canvasContaniter.scale - e.deltaY / 500
        ).toFixed(2)
      );
      editScreenStore.updateCanvasContaniter({
        scale: nextScale,
      });
      console.log(nextScale);
    }
    nextTick(() => {
      cb()
    });
  }

  return {
    handleScroll,
    handleWheel,
  };
}
