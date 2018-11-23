<template>
  <div id="caseNotOpen">
    <div id="caseContent">
      <my-bread :breadData="breadData"></my-bread>
      <!--条件选择区-->
      <select-group mar-top="30">
        <select-item>
          <label>时间: </label>
          <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
        </select-item>
        <select-item>
          <label>单位: </label>
          <Select v-model="company" style="width:228px;height: 35px;">
            <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </select-item>
        <select-item>
          <label>案件类型: </label>
          <Select v-model="status" style="width:200px">
            <Option v-for="item in caseType" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </select-item>
        <button class="search-btn btn-hover">
          查询
        </button>
      </select-group>
      <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table  :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div id="exportData">
          <button class="export-page btn-tabDefault-large">导出本页数据</button>
          <button class="export-all btn-export-large">导出全部数据</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        breadData: ['实时提醒','不公开(程序信息公开信息)'],
        tableHeight: '',//表格高度
        dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        status: "全部",//当前案件类型
        total: '',//总条数
        caseType: [
          '全部',
          '审查逮捕案件',
          '一审公诉案件',
          '二审上诉案件',
          '二审抗诉案件',
          '对民事、行政生效判决、裁定、调解书的监督案件',
          '刑事申诉审查案件',
          '刑事赔偿案件',
          '生效刑事赔偿决定执行案件',
          '刑事赔偿复议案件',
          '刑事赔偿及民事行政诉讼赔偿监督案件',
          '行政赔偿监督案件',
          '国家司法救助案件',
          '行政公益诉讼一审案件',
          '民事公益诉讼一审案件',
          '行政公益诉讼二审上案件',
          '民事公益诉讼二审上案件',
          '行政公益诉讼二审支上案件',
          '民事公益诉讼二审支上案件',
          '民事公益诉讼重（再）审案件',
          '行政公益诉讼重（再）审案件'
        ],//案件类型
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
        columns1: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
          },
          {
            title: '部门受案号',
            key: 'caseId',
            align: 'center',
          },
          {
            title: '案件名称',
            key: 'caseName',
            align: 'center',
          },
          {
            title: '案件类别',
            key: 'caseType',
            align: 'center',
          },
          {
            title: '承办单位',
            key: 'company',
            align: 'center',
          },
          {
            title: '承办部门',
            key: 'department',
            align: 'center',
          },
          {
            title: '承办人',
            key: 'people',
            align: 'center',
          },
          {
            title: '受理时间',
            key: 'handleTime',
            align: 'center',
          },
          {
            title: '当前阶段',
            key: 'status',
            align: 'center',
          },
          {
            title: '完成时间',
            key: 'completeTime',
            align: 'center',
          },
          {
            title: '不公开原因',
            key: 'reason',
            align: 'center',
          }
        ],
        infoData: []//表格数据
      }
    },
    methods: {
    },
    created() {
      this.infoData = jsonData.caseNotOpen;
      this.total = this.infoData.length;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
    }
  }
</script>

<style scoped lang="scss">
  #caseNotOpen {
    width: 100%;
    height: 100%;
    padding: 35px;
    #caseContent {/*内容区*/
      position: relative;
      width: 100%;
      height: 100%;
      padding: 30px;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      overflow-y: auto;
      //表格
      #infoTable {
        margin-top: 20px;
        height: calc(100% - 20px - 24px - 35px - 30px - 1px - 20px - 60px - 65px);
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
