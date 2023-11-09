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
  const coord = chinaJson.features.map((val, index) => {
    let value = [...val.properties.cp, 100 * index]
    return {
      name: val.properties.name,
      value,
      content: 10,
      // visualMap: false, // 这样样式不会被 visualMap 组件，影响
    };
    // return value
  }).slice(0,6)
  const bejingCoord = coord.filter((item) => item.name === '北京');
  const nobejingCoord = coord.filter((item) => item.name !== '北京');
    const data = [
    { name: '西藏', value: 100 },
    { name: '内蒙古', value: 200 },
    { name: '江西', value: 300 },
    { name: '陕西', value: 400 },
    { name: '山东', value: 500 },
    { name: '福建', value: 600 },
    { name: '浙江', value: 700 },
    { name: '广东', value: 800 },
    { name: '上海', value: 900 },
    { name: '北京', value: 1000 },
  ];

  const option = {
    visualMap: [
      {
        seriesIndex: 0,
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['订单金额', ''], //取值范围的文字
        inRange: {
          color: ['#e0ffff', 'blue'], //取值范围的颜色
        },
        show: true, //图注
      },
      {
        seriesIndex: 1,
        dimension: 2,
        min: 0,
        max: 1000,
        left: '20%',
        // top: 'bottom',
        text: ['订单金额2', ''], //取值范围的文字
        inRange: {
          color: ['#e0ffff', 'red'], //取值范围的颜色
        },
        show: true, //图注
      }
    ],
    geo: {  // 地理坐标系组件。 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
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
        type: 'map',
        // name: '省份', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        map: 'china', // 使用 registerMap 注册的地图名称。
        geoIndex: 0, // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
        itemStyle: { // 地图区域的多边形 图形样式
          color: 'yellow',
        },
        data,
      },
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
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 15, // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段
        rippleEffect: { // 涟漪特效相关配置。
          // color: 'red', // 涟漪的颜色，默认为散点的颜色。
          // number: 3, // 波纹的数量
          period: 4, // 动画的周期，秒数。
          brushType: 'stroke', // 波纹的绘制方式
          scale: 4, // 动画中波纹的最大缩放比例
        },
        // symbol: 'pin', // 标记的图形。
        symbolSize(value, params) {
          console.log(value)
          // console.log(value, params)
          // const { data } = params
          // const { content } = data
          // console.log(content)
          return 10
        }, // 标记的大小
        // symbolSize: (value, params) => {
        //   return 10
        // }, // 标记的大小
        // label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
        //   show: false
        // },
        itemStyle: { // 图形样式。
          color: '#FFB800',
          opacity: 1,
        },
        // emphasis: { // 高亮的图形和标签样式
        //   scale: 20
        // },
        data: nobejingCoord,
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
