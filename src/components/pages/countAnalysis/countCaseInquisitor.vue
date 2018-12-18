<template>
  <div id="caseInquisitor">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <div id="echarts" ref="echartsWrap">
          <rank-chart :config="config" :text="chartText" :chartData="chartData">

          </rank-chart>
        </div>

      </div>
      <!--表格-->
      <div id="table" ref="table">
        <Table :loading="isLoading" :height="tableHeight"  border stripe :columns="columns1" :data="infoData" ></Table>
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
        chartText: '检察官公开案件排行榜',//图表名称
        tableHeight: '',//表格高度
        showTable: false,//显示表格
        isLoading: false,//加载
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
            maxWidth: 80
          },
          {
            title: '检察官',
            key: 'CBR',
            align: 'center',
            maxWidth: 100
          },
          {
            title: '单位名称',
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
                        title: _this.infoData[params.index].inquisitor,
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
                        title: _this.infoData[params.index].inquisitor,
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
            key: 'TYWGKBXTYGKSL',
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
                }, _this.infoData[params.index].TYWGKBXTYGKSL)
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
                        title: _this.infoData[params.index].inquisitor,
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
            maxWidth: 100
          },
        ],
        infoData: [//表格数据
        ],
        chartData: [],//图表数据
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
        cbr: '',//承办人
      }
    },
    created() {

    },
    mounted() {
      this.initBus();
      this.setTableHeight(this);//设置表格高度
    },
    beforeDestroy() {
      this.$bus.$off('countSearch');
    },
    methods: {
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',true);
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.cbr = val.cbr;
          _this.$bus.$emit('myChartLoading',true);
          _this.getOpenCaseTableByPerson();
        });
        this.$bus.$emit('loadComplete',true);
      },
      //获取检察官公开案件列表
      getOpenCaseTableByPerson() {
        let _this = this;
        let config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
          cbr: this.cbr
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenCaseTableByPerson.format(config))
          .then(function(res){
            ;
            _this.isLoading = false;
            if(res.data.code === 0){
              let data = res.data.data.Table;
              let cData = [];
              if(data.length > 0) {
                data.sort(_this.compareData('GKL')).reverse();
              }
              //检察官案件公开排行榜数据
              data.forEach(function(item,index){
                item.order = index + 1;
                //图表数据
                cData.push({
                  name: item.CBR,
                  value: item.GKL
                })
              });
              _this.setChartHeight(data);
              _this.chartData = cData;
              _this.infoData = data;
              // _this.$bus.$emit('resetMyChart',true);
            }
          })
          .catch(function(err){
            console.log(err)
            _this.isLoading = false;
          })
      },
      //设置图表高度
      setChartHeight(data) {
        let chartWrap = this.$refs.echartsWrap;
        let height = data.length * 35;
        if(height < 500) {
          height = 500;
        }
        chartWrap.style.height = height + 'px';
      },
      compareData(property) {//比较公开率
        return function(pre,next) {
          let valPre = pre[property].split('%')[0];
          let valNext = next[property].split('%')[0];
          return valNext - valPre;
        }
      },
      closeTable() {
        this.showTable = false;
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
        width: 500px;
        height: calc( 100% - 35px - 38px - 20px);
        overflow-y: auto;
        #echarts {
          height: 500px;
        }
      }

    }
  }
</style>
