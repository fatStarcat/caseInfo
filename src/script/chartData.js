function ChartData() {//图表对象
  let _this = this;
  this.chartObj = {};//echart对象,多个
  this.mapData =  [];//地图数据
  this.initMap = function(){
      for(let item in this.chartObj) {
        console.log('chart',item)
        if('initMap' in this.chartObj[item]) {
          this.chartObj[item].initMap();
        }
      }
  }
}

window.chartData = new ChartData();//图表对象
