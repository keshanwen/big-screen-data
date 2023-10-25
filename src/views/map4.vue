<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import chinaJson from '../../public/map/china.json';
import guangdongJson from '../../public/map/省份数据/json(省份)/guangdong.json';

let containerRef = ref();
let echartInstance;

const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaJson); // 注册可用的地图
  echarts.registerMap('guangdong', guangdongJson); // 注册可用的地图

  const data = [
    {
      name: '西藏',
      value: 100,
    },
    { name: '内蒙古', value: 200 },
    { name: '江西', value: 300 },
    { name: '陕西', value: 400 },
    { name: '山东', value: 500 },
    { name: '福建', value: 600 },
    { name: '浙江', value: 700 },
    // { name: '广东', value: 800 , visualMap: false },
    { name: '上海', value: 900 },
    { name: '北京', value: 1000 },
  ];

  const option = {
    visualMap: {  // 视觉映射组件
      min: 0,
      max: 1000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], //取值范围的文字
      inRange: {
        color: ['#e0ffff', 'blue'], //取值范围的颜色
      },
      show: true, //图注
    },
    geo: [ // 地理坐标系组件。 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
      {
        map: 'china', //引入地图数据, 使用 registerMap 注册的地图名称。ECharts 也可以使用 SVG 格式的地图
       // center: [0, 29.71],
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
          formatter(params) {
            const { name } = params;
            const arr = [
              '西藏',
              '内蒙古',
              '江西',
              '陕西',
              '山东',
              '福建',
              '浙江',
              '广东',
              '上海',
              '北京',
            ];
            if (arr.includes(name)) {
              return name;
            } else {
              return '';
            }
          },
        },
        itemStyle: { // 地图区域的多边形 图形样式。
          // areaColor: 'red', // 地图区域的颜色。
          color: '#062031', // 图形的颜色。
          borderWidth: 1.1, // 描边线宽。为 0 时无描边。
          borderColor: '#43D0D6', // 图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
          //borderType: 'dashed' // 描边类型。
        },
        emphasis: { // 高亮状态下的多边形和标签样式。
          focus: 'self',
          areaColor: '#FFB800',
          label: {
            show: true,
          },
        },
        regions: [{ // 在地图中对特定的区域配置样式。
            name: '广东',
            itemStyle: {
              //   areaColor: 'red',
              // color: 'red',
              borderWidth: 1,
                borderColor: 'red'
            }
        }]
      },
      {
        // 地理坐标系组件。 地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
        map: 'guangdong', //引入地图数据, 使用 registerMap 注册的地图名称。ECharts 也可以使用 SVG 格式的地图
        zlevel: 14,
        show: false, // 是否显示地理坐标系组件
        layoutCenter: ['50%', '50%'],
        roam: false,
        layoutSize: '90%',
        zoom: 1,
        label: {
          show: true,
          fontSize: 12,
          color: '#43D0D6',
          formatter(params) {
            const { name } = params;
            const arr = [
              '西藏',
              '内蒙古',
              '江西',
              '陕西',
              '山东',
              '福建',
              '浙江',
              '广东',
              '上海',
              '北京',
            ];
            if (arr.includes(name)) {
              return name;
            } else {
              return '';
            }
          },
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
    ],
    series: [
      {
        type: 'map', // 地图主要用于地理区域数据的可视化，配合 visualMap 组件用于展示不同区域的人口分布密度等数据。
        // name: '省份', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        // map: 'china', // 使用 registerMap 注册的地图名称。
        geoIndex: 0, // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
        data,
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
