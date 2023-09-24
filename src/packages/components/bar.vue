<template>
    <div ref="echartBarRef" class='echart-bar-home'>

    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';

let echartBarRef = ref()

const init = () => {

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(echartBarRef.value);
// 绘制图表
myChart.setOption({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
});
}

onMounted(() => {
  init()
  console.log('my bar')
})

</script>


<style lang='scss' scoped>
.echart-bar-home {
  width: 260px;
  height: 260px;
}
</style>