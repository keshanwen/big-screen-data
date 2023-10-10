<template>
    <div ref="blockGroupRef"
     :style="blockGroupStyles"
     :class="[
      props.block.focus ? 'editor-block-group-home-focus' : '',
      'editor-block-group-home',
    ]"
     @mousedown="e => blockMousedown(e,block)"
     @dblclick="e => blockDoubleClick(e, block)"
     >
      <template v-for="item in props.block.children" :key="item.uuid">
        <EditorBlockGroup v-if="item.children && item.children.length" :block="item"/>
        <EditorBlock v-else :block="item"/>
      </template>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, nextTick, inject } from 'vue';
import EditorBlock from './editorBlock.vue';
import { useFocus } from '../../hooks/useFocus';
import { usebigScreenStore } from '../../data/bigScreenGlobalStore';
import { MOUSEDOWN } from '../../config/provideInjectKey'

defineOptions({
  name: 'EditorBlockGroup',
});

const mousedown = inject(MOUSEDOWN)

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});


const blockGroupStyles = computed(() => {
  return {
    top: `${props.block.top}px`,
    left: `${props.block.left}px`,
    width: `${props.block.width}px`,
    height: `${props.block.height}px`,
    zIndex: `${props.block.zIndex}`,
  }
});

let blockGroupRef = ref()

const bigScreenStore = usebigScreenStore();
const { blockMousedown, blockDoubleClick } = useFocus(bigScreenStore, (e) => {
  // 获取焦点后进行拖拽
  mousedown && mousedown(e)
});


onMounted(() => {
 // console.log(props.block, 'props.block~~~~~')
})


</script>


<style lang='scss' scoped>
.editor-block-group-home {
  position: absolute;
}

.editor-block-group-home-focus {
  border: 2px dashed red;
  //  &::after {
  //   border: 2px dashed red;
  // }
}
</style>