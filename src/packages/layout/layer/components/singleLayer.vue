<template>
    <div :class="[props.block.focus ? 'lay-item-block-focus' : '', 'single-home']">
       {{ getPreviewLable(props.block) }}
    </div>
</template>
<script setup>
import { inject } from 'vue'
import { REGISTERCONFIG } from '../../../config/provideInjectKey'

const registerConfig = inject(REGISTERCONFIG)

const props = defineProps({
  block: {
    type: Object
  }
})


function getPreviewLable(block) {
  const { key } = block;
  return registerConfig.componentMap[key].preview;
}

</script>


<style lang='scss' scoped>
.single-home {
  height: 60px;
  background-color: antiquewhite;
  margin-bottom: 4px;
  cursor: pointer;
}
  .lay-item-block-focus {
    border: 2px dashed red;
  }
</style>