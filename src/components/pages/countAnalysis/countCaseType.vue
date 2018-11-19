<template>
  <div id="caseType">
    <div id="menu">
      <table-menu currName="countCaseType"></table-menu>
    </div>
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
        <Table :height="tableHeight"  border stripe :columns="columns1" :data="infoData" ></Table>
        <!--导出数据-->
        <div id="exportData">
            <button class="export-all">导出全部数据</button>
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
        columns1: [//表头数据
          {
            title: '案件类型',
            key: 'type',
            align: 'center',
          },
          {
            title: '案件数量',
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
                        title: _this.infoData[params.index].type,
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

        ],
        infoData: [//表格数据
          {
            type: '审查逮捕案件',
            count: 3256
          },
          {
            type: '一审公诉案件',
            count: 2276
          },
          {
            type: '二审上诉案件',
            count: 4100
          },
          {
            type: '二审抗诉案件',
            count: 4752
          },
          {
            type: '对民事、行政生效判决、裁定、调解书的监督案件',
            count: 4096
          },
          {
            type: '刑事申诉审查案件',
            count: 3960
          },
          {
            type: '刑事赔偿案件',
            count: 3120
          },
          {
            type: '生效刑事赔偿决定执行案件',
            count: 5732
          },
          {
            type: '刑事赔偿复议案件',
            count: 2276
          },
          {
            type: '刑事赔偿及民事行政诉讼赔偿监督案件件',
            count: 4100
          },
          {
            type: '行政赔偿监督案件',
            count: 3952
          },
          {
            type: '国家司法救助案件',
            count: 3164
          },
          {
            type: '行政公益诉讼一审案件',
            count: 6432
          },
          {
            type: '民事公益诉讼一审案件',
            count: 2276
          },
          {
            type: '行政公益诉讼二审上案件',
            count: 3260
          },
          {
            type: '民事公益诉讼二审上案件',
            count: 3072
          },
          {
            type: '行政公益诉讼二审支上案件',
            count: 5868
          },
          {
            type: '民事公益诉讼二审支上案件',
            count: 3956
          },
          {
            type: '民事公益诉讼重（再）审案件',
            count: 3168
          },
          {
            type: '行政公益诉讼重（再）审案件',
            count: 6436
          },
          {
            type: '违法所得没收申请案件',
            count: 2276
          },
          {
            type: '没收违法所得启动监督案件',
            count: 3260
          },
          {
            type: '提请批准延长侦察羁押期限案件',
            count: 1260
          },
          {
            type: ' 批准延长侦察羁押期限案件',
            count: 3160
          }

        ]
      }
    },
    created() {
      this.$bus.$emit('setInquisitor',false);
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.initcaseTrendEchart();//案件公开趋势
      this.initcaseTypeEchart();//案件占比
      this.watchEcharts();
    },
    methods: {
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
        this.caseTypeEchart = this.$echarts.init(this.$refs.caseTypeEchart);
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
            bottom: '30%',
            containLabel: true
          },
          legend: {
            bottom: 0,
            data: ["审查逮捕案件","一审公诉案件","二审上诉案件","二审抗诉案件","对民事、行政生效判决、裁定、调解书的监督案件","刑事申诉审查案件","刑事赔偿案件","生效刑事赔偿决定执行案件","刑事赔偿复议案件","刑事赔偿及民事行政诉讼赔偿监督案件件","行政赔偿监督案件","国家司法救助案件","行政公益诉讼一审案件","民事公益诉讼一审案件","行政公益诉讼二审上案件","民事公益诉讼二审上案件","行政公益诉讼二审支上案件","民事公益诉讼二审支上案件","民事公益诉讼重（再）审案件","行政公益诉讼重（再）审案件","违法所得没收申请案件","没收违法所得启动监督案件","提请批准延长侦察羁押期限案件"," 批准延长侦察羁押期限案件"]
          },
          series : [
            {
              type: 'pie',
              radius: ['40%', '50%'],
              selectedMode: 'single',
              data:[{"value":3256,"name":"审查逮捕案件"},{"value":2276,"name":"一审公诉案件"},{"value":4100,"name":"二审上诉案件"},{"value":4752,"name":"二审抗诉案件"},{"value":4096,"name":"对民事、行政生效判决、裁定、调解书的监督案件"},{"value":3960,"name":"刑事申诉审查案件"},{"value":3120,"name":"刑事赔偿案件"},{"value":5732,"name":"生效刑事赔偿决定执行案件"},{"value":2276,"name":"刑事赔偿复议案件"},{"value":4100,"name":"刑事赔偿及民事行政诉讼赔偿监督案件件"},{"value":3952,"name":"行政赔偿监督案件"},{"value":3164,"name":"国家司法救助案件"},{"value":6432,"name":"行政公益诉讼一审案件"},{"value":2276,"name":"民事公益诉讼一审案件"},{"value":3260,"name":"行政公益诉讼二审上案件"},{"value":3072,"name":"民事公益诉讼二审上案件"},{"value":5868,"name":"行政公益诉讼二审支上案件"},{"value":3956,"name":"民事公益诉讼二审支上案件"},{"value":3168,"name":"民事公益诉讼重（再）审案件"},{"value":6436,"name":"行政公益诉讼重（再）审案件"},{"value":2276,"name":"违法所得没收申请案件"},{"value":3260,"name":"没收违法所得启动监督案件"},{"value":1260,"name":"提请批准延长侦察羁押期限案件"},{"value":3160,"name":" 批准延长侦察羁押期限案件"}],
            }
          ]
        };

        this.caseTypeEchart.setOption(option);
      },
      //案件公开趋势图表
      initcaseTrendEchart() {
        this.caseTrendEchart = this.$echarts.init(this.$refs.caseTrendEchart);
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
            data: ["审查逮捕案件","一审公诉案件","二审上诉案件","二审抗诉案件","对民事、行政生效判决、裁定、调解书的监督案件","刑事申诉审查案件","刑事赔偿案件","生效刑事赔偿决定执行案件","刑事赔偿复议案件","刑事赔偿及民事行政诉讼赔偿监督案件件","行政赔偿监督案件","国家司法救助案件","行政公益诉讼一审案件","民事公益诉讼一审案件","行政公益诉讼二审上案件","民事公益诉讼二审上案件","行政公益诉讼二审支上案件","民事公益诉讼二审支上案件","民事公益诉讼重（再）审案件","行政公益诉讼重（再）审案件","违法所得没收申请案件","没收违法所得启动监督案件","提请批准延长侦察羁押期限案件"," 批准延长侦察羁押期限案件"],
            bottom: 0,

          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '25%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              rotate: "45"
            },
            data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{"name":"审查逮捕案件","type":"line","stack":"总量","data":[46,9,8,4,50,26,27,11,25,16,14,24]},{"name":"一审公诉案件","type":"line","stack":"总量","data":[2,4,35,32,16,20,10,23,24,31,33,17]},{"name":"二审上诉案件","type":"line","stack":"总量","data":[24,18,24,47,43,49,39,40,28,21,46,20]},{"name":"二审抗诉案件","type":"line","stack":"总量","data":[16,15,44,46,33,33,45,13,18,15,33,51]},{"name":"对民事、行政生效判决、裁定、调解书的监督案件","type":"line","stack":"总量","data":[35,46,42,40,45,3,24,17,40,34,4,36]},{"name":"刑事申诉审查案件","type":"line","stack":"总量","data":[23,7,42,27,47,18,14,17,23,36,36,43]},{"name":"刑事赔偿案件","type":"line","stack":"总量","data":[9,31,23,11,8,19,44,27,13,49,45,27]},{"name":"生效刑事赔偿决定执行案件","type":"line","stack":"总量","data":[47,36,19,2,44,43,16,18,20,26,11,11]},{"name":"刑事赔偿复议案件","type":"line","stack":"总量","data":[27,2,27,45,29,39,10,24,47,28,31,10]},{"name":"刑事赔偿及民事行政诉讼赔偿监督案件件","type":"line","stack":"总量","data":[28,28,45,18,18,25,16,48,11,29,22,39]},{"name":"行政赔偿监督案件","type":"line","stack":"总量","data":[39,25,49,12,46,51,7,47,12,33,4,22]},{"name":"国家司法救助案件","type":"line","stack":"总量","data":[48,44,17,51,5,27,50,21,10,15,3,18]},{"name":"行政公益诉讼一审案件","type":"line","stack":"总量","data":[34,44,9,26,29,23,21,23,19,30,20,21]},{"name":"民事公益诉讼一审案件","type":"line","stack":"总量","data":[44,50,11,18,36,29,19,13,19,2,37,40]},{"name":"行政公益诉讼二审上案件","type":"line","stack":"总量","data":[49,41,20,5,5,25,16,33,32,38,44,12]},{"name":"民事公益诉讼二审上案件","type":"line","stack":"总量","data":[35,26,44,17,12,32,32,10,41,16,46,8]},{"name":"行政公益诉讼二审支上案件","type":"line","stack":"总量","data":[15,34,35,19,3,49,5,19,25,27,4,31]},{"name":"民事公益诉讼二审支上案件","type":"line","stack":"总量","data":[10,38,28,48,44,45,8,22,12,21,14,24]},{"name":"民事公益诉讼重（再）审案件","type":"line","stack":"总量","data":[19,33,51,27,21,45,32,12,47,42,41,21]},{"name":"行政公益诉讼重（再）审案件","type":"line","stack":"总量","data":[23,40,25,41,14,17,21,16,10,45,41,31]},{"name":"违法所得没收申请案件","type":"line","stack":"总量","data":[39,4,34,6,36,40,8,28,30,24,47,4]},{"name":"没收违法所得启动监督案件","type":"line","stack":"总量","data":[44,7,40,40,49,39,40,30,21,15,30,35]},{"name":"提请批准延长侦察羁押期限案件","type":"line","stack":"总量","data":[36,19,4,49,22,9,33,21,36,5,25,51]},{"name":" 批准延长侦察羁押期限案件","type":"line","stack":"总量","data":[5,17,2,19,28,37,17,8,38,37,51,29]}]
        };
        this.caseTrendEchart.setOption(option);
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
    #menu {
      float: left;
      width: 200px;
      height: 100%;
    }
    #main {
      height: 100%;
      margin-left: 200px;
      #table {
        position: relative;
        height: calc(100% - 60px);
        margin-right: 920px;
      }
      #echarts-wrap {
        float: right;
        width: 900px;
        height: 100%;
        overflow-y: auto;
        >div {
          height: 700px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
