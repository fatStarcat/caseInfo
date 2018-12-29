<template>
  <div id="customMsg" class="main-content" ref="main">
    <div class="main-select-wrap" ref="mainSelect">
      <div class="main-select clearfix main-sItemOffsetTwo">
        <div class="main-sItem">
          <span class="sItem-name">发送时间 :</span>
          <span>
            <DatePicker @on-change="setDate" :value="dateTime" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择发送时间" clearable></DatePicker>
          </span>
        </div>
        <div class="main-sItem">
          <span class="sItem-name">联系人 :</span>
          <span>
            <Select v-model="contacts" filterable multiple>
                <Option v-for="item in contactsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
        </div>
      </div>
      <!--按钮-->
      <div class="main-sBtn">
        <button class="cus-info-btn" @click="getList">查询</button>
      </div>
    </div>
    <!--表格-->
    <div class="main-table" ref="mainTable">
      <!--按钮组-->
      <div class="main-btn" ref="mainBtn">
        <button class="cus-cancel-btn" @click="sendModalShow=true">发送短信通知</button>
      </div>
      <Table :height="tableHeight"  stripe :loading="loading"  :columns="columns" :data="tableData"></Table>
    </div>
    <!--分页-->
    <div class="main-pages clearfix" ref="mainPage">
      <Page  :pageSize='pageSize':current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
    </div>
    <!--弹出框-->
    <!--查看通知-->
    <look-modal :lookTitle="lookTitle" :lookInfo="sendInfo" @confirm="hideModal" v-show="lookModalShow"></look-modal>
    <!--发送通知-->
    <send-modal :sendInfo="sendInfo" @confirm="hideModal" v-show="sendModalShow"></send-modal>
  </div>
</template>

<script>
  import {DatePicker,Select,Option,Table,Page} from 'iview';
  import lookModal from './modal/lookModal';
  import sendModal from './modal/sendModal';
  export default {
    name: "case-accept-notice",
    components: {DatePicker,Select,Option,Table,Page,lookModal,sendModal},
    data() {
      return {
        dateValue:[this.getStartTime(),this.getCurrentTime()],//时间值
        dateTime: [this.getStartTime(),this.getCurrentTime()],//控件显示时间
        lookModalShow: false,//查看消息弹窗框
        sendModalShow: false,//发送消息弹出框
        lookTitle: '',//查看消息弹出框标题
        sendInfo: {//已发送信息
          content: '11月例行会议将于15日上午9时召开，请做好与会准备。',//短信内容
          sendTime: '2018/01/10 12:00:00',//发送时间
          contacts: '张三（13489753695）'//联系人
        },
        total: 0,//表格总数据
        pageNum: 1,//表格当前页
        pageSize: 20,//当前页大小
        loading: false,//表格加载中
        tableHeight: '',//表格高度
        contactsList: [],//联系人数据
        contacts: '',//联系人
        tableData: [],//表格数据
        columns: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '名称',
            key: 'name',
            align: 'center',
          },
          {
            title: '联系人',
            key: 'contacts',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '电话号码',
            key: 'phoneNumber',
            align: 'center',
            maxWidth: 150
          },
          {
            title: '发送状态',
            key: 'status',
            align: 'center',
            maxWidth: 100
          },
          {
            title: '发送时间',
            key: 'sendTime',
            align: 'center',
          },
          {
            title: '信息内容',
            key: 'content',
            align: 'center',
          },
          {
            title: '操作',
            key: 'operation',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    display: 'inline-block',
                    marginLeft: '2px',
                    width: '60px',
                    height: '20px',
                    lineHeight: '20px',
                    cursor: 'pointer',
                    border: '1px solid #4589FD',
                    borderRadius:'10px',
                    color: '#4589FD',
                    fontSize: '14px'
                  },
                  on: {
                    click: () => {
                      this.lookTitle = '短信详情';
                      this.lookModalShow = true;
                      console.log("查看",params.row.status);
                    }
                  }
                }, '查看'),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this.setMainTableHeight(this);//设置表格高度
      this.onWatchTableHeight(this);//绑定监听事件
      this.getList();//获取列表数据
    },
    beforeDestroy() {
      this.destroyWatchTableHeight(this);//注销监听事件
    },
    methods: {
      /*获取列表数据*/
      getList() {
        let _this = this;
        let url =  webApi.getCustomMessageSendList;
        this.loading = true;
        this.axios.get(url)
          .then(function(res){
            _this.tableData = res.data.tableData;
            _this.total = res.data.tableData.length;
            _this.loading = false;
          })
          .catch(function(err){
            console.log(err);
            _this.loading = false;
          })
      },
      /*改变发送状态*/
      changeSendStatus(status) {
        let valArr = this.sendValue;
        let statusCode;//发送状态值对应code
        for(let i = 0, len = valArr.length; i < len ; i++) {
          if(valArr[i].label === status) {
            statusCode = valArr[i].status;
            break;
          }
        }
        console.log(status,statusCode)
      },
      /*改变一页条数*/
      changePageSize(size) {

      },
      /*改变页码*/
      changePageNum(num) {

      },
      /*隐藏弹出框*/
      hideModal() {
        this.lookModalShow = false;
        this.sendModalShow = false;
        this.tipModalShow = false;
      },
      /*设置时间格式*/
      setDate(fmtDate) {
        fmtDate[0]+=' 00:00:00';
        fmtDate[1]+=' 00:00:00';
        this.dateValue = fmtDate;
      },
    }
  }
</script>

<style scoped>

</style>
