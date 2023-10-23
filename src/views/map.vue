<template>
  <div ref="containerRef" class="container">
  </div>
  <div>
    <input type="text" v-model="location">
    <button @click="toOther">跳到</button>
  </div>
</template>


<script setup>
import { ref, toRefs,reactive ,onMounted } from 'vue'
import { useInitEchart } from '../../src/map/hook/initEchart'
import setOption from '../../src/map/hook/option'
import { isProvince, isCity } from '../map/utils/util'
import axios from "axios";
import * as echarts from 'echarts'

let location = ref('')
let containerRef = ref()
let myEchart = null
const state = reactive({
  dataList: [
      { name: "南海诸岛" },
      { ename: "beijing", name: "北京", value: 1600},
      { ename: "tianjin", name: "天津" },
      { ename: "shanghai", name: "上海" },
      { ename: "chongqing", name: "重庆" },
      { ename: "hebei", name: "河北" },
      { ename: "henan", name: "河南"},
      { ename: "yunnan", name: "云南", value: 600 },
      { ename: "liaoning", name: "辽宁" },
      { ename: "heilongjiang", name: "黑龙江" },
      { ename: "hunan", name: "湖南"},
      { ename: "anhui", name: "安徽" },
      { ename: "shandong", name: "山东" },
      { ename: "xinjiang", name: "新疆", value: 400 },
      { ename: "jiangsu", name: "江苏" },
      { ename: "zhejiang", name: "浙江" },
      { ename: "jiangxi", name: "江西" },
      { ename: "hubei", name: "湖北" },
      { ename: "guangxi", name: "广西"},
      { ename: "gansu", name: "甘肃" },
      { ename: "shanxi", name: "山西" },
      { ename: "neimenggu", name: "内蒙古" },
      { ename: "shanxi1", name: "陕西" },
      { ename: "jilin", name: "吉林" },
      { ename: "fujian", name: "福建" },
      { ename: "guizhou", name: "贵州" },
      { ename: "guangdong", name: "广东", value: 1000 },
      { ename: "qinghai", name: "青海" },
      { ename: "xizang", name: "西藏" },
      { ename: "sichuan", name: "四川" },
      { ename: "ningxia", name: "宁夏" },
      { ename: "hainan", name: "海南" },
      { name: "台湾"},
      { ename: "xianggang", name: "香港" },
      { ename: "aomen", name: "澳门" },
  ]
})
const { dataList } = toRefs(state)

// mock 数据
function mockData() {
  for(let i = 0; i < dataList.value.length; i++){
    dataList.value[i].value = Math.ceil(Math.random() * 1000 - 1);
  }
}
// mockData()

const toOther = async (e) => {
  let name = location.value
   if (isProvince(name)) {
      const { ename } = params.data
      if (!ename) return
      const mapPath = `map/省份数据/json(省份)/${ename}.json`
      const { data: mapData } = await axios.get(mapPath)
      echarts.registerMap(name, mapData)
      myEchart.setOption({
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
      myEchart.setOption({
        geo: [{ map: name }]
      });
      return;
    }
}

const init = () => {
  const option = setOption(dataList.value)
  myEchart = useInitEchart(containerRef.value, option).echartInstance
}

onMounted(() => {
  init()
})

</script>

<style scoped lang="scss">
.container {
  width: 1200px;
  height: 800px;
  border: 1px solid red;
}

</style>