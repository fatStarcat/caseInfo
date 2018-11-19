<template>
    <div id="count">
      <div id="count-content" class="clearfix">
        <div id="countSelect">
          <!--查询-->
          <div id="info-search">
            <div class="select-item">
              <label>时间: </label>
              <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
            </div>
            <div class="select-item">
              <label>单位: </label>
              <Select v-model="company" style="width:228px;height: 35px;">
                <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Checkbox  v-show="showInquisitor">包含下级院</Checkbox>
            </div>
            <div class="select-item" v-show="showInquisitor">
              <label>检察官: </label>
              <Input v-model="inquisitor" placeholder="请输入检察官姓名" style="width:160px;height: 35px;" />
            </div>
            <button class="count-btn">
              <img src="../../../assets/documentShield/search.png" alt="">
              统计
            </button>
          </div>
          <hr/>
          <!--导出-->
          <!--<div id="info-export" v-show="showInquisitor">-->
            <!--<div class="select-item">-->
              <!--<label>检察官: </label>-->
              <!--<Input v-model="inquisitor" placeholder="请输入检察官姓名" style="width:228px;height: 35px;" />-->
            <!--</div>-->
          <!--</div >-->
          <!--<hr v-show="showInquisitor" />-->
        </div>
        <!--main-->
        <div id="count-main">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "countAnalysis",
      data() {
        return {
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
      padding: 28px 22px 39px ;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      #countSelect {
        overflow: hidden;
        #info-search  {
          overflow: hidden;
          .select-item:nth-child(2),
          .select-item:nth-child(3) {
            margin-left: 30px;
          }
        }
        .select-item {
          /*display: inline-block;*/
          float: left;
          &>label:first-child {
            display: inline-block;
            width: 141px;
            height: 44px;
            line-height: 44px;
            text-align: right;
            padding-right: 12px;
            background-color: rgba(243,251,255,1);
            font-family: 'PingFangSC-Regular';
            font-weight: 400;
            color: rgba(85,85,85,1);
          }
          div {
            &>label {
              margin-right: 44px;
            }
          }
        }
        /*按钮*/
        button {
          float: right;
          width: 130px;
          height: 34px;
          border: 1px solid rgba(255, 99, 102, 1);
          border-radius: 6px;
          font-size: 19px;
          font-family: 'PingFangSC-Regular';
          font-weight: 400;
          color: rgba(246,92,95,1);
          background: transparent;
          margin-right: 33px;
          img {
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-top: -3px;
          }
        }
        .count-btn {/*统计按钮*/
          border: 1px solid rgba(17,158,227,1);
          color:rgba(17,158,227,1);
        }
        hr {
          clear: both;
          height:2px;
          background:rgba(239,239,239,1);
          border: none;
          margin-top: 6px;
          margin-bottom: 6px;
        }
      }
      /*菜单*/
      /*#count-menu {*/
        /*float: left;*/
        /*width: 200px;*/
        /*height: calc( 100% - 58px);*/
        /*overflow-y: auto;*/
      /*}*/
      /*main*/
      #count-main {
        /*margin-left: 200px;*/
        height: calc( 100% - 58px);
      }
    }
  }

</style>
