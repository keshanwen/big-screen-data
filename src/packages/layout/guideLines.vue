<template>
  <div v-if="props.x != null" :style="{ left: props.x + 'px'}" class="line-x"></div>
  <div v-if="props.y != null" :style="{ top: props.y + 'px'}" class="line-y"></div>
</template>
<script setup lang='ts'>

const props = defineProps({
  x: {
    type: Number,
    default: null
  },
  y: {
    type: Number,
    default: null
  }
})

</script>


<style lang='scss' scoped>
// 移动left值
.line-x {
    position: absolute;
    top:0;
    bottom:0;
    border-left: 1px dashed red;
}
// 移动的是top 值
.line-y {
    position: absolute;
    left:0;
    right:0;
    border-top: 1px dashed red;
}

</style>