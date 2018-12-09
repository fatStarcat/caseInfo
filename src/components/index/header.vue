<template>
  <div id="header">
    <!--logo-->
    <div id="logo">
      <div id="logo-img">
        <img src="../../assets/index/logo.png" alt="">
      </div>
      <div id="logo-text">
        案件信息智慧公开系统
      </div>
    </div>
    <!--信息-->
    <div id="header-info" >
      <!--用户信息-->
      <div class="infoItem">
        <img src="../../assets/index/user.png" alt="">
        <span>欢迎您，{{userName}}</span>
      </div>
      <!--消息-->
      <!--<div class="infoItem">-->
        <!--<img src="../../assets/index/tip.png" alt="">-->
        <!--<span>消息</span>-->
      <!--</div>-->
      <!--退出-->
      <div class="infoItem" @click="exit">
        <img src="../../assets/index/toggle.png" alt="">
        <span>切换用户</span>
      </div>

    </div>
    <!--关闭-->
    <span class="close forms-btn" @click="close">
        <img src="../../assets/index/close.png" alt="">
      </span>
    <span class="small forms-btn" @click="minSize" >
        <img src="../../assets/index/small.png" alt="">
      </span>

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
        exit(){//切换用户
          let _this = this;
          this.axios.get(webApi.Host + webApi.Auth.Logout)
            .then(function(res){
              console.log(res);
              if(res.data.code==0) {
                invoker.reLogin();
              }
            })
            .catch(function(err) {
              console.log(err)
            })

        },
        close() {//退出
          this.$emit('modShow')
        },
        minSize() {//最小化窗口
          invoker.minimize();
        }
      }
    }
</script>

<style scoped lang="scss">
   #header {
     position: relative;
     width: 100%;
     height: 100%;
     /*logo*/
     #logo {
       display: table;
       height: 100%;
       float: left;
       text-align: center;
       color: #FFFFFF;
       font-size: 40px;
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
         font-family: 'fangzheng_GBK';
       }
     }
     /*info*/
     #header-info {
       display: table;
       position: absolute;
       top: 0;
       right: 85px;
       height: 100%;
       font-size: 18px;
       color: #fff;
       .infoItem {
        display: table-cell;
        vertical-align: middle;
        padding: 0 20px;
         &:hover {
           background: rgba(6,14,128,0.5);
           cursor: pointer;
         }
         &:nth-child(3) {
           cursor: pointer;
         }
         img {
           vertical-align: middle;
           margin-top: -4px;
           width: 18px;
           height: 18px;
           margin-right: 3px;
         }
       }
     }
     /*forms-btn*/
     .forms-btn {
       position: absolute;
       top: 7px;
       right: 20px;
       cursor: pointer;
     }
     .small {
       right: 64px;
       top: 2px;
     }

   }
</style>
