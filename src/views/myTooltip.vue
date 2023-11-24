<template>
    <div class='my-tooltip-home'>
      <template v-for="item in myContent" :key="item.title">
        <div>{{ item.title }}</div>
        <div>{{ item.tips }}</div>
      </template>
    </div>
</template>
<script setup lang='ts'>
import { computed, PropType } from 'vue'

interface Item {
  title: String
  tips: String
}

type Content = Item[]

const props = defineProps({
  myContent: {
    type: Array as PropType<Content>,
    default() {
      return [
        {
          title: '度量1',
          tips: '今年营收：10000 元'
        }
      ]
    }
  }
})

</script>

<style scoped lang="scss">
.my-tooltip-home {
  position: relative;
  padding: 8px;
}
</style>
