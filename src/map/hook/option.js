
export default (data) => {
  return  {
        // tooltip: { // 提示框组件
        //   //数据格式化
        //   formatter: function (params, callback) {
        //     return (
        //       params.seriesName + "<br />" + params.name + "：" + params.value
        //     );
        //   },
        // },
        visualMap: { // 视觉映射组件
          min: 0,
          max: 1000,
          left: "left",
          top: "bottom",
          text: ["高", "低"], //取值范围的文字
          inRange: {
            color: ["#e0ffff", "blue"], //取值范围的颜色
          },
          show: true, //图注
        },
        geo: { // 地理坐标系组件
          map: 'china', //引入地图数据, 使用 registerMap 注册的地图名称。
          roam: false, //不开启缩放和平移
          zoom: 1, //视角缩放比例
          label: { // 图形上的文本标签，可用于说明图形的一些数据信息，比如名称，值等.
            normal: {
              show: true,
              fontSize: "10",
              color: "rgba(0,0,0,0.7)",
            },
          },
          itemStyle: { // 地图区域多边形样式
            /*
              normal 普通
              emphasis 高亮
            */
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
            },
            emphasis: { //高亮的显示设置
              areaColor: "skyblue", //鼠标选择区域颜色。地图区域颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
        // 鼠标悬浮提示框通过
        series: [ // 系列列表。每个系列 type 决定自己的图表类型
          {
            name: "省份",
            type: "map",
            geoIndex: 0,
            data,
          },
        ],
      };
}