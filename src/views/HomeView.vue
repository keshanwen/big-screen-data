<script setup>
import { ref, provide, nextTick} from 'vue'
import EditHeader from '@/packages/layout/header.vue';
import LeftComponents from '@/packages/layout/leftComponents/index.vue';
import RightProps from '@/packages/layout/rightProps/index.vue';
import BigScreenEdit from '@/packages/bigScreenEdit.vue';



</script>

<template>
  <div class="edit-page-home">
    <div class="edit-page-header">
      <EditHeader />
    </div>
    <div class="edit-page-content">
      <div class="edit-page-content-left">
        <LeftComponents />
      </div>
      <div class="edit-page-content-center">
        <BigScreenEdit/>
      </div>
      <div class="edit-page-content-right">
        <RightProps />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit-page-home {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  .edit-page-header {
    height: 80px;
    background-color: aliceblue;
  }

  .edit-page-content {
    display: flex;
    overflow: auto;
    height: calc(100% - 80px);
    &-left {
      width: 200px;
      background-color: bisque;
    }
    &-center {
      flex: 1;
      overflow: auto;
    }
    &-right {
      width: 200px;
      background-color: bisque;
    }
  }
}
</style>
