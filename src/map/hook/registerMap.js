import chinaJson from '../utils/china.json'

export default (echarts) => {
  echarts.registerMap('china', chinaJson) // 注册可用的地图
}