<template>
    <div id="count">
      <div id="count-content">
        <!--菜单-->
        <div id="count-menu">
          <my-menu :reset-menu="resetMenu"></my-menu>
        </div>
        <!--内容区-->
        <div id="count-main">
          <!--筛选-->
          <div id="count-head">
            <select-group>
              <select-item>
                <label>时间: </label>
                <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
              </select-item>
              <select-item>
                <label>单位: </label>
                <Select v-model="company" style="width:228px;height: 35px;">
                  <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Checkbox  v-show="showInquisitor">包含下级院</Checkbox>
              </select-item>
              <select-item v-show="showInquisitor">
                <label>检察官: </label>
                <Input v-model="inquisitor" placeholder="请输入检察官姓名" style="width:160px;height: 35px;" />
              </select-item>
              <button class="count-btn btn-hover">
                统计
              </button>
            </select-group>
          </div>
          <!--数据内容-->
          <div id="routeView">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "countAnalysis",
      data() {
        return {
          resetMenu: false,
          showInquisitor: false,
          inquisitor: '',//检察官
          currNum: "",//菜单被选项
          theme3: 'light',
          dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
          company: '黄冈市院',//单位
          companyList: [//单位列表
            {
              value: "黄冈市院",
              label: "黄冈市院"
            },
            {
              value: "黄冈市黄州区院",
              label: "黄冈市黄州区院"
            },
            {
              value: "团风县院",
              label: "团风县院"
            },
            {
              value: "红安县院",
              label: "红安县院"
            },
            {
              value: "罗田县院",
              label: "罗田县院"
            },
            {
              value: "英山县院",
              label: "英山县院"
            },
            {
              value: "浠水县院",
              label: "浠水县院"
            },
            {
              value: "蕲春县院",
              label: "蕲春县院"
            },
            {
              value: "黄梅县院",
              label: "黄梅县院"
            },
            {
              value: "麻城市院",
              label: "麻城市院"
            },
            {
              value: "武穴市院",
              label: "武穴市院"
            }
          ],
        }
      },
      methods: {
        select(name) {
          console.log(this.currNum)
          console.log(name)
        }
      },
      created() {
        var _this = this;
        this.$bus.$on('setInquisitor',function(set) {
          _this.showInquisitor = set;
        });
      },
      mounted() {
        this.currNum = this.$route.path.slice(1);
      },
      watch: {
          $route(to,from) {
            if(to.path=='/countAnalysis') {
              this.resetMenu = Math.random()*10 + (new Date()).getTime();
            }
          }
      },
      beforeDestroy() {
        this.$bus.$off('setTable');
        this.$bus.$off('setInquisitor');
      },
    }
</script>

<style scoped lang="scss">
  #count {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 35px;
    #count-content {
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      overflow-y: auto;
      /*菜单*/
      #count-menu {
        float: left;
        width: 144px;
        height: 100%;
        overflow-y: auto;
      }
      /*main*/
      #count-main {
        margin-left: 144px;
        height: 100%;
        padding: 38px 4px 0;
        #count-head {/*头部筛选内容*/
          padding-right: 40px;
        }
      }
      #routeView {
        margin-top: 20px;
        height: calc(100% - 20px - 38px);
      }
    }
  }

</style>
