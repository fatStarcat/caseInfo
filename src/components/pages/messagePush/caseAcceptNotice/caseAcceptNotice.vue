<template>
  <div id="caseAccept" class="main-content" ref="main">
    <div class="main-select-wrap" ref="mainSelect">
      <div class="main-select clearfix">
        <div class="main-sItem">
          <span class="sItem-name">发送时间 :</span>
          <span>
            <DatePicker split-panels  @on-change="setDate" :value="dateTime" type="daterange" format="yyyy-MM-dd" placeholder="请选择发送时间"></DatePicker>
          </span>
        </div>
        <div class="main-sItem">
          <span class="sItem-name">案件名称 :</span>
          <span>
             <Input v-model="caseName" placeholder="请输入案件名称" />
          </span>
        </div>

      </div>
      <div class="main-select clearfix main-sItemOffset">
        <div class="main-sItem ">
          <span class="sItem-name">部门受案号 :</span>
          <span>
             <Input v-model="acceptNumber" placeholder="请输入部门受案号"  />
          </span>
        </div>
        <div class="main-sItem">
          <span class="sItem-name">发送状态 :</span>
          <span>
            <RadioGroup v-model="sendStatus" @on-change="changeSendStatus">
                <Radio  v-for="item,index in sendValue" :key="index" :label="item.label"></Radio>
            </RadioGroup>
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
      <Table :height="tableHeight"  stripe :loading="loading"  :columns="columns" :data="tableData"></Table>
    </div>
    <!--分页-->
    <div class="main-pages" ref="mainPage">
      <Page  :pageSize='pageSize' :current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
    </div>
    <!--弹出框-->
    <!--查看通知-->
    <look-modal :lookTitle="lookTitle" :lookInfo="sendInfo" @confirm="hideModal" v-show="lookModalShow"></look-modal>
    <!--发送通知-->
    <send-modal :sendInfo="sendInfo" @confirm="hideModal" v-show="sendModalShow"></send-modal>
    <!--删除-->
    <tip-modal tipTitle='是否删除该通知？' @confirm="hideModal" v-show="tipModalShow"></tip-modal>
  </div>
</template>

<script>
  import {DatePicker,RadioGroup,Radio,Input,Table,Page} from 'iview';
  import lookModal from './modal/lookModal';
  import sendModal from './modal/sendModal';
  import tipModal from '../../../public/messagePush/modal/tipModal';
  export default {
    name: "case-accept-notice",
    components: {DatePicker,RadioGroup,Radio,Input,Table,Page,lookModal,sendModal,tipModal},
    data() {
      return {
        dateValue:[this.getStartTime(),this.getCurrentTime()],//时间值
        dateTime: [this.getStartTime(),this.getCurrentTime()],//控件显示时间
        lookModalShow: false,//查看消息弹窗框
        sendModalShow: false,//发送消息弹出框
        tipModalShow: false,//删除弹出框
        lookTitle: '',//查看消息弹出框标题
        sendInfo: {//已发送信息
          acceptPerson: '张三',//通知接收人
          phoneNumber: '1354561295',//手机号
          content: 'XX检察院于XX年XX月XX日受理了某某案件。',//通知内容
        },
        total: 0,//表格总数据
        pageNum: 1,//表格当前页
        pageSize: 20,//当前页大小
        loading: false,//表格加载中
        tableHeight: '',//表格高度
        sendStatus: '全部',//当前发送状态
        sendValue: [//发送状态
          {
            label: '全部',
            status: 0
          },
          {
            label: '已发送',
            status: 1
          },
          {
            label: '发送中',
            status: 2
          },
          {
            label: '待确认',
            status: 2
          },

        ],
        caseName: '',//案件名称
        acceptNumber: '',//部门受案号
        tableData: [],//表格数据
        columns: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '部门受案号',
            key: 'acceptNumber',
            align: 'center',
          },
          {
            title: '案件名称',
            key: 'caseName',
            align: 'center',
          },
          {
            title: '案情摘要',
            key: 'caseAbstract',
            align: 'center',
          },
          {
            title: '所属单位',
            key: 'unit',
            align: 'center',
          },
          {
            title: '案件流程',
            key: 'caseProcess',
            align: 'center',
          },
          {
            title: '检察官',
            key: 'people',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '当事人',
            key: 'party',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '代理当事人',
            key: 'agentParty',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '信息内容',
            key: 'content',
            align: 'center',
          },
          {
            title: '发送状态',
            key: 'status',
            align: 'center',
            maxWidth: 100
          },
          {
            title: '操作',
            key: 'operation',
            align: 'center',
            width: 120,
            render: (h, params) => {
              if(params.row.status === '等待确认'){
                return h('div', [
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      display: 'inline-block',
                      marginRight: '2px',
                      width: '40px',
                      height: '20px',
                      cursor: 'pointer',
                      border: '1px solid #4589FD',
                      borderRadius:'10px',
                      color: '#4589FD',
                      fontSize: '12px'
                    },
                    on: {
                      click: () => {
                        //未通过
                        this.sendModalShow = true;
                        console.log('发送')
                      }
                    }
                  }, '发送'),
                  h('span', {
                    props: {
                      size: 'small',
                    },
                    style: {
                      display: 'inline-block',
                      marginLeft: '2px',
                      width: '40px',
                      height: '20px',
                      cursor: 'pointer',
                      border: '1px solid #E78B28',
                      borderRadius:'10px',
                      color: '#E78B28',
                      fontSize: '12px'
                    },
                    on: {
                      click: () => {
                        this.tipModalShow = true;
                        console.log('删除')
                      }
                    }
                  }, '删除')
                ]);
              }else if(params.row.status === '已发送'||params.row.status === '发送中'){
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
                        this.lookTitle = params.row.status + '通知';
                        this.lookModalShow = true;
                        console.log("查看",params.row.status);
                      }
                    }
                  }, '查看'),
                ]);
              }
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
        let url =  webApi.getCaseAcceptNoticeList;
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
        this.getList();
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
