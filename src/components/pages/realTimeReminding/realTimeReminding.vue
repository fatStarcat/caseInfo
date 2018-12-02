<template>
  <!--实时提醒-->
  <div id="reminding">
    <!--信息情况-->
    <div id="re-info">
      <!--<button @click="initMap">重绘</button>-->
      <div id="info-program" class="info-item">
        <h3>程序信息公开信息</h3>
        <div class="info-content info-content-two">
          <div class="info-content-text" >
            已公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/caseInfo',status: 0,bread:'已公开(程序信息公开信息)'})">
            {{caseCount[0]}}
            <loading :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" >
            不公开
          </div>
          <div class="info-content-count" @click="toPage('/caseNotOpen')" >
            {{caseCount[2]}}
            <loading :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" >
            <span>
              本系统已公开统一系统未公开
            </span>
          </div>
          <div class="info-content-count" @click="toPage('/caseUndisclosed')">
            {{caseCount[1]}}
            <loading :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-circle-one">
          <div class="info-content-text">
            程序信息公开率
          </div>
          <div class="info-content-count">
            95.3%
          </div>
        </div>
      </div>
      <div id="info-document" class="info-item">
        <h3>法律文书公开信息</h3>
        <div class="info-content info-content-two">
          <div class="info-content-text" >
            应公开
          </div>
          <div class="info-content-count" @click="toPage('/docOpen')">
            2000
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" >
            不公开
          </div>
          <div class="info-content-count" @click="toPage('/docNotOpen')">
           100
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" >
            <span>
              应公开未公开
            </span>
          </div>
          <div class="info-content-count" @click="toPage('/docUndisclosed')">
            50
          </div>
        </div>
        <div class="info-content info-circle-two">
          <div class="info-content-text">
            法律文书公开率
          </div>
          <div class="info-content-count">
            95.3%
          </div>
        </div>
      </div>
    </div>
    <!--map-->
    <div id="map">
      <div class="rel-map" ref="mapEchart">

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "real-time-reminding",
        data() {
          return {
            isLoading: false,
            role: JSON.parse(localStorage.getItem('userInfo')).JS,//角色身份,
            dwbm: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
            mapEchart: null,//地图
            mapData: [],//地图数据
            caseCount: [],//案件统计数据
          }
        },
      methods: {
          setCity() {
            let _this = this;
            this.axios({
              url: '@/../static/map/421100.json'
            }).then(function(res){
              console.log(res);
              let data = [];
              _this.$echarts.registerMap('HG',res.data);
              for( var i=0;i<res.data.features.length;i++ ){
                data.push({
                  name: res.data.features[i].properties.name
                })
              }
              _this.mapData = data;
              _this.initMap();
            })
              .catch(function(err){
                console.log(err);
              })

          },
          initMap() {
            var _this = this;
            this.mapEchart = this.$echarts.init(this.$refs.mapEchart);
            let option = {
              backgroundColor: 'transparent',
              tooltip: {
                trigger: 'item',
                formatter: '{b}'
              },
              animationDuration:1000,
              animationEasing:'cubicOut',
              animationDurationUpdate:1000,
              series : [
                {
                  name: 'HG',
                  type: 'map',
                  mapType: 'HG',
                  roam: false,
                  nameMap:{
                    'china':'中国'
                  },
                  label: {
                    normal:{
                      show:true,
                      textStyle:{
                        color:'#999',
                        fontSize:13
                      }
                    },
                    emphasis: {
                      show: true,
                      textStyle:{
                        color:'#fff',
                        fontSize:13
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      areaColor: '#323c48',
                      borderColor: 'dodgerblue'
                    },
                    emphasis: {
                      areaColor: 'darkorange'
                    }
                  },
                  data: _this.mapData
                }
              ]

            };
            this.mapEchart.setOption(option);
          },
          toPage(config) {//跳转页面
            this.$router.push({
              path: config.path,
              query: {
                status: config.status,
                bread: config.bread
              }
            });
          },
          getCaseCount() {//获取案件公开数量信息
            this.isLoading = true;
            let api = '';
            let _this = this;
            let date = new Date();
            let year = date.getFullYear();
            let startTime = `${year}-01-01 00:00:00`;
            let endTime = this.getCurrentTime();
            console.log(startTime,endTime,this.role,this.dwbm)
            if(this.role=='案管人员') {
              api = 'AG_CountAJGKXX';
            }else if(this.role=='承办人'){
              api = 'CBR_CountAJGKXX';
            }
            function getAxios(gkzt) {
              return _this.axios.get(webApi.SSTX[api].format({
                startTimeStr: startTime,
                endTimeStr: endTime,
                dwbm: _this.dwbm ,
                gkzt: gkzt,
                bhxj: false,//包含下级
                ajlx: '',//案件类型
              }))
            }
            //获取已公开
            function getOpen() {
              return getAxios(0)
            }
            //获取本系统已公开统一系统未公开
            function getUndisclosed() {
              return getAxios(1)
            }
            //获取不公开
            function getNotOpen() {
              return getAxios(2)
            }
            this.axios.all([getOpen(), getUndisclosed(),getNotOpen()])
              .then(_this.axios.spread(function (open, undisclosed,notOpen) {
                _this.caseCount = [open.data.data,undisclosed.data.data,notOpen.data.data];
                _this.isLoading = false;
                console.log(arguments)
              }))
              .catch(_this.axios.spread(function (open, undisclosed,notOpen) {
                console.log(arguments)
              }))
            // this.axios.get(webApi.SSTX[api].format({
            //   startTimeStr: startTime,
            //   endTimeStr: endTime,
            //   dwbm: _this.dwbm ,
            //   bhxj: false,//包含下级
            //   ajlx: '',//案件类型
            // })).then(function(res){
            //   console.log(res);
            // }).catch(function(err){
            //   console.log(err)
            // })
          }
      },
      create() {
      },
      mounted() {

        // this.initMap();
        this.setCity();
        this.getCaseCount();
      }
    }
