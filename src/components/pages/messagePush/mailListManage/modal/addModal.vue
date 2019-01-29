<template>
  <div class="modal-wrap">
    <div class="main-modal">
      <div class="modal-content">
        <!--标题-->
        <div class="main-modal-title">
          {{modalTitle}}
        </div>
        <!--填写内容-->
        <div class="main-modal-fill">
          <div class="main-modal-item">
            <span >联系人姓名 : </span>
            <span>
              <Input :value="info.contacts" placeholder="请输入联系人姓名" />
            </span>
          </div>
          <div class="main-modal-item">
            <span>所属分组 : </span>
            <span>
              <Input :value="info.contactsGroup" placeholder="请输入分组" />
            </span>
          </div>
          <div class="main-modal-item">
            <span>手机号码 : </span>
            <span>
              <Input :value="info.phoneNumber" placeholder="请输入手机号码" />
            </span>
          </div>
          <div class="main-modal-item">
            <span class="modal-span-top">备注 : </span>
            <span>
                  <textarea >{{info.remarks}}</textarea>
            </span>
          </div>
          <!--按钮组-->
          <div class="main-modal-btn">
            <button class="cus-info-btn" @click="confirm">确认</button>
            <button class="cus-cancel-btn" @click="confirm">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Input} from 'iview';
  export default {
    props: ['modalTitle'],
    components: {Input},
    data() {
      return {
        info: {}
      }
    },
    methods: {
      /*确认*/
      confirm() {
        this.$emit('confirm');
      }
    }
  }
</script>

<style scoped>

</style>
