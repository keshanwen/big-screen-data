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

const getSvg = async function () {
  return await axios.get('/examples/data/asset/geo/Map_of_Iceland.svg');
};

const main = async () => {
  let option;
  echartInstance = echarts.init(containerRef.value);
  const { data: svg } = await getSvg();
  echarts.registerMap('iceland_svg', { svg: svg });

  const data = [
    [488.2358421078053, 459.70913833075736, '中国',100],
    [770.3415644319939, 757.9672194986475, '中国2' ,30],
    [1180.0329284196291, 743.6141808346214, '中国3' ,80],
    [894.03790632245, 1188.1985153835008, '中国4',61],
    [1372.98925630313, 477.3839988649537, '中国5',70],
    [1378.62251255796, 935.6708486282843, '中国6',81],
  ]

  let index = 0

  option = {
    geo: {
      map: 'iceland_svg',
      roam: true,
    },
    series: [
      {
        type: 'custom',
        name: 'customTips',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 1,
        data: [[488.2358421078053, 459.70913833075736, '中国',100]],
        renderItem(params, api) {
          const coord = api.coord([
            api.value(0, params.dataIndex),
            api.value(1, params.dataIndex),
          ]);
          console.log(api.value(2))
          const circles = [];
          for (let i = 0; i < 5; i++) {
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
              x: 0,
              y: -40,
              style: {
                text: [`${api.value(2)}`, `今年营收: $${api.value(3)} 万元`].join('\n'),
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

  option && echartInstance.setOption(option);

  // customTips
  setInterval(() => {
    index += 1

    if (index >= data.length) {
      index = 0
    }

    echartInstance.setOption({
      series: [
        {
          name: 'customTips',
          data: [data[index]]
        }
      ]
    })


  }, 2000)
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
