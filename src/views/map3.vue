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

    {
      name: '西藏', value: 100 },
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

  /*

      连续区间

      设置 visual 值时，请一次性全部设置，而非只设置一部分


      区块样式

      连续型区间
      type: 'continuous',
      min: 0,
      max: 1000,

      inRange: {
        color: ['#e0ffff', 'blue'], //取值范围的颜色
        colorAlpha: [0,1], // 图元的颜色的透明度。
      },

      等分区间
       type: 'piecewise',
        min: 0,
        max: 1000,
       splitNumber: 4,
      inRange: {
         color: ['red','yellow' ,'blue', 'grey'],//取值范围的颜色. 图元的颜色。
         colorAlpha: 1
      }


      自定义区间
      type: 'piecewise',
      pieces: [
        { max: 500, color: 'grey' },
        { min: 500, max: 600, color: 'yellow' },
        { min: 600, max: 700, color: 'blue' },
        { min: 700,  color: 'red' },
      ],
      inRange: {
        colorAlpha: 1
      },

      数据标签
      label: {
        show: true,
        fontSize: 12,
        color: '#43D0D6',
        formatter(params) {
          const { name } = params
          const obj = data.find(item => item.name === name)

          if (obj) {
            const { value } = obj
            return `{a|${name}}\n{b|${value}}`
          } else {
            return ''
          }
        },
        rich: {
          a: {
            color: 'white',
            fontSize: 12,
            fontStyle: 'italic',
            // fontWeight: 'bolder'
          },
          b: {
            color: 'red',
            fontSize: 14,
            fontWeight: 'bold'
          },
        }
      },

      // 图列
      show: true, //图注
      seriesIndex: 0,
      showLabel: true, // 是否显示每项的文本标签
      backgroundColor: '#ccc',
      textStyle: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'oblique'
      }
  */

  const option = {
    visualMap: { // 视觉映射组件
      type: 'piecewise',
      pieces: [
        { max: 500, color: 'grey' },
        { min: 500, max: 600, color: 'yellow' },
        { min: 600, max: 700, color: 'blue' },
        { min: 700,  color: 'red' },
      ],
      left: 'left',
      top: 'bottom',
      text: ['订单金额', ''], //取值范围的文字
      inRange: {
        colorAlpha: 1
      },
      show: true, //图注
      seriesIndex: 0,
      showLabel: true, // 是否显示每项的文本标签
      backgroundColor: '#ccc',
      textStyle: {
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold',
        fontStyle: 'oblique'
      }
    },
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
        formatter(params) {
          const { name } = params
          const obj = data.find(item => item.name === name)

          if (obj) {
            const { value } = obj
            return `{a|${name}}\n{b|${value}}`
          } else {
            return ''
          }
        },
        rich: {
          a: {
            color: 'white',
            fontSize: 12,
            fontStyle: 'italic',
            // fontWeight: 'bolder'
          },
          b: {
            color: 'red',
            fontSize: 14,
            fontWeight: 'bold'
          },
        }
      },
      itemStyle: {
        color: '#062031',
        // areaColor: 'red',
        borderWidth: 1.1,
        borderColor: '#43D0D6',
      },
      emphasis: {
        disabled : true,
      },
    },
    series: [
      {
        type: 'map', // 地图主要用于地理区域数据的可视化，配合 visualMap 组件用于展示不同区域的人口分布密度等数据。
       // name: '省份', // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
       // map: 'china', // 使用 registerMap 注册的地图名称。
       geoIndex: 0, // 默认情况下，map series 会自己生成内部专用的 geo 组件。但是也可以用这个 geoIndex 指定一个 geo 组件。这样的话，map 和 其他 series（例如散点图）就可以共享一个 geo 组件了。并且，geo 组件的颜色也可以被这个 map series 控制，从而用 visualMap 来更改。 当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
        // itemStyle: { // 地图区域的多边形 图形样式
        //   color: 'yellow',
        // },
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
