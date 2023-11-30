<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import { chinaMap, chinaMapOutline } from '../../public/map/chinaMapOutline'

let containerRef = ref();
let echartInstance;
let coordinates = chinaMapOutline.features[0].geometry.coordinates



const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaMap); // 注册可用的地图

  const option = {
    backgroundColor: '#181F4E',
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
          areaColor: 'transparent',
          borderColor: 'rgba(0,255,255,.1)',
          borderWidth: 1,
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
      {
        type: 'polygon',
        coordinateSystem: 'geo',
        geoIndex: 0,
        data: coordinates,
        style: {
          fill: '#fff',
          stroke: 'red',
          // opacity: 0.3,
        },
      }
      // {
      //   type: 'custom',
      //   name: 'customTips',
      //   coordinateSystem: 'geo',
      //   geoIndex: 0,
      //   zlevel: 20,
      //   data: [[115.892151, 28.676493, '江西', 100]],
      //   renderItem(params, api) {
      //     // 坐标转换， 将经纬度，转换为 x,y 坐标
      //     // api.value(0)获取维度为 0 的值
      //     const coord = api.coord([
      //       api.value(0, params.dataIndex),
      //       api.value(1, params.dataIndex),
      //     ]);
      //     const circles = [];
      //     let polygon = {
      //       type: 'polygon',
      //       z: 100,
      //       shape: {
      //         points: coordinates,
      //       },
      //       style: {
      //         fill: '#fff',
      //         stroke: 'red',
      //         opacity: 0.3,
      //       },
      //     };
      //     circles.push(polygon)
      //     // let rect = {
      //     //   type: 'rect',
      //     //   z: 100,
      //     //   shape: {
      //     //     width: 180,
      //     //     height: 40,
      //     //     x: 0,
      //     //     y: -48,
      //     //   },
      //     //   style: {
      //     //     fill: '#fff',
      //     //     stroke: 'red',
      //     //     opacity: 0.3,
      //     //   },
      //     // };
      //     // let text = {
      //     //   type: 'text',
      //     //   z: 100,
      //     //   x: 10,
      //     //   y: -40,
      //     //   style: {
      //     //     text: [
      //     //       `${api.value(2)}`,
      //     //       `今年营收: $${api.value(3)} 万元`,
      //     //     ].join('\n'),
      //     //     fill: 'red',
      //     //   },
      //     // };
      //     // circles.push(rect);
      //     // circles.push(text);
      //     return {
      //       type: 'group',
      //       // x: coord[0],
      //       // y: coord[1],
      //       // width: 200,
      //       // height: 200,
      //       children: [
      //         ...circles,
      //       ],
      //     };
      //   },
      // },
    ],
  };
  echartInstance.setOption(option);
};

onMounted(() => {
  main();

  console.log(chinaMapOutline.features[0].geometry.coordinates, 'chinaMapOutline~~~~~')
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
