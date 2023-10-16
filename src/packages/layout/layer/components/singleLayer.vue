<template>
    <div :class="[props.block.focus ? 'lay-item-block-focus' : '', 'single-home']" @mousedown="(e) => blockMousedown(e, block, true)"  @contextmenu="(e) => onContextMenuBlock(e, block)">
      <div>
         {{ getPreviewLable(props.block) }}
      </div>
       <div v-if="block.lock" @mousedown="unlockCb">
        <el-icon><Lock /></el-icon>
       </div>
    </div>
</template>
<script setup lang="tsx">
import { inject,onMounted } from 'vue'
import { REGISTERCONFIG } from '../../../config/provideInjectKey'
import { useFocus } from '../../../hooks/useFocus';
import { usebigScreenStore } from '../../../data/bigScreenGlobalStore';
import {
  Lock
} from '@element-plus/icons-vue'
import { COMMAND } from '../../../config/provideInjectKey'
import { $dropdown, DropdownItem } from '../../dialog/dropdown.jsx'
import { useContextMenu } from '../../../hooks/useContextMenu.jsx'

const registerConfig = inject(REGISTERCONFIG)
const command = inject(COMMAND)

const bigScreenStore = usebigScreenStore();
const { blockMousedown } = useFocus(bigScreenStore);

const props = defineProps({
  block: {
    type: Object
  }
})


function getPreviewLable(block) {
  const { key } = block;
  return registerConfig.componentMap[key].preview;
}

const unlockCb = (e) => {
  e.preventDefault();
  e.stopPropagation();
  // e.stopImmediatePropagtion()
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

onMounted(() => {
  // console.log('singleLayer......page')
})
</script>


<style lang='scss' scoped>
.single-home {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 6px;
  height: 60px;
  background-color: antiquewhite;
  margin-bottom: 4px;
  cursor: pointer;
}
  .lay-item-block-focus {
    border: 2px dashed red;
  }
</style>