<template>
  <div class="select-group" :style="{'margin-top': marTop + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "select-group",
      props: {
        marTop: {
          default: 0
        }
      }
    }
</script>

<style scoped lang="scss">
 .select-group {
   position: relative;
   button {
     position: absolute;
     right: 0;
     top: 50%;
     transform: translate(0, -50%);
   }
 }
</style>
