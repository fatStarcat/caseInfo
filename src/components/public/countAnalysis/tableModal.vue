<template>
    <div id="tableModal">
        <div id="content">
          <!--标题-->
          <div class="content-header">
            {{title}}
            <span class="close" @click="closeTable">
              <img  src="../../../assets/countAnalysis/close.png" alt="">
            </span>
          </div>
          <!--单位以及文书和案件类别-->
          <div class="content-header">
            {{unit}}{{dataType?'—'+dataType:''}}
          </div>
          <select-group marTop="10">
            <select-item>
              <label>当前类型: </label>
              <RadioGroup v-model="status" @on-change="changeStatus">
                <Radio v-for="item,index in statusData"  :key="index" :label="item"></Radio>
              </RadioGroup>
            </select-item>
          </select-group>
          <hr/>
          <!--表格-->
          <div id="infoTable" ref="table">
            <Table :loading="isLoading" ref="iTable" :height="tableHeight" border stripe :columns="columnsData" :data="infoData" ></Table>
          </div>
          <!--表格分页-->
          <div id="tablePage">
            <Page :page-size="pageSize" :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
            <!--导出数据-->
            <div id="exportData">
              <button class="export-all btn-hover-large" @click="exportDataAll">导出全部数据</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "table-modal",
        data() {
            return {
              tableHeight: '',//表格高度
              status: "",//当前状态
              statusData: [],
              columnsData: [],
              infoData: [],
              isLoading: false,//显示加载
              total: '',//总条数
              pageNum: 1,//页号
              pageSize: 20,//页大小
              /*--传值start--*/
              aLLTotal: {},//所有总量数据
              title: '',//标题
              tableName: '',//表名
              dateValue: '',//时间
              dwbm: '',//单位编码
              gkzt: '',//公开状态,
              nzzt: '',//拟制状态
              bhxj: '',//包含下级
              ajlbbm: '',//案件类别编码
              cbrgh: '',//承办人工号
              bmsah: '',//部门受案号
              unit: '',//单位
              dataType: '',//类型
              wslb: '',//文书类别
              /*--传值end--*/
              tableData: {
                caseInfo: {//区域分析(程序性公开)
                  statusData: ['全部','已公开','本系统已公开统一系统未公开','不公开'],
                  columns: [//表头数据
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
                      title: '案件类别',
                      key: 'AJLB_MC',
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
                      title: '受理时间',
                      key: 'SLRQ',
                      align: 'center',
                      maxWidth: 160
                    },
                    {
                      title: '当前阶段',
                      key: 'AJZT',
                      align: 'center',
                      maxWidth: 100
                    },
                    {
                      title: '完成时间',
                      key: 'WCRQ',
                      align: 'center',
                      maxWidth: 160
                    }
                  ],
                },
                docInfo: {//区域分析(文书公开信息)
                  statusData: ['全部','已公开','应公开','应公开未公开','不公开'],
                  columns: [//表头数据
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
                      title: '案件类别',
                      key: 'AJLB_MC',
                      align: 'center',
                    },
                    {
                      title: '承办单位',
                      key: 'CBDW_MC',
                      align: 'center',
                      minWidth: 100,
                      maxWidth: 220
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
                      title: '办结日期',
                      key: 'SJRQ_BJRQ',
                      align: 'center',
                      maxWidth: 160
                    },
                  ],
                },
              }
            }
        },
      created() {

      },
      mounted() {
        this.initBus();
        this.setTableHeight(this);//设置表格高度
      },
      beforeDestroy(){
          this.$bus.$off('setTable');
      },
      methods: {
        exportDataAll() {//导出数据
          this.$Message.info('导出数据中');
          if(this.tableName === 'caseInfo') {
            this.getCaseList(false,true);
          }else if(this.tableName === 'docInfo') {
            this.getDocList(false,true);
          }
        },
        initBus() {
          var _this = this;
          this.$bus.$on('setTable',function(set) {
            let statusData = [];
            _this.pageNum = 1;
            for(let i in set.total) {
              statusData.push(i);
            }
            _this.tableName = set.tableName;
            //标题
            _this.title = set.title;
            //当前状态
            _this.status = set.type;
            //状态数据
            _this.statusData = statusData;
            //表头数据
            _this.columnsData = [].concat(_this.tableData[set.tableName].columns);
            //请求参数
            _this.dateValue = set.dateValue;
            _this.dwbm = set.dwbm;
            _this.gkzt = set.gkzt?set.gkzt:'';
            _this.nzzt = set.nzzt?set.nzzt:'';
            _this.bhxj = set.bhxj;
            _this.ajlbbm = set.ajlbbm?set.ajlbbm:'';//案件类别编码
            _this.cbrgh = set.cbrgh?set.cbrgh:'';//承办人工号
            _this.bmsah = set.bmsah?set.bmsah:'';//部门受案号
            _this.unit = set.unit?set.unit:'';//承办人工号
            _this.dataType = set.dataType?set.dataType:'';//单位名称
            _this.wslb = set.wslb?set.wslb:'';//文书类别
            _this.aLLTotal = set.total;//总量
            if(_this.title.indexOf('区域分析') > -1) {
              _this.bhxj = false;
            }
            //设置表头
            _this.setColumns1();
            //获取表格数据
            if(_this.tableName==='caseInfo') {//案件
              _this.getCaseList(true);
            }else {//文书
              _this.getDocList(true);
            }
          })
        },
        changePageNum(num) {//改变页码
          this.pageNum = num;
          if(this.tableName==='docInfo') {
            this.getDocList();
          }else {
            this.getCaseList();
          }

        },
        changePageSize(size) {//改变每页条数
          this.pageSize = size;
          if(this.tableName==='docInfo') {
            this.getDocList();
          }else {
            this.getCaseList();
          }
        },
        getCount() {//获取列表信息总数
          for(let i in this.aLLTotal) {
            if(i==this.status) {
              this.total = this.aLLTotal[i];
            }
          }
        },
        /*
    * getCount: 是否获取当前选择条件下的公开信息数量
    * getAll: 是否获取当前选择条件下的全部数据
    * */
        getDocList(getCount,getAll) {//获取文书信息列表
          this.isLoading = true;
          let _this = this;
          if(getCount){//获取总数
            _this.getCount();//获取总条数
          }
          this.pageSize = this.pageSize?this.pageSize:0;
          _this.axios.get(webApi.Stat.GetOpenDocDataList.format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dwbm: _this.dwbm,
            gkzt: _this.gkzt,
            nzzt: _this.nzzt,
            bhxj: _this.bhxj,//包含下级
            wslb: _this.wslb,//案件类别编码
            cbrgh: _this.cbrgh,//承办人工号
            bmsah: _this.bmsah,//部门受案号
            pageNum: _this.pageNum,
            pageSize: getAll?_this.total:_this.pageSize,
          })).then(function(res){
            if(res.data.code==0){
              let data = res.data.data;//表数据
              data.forEach(function(item,index){ //添加序号
                item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
                // 如果bz为空,使用nzzt的值
                if(!item.BZ) {
                  item.BZ = item.NZZT;
                }
              });
              if(getAll){
                if(data.length > 0) {
                  let fileName = _this.title + '-' + _this.dataType + '-'+  _this.getExportTime();
                  setTimeout(function(){
                    _this.exportData(data,_this.columnsData,fileName);//下载全部数据
                  },200)
                }else {
                  _this.$Message.warning('暂无数据可导出');
                }

              }else{
                _this.infoData = data;
              }
            }else if(res.data.code==-1){
              _this.$Message.warning(res.data.errorMessage);
            }
            _this.isLoading = false;
          }).catch(function(err){
            console.log(err);
            _this.isLoading = false;
          })
        },
        /*
    * getCount: 是否获取当前选择条件下的公开信息数量
    * getAll: 是否获取当前选择条件下的全部数据
    * */
        getCaseList(getCount,getAll) {//获取案件信息列表
          this.isLoading = true;
          let _this = this;
          if(getCount){//获取总数
            _this.getCount();//获取总条数
          }
          this.pageSize = this.pageSize?this.pageSize:0;
          _this.axios.get(webApi.Stat.GetOpenCaseDataList.format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dwbm: _this.dwbm,
            gkzt: _this.gkzt,
            bhxj: _this.bhxj,//包含下级
            ajlbbm: _this.ajlbbm,//案件类别编码
            cbrgh: _this.cbrgh,//承办人工号
            bmsah: _this.bmsah,//部门受案号
            pageNum: _this.pageNum,
            pageSize: getAll?_this.total:_this.pageSize,
          })).then(function(res){
            ;
            if(res.data.code==0){
              let data = res.data.data;//表数据
              data.forEach(function(item,index){ //添加序号
                item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
              });
              if(getAll){
                if(data.length > 0) {
                  let fileName = _this.title + '-' + _this.dataType + '-'+  _this.getExportTime();
                  setTimeout(function(){
                    _this.exportData(data,_this.columnsData,fileName);//下载全部数据
                  },200)
                }else {
                  _this.$Message.warning('暂无数据可导出');
                }
              }else{
                _this.infoData = data;
              }
            }else if(res.data.code==-1){
              _this.$Message.warning(res.data.errorMessage);
            }
            _this.isLoading = false;
          }).catch(function(err){
            console.log(err);
            _this.isLoading = false;
          })
        },
        setColumns1() {//设置表头
          if(this.tableName === 'caseInfo') {//案件信息列表
            if(this.gkzt==2) {//本系统已公开统一系统未公开
              this.columnsData.push({
                title: '未公开原因',
                key: 'BZ',
                align: 'center',
              })
            }else if(this.gkzt==4) {//不公开
              this.columnsData.push({
                title: '不公开原因',
                key: 'BZ',
                align: 'center',
              })
            }
          }else {//文书信息列表
            if(this.gkzt==0&&this.nzzt==7) {//应公开未公开
              this.columnsData.push({
                title: '未公开原因',
                key: 'BZ',
                align: 'center',
              })
            }else if(this.gkzt==1) {//不公开
              this.columnsData.push({
                title: '不公开原因',
                key: 'BZ',
                align: 'center',
              })
            }
          }

        },
        changeStatus(status) {//改变状态
          var _this = this;
          let initChangeType = function(){
            let tableName = _this.tableName;
            if(tableName === "caseInfo") {
              caseChangeStatus();
            }else if(tableName === 'docInfo') {
              docChangeStatus();
            }
          };
          let caseChangeStatus = function() {
            switch(status) {
              case '全部':
                _this.gkzt = '';
                break;
              case '已公开':
                _this.gkzt = 3;
                break;
              case '本系统已公开统一系统未公开':
                _this.gkzt = 2;
                break;
              case '不公开':
                _this.gkzt = 4;
                break;
            }
            _this.columnsData = [].concat(_this.tableData[_this.tableName].columns);
            _this.pageNum = 1;
            _this.setColumns1();
            _this.getCaseList(true);
          };
          let docChangeStatus = function() {
            switch(status) {
              case '全部':
                _this.gkzt = '';
                _this.nzzt = '';
                break;
              case '不公开':
                _this.gkzt = 1;
                _this.nzzt = '';
                break;
              case '应公开':
                _this.gkzt = 0;
                _this.nzzt = '';
                break;
              case '已公开':
                _this.gkzt = 0;
                _this.nzzt = 8;
                break;
              case '应公开未公开':
                _this.gkzt = 0;
                _this.nzzt = 7;
                break;
            }
            _this.columnsData = [].concat(_this.tableData[_this.tableName].columns);
            _this.pageNum = 1;
            _this.setColumns1();
            _this.getDocList(true);
          };
          initChangeType();
        },
        closeTable() {//关闭表格
          this.$emit('closeTable');
        }
      },

      watch: {
          title() {
            this.setTableHeight(this);//设置表格高度
          }
      }
    }
</script>

<style scoped lang="scss">
  #tableModal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    padding: 30px;
    #content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: white;
      padding: 30px;
      /*标题*/
      .content-header {
        position: relative;
        font-size: 14px;
        height: 30px;
        color: #999;
        line-height: 30px;
        &:nth-child(2) {
          font-size: 20px;
          color: #333;
        }
        /*关闭*/
        .close {
          position: absolute;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      /*表格*/
      #infoTable {
        margin-top: 20px;
        height: calc(100% - 20px - 30px - 30px - 10px - 35px - 1px - 20px  - 65px);
      }
      /*表格分页*/
      #tablePage {
        position: relative;
        padding-top: 26px;
        height: 65px;
        #exportData {
          position: absolute;
          right: 0;
          top: 50%;
          /*transform: translate(0,-50%);*/
        }
      }
    }
    z-index: 999;
  }
</style>
