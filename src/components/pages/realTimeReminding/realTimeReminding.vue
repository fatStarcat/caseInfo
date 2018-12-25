<template>
  <!--实时提醒-->
  <div id="reminding">
    <!--信息情况-->
    <div id="re-info">
      <div id="info-program" class="info-item">
        <h3>程序信息公开信息</h3>
        <div class="info-content info-content-two">
          <div class="info-content-text" >
            已公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/caseInfo',status: {gkzt: 3},bread:'已公开(程序信息公开信息)'})">
            {{caseCount[0]}}
            <loading type="w" :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" >
            不公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/caseInfo',status: {gkzt: 4},bread:'不公开(程序信息公开信息)'})" >
            {{caseCount[2]}}
            <loading type="w" :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" >
            <span>
              本系统已公开统一系统未公开
            </span>
          </div>
          <div class="info-content-count" @click="toPage({path:'/caseInfo',status: {gkzt: 2},bread:'本系统已公开统一系统未公开(程序信息公开信息)'})">
            {{caseCount[1]}}
            <loading type="w" :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
        <div class="info-content info-circle-one">
          <div class="info-content-text">
            程序信息公开率
          </div>
          <div class="info-content-count">
            {{caseCount[3]}}
            <loading type="b" :width="25" :height="25" :isLoading="isLoading"></loading>
          </div>
        </div>
      </div>
      <div id="info-document" class="info-item">
        <h3>法律文书公开信息</h3>
        <div class="info-content info-content-four">
          <div class="info-content-text" >
            应公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/docInfo',status: {gkzt: 0,nzzt: ''},bread:'应公开(法律文书公开信息)'})">
            {{docCount[2]}}
            <loading type="w" :width="25" :height="25" :isLoading="docLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-two">
          <div class="info-content-text" >
            已公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/docInfo',status:{gkzt: 0,nzzt: 8},bread:'已公开(法律文书公开信息)'})">
           {{docCount[0]}}
            <loading type="w" :width="25" :height="25" :isLoading="docLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" >
            <span>
              应公开未公开
            </span>
          </div>
          <div class="info-content-count" @click="toPage({path:'/docInfo',status: {gkzt: 0,nzzt: 7},bread:'应公开未公开(法律文书公开信息)'})">
            {{docCount[3]}}
            <loading type="w" :width="25" :height="25" :isLoading="docLoading"></loading>
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" >
            不公开
          </div>
          <div class="info-content-count" @click="toPage({path:'/docInfo',status:{gkzt: 1,nzzt: ''},bread:'不公开(法律文书公开信息)'})">
            {{docCount[1]}}
            <loading type="w" :width="25" :height="25" :isLoading="docLoading"></loading>
          </div>
        </div>
        <div class="info-content info-circle-two">
          <div class="info-content-text">
            法律文书公开率
          </div>
          <div class="info-content-count">
            {{docCount[4]}}
            <loading type="b" :width="25" :height="25" :isLoading="docLoading"></loading>
          </div>
        </div>
      </div>
    </div>
    <!--map-->
    <div id="map" class="echarts-wrap">
      <div class="mapBg">
      </div>
      <div class="rel-map" ref="mapEchart" id="mapEcharts">

      </div>
      <!--返回按钮-->
      <!--<span class='echarts-return' v-show="showReturn" @click="returnMap">-->
            <!--<img src="../../../assets/countAnalysis/return.png" alt="">-->
      <!--</span>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "real-time-reminding",
        data() {
          return {
            isLoading: false,
            docLoading: false,//文书信息加载
            role: JSON.parse(localStorage.getItem('userInfo')).JS,//角色身份,
            dwbm: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
            dwmc: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称,
            mapEchart: null,//地图
            mapData: [],//地图数据
            caseCount: [],//案件统计数据
            docCount: [],//文书统计数据
            mapType: '',//地图类型
            showReturn: false,//显示返回按钮
            mapJsonData: '',//地图绘图数据
            cityCount: {//各区县公开信息统计信息

            },
            unitsInfo: {//单位编码信息
              "蕲春县" :421126,
              "红安县" :421122,
              "团风县" :421121,
              "浠水县" :421125,
              "武穴市" :421182,
              "麻城市" :421181,
              "黄梅县" :421127,
              "黄州区": 421102,
              "罗田县" :421123,
              "英山县" :421124,
            }
          }
        },
      methods: {
          setCity() {//注册地图数据
            let _this = this;
            $echarts.registerMap('HG',_this.mapJsonData);//全局注册黄冈地图
            _this.mapType = 'HG';
            //注册黄冈地图和各区县地图
            // if((this.dwmc.indexOf('黄冈市') > -1)||this.dwmc === '湖北省院') {
            //   $echarts.registerMap('HG',_this.mapJsonData);//全局注册黄冈地图
            //   _this.mapType = 'HG';
            // }else {//注册区县地图
            //   for(let i = 0, len = _this.mapJsonData.features.length; i < len; i++){
            //     let oriData = _this.mapJsonData.features[i];
            //     if(this.dwmc.indexOf(oriData.properties.name) > -1) {
            //       let selfData = { //各个区县地图数据
            //         "type": "FeatureCollection",
            //         "features": [oriData]
            //       };
            //       $echarts.registerMap(oriData.properties.name,selfData);//注册地图
            //       _this.mapType = oriData.properties.name;
            //       break
            //     }
            //   }
            // }
            this.setMapData();
          },
          setMapData() {//设置地图数据
            let mapData = [];
            let showAllMap = false;//是否所有地图移入都显示信息
            let _this = this;
            if(((_this.dwmc.indexOf('黄冈市') > -1)||_this.dwmc === '湖北省院')&&(_this.dwmc.indexOf('黄州区') == -1)&&(_this.role=='案管人员')) {
              showAllMap = true;
            }
            for( let i = 0;i < this.mapJsonData.features.length;i++ ){
              let color = '#4589fd';
              if(!showAllMap) {
                let name = _this.dwmc;
                if(name.indexOf('黄冈市')>-1) {
                  name = '黄州区';
                }
                if(!(name.indexOf(this.mapJsonData.features[i].properties.name) > -1)) {//地图名称与当前单位不符
                  color = '#ccc'
                }
              }
              mapData.push({
                name: this.mapJsonData.features[i].properties.name,
                itemStyle: {
                  normal: {
                    areaColor: color,
                  }
                },
              })
            }
            this.mapData = mapData;
            chartData.mapData = mapData;
            this.initMap();
            // _this.setMapClick();//设置地图点击事件
          },
        getCity() {//获取地图数据
          let _this = this;
          this.axios({
            url: '@/../static/map/421100.json'
          }).then(function(res){
            ;
            _this.mapJsonData = res.data;
            _this.setCity();
          })
          .catch(function(err){
            console.log(err);
          })
        },
        setMapClick() {
          let _this = this;
          this.mapEchart.on('click', function(param) {
            _this.initMap(param.name);
            _this.showReturn = true;
          })
        },
        returnMap() {//返回上级地图
          this.showReturn = false;
          this.initMap('HG');
          this.setMapClick();//设置地图点击事件
        },
          getUnitsCode(name) {//获取单位编码
            let dwbm = '';
            for(let item in this.unitsInfo){
              if(item==name){
                dwbm = this.unitsInfo[item];
                break
              }
            }
            return dwbm;
          },
          initMap(type) {
            var _this = this;
            (type)&&(this.mapType = type);
            // if(this.mapEchart) {
            //   this.mapEchart.dispose();
            // }
            this.mapEchart = this.$echarts.init(this.$refs.mapEchart);
            let option = {
              backgroundColor: 'transparent',
              tooltip: {
                trigger: 'item',
                formatter: function (param) {
                  let marker1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#65e0fa;"></span>';
                  let marker2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#e78b28;"></span>';
                  let marker3 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4589fd;"></span>';
                  let marker4 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#e8bf30;"></span>';
                  if(((_this.dwmc.indexOf('黄冈市') > -1)||_this.dwmc === '湖北省院')&&(_this.dwmc.indexOf('黄州区') == -1)&&(_this.role=='案管人员')){
                    // console.log(param.name,_this.getUnitsCode(param.name))
                    if(!_this.cityCount.hasOwnProperty(param.name)){
                      let dwbm = _this.getUnitsCode(param.name);
                      _this.getCaseCount(dwbm,param.name);
                      _this.getDocCount(dwbm,param.name);
                    }
                    return param.name + '<br/>' +
                      '<br/>'+
                      '程序信息公开信息' + '<br/>' +
                      marker1 +" " + '已公开：' + _this.cityCount[param.name].caseCount[0] + '<br/>' +
                      marker2 +" " + '不公开：' + _this.cityCount[param.name].caseCount[2] + '<br/>' +
                      marker3 +" " + '本系统已公开统一系统未公开：' + _this.cityCount[param.name].caseCount[1] + '<br/>' +
                      marker1 +" " + '程序信息公开率：' + _this.cityCount[param.name].caseCount[3] + '<br/>'+
                      '<br/>'+
                      '法律文书公开信息' + '<br/>' +
                      marker1 +" " + '已公开：' + _this.cityCount[param.name].docCount[0] + '<br/>' +
                      marker2 +" " + '不公开：' + _this.cityCount[param.name].docCount[1] + '<br/>' +
                      marker4 +" " + '应公开：' + _this.cityCount[param.name].docCount[2] + '<br/>' +
                      marker3 +" " + '应公开未公开：' + _this.cityCount[param.name].docCount[3] + '<br/>' +
                      marker1 +" " + '法律文书公开率：' + _this.cityCount[param.name].docCount[4] + '<br/>'
                  }else {//显示本区县数据
                    let name = _this.dwmc;
                    if(name.indexOf('黄冈市')>-1) {
                      name = '黄州区';
                    }
                    if(!(name.indexOf(param.name) > -1)) {//移入地图与当前单位不符
                      return
                    }
                    return param.name + '<br/>' +
                      '程序信息公开信息' + '<br/>' +
                      marker1 +" " + '已公开：' + _this.caseCount[0] + '<br/>' +
                      marker2 +" " + '不公开：' + _this.caseCount[2] + '<br/>' +
                      marker3 +" " + '本系统已公开统一系统未公开：' + _this.caseCount[1] + '<br/>' +
                      marker1 +" " + '程序信息公开率：' + _this.caseCount[3] + '<br/>'+
                      '<br/>'+
                      '法律文书公开信息' + '<br/>' +
                      marker1 +" " + '已公开：' + _this.docCount[0] + '<br/>' +
                      marker2 +" " + '不公开：' + _this.docCount[1] + '<br/>' +
                      marker4 +" " + '应公开：' + _this.docCount[2] + '<br/>' +
                      marker3 +" " + '应公开未公开：' + _this.docCount[3] + '<br/>' +
                      marker1 +" " + '法律文书公开率：' + _this.docCount[4] + '<br/>'
                  }
                },
              },
              animationDuration:1000,
              animationEasing:'cubicOut',
              animationDurationUpdate:1000,
              series : [
                {
                  name: 'HG',
                  type: 'map',
                  mapType: _this.mapType,
                  roam: false,
                  nameMap:{
                    'china':'中国'
                  },
                  label: {
                    normal:{
                      show:true,
                      textStyle:{
                        color:'#fff',
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
                      areaColor: '#4589fd',
                      borderColor: '#095be6'
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
            chartData.chartObj[this.$route.path] = this;
          },
          toPage(config) {//跳转页面
            this.$router.push({
              path: config.path,
              query: {
                status: JSON.stringify(config.status),
                bread: config.bread
              }
            });
          },
        getDocCount(dwbm,cityName){//获取文书公开数量信息
          if(!cityName){
            this.docLoading = true;
          }
          let api = '';
          let _this = this;
          let date = new Date();
          let year = date.getFullYear();
          let startTime = `${year}-01-01 00:00:00`;
          let endTime = this.getCurrentTime();
          dwbm = dwbm?dwbm:this.dwbm;
          if(this.role=='案管人员') { //判断身份
            api = 'AG_CountWSSL';
          }else if(this.role=='承办人'){
            api = 'CBR_CountWSSL';
          }
          if(cityName) {//指定地图统计信息
            (!_this.cityCount[cityName])&&( _this.cityCount[cityName]={});
            _this.cityCount[cityName].docCount = ['loading','loading','loading','loading','loading'];
          }
          console.log(this.cityCount)
          function getAxios(gkzt,nzzt) {
            return _this.axios.get(webApi.SSTX[api].format({
              startTimeStr: startTime,
              endTimeStr: endTime,
              dwbm: dwbm,
              gkzt: gkzt,//公开状态(公开状态 0:应公开 1:不公开)
              nzzt: nzzt,//拟制状态(拟制状态 1:待拟制 2:已拟制待审核 4:案管审核退回 8:审核通过;支持位域)
              bhxj: false,//包含下级
              wslb: '',//文书类型
            }))
          }
          //获取已公开
          function getOpen() {
            return getAxios(0,8)
          }
          //获取不公开
          function getNotOpen() {
            return getAxios(1,"")
          }
          //获取应公开
          function getShouldOpen() {
            return getAxios(0,"")
          }
          //获取未公开
          function getUndisclosed() {
            return getAxios(0,7)
          }

          this.axios.all([getOpen(),getNotOpen(),getShouldOpen(), getUndisclosed()])
            .then(_this.axios.spread(function (open,notOpen, shouldOpen, undisclosed,) {
              let openVal = open.data.data;
              let undisclosedVal = undisclosed.data.data;
              let shouldOpenVal = shouldOpen.data.data;
              let notOpenVal = notOpen.data.data;
              let ratio = '0%';
              _this.docLoading = false;
              if((shouldOpenVal + notOpenVal)!=0){//判断值是否为0
                ratio = Number((openVal/(shouldOpenVal + notOpenVal))*100).toFixed(1) + '%';
              }
              if(cityName) {//指定地图统计信息
                _this.cityCount[cityName].docCount = [openVal,notOpenVal,shouldOpenVal,undisclosedVal,ratio];

              }else {//当前地图统计信息
                _this.docCount = [openVal,notOpenVal,shouldOpenVal,undisclosedVal,ratio];
              }
              console.log(arguments)
            }))
            .catch(_this.axios.spread(function (open,notOpen ,shouldOpen,undisclosed) {
              console.log(arguments)
            }))
        },
          getCaseCount(dwbm,cityName) {//获取案件公开数量信息
            if(!cityName){
              this.isLoading = true;
            }
            let api = '';
            let _this = this;
            let date = new Date();
            let year = date.getFullYear();
            let startTime = `${year}-01-01 00:00:00`;
            let endTime = this.getCurrentTime();
            dwbm = dwbm?dwbm:this.dwbm;
            if(this.role=='案管人员') {
              api = 'AG_CountAJGKXX';
            }else if(this.role=='承办人'){
              api = 'CBR_CountAJGKXX';
            }
            if(cityName) {//指定地图统计信息
              (!_this.cityCount[cityName])&&( _this.cityCount[cityName]={});
              _this.cityCount[cityName].caseCount = ['loading','loading','loading','loading'];
            }
            function getAxios(gkzt) {
              return _this.axios.get(webApi.SSTX[api].format({
                startTimeStr: startTime,
                endTimeStr: endTime,
                dwbm: dwbm ,
                gkzt: gkzt,//公开状态(1:统一业务系统已公开 2:本系统已公开统一业务系统未公开 4:不公开;支持位域)
                bhxj: false,//包含下级
                ajlx: '',//案件类型
              }))
            }
            //获取已公开
            function getOpen() {
              return getAxios(3)
            }
            //获取本系统已公开统一系统未公开
            function getUndisclosed() {
              return getAxios(2)
            }
            //获取不公开
            function getNotOpen() {
              return getAxios(4)
            }
            this.axios.all([getOpen(), getUndisclosed(),getNotOpen()])
              .then(_this.axios.spread(function (open, undisclosed,notOpen) {
                let openVal = open.data.data;
                let undisclosedVal = undisclosed.data.data;
                let notOpenVal = notOpen.data.data;
                let ratio = '100.0%';
                _this.isLoading = false;
                // if((openVal + notOpenVal)!=0){//程序性公开率
                //   ratio = Number((openVal/(openVal + notOpenVal))*100).toFixed(1) + '%';
                // }
                if(cityName) {//指定地图统计信息
                  _this.cityCount[cityName].caseCount = [openVal,undisclosedVal,notOpenVal,ratio];
                }else {//当前地图统计信息
                  _this.caseCount = [openVal,undisclosedVal,notOpenVal,ratio];
                }

                console.log(arguments)
              }))
              .catch(_this.axios.spread(function (open, undisclosed,notOpen) {
                console.log(arguments);
              }))
          }
      },
      create() {
      },
      mounted() {

        // this.initMap();
        this.getCity();
        this.getCaseCount();
        this.getDocCount();
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
        background: rgba(255,255,255,1);
        box-shadow: 0 10px 12px 3px rgba(12,37,95,0.15);
        border-radius: 10px;
        padding-bottom: 10px;
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
          background: #e78b28;
          box-shadow: 0 3px 7px 0 #eccfaf;
        }
        .info-content-two .info-content-count{
          background: #65e0fa;
          box-shadow: 0 3px 7px 0 #beedf7;
        }
        .info-content-three .info-content-count {
          background: #4589fd;
          box-shadow: 0 3px 7px 0 #bde0f6;
        }
        .info-content-four .info-content-count {
          background: #e8bf30;
          box-shadow: 0 3px 7px 0 #daac0a;
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
          cursor: auto;
        }
      }
      #info-document,
      #info-program {
        >.info-content {
          &:last-child {
            background: transparent;
            border-top: 1px solid rgba(121,121,121,0.1);
          }
        }
      }
    }
    /*地图*/
    #map {
      position: relative;
      float: right;
      width: calc( 100% - 369px - 45px);
      height: 100%;
      /*background: url('../../../assets/realTimeReminding/mapT.jpg') no-repeat 50% 50% ;*/
      background-size: cover;
      border-radius:10px;
      overflow: hidden;
      .mapBg {
        position: absolute;
        top: 48%;
        left: 48%;
        width: 120%;
        height: 120%;
        transform: translate(-50%,-50%);
        background: url('../../../assets/realTimeReminding/mapT.jpg') no-repeat 50% 50% ;
        background-size: cover;
      }
      .rel-map {
        width: 100%;
        height: 100%;
      }
    }
  }
  /*@media screen and (max-width: 1200px) {*/
    /*#map {*/
      /*position: absolute;*/
      /*right: 0;*/
      /*top: 20px;*/
      /*width: 100% !important;*/

    /*}*/
  /*}*/
  @media screen and (max-width: 1680px) {
    /*信息内容*/
    .info-content{
      height: 55px !important;
    }
  }
</style>
