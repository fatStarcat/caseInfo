<template>
    <div id="infoExport">
      <div id="infoContent">
        <!--条件选择区-->
        <select-group>
          <select-item>
            <label>单位: </label>
            <Select v-model="company" style="width:228px;height: 35px;">
              <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </select-item>
          <select-item>
            <label>时间: </label>
            <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
          </select-item>
          <button class="search-btn btn-hover">
            查询
          </button>
        </select-group>
        <select-group mar-top="20">
          <select-item>
            <label>当前阶段: </label>
            <RadioGroup v-model="exportStatus" @on-change="changeStatus">
              <Radio label="全部"></Radio>
              <Radio label="待导出"></Radio>
              <Radio label="已导出"></Radio>
            </RadioGroup>
          </select-item>
          <select-item>
            <label>导出内容: </label>
            <CheckboxGroup v-model="exportContent" style="display: inline-block">
              <Checkbox label="案件信息"></Checkbox>
              <Checkbox label="法律文书"></Checkbox>
            </CheckboxGroup>
          </select-item>
          <button class="export-btn btn-hover-export" >
            导出
          </button>
        </select-group>
        <hr/>
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
      padding: 30px;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      overflow-y: auto;
      #checkTable {//切换表格
        margin-top: 10px;
        height: 41px;
        input {
          display: none;
        }
        label {
          display: inline-block;
          position: relative;
          float: left;
          width: 140px;
          height: 40px;
          line-height: 40px;
          background: transparent;
          text-align: center;
          font-size:18px;
          font-family:'PingFang-SC-Medium';
          font-weight: 500;
          color: rgba(69,137,253,1);
          box-shadow: 0 3px 3px rgba(69,137,253,.2);
          border: 1px solid rgba(69,137,253,1);
          cursor: pointer;
          text-shadow: 0 3px 2px rgba(69,137,253,.5);
        }
        .doc-radio {//法律文书
          border-radius: 0 20px 20px 0;
        }
        .caseInfo-radio {
          border-radius: 20px 0 0 20px;
        }
        #caseInfoRadio:checked + .caseInfo-radio,
        #docRadio:checked + .doc-radio{
          color: #FFFFFF;
          background: #4589FD;
          box-shadow: 0 3px 3px rgba(69,137,253,.6);
        }
      }
      //表格
      #infoTable {
        margin-top: 20px;
        height: calc(100% - 20px - 35px - 35px - 20px - 1px - 20px - 10px -  60px - 65px);
      }
      /*表格分页*/
      #tablePage {
        padding-top: 16px;
        height: 65px;
      }
    }
  }
</style>
