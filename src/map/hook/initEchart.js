import { onUnmounted } from 'vue'
import * as echarts from 'echarts'
import registerMap from './registerMap'
import { clickCb } from './event'

export const useInitEchart = (container, option = {}) => {

  let echartInstance

  if (!container) return

  echartInstance = echarts.init(container)

  // 注册地图
  registerMap(echarts)

  // 监听事件
  clickCb(echartInstance,echarts)


  echartInstance.setOption(option)


  window.addEventListener('resize', function() {
    echartInstance.resize();
  });

  onUnmounted(() => {
    echartInstance. dispose()
  })


  return {
    echartInstance
  }
}