</script>

<style scoped lang="scss">
  #reminding {
    width: 100%;
    height: 100%;
    padding: 35px;
    overflow-y: auto;
    /*信息情况*/
    #re-info {
      position: relative;
      float: left;
      height: 100%;
      .info-item {

        width: 400px;
        height: 360px;
        background: rgba(255,255,255,1);
        box-shadow: 0 10px 12px 3px rgba(12,37,95,0.15);
        border-radius: 10px;
        &:first-child {
          position: absolute;
          left: 0;
          top: 0;
        }
        &:last-child {
          position: absolute;
          left: 0;
          bottom: 0;
        }
        h3 {
          text-align: center;
          padding: 20px 0;
          font-size: 22px;
        }
        /*信息内容*/
        .info-content{
          display: flex;
          align-items: center;
          width: 100%;
          height: 70px;
          /*line-height: 70px;*/
          margin: 0 auto;
          /*box-shadow: 0 1px 7px 0 rgba(214,212,212,1);*/
          font-family: 'PingFang-SC-Medium';
          font-weight:500;
          padding: 0 23px;
          text-align: center;
          &:nth-child(even) {
            background: rgba(245,246,250,1);
          }
          .info-content-text {
            position: relative;
            display: inline-block;
            font-size:16px;
            color:rgba(85,85,85,1);
            width: 229px;
            span {
              position: absolute;
              left: 50%;
              top: 50%;
              width: 100%;
              transform: translate(-50%, -50%);
              line-height: normal;
            }
          }
          .info-content-count {
            position: relative;
            display: inline-block;
            font-size:18px;
            width: 80px;
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            color:rgba(255,255,255,1);
            cursor: pointer;
            margin-left: 41px;
          }
        }
        /*样式*/
        .info-content-one .info-content-count {
          /*background:-webkit-linear-gradient(bottom,rgba(46,104,255,1) 0%,rgba(78,149,255,1) 100%) !important;*/
          background: #e78b28;
          box-shadow: 0 3px 7px 0 #eccfaf;
        }
        .info-content-two .info-content-count{
          /*background:-webkit-linear-gradient(bottom,rgba(46,173,245,1) 0%,rgba(70,188,255,1) 100%) !important;*/
          background: #65e0fa;
          box-shadow: 0 3px 7px 0 #beedf7;
        }
        .info-content-three .info-content-count {
          /*background: -webkit-linear-gradient(bottom,rgba(255,156,150,1) 0%,rgba(255,122,149,1) 100%) !important;*/
          background: #4589fd;
          box-shadow: 0 3px 7px 0 #bde0f6;
          font-size: 14px;
        }
        .info-circle-one .info-content-text {
          font-family: 'PingFang-SC-Bold';
          font-weight: 500;
          color: rgba(85,85,85,1);
          cursor: auto;
          box-shadow: none;
          font-size: 20px;
          &:nth-of-type(1):before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            /*background: rgba(253,209,93,1);*/
            background: #65e0fa;
            border-radius:50%;
            margin-right: 5px;
          }
        }
        .info-circle-two .info-content-text {
          font-family: 'PingFang-SC-Bold';
          font-weight: 500;
          color: rgba(85,85,85,1);
          cursor: auto;
          box-shadow: none;
          font-size: 20px;
          &::before {
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            /*background: rgba(105,194,97,1);*/
            background: #65e0fa;
            border-radius:50%;
            margin-right: 5px;
          }
        }
        .info-circle-one .info-content-count,
        .info-circle-two .info-content-count {
          font-family: 'PingFang-SC-Bold';
          font-weight: 600;
          color: rgba(85,85,85,1);
          font-size: 20px;
        }
      }
    }
    /*地图*/
    #map {
      position: relative;
      float: right;
      width: calc( 100% - 369px - 45px);
      height: 100%;
      background: url('../../../assets/realTimeReminding/map.jpg') no-repeat;
      background-size: cover;
      border-radius:10px;
      .rel-map {
        width: 100%;
        height: 100%;
      }
     /* img {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }*/
    }
  }
  @media screen and (max-width: 1200px) {
    #map {
      position: absolute;
      right: 0;
      top: 20px;
      width: 100% !important;

    }
  }
</style>
