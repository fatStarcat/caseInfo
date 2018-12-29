<template>
  <div class="modal-wrap">
    <div class="main-modal">
      <div class="modal-content">
        <!--标题-->
        <div class="main-modal-title">
          {{lookTitle}}
        </div>
        <!--填写内容-->
        <div class="main-modal-fill">
          <div class="main-modal-item">
            <span>短信内容 :</span>
            <span>
                  <textarea>{{lookInfo.content}}</textarea>
              </span>
          </div>
          <div class="main-modal-item">
            <span>发送时间 :</span>
            <span>{{lookInfo.sendTime}}</span>
          </div>
          <div class="main-modal-item">
            <span>联系人 :</span>
            <span>{{lookInfo.contacts}}</span>
          </div>

          <!--按钮组-->
          <div class="main-modal-btn">
            <button class="cus-info-btn" @click="confirm">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['lookInfo','lookTitle'],
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
