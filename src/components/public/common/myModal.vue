<template>
    <!--对话框-->
  <div id="modal" v-show="show" >
    <!--对话框名称-->
    <div class="title">
      {{title}}
    </div>
    <div class="mod-content-wrap">
      <slot>
        <!--图片-->
      </slot>
      <!--提示文字-->
      <div class="mod-content">
        {{content}}
      </div>
      <div class="mode-btn">
        <button @click="confirm" class="btn-confirm">确定</button>
        <button @click="cancel" class="btn-cancel">取消</button>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "my-modal",
      props: ['title','content','show'],
      methods: {
          confirm() {//确定
              invoker.exit();
          },
        cancel() {//取消
            this.$emit('cancel');
        }
      }
    }
</script>

<style scoped lang="scss">
#modal {
  width: 527px;
  position: relative;
  left: 50%;
  top: 100px;
  transform: translate(-50%,0);
  background:rgba(69,137,253,1);
  border-radius:10px;
  padding: 20px 11px  11px  11px;
  text-align: center;
  font-size: 20px;
  color: #333333;
  z-index: 999999999;
  clear: both;
  /*标题*/
  .title {
    font-size: 22px;
    font-family: 'PingFang-SC-Bold';
    color: #FFFEFE;
    padding-bottom: 20px;
  }
  /*提示文字内容wrap*/
  .mod-content-wrap {
    position: relative;
    height: 191px;
    background:rgba(255,255,255,1);
    img {
      position: absolute;
      top: 50px;
      left: 58px;
    }
    .mod-content {
      font-family:'PingFang-SC-Medium';
      padding-top: 62px;
      padding-bottom: 55px;
    }
    /*按钮*/
    .mode-btn {
      font-family:'PingFang-SC-Regular';
      button {
        width: 92px;
        height: 28px;
        border-radius:10px;
        border: none;
        &:hover {
          background: rgba(69,137,253,1);
          color: #FFFFFF;
          cursor: pointer;
        }
      }
    }
  }

}
</style>
