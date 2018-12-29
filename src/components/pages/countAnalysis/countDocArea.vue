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
          <no-data v-show="pieNoData"></no-data>
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
        docAreaEchart: null,//文书公开
        docRankEchart: null,//文书公开排行榜
        tableHeight: '',//表格高度
        isShowTable: false,//弹出表格显示
        showReturn: false,//显示返回按钮
        isLoading: false,//显示加载
        pieNoData: false,//占比无数据
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
            maxWidth: 80
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
                      let config = {
                        title: '区域分析(文书公开)',
                        type: '全部',
                        index: params.index,
                        nzzt: '',
                        gkzt: '',
                        bmsah: '',
                        cbrgh: '',
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
                        title: '区域分析(文书公开)',
                        type: '已公开',
                        index: params.index,
                        nzzt: 8,
                        gkzt: 0,
                        bmsah: '',
                        cbrgh: '',
                      };
                      this.showTable(config);
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
                      let config = {
                        title: '区域分析(文书公开)',
                        type: '应公开',
                        index: params.index,
                        nzzt: '',
                        gkzt: 0,
                        bmsah: '',
                        cbrgh: '',
                      };
                      this.showTable(config);
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
                      let config = {
                        title: '区域分析(文书公开)',
                        type: '应公开未公开',
                        index: params.index,
                        nzzt: 7,
                        gkzt: 0,
                        bmsah: '',
                        cbrgh: '',
                      };
                      this.showTable(config);
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
                      let config = {
                        title: '区域分析(文书公开)',
                        type: '不公开',
                        index: params.index,
                        nzzt: '',
                        gkzt: 1,
                        bmsah: '',
                        cbrgh: '',
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
        pieCountData: [],//文书类比占比总和数据
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
      this.docAreaEchart = this.$echarts.init(this.$refs.docAreaEchart);
      this.setTableHeight(this);//设置表格高度
      this.initBus();
      // this.initdocRankEchart();//文书公开排行榜
      // this.initdocAreaEchart();//文书
      this.watchEcharts();
    },
    methods: {
      exportDataAll() {
        if(this.infoData.length > 0) {
          let fileName = '区域分析(文书公开)' + '-'+  this.getExportTime();
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
        this.$bus.$emit('setInquisitor',false);
        this.$bus.$emit('setSelectUnit',true);
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
              }
              /*排行榜图表*/
              data.forEach(function(item) {
                //图表数据
                cData.push({
                  name: item.CBDW_MC,
                  value: item.GKL
                })
              })
              _this.chartData = cData.reverse();
              //文书公开占比图表
              _this.pieData = {
                data:_this.handleDocPropData(data),
                legend: [],
                title: '文书公开比例',
                color: ['#4589fd', '#34abfe','#8bb3f7','#31cdef']
              };
              //表格信息
              _this.infoData = data;
              console.log(_this.infoData);
              _this. initdocAreaEchart();//文书占比
              // _this.$bus.$emit('resetMyChart',true);
            }
            _this.isLoading = false;
          }).catch(function(err){
          console.log(err);
          _this.isLoading = false;
        })
      },
      getDocListSelfData(param) {//获取全部区县数据
        let _this = this;
        let config;
        config = {
          dwbm: this.dwbm,
          bhxj: true,
          startTimeStr: this.dateValue[0],
          endTimeStr: this.dateValue[1],
        };
        this.isLoading = true;
        this.axios.get(webApi.Stat.GetOpenDocTableByDw.format(config))
          .then(function(res){
            if(res.data.code === 0){
              let data = res.data.data;
              data = _this.handleSelfDocPropData(data);
              _this.pieData = {
                data: data.relObj[param.name],
                legend: data.legendData,
                title: param.name,
                color: ['#f6bb42','#8cc152','#f97566','#3bafda','#4a89dc','#f8c35d','#114898','#24adf1','#aab2bd','#656d78','#da4453']
              };
              _this.initdocAreaEchart();
              _this.docAreaEchart.off('click');
              _this.showReturn = true;
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
      handleDocPropData(data) {//处理文书占比数据(总量)
        let type = '';
        let relData = [];
        let relObj = {};
        data.forEach(function(item) {
          for(let i in item) {
            if(i==='BGKSL'||i==="YGKWGKSL"||i==="YIGKSL"){//不公开数量,应公开未公开,已公开
              if(!relObj[i]) {
                relObj[i] = item[i]?item[i]:0;
              }else {
                relObj[i]+=item[i]?item[i]:0;
              }
            }
          };
        });
        for(let i in relObj) {
          if(i==='BGKSL') {
            type = '不公开';
          }else if(i==="YGKWGKSL") {
            type = '应公开未公开';
          }else if(i==="YIGKSL") {
            type = '已公开';
          }else {
            continue
          }
          relData.push({
            name: type,
            value: relObj[i]
          });
        }
        return relData

      },
      handleSelfDocPropData(data) {//处理文书占比数据(各区县)
        let relObj = {};
        let legendData = [];
        let type;
        data.forEach(function(item) {
          legendData.push(item.CBDW_MC.replace('人民检察院',''));
          for(let i in item) {
            if(i==='BGKSL') {
              type = '不公开';
            }else if(i==="YGKWGKSL") {
              type = '应公开未公开';
            }else if(i==="YIGKSL") {
              type = '已公开';
            }else {
              continue
            }
            if(!relObj[type]) {
              relObj[type] = [];
            }
            relObj[type].push({
              name: item.CBDW_MC.replace('人民检察院',''),
              value: item[i]
            })
          }
        });
        return {
            relObj: relObj,
            legendData: legendData
          }
      },
      initChartAndShowLoad() {
        this.docAreaEchart.showLoading({//加载中
          animation:false,
          text : 'loading',
          textStyle : {fontSize : 20}
        });
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
          cbrgh: config.cbrgh,
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
      closeTable() {//关闭表格
        this.isShowTable = false;
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
        if(this.pieData.data.length==0) {
          this.pieNoData = true;
        }else {
          this.pieNoData = false;
        }
        (this.pieData.legend.length==0)&&(this.docAreaEchart.on('click',this.selectdocType));
      },
      //文书公开排行榜图表
      initdocRankEchart() {
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
          data: this.handleDocPropData(this.infoData),
          legend: [],
          title: '文书公开比例',
          color: ['#4589FD','#34ABFE','#8BB3F7']
        };
        this.initdocAreaEchart();
        this.showReturn = false;
      },
      selectdocType(param) {//选择文书类型
        this.initChartAndShowLoad();//显示加载
        this.getDocListSelfData(param);
        // let data = this.handleSelfDocPropData(this.infoData);
        // this.pieData = {
        //   data: data.relObj[param.name],
        //   legend: data.legendData,
        //   title: param.name,
        //   color: ['#f6bb42','#8cc152','#f97566','#3bafda','#4a89dc','#f8c35d','#114898','#24adf1','#aab2bd','#656d78','#da4453']
        // };
        // this.initdocAreaEchart();
        // this.docAreaEchart.off('click');
        // this.showReturn = true;
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
          position: relative;
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
