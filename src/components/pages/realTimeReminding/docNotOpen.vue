<template>
  <div id="docNotOpen">
    <div id="docContent">
      <!--条件选择区-->
      <div id="messageSelect">
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
          </div>
          <button class="search-btn">
            <img src="../../../assets/documentShield/search.png" alt="">
            查询
          </button>
        </div>
        <hr/>
        <!--导出-->
        <div id="info-export">
          <div class="select-item">
            <label>文书类别: </label>
            <Select v-model="status" style="width:200px">
              <Option v-for="item in docType" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </div>
        </div>
        <hr/>
      </div>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table  :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div id="exportData">
          <button class="export-page">导出本页数据</button>
          <button class="export-all">导出全部数据</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableHeight: '',//表格高度
        dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        status: "全部",//当前文书类别
        total: '',//总条数
        docType: [
          '全部',
          '《起诉书（自然人犯罪案件适用）》',
          '《起诉书（单位犯罪适用）》',
          '《刑事抗诉书（二审程序适用）》',
          '《不起诉决定书（法定不起诉适用）》',
          '《不起诉决定书（相对不起诉适用）》',
          '《不起诉决定书（存疑不起诉适用）》',
          '《刑事申诉复查决定书》'
        ],
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
            title: '文书名称',
            key: 'docName',
            align: 'center',
          },
          {
            title: '文书类别',
            key: 'caseType',
            align: 'center',
          },
          {
            title: '判决生效日期/办结日期',
            key: 'time',
            align: 'center',
          },
          {
            title: '不公开原因',
            key: 'reason',
            align: 'center',
          }
        ],
        infoData: [
        ]//表格数据
      }
    },
    methods: {
    },
    created() {
      this.infoData = jsonData.docNotOpen;
      this.total = this.infoData.length;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
    }
  }
</script>

<style scoped lang="scss">
  #docNotOpen {
    width: 100%;
    height: 100%;
    padding: 35px;
    #docContent {/*内容区*/
      width: 100%;
      height: 100%;
      padding: 28px 22px 39px ;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      /*条件选择*/
      #messageSelect {
        overflow: hidden;
        #info-search  {
          overflow: hidden;
          .select-item:nth-child(2) {
            margin-left: 130px;
          }
        }
        #info-export  {
          overflow: hidden;
          .select-item:nth-child(2) {
            margin-left: 69px;
          }
        }
        .select-item {
          /*display: inline-block;*/
          float: left;
          &>label {
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
          margin-right: 93px;
          img {
            width: 22px;
            height: 22px;
            vertical-align: middle;
            margin-top: -3px;
          }
        }
        .search-btn {/*查询按钮*/
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
      //表格
      #infoTable {
        margin-top: 27px;
        height: calc(100% - 27px - 41px - 106px - 65px);
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
          right: 59px;
          transform: translate(0, -50%);
          button {
            width:150px;
            height:39px;
            background:-webkit-linear-gradient(bottom,rgba(44,101,255,1) 0%,rgba(78,149,255,1) 100%);
            border-radius:10px;
            font-size:18px;
            font-family:'PingFangSC-Regular';
            font-weight:400;
            color:rgba(254,254,254,1);
            line-height:39px;
            border: none;
            margin-left: 37px;
          }
          .export-page {//导出本页数据按钮

          }
          .export-all {//导出全部数据按钮
            background:-webkit-linear-gradient(bottom,rgba(45,172,244,1) 0%,rgba(70,189,255,1) 100%);
          }
        }
      }
    }
  }
</style>
