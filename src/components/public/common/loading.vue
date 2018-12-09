<template>
    <div :style="{height:height+'px',width:width+'px'}" v-show="isLoading" class="loadEffect">
      <img v-if="type=='w'" src='../../../assets/public/common/loading-w.gif' alt=""/>
      <img v-if="type=='b'" src='../../../assets/public/common/loading-b.gif' alt=""/>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props: ['isLoading','width','height','type']
    }
</script>

<style scoped lang="scss">
  .loadEffect{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    img {
      width: 100%;
    }
  }

</style>
