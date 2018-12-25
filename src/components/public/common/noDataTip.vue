<template>
    <div class="noData">
      暂无数据
    </div>
</template>

<script>
    export default {
        name: "no-data-tip"
    }
</script>

<style scoped lang="scss">
 .noData {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   font-size: 14px;
   /*font-family: "Microsoft YaHei";*/
 }
</style>
