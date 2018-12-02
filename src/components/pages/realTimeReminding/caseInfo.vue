<template>
  <div id="caseInfo">
    <div id="caseContent">
      <my-bread :bread-data="breadData"></my-bread>
      <!--条件选择区-->
      <select-group mar-top="30">
        <select-item>
          <label>受理时间: </label>
          <DatePicker v-model="dateTime" type="daterange" split-panels placeholder="请选择时间"  style="width: 200px"></DatePicker>
        </select-item>
        <select-item>
          <label>单位: </label>
          <!--<Select v-model="company" style="width:228px;height: 35px;">-->
            <!--<Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
          <Input style="width:200px" v-model="unit" />
          <Checkbox  v-model="checkSub" v-show="showCheck">包含下级院</Checkbox>
        </select-item>
        <select-item>
          <label>案件类型: </label>
          <Select v-model="status" style="width:200px">
            <Option v-for="item in caseType" :value="item.MC" :key="item.MC">{{ item.MC }}</Option>
          </Select>
        </select-item>
        <button class="search-btn btn-hover" @click="getCaseList">
          查询
        </button>
      </select-group>
      <hr/>
      <!--表格-->
      <div id="infoTable" ref="table">
        <Table :loading="isLoading"  :height="tableHeight"   border stripe :columns="columns1" :data="infoData" ></Table>
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
        showCheck: JSON.parse(localStorage.getItem('userInfo')).JS=='案管人员'?true:false,//显示包含下级院选择(案管人员可选择)
        isLoading: false,
        checkSub: false,//是否选择包含下级院
        breadData: ['实时提醒',this.$route.query.bread],
        gkzt: this.$route.query.status,
        role: JSON.parse(localStorage.getItem('userInfo')).JS,
        dwbm: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
        unit: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
        tableHeight: '',//表格高度
        // dateTime: [new Date((new Date()).getTime() - 86400000),new Date()],//时间
        dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
        status: "全部",//当前案件类型
        total: '',//总条数
        pageNum: 1,//页号
        pageSize: 10,//页大小
        caseType: JSON.parse(localStorage.getItem('AJLX')),//案件类型
        // caseType: [
        //   '全部',
        //   '审查逮捕案件',
        //   '一审公诉案件',
        //   '二审上诉案件',
        //   '二审抗诉案件',
        //   '对民事、行政生效判决、裁定、调解书的监督案件',
        //   '刑事申诉审查案件',
        //   '刑事赔偿案件',
        //   '生效刑事赔偿决定执行案件',
        //   '刑事赔偿复议案件',
        //   '刑事赔偿及民事行政诉讼赔偿监督案件',
        //   '行政赔偿监督案件',
        //   '国家司法救助案件',
        //   '行政公益诉讼一审案件',
        //   '民事公益诉讼一审案件',
        //   '行政公益诉讼二审上案件',
        //   '民事公益诉讼二审上案件',
        //   '行政公益诉讼二审支上案件',
        //   '民事公益诉讼二审支上案件',
        //   '民事公益诉讼重（再）审案件',
        //   '行政公益诉讼重（再）审案件'
        // ],//案件类型
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
          },
          {
            title: '受理时间',
            key: 'SLRQ',
            align: 'center',
          },
          {
            title: '当前阶段',
            key: 'AJZT',
            align: 'center',
          },
          {
            title: '完成时间',
            key: 'WCRQ',
            align: 'center',
          }
        ],
        infoData: []//表格数据
      }
    },
    methods: {
      getStartTime() {//获取初始的开始时间
        let date = new Date();
        let year = date.getFullYear();
        // let month = date.getMonth() + 1;
        // (month < 10)&&(month = '0' + month)
        // let startTime = `${year}-${month}-01 00:00:00`;
        let startTime = `${year}-01-01 00:00:00`;
        return startTime;
      },
      getCaseList() {//获取案件信息列表
        this.isLoading = true;
        let api = '';
        let _this = this;
        // let endTime = this.getCurrentTime();
        console.log(this.dateTime);
        console.log(this.startTime,this.endTime,this.role,this.dwbm)
        if(this.role=='案管人员') {
          api = 'AG_GetAJGKXXs';
        }else if(this.role=='承办人'){
          api = 'CBR_GetAJGKXXs';
        }
        _this.axios.get(webApi.SSTX[api].format({
          startTimeStr: _this.dateTime[0],
          endTimeStr: _this.dateTime[1],
          dwbm: _this.dwbm ,
          gkzt: _this.gkzt,
          bhxj: _this.checkSub,//包含下级
          ajlx: _this.getCaseCode(),//案件类型
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
            // _this.total = _this.infoData.length;
          }
          _this.isLoading = false;
        }).catch(function(err){
          console.log(err);
          this.isLoading = false;
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
        if(this.gkzt==1) {//本系统已公开统一系统未公开
          this.columns1.push({
            title: '未公开原因',
            key: 'reason',
            align: 'center',
          })
        }else if(this.gkzt==2) {//不公开
          this.columns1.push({
            title: '不公开原因',
            key: 'reason',
            align: 'center',
          })
        }
      },
      initConfig() {//初始化配置
        this.caseType.unshift({MC:"全部",BM: ' '});//案件类型添加全部选项
        this.setColumns1();
      }
    },
    created() {
      this.initConfig();//初始化配置
      // this.infoData = jsonData.caseInfo;
      // this.total = this.infoData.length;
    },
    mounted() {
      this.setTableHeight(this);//设置表格高度
      this.getCaseList();
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
</style>
