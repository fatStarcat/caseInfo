<template>
  <div id="docInquisitor">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap">
        <div id="echarts" ref="echartsWrap">
          <rank-chart :chartHeight="chartHeight" :config="config" :text="chartText" :chartData="chartData">

          </rank-chart>
        </div>


      </div>
      <!--表格-->
      <div id="table" ref="table">
        <Table :loading="isLoading" :height="tableHeight"  border stripe :columns="columns1" :data="infoData" ></Table>
        <!--导出数据-->
        <div id="exportData">
          <button class="export-all btn-tabDefault-large" @click="exportDataAll">导出全部数据</button>
        </div>
      </div>
    </div>
    <!--弹出表格-->
    <table-modal  @closeTable='closeTable' v-show="isShowTable"></table-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chartText: '检察官公开文书排行榜',//图表名称
        tableHeight: '',//表格高度
        isShowTable: false,//显示表格
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
            title: '文书总量',
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
                      let config = {
                        title: '检察官分析(文书公开)',
                        type: '全部',
                        index: params.index,
                        nzzt: '',
                        gkzt: '',
                        bmsah: '',
                      };
                      this.showTable(config);
                    }
                  }
                }, _this.infoData[params.index].ZL)
              ]);
            }
          },
          {
            title: '已公开',
            key: 'YIGKSL',
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
                      let config = {
                        title: '检察官分析(文书公开)',
                        type: '已公开',
                        index: params.index,
                        nzzt: 8,
                        gkzt: 0,
                        bmsah: '',
                      };
                      this.showTable(config);
                    }
                  }
                }, _this.infoData[params.index].YIGKSL)
              ]);
            }
          },
          {
            title: '应公开未公开',
            key: 'YGKWGKSL',
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
                      let config = {
                        title: '检察官分析(文书公开)',
                        type: '应公开未公开',
                        index: params.index,
                        nzzt: 7,
                        gkzt: 0,
                        bmsah: '',
                      };
                      this.showTable(config);
                    }
                  }
                }, _this.infoData[params.index].YGKWGKSL)
              ]);
            }
          },
          {
            title: '应公开',
            key: 'YINGGKSL',
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
                      let config = {
                        title: '检察官分析(文书公开)',
                        type: '应公开',
                        index: params.index,
                        nzzt: '',
                        gkzt: 0,
                        bmsah: '',
                      };
                      this.showTable(config);
                    }
                  }
                }, _this.infoData[params.index].YINGGKSL)
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
                      let config = {
                        title: '检察官分析(文书公开)',
                        type: '不公开',
                        index: params.index,
                        nzzt: '',
                        gkzt: 1,
                        bmsah: '',
                      };
                      this.showTable(config);
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
        chartHeight: '',//图表高度
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
      exportDataAll() {
        if(this.infoData.length > 0) {
          let fileName = '检察官分析(文书公开)' + '-'+  this.getExportTime();
          let _this = this;
          this.$Message.info('导出数据中');
          setTimeout(function(){
            _this.exportData(_this.infoData,_this.columns1,fileName);//导出数据
          },200)
        }else {
          this.$Message.warning('暂无数据可导出');
        }
      },
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',true);
        this.$bus.$emit('setSelectUnit',true);//显示单位选择
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.cbr = val.cbr;
          _this.$bus.$emit('myChartLoading',true);
          _this.getOpenDocTableByPerson();
        });
        this.$bus.$emit('loadComplete',true);
      },
      //获取检察官公开文书列表
      getOpenDocTableByPerson() {
        let _this = this;
        let config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
          cbr: this.cbr
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenDocTableByPerson.format(config))
          .then(function(res){
            ;
            _this.isLoading = false;
            if(res.data.code === 0){
              let data = res.data.data;
              let cData = [];
              if(data.length > 0) {
                data.sort(_this.compareData('GKL'));
              }
              //检察官文书公开排行榜数据
              data.forEach(function(item,index){
                item.order = index + 1;
                //图表数据
                cData.push({
                  name: item.CBR,
                  value: item.GKL
                })
              });
              if(cData.length === 0) {
                cData = [' '];
              }
              _this.setChartHeight(data);
              _this.chartData = cData.reverse();
              _this.infoData = data;
              // _this.$bus.$emit('resetMyChart',true);
            }
          })
          .catch(function(err){
            console.log(err)
            _this.isLoading = false;
          })
      },
      showTable(config) {//显示表格
        let _this = this;
        this.$bus.$emit('setTable',{
          title: config.title,
          tableName: 'docInfo',
          type: config.type,
          bhxj: _this.bhxj,
          dateValue: _this.dateValue,
          nzzt: config.nzzt,
          gkzt: config.gkzt,
          bmsah: config.bmsah,
          dataType: _this.infoData[config.index].CBR,//检察官姓名
          cbrgh: _this.infoData[config.index].CBRGH,
          dwbm: _this.infoData[config.index].CBDW_BM,
          unit: _this.infoData[config.index].CBDW_MC,
          total: {
            '全部': _this.infoData[config.index].ZL,
            '已公开':_this.infoData[config.index].YIGKSL,
            '应公开':_this.infoData[config.index].YINGGKSL,
            '不公开': _this.infoData[config.index].BGKSL,
            '应公开未公开': _this.infoData[config.index].YGKWGKSL
          },
        });
        this.isShowTable = true;
      },
      //设置图表高度
      setChartHeight(data) {
        let chartWrap = this.$refs.echartsWrap;
        let height = data.length * 35 ;
        if(height < 500) {
          height = 500;
        }
        this.chartHeight = height;
        if(chartWrap) {
          chartWrap.style.height = height + 'px';
        }
      },
      compareData(property) {//比较公开率
        return function(pre,next) {
          let valPre = pre[property].split('%')[0];
          let valNext = next[property].split('%')[0];
          return valNext - valPre;
        }
      },
      closeTable() {
        this.isShowTable = false;
      },
    },
    destroyed() {
    },
  }
</script>

<style scoped lang="scss">
  #docInquisitor {
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
