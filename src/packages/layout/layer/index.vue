<template>
  <div class="layer-home">
    <p class="layer-home-label">我是图层</p>
    <div
      v-for="block in blocks"
      :key="block.uuid"
      @contextmenu="(e) => onContextMenuBlock(e, block)"
      class="layer-item"
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
<script setup lang="tsx">
import { computed, inject ,onMounted } from 'vue';
import { usebigScreenStore } from '../../data/bigScreenGlobalStore';
import CombineLayer from './components/combineLayer.vue'
import SingleLayer from './components/singleLayer.vue'
import { $dropdown, DropdownItem } from '../dialog/dropdown.jsx'
import { COMMAND } from '../../config/provideInjectKey'
import { useContextMenu } from '../../hooks/useContextMenu.jsx'


const command = inject(COMMAND) as any
const bigScreenStore = usebigScreenStore();

const blocks = computed(() => {
  return bigScreenStore.state.blocks.sort((a, b) => {
    return b.zIndex - a.zIndex;
  });
});


const onContextMenuBlock = (e, block) => {
   e.preventDefault();
  const showConent: any = useContextMenu(bigScreenStore, command)

  function content() {
    return showConent.map(item => {
      return (
        <DropdownItem
          key={ item.label }
          label={ item.label }
          icon={ item.icon }
          onClick={item.onClick}
           ></DropdownItem>
      )
    })
  }

  $dropdown({
    el: e.target, // 以哪个元素为准产生一个dropdown
    content
  });
}

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
}


</style>
