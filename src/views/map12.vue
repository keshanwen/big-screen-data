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
      name: '数据1',
      value: 100,
      coords: [
        [119.5313, 29.8773],
        [116.4551, 40.2539],
      ],
      // lineStyle: {
      //   width: 10
      // }
    },
    {
      name: '数据2',
      value: 500,
      coords: [
        [114.072026, 22.552194],
        [116.4551, 40.2539],
      ],
      // lineStyle: {
      //   width: 1
      // }
    },
    {
      name: '数据3',
      value: 1000,
      coords: [
        [115.89, 28.68],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据4',
      value: 1500,
      coords: [
        [111.65, 40.82],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据5',
      value: 1800,
      coords: [
        [114.48, 38.03],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据6',
      value: 2000,
      coords: [
        [126.63, 45.75],
        [116.4551, 40.2539],
      ],
    },
    {
      name: '数据7',
      value: 3000,
      coords: [
        [106.71, 26.57],
        [116.4551, 40.2539],
      ],
    },
  ];

  const option = {
    visualMap: [
      {
        show: true,
        type: 'continuous',
        min: 100,
        max: 3000,
        seriesIndex: 0,
        inRange: {
          color: ['#e0ffff', 'blue'],
          // colorAlpha: 0.9,
          // symbolSize: [30, 1000],
          // opacity: 0.9,
              // color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
          // symbolSize: [30, 100]
          }
      },
      // {
      //   show: true,
      //   type: 'continuous',
      //   left: '10%',
      //   min: 100,
      //   max: 3000,
      //   seriesIndex: 0,

      // }
    ],
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
        type: 'lines',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 15,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.2,
          symbol: 'arrow',
          // symbolSize: 3.6,
          // loop: true,
        },
        lineStyle: {
          width: 0.5,
          opacity: 1,
          curveness: 1,
          // color: 'red',
        },
        // label: {
        //   show: true,
        //   position: 'start',
        //   formatter(params) {
        //     console.log(params, 'params')
        //     return 24
        //   }
        // },
        data: lines_coord,
        // symbol: 'circle',
        // symbolSize: 300
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
