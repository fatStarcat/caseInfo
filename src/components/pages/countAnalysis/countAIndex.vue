<template>
  <div id="count-index">
    <div id="main">
      <div class="count-data">
        <div class="count-item" @click="showTable('case','案件总量')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/count.png" alt="">
          </span>
          <p>
            <span>2100</span><br/>
            <span>案件总量</span>
          </p>

        </div>
        <div class="count-item" @click="showTable('case','已公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/open.png" alt="">
          </span>
          <p>
            <span>2000</span><br/>
            <span>已公开</span>

          </p>

        </div>
        <div class="count-item" @click="showTable('case','不公开')">
           <span class="count-img">
            <img src="../../../assets/countAnalysis/noOpen.png" alt="">
          </span>
          <p>
            <span>100</span><br/>
            <span>不公开</span>

          </p>

        </div>
        <div class="count-item" @click="showTable('case','本系统已公开统一系统未公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/undisclosed.png" alt="">
          </span>
          <p>
            <span>50</span><br/>
            <span>本系统已公开统一系统未公开</span>
          </p>
        </div>
      </div>
      <!--文书-->
      <div class="count-data">
        <div class="count-item" @click="showTable('doc','统计文书')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/count.png" alt="">
          </span>
          <p>
            <span>2100</span><br/>
            <span>统计文书总量</span>

          </p>
        </div>

        <div class="count-item" @click="showTable('doc','不公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/noOpen.png" alt="">
          </span>
          <p>
            <span>100</span><br/>
            <span>不公开总量</span>

          </p>
        </div>
        <div class="count-item" @click="showTable('doc','应公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/open.png" alt="">
          </span>
          <p>
            <span>100</span><br/>
            <span>应公开总量</span>

          </p>
        </div>
        <div class="count-item" @click="showTable('doc','已公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/open.png" alt="">
          </span>
          <p>
            <span>2000</span><br/>
            <span>已公开总量</span>

          </p>
        </div>

        <div class="count-item" @click="showTable('doc','应公开未公开')">
          <span class="count-img">
            <img src="../../../assets/countAnalysis/undisclosedDoc.png" alt="">
          </span>
          <p>
            <span>50</span><br/>
            <span>应公开未公开总量</span>

          </p>
        </div>
      </div>
      <!--排行榜-->
      <div class="count-data">
        <div class="count-echarts" ref="caseRank">

        </div>
        <div class="count-echarts" ref="docRank">

        </div>
      </div>
      <div class="count-data">
        <div class="count-echarts" ref="exportInterval">

        </div>
        <div class="count-echarts" ref="messageSend">

        </div>
      </div>
    </div>
    <!--弹出表格-->
    <table-modal  @closeTable='closeTable' v-show="isShowTable"></table-modal>
  </div>
</template>

