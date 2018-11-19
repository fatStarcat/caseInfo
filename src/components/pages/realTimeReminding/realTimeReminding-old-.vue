<template>
  <!--实时提醒-->
  <div id="reminding">
    <!--信息情况-->
    <div id="re-info">
      <div id="info-program" class="info-item">
        <h3>程序信息公开信息</h3>
        <div class="info-content info-content-two">
          <div class="info-content-text" @click="toPage('/caseOpen')">
            已公开
          </div>
          <div class="info-content-count">
            2000
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" @click="toPage('/caseNotOpen')" >
            不公开
          </div>
          <div class="info-content-count">
            100
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" @click="toPage('/caseUndisclosed')">
            <span>
              本系统已公开<br/>统一系统未公开
            </span>
          </div>
          <div class="info-content-count">
            50
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
          <div class="info-content-text" @click="toPage('/docOpen')">
            已公开
          </div>
          <div class="info-content-count">
            2000
          </div>
        </div>
        <div class="info-content info-content-one">
          <div class="info-content-text" @click="toPage('/docNotOpen')">
            不公开
          </div>
          <div class="info-content-count">
            100
          </div>
        </div>
        <div class="info-content info-content-three">
          <div class="info-content-text" @click="toPage('/docUndisclosed')">
            <span>
              本系统已公开<br/>统一系统未公开
            </span>
          </div>
          <div class="info-content-count">
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
      <img src="../../../assets/save/map1.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "real-time-reminding",
    data() {
      return {
      }
    },
    methods: {
      toPage(path) {//跳转页面
        this.$router.push({path: path});
      }
    }
  }
</script>

<style scoped lang="scss">
  #reminding {
    width: 100%;
    /*padding: 32px 60px 0 68px;*/
    overflow: hidden;
    /*信息情况*/
    #re-info {
      float: left;
      .info-item {
        width: 400px;
        height: 360px;
        background: rgba(255,255,255,1);
        box-shadow: 0 10px 12px 3px rgba(12,37,95,0.15);
        border-radius: 10px;
        &:first-child {
          margin-bottom: 24px;
        }
        h3 {
          text-align: center;
          padding: 20px 0;
          font-size: 22px;
        }
        /*信息内容*/
        .info-content{
          width: 100%;
          height: 70px;
          line-height: 70px;
          margin: 0 auto;
          /*box-shadow: 0 1px 7px 0 rgba(214,212,212,1);*/
          vertical-align: middle;
          &:nth-child(even) {
            background: rgba(245,246,250,1);
          }
          .info-content-text {
            position: relative;
            float: left;
            width: 170px;
            height: 50px;
            line-height: 50px;
            border-radius: 30px;
            font-family: 'PingFangSC-Medium';
            font-weight:500;
            color: rgba(255,255,255,1);
            margin-left: 30px;
            margin-top: 10px;
            text-align: center;
            font-size: 18px;
            cursor: pointer;
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
            float: right;
            font-family: 'PingFangSC-Regular';
            font-weight: 400;
            color: rgba(85,85,85,1);
            margin-right: 60px;
            width: 50px;
            text-align: center;
          }
        }
        /*样式*/
        .info-content-one .info-content-text {
          /*background:-webkit-linear-gradient(bottom,rgba(46,104,255,1) 0%,rgba(78,149,255,1) 100%) !important;*/
          background: #e78b28;
          box-shadow: 0 3px 7px 0 #eccfaf;
        }
        .info-content-two .info-content-text{
          /*background:-webkit-linear-gradient(bottom,rgba(46,173,245,1) 0%,rgba(70,188,255,1) 100%) !important;*/
          background: #65e0fa;
          box-shadow: 0 3px 7px 0 #beedf7;
        }
        .info-content-three .info-content-text {
          /*background: -webkit-linear-gradient(bottom,rgba(255,156,150,1) 0%,rgba(255,122,149,1) 100%) !important;*/
          background: #4589fd;
          box-shadow: 0 3px 7px 0 #bde0f6;
          font-size: 14px;
        }
        .info-circle-one .info-content-text {
          font-family: 'PingFangSC-Semibold';
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
          font-family: 'PingFangSC-Semibold';
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
          font-family: PingFangSC-Semibold;
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
      height: 742px;
      background: url('../../../assets/save/map.png') no-repeat;
      background-size: cover;
      border-radius:10px;
      img {
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>
