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
  const lines_coord = [
    {
      coords: [
        [119.5313, 29.8773],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [114.072026, 22.552194],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [115.89, 28.68],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [111.65, 40.82],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [114.48, 38.03],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [126.63, 45.75],
        [116.4551, 40.2539],
      ],
    },
    {
      coords: [
        [106.71, 26.57],
        [116.4551, 40.2539],
      ],
    },
    // {
    //   coords: [
    //     [106.71, 26.57],
    //     [122.1, 37.5]
    //   ],
    // },
  ];

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
    series: [
      {
        type: 'lines', // 用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化
        // name: 'lines', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        coordinateSystem: 'geo', // 该系列使用的坐标系。
       // geoIndex: 0, （使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件。）
        zlevel: 15,
        effect: { // 线特效的配置，
          show: true,
          period: 4,
          trailLength: 0.1, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。
          symbol: 'arrow',// 特效图形的标记。
          color: '#01AAED',
          symbolSize: 6,
          // loop: true, //是否循环显示特效。
        },
        // symbol: 'circle', // 线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定。 具体支持的格式可以参考 标线的 symbol
        // symbolSize: 4,
        lineStyle: { // 线的颜色。 默认从option.color 调色盘 获取颜色。
          // type: 'solid', // 线的类型。
          // cap: 'round', // 用于指定线段末端的绘制方式
          width: 1.2,
          opacity: 0.6,
          curveness: 0.2, // 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
          color: 'red',
          // shadowColor: 'rgba(255,0,0,0.4)',
          // shadowBlur: 10,// 图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          // shadowOffsetX: 0,
          //  shadowOffsetY: 0
        },
        data: lines_coord,
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
