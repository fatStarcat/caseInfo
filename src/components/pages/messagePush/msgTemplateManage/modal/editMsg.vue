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
            <span>模板名称 :</span>
            <span>
              <Input :value="info.tempName" placeholder="请输入模板名称" />
            </span>
          </div>
          <div class="main-modal-item">
            <span class="modal-span-top">模板内容 :</span>
            <span>
              <div><textarea >{{info.tempContent}}</textarea>
                <br/>
                <span>
                  注：模板支持文本替换<br/>
                  案件名称：{案件名称}<br/>
                  当前阶段：{当前阶段}
                </span>
              </div>
            </span>
          </div>
          <div class="main-modal-item">
            <span class="modal-span-top">备注 :</span>
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
    props: ['info','modalTitle'],
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
