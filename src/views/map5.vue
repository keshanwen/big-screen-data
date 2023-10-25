<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import { chinaMap, chinaMapOutline }  from '../../public/map/chinaMapOutline'

let containerRef = ref();
let echartInstance;




const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaMap); // 注册可用的地图
  echarts.registerMap("chinaMapOutline", chinaMapOutline);


  const option = {
    backgroundColor:'#181F4E',
    geo: [
      {  // 地理坐标系组件。 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
        map: 'china', //引入地图数据, 使用 registerMap 注册的地图名称。ECharts 也可以使用 SVG 格式的地图
        zlevel: 10,
        show: true, // 是否显示地理坐标系组件
        layoutCenter: ['50%', '50%'],
        roam: false,
        layoutSize: '90%',
        zoom: 1,
        label: {
          show: false,
          fontSize: 12,
          color: '#43D0D6',
        },
        itemStyle: {
            areaColor:'transparent',
            borderColor: 'rgba(0,255,255,.1)',
            borderWidth: 1,
        },
        emphasis: {
          areaColor: '#FFB800',
          label: {
            show: true,
          },
        },
      },
      {
        map: 'chinaMapOutline', //引入地图数据, 使用 registerMap 注册的地图名称。ECharts 也可以使用 SVG 格式的地图
        zlevel: 10,
        show: true, // 是否显示地理坐标系组件
        layoutCenter: ['50%', '50%'],
        roam: false,
        layoutSize: '90%',
        zoom: 1,
        label: {
          show: false,
          fontSize: 12,
          color: '#43D0D6',
        },
        itemStyle: {
          areaColor: 'rgba(0,255,255,.02)',
          borderColor: '#00ffff',
          borderWidth: 1.5,
          shadowColor: '#00ffff',
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 10,
        },
        emphasis: {
          areaColor: '#FFB800',
          label: {
            show: true,
          },
        },
      }
    ],
    series: [],
  };
  echartInstance.setOption(option);
};

onMounted(() => {
  main();
});
</script>

<style scoped lang="scss">
.container {
  // width: 1200px;
  // height: 800px;
  // border: 1px solid red;
  height: 100vh;
}
</style>
