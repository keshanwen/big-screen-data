<template>
  <div class="combine-home" :style="{
        textIndent: getTextIndent()
      }">
    <div
      :class="[
        props.block.focus ? 'lay-item-block-focus' : '',
        'combine-title',
      ]"
      @mousedown="(e) => blockMousedown(e, props.block, true)"
      @contextmenu="(e) => onContextMenuBlock(e, block)"
    >
      <div  @click.stop="isShowMore">
         <el-icon  v-if="!isShowMoreLayer"><ArrowRightBold /></el-icon>
          <el-icon v-else><ArrowDownBold /></el-icon>
          <el-icon><Folder /></el-icon>{{ props.block.groupName }}
      </div>
      <div v-if="block.lock" @mousedown="unlockCb">
        <el-icon><Lock /></el-icon>
      </div>
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
<script setup lang="tsx">
import { onMounted, ref, inject } from 'vue';
import { Folder, ArrowRightBold,ArrowDownBold } from '@element-plus/icons-vue';
import SingleLayer from './SingleLayer.vue';
import { REGISTERCONFIG } from '../../../config/provideInjectKey';
import { useFocus } from '../../../hooks/useFocus';
import { usebigScreenStore } from '../../../data/bigScreenGlobalStore';
import {
  Lock
} from '@element-plus/icons-vue'
import { COMMAND } from '../../../config/provideInjectKey'
import { $dropdown, DropdownItem } from '../../dialog/dropdown.jsx'
import { useContextMenu } from '../../../hooks/useContextMenu.jsx'


const command = inject(COMMAND)
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

const unlockCb = (e) => {
  e.preventDefault();
  // e.stopImmediatePropagtion()
  e.stopPropagation();
  command.unlock(props.block)
  console.log(props.block, 'props.block~~~~~')
}

const onContextMenuBlock = (e, block) => {
   e.preventDefault();
  const showConent: any = useContextMenu(bigScreenStore, command, block)

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
.combine-home {
  .combine-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 6px;
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
