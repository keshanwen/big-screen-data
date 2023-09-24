<template>
    <div ref="blockRef" :style="blockStyles" class='editor-block-home'>
      <component :is="getComponent()"/>
    </div>
</template>
<script setup>
import { ref, computed, onMounted} from 'vue'
import { registerConfig } from '../config/leftComponents'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const blockStyles = computed(() => ({
    top: `${props.block.top}px`,
    left: `${props.block.left}px`,
    zIndex: `${props.block.zIndex}`
}));

function getComponent() {
  // 通过block的key属性直接获取对应的组件
  const component = registerConfig.componentMap[props.block.key];
  // 获取render函数
  const RenderComponent = component.render;
  return RenderComponent
}

onMounted(() => {
  console.log(props.block, 'block~~~~~')
})

</script>


<style lang='scss' scoped>


.editor-block-home {
   position: absolute;
    &::after{
        content:'';
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
    }

}
</style>