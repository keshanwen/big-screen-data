<template>
  <!-- <my-tooltip-kk :myContent="content" :myStyle="style"/> -->
  <!-- <myTooltip :myContent="content" :myStyle="style"/> -->
  <!-- <myTooltipInstance/> -->
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted, createApp } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import chinaJson from '../../public/map/china.json';
import myTooltip from './myTooltip.vue'

let containerRef = ref();
let echartInstance;
let content = [
  {
    title: '中国',
    tips: '今年营收：Y 10000 元'
  }
]
let style = {
  background: 'blue',
  color: '#F2EEEEFF',
  fontSize: '12px',
  fontStyle: 'bolder',
  fontWeight: 'bolder',
}


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
      name: '地点1',
      form: '地点1',
      to: '北京',
      value: 100,
      coords: [
        [119.5313, 29.8773],
        [116.4551, 40.2539],
      ],

    },
    {
      form: '地点2',
      to: '北京',
      value: 300,
      coords: [
        [114.072026, 22.552194],
        [116.4551, 40.2539],
      ],
    },
    {
      form: '地点3',
      to: '北京',
      value: 500,
      coords: [
        [115.89, 28.68],
        [116.4551, 40.2539],
      ],
    },
    {
      form: '地点4',
      to: '北京',
      value: 800,
      coords: [
        [111.65, 40.82],
        [116.4551, 40.2539],
      ],
    },
    {
      form: '地点5',
      to: '北京',
      value: 1000,
      coords: [
        [126.63, 45.75],
        [116.4551, 40.2539],
      ],
    },
    {
      form: '地点6',
      to: '北京',
      value: 1400,
      coords: [
        [106.71, 26.57],
        [116.4551, 40.2539],
      ],
    },
  ];

  const option = {
    tooltip: {
      show: true,
      triggerOn: 'none',
      padding: 0,
      borderWidth: 0,
      backgroundColor: 'red',
      textStyle: {
        color: '#F2EEEEFF',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 12
      },
      // hideDelay: 1000,
      // position: 'top',
     // alwaysShowContent: true,
    },
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
        tooltip: {
          show: false
        },
        data,
      },
      {
        type: 'lines',
        name: 'lines',
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
        tooltip: {
          show: true,
          formatter(params) {
           // console.log(params)
            const { data } = params
            const { form } = data

            const div = document.createElement('div')
            const app = createApp(myTooltip, {
              myContent: [
                 {
                  title: form,
                  tips: '今年营收：....... 亿'
                }
              ]
            })
            app.mount(div)

            return div
          }
        }
      },
    ],
  };
  echartInstance.setOption(option);

  let index = 0
  let showTip = setInterval(() => {
    if (index >= lines_coord.length) {
      index = 0
    }
    const data = lines_coord[index]
    const { coords } = data
    let [position] = coords
    position = echartInstance.convertToPixel('geo', position);

    echartInstance.dispatchAction({
      type: 'showTip',
      geoIndex: 0,
      seriesIndex: 1, // ····
      dataIndex: index,
      position: (point, params, dom, rect, size) => {
        const { contentSize } = size
        const height = contentSize[1]
        let prev = position[1]
        position[1] = prev - height
        return position
      }
    })
    index++
  },3000)
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
