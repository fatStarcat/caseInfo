<template>
    <div class="modal-wrap">
      <div class="main-modal">
        <div class="main-modal-tip">
            <div class="main-modal-tip-title">
              {{tipTitle}}
            </div>
          <!--按钮组-->
          <div class="main-modal-btn">
            <button class="cus-info-btn" @click="confirm">确认</button>
            <button class="cus-cancel-btn" @click="confirm">取消</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "tip-modal",
      props: ['tipTitle'],
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
