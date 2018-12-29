<template>
    <div id="messagePush">
      <!--菜单-->
      <div class="message-menu">
        <msg-menu></msg-menu>
      </div>
      <!--页面内容-->
      <div class="message-main">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
    import msgMenu from '../../public/messagePush/msgMenu';
    export default {
        name: "message-push",
      components: {msgMenu},
      data() {
          return {
            resetMenu: false,
          }
      },
      watch: {
        $route(to,from) {
          // if(to.path=='/countAnalysis') {
          //   this.resetMenu = Math.random()*10 + (new Date()).getTime();
          // }
        }
      },
    }
</script>

<style lang="scss">
@import '../../../css/messagePush/messagePush';
</style>
