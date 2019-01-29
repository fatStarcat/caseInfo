<template>
  <div id="pdf">
    <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
    export default {
        name: "pdf",
      data(){
          return {
            src: this.$route.query.src
          }
      },
    }
</script>

<style scoped lang="scss">
 #pdf {
   width: 100%;
   height: 100%;
   overflow: hidden;
   iframe {
     width: 100%;
     height: 100%;
   }
 }
</style>
