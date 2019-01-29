<template>
  <div class="modal-wrap">
    <!--对话框-->
    <div id="modalFail"  >
      <!--对话框名称-->
      <div class="title">
        <p>请求失败</p>
        <p>如多次失败，请联系管理员</p>
        <div class="title-img">
          <img src="../../assets/index/failInfo.png" alt=""><img src="../../assets/index/failInfo.png" alt="">
        </div>
      </div>
      <div class="mod-content-wrap">
        <div class="mode-btn">
          <button @click="again" class="btn-confirm">重新请求</button>
          <button @click="exit" class="btn-cancel">退出程序</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      again() {//重新登录
        this.$emit('reAgain');
      },
      exit() {//退出
        invoker.exit();
      }
    }
  }
</script>

<style scoped lang="scss">
  #modalFail {
    width: 400px;
    height: 279px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius:10px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    color: #333333;
    line-height: 23px;
    letter-spacing: 3px;
    box-shadow: 0 0 10px rgba(75,73,73,0.18);
    /*标题*/
    .title {
      position: relative;
      font-size:24px;
      height: 180px;
      padding-top: 50px;
      font-family:'PingFang-SC-Bold','Microsoft YaHei';
      p {
        line-height: 100%;
      }
      p:first-child {
        font-weight:bold;
      }
      p:nth-child(2){
        font-size:16px;
        font-weight:400;
        margin-top: 25px;
      }
      color: rgba(255,254,254,1);
      background:url('../../../static/images/index/bg.jpg') no-repeat;
      background-size: cover;
      border-radius: 10px 10px 0 0;
      .title-img {
        position: absolute;
        right: 4px;
        bottom: 0;
        img {
          vertical-align: bottom;
          opacity: .4;
        }
        img:first-child {
          width: 49px;
          height: 41px;
          margin-right: 3px;
        }
        img:last-child {
          width: 79px;
          height: 67px;
        }
      }
    }
    /*提示文字内容wrap*/
    .mod-content-wrap {
      position: relative;
      height: 99px;
      background:rgba(255,255,255,1);
      padding-top: 46px;
      border-radius: 0 0 10px 10px;
      /*按钮*/
      .mode-btn {
        button {
          width: 110px;
          height: 30px;
          /*line-height: 30px;*/
          border: 1px solid rgba(69,137,253,1);
          border-radius: 14px;
          font-size: 20px;
          font-family:'PingFang-SC-Regular';
          font-weight:400;
          color:rgba(51,51,51,1);
          background-color: transparent;
          &:hover {
            background: rgba(69,137,253,1);
            color: #FFFFFF;
            cursor: pointer;
          }
          &:first-child {
            margin-right: 33px;
          }
          &:last-child {
            margin-left: 33px;
          }
        }
      }
    }

  }

</style>
