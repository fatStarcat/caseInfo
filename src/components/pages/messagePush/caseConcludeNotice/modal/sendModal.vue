<template>
  <div class="modal-wrap">
    <div class="main-modal">
      <div class="modal-content">
        <!--标题-->
        <div class="main-modal-title">
          发送通知
        </div>
        <!--填写内容-->
        <div class="main-modal-fill">
          <div class="main-modal-item">
            <span>通知接收人 : </span>
            <span>{{sendInfo.acceptPerson}}</span>
          </div>
          <div class="main-modal-item">
            <span>手机号码 : </span>
            <span>{{sendInfo.phoneNumber}}</span>
          </div>
          <div class="main-modal-item">
            <span class="modal-span-top">通知内容 : </span>
            <span>
                  <textarea>{{sendInfo.content}}</textarea>
            </span>
          </div>
          <!--按钮组-->
          <div class="main-modal-btn">
            <button class="cus-info-btn" @click="confirm">发送</button>
            <button class="cus-cancel-btn" @click="confirm">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Select,Option} from 'iview'
    export default {
      props: ['sendInfo'],
      components: {Select,Option},
      data() {
        return {

        }
      },
      methods: {
        /*确认*/
        confirm() {
          this.$emit('confirm');
        },
      }
    }
</script>

<style scoped>

</style>
