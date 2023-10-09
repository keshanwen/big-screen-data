<template>
  <div class="combine-home">
    <div
      :class="[
        props.block.focus ? 'lay-item-block-focus' : '',
        'combine-title',
      ]"
      :style="{
        textIndent: getTextIndent()
      }"
      @click="isShowMore"
      @mousedown="(e) => blockMousedown(e, props.block)"
    >
      <el-icon  v-if="!isShowMoreLayer"><ArrowRightBold /></el-icon>
      <el-icon v-else><ArrowDownBold /></el-icon>
      <el-icon><Folder /></el-icon>{{ props.block.groupName }}
    </div>
    <div v-if="isShowMoreLayer">
      <template v-for="item in props.block.children" :key="item.uuid">
        <CombineLayer
          v-if="item.children && item.children.length"
          :block="item"
        />
        <SingleLayer
          v-else
          :block="item"
          class="single-layer-son"
        />
      </template>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import { Folder, ArrowRightBold,ArrowDownBold } from '@element-plus/icons-vue';
import SingleLayer from './SingleLayer.vue';
import { REGISTERCONFIG } from '../../../config/provideInjectKey';
import { useFocus } from '../../../hooks/useFocus';
import { usebigScreenStore } from '../../../data/bigScreenGlobalStore';

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore);

defineOptions({
  name: 'CombineLayer',
});

const registerConfig = inject(REGISTERCONFIG);

const props = defineProps({
  block: {
    type: Object,
  },
});

let isShowMoreLayer = ref(false);

const isShowMore = () => {
  isShowMoreLayer.value = !isShowMoreLayer.value;
};

const getTextIndent = () => {
  const parentLength = props.block.parent?.length || 0
  return parentLength * 10 + 'px'
}
</script>

<style lang="scss" scoped>
.combine-home {
  .combine-title {
    height: 60px;
    background-color: antiquewhite;
    margin-bottom: 4px;
    cursor: pointer;
      }
  .single-layer-son {
    height: 60px;
    background-color: darkgray;
    margin-bottom: 4px;
    cursor: pointer;
  }
}

.lay-item-block-focus {
  border: 2px dashed red;
}
</style>
