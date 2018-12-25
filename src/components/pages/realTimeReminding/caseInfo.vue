<template>
  <div id="caseInfo">
    <div id="caseContent">
      <my-bread :bread-data="breadData"></my-bread>
      <!--条件选择区-->
      <select-group mar-top="30">
        <select-item>
          <label>受理时间: </label>
          <DatePicker  @on-change="setDate" :value="dateTime" type="daterange" split-panels placeholder="请选择时间"  style="width: 200px"></DatePicker>
        </select-item>
        <!--<select-item>-->
          <!--<label>单位: </label>-->
          <!--<div class="input-wrap">-->
            <!--<Input   readonly type="text"  v-model="company.name"   style="width:200px" />-->
          <!--</div>-->
          <!--&lt;!&ndash;<div   v-if="showCheck" class="input-wrap">&ndash;&gt;-->
            <!--&lt;!&ndash;<input    @blur="blurSelectCompany" type="text" ref="inputCompany" v-model="company.name"  @focus="searchNodes" @keyup.enter="searchNodes"  class="focusCompany" style="width:200px" />&ndash;&gt;-->
            <!--&lt;!&ndash;<my-tree :api="'sub'" @selectUnits="selectUnits" v-show="showCompany"></my-tree>&ndash;&gt;-->
            <!--&lt;!&ndash;<Checkbox  v-model="checkSub" >包含下级院</Checkbox>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</select-item>-->
        <select-item>
          <label>案件类型: </label>
          <Select v-model="status" style="width:200px">
            <Option v-for="item in caseType" :value="item.MC" :key="item.MC">{{ item.MC }}</Option>
          </Select>
        </select-item>
        <button class="search-btn btn-hover" @click="searchData">
          查询
        </button>
      </select-group>
      <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table  ref="iTable" :loading="isLoading"  :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
        <!--导出数据-->
        <div id="exportData">
          <button class="export-page btn-tabDefault-large" @click="exportAllData(infoData)">导出本页数据</button>
          <button class="export-all btn-export-large" @click="getCaseList(false,true)">导出全部数据</button>
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
        showCheck: JSON.parse(localStorage.getItem('userInfo')).JS=='案管人员'?true:false,//显示包含下级院选择(案管人员可选择)
        isLoading: false,
        checkSub: false,//是否选择包含下级院
        breadData: ['实时提醒',this.$route.query.bread],
        gkzt: JSON.parse(this.$route.query.status).gkzt,
        role: JSON.parse(localStorage.getItem('userInfo')).JS,
        tableHeight: '',//表格高度
        // dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        dateValue:[this.getStartTime(),this.getCurrentTime()],
        dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
        status: "全部",//当前案件类型
        total: '',//总条数
        pageNum: 1,//页号
        pageSize: 10,//页大小
        caseType: JSON.parse(localStorage.getItem('AJLX')),//案件类型
        company: {//单位
          name: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
          DWBM: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
        },
        showCompany: false,//显示单位
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
        infoData: []//表格数据
      }
    },
    methods: {
      exportAllData(data) {//导出本页数据
        if(data.length > 0) {
          let fileName = this.breadData[0] +'-'+ this.breadData[1] + '-'+  this.getExportTime();
          let _this = this;
          this.$Message.info('导出数据中');
          // setTimeout(function(){
          //   _this.exportData(data,_this.columns1,fileName);//导出数据
          // },200)
          setTimeout(function(){
            _this.exportData(data,_this.columns1,fileName);//导出数据
          },200)
        }else {
          this.$Message.warning('暂无数据可导出');
        }
      },
      getCount() {//获取案件公开数量信息
        let api = '';
        let _this = this;
        if(this.role=='案管人员') {
          api = 'AG_CountAJGKXX';
        }else if(this.role=='承办人'){
          api = 'CBR_CountAJGKXX';
        }
        _this.axios.get(webApi.SSTX[api].format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          dwbm: _this.company.DWBM,
          gkzt: _this.gkzt,
          bhxj: _this.checkSub,//包含下级
          ajlx: _this.getCaseCode(),//案件类型
        })).then(function(res){
          _this.total = res.data.data;
        }).catch(function(err){
          console.log(err)
        })
      },
      selectUnits(val) {
        console.log(val)
        this.company = val.company;
        this.showCompany = false;
        this.$refs.inputCompany.blur();
      },
      listenClick(e) {//监听点击
        console.log('点击',e)
        if(!(e.target.parentNode.className=="searchBtn focusCompany" ||e.target.className=='focusCompany' ||e.target.outerHTML.indexOf('treenode_switch') > -1)) {
          this.blurSelectCompany();
        }
      },
      searchNodes(){
        this.showCompany = true;
        this.$bus.$emit('searchUnits',{keywords: this.company.name});
      },
      blurSelectCompany() {
        this.showCompany = false;
      },
      setDate(fmtDate) {//设置时间
        fmtDate[0]+=' 00:00:00';
        fmtDate[1]+=' 00:00:00';
        this.dateValue = fmtDate;
      },
      searchData(){//点击查询
        this.pageNum = 1;
        this.getCaseList(true);
      },
      getStartTime() {//获取初始的开始时间
        let date = new Date();
        let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // (month < 10)&&(month = '0' + month)
        // let startTime = `${year}-${month}-01 00:00:00`;
        let startTime = `${year}-01-01 00:00:00`;
        return startTime;
      },
      changePageNum(num) {//改变页码
        this.pageNum = num;
        this.getCaseList();
      },
      changePageSize(size) {//改变每页条数
        this.pageSize = size;
        this.getCaseList();
      },
      /*
      * getCount: 是否获取当前选择条件下的公开信息数量
      * getAll: 是否获取当前选择条件下的全部数据
      * */
      getCaseList(getCount,getAll) {//获取案件信息列表
        this.isLoading = true;
        let api = '';
        let _this = this;
        if(getCount){//获取总数
          _this.getCount();//获取总条数
        }
        // let endTime = this.getCurrentTime();
        if(this.role=='案管人员') {
          api = 'AG_GetAJGKXXs';
        }else if(this.role=='承办人'){
          api = 'CBR_GetAJGKXXs';
        }
        if(getAll) {
          this.$Message.info('获取数据中');
        }
        _this.axios.get(webApi.SSTX[api].format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          dwbm: _this.company.DWBM,
          gkzt: _this.gkzt,
          bhxj: _this.checkSub,//包含下级
          ajlx: _this.getCaseCode(),//案件类型
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
                _this.exportAllData(data);//下载全部数据
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
      getCaseCode() {//根据案件名称获取编码
        let _this = this;
        let ajlx = "";
        this.caseType.forEach(function(item){
          if(item.MC==_this.status) {
            ajlx = item.BM;
            return
          }
        });
        return ajlx;
      },
      setColumns1() {//设置表头
        if(this.gkzt==2) {//本系统已公开统一系统未公开
          this.columns1.push({
            title: '未公开原因',
            key: 'BZ',
            align: 'center',
          })
        }else if(this.gkzt==4) {//不公开
          this.columns1.push({
            title: '不公开原因',
            key: 'BZ',
            align: 'center',
          })
        }
        // this.columns1.push({
        //   title: '案情摘要',
        //   key: 'operation',
        //   align: 'center',
        //   render: (h, params) => {
        //     let texts = params.row.AQZY;
        //     let _this = this;
        //     if(texts) {
        //       if(texts.length > 20) {
        //         texts = texts.substring(0,15) + '...';
        //       }
        //     }else {
        //       texts = '暂无';
        //     }
        //     return h('div', [
        //       h('Tooltip', {
        //         props: {
        //           placement: 'left',
        //           transfer: true,
        //           theme: 'light',
        //         },
        //
        //       },[texts,h('div',{
        //         slot: 'content',
        //         style: {
        //           whiteSpace: 'normal',
        //           maxWidth: '400px',
        //           maxHeight: '320px',
        //           paddingRight: '10px',
        //           fontSize: '14px',
        //           overflowY: 'auto'
        //         }
        //       },params.row.AQZY)])
        //     ]);
        //   }
        // })
      },
      initConfig() {//初始化配置
        this.caseType.unshift({MC:"全部",BM: ' '});//案件类型添加全部选项
        this.setColumns1();
      }
    },
    created() {
      this.initConfig();//初始化配置
      console.log(this.$route)

    },
    mounted() {
      // window.addEventListener('click',this.listenClick);
      this.setTableHeight(this);//设置表格高度
      this.getCaseList(true);
    },
    beforeDestroy() {
      // window.removeEventListener('click',this.listenClick);
    }
  }
</script>

<style scoped lang="scss">
  #caseInfo {
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
        height: calc(100% - 20px - 24px  - 35px - 30px - 1px - 20px - 60px - 65px);
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
      background-image: none;
      position: relative;
      cursor: text;
      transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
  }
</style>
