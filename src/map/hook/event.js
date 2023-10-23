import { isProvince, isCity } from '../utils/util'
import axios from "axios";

export const clickCb = (myChart, echarts) => {
  myChart.on('click', async function (params) {
    const { name = null } = params
    // 省份
    if (isProvince(name)) {
      const { ename } = params.data
      if (!ename) return
      const mapPath = `map/省份数据/json(省份)/${ename}.json`
      const { data: mapData } = await axios.get(mapPath)
      echarts.registerMap(name, mapData)
      myChart.setOption({
        geo: [{ map: name }]
      });
      return;
    }
    const cityId = isCity(name)
    // 市
    if (cityId) {
      const mapPath = `map/城市数据/${cityId}.json`
      const { data: mapData } = await axios.get(mapPath)
      echarts.registerMap(name, mapData)
      myChart.setOption({
        geo: [{ map: name }]
      });
      return;
    }
  });
};
