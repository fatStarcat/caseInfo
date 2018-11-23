<template>
  <!--菜单-->
    <div id="menu">
        <ul>
          <router-link tag="li" to="/countAnalysis" class="menu-item">
            <!--内容-->
            <ul>
              <li class="item-head" @mouseenter="showActiveImg=1" @mouseleave="showActiveImg=0" :class="{'menu-selected': selected==0?true:false}">
                <!--<Icon type="ios-apps" />-->
                <img class='count-img' v-show="showActiveImg!=1&&selected!=0" src="../../../assets/public/common/count.png" alt="">
                <img class='count-img' v-show="showActiveImg==1&&selected!=0" src="../../../assets/public/common/count-active.png" alt="">
                <img class='count-img' v-show="selected==0" src="../../../assets/public/common/count-selected.png" alt="">
                <span>统计分析</span>
              </li>
            </ul>
          </router-link>
          <li class="menu-item" @click="openMenu('case')" :class="{'menu-open': isCaseActive,'menu-head-selected':selected==1||selected==2||selected==3}">
            <!--内容-->
            <ul>
              <li class="item-head" @mouseenter="showActiveImg=2" @mouseleave="showActiveImg=0">
                <!--<Icon type="ios-apps" />-->
                <img v-show="showActiveImg!=2&&!isCaseActive&&selected!=1&&selected!=2&&selected!=3" src="../../../assets/public/common/program.png" alt="">
                <img v-show="showActiveImg==2||isCaseActive||selected==1||selected==2||selected==3" src="../../../assets/public/common/program-active.png" alt="">
                <span>程序性公开</span>
                <Icon class='icon-arrow' :type="isCaseActive?'ios-arrow-up':'ios-arrow-down'" />
              </li>
              <li @click.stop="selected=index+1" class="item-content" :class="{'menu-selected': selected==index+1?true:false}" v-for="item,index in caseData" :key="index">
                  <router-link tag="span" :to="item.href">
                    <span>
                      {{item.val}}
                    </span>
                  </router-link>
              </li>
            </ul>
          </li>
          <li class="menu-item" @click="openMenu('doc')" :class="{'menu-open': isDocActive,'menu-head-selected':selected==4||selected==5||selected==6}">
            <ul>
              <li class="item-head" @mouseenter="showActiveImg=3" @mouseleave="showActiveImg=0">
                <!--<Icon type="ios-book" />-->
                <img class='doc-img' v-show="showActiveImg!=3&&!isDocActive&&selected!=4&&selected!=5&&selected!=6" src="../../../assets/public/common/doc.png" alt="">
                <img class='doc-img' v-show="showActiveImg==3||isDocActive||selected==4||selected==5||selected==6" src="../../../assets/public/common/doc-active.png" alt="">
                <span>文书公开</span>
                <Icon class='icon-arrow' :type="isDocActive?'ios-arrow-up':'ios-arrow-down'" />
              </li>
              <!--<router-link tag="li" :to="item.href" @click.stop="selected=index+4" class="item-content" :class="{'menu-selected': selected==index+4?true:false}" v-for="item,index in docData" :key="index">-->
                <!--<span>{{item.val}}</span>-->
              <!--</router-link>-->
              <li @click.stop="selected=index+4" class="item-content" :class="{'menu-selected': selected==index+4?true:false}" v-for="item,index in docData" :key="index">
                <router-link tag="span" :to="item.href">
                  <span>
                    {{item.val}}
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
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
            caseData: [
              {
                val: '区域分析',
                href: '/countCaseArea'

              },
              {
                val: "案件类型分析",
                href: '/countCaseType'
              },
              {
                val: '检察官分析',
                href: '/countCaseInquisitor'
              }
            ],
            docData: [
              {
                val: '区域分析',
                href: '/countDocArea'

              },
              {
                val: "文书类型分析",
                href: '/countDocType'
              },
              {
                val: '检察官分析',
                href: '/countDocInquisitor'
              }
            ],
          }
      },
      methods: {
          openMenu(type) {
            if(type=='doc') {
              this.isDocActive = !this.isDocActive;
            }else {
              this.isCaseActive = !this.isCaseActive;
            }
          }
      },
      watch: {
        resetMenu() {
          if(this.resetMenu) {
            this.selected = 0;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
 #menu {
   height: 100%;
   width: 138px;
   padding-top: 109px;
   overflow-y: auto;
   background:rgba(242,242,242,1);
   font-family:'PingFang-SC-Regular';
   font-weight: 400;
   color: #555555;
   box-shadow: 4px 0px 4px rgba(189,189,189,.27);
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

     >img {
       float: left;
       position: relative;
       top: 50%;
       left: 0;
       transform: translate(0,-50%);
       margin-right: 7px;

     }
     .count-img {
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
 }
</style>
