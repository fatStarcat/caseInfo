<template>
  <!--面包屑-->
    <div id="myBread">
      <div @click="goBack(index)" class="bread-item" v-for="item,index in breadData" :key="index">
        <img v-if="index!=0" src="../../../assets/public/common/breadImg.png" alt="">
        <span>
        {{item}}
        </span>
      </div>

    </div>
</template>

<script>
    export default {
        name: "my-bread",
      data() {
          return {

          }
      },
      props: {
        breadData: {
          default: []
        }
      },
      methods: {
          goBack(index){
            (index==0)&&(this.$router.go(-1))
          }
      }
    }
</script>

<style scoped lang="scss">
  #myBread {
    font-size:16px;
    font-family: 'PingFang-SC-Medium';
    font-weight: 500;
    overflow: hidden;
    padding-left: 9px;
    .bread-item {
      position: relative;
      float: left;
      color: #555555;
      height: 24px;
      line-height: 24px;
      &:first-child:before {
        content: '';
        position: absolute;
        top: 50%;
        left: -9px;
        transform: translate(0,-50%);
        display: inline-block;
        width: 4px;
        height: 15px;
        background:rgba(69,137,253,1);
      }
      &:last-child {
        /*font-weight: bold;*/
        color: darkgray !important;
        cursor: auto !important;
        &:hover {
          color: darkgray;
        }
      }
      &:hover {
        color: #4589FD;
        cursor: pointer;
      }
      img {
        vertical-align: middle;
        margin-left: 9px;
        margin-right: 6px;
        margin-top: -3px;
      }
    }
  }
</style>
