<template>
  <div class="left-components-home">
    <div v-for="item in componentList" :key="item.key" class="component-item">
      <div class="component-item-label">{{ item.label }}</div>
      <div class="component-item-preview">
        {{ item.preview }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, inject } from 'vue';
import { registerConfig } from '../../config/leftComponents.jsx';
import { BigScreenEditRefKey } from '../../config/provideInjectKey'

// 编辑器实例
const bigScreenEditRef = inject(BigScreenEditRefKey)
const componentList = registerConfig.componentList;

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
