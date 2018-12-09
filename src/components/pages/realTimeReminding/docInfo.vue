<template>
  <div id="docInfo">
    <div id="docContent">
      <my-bread :bread-data="breadData"></my-bread>
      <!--条件选择区-->
      <select-group mar-top="30">
        <select-item>
          <label>受理时间: </label>
          <DatePicker  @on-change="setDate" v-model="dateTime" type="daterange" split-panels placeholder="请选择时间"  style="width: 200px"></DatePicker>
        </select-item>
        <select-item>
          <label>单位: </label>
          <!--<Select v-model="company" style="width:228px;height: 35px;">-->
          <!--<Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
          <div class="input-wrap">
            <Input   readonly type="text"  v-model="company.name"   style="width:200px" />
          </div>
          <!--<div   v-if="showCheck" class="input-wrap">-->
            <!--<input    @blur="blurSelectCompany" type="text" ref="inputCompany" v-model="company.name"  @focus="searchNodes" @keyup.enter="searchNodes"  class="focusCompany" style="width:200px" />-->
            <!--<my-tree :api="'sub'" @selectUnits="selectUnits" v-show="showCompany"></my-tree>-->
            <!--<Checkbox  v-model="checkSub" >包含下级院</Checkbox>-->
          <!--</div>-->
        </select-item>
        <select-item>
          <label>文书类型: </label>
          <Select v-model="status" style="width:200px">
            <Option v-for="item in docType" :value="item" :key="item">{{ item}}</Option>
          </Select>
        </select-item>
        <button class="search-btn btn-hover" @click="getDocList(true)">
          查询
        </button>
      </select-group>
      <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table ref="iTable" :loading="isLoading"  :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
      </div>
      <!--表格分页-->
      <div id="tablePage">
        <Page :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
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
  export default {
    data() {
      return {
        showCheck: JSON.parse(localStorage.getItem('userInfo')).JS=='案管人员'?true:false,//显示包含下级院选择(案管人员可选择)
        isLoading: false,
        checkSub: false,//是否选择包含下级院
        breadData: ['实时提醒',this.$route.query.bread],
        gkzt: this.$route.query.status.gkzt,//公开状态,
        nzzt: this.$route.query.status.nzzt,//拟制状态
        role: JSON.parse(localStorage.getItem('userInfo')).JS,
        tableHeight: '',//表格高度
        // dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        dateValue:[this.getStartTime(),this.getCurrentTime()],
        dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
        status: "全部",//当前文书类型
        total: '',//总条数
        pageNum: 1,//页号
        pageSize: 10,//页大小
        docType: JSON.parse(localStorage.getItem('WSLX')),//文书类型
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
            title: '判决生效日期/办结日期',
            key: 'SJRQ_BJRQ',
            align: 'center',
          },
        ],
        infoData: []//表格数据
      }
    },
    methods: {
      exportData() {//导出本页数据
        let _this = this;
        this.$refs.iTable.exportCsv({
          filename: _this.breadData[1]
        });
      },
      getCount() {//获取文书公开数量信息
        let api = '';
        let _this = this;
        if(this.role=='案管人员') {
          api = 'AG_CountWSSL';
        }else if(this.role=='承办人'){
          api = 'CBR_CountWSSL';
        }
        _this.axios.get(webApi.SSTX[api].format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          dwbm: _this.company.DWBM,
          gkzt: _this.gkzt,
          nzzt: _this.nzzt,
          bhxj: _this.checkSub,//包含下级
          wslb: _this.status==='全部'?"":_this.status,//文书类型
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
      getStartTime() {//获取初始的开始时间
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        (month < 10)&&(month = '0' + month)
        let startTime = `${year}-${month}-01 00:00:00`;
        // let startTime = `${year}-01-01 00:00:00`;
        return startTime;
      },
      changePageNum(num) {//改变页码
        this.pageNum = num;
        this.getDocList();
      },
      changePageSize(size) {//改变每页条数
        this.pageSize = size;
        this.getDocList();
      },
      getDocList(getCount) {//获取文书信息列表
        this.isLoading = true;
        let api = '';
        let _this = this;
        if(getCount){//获取总数
          _this.getCount();//获取总条数
        }
        // let endTime = this.getCurrentTime();
        if(this.role=='案管人员') {
          api = 'AG_GetWSSLs';
        }else if(this.role=='承办人'){
          api = 'CBR_GetWSSLs';
        }
        _this.axios.get(webApi.SSTX[api].format({
          startTimeStr: _this.dateValue[0],
          endTimeStr: _this.dateValue[1],
          dwbm: _this.company.DWBM,
          gkzt: _this.gkzt,
          nzzt: _this.nzzt,
          bhxj: _this.checkSub,//包含下级
          wslb: _this.status==='全部'?"":_this.status,//文书类型
          pageNum: _this.pageNum,
          pageSize: _this.pageSize,
        })).then(function(res){
          console.log(res);
          if(res.data.code==0){
            let data = res.data.data;//表数据
            data.forEach(function(item,index){ //添加序号
              item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
            });
            _this.infoData = data;
          }
          _this.isLoading = false;
        }).catch(function(err){
          console.log(err);
          _this.isLoading = false;
        })
      },
      getdocCode() {//根据文书名称获取编码
        let _this = this;
        let ajlx = "";
        this.docType.forEach(function(item){
          if(item.MC==_this.status) {
            ajlx = item.BM;
            return
          }
        });
        return ajlx;
      },
      setColumns1() {//设置表头
        if(this.gkzt==0&&this.nzzt==7) {//应公开未公开
          this.columns1.push({
            title: '未公开原因',
            key: 'BZ',
            align: 'center',
          })
        }else if(this.gkzt==1) {//不公开
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
        // this.docType.unshift({MC:"全部",BM: ' '});//文书类型添加全部选项
        this.docType.unshift("全部");//文书类型添加全部选项
        this.setColumns1();
      }
    },
    created() {
      this.initConfig();//初始化配置

    },
    mounted() {
      // window.addEventListener('click',this.listenClick);
      this.setTableHeight(this);//设置表格高度
      this.getDocList(true);
    },
    beforeDestroy() {
      // window.removeEventListener('click',this.listenClick);
    }
  }
</script>

<style scoped lang="scss">
  #docInfo {
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
