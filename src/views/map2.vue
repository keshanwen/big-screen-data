<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import chinaJson from '../../public/map/china.json';

let containerRef = ref();
let echartInstance;

const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaJson); // 注册可用的地图
  const coord = chinaJson.features.map((val) => {
    return {
      name: val.properties.name,
      value: val.properties.cp,
      visualMap: false, // 这样样式不会被 visualMap 组件，影响
      // itemStyle: { // 图形样式。
      //   // color: '#FFB800',
      //   opacity: 1,
      // },
    };
  });
  const bejingCoord = coord.filter((item) => item.name === '北京');
  const nobejingCoord = coord.filter((item) => item.name !== '北京');

  console.log(nobejingCoord);

  const checkData = [
    // { name: '上海市', value: [121.472644, 31.231706] },
    // { name: '云南省', value: [102.712251, 25.040609] },
    // { name: '内蒙古自治区', value: [111.670801, 40.818311] },
    // { name: '北京市', value: [116.405285, 39.904989] },
    // { name: '吉林省', value: [125.3245, 43.886841] },
    // { name: '四川省', value: [104.065735, 30.659462] },
    // { name: '天津市', value: [117.190182, 39.125596] },
    // { name: '宁夏回族自治区', value: [106.278179, 38.46637] },
    // { name: '安徽省', value: [117.283042, 31.86119] },
    // { name: '山东省', value: [117.000923, 36.675807] },
    // { name: '山西省', value: [112.549248, 37.857014] },
    // { name: '广东省', value: [113.280637, 23.125178] },
    // { name: '广西壮族自治区', value: [108.320004, 22.82402] },
    // { name: '新疆维吾尔自治区', value: [87.617733, 43.792818] },
    // { name: '江苏省', value: [118.767413, 32.041544] },
    { name: '江西省', value: [115.892151, 28.676493] },
    // { name: '河北省', value: [114.502461, 38.045474] },
    // { name: '河南省', value: [113.665412, 34.757975] },
    // { name: '浙江省', value: [120.153576, 30.287459] },
    // { name: '海南省', value: [110.33119, 20.031971] },
    // { name: '湖北省', value: [114.298572, 30.584355] },
    // { name: '湖南省', value: [112.982279, 28.19409] },
    // { name: '甘肃省', value: [103.823557, 36.058039] },
    // { name: '福建省', value: [119.306239, 26.075302] },
    // { name: '西藏自治区', value: [91.132212, 29.660361] },
    // { name: '贵州省', value: [106.713478, 26.578343] },
    // { name: '辽宁省', value: [123.429096, 41.796767] },
    // { name: '重庆市', value: [106.504962, 29.533155] },
    // { name: '陕西省', value: [108.948024, 34.263161] },
    // { name: '青海省', value: [101.778916, 36.623178] },
    // { name: '黑龙江省', value: [126.642464, 45.756967] },
  ];

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
    geo: {
      // 地理坐标系组件。 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
      map: 'china', //引入地图数据, 使用 registerMap 注册的地图名称。ECharts 也可以使用 SVG 格式的地图
      zlevel: 10,
      show: true, // 是否显示地理坐标系组件
      layoutCenter: ['50%', '50%'],
      roam: false,
      layoutSize: '90%',
      zoom: 1,
      label: {
        show: true,
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
    series: [
      {
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
        coordinateSystem: 'geo',
        zlevel: 15,
        symbolSize: 8,
        rippleEffect: {
          period: 4, // 动画的周期，秒数。
          brushType: 'stroke', // 波纹的绘制方式
          scale: 4, // 动画中波纹的最大缩放比例
        },
        itemStyle: {
          color: '#FF5722',
          opacity: 1,
        },
        label: {
          show: true,
          color: 'red',
          formatter(p) {
            console.log(p, 'p');
            return 8;
          },
        },
        data: checkData,
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 15, // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段
        // rippleEffect: undefined,
        rippleEffect: {
          // 涟漪特效相关配置。
          // color: 'red', // 涟漪的颜色，默认为散点的颜色。
          // number: 3, // 波纹的数量
          period: 4, // 动画的周期，秒数。
          brushType: 'stroke', // 波纹的绘制方式
          scale: 4, // 动画中波纹的最大缩放比例
        },
        // symbol: 'none', // 标记的图形。
        symbolSize: 12, // 标记的大小
        // symbolSize: (value, params) => {
        //   return 10
        // }, // 标记的大小
        // label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
        //   show: false
        // },
        itemStyle: {
          // 图形样式。
          color: '#FFB800',
          opacity: 1,
        },
        label: {
          show: true,
          //position: 'top',
          color: '#fff',
          formatter(p) {
            console.log(p, 'p');
            return 24;
          },
        },
        // emphasis: { // 高亮的图形和标签样式
        //   scale: 20
        // },
        data: [],
      },
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
