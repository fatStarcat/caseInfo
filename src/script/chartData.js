function ChartData() {//图表对象
  let _this = this;
  this.chartObj = {};//echart对象,多个
  this.mapData =  [];//地图数据
  this.initMap = function(){
      for(let item in this.chartObj) {
        console.log('chart',item)
        this.chartObj[item].initMap();
      }
  }
  // this.initMap = function(){//初始化图表方法
  //   if(_this.chartObj['#mapEcharts']) {
  //     _this.chartObj['#mapEcharts'].dispose();//注销
  //   }
  //   if(document.querySelector('#mapEcharts')) {
  //     let myEchart = $echarts.init(document.querySelector('#mapEcharts'));
  //     let option = {
  //       backgroundColor: 'transparent',
  //       tooltip: {
  //         trigger: 'item',
  //         formatter: '{b}'
  //       },
  //       animationDuration:1000,
  //       animationEasing:'cubicOut',
  //       animationDurationUpdate:1000,
  //       series : [
  //         {
  //           name: 'HG',
  //           type: 'map',
  //           mapType: 'HG',
  //           roam: false,
  //           nameMap:{
  //             'china':'中国'
  //           },
  //           label: {
  //             normal:{
  //               show:true,
  //               textStyle:{
  //                 color:'#fff',
  //                 fontSize:13
  //               }
  //             },
  //             emphasis: {
  //               show: true,
  //               textStyle:{
  //                 color:'#fff',
  //                 fontSize:13
  //               }
  //             }
  //           },
  //           itemStyle: {
  //             normal: {
  //               areaColor: '#4589fd',
  //               borderColor: '#095be6'
  //             },
  //             emphasis: {
  //               areaColor: 'darkorange'
  //             }
  //           },
  //           data: _this.mapData
  //         }
  //       ]
  //
  //     };
  //     myEchart.setOption(option);
  //     _this.chartObj['#mapEcharts'] = myEchart;
  //   }
  // }
}

window.chartData = new ChartData();//图表对象
