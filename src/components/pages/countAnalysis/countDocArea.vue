<template>
  <div id="docArea">
    <div id="main">
      <!--图表-->
      <div id="echarts-wrap" >
        <!--文书公开排行榜-->
        <div class="echarts-wrap">
          <!--<div class='echarts' ref="docRankEchart"></div>-->
          <!--<span>公开率</span>-->
          <!--&lt;!&ndash;表格说明&ndash;&gt;-->
          <rank-chart :config="config" :text="chartText" :chartData="chartData">

          </rank-chart>

        </div>
        <!--文书公开-->
        <div class="echarts-wrap">
          <div  class='echarts' ref="docAreaEchart">

          </div>
          <span class='echarts-return' v-show="showReturn" @click="returndocRatio">
            <img src="../../../assets/countAnalysis/return.png" alt="">
           <!-- <Icon  type="md-return-left" size="26"/>
            返回-->
          </span>
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
        docAreaEchart: null,//文书公开
        docRankEchart: null,//文书公开排行榜
        tableHeight: '',//表格高度
        showTable: false,//弹出表格显示
        showReturn: false,//显示返回按钮
        isLoading: false,//显示加载
        chartText: '文书公开排行榜',//柱状图名称
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
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'docArea',
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
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].YIGKSL)
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
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].YINGGKSL)
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
                      this.$bus.$emit('setTable',{
                        title: _this.infoData[params.index].company,
                        tableName: 'docArea',
                        type: params.column.title
                      });
                      _this.showTable = true;
                    }
                  }
                }, _this.infoData[params.index].YGKWGKSL)
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
                        tableName: 'docArea',
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
            {value:100, name: '本系统已公开统一系统未公开'},
            {value:1899, name: '不公开'},
            {value:2000, name: '已公开'},
          ],
          legend: [],
          title: '文书公开比例',
          color: ['#4589FD','#34ABFE','#8BB3F7']
        },
        chartData: [],//图表数据
        //父组件传递数据
        dateValue: '',//时间
        dwbm: '',//单位编码
        bhxj: '',//包含下级
      }
    },
    created() {
      // let data = jsonData.caseArea;
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
      // this.initdocRankEchart();//文书公开排行榜
      // this.initdocAreaEchart();//文书
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
          _this.getDocListData();//获取各单位文书公开数据列表
        });
        this.$bus.$emit('loadComplete',true);
      },
      getDocListData() {
        let _this = this;
        let config;
        config = {
          dwbm: this.dwbm,
          bhxj: this.bhxj,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenDocTableByDw.format(config))
          .then(function(res){

            if(res.data.code === 0){
              let data = res.data.data;
              let cData = [];
              if(data.length > 0) {
                data = _this.handleDocListData(data);
                /*排行榜图表*/
                data.forEach(function(item) {
                  //图表数据
                  cData.push({
                    name: item.CBDW_MC,
                    value: item.GKL
                  })
                })
              }
              _this.chartData = cData.reverse();
              //文书公开占比图表
              _this.pieData.title = '文书公开比例';
              _this.pieData.data = _this.handleDocTrendData(data);
              _this.pieData.legend = [];
              //表格信息
              _this.infoData = data;
              _this. initdocAreaEchart();//文书占比
              // _this.$bus.$emit('resetMyChart',true);
            }
            _this.isLoading = false;
          }).catch(function(err){
          console.log(err);
          _this.isLoading = false;
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
      handleDocTrendData(data) {//处理文书占比数据
        let type = '';
        let relData = [];
        for(let i in data[0]) {
          if(i==='BGKSL') {
            type = '不公开';
          }else if(i==="YGKWGKSL") {
            type = '应公开未公开';
          }else if(i==="YIGKSL") {
            type = '已公开';
          }else if(i==="YINGGKSL") {
            type = '应公开';
          }else {
            continue
          }
          relData.push({
            name: type,
            value: data[0][i]
          });
        };
        return relData

      },
      initChartAndShowLoad() {
        if(!this.docAreaEchart) {
          this.docAreaEchart = this.$echarts.init(this.$refs.docAreaEchart);
        }
        this.docAreaEchart.showLoading({//加载中
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
        this.docRankEchart.dispose();
        this.docAreaEchart.dispose();
        this.initdocRankEchart();
        this.initdocAreaEchart();
      },
      //文书类型占比
      initdocAreaEchart() {
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
            x:'center'
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
          color: this.pieData.color,
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

        this.docAreaEchart.setOption(option);
        this.docAreaEchart.hideLoading();
        (this.pieData.legend.length==0)&&(this.docAreaEchart.on('click',this.selectdocType));
      },
      //文书公开排行榜图表
      initdocRankEchart() {
        this.docRankEchart = this.$echarts.init(this.$refs.docRankEchart);
        var _this = this;
        var option;
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
            text: '文书公开排行榜',
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
        this.docRankEchart.setOption(option);
      },
      returndocRatio() {//返回公开比例图
        this.pieData = {
          data:[
            {value:100, name: '本系统已公开统一系统未公开'},
            {value:1899, name: '不公开'},
            {value:2000, name: '已公开'},
          ],
          legend: [],
          title: '文书公开比例',
          color: ['#4589FD','#34ABFE','#8BB3F7']
        };
        this.initdocAreaEchart();
        this.showReturn = false;
      },
      selectdocType(param) {//选择文书类型
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
        this.initdocAreaEchart();
        this.docAreaEchart.off('click');
        this.showReturn = true;
      },
    },
    destroyed() {
      window.removeEventListener('resize',this.repaintEcharts);
      // this.docRankEchart.dispose();
      this.docAreaEchart.dispose();
    },
  }
</script>

<style scoped lang="scss">
  #docArea {
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
          .echarts {
            height: 100%;
          }
        }

      }
    }
  }
</style>
