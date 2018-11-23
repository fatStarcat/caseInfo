<template>
  <div id="caseArea">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <!--案件公开排行榜-->
       <div class="echarts-wrap">
         <div class='echarts' ref="caseRankEchart"></div>
         <!--表格说明-->
         <span>公开率</span>
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
        <Table :height="tableHeight"  border stripe :columns="columns1" :data="infoData" ></Table>
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
        textStyle: {
          fontSize: 16,
          fontFamily: 'PingFang-SC-Bold',
          fontWeight: 'bold',
          color: 'rgba(85,85,85,1)'
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
            key: 'company',
            align: 'center',
          },
          {
            title: '案件总量',
            key: 'count',
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
                }, _this.infoData[params.index].count)
              ]);
            }
          },
          {
            title: '已公开',
            key: 'open',
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
                }, _this.infoData[params.index].open)
              ]);
            }
          },
          {
            title: '本系统已公开统一系统未公开',
            key: 'shouldOpen',
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
                }, _this.infoData[params.index].shouldOpen)
              ]);
            }
          },
          {
            title: '不公开',
            key: 'notOpen',
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
                }, _this.infoData[params.index].notOpen)
              ]);
            }
          },
          {
            title: '公开率',
            key: 'ratio',
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
        }
      }
    },
    created() {
      let data = jsonData.caseArea;
      this.$bus.$emit('setInquisitor',false);
      data = data.sort(this.compareData('ratio'));
      data.forEach(function(item,i) {
        item.order = i + 1;
        if(i==data.length-1) {
          item.order = '总计';
        }
      });
      this.infoData = data;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.initcaseRankEchart();//案件公开排行榜
      this.initcaseAreaEchart();//案件
      this.watchEcharts();
    },
    methods: {
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
        var _this = this;
        this.caseAreaEchart = this.$echarts.init(this.$refs.caseAreaEchart);
        var option = {
          title: {
            text: this.pieData.title,
            textStyle: _this.textStyle,
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
      this.caseRankEchart.dispose();
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
          text-align: center;
          margin-bottom: 50px;
        }
        .echarts {
          height: 500px;
        }
      }
    }
  }
</style>
