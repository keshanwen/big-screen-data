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
      name: '西藏', value: 100
    },
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

  const lines_coord = [
    {
      name: '数据1',
      to: '北京',
      coords: [
        [119.5313, 29.8773],
        [116.4551, 40.2539],
      ],
      label: {
        show: true,
        formatter(p) {
          return '数据1'
        }
      }
    },
    {
      name: '数据2',
      to: '北京',
      coords: [
        [114.072026, 22.552194],
        [116.4551, 40.2539],
      ],
      label: {
        show: true,
        formatter(p) {
          return '数据2'
        }
      }
    },
    {
      name: '数据3',
      to: '北京',
      coords: [
        [115.89, 28.68],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据4',
      to: '北京',
      coords: [
        [111.65, 40.82],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据6',
      to: '北京',
      coords: [
        [126.63, 45.75],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据7',
      to: '北京',
      coords: [
        [106.71, 26.57],
        [116.4551, 40.2539],
      ],
    },
  ];

  const option = {
     visualMap: { // 视觉映射组件
      type: 'continuous',
      left: 'left',
      top: 'bottom',
      text: ['订单金额', ''], //取值范围的文字
      inRange: {
        color: ['#e0ffff', 'blue'], //取值范围的颜色
      },
      show: true, //图注
      seriesIndex: 0,
      showLabel: true, // 是否显示每项的文本标签
      backgroundColor: '#ccc',
    },
    geo: {
      map: 'china',
      zlevel: 10,
      show: true,
      layoutCenter: ['50%', '50%'],
      roam: false,
      layoutSize: '90%',
      zoom: 1,
      label: {
        show: false,
        fontSize: 12,
        color: '#43D0D6',
        formatter(p) {
          return ''
        }
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
        geoIndex: 0,
        data,
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 15,
        effect: {
          show: true,
          period: 2,
          trailLength: 0.2,
          symbol: 'arrow',
          symbolSize: 6,
          loop: true,
        },
        lineStyle: {
          width: 1,
          opacity: 0.2,
          curveness: 0.2,
          color: 'red',
        },
        label: {
          show: true,
          position: 'start',
          formatter(p) {
            const { data } = p
            const { name } = data
            return name
          }
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
  height: 100vh;
}
</style>
