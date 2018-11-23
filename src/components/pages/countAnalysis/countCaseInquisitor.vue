<template>
  <div id="caseInquisitor">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap">
        <div id="echarts" ref="inquisitorEchart">

        </div>
        <!--表格说明-->
        <span>公开率</span>
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
        inquisitorEchart: null,//检察官图表
        tableHeight: '',//表格高度
        showTable: false,//显示表格
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
            title: '检察官',
            key: 'inquisitor',
            align: 'center',
          },
          {
            title: '单位名称',
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
                        title: _this.infoData[params.index].inquisitor,
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
                        title: _this.infoData[params.index].inquisitor,
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
                        title: _this.infoData[params.index].inquisitor,
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
                        title: _this.infoData[params.index].inquisitor,
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
        ]
      }
    },
    created() {
      let data = jsonData.caseInquisitor;
      this.$bus.$emit('setInquisitor',true);
      data = data.sort(this.compareData('ratio'));
      data.forEach(function(item,i) {
        item.order = i + 1;
      });
      this.infoData = data;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.initInquisitorEchart();
      this.watchEcharts();
    },
    methods: {
      compareData(property,noSplit) {//比较公开率
        return function(pre,next) {
          let valPre = noSplit?pre[property]:pre[property].split('%')[0];
          let valNext = noSplit?next[property]:next[property].split('%')[0];
          return valNext - valPre;
        }
      },
      closeTable() {
        this.showTable = false;
      },
      watchEcharts() {//监听浏览器宽度改变
        window.addEventListener('resize',this.repaintEcharts);
      },
      repaintEcharts() {//重绘图表
        this.inquisitorEchart.dispose();
        this.initInquisitorEchart();
      },
      //检察官公开文书排行榜
      initInquisitorEchart() {
        this.inquisitorEchart = this.$echarts.init(this.$refs.inquisitorEchart);
        var _this = this;
        var option;
        var data = [
          {
            value: 32.26,
            name: '张一'
          },{
            value: 50,
            name: '张二'
          },{
            value: 28.57,
            name: '张三'
          },{
            value: 32.26,
            name: '张四'
          },{
            value: 62.5,
            name: '张五'
          },{
            value: 20,
            name: '张六'
          },{
            value: 90,
            name: '张七'
          },{
            value: 60,
            name: '张八'
          },{
            value: 100,
            name: '张九'
          },{
            value: 87.5,
            name: '张十'
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
            text: '检察官公开案件排行榜',
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
                formatter: '{value}%',
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              }
            }
          ],
          yAxis : [
            {
              type : 'category',
              // data : ['张一', '张二', '张三', '张四', '张五', '张六', '张七', '张八', '张九', '张十'],
              axisLabel: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              },
              data : nameData,
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
              data: data
              // data:[32.26, 50, 28.57, 32.26, 62.5, 20, 90, 60,100, 87.5].sort(),
            }
          ]
        };
        this.inquisitorEchart.setOption(option);
      }
    },
    destroyed() {

      window.removeEventListener('resize',this.repaintEcharts);
      this.inquisitorEchart.dispose();
    },
  }
</script>

<style scoped lang="scss">
  #caseInquisitor {
    height: 100%;
    /*内容*/
    #main {
      height: 100%;
      #table {
        height: calc( 100% - 35px - 38px - 20px);
        margin-right: 520px;
        /*按钮*/
        #exportData { /*导出按钮*/
          float: right;
          margin-top: 20px;
        }
      }
      #echarts-wrap {
        position: relative;
        float: right;
        text-align: center;
        #echarts {
          width: 500px;
          height: 500px;
        }
      }

    }
  }
</style>
