<template>
  <div id="docShield">
    <div id="docContent">
      <!--条件选择区-->
      <div class="select-item">
        <select-item>
          <label>时间: </label>
          <DatePicker type="daterange" split-panels placeholder="请选择时间" @on-change="setDate" v-model="dateTime" style="width: 200px"></DatePicker>

        </select-item>
        <!--<select-item>-->
          <!--<label>单位: </label>-->
          <!--<Input   readonly type="text"  v-model="company.name"   style="width:200px" />-->
        <!--</select-item>-->
        <select-item>
          <label>文书类型: </label>
          <Select v-model="wslb" style="width:200px">
            <Option v-for="item in docType" :value="item" :key="item">{{ item}}</Option>
          </Select>
          <button class="search-btn btn-hover" @click="searchData">
            查询
          </button>
        </select-item>
      </div>
      <div class="select-item">
        <select-item>
          <label>当前阶段: </label>
          <RadioGroup v-model="status" @on-change="setNzzt">
            <Radio label="全部"></Radio>
            <Radio label="待拟制"></Radio>
            <Radio label="已拟制待审核"></Radio>
            <Radio label="案管审核退回"></Radio>
            <Radio label="审核通过"></Radio>
          </RadioGroup>
        </select-item>
      </div>
      <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table ref="iTable" :loading="isLoading" :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div class="exportData" v-show="showBtnNum===0">
          <button class="export-page btn-tabDefault-large" @click="exportAllData(infoData)">导出本页数据</button>
          <button class="export-all btn-export-large" @click="getDocList(false,true)">导出全部数据</button>
        </div>
        <div class="exportData" v-show="showBtnNum===1">
          <button class="export-all btn-export-large">批量拟制</button>
        </div>
        <div class="exportData" v-show="showBtnNum===2">
          <button class="export-all btn-export-large">批量导出</button>
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
        token: localStorage.getItem('token'),
        tableHeight: '',//表格高度
        dateValue:[this.getStartTime(),this.getCurrentTime()],
        dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
        pageNum: 1,//页号
        pageSize: 10,//页大小
        nzzt: '',//拟制状态
        status: "全部",//当前阶段
        wslb: '全部',//文书类别
        total: 0,//总条数
        isLoading: false,//表格加载
        docType: JSON.parse(localStorage.getItem('WSLX')),//文书类型
        showBtnNum: 0,//显示按钮 {0:全部(导出本页,导出全部),1:未拟制(批量拟制),2:审核通过待导出(批量导出)}
        originalData: [],//列表原始数据
        company: {//单位
          name: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
          DWBM: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
        },
        columns1: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '部门受案号',
            key: 'BMSAH',
            align: 'center',
          },
          {
            title: '案件名称',
            key: 'AJMC',
            align: 'center',
          },
          {
            title: '承办单位',
            key: 'CBDW_MC',
            align: 'center',
          },
          {
            title: '承办部门',
            key: 'CBBM_MC',
            align: 'center',
          },
          {
            title: '承办人',
            key: 'CBR',
            align: 'center',
            maxWidth: 100
          },
          {
            title: '文书名称',
            key: 'WSMC',
            align: 'center',
          },
          {
            title: '文书类别',
            key: 'WSLB',
            align: 'center',
          },
          {
            title: '当前阶段',
            key: 'NZZT',
            align: 'center',
            maxWidth: 100
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
              let _this = this;
              if(params.row.NZZT=='案管审核退回'){
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
                        let arr = [params.row]
                        console.log("修订",arr);
                        invoker.createWS(_this.token,arr);
                        // this.$router.push({path:'/revise',query:{title:params.row.docName}});
                      }
                    }
                  }, '修订')
                ]);
              }else if(params.row.NZZT=='待拟制'){
                let _this = this;
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
                        let arr = [params.row];
                        arr = this.originalData[params.index];
                        console.log("拟制",arr);
                        invoker.createWS(_this.token, arr);
                        // this.$router.push({path:'/drafting',query:{title:params.row.docName}});
                      }
                    }
                  }, '拟制'),
                ]);
              }else if(params.row.NZZT=='审核通过') {
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
                  // h('span', {
                  //   style: {
                  //     cursor: 'pointer',
                  //     color: '#3B7AFF',
                  //   },
                  //   props: {
                  //     size: 'small'
                  //   },
                  //   on: {
                  //     click: () => {
                  //       console.log("导出")
                  //     }
                  //   }
                  // }, '导出')
                ]);
              }else if(params.row.NZZT=='已拟制待审核') {
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

        ],
      }
    },
    methods: {
      exportAllData(data) {//导出本页数据
       if(data.length > 0) {
         let fileName = '文书屏蔽' + '-'+  this.getExportTime();
         let _this = this;
         this.$Message.info('导出数据中');
         setTimeout(function(){
           _this.exportData(data,_this.columns1,fileName);//导出数据
         },200)
       }else {
         this.$Message.warning('暂无数据可导出');
       }
      },
      setNzzt() {//通过当前阶段状态设置nzzt
        if(this.status=='全部') {
          this.nzzt = '';
        }else if(this.status=='待拟制') {
          this.nzzt = 1;
          this.showBtnNum = 1;
        }if(this.status=='已拟制待审核') {
          this.nzzt = 2;
        }if(this.status=='案管审核退回') {
          this.nzzt = 4;
        }if(this.status=='审核通过') {
          this.nzzt = 8;
        }
        this.showBtnNum = 0;
      },
      setDate(fmtDate) {//设置时间
        if(fmtDate){
          fmtDate[0]+=' 00:00:00';
          fmtDate[1]+=' 00:00:00';
          this.dateValue = fmtDate;
        }
      },
      searchData(){
        this.pageNum = 1;
        this.getDocList(true);
      },
      changePageNum(num) {//改变页码
        this.pageNum = num;
        this.getDocList();
      },
      changePageSize(size) {//改变每页条数
        this.pageSize = size;
        this.getDocList();
      },
      /*
      * getCount: 是否获取当前选择条件下的公开信息数量
      * getAll: 是否获取当前选择条件下的全部数据
      * */
      getDocList(getCount,getAll){//获取文书列表
        let _this = this;
        this.isLoading = true;
        if(getCount){//获取总数
          _this.getCount();//获取总条数
        }
        if(getAll) {
          this.$Message.info('获取数据中');
        }
        this.axios.get(webApi.WSPB.CBR_GetWSSLs.format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          nzzt: _this.nzzt,//拟制状态(拟制状态 1:待拟制 2:已拟制待审核 4:案管审核退回 8:审核通过;支持位域)
          wslb: _this.wslb=='全部'?'':_this.wslb,//文书类型
          pageNum: _this.pageNum,
          pageSize: getAll?_this.total:_this.pageSize,
        })).then(async function(res){
          ;
          if(res.data.code==0){
            let data = res.data.data;//表数据
            data.forEach(function(item,index){ //添加序号
              item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
            });
            if(data.length>0) {
              _this.originalData = [].concat(data);
              _this.getExamineList(data,getAll);//获取审核内容
            }else {
              _this.infoData = data;
              _this.isLoading = false;
            }
          }
        }).catch(function(err){
          console.log(err);
          _this.isLoading = false;
        })
      },
      getCount() {//获取文书数量
        let _this = this;
        this.setNzzt();
        this.axios.get(webApi.WSPB.CBR_CountWSSL.format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          nzzt: _this.nzzt,//拟制状态(拟制状态 1:待拟制 2:已拟制待审核 4:案管审核退回 8:审核通过;支持位域)
          wslb: _this.wslb=='全部'?'':_this.wslb,//文书类型
        })).then(function(res){

          if(res.data.code==0){
            _this.total = res.data.data;
          }
        }).catch(function(err){
          console.log(err)
        })
      },
      /*
      * data: 获取的列表信息数据
      * getAll: 是否获取当前选择条件下的全部信息
      * */
      getExamineList(data,getAll) {//获取审核批复列表
        let _this = this;
        let count = 0;
        _this.isLoading = true;
        data.forEach(function(item,i){
          _this.isLoading = true;
          _this.axios.get(webApi.WSPB.GetWSSHJGs.format({
            bmsah: item.BMSAH,
            dwbm: item.DWBM,
            wsbh: item.WSBH
          })).then(function(res){
            if(res.data.code==0){
              item.examine = res.data.data[0];
              count++;
            }
            if(count==data.length) {
              if(getAll){
                if(data.length > 0) {
                  _this.exportAllData(data);//下载全部数据
                }else {
                  _this.$Message.warning('暂无数据可导出');
                }
              }else{
                _this.infoData = data;
              }
              _this.isLoading = false;
            }
          }).catch(function(err){
            console.log(err)
            _this.isLoading = false;
          })
        })
      },
    },
    created() {
      this.docType.unshift("全部");//文书类型添加全部选项
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.getDocList(true);
    }
  }
</script>

<style scoped lang="scss">
  #docShield {
    width: 100%;
    height: 100%;
    padding: 35px;
    #docContent {/*内容区*/
      position: relative;
      width: 100%;
      height: 100%;
      padding: 30px;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      overflow-y: auto;
      /*条件选择*/
      .select-item {
        +.select-item {
          margin-top: 10px;
        }
      }
      //表格
      #infoTable {
        margin-top: 20px;
        height: calc(100% - 20px - 40px - 40px - 1px - 60px - 66px);
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
