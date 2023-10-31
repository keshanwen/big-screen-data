const path = require('path')
const fs = require('fs')


let codes = []
const commonPath = path.join(__dirname, '../mapData/provinces-geojson')
const files = fs.readdirSync(commonPath)
files.forEach(item => {
  let filePath = path.join(commonPath, `/${item}`)
  console.log(filePath, 'filePath')
  let ct = fs.readFileSync(filePath, 'utf8');
  getCode(ct)
})

function getCode(obj) {
  let { features } = JSON.parse(obj)
  features.forEach(item => {
    const { properties } = item
    const { adcode } = properties
    if (adcode !== 710000) {
       codes.push(adcode)
    }

  })
}




/* // 省份 code
let codes = [110000,120000,130000,140000,150000,210000,220000,230000,310000,320000,330000,340000,350000,360000,370000,410000,420000,430000,440000,450000,460000,500000,510000,520000,530000,540000,610000,620000,630000,640000,650000,710000,810000,820000] */


// let codes = [100000]
const ORIGIN_GEOJSON_DIR = path.resolve(__dirname, '../.temp/origin-geojson')

const MERGED_GEOJSON_DIR = path.resolve(__dirname, '../.temp/merged-geojson')

module.exports = {
  codes,
  ORIGIN_GEOJSON_DIR,
  MERGED_GEOJSON_DIR,
}


/*

第一、二位表示省级（含省、自治区、直辖市、特别行政区）。

第三、四位表示地级（含省辖行政区、地级市、自治州、地区、盟及中央直辖市所属市辖区和县的汇总码和省或自治区直辖县级行政区划汇总码）。
其中，01-20，51-70表示省直辖市；21-50表示地区（自治州、盟）。90表示省或自治区直辖县级行政区划汇总码。

第五、六位表示县级（市辖区、县级市、旗）。01-20表示市辖区或地区（自治州、盟）辖县级市；21-70表示县（旗）；81-99表示省直辖县级市；71-80表示工业园区或者经济开发区。

*/
