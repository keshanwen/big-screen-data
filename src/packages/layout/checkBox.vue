<template>
    <div v-if="positionData.width && positionData.height" :style="checkBoxPosition" class='check-box-home'></div>
</template>
<script setup lang='ts'>
import { computed } from 'vue'

const props = defineProps({
  positionData: {
    type: Object,
    default() {
      return {
        top: null,
        left: null,
        width: null,
        height: null
      }
    }
  }
})

const checkBoxPosition = computed(() => {
  return {
    width: `${props.positionData.width}px`,
    height: `${props.positionData.height}px`,
    top: `${props.positionData.top}px`,
    left: `${props.positionData.left}px`
  }
})


</script>


<style lang='scss' scoped>
.check-box-home {
  position: absolute;
  border: 1px dashed red;
  background: red;
  opacity: 0.1;
}
</style>