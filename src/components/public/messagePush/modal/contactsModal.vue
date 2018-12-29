<template>
  <div class="modal-wrap">
    <div class="main-modal">
      <div class="modal-content">
        <!--标题-->
        <div class="main-modal-title">
          联系人
        </div>
        <!--搜索输入-->
        <div class="main-modal-input">
          <Input v-model="keywords" placeholder="请输入姓名或者手机" />
        </div>
        <!--内容-->
        <div class="modal-contacts-list">
          <Tabs value="name1">
            <TabPane label="单位群组" name="name1">
              <CheckboxGroup v-model="unitsGroupVal">
                <Checkbox v-for="item,index in unitsGroup" :label="item"></Checkbox>
              </CheckboxGroup>
            </TabPane>
            <TabPane label="辩护与代理" name="name2">辩护与代理</TabPane>
            <TabPane label="其他群组" name="name3">其他群组</TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Tab,TabPane,Input,CheckboxGroup,Checkbox} from 'iview';
  export default {
    props: ['info','modalTitle'],
    components: {TabPane,Tab,Input,CheckboxGroup,Checkbox},
    data() {
      return {
        keywords:'',//关键字
        unitsGroupVal: [],//
        unitsGroup:[//单位群组数据
          '张三（13546897694）'
        ],
        defenseAndAgent: [],//辩护与代理
        otherGroup: []//其他群组
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
