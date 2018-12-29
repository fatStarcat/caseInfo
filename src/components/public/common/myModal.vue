<template>
  <div class="modal-wrap">
    <!--对话框-->
    <div id="modal"  >
      <!--对话框名称-->
      <div class="title">
        {{content}}
        <img src="../../../assets/index/gear.png" alt="">
      </div>
      <div class="mod-content-wrap">
        <div class="mode-btn">
          <button @click="confirm" class="btn-confirm">确定</button>
          <button @click="cancel" class="btn-cancel">取消</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "my-modal",
      props: ['content'],
      methods: {
        confirm() {//确定
            this.$emit('confirm');
        },
        cancel() {//取消
            this.$emit('cancel');
        }
      }
    }
</script>

<style scoped lang="scss">
  #modal {
    width: 400px;
    height: 233px;
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
      height: 146px;
      padding-top: 62px;
      font-family:'PingFang-SC-Bold';
      font-weight: bold;
      color: rgba(255,254,254,1);
      background:url('../../../../static/images/index/bg.jpg') no-repeat;
      background-size: cover;
      border-radius: 10px 10px 0 0;
      img {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
    /*提示文字内容wrap*/
    .mod-content-wrap {
      position: relative;
      height: 87px;
      background:rgba(255,255,255,1);
      padding-top: 39px;
      border-radius: 0 0 10px 10px;
      /*按钮*/
      .mode-btn {
        button {
          width: 92px;
          height: 28px;
          line-height: 28px;
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
