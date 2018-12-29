<template>
  <!--菜单-->
  <div id="menu">
    <ul>
      <!--<router-link tag="li" to="/messagePush" class="menu-item">-->
        <!--&lt;!&ndash;内容&ndash;&gt;-->
        <!--<ul>-->
          <!--<li class="item-head" @mouseenter="showActiveImg=0" @mouseleave="showActiveImg=0" :class="{'menu-selected': selected==0?true:false}">-->
            <!--&lt;!&ndash;<Icon type="ios-apps" />&ndash;&gt;-->
            <!--<img class='count-img' v-show="showActiveImg!=1&&selected!=0" src="../../../assets/public/common/count.png" alt="">-->
            <!--<img class='count-img' v-show="showActiveImg==1&&selected!=0" src="../../../assets/public/common/count-active.png" alt="">-->
            <!--<img class='count-img' v-show="selected==0" src="../../../assets/public/common/count-selected.png" alt="">-->
            <!--<span>案件受理通知</span>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</router-link>-->
      <template v-for="item,index in menuData" >
        <router-link tag="li" :to="item.to" class="menu-item">
          <!--内容-->
          <ul>
            <li @click="selected=index" class="item-head" @mouseenter="showActiveImg=index" @mouseleave="showActiveImg=-1" :class="{'menu-selected': selected===index?true:false}">
              <!--<Icon type="ios-apps" />-->
              <span class='count-img' :class="item.img" v-show="showActiveImg!=index&&selected!=index" > </span>
              <span class='count-img' :class="item.activeImg" v-show="showActiveImg==index&&selected!=index"  ></span>
              <span class='count-img' :class="item.selectImg" v-show="selected==index" ></span>
              <span>{{item.label}}</span>
            </li>
          </ul>
        </router-link>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "my-menu",
    props: ['resetMenu'],
    data() {
      return {
        selected: 0,
        showActiveImg: 0,//移入显示 1:count,2:program,3:doc
        isDocActive: true,
        isCaseActive: true,
        menuData: [
          {
            img: 'caseAccept-d',
            activeImg: 'caseAccept-h',
            selectImg: 'caseAccept-s',
            label: '案件受理通知',
            to: '/messagePush'
          },
          {
            img: 'caseAllot-d',
            activeImg: 'caseAllot-h',
            selectImg: 'caseAllot-s',
            label: '案件分配通知',
            to: '/CaseAllotNotice'
          },
          {
            img: 'caseConclude-d',
            activeImg: 'caseConclude-h',
            selectImg: 'caseConclude-s',
            label: '案件审结通知',
            to: '/CaseConcludeNotice'
          },
          {
            img: 'cusMsgSend-d',
            activeImg: 'cusMsgSend-h',
            selectImg: 'cusMsgSend-s',
            label: '自定义短信通知',
            to: '/CustomMessageSend'
          },
          {
            img: 'mailManage-d',
            activeImg: 'mailManage-h',
            selectImg: 'mailManage-s',
            label: '通讯录管理',
            to: '/MailListManage'
          },
          {
            img: 'msgTemp-d',
            activeImg: 'msgTemp-h',
            selectImg: 'msgTemp-s',
            label: '短信模板管理',
            to: '/MsgTemplateManage'
          }
        ]
      }
    },
    created() {
      this.setMenu();
    },
    methods: {
      setMenu() {//设置显示区域分析模块
        this.showActiveImg = -1;
        if(this.$route.path == "/messagePush") {
          this.selected =  0;
        }else if(this.$route.path == "/CaseAllotNotice") {
          this.selected =  1;
        }else if(this.$route.path == "/CaseConcludeNotice") {
          this.selected =  2;
        }else if(this.$route.path == "/CustomMessageSend") {
          this.selected =  3;
        }else if(this.$route.path == "/MailListManage") {
          this.selected =  4;
        }else if(this.$route.path == "/MsgTemplateManage") {
          this.selected =  5;
        }
      },
    },
    watch: {
      resetMenu() {
        if(this.resetMenu) {
          this.selected = 0;
          this.showActiveImg = -1;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #menu {
    height: 100%;
    width: 144px;
    padding-top: 109px;
    overflow-y: auto;
    background:rgba(242,242,242,1);
    font-family:'PingFang-SC-Regular';
    font-weight: 400;
    color: #555555;
    box-shadow: 4px 0 4px rgba(189,189,189,0.27);
    font-size: 14px;
    li {
      height: 48px;
      line-height: 48px;
      overflow: hidden;
      user-select: none;
      cursor: pointer;
    }
    .item-head {/*菜单选择项*/
      position: relative;
      padding-left: 16px;
      .count-img {
        float: left;
        position: relative;
        top: 50%;
        left: 0;
        transform: translate(0,-50%);
        margin-right: 6px;
        margin-left: -2px;
      }
      .doc-img {
        margin-right: 5px;
      }
      >span {
        float: left;
      }
      &:hover {
        color: #4589FD;
      }
      .icon-arrow {
        position: absolute;
        content: "";
        top: 50%;
        right: 10px;
        transform: translate(0,-50%);
      }
    }
    .item-content {/*内容选择项*/
      /*position: relative;*/
      font-family:'PingFang-SC-Regular';
      color:rgba(102,102,102,1);
      &:hover {
        color: #4589FD;
      }
      >span {
        display: inline-block;
        width: 100%;
        padding-left: 36px;
        height: 48px;
        line-height: 48px;

        >span {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-bottom: 1px solid #DADADA;
        }
      }
    }
    /*打开的菜单*/
    .menu-open {
      height: auto;
      color: #4589FD
    }
    .menu-head-selected {
      color: #4589FD
    }
    /*选中菜单项*/
    .menu-selected {
      background-color: #4589FD;
      font-family:'PingFang-SC-Bold';
      font-weight:bold;
      color:rgba(255,255,255,1);
      >span {
        >span {
          border-bottom: 1px solid #4589FD;
        }
      }
      &:hover {
        color:rgba(255,255,255,1);
      }
    }
    /*菜单图标*/
    @mixin msg-icon($width,$height,$x,$y) {
      display: inline-block;
      width: $width;
      height: $height;
      background: url('../../../assets/messagePush/msgpushIcon.png') no-repeat $x $y;
    }
    //案件办结默认
    .caseConclude-d {
      @include msg-icon(17px,17px,-47px,-10px);
    }
    //案件办结移入
    .caseConclude-h {
      @include msg-icon(17px,17px,-10px, -47px);
    }
    //案件办结选中
    .caseConclude-s {
      @include msg-icon(17px,17px,-10px, -10px);
    }
    /*案件分配默认*/
    .caseAllot-d {
      @include msg-icon(16px,12px,-154px, -10px);
    }
    /*案件分配移入*/
    .caseAllot-h {
      @include msg-icon(16px,12px,-154px, -42px);
    }
    /*案件分配选中*/
    .caseAllot-s {
      @include msg-icon(16px,12px,-118px, -120px);
    }
    /*案件受理默认*/
    .caseAccept-d {
      @include msg-icon(14px,16px,-120px, -46px);
    }
    /*案件受理移入*/
    .caseAccept-h {
      @include msg-icon(14px,16px,-120px, -82px);
    }
    /*案件受理选中*/
    .caseAccept-s {
      @include msg-icon(14px,16px,-120px, -10px);
    }
    /*短信模板选中*/
    .msgTemp-s {
      @include msg-icon(16px,16px,-47px, -47px);
    }
    /*短信模板默认*/
    .msgTemp-d {
      @include msg-icon(16px,16px,-84px, -10px);
    }
    /*短信模板移入*/
    .msgTemp-h {
      @include msg-icon(16px,16px,-84px, -46px);
    }
    /*通讯录管理选中*/
    .mailManage-s {
      @include msg-icon(16px,16px,-10px, -84px);
    }
    /*通讯录管理默认*/
    .mailManage-d {
      @include msg-icon(16px,16px,-46px, -84px);
    }
    /*通讯录管理移入*/
    .mailManage-h {
      @include msg-icon(16px,16px,-82px, -84px);
    }
    /*自定义短信发送选中*/
    .cusMsgSend-s {
      @include msg-icon(16px,14px,-10px, -120px);
    }
    /*自定义短信发送默认*/
    .cusMsgSend-d {
      @include msg-icon(16px,14px,-46px, -120px);
    }
    /*自定义短信发送移入*/
    .cusMsgSend-h {
      @include msg-icon(16px,14px,-82px, -120px);
    }
  }
</style>
