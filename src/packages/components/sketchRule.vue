<template>
  <SketchRule
    :thick="THICK"
    :scale="scale"
    :width="sketchRuleState.width"
    :height="sketchRuleState.height"
    :start-x="sketchRuleState.startX"
    :start-y="sketchRuleState.startY"
    :onCornerClick="handleCornerClick"
    :lines="sketchRuleState.lines"
  ></SketchRule>
</template>
<script setup lang="ts">
import { reactive, watch, PropType, computed, defineExpose } from 'vue';
import SketchRule from 'vue3-sketch-ruler';
import 'vue3-sketch-ruler/lib/style.css';
import { usebigScreenStore } from '../data/bigScreenGlobalStore'
import { THICK } from '../config/sketchRuler'


const bigScreenStore = usebigScreenStore()

let sketchRuleState = reactive({
    width: 600,
    height: 600,
    startX: 0,
    startY: 0,
     lines: {
      h: [],
      v: [],
    },
    needUpdate: false
})

let scale = computed( () => bigScreenStore.canvasContaniter.scale)


const handleCornerClick = (e) => {
  console.log('handleCornerClick', e);
};

const updateSketchRuleState = (obj) => {
    Object.keys(obj).forEach((key) => {
      sketchRuleState[key] = obj[key]
    })
}

defineExpose({
  updateSketchRuleState
})


</script>

