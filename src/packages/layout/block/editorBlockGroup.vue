<template>
    <div ref="blockGroupRef"
     :style="blockGroupStyles"
     :class="[
      props.block.focus ? 'editor-block-group-home-focus' : '',
      'editor-block-group-home',
    ]">
      <template v-for="item in props.block.children" :key="item.uuid">
        <EditorBlockGroup v-if="item.children && item.children.length" :block="item"/>
        <EditorBlock v-else :block="item"/>
      </template>
    </div>
</template>
<script setup>
import { ref, computed ,onMounted, nextTick } from 'vue'
import EditorBlock from './editorBlock.vue'
// import { useCalculateEditorBlockGroup } from '../../hooks/useGroup'

defineOptions({
  name: 'EditorBlockGroup',
});


const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
  mousedownFn: {
    type: Function,
  }
});


const blockGroupStyles = computed(() => {
  // const { zIndex, left, top, width, height } = useCalculateEditorBlockGroup(props.block)

  return {
    top: `${props.block.top}px`,
    left: `${props.block.left}px`,
    width: `${props.block.width}px`,
    height: `${props.block.height}px`,
    zIndex: `${props.block.zIndex}`,
  }
});

let blockGroupRef = ref()






onMounted(() => {
  console.log(props.block, 'props.block~~~~~')
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