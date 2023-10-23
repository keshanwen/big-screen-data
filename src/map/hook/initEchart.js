import { onUnmounted } from 'vue';
import * as echarts from 'echarts';
import registerMap from './registerMap';
import { clickCb } from './event';
import chinaJson from '../utils/china.json';

export const useInitEchart = (container, option = {}) => {
  let echartInstance;

  if (!container) return;

  echartInstance = echarts.init(container);

  // 注册地图
  // registerMap(echarts)
  echarts.registerMap('china', chinaJson); // 注册可用的地图
  const coord = chinaJson.features.map((val) => {
    return {
      name: val.properties.name,
      value: val.properties.cp,
      visualMap: false,
    };
  });
  const bejingCoord = coord.filter((item) => item.name === '北京');
  const nobejingCoord = coord.filter((item) => item.name !== '北京');
  const lines_coord = [];
  coord.forEach((v, index) => {
    if (v.name !== '北京') {
      lines_coord.push({
        coords: [v.value, bejingCoord[0].value],
        visualMap: false,
      });
    }
  });

  option.series.push({
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 15,
    symbolSize: 12,
    rippleEffect: {
      period: 6,
      brushType: 'stroke',
      scale: 8,
    },
    itemStyle: {
      color: '#FF5722',
      opacity: 1,
    },
    data: bejingCoord,
  });

  option.series.push({
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 15,
    symbolSize: 8,
    rippleEffect: {
      period: 4,
      brushType: 'stroke',
      scale: 4,
    },
    itemStyle: {
      color: '#FFB800',
      opacity: 1,
    },
    data: nobejingCoord,
  });

  option.series.push({
    type: 'lines',
    coordinateSystem: 'geo',
    zlevel: 15,

   effect: {
      show: true,
      period: 5,
      trailLength: 0,
      symbol: 'arrow',
      color: '#01AAED',
      symbolSize: 8,
    },
    lineStyle: {
        width: 1.2,
        opacity: 0.6,
        curveness: 0.2,
       color: 'red',
    },
    data: lines_coord,
  });

  // 监听事件
  clickCb(echartInstance, echarts);

  echartInstance.setOption(option);

  window.addEventListener('resize', function () {
    echartInstance.resize();
  });

  onUnmounted(() => {
    echartInstance.dispose();
  });

  return {
    echartInstance,
  };
};
