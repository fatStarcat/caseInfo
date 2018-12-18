<template>
    <div id="infoExport">
      <div id="infoContent">
        <!--条件选择区-->
        <select-group>
          <select-item>
            <label>时间: </label>
            <DatePicker type="daterange" split-panels placeholder="请选择时间" @on-change="setDate" v-model="dateTime" style="width: 200px"></DatePicker>
          </select-item>
          <!--<select-item>-->
            <!--<label>单位: </label>-->
            <!--<Input   readonly type="text"  v-model="company.name"   style="width:200px" />-->
          <!--</select-item>-->
          <button class="search-btn btn-hover" @click="tableType=='case'?getCaseList(true):getDocList(true)">
            查询
          </button>
        </select-group>
        <select-group mar-top="20">
          <select-item>
            <label>当前阶段: </label>
            <RadioGroup v-model="exportStatus" @on-change="setNzzt">
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
          <button class="export-btn btn-hover-export" @click="createPackage">
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
          <Table :loading="isLoading" :height="tableHeight" border stripe :columns="columns1" :data="infoData" ></Table>
        </div>
        <!--表格分页-->
        <div id="tablePage">
          <Page :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
        </div>
      </div>
    </div>
</template>

<script>
  import ExportJsonExcel from 'js-export-excel' //导出excel
    export default {
        name: "info-export",
        data() {
          return {
            dateValue:[this.getStartTime(),this.getCurrentTime()],
            dateTime: [this.getStartTime(),this.getCurrentTime()],//时间
            tableHeight: '',//表格高度
            total: 0,//数据总数
            dczt: '',//导出状态
            exportStatus: "全部",//导出状态(0:待导出 1:已导出)
            tableType: 'case',//当前类型(案件,文书)
            pageNum: 1,//页号
            pageSize: 10,//页大小
            isLoading: false,//表格加载
            company: {//单位
              name: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
              DWBM: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
            },
            exportContent: ['案件信息','法律文书'],//导出内容
            flag: 0,//0:导出全部，1:导出案件;2:导出文书
            columsData: {
              caseInfo: [//案件信息表头
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
                  title: '受理日期',
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
              ],
              docInfo: [//法律文书表头
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
              ]
            },
            columns1: [],//表头信息
            infoData: [],//数据信息
          }
        },
      methods: {
        createPackage() {//生成导出数据包
          let _this = this;
          let exportContent = this.exportContent;
          let msg = this.$Message.loading({
            content: '获取数据中',
            duration: 0
          });
          if(exportContent.length===2) {
            this.flag = 0;
          }else if(exportContent.indexOf('案件信息') > -1) {
            this.flag = 1;
          }else if(exportContent.indexOf('法律文书') > -1) {
            this.flag = 2;
          }
          this.axios.get(webApi.SJDC.CreatePackage.format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            flag: _this.flag//0:导出全部，1:导出案件;2:导出文书
          })).then(function(res){

            _this.$Message.destroy()
            if(res.data.code===0){
              let fileName = '数据导出: ' +  exportContent.join('、') +'-'+  _this.getExportTime() + '.zip';
              _this.exportFlie(res.data.data,fileName);
            }
          }).catch(function(err){
            console.log(err)
            _this.$Message.destroy()
            _this.$Message.warning('生成导出数据包失败!');
          })
        },
        exportFlie(b64Data, fileName) {
          //创建下载链接
          //best64 转化为 blob对象
          function b64toBlob(b64Data) {
            var sliceSize = 512;
            var byteCharacters = atob(b64Data);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              var slice = byteCharacters.slice(offset, offset + sliceSize);
              var byteNumbers = new Array(slice.length);

              for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }

              var byteArray = new Uint8Array(byteNumbers);

              byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, {
              type: 'appliction/octet-stream'
            });
            return blob;
          }

          var blob = b64toBlob(b64Data);
          var saveData = (function () {
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display:none';
            return function (blob, fileName) {
              let url = window.URL.createObjectURL(blob);
              a.href = url;
              a.download = fileName;
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove()
            };
          }());
          saveData(blob,fileName)
        },
        setNzzt() {//通过当前阶段状态设置nzzt
          if(this.exportStatus=='全部') {
            this.dczt = '';
          }else if(this.exportStatus=='待导出') {
            this.dczt = 0;
          }if(this.exportStatus=='已导出') {
            this.dczt = 1;
          }
        },
        setDate(fmtDate) {//设置时间
          if(fmtDate){
            fmtDate[0]+=' 00:00:00';
            fmtDate[1]+=' 00:00:00';
            this.dateValue = fmtDate;
          }
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
          this.tableType=='case'?this.getCaseList():this.getDocList();
        },
        changePageSize(size) {//改变每页条数
          this.pageSize = size;
          this.tableType=='case'?this.getCaseList():this.getDocList();
        },
        getCaseCount() {//获取案件公开信息数量
          let _this = this;
          let api = this.setCountApi();
          this.axios.get(webApi.SJDC[api].format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dczt: _this.dczt,
            ajlx: '',//案件类型
          })).then(function(res){
            ;
            if(res.data.code==0){
              _this.total = res.data.data;
            }
          }).catch(function(err){
            console.log(err)
          })
        },
        getCaseList(getCount){//获取案件列表
          let _this = this;
          let api = this.setListApi();
          this.isLoading = true;
          if(getCount){//获取总数
            _this.getCaseCount();//获取总条数
          }
          this.axios.get(webApi.SJDC[api].format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dczt: _this.dczt,
            ajlx: '',//案件类型
            pageNum: _this.pageNum,
            pageSize: _this.pageSize,
          })).then(function(res){
            ;
            if(res.data.code==0){
              let data = res.data.data;//表数据
              data.forEach(function(item,index){ //添加序号
                item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
              });
              _this.infoData = data;
            }
            _this.isLoading = false;
          }).catch(function(err){
            console.log(err)
            _this.isLoading = false;
          })
        },
        getDocCount() {//获取文书公开信息数量
          let _this = this;
          let api = this.setCountApi();
          this.axios.get(webApi.SJDC[api].format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dczt: _this.dczt,//导出状态
            wslb: '',//文书类别
          })).then(function(res){
            ;
            if(res.data.code==0){
              _this.total = res.data.data;
            }
          }).catch(function(err){
            console.log(err)
          })
        },
        getDocList(getCount){//获取文书信息列表
          let _this = this;
          let api = this.setListApi();
          this.isLoading = true;
          if(getCount){//获取总数
            _this.getDocCount();//获取总条数
          }
          this.axios.get(webApi.SJDC[api].format({
            startTimeStr: _this.dateValue[0],
            endTimeStr: _this.dateValue[1],
            dczt: _this.dczt,//导出状态
            wslb: '',//文书类别
            pageNum: _this.pageNum,
            pageSize: _this.pageSize,
          })).then(function(res){
            ;
            if(res.data.code==0){
              let data = res.data.data;//表数据
              data.forEach(function(item,index){ //添加序号
                item.order = (_this.pageNum -1) * _this.pageSize +  index + 1;
              });
              _this.infoData = data;
            }
            _this.isLoading = false;
          }).catch(function(err){
            console.log(err)
            _this.isLoading = false;
          })
        },
        setCountApi() {//设置获取信息数量api,根据角色身份
          let api = '';
          if(this.tableType=='case') {
            api = 'AG_CountAJGKXX';
          }else if(this.tableType=='doc'){
            api = 'AG_CountWSSL';
          }
          return api;

        },
        setListApi() {//设置获取信息列表api,根据角色身份
          let api = '';
          if(this.tableType=='case') {
            api = 'AG_GetAJGKXXs';
          }else if(this.tableType=='doc'){
            api = 'AG_GetWSSLs';
          }
          return api;
        },
        toggleTable(e,type){//切换表格
          if(e.target.checked) {
            this.tableType = type;
            this.pageNum = 1;
            if(type=='case'){
              this.columns1 = this.columsData.caseInfo;
              this.getCaseList(true);
            }else if(type=='doc'){
              this.columns1 = this.columsData.docInfo;
              this.getDocList(true);
            }
          }
        },
        //获取当前导出时间
        getExportTime: function () {
          var date = new Date();
          var year,
            month,
            day,
            hours,
            minutes,
            seconds;

          year = date.getFullYear();
          month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
          day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
          hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
          minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
          seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
          return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

        }
      },
      created() {

      },
      mounted() {
        this.setTableHeight(this);//设置表格高度
        this.columns1 = this.columsData.caseInfo;
        this.getCaseList(true);
      },

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
