<template>
  <div id="caseArea">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <!--案件公开排行榜-->
       <div class="echarts-wrap">
         <!--<div class='echarts' ref="caseRankEchart"></div>-->
         <!--&lt;!&ndash;表格说明&ndash;&gt;-->
         <!--<span>公开率</span>-->
         <rank-chart :config="config" :text="chartText" :chartData="chartData">

         </rank-chart>
       </div>
        <!--案件公开-->
        <div class="echarts-wrap">
          <div  class='echarts' ref="caseAreaEchart">

          </div>
          <span class='echarts-return' v-show="showReturn" @click="returnCaseRatio">
            <!--<Icon  type="md-return-left" size="26"/>-->
            <img src="../../../assets/countAnalysis/return.png" alt="">
          </span>
        </div>

      </div>
      <!--表格-->
      <div id="table" ref="table">
        <Table :loading='isLoading' :height="tableHeight"  border stripe :columns="columns1" :data="infoData" ></Table>
        <!--导出数据-->
        <div id="exportData">
          <button class="export-all btn-tabDefault-large">导出全部数据</button>
        </div>
      </div>
    </div>
    <!--弹出表格-->
    <table-modal  @closeTable='closeTable' v-show="showTable"></table-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        caseAreaEchart: null,//案件公开
        caseRankEchart: null,//案件公开排行榜
        tableHeight: '',//表格高度
        showTable: false,//弹出表格显示
        showReturn: false,//显示返回按钮
        isLoading: false,//显示加载
        chartText: '案件公开排行榜',//
        config: {//图表配置项
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
              formatter: '{value}%'
            }
          }
        },
        columns1: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            width: 100
          },
          {
            title: '单位',
            key: 'CBDW_MC',
            align: 'center',
          },
          {
            title: '案件总量',
            key: 'ZL',
            align: 'center',
            render: (h, params) => {
              var _this = this;
              return h('div', [
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'caseArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].ZL)
              ]);
            }
          },
          {
            title: '已公开',
            key: 'GKSL',
            align: 'center',
            render: (h, params) => {
              var _this = this;
              return h('div', [
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'caseArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].GKSL)
              ]);
            }
          },
          {
            title: '本系统已公开统一系统未公开',
            key: 'TYWGKBXTYGK',
            align: 'center',
            render: (h, params) => {
              var _this = this;
              return h('div', [
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'caseArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].TYWGKBXTYGK)
              ]);
            }
          },
          {
            title: '不公开',
            key: 'BGKSL',
            align: 'center',
            render: (h, params) => {
              var _this = this;
              return h('div', [
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  },
                  on: {
                    click: () => {
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'caseArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].BGKSL)
              ]);
            }
          },
          {
            title: '公开率',
            key: 'GKL',
            align: 'center',
          },
        ],
        infoData: [//表格数据
        ],
        pieData: {
          data:[
            {value:2000, name: '已公开'},
            {value:1899, name: '不公开'},
            {value:100, name: '本系统已公开统一系统未公开'},
          ],
          legend: [],
          title: '案件公开比例',
          color: ['#4589FD','#34ABFE','#8BB3F7']
        },
        chartData: [],//图表数据
        //父组件传递数据
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
        openCaseProp: [],//案件公开占比数据
      }
    },
    created() {
      // let data = jsonData.caseArea;
      // this.$bus.$emit('setInquisitor',false);
      // data = data.sort(this.compareData('ratio'));
      // data.forEach(function(item,i) {
      //   item.order = i + 1;
      //   if(i==data.length-1) {
      //     item.order = '总计';
      //   }
      // });
      // this.infoData = data;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.initBus();
      this.watchEcharts();
    },
    methods: {
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',false);
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.$bus.$emit('myChartLoading',true);
          _this.initChartAndShowLoad();//显示加载
          _this.getOpenCasePropByDw();//获取案件公开占比情况
          _this.getOpenCaseInfo();//获取各单位案件公开数据列表
        });
        this.$bus.$emit('loadComplete',true);
      },
      getOpenCaseInfo(){//获取案件公开列表信息
        let _this = this;
        let config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenCaseTableByDw.format(config))
          .then(function(res){
            ;
            if(res.data.code === 0) {
              let data = res.data.data;
              let cData = [];
              if(data.length > 0) {
                data = _this.handleDocListData(data);
                data.forEach(function(item) {
                  //图表数据
                  cData.push({
                    name: item.CBDW_MC,
                    value: item.GKL
                  })
                })
              }
              _this.chartData = cData.reverse();
              _this.infoData = data;
              _this.initcaseAreaEchart();
              // _this.$bus.$emit('resetMyChart',true);
            }
            _this.isLoading = false;
          })
          .catch(function(err){
            console.log(err);
            _this.isLoading = false;
          })
      },
      //获取案件公开占比情况
      getOpenCasePropByDw() {
        let _this = this;
        let config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.axios.get(webApi.Stat.GetOpenCasePropByDw.format(config))
          .then(function(res){
            ;
            if(res.data.code===0) {
              let data = res.data.data;
              _this.openCaseprop = data;
              data = _this.handleOpenCasePropData(data);
              _this.pieData.title = '案件公开比例';
              _this.pieData.data = data.relData;
              _this.pieData.legend = [];
              _this.initcaseAreaEchart();//案件公开占比
            }
          })
          .catch(function(err){
            console.log(err);
          })
      },
      handleDocListData(data) {//处理表格数据
        data.sort(compare('GKL'));
        function compare(property) {
          return function(pre,next) {
            let preVal = pre[property].split('%')[0];
            let nextVal = next[property].split('%')[0];
            return  nextVal -  preVal;
          }
        }
        data.forEach(function(item,index){
          item.order = index + 1;
        });
        return data;
      },
      handleOpenCasePropData(data) {//处理公开占比数据
        let type = '';
        let relData = [];
        // let legendData = [];
        for(let i in data) {
          if(i === 'zl') {//总量
            continue;
          }
          if(i==='bgksl') {
            type = '不公开';
          }else if(i==="tyywgksl") {
            type = '统一业务系统未公开';
          }else if(i==="tywgkbxtygk") {
             type = '统一业务系统未公开本系统已公开';
          }
          relData.push({
            name: type,
            value: data[i]
          });
          // legendData.push(type);
        }
        return {
          relData: relData,
          // legendData: legendData
        }

      },
      initChartAndShowLoad() {
        if(!this.caseAreaEchart) {
          this.caseAreaEchart = this.$echarts.init(this.$refs.caseAreaEchart);
        }
        this.caseAreaEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
      },
      compareData(property,noSplit) {//比较公开率
        return function(pre,next) {
          if(!pre[property]||!next[property]) {
            return;
          }
          let valPre = noSplit?pre[property]:pre[property].split('%')[0];
          let valNext = noSplit?next[property]:next[property].split('%')[0];
          return valNext - valPre;
        }
      },
      closeTable() {//关闭表格
        this.showTable = false;
      },
      watchEcharts() {//监听浏览器宽度改变
        window.addEventListener('resize',this.repaintEcharts);
      },
      repaintEcharts() {//重绘图表
        this.caseRankEchart.dispose();
        this.caseAreaEchart.dispose();
        this.initcaseRankEchart();
        this.initcaseAreaEchart();
      },
      //案件类型占比
      initcaseAreaEchart() {
        console.log('pie',this.pieData)
        var _this = this;
        var option = {
          title: {
            text: this.pieData.title,
            textStyle: {
              fontSize: 16,
              fontFamily: 'PingFang-SC-Bold',
              fontWeight: 'bold',
              color: 'rgba(85,85,85,1)'
            },
            x: 'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            data: this.pieData.legend,
            bottom: 0,
            itemWidth: 14,
            itemHeight: 14
          },
          color:this.pieData.color,
          series : [
            {
              type: 'pie',
              /*radius : '55%',
              center: ['50%', '50%'],*/
              radius: ['35%', '65%'],
              selectedMode: 'single',
              // roseType: 'radius',
              label: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight:400,
                color: '#555555'
              },
              labelLine: {
                lineStyle: {
                  color: '#555555'
                }
              },
              data: _this.pieData.data
            }
          ]
        };

        this.caseAreaEchart.setOption(option);
        this.caseAreaEchart.hideLoading();
        (this.pieData.legend.length==0)&&(this.caseAreaEchart.on('click',this.selectCaseType));
      },
      //案件公开排行榜图表
      initcaseRankEchart() {
        this.caseRankEchart = this.$echarts.init(this.$refs.caseRankEchart);
        var option;
        var _this = this;
        var data = [
          {
            value: 48.9,
            name: '黄冈市黄州区院'
          },{
            value: 48.9,
            name: '红安县院'
          },{
            value: 48.9,
            name: '英山县院'
          },{
            value: 48.9,
            name: '蕲春县院'
          },{
            value: 48.9,
            name: '麻城市院'
          },{
            value: 48.9,
            name: '武穴市院'
          },{
            value: 39.06,
            name: '黄冈市院'
          },{
            value: 39.06,
            name: '团风县院'
          },{
            value: 39.06,
            name: '罗田县院'
          },{
            value: 39.06,
            name: '浠水县院'
          },{
            value: 39.06,
            name: '黄梅县院'
          },
        ];
        var nameData = [];
        data = data.sort(this.compareData('value',true)).reverse();
        data.forEach(function(item) {
          nameData.push(item.name);
        });
       option = {
          color: ['#3398DB'],
          title: {
            text: '案件公开排行榜',
            textStyle: _this.textStyle,
            x:'center'
          },
          tooltip : {
            formatter: '{b}:{c}%',
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'value',
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
                formatter: '{value}%'
              }
            }
          ],
          yAxis : [
            {
              type : 'category',
              axisLabel: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              },
              data: nameData
            }
          ],
          series : [
            {
              type:'bar',
              barWidth: '16px',
              data: data,
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
            }
          ]
        };
        this.caseRankEchart.setOption(option);
      },
      returnCaseRatio() {//返回公开比例图
        this.pieData = {
          data:[
            {value:100, name: '本系统已公开统一系统未公开'},
            {value:1899, name: '不公开'},
            {value:2000, name: '已公开'},
          ],
          legend: [],
          title: '案件公开比例',
          color: ['#4589FD','#34ABFE','#8BB3F7']
        };
        this.initcaseAreaEchart();
        this.showReturn = false;
      },
      selectCaseType(param) {//选择案件类型
        this.pieData = {
          data: [
            {value:200, name: '黄冈市院'},
            {value:300, name: '黄冈市黄州区院'},
            {value:500, name: '团风县院'},
            {value:200, name: '红安县院'},
            {value:300, name: '罗田县院'},
            {value:500, name: '英山县院'},
            {value:200, name: '浠水县院'},
            {value:300, name: '蕲春县院'},
            {value:500, name: '黄梅县院'},
            {value:500, name: '麻城市院'},
            {value:500, name: '武穴市院'},
          ],
          legend: ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
          title: param.name,
          color: ['#f6bb42','#8cc152','#f97566','#3bafda','#4a89dc','#f8c35d','#114898','#24adf1','#aab2bd','#656d78','#da4453']
        };
        this.initcaseAreaEchart();
        this.caseAreaEchart.off('click');
        this.showReturn = true;
      },
    },
    destroyed() {
      window.removeEventListener('resize',this.repaintEcharts);
      // this.caseRankEchart.dispose();
      this.caseAreaEchart.dispose();
    },
  }
</script>

<style scoped lang="scss">
  #caseArea {
    height: 100%;
    /*内容区*/
    #main {
      height: 100%;
      #table {
        height: calc( 100% - 35px - 38px - 20px);
        margin-right: 620px;
        /*按钮*/
        #exportData { /*导出按钮*/
          float: right;
          margin-top: 20px;
        }
      }
      #echarts-wrap {
        float: right;
        width: 600px;
        height: calc( 100% - 35px - 38px - 20px);
        overflow-y: auto;
        .echarts-wrap {
          height: 500px;
          text-align: center;
          margin-bottom: 50px;
        }
        .echarts {
          height:  100%;
        }

      }
    }
  }
</style>
