<template>
  <div id="count-menu">
    <Menu :theme="theme3"  :active-name="currName"  ref="menu">
      <MenuGroup title="程序性公开">
        <MenuItem name="countCaseArea" to="countCaseArea">
          <Icon type="md-ionic" />
          区域分析
        </MenuItem>
        <MenuItem name="countCaseType" to="countCaseType">
          <Icon type="ios-filing" />
          案件类型分析
        </MenuItem>
        <MenuItem name="countCaseInquisitor" to="countCaseInquisitor">
          <Icon type="ios-people" />
          检察官分析
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="文书公开">
        <MenuItem name="countDocArea" to="countDocArea">
          <Icon type="md-ionic" />
          区域分析
        </MenuItem>
        <MenuItem name="countDocType" to="countDocType">
          <Icon type="ios-paper" />
          文书类型分析
        </MenuItem>
        <MenuItem name="countDocInquisitor" to="countDocInquisitor">
          <Icon type="ios-people" />
          检察官分析
        </MenuItem>
      </MenuGroup>
    </Menu>


    <!--<Menu :theme="theme3"  :active-name="currName"  ref="menu" open-names="[1,2]">-->
      <!--<Submenu name="1">-->
        <!--<template slot="title">-->
          <!--程序性公开-->
        <!--</template>-->
        <!--<MenuItem name="countCaseArea" to="countCaseArea">-->
          <!--<Icon type="md-ionic" />-->
          <!--区域分析-->
        <!--</MenuItem>-->
        <!--<MenuItem name="countCaseType" to="countCaseType">-->
          <!--<Icon type="ios-filing" />-->
          <!--案件类型分析-->
        <!--</MenuItem>-->
        <!--<MenuItem name="countCaseInquisitor" to="countCaseInquisitor">-->
          <!--<Icon type="ios-people" />-->
          <!--检察官分析-->
        <!--</MenuItem>-->
      <!--</Submenu>-->
      <!--<Submenu name="2">-->
        <!--<template slot="title">-->
          <!--文书公开-->
        <!--</template>-->
        <!--<MenuItem name="countDocArea" to="countDocArea">-->
          <!--<Icon type="md-ionic" />-->
          <!--区域分析-->
        <!--</MenuItem>-->
        <!--<MenuItem name="countDocType" to="countDocType">-->
          <!--<Icon type="ios-paper" />-->
          <!--文书类型分析-->
        <!--</MenuItem>-->
        <!--<MenuItem name="countDocInquisitor" to="countDocInquisitor">-->
          <!--<Icon type="ios-people" />-->
          <!--检察官分析-->
        <!--</MenuItem>-->
      <!--</Submenu>-->
    <!--</Menu>-->
  </div>
</template>

<script>
    export default {
        name: "table-menu",
      props: ['currName'],
      data() {
        return {
          theme3: 'light',
        }
      }
    }
</script>

<style scoped lang="scss">
 #count-menu {
   width: 100%;
   height: 100%;
   overflow-y: auto;
 }
</style>
