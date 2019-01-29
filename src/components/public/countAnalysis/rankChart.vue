<template>
  <div class="chart">
    <div id="ranChart" ref="myChart">

    </div>
    <span v-show="!noProp">公开率</span>
    <no-data v-show="noData"></no-data>
  </div>

</template>

<script>
    export default {
      name: "rank-chart",
      // props: ['text','chartData','config'],
      props: {
        noProp: {//显示公开率
          default: false,
        },
        chartHeight: {
          default: '500'
        },
        text: {
          default: '',
        },
        chartData: '',
        config: {
          default:  {
            xAxis:{
              type : 'value',
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              },
            }
          }
        }
      },
      data(){
          return {
            myChart: null,//图表对象
            nameData: [],//名称数据
            data: [],//表数据
            isLoading: false,//加载
            noData: false,//无数据
          }
      },
      created() {
      },
      mounted() {
        let _this = this;
        window.addEventListener('resize',this.repaintEcharts);
        this.myChart = this.$echarts.init(this.$refs.myChart);
        this.$bus.$on('myChartLoading',function(){
          _this.myChart.showLoading({//加载中
            animation:false,
            text : 'loading',
            textStyle : {fontSize : 20}
          });
          _this.isLoading = true;
        })
        //设置chart
        // this.$bus.$on('resetMyChart',function(){
        //   _this.resetEchart();
        // })
      },
      beforeDestroy() {
        window.removeEventListener('resize',this.repaintChart);
        this.$bus.$off('myChartLoading');
        // this.$bus.$off('resetMyChart');
      },
      watch: {
        chartData(){
          let _this = this;
          this.nameData = [];
          this.data = [];
          this.chartData.forEach(function(item){
            _this.nameData.push(item.name);
            if(String(item.value).indexOf('%') > -1) {
              _this.data.push(item.value.split('%')[0]);
            }else {
              _this.data.push(item.value);
            }

          });
          this.resetHeight();
          this.initChart();
        }
      },
      methods:{
        // resetEchart() {//设置echart数据
        //   let _this = this;
        //   this.nameData = [];
        //   this.data = [];
        //   console.log('rank',this.chartData)
        //   this.chartData.forEach(function(item){
        //     _this.nameData.push(item.name);
        //     if(String(item.value).indexOf('%') > -1) {
        //       _this.data.push(item.value.split('%')[0]);
        //     }else {
        //       _this.data.push(item.value);
        //     }
        //
        //   });
        //   this.resetHeight();
        //   this.initChart();
        // },
        //设置chart高度
        resetHeight() {
          let autoHeight = this.chartHeight - 40;
          this.myChart.getDom().style.height = autoHeight + "px";
          this.myChart.getDom().childNodes[0].style.height = autoHeight + "px";
          this.myChart.getDom().childNodes[0].childNodes[0].setAttribute("height",autoHeight);
          this.myChart.getDom().childNodes[0].childNodes[0].style.height = autoHeight + "px";
          this.myChart.resize();
        },
          repaintChart() {
            if(this.myChart) {
              this.myChart.dispose();
            }
            this.initChart();
          },
          // 初始化图表
          initChart() {
            var _this = this;
            var option;
            option = {
              noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                  effect: {
                    n: 0
                  }
                }
              },
              calculable : true,
              color: ['#3398DB'],
              title: {
                text: this.text,
                x: 'center',
                textStyle: {
                  fontSize: 16,
                  fontFamily: 'PingFang-SC-Bold',
                  fontWeight: 'bold',
                  color: 'rgba(85,85,85,1)'
                }
              },
              tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                containLabel: true
              },
              xAxis : this.config.xAxis,
              yAxis : [
                {
                  type : 'category',
                  axisLabel: {
                    fontSize:14,
                    fontFamily: 'PingFang-SC-Regular',
                    fontWeight: 400,
                    color: 'rgba(85,85,85,1)',
                  },
                  data: this.nameData
                  // data : ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
                }
              ],
              series : [
                {
                  type:'bar',
                  barWidth: '16px',
                  itemStyle: {
                    normal: {
                      color: new _this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#4589FD'

                      }, {
                        offset: 1,
                        color: '#156AFC'
                      }]),
                    }
                  },
                  data: this.data
                  // data:[124, 310, 580, 124, 310, 720, 124, 222, 345, 444,100].sort()
                }
              ]
            };
            this.myChart.setOption(option);
            this.myChart.hideLoading();//加载完毕
            this.isLoading = false;
            if(this.data.length==0) {
              this.noData = true;
            }else {
              this.noData = false;
            }
          }
      }
    }
</script>

<style scoped lang="scss">
  .chart {
    position: relative;
    width: 100%;
    height: calc(100% + 40px);
    text-align: center;
    #ranChart {
      width: 100%;
      padding-right: 15px;
      height: calc(100% - 40px);
    }
  }

</style>
