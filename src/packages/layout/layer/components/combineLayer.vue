<template>
  <div class="combine-home">
    <div class="combine-title" @click="isShowMore">
      <el-icon><Folder /></el-icon>{{ props.block.groupName }}
    </div>
    <div v-if="isShowMoreLayer">
      <template v-for="item in props.block.children" :key="item.uuid">
        <CombineLayer
          v-if="item.children && item.children.length"
          :block="item"
        />
        <SingleLayer v-else :block="item" class="single-layer-son"/>
      </template>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue';
import { Folder } from '@element-plus/icons-vue';
import SingleLayer from './SingleLayer.vue';
import { REGISTERCONFIG } from '../../../config/provideInjectKey'

defineOptions({
  name: 'CombineLayer',
});

const registerConfig = inject(REGISTERCONFIG)

const props = defineProps({
  block: {
    type: Object,
  },
});

let isShowMoreLayer = ref(false);

const isShowMore = () => {
  isShowMoreLayer.value = !isShowMoreLayer.value
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
</style>
