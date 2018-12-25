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
                <DatePicker  @on-change="setDate" type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
              </select-item>
              <select-item>
                <!--<label>单位: </label>-->
                <!--<Select v-model="company" style="width:228px;height: 35px;">-->
                  <!--<Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
                <!--<Checkbox  v-show="showInquisitor">包含下级院</Checkbox>-->
                <select-item v-show="showSelectUnit">
                  <label>单位: </label>
                  <div class="input-wrap">
                    <input v-if="unit=='黄冈市院'?false:true"  readonly  type="text" ref='inputCompany' v-model="keywords"  class="focusCompany" style="width:200px" />
                    <input v-if="unit=='黄冈市院'?true:false"   @blur="blurSelectCompany" type="text" ref='inputCompany' v-model="keywords" @focus="searchNodes"  @input="inputKeywords"  class="focusCompany" style="width:200px" />
                    <my-tree v-if="unit=='黄冈市院'?true:false" :api="'sub'" @selectUnits="selectUnits" v-show="showCompany"></my-tree>
                    <Checkbox :disabled="unit=='黄冈市院'?false:true"  v-model="checkSub" >包含下级院</Checkbox>
                  </div>
                </select-item>

              </select-item>
              <select-item v-show="showInquisitor">
                <label>检察官: </label>
                <Input v-model="inquisitor" placeholder="请输入检察官姓名" style="width:160px;height: 35px;" />
              </select-item>
              <button class="count-btn btn-hover" @click="searchData">
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
          keywords: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位搜素关键字
          resetMenu: false,
          showInquisitor: false,//显示包含下级院
          showCompany: false,//显示单位选择
          showSelectUnit: false,//显示单位选择
          inquisitor: '',//检察官
          checkSub: true,//包含下级
          currNum: "",//菜单被选项
          theme3: 'light',
          dateValue:[this.getStartTime(),this.getCurrentTime()],
          dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
          unit: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
          company: {//单位
            // name: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
            // DWBM: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
          },
          timer: null,
        }
      },
      methods: {
        searchData(){//查询数据
          let config;
          this.getUnitsCode();
          config = {
            dwbm: this.company.DWBM,
            dateValue: this.dateValue,
            bhxj: this.checkSub,
          };
          if(this.showInquisitor) {
            config.cbr = this.inquisitor;
          }
          this.getUnitsCode();
          this.$bus.$emit('countSearch',config)
        },
        setDate(fmtDate) {//设置时间
          fmtDate[0]+=' 00:00:00';
          fmtDate[1]+=' 00:00:00';
          this.dateValue = fmtDate;
        },
        selectUnits(val) {
          this.company = val.company;
          this.keywords = val.company.name;
          this.showCompany = false;
          this.$refs.inputCompany.blur();
        },
        searchNodes(){
          this.showCompany = true;
          this.$bus.$emit('searchUnits',{keywords: this.company.name});
        },
        blurSelectCompany() {
          this.showCompany = false;
        },
        inputKeywords(e){
          let val = (e.target.value).replace(/\s+/g,"");
          let _this = this;
          if(this.timer) {
            clearTimeout(this.timer);
          }
          if(!val) {//空字符串
            return
          }
          this.timer = setTimeout(function(){
            _this.showCompany = true;
            _this.$bus.$emit('searchUnits',{keywords: _this.keywords});
          },200)
        },
        getUnitsCode(){//输入单位，获取单位编码
          if(this.keywords!=this.company.name) {
            let _this = this;
            let units = JSON.parse(localStorage.getItem('units'));
            let dwbm = '';
            units.forEach(function(item){
              if(item.DWMC==_this.keywords){
                dwbm = item.DWBM;
                return
              }
            })
            this.company = {
              name: this.keywords,
              DWBM: dwbm
            }
          }
        },
        select(name) {

        }
      },
      updated(){

      },
      created() {
        var _this = this;
        this.$bus.$on('setInquisitor',function(set) {//设置是否显示检察官输入框
          _this.showInquisitor = set;
        });
        this.$bus.$on('setSelectUnit',function(set) {//设置是否显示单位选择
          _this.showSelectUnit = set;
        });
        this.$bus.$on('loadComplete',function(load){//加载完成
          if(load){
            _this.searchData();
          }
        })
      },
      mounted() {
        this.currNum = this.$route.path.slice(1);
        // this.searchData();
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
        this.$bus.$off('loadComplete');
        this.$bus.$off('countSearch');
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
  .input-wrap {
    position: relative;
    display: inline-block;
    input {
      display: inline-block;
      width: 100%;
      height: 32px;
      line-height: 1.5;
      padding: 4px 7px;
      font-size: 12px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      color: #515a6e;
      background-color: #fff;
      /*background-image: none;*/
      position: relative;
      cursor: text;
      transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
  }
</style>
