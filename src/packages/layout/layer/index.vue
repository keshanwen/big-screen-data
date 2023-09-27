<template>
  <div class="layer-home">
    <p class="layer-home-label">我是图层</p>
    <div
      v-for="block in blocks"
      :key="block.uuid"
      :class="[block.focus ? 'lay-item-block-focus' : '', 'layer-item']"
      @mousedown="(e) => blockMousedown(e, block)"
    >
      <template v-if="block.group">
        <CombineLayer :block="block"/>
      </template>
      <template v-else>
        <SingleLayer :block="block"/>
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { usebigScreenStore } from '../../data/bigScreenGlobalStore';
import { useFocus } from '../../hooks/useFocus';
import CombineLayer from './components/combineLayer.vue'
import SingleLayer from './components/singleLayer.vue'

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore);

const blocks = computed(() => {
  return bigScreenStore.state.blocks.sort((a, b) => {
    return b.zIndex - a.zIndex;
  });
});


</script>

<style lang="scss" scoped>
.layer-home {
  width: 100%;
  height: 100%;
  overflow: auto;
  &-label {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
   // background-color: blueviolet;
  }

  .layer-item {
    // height: 60px;
    // background-color: antiquewhite;
    // margin-bottom: 4px;
    // cursor: pointer;
  }

  .lay-item-block-focus {
    border: 2px dashed red;
  }
}
</style>
