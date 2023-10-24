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
  const data = [
    { name: '北京' },
    { name: '天津' },
    { name: '上海' },
    { name: '重庆' },
    {  name: '河北' },
    { name: '河南' },
    {  name: '云南' },
    {  name: '辽宁' },
    {  name: '黑龙江' },
    {  name: '湖南' },
    {  name: '安徽' },
    { name: '山东' },
    {  name: '新疆' },
    {  name: '江苏' },
    {  name: '浙江' },
    {  name: '江西' },
  ];
  const option = {
    geo: {
      // 地理坐标系组件
      map: 'china', //引入地图数据, 使用 registerMap 注册的地图名称。
      zlevel: 10,
      show: true,
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
          show: false,
        },
      },
    },
    // 鼠标悬浮提示框通过
    series: [
      // 系列列表。每个系列 type 决定自己的图表类型
      {
        name: '省份',
        type: 'map',
        geoIndex: 0,
        data,
      },
    ],
  };
  echartInstance.setOption(option);
};

onMounted(() => {
  main()
});
</script>

<style scoped lang="scss">
.container {
  width: 1200px;
  height: 800px;
  border: 1px solid red;
}
</style>
