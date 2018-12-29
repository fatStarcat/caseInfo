<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    let loading = document.querySelector('#spinner');
    if(loading!=null){
      document.body.removeChild(loading);
    }
  }
}
</script>

<style lang="scss">
  @import 'css/common/layout.css';
  @import 'css/common/common.scss';
  @import 'css/common/font.css';
  @import 'css/common/resetIvi';
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body {
    height: 100%;
    font-size: 20px;
    /*font-size: 14px;*/
    /*min-width: 1600px;*/
    /*min-height: 900px;*/
  }
  input {
    outline: none;
  }
  a {
    text-decoration: none;
  }
  ul {
    width: 100%  !important;
    outline: none;
    list-style: none;
  }
  button {
    outline: none;
    cursor: pointer;
  }
  #app {
    font-family: '微软雅黑';
    width: 100%;
    height: 100%;
  }

  /*头部th*/
  .ivu-table-header th{
    color:#555555 !important;
    background:rgba(226,245,255,1) !important;
  }
/*日期*/
  .ivu-select-dropdown {
    z-index: 1000 !important;
  }
</style>
