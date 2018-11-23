<template>
  <div id="docType">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <!--文书公开趋势-->
        <div ref="docTrendEchart"></div>
        <!--文书公开类型占比-->
        <div ref="docTypeEchart"></div>
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
        docTypeEchart: null,//文书类型占比
        docTrendEchart: null,//文书公开趋势
        tableHeight: '',//表格高度
        showTable: false,//显示表格
        columns1: [//表头数据
          {
            title: '时间',
            key: 'time',
            align: 'center',
          },
          {
            title: '起诉书',
            key: 'indictment',
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
                        title: _this.infoData[params.index].time,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].indictment)
              ]);
            }
          },
          {
            title: '抗诉书',
            key: 'protest',
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
                        title: _this.infoData[params.index].time,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].protest)
              ]);
            }
          },
          {
            title: '不起诉决定书',
            key: 'noIndictment',
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
                        title: _this.infoData[params.index].time,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].noIndictment)
              ]);
            }
          },
          {
            title: '刑事申诉复查决定书',
            key: 'criminal',
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
                        title: _this.infoData[params.index].time,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].criminal)
              ]);
            }
          },

        ],
        infoData: [//表格数据
          {
            time: '一月',
            indictment: '20',
            protest: '12',
            noIndictment: 9,
            criminal: 5,
          },
          {
            time: '二月',
            indictment: '25',
            protest: '13',
            noIndictment: 5,
            criminal: 10,
          },
          {
            time: '三月',
            indictment: '30',
            protest: '14',
            noIndictment: 0,
            criminal: 7,
          },
          {
            time: '四月',
            indictment: '20',
            protest: '12',
            noIndictment: 9,
            criminal: 5,
          },
          {
            time: '五月',
            indictment: '25',
            protest: '13',
            noIndictment: 5,
            criminal: 10,
          },
          {
            time: '六月',
            indictment: '30',
            protest: '14',
            noIndictment: 0,
            criminal: 7,
          },
          {
            time: '七月',
            indictment: '20',
            protest: '12',
            noIndictment: 9,
            criminal: 5,
          },
          {
            time: '八月',
            indictment: '25',
            protest: '13',
            noIndictment: 5,
            criminal: 10,
          },
          {
            time: '九月',
            indictment: '30',
            protest: '14',
            noIndictment: 0,
            criminal: 7,
          },
          {
            time: '十月',
            indictment: '20',
            protest: '12',
            noIndictment: 9,
            criminal: 5,
          },
          {
            time: '十一月',
            indictment: '25',
            protest: '13',
            noIndictment: 5,
            criminal: 10,
          },
          {
            time: '十二月',
            indictment: '30',
            protest: '14',
            noIndictment: 0,
            criminal: 7,
          }

        ]
      }
    },
    created() {
      this.$bus.$emit('setInquisitor',false);
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.initDocTrendEchart();//文书公开趋势
      this.initDocTypeEchart();//文书占比
      this.watchEcharts();
    },
    methods: {
      closeTable() {//关闭表格
        this.showTable =false;
      },
      watchEcharts() {//监听浏览器宽度改变
        window.addEventListener('resize',this.repaintEcharts);
      },
      repaintEcharts() {//重绘图表
        this.docTrendEchart.dispose();
        this.docTypeEchart.dispose();
        this.initDocTrendEchart();
        this.initDocTypeEchart();
      },
      //文书类型占比
      initDocTypeEchart() {
        this.docTypeEchart = this.$echarts.init(this.$refs.docTypeEchart);
        var option = {
          title: {
            text: '文书公开类型占比',
             x: 'center',
            textStyle: {
              fontSize: 16,
              fontFamily: 'PingFang-SC-Bold',
              fontWeight: 'bold',
              color: 'rgba(85,85,85,1)'
            },
            top: 70
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            bottom: 70,
            data: ['起诉书', '抗诉书','不起诉决定书','刑事申诉复查决定书'],
            itemWidth: 14,
            itemHeight: 14
          },

          color: ['#4589FD','#34ABFE','#8BB3F7','#31CDEF'],
          series : [
            {
              type: 'pie',
              radius : '40%',
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight:400,
                color: '#555555'
              },
              data:[
                {value:535, name: '起诉书'},
                {value:510, name: '抗诉书'},
                {value:634, name: '不起诉决定书'},
                {value:735, name: '刑事申诉复查决定书'}
              ],
            }
          ]
        };

        this.docTypeEchart.setOption(option);
      },
      //文书公开趋势图表
      initDocTrendEchart() {
        this.docTrendEchart = this.$echarts.init(this.$refs.docTrendEchart);
        var option = {
          title: {
            text: '文书公开趋势',
            x: 'center',
            textStyle: {
              fontSize: 16,
              fontFamily: 'PingFang-SC-Bold',
              fontWeight: 'bold',
              color: 'rgba(85,85,85,1)'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['起诉书','抗诉书','不起诉决定书','刑事申述复查决定书'],
            bottom: 0,

          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: "45",
              fontSize:14,
              fontFamily: 'PingFang-SC-Regular',
              fontWeight: 400,
              color: 'rgba(85,85,85,1)',
            },
            data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value',
            fontSize:14,
            fontFamily: 'PingFang-SC-Regular',
            fontWeight: 400,
            color: 'rgba(85,85,85,1)',
          },
          color: ['#4589FD','#34ABFE','#8BB3F7','#31CDEF'],
          series: [
            {
              name:'起诉书',
              type:'line',
              stack: '总量',
              data:[20, 25, 30, 20, 25, 30, 20,25,30,20,25,30]
            },
            {
              name:'抗诉书',
              type:'line',
              stack: '总量',
              data:[12, 12, 11, 13, 15, 16, 13,12,11,15,12,16]
            },
            {
              name:'不起诉决定书',
              type:'line',
              stack: '总量',
              data:[10, 5, 0, 10, 5, 0, 10, 5, 0, 10, 5, 0]
            },
            {
              name:'刑事申述复查决定书',
              type:'line',
              stack: '总量',
              data:[5, 10, 5, 5, 10, 5, 5, 10, 5,5, 10, 5]
            },
          ]
        };
        this.docTrendEchart.setOption(option);
      }
    },
    destroyed() {
      window.removeEventListener('resize',this.repaintEcharts);
      this.docTrendEchart.dispose();
      this.docTypeEchart.dispose();
    },
  }
</script>

<style scoped lang="scss">
  #docType {
    height: 100%;
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
        float: right;
        width: 500px;
        height: calc( 100% - 35px - 38px - 20px);
        /*height: 100%;*/
        overflow-y: auto;
        >div {
          height: 500px;
          margin-bottom: 0;
        }
      }
    }
  }
</style>
