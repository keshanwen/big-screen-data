<template>
    <div class='my-dialog-home'>

    </div>
</template>
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  el: {
    type: Object,
  },
});

onMounted(() => {
  console.log(props.options, props.el)
})

</script>


<style lang='scss' scoped>
.my-dialog-home {}
</style>