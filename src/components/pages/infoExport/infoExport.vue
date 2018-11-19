<template>
    <div id="infoExport">
      <div id="infoContent">
        <!--条件选择区-->
        <div id="infoSelect">
          <!--查询-->
          <div id="info-search">
            <div class="select-item">
              <label>单位: </label>
              <Select v-model="company" style="width:228px;height: 35px;">
                <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="select-item">
              <label>时间: </label>
              <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
            </div>
            <button class="search-btn">
              <img src="../../../assets/infoExport/search.png" alt="">
              查询
            </button>
          </div>
          <hr/>
          <!--导出-->
          <div id="info-export">
            <div class="select-item">
              <label>当前阶段: </label>
              <RadioGroup v-model="exportStatus" @on-change="changeStatus">
                <Radio label="全部"></Radio>
                <Radio label="待导出"></Radio>
                <Radio label="已导出"></Radio>
              </RadioGroup>
            </div>
            <div class="select-item">
              <label>导出内容: </label>
              <CheckboxGroup v-model="exportContent" style="display: inline-block">
                <Checkbox label="案件信息"></Checkbox>
                <Checkbox label="法律文书"></Checkbox>
              </CheckboxGroup>
            </div>
            <button class="export-btn">
              <img src="../../../assets/infoExport/export.png" alt="">
              导出
            </button>
          </div>
          <hr/>
        </div>
        <!--切换表格-->
        <div id="checkTable">
          <input checked @click="toggleTable($event,'case')" type="radio" id="caseInfoRadio" name="toggleTable">
          <label for="caseInfoRadio" class="caseInfo-radio">
            案件信息

          </label>
          <input @click="toggleTable($event,'doc')" type="radio" id="docRadio" name="toggleTable">
          <label for="docRadio" class="doc-radio">
            法律文书
          </label>
        </div>
        <!--表格-->
        <div id="infoTable" ref="table">
          <Table :height="tableHeight" border stripe :columns="columns1" :data="infoData" ></Table>
        </div>
        <!--表格分页-->
        <div id="tablePage">
          <Page :total="total" show-sizer show-total show-elevator />
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "info-export",
        data() {
          return {
            dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
            tableHeight: '',//表格高度
            total: 0,//数据总数
            company: '黄冈市院',//单位
            tableType: '',//表格类型
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
            exportStatus: "全部",//导出状态
            exportContent: ['案件信息','法律文书'],//导出内容
            columsData: {
              caseInfo: [//案件信息表头
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
                  title: '受理日期',
                  key: 'dateTime',
                  align: 'center',
                },
                {
                  title: '当前阶段',
                  key: 'status',
                  align: 'center',
                },
              ],
              docInfo: [//法律文书表头
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
                  key: 'docType',
                  align: 'center',
                },
                {
                  title: '当前阶段',
                  key: 'status',
                  align: 'center',
                },
              ]
            },
            columns1: [],//表头信息
            infoData: [],//数据信息
            infoDatas: {}
          }
        },
      created() {
          this.infoDatas = jsonData.infoExport;
      },
      mounted() {
        this.setTableHeight(this);//设置表格高度
        this.initTable();//设置初始表格数据
      },
      methods: {
        changeStatus(status) {//改变状态
          let data = [];//改变后的数据
          if(status=='全部') {
            let dataName = '';//数据名
            this.tableType=='doc'?dataName='docInfo':dataName='caseInfo';
            this.infoData = this.infoDatas[dataName];
            this.total = this.infoData.length;
            return;
          }else {
            data = this.filterData(status);
          }
          this.infoData = data;
          this.total = this.infoData.length;
        },
        filterData(condition) {//过滤表格数据
          let _this = this;
          let data = [];//数据
          let num = 0;//计算order
          let val = null;//一组数据
          let dataName = '';//数据名
          this.tableType=='doc'?dataName='docInfo':dataName='caseInfo';
          for(let i = 0,len = this.infoDatas[dataName].length; i < len;i++) {
            if(_this.infoDatas[dataName][i].status==condition) {
              val = Object.assign({},_this.infoDatas[dataName][i]);
              num+=1;
              val.order = num;
              data.push(val);
            }
          }
          return data
        },
        toggleTable(e,type){//切换表格
          if(e.target.checked) {
            this.tableType = type;
            this.exportStatus = '全部';
            if(type == 'doc') {//法律文书
              this.columns1 = this.columsData.docInfo;
              this.infoData = this.infoDatas.docInfo;
              this.total = 2;
            }else {//案件信息
              this.columns1 = this.columsData.caseInfo;
              this.infoData = this.infoDatas.caseInfo;
              this.total = 3;
            }
          }
        },
        initTable() {//初始化表格
          this.columns1 = this.columsData.caseInfo;
          this.infoData = this.infoDatas.caseInfo;
          this.total = this.infoData.length;
        }
      }
    }
</script>

<style scoped lang="scss">
  #infoExport {
    width: 100%;
    height: 100%;
    padding: 35px;
    #infoContent {/*内容区*/
      width: 100%;
      height: 100%;
      padding: 28px 22px 39px ;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      /*条件选择*/
      #infoSelect {
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
            vertical-align: middle;
            margin-top: -3px;
            width: 22px;
            height: 22px;
          }
        }
        .search-btn {/*查询按钮*/
        }
        .export-btn {/*导出按钮*/
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
      #checkTable {//切换表格
        margin-top: -6px;
        height: 41px;
        input {
          display: none;
        }
        label {
          display: inline-block;
          position: relative;
          float: left;
          width:152px;
          height:41px;
          background:-webkit-linear-gradient(bottom,rgba(36,160,253,1) 0%,rgba(44,172,241,1) 100%);
          border-radius:10px;
          font-size: 18px;
          font-family:  'PingFangSC-Regular';
          font-weight: 400;
          color: rgba(254,254,254,1);
          line-height: 41px;
          text-align: center;
          border: none;
          cursor: pointer;
        }
        .doc-radio {//法律文书
          margin-left: -15px;
          background:-webkit-linear-gradient(0deg,rgba(249,142,26,1) 0%,rgba(247,164,28,1) 100%);
        }
        #caseInfoRadio:checked + .caseInfo-radio {//案件信息
          z-index: 1;
          box-shadow:0 6px 9px 0 rgba(10,41,95,0.29);
        }
        #docRadio:checked + .doc-radio{
          z-index: 1;
          box-shadow: 0 6px 8px 1px rgba(199,117,20,0.29);
        }
      }
      //表格
      #infoTable {
        margin-top: 27px;
        height: calc(100% - 27px - 41px - 106px - 65px);
      }
      /*表格分页*/
      #tablePage {
        padding-top: 16px;
        height: 65px;
      }
    }
  }
</style>
