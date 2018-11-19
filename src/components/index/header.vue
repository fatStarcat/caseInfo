<template>
  <div id="header">
    <!--logo-->
    <div id="logo">
      <div id="logo-img">
        <img src="../../assets/index/logo.png" alt="">
      </div>
      <div id="logo-text">
        红蕲案件信息智慧公开系统
      </div>
    </div>
    <!--信息-->
    <div id="header-info">
      <!--用户信息-->
      <div class="infoItem">
        <img src="../../assets/index/user.png" alt="">
        <!--<Icon type="ios-person-outline" size="24"/>-->
        <span>欢迎您，{{userName}}</span>
      </div>
      <!--消息-->
      <div class="infoItem">
        <!--<img src="../../assets/index/tip.png" alt="">-->
        <Icon type="ios-notifications-outline" size="24"/>
        <span>消息</span>
      </div>
      <!--退出-->
      <div class="infoItem" @click="exit">
        <!--<img src="../../assets/index/exit.png" alt="">-->
        <Icon type="ios-exit-outline" size="24" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          userName: localStorage.getItem('setAdmin')?localStorage.getItem('setAdmin'):'未知'
        }
      },
      methods: {
        exit(){//退出
          localStorage.setItem('setAdmin','');
          this.$router.push({path:'/'});
        }
      }
    }
</script>

<style scoped lang="scss">
   #header {
     width: 100%;
     height: 100%;
     /*logo*/
     #logo {
       display: table;
       height: 100%;
       float: left;
       text-align: center;
       color: #FFFFFF;
       font-size: 36px;
       font-weight: 600;
       div {
         display: table-cell;
         vertical-align: middle;
       }
       #logo-img {
         width: 150px;
         height: 100%;
         img {
           vertical-align: middle;
         }
       }
       #logo-text {
         height: 100%;
       }
     }
     /*info*/
     #header-info {
       display: table;
       float: right;
       height: 100%;
       margin-right: 84px;
       font-size: 18px;
       color: #fff;
       .infoItem {
        display: table-cell;
        vertical-align: middle;
        padding-left: 70px;
         &:nth-child(3) {
           cursor: pointer;
         }
         img {
           vertical-align: middle;
           margin-top: -3px;
           width: 20px;
           height: 20px;
         }
       }
     }
   }
</style>
