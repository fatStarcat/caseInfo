<template>
    <div id="index">
      <!--头部-->
      <div id="index-header">
        <header-bar @modShow="modShow=true"></header-bar>
      </div>
      <!--内容-->
      <div id="index-content">
        <!--导航-->
        <div id="sideMenu">
          <side-menu></side-menu>
        </div>
        <!--功能区-->
        <div id="main-content">
          <router-view></router-view>
        </div>
      </div>
      <!--底部-->
      <div id="index-footer">
        <!--<footer-bar></footer-bar>-->
      </div>
      <!--退出提示框-->
      <my-modal @confirm="exit" @cancel="closeModal" :content="modContent" v-show="modShow">
      </my-modal>
      <!--重新登录-->
      <re-login @cancel="closeModal" v-show="relShow"></re-login>
      <!--请求失败提示-->
      <re-fail @reAgain="reAgain" v-show="failShow"></re-fail>
    </div>
</template>

<script>
    import headerBar from './header'
    import footerBar from './footer'
    import sideMenu from './sideMenu'
    import reLogin from './modalReLogin'
    import reFail from './modalFail'
    export default {
        name: "index",
      data(){
          return{
            modContent: '确定要退出吗?',
            modShow: false,
            failShow: false,
            relShow: false,//重新登录提示框显示
            config: null,//请求配置
          }
      },
      components: {headerBar,footerBar,sideMenu,reLogin,reFail},
      methods: {
        reAgain(){//重新请求
          // console.log(this.config);
          // this.axios(this.config);
          location.reload();
        },
        closeModal() {//关闭提示框
          this.modShow = false;
          this.relShow = false;
        },
        exit(){
          localStorage.setItem('Host','');
          invoker.exit();
        },
      },
      created(){
        let _this = this;
        webApi.Host = localStorage.getItem('Host');
        this.$bus.$on('relModal',function(config){
          _this.relShow = config.relShow;
        });
        this.$bus.$on('failModal',function(config){
          _this.failShow = config.failShow;
          _this.config = config.config;
        });
        console.log(webApi.Host)
      },
      mounted() {
        console.log(invoker)
      }

    }
</script>

<style scoped lang="scss">
  #index {
    width: 100%;
    height: 100%;
    background: url('../../../static/images/index/bg.jpg') no-repeat;
    background-size: cover;
    /*头部*/
    #index-header {
      width: 100%;
      height: 106px;
    }
    /*内容*/
    #index-content {
      width: 100%;
      height: calc( 100% - 106px);
      /*菜单*/
      #sideMenu {
        float: left;
        width: 150px;
        height: 100%;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      /*功能区*/
      #main-content {
        float: left;
        width: calc(100% - 150px);
        height: calc(100%);
        background: url('../../../static/images/index/mainBg.png') no-repeat;
        background-size: cover;
      }
    }
  }

  @media(max-width:1600px) {
    #index-content {
      height: calc( 100% - 106px - 17px);
    }
  }

</style>
