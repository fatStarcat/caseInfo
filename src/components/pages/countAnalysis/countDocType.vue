<template>
  <div id="docType">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <div class="echarts-wrap">
          <!--文书公开趋势-->
          <div class='charts' ref="docTrendEchart"></div>
          <no-data v-show="docTrendNoData"></no-data>
        </div>
        <div  class="echarts-wrap">
          <!--文书公开类型占比-->
          <div class='charts' ref="docTypeEchart"></div>
          <no-data v-show="docTypeNoData"></no-data>
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
        docTypeEchart: null,//文书类型占比
        docTrendEchart: null,//文书公开趋势
        tableHeight: '',//表格高度
        isShowTable: false,//显示表格
        isLoading: false,//显示加载
        docTrendNoData: false,//占比无数据
        docTypeNoData: false,//类型无数据
        columns1: [//表头数据
          {
            title: '时间',
            key: 'YF',
            align: 'center',
            width: 90
          },
        ],
        infoData: [//表格数据
        ],
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
        openDocChartData: [],//公开文书趋势图数据
        docTypeAllData:[//文书类型数据
          { LABEL: '刑事抗诉书',
            VALUE: 'SSKSS'
          },
          { LABEL: '刑事附带民事公益诉讼起诉书',
            VALUE: 'SSFDMSGYSSQSS'
          },
          { LABEL: '起诉书',
            VALUE: 'QSS'
          },
          { LABEL: '不起诉决定书',
            VALUE: 'BQSJDS'
          },
          { LABEL: '行政公益诉讼起诉书',
            VALUE: 'XZGYSSQSS'
          },
          { LABEL: '刑事申诉复查决定书',
            VALUE: 'XSSSFCJDS'
          },
          { LABEL: '民事抗诉书',
            VALUE: 'MSKSS'
          },
          { LABEL: '支持起诉书',
            VALUE: 'ZCQSS'
          },
          { LABEL: '抗诉书',
            VALUE: 'KSS'
          },
          { LABEL: '补充起诉决定书',
            VALUE: 'BCQSJDS'
          },
          { LABEL: '民事公益诉讼起诉书',
            VALUE: 'MSGYSSQSS'
          },
          { LABEL: '追加起诉书',
            VALUE: 'ZJQSS'
          },
          { LABEL: '行政赔偿抗诉书',
            VALUE: 'XZPCKSS'
          },
          { LABEL: '民事提请抗诉书',
            VALUE: 'MSTQKSS'
          },
          { LABEL: '刑事附带民事起诉书',
            VALUE: 'XSFDMSQSS'
          }
        ]
      }
    },
    created() {

    },
    mounted() {
      this.createTableColumns();
      this.docTrendEchart = this.$echarts.init(this.$refs.docTrendEchart);
      this.docTypeEchart = this.$echarts.init(this.$refs.docTypeEchart);
      this.initBus();
      this.setTableHeight(this);//设置表格高度
      this.watchEcharts();
    },
    beforeDestroy() {
      this.$bus.$off('countSearch');
    },
    methods: {
      exportDataAll() {
        if(this.infoData.length > 0) {
          let fileName = '文书类型分析(文书公开)' + '-'+  this.getExportTime();
          let _this = this;
          this.$Message.info('导出数据中');
          setTimeout(function(){
            _this.exportData(_this.infoData,_this.columns1,fileName);//导出数据
          },200)
        }else {
          this.$Message.warning('暂无数据可导出');
        }
      },
      /*生成表头数据*/
      createTableColumns() {
        let _this = this;
        this.docTypeAllData.forEach(function(item) {
          _this.columns1.push({
            title: item.LABEL,
            key: item.VALUE,
            align: 'center',
            render: (h, params) => {
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
                        dataType: params.column.title,
                        index: params.index,
                        nzzt:'',
                        gkzt:'',
                        bmsah:'',
                        count: params.row[item.VALUE],
                        cbrgh: ''
                      };
                      _this.showTable(config);
                    }
                  }
                }, _this.infoData[params.index][item.VALUE])
              ]);
            }
          })
        })
      },
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',false);
        this.$bus.$emit('setSelectUnit',true);//显示单位选择
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.initChartAndShowLoad();//显示加载
          _this.getDocListByType();
        });
        this.$bus.$emit('loadComplete',true);
      },
      setTime(time) {//设置时间
        let year = time.split('-')[0];
        let month = parseInt(time.split('-')[1]);
        let startTime = new Date(year,month - 1,1);
        let endTime = new Date(year,month,0 );
        startTime = this.timeFormat(startTime);
        endTime = this.timeFormat(endTime);
        return [startTime,endTime]
      },
      initChartAndShowLoad() {
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
              _this.openDocChartData = [].concat(data);
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
                _this.docTypeAllData.some(function(item){
                  if(item.VALUE === i) {
                    docType = item.LABEL;
                    return item.LABEL;
                  }
                });
                data.push({
                  name: docType,
                  AJLB_MC: i,
                  "type":"line",
                  "stack":"总量",
                  "data":[]
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
            this.docTypeAllData.some(function(item){
              if(item.VALUE === i) {
                name = item.LABEL
                return item.LABEL;
              }
            });
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
      showTable(config) {//显示表格
        let _this = this;
        let unit;
        for(let i in this.unitsCode) {
          if(this.dwbm==this.unitsCode[i]) {
            unit = i;
            break;
          }
        }
        this.$bus.$emit('setTable',{
          title: '文书类型分析(文书公开)',
          tableName: 'docInfo',
          type: '已公开',
          bhxj: _this.bhxj,
          dateValue: _this.setTime(_this.infoData[config.index].YF),
          nzzt: config.nzzt,
          gkzt: config.gkzt,
          bmsah: config.bmsah,
          wslb: config.dataType,
          dataType: config.dataType,//文书类型
          cbrgh: config.cbrgh,
          dwbm: this.dwbm,
          unit: unit,
          total: {
            '已公开': config.count,
          },
        });
        this.isShowTable = true;
      },
      closeTable() {//关闭表格
        this.isShowTable =false;
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
            }
          ]
        };

        this.docTypeEchart.setOption(option);
        this.docTypeEchart.hideLoading();
        if(data.data.length==0) {
          this.docTypeNoData = true;
        }else {
          this.docTypeNoData = false;
        }
      },
      //文书公开趋势图表
      initDocTrendEchart() {
        let data = {
          legData: [],
          xAxisData: [],
          data: []
        };
        let option;
        if(this.openDocChartData.length > 0){
          data = this.getXAxisDataAndSData();
        }
        option = {
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
            bottom: 0,

          },
          grid: {
            left: '3%',
            right: '4%',
            height: '70%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: "45",
              fontSize: 14,
              fontFamily: 'PingFang-SC-Regular',
              fontWeight: 400,
              color: 'rgba(85,85,85,1)',
            },
            data: data.xAxisData
          },
          yAxis: {
            type: 'value',
            fontSize:12,
            fontFamily: 'PingFang-SC-Regular',
            fontWeight: 400,
            color: 'rgba(85,85,85,1)',
          },
          color: ['#4589FD','#34ABFE','#8BB3F7','#31CDEF'],
          series: data.data
        };
        this.docTrendEchart.clear();
        this.docTrendEchart.setOption(option);
        this.docTrendEchart.hideLoading();
        if(data.data.length==0) {
          this.docTrendNoData = true;
        }else {
          this.docTrendNoData = false;
        }
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
        .echarts-wrap {
          position: relative;
          height: 700px;
          margin-bottom: 0;
          .charts {
            height: 100%;
          }
        }
        /*.chartsTrend {*/
          /*height: 700px;*/
        /*}*/
      }
    }
  }
</style>
