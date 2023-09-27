<template>
    <div :style="Styles" class='home'>
      <ElButton>我是按钮组件</ElButton>
    </div>
</template>
<script setup>
import { onMounted, computed } from 'vue'


const props = defineProps({
  props: {
    type: Object
  }
})

const Styles = computed(() => ({
  width: `${props.props.width}px`,
  height: `${props.props.height}px`,
}));

</script>


<style lang='scss' scoped>
.home {}
</style>