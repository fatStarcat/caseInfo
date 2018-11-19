<template>
  <div id="docShield">
    <div id="docContent">
      <!--条件选择区-->
      <div id="messageSelect">
        <!--查询-->
        <div id="info-search">
          <div class="select-item">
            <label>时间: </label>
            <DatePicker type="daterange" split-panels placeholder="请选择时间" :value="dateTime" style="width: 200px"></DatePicker>
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
            <label>当前阶段: </label>
            <RadioGroup v-model="status" @on-change="changeStatus">
              <Radio label="全部"></Radio>
              <Radio label="未拟制文书(公开版)"></Radio>
              <Radio label="审核退回"></Radio>
              <Radio label="审核通过待导出"></Radio>
              <Radio label="审核通过已导出"></Radio>
            </RadioGroup>
          </div>
        </div>
        <hr/>
      </div>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table :loading="loading" :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div class="exportData" v-show="showBtnNum===0">
          <button class="export-page">导出本页数据</button>
          <button class="export-all">导出全部数据</button>
        </div>
        <div class="exportData" v-show="showBtnNum===1">
          <button class="export-all">批量拟制</button>
        </div>
        <div class="exportData" v-show="showBtnNum===2">
          <button class="export-all">批量导出</button>
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
        status: "全部",//当前时间段文书状态
        total: 0,//总条数
        loading: true,//表格加载
        showBtnNum: 0,//显示按钮 {0:全部(导出本页,导出全部),1:未拟制(批量拟制),2:审核通过待导出(批量导出)}
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
          {
            title: '审核批复',
            key: 'examine',
            align: 'center',
          },
          {
            title: '操作',
            key: 'operation',
            align: 'center',
            render: (h, params) => {
              if(params.row.status=='审核退回'){
                return h('div', [
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#3B7AFF',
                    },
                    on: {
                      click: () => {
                        this.$router.push({path:'/revise',query:{title:params.row.docName}});
                      }
                    }
                  }, '修订')
                ]);
              }else if(params.row.status=='未拟制'){
                return h('div', [
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#3B7AFF',
                    },
                    on: {
                      click: () => {
                        console.log("拟制");
                        this.$router.push({path:'/drafting',query:{title:params.row.docName}});
                      }
                    }
                  }, '拟制'),
                ]);
              }else if(params.row.status=='审核通过待导出') {
                return h('div', [
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#3B7AFF',
                    },
                    on: {
                      click: () => {
                        console.log("查看");
                        this.$router.push({path:'/look',query:{title:params.row.docName}});
                      }
                    }
                  }, '查看'),
                  h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#3B7AFF',
                    },
                    props: {
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        console.log("导出")
                      }
                    }
                  }, '导出')
                ]);
              }else if(params.row.status=='待审核'||params.row.status=='审核通过已导出') {
                return h('div', [
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      marginRight: '5px',
                      cursor: 'pointer',
                      color: '#3B7AFF',
                    },
                    on: {
                      click: () => {
                        this.$router.push({path:'/look',query:{title:params.row.docName}});
                      }
                    }
                  }, '查看')
                ]);
              }

            }
          }
        ],
        infoData: [//表格数据
        ],
        allData: [//表格所有数据

        ]
      }
    },
    methods: {
      changeStatus(status) {//改变状态
        let data = [];//数据
        this.loading = true;
        if(this.columns1[0].type=='selection') {
          this.columns1.shift();
        }
        if(status=='全部') {
          this.infoData = this.allData;
          this.total = this.infoData.length;
          this.loading = false;
          this.showBtnNum = 0;
          return
        }else if(status=='未拟制文书(公开版)') {
          data = this.filterData('未拟制');
          this.columns1.unshift({
            type: 'selection',
            width: 60,
            align: 'center'
          });
          this.showBtnNum = 1;
        }else if(status=='审核退回') { //退回数据
          data = this.filterData('审核退回');
          this.showBtnNum = '';
        }else if(status=='审核通过待导出') {//审核通过待导出
          data = this.filterData('审核通过待导出');
          this.showBtnNum = 2;
          this.columns1.unshift({
            type: 'selection',
            width: 60,
            align: 'center'
          });
        }else if(status=='审核通过已导出') {//审核通过已导出
          data = this.filterData('审核通过已导出');
          this.showBtnNum = '';
          this.columns1.shift();
        }
        this.infoData = data;
        this.total = this.infoData.length;
        this.loading = false;
      },
      filterData(condition) {//过滤表格数据
        let _this = this;
        let data = [];//数据
        let num = 0;//计算order
        let val = null;//一组数据
        for(let i = 0,len = this.allData.length; i < len;i++) {
          if(_this.allData[i].status==condition) {
            val = Object.assign({},_this.allData[i]);
            num+=1;
            val.order = num;
            data.push(val);
          }
        }
        return data
      }
    },
    created() {
      this.allData =  this.infoData = jsonData.docShield.infoData;
      this.total = this.infoData.length;
      this.loading = false;
      // let option = {
      //   type: 'get',
      //   // href: '../../../../static/json/docShield/table.json',
      //   href: './static/json/docShield/table.json',
      //   async: true,
      //   callback: function(val){
      //     _this.allData =  _this.infoData = val.infoData;
      //     _this.total = _this.infoData.length;
      //     _this.loading = false;
      //   }
      // };
      // myAjax(option);
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
    }
  }
</script>

<style scoped lang="scss">
  #docShield {
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
        .exportData {
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
