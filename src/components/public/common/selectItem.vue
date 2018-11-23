<template>
  <!--选择区域组件-->
  <div class="select">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "select-item",
    }
</script>

<style scoped lang="scss">
  .select {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    >label {
      display: inline-block;
      vertical-align: middle;
      margin-top: 2px;
      padding-right: 10px;
      font-family: 'PingFang-SC-Regular';
      font-weight: 400;
      color: rgba(85,85,85,1);
    }
    >button {
      position: absolute;
      top: 27.5px;
      right: 30px;
    }
    +.select {
      /*margin-left: 20px;*/
      margin-left: 30px;
    }
  }
</style>
