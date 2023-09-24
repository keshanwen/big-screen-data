<template>
    <div class='home'>
      <ElButton>我是按钮组件</ElButton>
    </div>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('i am button~~~~')
})
</script>


<style lang='scss' scoped>
.home {}
</style>