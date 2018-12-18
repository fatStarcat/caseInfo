<template>
  <div id="caseType">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <!--案件公开趋势-->
        <div ref="caseTrendEchart"></div>
        <!--案件类型占比-->
        <div ref="caseTypeEchart"></div>
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
        caseTypeEchart: null,//案件类型占比
        caseTrendEchart: null,//案件公开趋势
        tableHeight: '',//表格高度
        showTable: false,//显示表格
        isLoading: false,//显示加载
        columns1: [//表头数据
          {
            title: '案件类型',
            key: 'AJLB_MC',
            align: 'center',
          },
          {
            title: '案件数量',
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
                        title: _this.infoData[params.index].type,
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

        ],
        infoData: [//表格数据

        ],
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
        openCaseChartData: [],//案件公开趋势图数据
        caseTypeChartData: [],//案件类型占比数据
      }
    },
    created() {

    },
    mounted() {
      this.initBus();
      this.setTableHeight(this);//设置表格高度
      this.watchEcharts();
    },
    beforeDestroy() {
      this.$bus.$off('countSearch');
    },
    methods: {

      //bus事件绑定
      initBus() {
        let _this = this;
        this.$bus.$emit('setInquisitor',false);
        this.$bus.$on('countSearch',function(val){
          _this.dwbm = val.dwbm;
          _this.dateValue = val.dateValue;
          _this.bhxj = val.bhxj;
          _this.initChartAndShowLoad();//显示加载
          _this.getCaseListByType();//获取案件列表数据
          _this.getOpenCaseTableByDw();//获取案件公开趋势情况数据
        });
        this.$bus.$emit('loadComplete',true);
      },
      initChartAndShowLoad() {
        if(!this.caseTrendEchart) {
          this.caseTrendEchart = this.$echarts.init(this.$refs.caseTrendEchart);
        }
        if(!this.caseTypeEchart) {
          this.caseTypeEchart = this.$echarts.init(this.$refs.caseTypeEchart);
        }
        this.caseTrendEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
        this.caseTypeEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
      },
      //根据类型获取案件列表信息
      getCaseListByType() {
        let _this = this;
        let config;
        config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenCaseByAjlb.format(config))
          .then(function(res){

            if(res.data.code === 0){
              let data = res.data.data.Table;
              // data = _this.handleListData(data);
              _this.infoData = data;
              _this.caseTypeChartData = data;
              _this.initcaseTypeEchart();//案件占比
            }
            _this.isLoading = false;
          }).catch(function(err){
          console.log(err);
          _this.isLoading = false;
        })
      },
      //获取案件公开趋势情况
      getOpenCaseTableByDw() {
        let _this = this;
        let config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.axios.get(webApi.Stat.GetOpenCaseTrendByAjlb.format(config))
          .then(function(res){
            console.log('趋势',res);
            if(res.data.code === 0){
              let data = res.data.data;
              _this.openCaseChartData = data;
              _this.initcaseTrendEchart();//初始化案件公开趋势图
            }
          })
          .catch(function(err){
            console.log(err)
          })
      },
      handleListData(infoData) {//处理列表数据
        let listData = [];
        let listObj = {};//
        let data = [];//表数据
        infoData.forEach(function(item){//
          if(!listObj[item.AJLB_MC]) {
            listObj[item.AJLB_MC] = item.AJLB_MC;
            listData.push(item.AJLB_MC);
          }
        });
        listData.forEach(function(lItem){
          let count = 0;
          infoData.forEach(function(item){
            if(lItem == item.AJLB_MC) {
              count+=item.GKSL;
            }
          });
          data.push({
            AJLB_MC: lItem,
            GKSL: count
          })
        })
        return data;
      },
      closeTable() {//关闭表格
        this.showTable = false;
      },
      watchEcharts() {//监听浏览器宽度改变
        window.addEventListener('resize',this.repaintEcharts);
      },
      repaintEcharts() {//重绘图表
        this.caseTrendEchart.dispose();
        this.caseTypeEchart.dispose();
        this.initcaseTrendEchart();
        this.initcaseTypeEchart();
      },
      //案件类型占比
      initcaseTypeEchart() {
        let data = this.handleCaseTypeChartData();
        var option = {
          title: {
            text: '案件类型占比',
            x: 'center',
            top: 60
          },
          tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          grid: {
            left: '3%',
            right: '4%',
            // bottom: '30%',
            bottom: '5%',
            containLabel: true
          },
          legend: {
            bottom: 0,
            data: data.legendData
            // data: ["审查逮捕案件","一审公诉案件","二审上诉案件","二审抗诉案件","对民事、行政生效判决、裁定、调解书的监督案件","刑事申诉审查案件","刑事赔偿案件","生效刑事赔偿决定执行案件","刑事赔偿复议案件","刑事赔偿及民事行政诉讼赔偿监督案件件","行政赔偿监督案件","国家司法救助案件","行政公益诉讼一审案件","民事公益诉讼一审案件","行政公益诉讼二审上案件","民事公益诉讼二审上案件","行政公益诉讼二审支上案件","民事公益诉讼二审支上案件","民事公益诉讼重（再）审案件","行政公益诉讼重（再）审案件","违法所得没收申请案件","没收违法所得启动监督案件","提请批准延长侦察羁押期限案件"," 批准延长侦察羁押期限案件"]
          },
          series : [
            {
              type: 'pie',
              radius: ['40%', '50%'],
              selectedMode: 'single',
              data: data.data
              // data:[{"value":3256,"name":"审查逮捕案件"},{"value":2276,"name":"一审公诉案件"},{"value":4100,"name":"二审上诉案件"},{"value":4752,"name":"二审抗诉案件"},{"value":4096,"name":"对民事、行政生效判决、裁定、调解书的监督案件"},{"value":3960,"name":"刑事申诉审查案件"},{"value":3120,"name":"刑事赔偿案件"},{"value":5732,"name":"生效刑事赔偿决定执行案件"},{"value":2276,"name":"刑事赔偿复议案件"},{"value":4100,"name":"刑事赔偿及民事行政诉讼赔偿监督案件件"},{"value":3952,"name":"行政赔偿监督案件"},{"value":3164,"name":"国家司法救助案件"},{"value":6432,"name":"行政公益诉讼一审案件"},{"value":2276,"name":"民事公益诉讼一审案件"},{"value":3260,"name":"行政公益诉讼二审上案件"},{"value":3072,"name":"民事公益诉讼二审上案件"},{"value":5868,"name":"行政公益诉讼二审支上案件"},{"value":3956,"name":"民事公益诉讼二审支上案件"},{"value":3168,"name":"民事公益诉讼重（再）审案件"},{"value":6436,"name":"行政公益诉讼重（再）审案件"},{"value":2276,"name":"违法所得没收申请案件"},{"value":3260,"name":"没收违法所得启动监督案件"},{"value":1260,"name":"提请批准延长侦察羁押期限案件"},{"value":3160,"name":" 批准延长侦察羁押期限案件"}],
            }
          ]
        };

        this.caseTypeEchart.setOption(option);
        this.caseTypeEchart.hideLoading();
      },
      handleCaseTypeChartData() {//处理案件类型占比数据
        let legendData = [];
        let data = [];
        this.caseTypeChartData.forEach(function(item){
          legendData.push(item.AJLB_MC);
          data.push({
            value: item.GKSL,
            name: item.AJLB_MC
          })
        });
        return {
          data: data,
          legendData: legendData
        }
      },
      getXAxisDataAndSData() {//获取图表x轴值和表数据
        let xAxisData = [];
        let lenData = [];//lengend
        let xAxisObj = {};//月份去重用
        let data = [];//表数据
        let _this = this;
        this.openCaseChartData.forEach(function(item){//月份去重
          if(!xAxisObj[item.YF]) {
            xAxisObj[item.YF] = item.YF;
            xAxisData.push(item.YF);
          }
          if(!xAxisObj[item.AJLB_MC]) {
            xAxisObj[item.AJLB_MC] = item.AJLB_MC;
            data.push({
              name: item.AJLB_MC,
              "type":"line",
              "stack":"总量",
              "data":[46,9,8,4,50,26,27,11,25,16,14,24]
              // "data":[46,9,8,4,50,26,27,11,25,16,14,24]
            });
          }
        });

        xAxisData.sort();
        data.forEach(function(item){//设置数据,月份占位
          item.data = [].concat(xAxisData);
        });
        data.forEach(function(xItem){
          _this.openCaseChartData.forEach(function(dItem){ //获取该月份数据
            if(xItem.name === dItem.AJLB_MC) {
              for(let j = 0,len = xItem.data.length; j < len ; j++) {
                if(dItem.YF == xItem.data[j]) {
                  xItem.data[j] = dItem.GKSL;
                }
              }
            }
          })
        });
        data.forEach(function(item){//过滤某月份为空值的情况,设置为空字符串//设置图表lengend数据
          lenData.push(item.name);
          for(let j = 0,len = item.data.length; j < len ; j++) {
            if(String(item.data[j]).indexOf('-') > -1) {
              item.data[j] = 0;
            }
          }
        });
        return {
          data: data,
          xAxisData: xAxisData,
          lenData: lenData
        };
      },
      //案件公开趋势图表
      initcaseTrendEchart() {
        let data = this.getXAxisDataAndSData();
        var option = {
          title: {
            text: '公开案件类型趋势图',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            position: ['40%','10%']
            // position: function(point, params, dom, rect, size){ // point: 鼠标位置
            //   var tipHeight = point[1] + size.contentSize[1]; // contentSize: 提示dom 窗口大小
            //   if(tipHeight > size.viewSize[1] ){              // viewSize: echarts 容器大小
            //     return [point[0]+40, point[1]-size.contentSize[1]];
            //   } else if(point[1] < size.contentSize[1]){
            //     return [point[0]+40, point[1]+20];
            //   } else {
            //     return point;
            //   }
            // },
          },
          legend: {
            data: data.lenData,
            // data: ["审查逮捕案件","一审公诉案件","二审上诉案件","二审抗诉案件","对民事、行政生效判决、裁定、调解书的监督案件","刑事申诉审查案件","刑事赔偿案件","生效刑事赔偿决定执行案件","刑事赔偿复议案件","刑事赔偿及民事行政诉讼赔偿监督案件件","行政赔偿监督案件","国家司法救助案件","行政公益诉讼一审案件","民事公益诉讼一审案件","行政公益诉讼二审上案件","民事公益诉讼二审上案件","行政公益诉讼二审支上案件","民事公益诉讼二审支上案件","民事公益诉讼重（再）审案件","行政公益诉讼重（再）审案件","违法所得没收申请案件","没收违法所得启动监督案件","提请批准延长侦察羁押期限案件"," 批准延长侦察羁押期限案件"],
            bottom: 0,

          },
          grid: {
            left: '3%',
            right: '4%',
            // bottom: '25%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: "45"
            },
            // data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            data: data.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: data.data
          // series: [{"name":"审查逮捕案件","type":"line","stack":"总量","data":[46,9,8,4,50,26,27,11,25,16,14,24]},{"name":"一审公诉案件","type":"line","stack":"总量","data":[2,4,35,32,16,20,10,23,24,31,33,17]},{"name":"二审上诉案件","type":"line","stack":"总量","data":[24,18,24,47,43,49,39,40,28,21,46,20]},{"name":"二审抗诉案件","type":"line","stack":"总量","data":[16,15,44,46,33,33,45,13,18,15,33,51]},{"name":"对民事、行政生效判决、裁定、调解书的监督案件","type":"line","stack":"总量","data":[35,46,42,40,45,3,24,17,40,34,4,36]},{"name":"刑事申诉审查案件","type":"line","stack":"总量","data":[23,7,42,27,47,18,14,17,23,36,36,43]},{"name":"刑事赔偿案件","type":"line","stack":"总量","data":[9,31,23,11,8,19,44,27,13,49,45,27]},{"name":"生效刑事赔偿决定执行案件","type":"line","stack":"总量","data":[47,36,19,2,44,43,16,18,20,26,11,11]},{"name":"刑事赔偿复议案件","type":"line","stack":"总量","data":[27,2,27,45,29,39,10,24,47,28,31,10]},{"name":"刑事赔偿及民事行政诉讼赔偿监督案件件","type":"line","stack":"总量","data":[28,28,45,18,18,25,16,48,11,29,22,39]},{"name":"行政赔偿监督案件","type":"line","stack":"总量","data":[39,25,49,12,46,51,7,47,12,33,4,22]},{"name":"国家司法救助案件","type":"line","stack":"总量","data":[48,44,17,51,5,27,50,21,10,15,3,18]},{"name":"行政公益诉讼一审案件","type":"line","stack":"总量","data":[34,44,9,26,29,23,21,23,19,30,20,21]},{"name":"民事公益诉讼一审案件","type":"line","stack":"总量","data":[44,50,11,18,36,29,19,13,19,2,37,40]},{"name":"行政公益诉讼二审上案件","type":"line","stack":"总量","data":[49,41,20,5,5,25,16,33,32,38,44,12]},{"name":"民事公益诉讼二审上案件","type":"line","stack":"总量","data":[35,26,44,17,12,32,32,10,41,16,46,8]},{"name":"行政公益诉讼二审支上案件","type":"line","stack":"总量","data":[15,34,35,19,3,49,5,19,25,27,4,31]},{"name":"民事公益诉讼二审支上案件","type":"line","stack":"总量","data":[10,38,28,48,44,45,8,22,12,21,14,24]},{"name":"民事公益诉讼重（再）审案件","type":"line","stack":"总量","data":[19,33,51,27,21,45,32,12,47,42,41,21]},{"name":"行政公益诉讼重（再）审案件","type":"line","stack":"总量","data":[23,40,25,41,14,17,21,16,10,45,41,31]},{"name":"违法所得没收申请案件","type":"line","stack":"总量","data":[39,4,34,6,36,40,8,28,30,24,47,4]},{"name":"没收违法所得启动监督案件","type":"line","stack":"总量","data":[44,7,40,40,49,39,40,30,21,15,30,35]},{"name":"提请批准延长侦察羁押期限案件","type":"line","stack":"总量","data":[36,19,4,49,22,9,33,21,36,5,25,51]},{"name":" 批准延长侦察羁押期限案件","type":"line","stack":"总量","data":[5,17,2,19,28,37,17,8,38,37,51,29]}]
        };
        this.caseTrendEchart.setOption(option);
        this.caseTrendEchart.hideLoading();
      }
    },
    destroyed() {
      window.removeEventListener('resize',this.repaintEcharts);
      this.caseTrendEchart.dispose();
      this.caseTypeEchart.dispose();
    },
  }
</script>

<style scoped lang="scss">
  #caseType {
    height: 100%;
    #main {
      height: 100%;
      #table {
        position: relative;
        height: calc( 100% - 35px - 38px - 20px);
        margin-right: 920px;
        /*按钮*/
        #exportData { /*导出按钮*/
          float: right;
          margin-top: 20px;
        }
      }
      #echarts-wrap {
        float: right;
        width: 900px;
        height: calc( 100% - 35px - 38px - 20px);
        overflow-y: auto;
        >div {
          height: 700px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
