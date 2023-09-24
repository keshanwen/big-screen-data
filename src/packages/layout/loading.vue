<template>
</template>
<script setup lang='ts'>
import { onUnmounted } from 'vue'
import { ElLoading } from 'element-plus'

  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })


onUnmounted(() => {
  loading.close()
})
</script>