<script>
    export default {
        name: "count-a-index",
      data() {
          return {
              isShowTable: false,//显示表格
              caseRank: null,//案件公开排行榜
              docRank: null,//文书公开排行榜
              exportInterval: null,//导出间隔
              messageSend: null,//消息发送量
          }
      },
      created() {
        this.$bus.$emit('setInquisitor',false);
      },
      mounted() {
        this.initCaseRank();
        this.initDocRank();
        this.initExportInterval();
        this.initMessageSend();
        this.watchEcharts();
      },
      methods: {
          showTable(type,val) {//显示表格
            if(type=='doc') {
              this.$bus.$emit('setTable',{
                title: '文书',
                tableName: 'docArea',
                type: val
              });

            }else {
              this.$bus.$emit('setTable',{
                title: '案件',
                tableName: 'caseArea',
                type: val
              });
            }
            this.isShowTable = true;
          },
        closeTable() {//关闭表格
          this.isShowTable = false;
        },
        watchEcharts() {//监听浏览器宽度改变
          window.addEventListener('resize',this.repaintEcharts);
        },
        repaintEcharts() {//重绘图表
          this.caseRank.dispose();
          this.docRank.dispose();
          this.exportInterval.dispose();
          this.messageSend.dispose();
          this.initCaseRank();
          this.initDocRank();
          this.initExportInterval();
          this.initMessageSend();
        },
          //初始化消息发送
        initMessageSend() {
          this.messageSend = this.$echarts.init(this.$refs.messageSend);
          var option = {
            title: {
              text: '信息发送量',
              x: 'center',
              textStyle: {
                fontSize: 16,
                fontFamily: 'PingFang-SC-Bold',
                fontWeight: 'bold',
                color: 'rgba(85,85,85,1)'
              }
            },
            legend: {
              data: ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
              bottom: 0,
              itemHeight: 14,
              itemWidth: 14,
              left: 90,
            },
            grid: {
              bottom: '15%',
              containLabel: true
            },
            xAxis : {
              type : 'category',
              boundaryGap: true,
              // data: ['黄冈市院','黄州区','麻城市',' 武穴市','蕲春县 ',' 浠水县 ',' 罗田县 ',' 英山县','  团风县 ',' 黄梅县 ',' 红安县'],
              axisLabel: {
                // alignWithLabel: true
                interval: 0,
                rotate: "45",
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              }

            },
            yAxis : [
              {
                type : 'value',
                axisLabel: {
                  fontSize:14,
                  fontFamily: 'PingFang-SC-Regular',
                  fontWeight: 400,
                  color: 'rgba(85,85,85,1)',
                },
              }
            ],
            series : [
              // {
              //   type:'bar',
              //   barWidth: '60%',
              //   data: [80,22,20,30,53,10,12,10,32,48,22]
              // }
              {
                name: '黄冈市院',
                type: 'bar',
                barWidth: 30,
                data: [80],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f6bb42'
                }
              },
              {
                name: '黄冈市黄州区院',
                type: 'bar',
                barWidth: 30,
                data: [0,20],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#8cc152 '
                }
              },
              {
                name: '团风县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f97566'
                }
              },
              {
                name: '红安县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#3bafda'
                }
              },
              {
                name: '罗田县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,32],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#4a89dc'
                }
              },
              {
                name: '英山县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,20],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f8c35d '
                }
              },
              {
                name: '浠水县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#114898'
                }
              },
              {
                name: '蕲春县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,31],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#24adf1'
                }
              },
              {
                name: '黄梅县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,48],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#aab2bd'
                }
              },
              {
                name: '麻城市院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,0,24],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#656d78'
                }
              },
              {
                name: '武穴市院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#da4453'
                }
              }
            ]
          };
          this.messageSend.setOption(option);
        },
          //初始化导出间隔
        initExportInterval() {
          this.exportInterval = this.$echarts.init(this.$refs.exportInterval);
          var option = {
            title: {
              text: '导出间隔',
              x: 'center',
              textStyle: {
                fontSize: 16,
                fontFamily: 'PingFang-SC-Bold',
                fontWeight: 'bold',
                color: 'rgba(85,85,85,1)'
              }
            },
            legend: {
              data: ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
              bottom: 0,
              itemHeight: 14,
              itemWidth: 14,
              left: 90,
            },
            grid: {
              // left: '3%',
              // right: '6%',
              bottom: '15%',
              containLabel: true
            },
            // color: ['#f6bb42','#8cc152','#f97566','#3bafda','#4a89dc','#f8c35d','#114898','#24adf1','#aab2bd','#656d78','#da4453'],
            xAxis : {
              type : 'category',
              boundaryGap: true,
              // data: ['黄冈市院','黄州区','麻城市',' 武穴市','蕲春县 ',' 浠水县 ',' 罗田县 ',' 英山县','  团风县 ',' 黄梅县 ',' 红安县'],
              axisLabel: {
                // alignWithLabel: true
                interval: 0,
                rotate: "45",
                fontSize:14,
                fontFamily: 'PingFang-SC-Regular',
                fontWeight: 400,
                color: 'rgba(85,85,85,1)',
              }
            },
            yAxis : [
              {
                type : 'value',
                axisLabel: {
                  fontSize:14,
                  fontFamily: 'PingFang-SC-Regular',
                  fontWeight: 400,
                  color: 'rgba(85,85,85,1)',
                },
              }
            ],
            series : [
              // {
              //   type:'bar',
              //   barWidth: '60%',
              //   data: [80,22,20,30,53,10,12,10,32,48,22]
              // }
              {
                name: '黄冈市院',
                type: 'bar',
                barWidth: 30,
                data: [80],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f6bb42'
                }
              },
              {
                name: '黄冈市黄州区院',
                type: 'bar',
                barWidth: 30,
                data: [0,20],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#8cc152'
                }
              },
              {
                name: '团风县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f97566'
                }
              },
              {
                name: '红安县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#3bafda'
                }
              },
              {
                name: '罗田县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,32],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#4a89dc'
                }
              },
              {
                name: '英山县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,20],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#f8c35d'
                }
              },
              {
                name: '浠水县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#114898'
                }
              },
              {
                name: '蕲春县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,31],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#24adf1'
                }
              },
              {
                name: '黄梅县院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,48],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#aab2bd'
                }
              },
              {
                name: '麻城市院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,0,24],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#656d78'
                }
              },
              {
                name: '武穴市院',
                type: 'bar',
                barWidth: 30,
                data: [0,0,0,0,0,0,0,0,0,0,10],
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  color: '#da4453'
                }
              }
            ]
          };
          this.exportInterval.setOption(option);
        },
          //初始化文书公开排行榜
        initDocRank() {
          this.docRank = this.$echarts.init(this.$refs.docRank);
          var _this = this;
          var option = {
            color: ['#3398DB'],
            title: {
              text: '文书公开排行榜',
              x: 'center',
              textStyle: {
                fontSize: 16,
                fontFamily: 'PingFang-SC-Bold',
                fontWeight: 'bold',
                color: 'rgba(85,85,85,1)'
              }
            },
            tooltip : {
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
                },
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
                data : ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
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
                data:[124, 310, 580, 124, 310, 720, 124, 222, 345, 444,100].sort()
              }
            ]
          };
          this.docRank.setOption(option);
        },
        //初始化案件公开排行榜
        initCaseRank() {
          this.caseRank = this.$echarts.init(this.$refs.caseRank);
          var _this = this;
          var option = {
            color: ['#3398DB'],
            title: {
              text: '案件公开排行榜',
              x: 'center',
              textStyle: {
                fontSize: 16,
                fontFamily: 'PingFang-SC-Bold',
                fontWeight: 'bold',
                color: 'rgba(85,85,85,1)'
              }
            },
            tooltip : {
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
                axisLabel: {
                  fontSize:14,
                  fontFamily: 'PingFang-SC-Regular',
                  fontWeight: 400,
                  color: 'rgba(85,85,85,1)',
                },
                axisTick: {
                  alignWithLabel: true
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
                data : ['黄冈市院','黄冈市黄州区院','团风县院','红安县院','罗田县院','英山县院','浠水县院','蕲春县院','黄梅县院','麻城市院','武穴市院'],
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
                data:[124, 310, 580, 124, 310, 720, 124, 222, 345, 444,100].sort()
              }
            ]
          };
          this.caseRank.setOption(option);
        }
      },
      beforeDestroy() {
        window.removeEventListener('resize',this.repaintEcharts);
        this.caseRank.dispose();
        this.docRank.dispose();
        this.exportInterval.dispose();
        this.messageSend.dispose();
      }
    }
