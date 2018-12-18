<template>
  <div id="messagePush">
    <div id="messageContent">
      <!--条件选择区-->
      <select-group>
        <select-item>
          <label>部门受案号: </label>
          <Input v-model="caseId" placeholder="请输入部门受案号" style="width:228px;height: 35px;" />
        </select-item>
        <select-item>
          <label>案件名称: </label>
          <Input v-model="caseName" placeholder="请输入案件名称" style="width:228px;height: 35px;" />
        </select-item>
        <select-item>
          <label>发送时间: </label>
          <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
        </select-item>
        <button class="search-btn btn-hover">
          查询
        </button>
      </select-group>
       <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table :height="tableHeight" border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div id="exportData">
          <button class="export-page btn-tabDefault-large" @click="exportData">导出本页数据</button>
          <button class="export-all btn-export-large">导出全部数据</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ExportJsonExcel from 'js-export-excel' //导出excel
  export default {
    data() {
      return {
        total: 0,//总条数
        dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        tableHeight: '',//表格高度
        caseId: '蕲检刑申受[2018]42112600001',//部门受案号
        caseName: '王晓能刑事申诉案',//案件名称
        columns1: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            minWidth: 80
          },
          {
            title: '部门受案号',
            key: 'caseId',
            align: 'center',
            minWidth: 200
          },
          {
            title: '案件名称',
            key: 'caseName',
            align: 'center',
            minWidth: 200
          },
          {
            title: '日期',
            key: 'dateTime',
            align: 'center',
            minWidth: 100
          },
          {
            title: '接收人',
            key: 'people',
            align: 'center',
            minWidth: 100
          },
          {
            title: '信息内容',
            key: 'content',
            align: 'center',
            minWidth: 470
          },
        ],
        infoData: []//表格数据
      }
    },
    methods: {
      exportData() {//导出本页数据

      },
    },
    created() {
      this.infoData = jsonData.messagePush;
      this.total = this.infoData.length;
    },

    mounted() {
      this.setTableHeight(this);//设置表格高度
    }
  }
</script>

<style scoped lang="scss">
  #messagePush {
    width: 100%;
    height: 100%;
    padding: 35px;
    #messageContent {/*内容区*/
      width: 100%;
      height: 100%;
      padding: 30px ;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      overflow-y: auto;
      //表格
      #infoTable {
        margin-top: 20px;
        height: calc(100% - 20px - 35px - 1px - 20px  - 60px - 65px);
      }
      /*表格分页*/
      #tablePage {
        position: relative;
        margin-top: 41px;
        padding-top: 16px;
        height: 65px;
        /*导出数据按钮*/
        #exportData {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(0, -50%);
          button {
            margin-left: 37px;
          }
        }
      }
    }
  }
</style>
