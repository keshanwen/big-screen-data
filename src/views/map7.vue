<template>
  <div ref="containerRef" class="container"></div>
</template>

<script setup>
import { ref, toRefs, reactive, onMounted } from 'vue';
import * as echarts from 'echarts';
import chinaJson from '../../public/map/china.json';

let containerRef = ref();
let echartInstance;

const main = () => {
  echartInstance = echarts.init(containerRef.value);
  echarts.registerMap('china', chinaJson); // 注册可用的地图

  const nobejingCoord = [
    {
      name: '台湾',
      value: [121.509062, 25.044332],
    },
    {
      name: '江西',
      value: [115.892151, 28.676493],
    },
    {
      name: '内蒙古',
      value: [111.670801, 40.818311],
    },
    {
      name: '吉林',
      value: [125.3245, 43.886841],
    },
    {
      name: '四川',
      value: [104.065735, 30.659462],
    },
    {
      name: '宁夏',
      value: [106.278179, 38.46637],
    },
  ];

  const data = nobejingCoord.map((item, index) => {
    const { name, value } = item;
    return [...value, name, (index + 1) * 100];
  });

  const option = {
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
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 15,
        rippleEffect: {
          period: 4,
          brushType: 'stroke',
          scale: 4,
        },
        symbolSize: 8,
        itemStyle: {
          color: '#FFB800',
          opacity: 1,
        },
        data: nobejingCoord,
      },
      {
        type: 'custom',
        name: 'customTips',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 20,
        data: [[115.892151, 28.676493, '江西', 100]],
        renderItem(params, api) {
          // 坐标转换， 将经纬度，转换为 x,y 坐标
          // api.value(0)获取维度为 0 的值
          const coord = api.coord([
            api.value(0, params.dataIndex),
            api.value(1, params.dataIndex),
          ]);
          const circles = [];
          for (let i = 0; i < 5; i++) {
            // 生成一个圆形光环
            circles.push({
              type: 'circle',
              shape: {
                cx: 0,
                cy: 0,
                r: 30,
              },
              style: {
                stroke: 'red',
                fill: 'none',
                lineWidth: 2,
              },
              // Ripple animation
              keyframeAnimation: {
                duration: 4000,
                loop: true,
                delay: (-i / 4) * 4000,
                keyframes: [
                  {
                    percent: 0,
                    scaleX: 0,
                    scaleY: 0,
                    style: {
                      opacity: 1,
                    },
                  },
                  {
                    percent: 1,
                    scaleX: 1,
                    scaleY: 0.4,
                    style: {
                      opacity: 0,
                    },
                  },
                ],
              },
            });
            let rect = {
              type: 'rect',
              z: 100,
              shape: {
                width: 180,
                height: 40,
                x: 0,
                y: -48,
              },
              style: {
                fill: '#fff',
                stroke: 'red',
                opacity: 0.3,
              },
            };
            let text = {
              type: 'text',
              z: 100,
              x: 10,
              y: -40,
              style: {
                text: [
                  `${api.value(2)}`,
                  `今年营收: $${api.value(3)} 万元`,
                ].join('\n'),
                fill: 'red',
              },
            };
            circles.push(rect);
            circles.push(text);
          }
          return {
            type: 'group',
            x: coord[0],
            y: coord[1],
            width: 200,
            height: 200,
            // bounding: 'raw',
            children: [
              ...circles,
              // {
              //   type: 'path',
              //   shape: {
              //     d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
              //     x: -10,
              //     y: -35,
              //     width: 20,
              //     height: 40,
              //   },
              //   style: {
              //     fill: 'red',
              //   },
              //   // Jump animation.
              //   keyframeAnimation: {
              //     duration: 1000,
              //     loop: true,
              //     delay: Math.random() * 1000,
              //     keyframes: [
              //       {
              //         y: -10,
              //         percent: 0.5,
              //         easing: 'cubicOut',
              //       },
              //       {
              //         y: 0,
              //         percent: 1,
              //         easing: 'bounceOut',
              //       },
              //     ],
              //   },
              // },
            ],
          };
        },
      },
    ],
  };
  echartInstance.setOption(option);

  let index = 0;
  setInterval(() => {
    index += 1;

    if (index >= data.length) {
      index = 0;
    }

    echartInstance.setOption({
      series: [
        {
          name: 'customTips',
          data: [data[index]],
        },
      ],
    });
  }, 1000);
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
