<template>
    <div :class="[props.block.focus ? 'lay-item-block-focus' : '', 'single-home']" @mousedown="(e) => blockMousedown(e, block)">
       {{ getPreviewLable(props.block) }}
    </div>
</template>
<script setup>
import { inject,onMounted } from 'vue'
import { REGISTERCONFIG } from '../../../config/provideInjectKey'
import { useFocus } from '../../../hooks/useFocus';
import { usebigScreenStore } from '../../../data/bigScreenGlobalStore';

const registerConfig = inject(REGISTERCONFIG)

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore);

const props = defineProps({
  block: {
    type: Object
  }
})


function getPreviewLable(block) {
  const { key } = block;
  return registerConfig.componentMap[key].preview;
}


onMounted(() => {
  // console.log('singleLayer......page')
})
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