</script>

<style scoped lang="scss">
#count-index {
  width: 100%;
  height: 100%;
  #main {
    height: 100%;
    overflow-y: auto;
    .count-data {
      display: flex;
      justify-content: space-between;
      width: 100%;
      overflow: hidden;
      padding-left: 20px;
      padding-right: 20px;
      margin-bottom: 20px;
      &:first-child {
        padding-top: 14px;
      }
      &:nth-child(3),
      &:nth-child(4) {
        padding-top: 40px;
      }
      .count-item {
        position: relative;
        width: 25%;
        height: 100px;
        text-align: center;
        color: #fff;
        border-radius: 10px;
        background: -webkit-linear-gradient(right,rgba(69,137,253,1) 0%,rgba(48,109,248,1) 100%);
        box-shadow:0 4px 4px 0 rgba(204,204,204,0.34);
        cursor: pointer;
        + .count-item {
          margin-left: 50px;
        }
        /*图标*/
        .count-img {
          position: absolute;
          right: 11px;
          bottom: 7px;
        }
        p {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 16px;
          width: 100%;
          span {
            display: inline-block;
            width: 100%;
            color:rgba(255,255,255,1);
            &:first-child {
              font-size:34px;
              font-family: 'PingFang-SC-Bold';
              font-weight:bold;
            }
            &:last-child {
              font-size:18px;
              font-family:'PingFang-SC-Regular';
              font-weight:400;
            }
          }
        }
      }
      /*图表*/
      .count-echarts {
        float: left;
        width: calc( 50% - 10px);
        + .count-echarts {
          margin-left: 20px;
        }
        height: 500px;
      }
      /*文书*/
      + .count-data {
        .count-item {
          background:-webkit-linear-gradient(left,rgba(231,139,40,1) 0%,rgba(255,164,67,1) 100%);
        }
      }
    }
  }

}
</style>
