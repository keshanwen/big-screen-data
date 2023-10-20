
export const clickCb = (myChart, echarts) => {
  myChart.on('click', function (params) {
    if (!params.data.ename) {
      alert('暂无' + params.name + '地图数据');
      return;
    }
  });
};
