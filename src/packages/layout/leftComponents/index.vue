<template>
  <div class="left-components-home">


    <div v-for="component in componentList" :key="component.key"
      draggable="true"
     @dragstart="(e) => dragstart(e, component)"
       @dragend="dragend"
    class="component-item">
      <div class="component-item-label">{{ component.label }}</div>
      <div class="component-item-preview">
        {{ component.preview }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, inject, nextTick } from 'vue';
import { registerConfig } from '../../config/leftComponents.jsx';
import { usebigScreenStore } from '../../data/bigScreenGlobalStore';
import { useMenuDragger } from '../../hooks/useMenuDragger';


const bigScreenStore = usebigScreenStore();
const componentList = registerConfig.componentList;


 const { dragstart, dragend } = useMenuDragger(bigScreenStore);

onMounted(() => {

});
</script>

<style lang="scss" scoped>
.left-components-home {
  .component-item {
    height: 60px;
    margin-bottom: 4px;
    cursor: move;
     user-select: none;
    color: wheat;
    background-color: brown;
    &-label {
    }
    &-preview {
      text-align: center;
    }
  }
}
</style>
