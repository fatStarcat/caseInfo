<template>
  <div id="sideMenu">
    <Menu :theme="theme" :active-name="currNum" @on-select="changeNum">
      <Menu-item name="index" to="/index">
        <Icon type="ios-alert-outline" size="36"/>
        <span>实时提醒</span>
      </Menu-item>
      <Menu-item name="1">
        <Icon type="ios-paper-outline" size="36"/>
        <span>文书屏蔽</span>
      </Menu-item>
      <Menu-item name="infoExport"  class="change-li" to="infoExport">
        <Icon type="ios-card-outline" size="36"/>
        <span>数据导出</span>
      </Menu-item>
      <Menu-item name="messagePush" class="change-li" to="messagePush">
        <Icon type="ios-mail-outline" size="36"/>
        <span>信息推送</span>
      </Menu-item>
      <Menu-item name="countAnalysis" class="change-li" to="countAnalysis">
        <Icon type="ios-pie-outline" size="36"/>
        <span>统计分析</span>
      </Menu-item>
      <Menu-item name="relevantRegulations" to="relevantRegulations">
        <Icon type="ios-copy-outline" size="36"/>
        <span>相关文件</span>
      </Menu-item>
    </Menu>
  </div>
</template>

<script>
    export default {
        data(){
            return {
              admin: '',
              theme: 'light',
              currNum: '1',
              role: JSON.parse(localStorage.getItem('userInfo')).JS,//角色 1:承办人,2:案管,4:管理员
            }
        },
        methods: {
          getCaseType() {//获取案件类型
            this.axios.get(webApi.Host + webApi.SystemInfo.GetAJLXs)
              .then(function(res){
                if(res.data.code==0) {
                  localStorage.setItem('AJLX',JSON.stringify(res.data.data));
                }
                ;
              })
              .catch(function(err){
                console.log(err);
              })
          },
          getDocType() {//获取案件类型
            this.axios.get(webApi.Host + webApi.SystemInfo.GetWSLBs)
              .then(function(res){
                if(res.data.code==0) {
                  localStorage.setItem('WSLX',JSON.stringify(res.data.data));
                }
                ;
              })
              .catch(function(err){
                console.log(err);
              })
          },
          //跳转文书屏蔽页面
          toShield() {
            if(this.role=='案管人员'||this.role=='管理员') {
              this.$router.push({path:'/docShieldAdmin'});
            }else {
              this.$router.push({path:'/documentShield'});
            }
          },
        //  选择菜单
          changeNum(name) {
            this.currNum = name;
            if(name==1) {//文书屏蔽
              this.toShield();
            }
          }
        },
        created() {
          var admin = localStorage.getItem('setAdmin');
          (admin)&&(this.admin = admin)
        },
        beforeMount() {
          this.getCaseType();//获取案件信息
          this.getDocType();//获取文书类型
        },
        mounted() {
          if(this.$route.path == "/index"||this.$route.path == '/docInfo'||this.$route.path == '/caseInfo') {
            this.currNum = 'index';
          }else if(this.$route.path == "/documentShield" || this.$route.path == "/docShieldAdmin" ||this.$route.path == '/revise'|| this.$route.path == '/drafting'|| this.$route.path == '/examine'|| this.$route.path == '/look') {
            this.currNum = '1';
          }else if(this.$route.path == "/infoExport") {
            this.currNum = 'infoExport';
          }else if(this.$route.path == "/messagePush") {
            this.currNum = 'messagePush';
          }else if(this.$route.path == "/countAnalysis"||this.$route.path == "/countCaseArea"||this.$route.path == "/countCaseType" || this.$route.path == "/countCaseInquisitor" || this.$route.path == "/countDocArea" ||this.$route.path == "/countDocType" || this.$route.path == "/countDocInquisitor") {
            this.currNum = 'countAnalysis';
          }else if(this.$route.path == "/relevantRegulations") {
            this.currNum = 'relevantRegulations';
          }
            if(this.role=='承办人'){//承办人角色
            let changeList = document.querySelectorAll('.change-li');
            for(let i = 0,len = changeList.length;i < len;i++) {
              changeList[i].style.cssText = 'opacity: 0.3;cursor:not-allowed !important;';
              changeList[i].setAttribute('disabled',true);
            }
          }

        }
    }
</script>

<style scoped lang="scss">
  #sideMenu {
    width: 100%;
    height: 100%;
    .ivu-menu {
      width: 100%;
      height: 100%;
      .ivu-menu-item {
        width: 100%;
        height: 105px;
        font-size: 18px;
        color: #F6F6F6;
        font-weight: 400;
        padding-top: 21px;
        i,span {
          display: block;
          width: 100%;
          text-align: center;
        }
        &:hover {
          /*background-color: rgba(7,24,50,.6);*/
          background: rgba(6,14,128,0.5);
        }

      }
    }
  }

  /*重置iview菜单样式*/
  .ivu-menu-light {
    background: transparent !important;
  }
  .ivu-menu-item {
    padding: 14px 14px !important;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    content: '' !important;
    position: absolute !important;
    top: 50% !important;
    right: 0 !important;
    transform: translate(0,-50%) !important;
    display: block !important;
    width: 0 !important;
    height: 0 !important;
    border: 8px solid transparent !important;
    border-right-color: #fff !important;
    background-color: transparent !important;
  }
  .ivu-menu-vertical.ivu-menu-light:after {
    background-color: transparent !important;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    /*background: rgba(7,24,50,.6) !important;*/
    background: rgba(6,14,128,0.5) !important;
  }
</style>
