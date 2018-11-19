<template>
  <!--标题-->
  <div id="docTitle">
    <div  ref="title" @blur="blurTitle">{{docTitle}}<!--修改按钮--><span v-show="showPenSpan" class="updateTitle" @click="changeTitle" @mouseenter="showPen=2" @mouseleave="showPen=1"><img v-show="showPen===1" src="../../../assets/documentShield/pen.png" alt=""><img v-show="showPen===2" src="../../../assets/documentShield/penHover.png" alt=""></span></div>
  </div>
</template>

<script>
    export default {
        name: "doc-title",
      data() {
          return {
            showPenSpan: true,
            showPen: 1,//显示修改标题按钮
          }
      },
      props: ['docTitle'],
      methods: {
        changeTitle() {//修改标题
          let title = this.$refs.title;
          title.setAttribute('contenteditable',true);
          title.style.borderColor = 'rgba(69,137,253,1)';
          title.focus();
          this.setFocus(title);
          this.showPenSpan = false;
        },
        blurTitle() {//修改标题失去焦点
          let title = this.$refs.title;
          title.setAttribute('contenteditable',false);
          title.style.borderColor = 'transparent';
          this.showPenSpan = true;
        },
        setFocus(el) {//设置光标位置
          let range = document.createRange();
          let sel = window.getSelection();
          range.selectNodeContents(el);
          range.collapse(false);
          if(sel.anchorOffset!=0){
            return;
          };
          sel.removeAllRanges();
          sel.addRange(range);
        }
      },
    }
</script>

<style scoped lang="scss">
  #docTitle {//标题
    text-align: center;
    font-size:24px;
    font-family: 'PingFang-SC-Bold';
    font-weight:bold;
    color: rgba(85,85,85,1);
    margin-bottom: 20px;
    >div {
      position: relative;
      display: inline-block;
      width: auto;
      border: 1px solid transparent;
      padding: 0 16px;
      border-radius: 10px;
      outline: none;
      >span {/*修改按钮*/
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translate(0,-50%);
        display: inline-block;
        height: 38px;
        line-height: 38px;
        img {
          cursor: pointer;
        }
      }
    }
  }
</style>
