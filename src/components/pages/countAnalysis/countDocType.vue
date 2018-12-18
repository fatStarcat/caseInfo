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
        docTypeEchart: null,//文书类型占比
        docTrendEchart: null,//文书公开趋势
        tableHeight: '',//表格高度
        showTable: false,//显示表格
        isLoading: false,//显示加载
        columns1: [//表头数据
          {
            title: '时间',
            key: 'YF',
            align: 'center',
          },
          {
            title: '起诉书',
            key: 'QSSSL',
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
                }, _this.infoData[params.index].QSSSL)
              ]);
            }
          },
          {
            title: '抗诉书',
            key: 'KSSSL',
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
                }, _this.infoData[params.index].KSSSL)
              ]);
            }
          },
          {
            title: '不起诉决定书',
            key: 'BQSJDSSL',
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
                }, _this.infoData[params.index].BQSJDSSL)
              ]);
            }
          },
          {
            title: '刑事申诉复查决定书',
            key: 'XSSSFCJDSSL',
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
                }, _this.infoData[params.index].XSSSFCJDSSL)
              ]);
            }
          },

        ],
        infoData: [//表格数据
        ],
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
        openDocChartData: [],//公开文书趋势图数据
      }
    },
    created() {

    },
    mounted() {
      this.initBus();
      this.setTableHeight(this);//设置表格高度
      // this.initDocTrendEchart();//文书公开趋势
      // this.initDocTypeEchart();//文书占比
      this.watchEcharts();
    },
    beforeDestroy() {
      this.$bus.$off('countSearch');
    },
    methods: {
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',false);
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.initChartAndShowLoad();//显示加载
          _this.getDocListByType();
        });
        this.$bus.$emit('loadComplete',true);
      },
      initChartAndShowLoad() {
        if(!this.docTrendEchart) {
          this.docTrendEchart = this.$echarts.init(this.$refs.docTrendEchart);
        }
        if(!this.docTypeEchart) {
          this.docTypeEchart = this.$echarts.init(this.$refs.docTypeEchart);
        }
        this.docTrendEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
        this.docTypeEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
      },
      getDocListByType() {//获取列表
        let _this = this;
        let config;
        config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenDocTableByWslb.format(config))
          .then(function(res){

            _this.isLoading = false;
            if(res.data.code === 0){
              let data = res.data.data;
              _this.infoData = data;
              _this.openDocChartData = data;
              _this.initDocTrendEchart();//文书公开情况趋势图
              _this.initDocTypeEchart();//文书类型占比图
            }
          }).catch(function(err){
            console.log(err);
          _this.isLoading = false;
        })
      },
      getXAxisDataAndSData() {//获取图表x轴值和表数据
        let xAxisData = [];
        let obj = {};
        let legData = [];//lengend
        let data = [];//表数据
        let _this = this;
        this.openDocChartData.forEach(function(item){
          for(let i in item) {
            let docType;
            if(i==="YF") {//月份字段
              xAxisData.push(item.YF);
            }else {//
              if(!obj[i]) {
                obj[i] = i;
                if(i==="BQSJDSSL") {
                  docType = '不起诉决定书';
                }else if(i==="KSSSL") {
                  docType = '抗诉书';
                }else if(i==="QSSSL") {
                  docType = '起诉书';
                }else if(i==="XSSSFCJDSSL") {
                  docType = '刑事申诉复查决定书';
                }
                data.push({
                  name: docType,
                  AJLB_MC: i,
                  "type":"line",
                  "stack":"总量",
                  "data":[]
                  // "data":[46,9,8,4,50,26,27,11,25,16,14,24]
                });
              }
            }
          }
        });
        xAxisData.sort();
        data.forEach(function(item){//设置数据,月份占位
          item.data = [].concat(xAxisData);
        });
        data.forEach(function(xItem){
          _this.openDocChartData.forEach(function(dItem,index){ //获取该月份数据
            for(let i in dItem) {
              if(i === xItem.AJLB_MC) {
                for(let j = 0,len = xItem.data.length; j < len ; j++) {
                  if(dItem.YF == xItem.data[j]) {
                    xItem.data[j] = dItem[i];
                  }
                }
              }
            }
          })
        });
        data.forEach(function(item){//过滤某月份为空值的情况,设置为空字符串//设置图表lengend数据
          legData.push(item.name);
          for(let j = 0,len = item.data.length; j < len ; j++) {
            if(String(item.data[j]).indexOf('-') > -1) {
              item.data[j] = 0;
            }
          }
        });
        return {
          data: data,
          xAxisData: xAxisData,
          legData: legData
        };
      },
      handleDocTypeChartData() {//处理文书类型占比数据
        let legendData = [];
        let data = [];
        let dataItem = this.openDocChartData[0];
        let docType = [];
        let _this = this;
        //获取文书类型
        for(let i in dataItem) {
          if(i!="YF") {
            let name;
            if(i==="BQSJDSSL") {
              name = '不起诉决定书';
            }else if(i==="KSSSL") {
              name = '抗诉书';
            }else if(i==="QSSSL") {
              name = '起诉书';
            }else if(i==="XSSSFCJDSSL") {
              name = '刑事申诉复查决定书';
            }
            docType.push({
              name: name,
              AJLB_MC: i
            });
          }
        }
        docType.forEach(function(dItem){
          let count = 0;
          _this.openDocChartData.forEach(function(item){
            for(let i in item) {
              if(dItem.AJLB_MC == i) {
                count+= item[i];
              }
            }
          });
          legendData.push(dItem.name);
          data.push({
            value: count,
            name: dItem.name
          })
        });
        return {
          data: data,
          legendData: legendData
        }
      },
      closeTable() {//关闭表格
        this.showTable =false;
      },
      watchEcharts() {//监听浏览器宽度改变
        window.addEventListener('resize',this.repaintEcharts);
      },
      repaintEcharts() {//重绘图表
        this.docTrendEchart.dispose();
        this.docTypeEchart.dispose();
        // this.initDocTrendEchart();
        // this.initDocTypeEchart();
      },
      //文书类型占比
      initDocTypeEchart() {
        let data = this.handleDocTypeChartData();
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
            data: data.legendData,
            // data: ['起诉书', '抗诉书','不起诉决定书','刑事申诉复查决定书'],
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
              data: data.data
              // data:[
              //   {value:535, name: '起诉书'},
              //   {value:510, name: '抗诉书'},
              //   {value:634, name: '不起诉决定书'},
              //   {value:735, name: '刑事申诉复查决定书'}
              // ],
            }
          ]
        };

        this.docTypeEchart.setOption(option);
        this.docTypeEchart.hideLoading();
      },
      //文书公开趋势图表
      initDocTrendEchart() {
        let data = this.getXAxisDataAndSData();
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
            data: data.legData,
            // data:['起诉书','抗诉书','不起诉决定书','刑事申述复查决定书'],
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
            data: data.xAxisData
            // data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value',
            fontSize:14,
            fontFamily: 'PingFang-SC-Regular',
            fontWeight: 400,
            color: 'rgba(85,85,85,1)',
          },
          color: ['#4589FD','#34ABFE','#8BB3F7','#31CDEF'],
          series: data.data

          //   [
          //   {
          //     name:'起诉书',
          //     type:'line',
          //     stack: '总量',
          //     data:[20, 25, 30, 20, 25, 30, 20,25,30,20,25,30]
          //   },
          //   {
          //     name:'抗诉书',
          //     type:'line',
          //     stack: '总量',
          //     data:[12, 12, 11, 13, 15, 16, 13,12,11,15,12,16]
          //   },
          //   {
          //     name:'不起诉决定书',
          //     type:'line',
          //     stack: '总量',
          //     data:[10, 5, 0, 10, 5, 0, 10, 5, 0, 10, 5, 0]
          //   },
          //   {
          //     name:'刑事申述复查决定书',
          //     type:'line',
          //     stack: '总量',
          //     data:[5, 10, 5, 5, 10, 5, 5, 10, 5,5, 10, 5]
          //   },
          // ]
        };
        this.docTrendEchart.setOption(option);
        this.docTrendEchart.hideLoading();
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
