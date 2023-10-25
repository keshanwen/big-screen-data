<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
// import chinaJson from '../../public/map/china.json';
import { chinaMap, chinaMapOutline }  from '../../public/map/chinaMapOutline'

let containerRef = ref();
let echartInstance;




const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaMap); // 注册可用的地图
  echarts.registerMap("chinaMapOutline", chinaMapOutline);
  const coord = chinaMap.features.map((val) => {
    return {
      name: val.properties.name,
      value: val.properties.cp,
      visualMap: false, // 这样样式不会被 visualMap 组件，影响
    };
  });
  const bejingCoord = coord.filter((item) => item.name === '北京');
  const nobejingCoord = coord.filter((item) => item.name !== '北京');

/*   const data = [
    { name: '北京' },
    { name: '天津' },
    { name: '上海' },
    { name: '重庆' },
    { name: '河北' },
    { name: '河南' },
    { name: '云南' },
    { name: '辽宁' },
    { name: '黑龙江' },
    { name: '湖南' },
    { name: '安徽' },
    { name: '山东' },
    { name: '新疆' },
    { name: '江苏' },
    { name: '浙江' },
    { name: '江西' },
  ]; */
  const option = {
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
          color: '#062031',
          borderWidth: 1.1,
          borderColor: '#43D0D6',
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
          color: '#062031',
          borderWidth: 2,
          borderColor: '#43D0D6',
        },
        emphasis: {
          areaColor: '#FFB800',
          label: {
            show: true,
          },
        },
      }
    ],
    series: [
    //    {
    //   map: "chinaMapOutline",
    //   silent: true,
    //   type: "map",
    //   zoom: 1,
    //   label: {
    //     normal: {
    //       show: false,
    //       textStyle: {
    //         color: "#fff",
    //       },
    //     },
    //     emphasis: {
    //       textStyle: {
    //         color: "#fff",
    //       },
    //     },
    //   },
    //   top: "10%",
    //   roam: false,
    //   itemStyle: {
    //     normal: {
    //       areaColor: "rgba(0,255,255,.02)",
    //       borderColor: "#00ffff",
    //       borderWidth: 1.5,
    //       shadowColor: "#00ffff",
    //       shadowOffsetX: 0,
    //       shadowOffsetY: 4,
    //       shadowBlur: 10,
    //     },
    //     emphasis: {
    //       areaColor: "transparent", //悬浮背景
    //       textStyle: {
    //         color: "#fff",
    //       },
    //     },
    //   },
    // },
      // {
      //   type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
      //   coordinateSystem: 'geo',
      //   zlevel: 15,
      //   symbolSize: 16,
      //   rippleEffect: {
      //     period: 6,
      //     brushType: 'stroke',
      //     scale: 8,
      //   },
      //   itemStyle: {
      //     color: '#FF5722',
      //     opacity: 1,
      //   },
      //   data: bejingCoord,
      // },
      // {
      //   type: 'effectScatter',
      //   coordinateSystem: 'geo',
      //   zlevel: 15, // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段
      //   rippleEffect: { // 涟漪特效相关配置。
      //     // color: 'red', // 涟漪的颜色，默认为散点的颜色。
      //     // number: 3, // 波纹的数量
      //     period: 4, // 动画的周期，秒数。
      //     brushType: 'stroke', // 波纹的绘制方式
      //     scale: 4, // 动画中波纹的最大缩放比例
      //   },
      //   // symbol: 'pin', // 标记的图形。
      //   symbolSize: 8, // 标记的大小
      //   // symbolSize: (value, params) => {
      //   //   return 10
      //   // }, // 标记的大小
      //   // label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
      //   //   show: false
      //   // },
      //   itemStyle: { // 图形样式。
      //     color: '#FFB800',
      //     opacity: 1,
      //   },
      //   // emphasis: { // 高亮的图形和标签样式
      //   //   scale: 20
      //   // },
      //   data: nobejingCoord,
      // },
    ],
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
