<template>
    <div id="index">
      <!--头部-->
      <div id="index-header">
        <header-bar @modShow="toggleModal"></header-bar>
      </div>
      <!--内容-->
      <div id="index-content">
        <!--导航-->
        <div id="sideMenu">
          <side-menu></side-menu>
        </div>
        <!--功能区-->
        <div id="main-content">
          <router-view/>
        </div>
      </div>
      <!--底部-->
      <div id="index-footer">
        <!--<footer-bar></footer-bar>-->
      </div>
      <!--退出提示框-->
      <my-modal @cancel="toggleModal" :content="modContent" :show="modShow">
      </my-modal>
    </div>
</template>

<script>
    import headerBar from './header'
    import footerBar from './footer'
    import sideMenu from './sideMenu'
    export default {
        name: "index",
      data(){
          return{
            modTitle: '案件信息智慧公开系统',
            modContent: '确定要退出吗?',
            modShow: false,
          }
      },
      components: {headerBar,footerBar,sideMenu},
      methods: {
        toggleModal() {
          this.modShow = !this.modShow;
        },
      },
      created(){
        webApi.Host = localStorage.getItem('Host');
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
