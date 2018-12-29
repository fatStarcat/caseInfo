<template>
  <div class="msgTemp-main main-content" ref="main">
    <!--案件受理通知-->
    <div class="msgTemp-head">
      案件受理通知
    </div>
    <div class="msgTemp-table">
      <div>
        <Table  stripe  :columns="columnsAccept" :data="tableAcceptData"></Table>
      </div>
    </div>
    <!--案件分配通知-->
    <div class="msgTemp-head">
      案件分配通知
    </div>
    <div class="msgTemp-table">
      <div>
        <Table  stripe  :columns="columnsAllot" :data="tableAllotData"></Table>
      </div>
    </div>
    <!--自定义短信-->
    <div class="msgTemp-head">
      自定义短信
    </div>
    <div class="main-select-wrap" ref="mainSelect">
      <div class="main-select clearfix main-sItemOffsetThree">
        <div class="main-sItem">
          <span class="sItem-name">模板名称 :</span>
          <Input v-model="tempName" placeholder="请输入模板名称" />
          <span>
          </span>
        </div>
      </div>
      <!--按钮-->
      <div class="main-sBtn">
        <button class="cus-info-btn" @click="getList">查询</button>
      </div>
    </div>
    <!--表格-->
    <div class="main-table">
      <!--按钮组-->
      <div class="main-btn" >
        <button class="cus-cancel-btn" @click="addModalShow=true">新增模板</button>
      </div>
      <Table height="300"  stripe :loading="loading"  :columns="columns" :data="tableData"></Table>
    </div>
    <!--分页-->
    <div class="main-pages clearfix" ref="mainPage">
      <Page  :pageSize='pageSize':current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
    </div>
    <!--弹出框-->
    <!--编辑通知模板-->
    <edit-msg :modalTitle="msgTitle" :info="noticeInfo" @confirm="hideModal" v-show="editMsgShow"></edit-msg>
    <!--新增模板-->
    <add-modal modalTitle="自定义短信—新增模板" @confirm="hideModal" v-show="addModalShow"></add-modal>
    <!--编辑自定义短信模板-->
    <edit-modal :info='sendInfo' modalTitle="自定义短信—编辑模板" @confirm="hideModal" v-show="editModalShow"></edit-modal>
    <!--删除-->
    <tip-modal tipTitle='是否删除该模板？' @confirm="hideModal" v-show="tipModalShow"></tip-modal>
    <!--联系人-->
    <!--<contacts-modal v-show="tipModalShow"></contacts-modal>-->
  </div>
</template>

<script>
  import {Input,Select,Option,Table,Page} from 'iview';
  // import addModal from './modal/addModal';
  import editMsg from './modal/editMsg';
  import addModal from './modal/addModal';
  import tipModal from '../../../public/messagePush/modal/tipModal';
  import editModal from './modal/editModal';
  import contactsModal from '../../../public/messagePush/modal/contactsModal'
  export default {
    name: "case-accept-notice",
    components: {Input,Select,Option,Table,Page,tipModal ,editMsg,addModal,editModal,contactsModal},
    data() {
      return {
        editMsgShow: false,//编辑通知模板弹窗框
        msgTitle: '',//通知模板标题
        addModalShow: false,//添加联系人弹出框
        tipModalShow: false,//提示弹出框
        editModalShow: false,//编辑自定义短信模板
        sendInfo: {//已发送信息
          tempName: '会议通知',//模板名称
          tempContent: '{时间_月}月例行会议将于15日上午9时召开，请做好与会准备。',
          sendTime: '2018/01/10 12:00:00',
          contacts: '张三',
          remarks: '',//备注
        },
        noticeInfo: {//通知信息

        },
        total: 0,//表格总数据
        pageNum: 1,//表格当前页
        pageSize: 20,//当前页大小
        loading: false,//表格加载中
        tempName: '',//模板名称
        tableData: [],//表格数据
        tableAcceptData: [//受理模板数据
          {
            order: '1',
            tempName: '案件受理通知模板',
            tempContent: 'XX检察院于XX年XX月XX日受理了某某案件。',
            remarks: ''
          }
        ],
        tableAllotData: [//分配模板数据
          {
            order: '1',
            tempName: '案件分配通知模板',
            tempContent: '我院受理的XX案件已分配给XX检察官。',
            remarks: ''
          }
        ],
        columnsAccept: [//受理通知表格表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '模板名称',
            key: 'tempName',
            align: 'center',
          },
          {
            title: '模板内容',
            key: 'tempContent',
            align: 'center',
          },
          {
            title: '备注',
            key: 'remarks',
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
                      this.editMsgShow = true;
                      this.msgTitle = '案件受理通知—编辑模板';
                      this.noticeInfo = params.row;
                      console.log("编辑",params.row);
                    }
                  }
                }, '编辑'),
              ]);
            }
          },
        ],
        columnsAllot: [//分配通知表格表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '模板名称',
            key: 'tempName',
            align: 'center',
          },
          {
            title: '模板内容',
            key: 'tempContent',
            align: 'center',
          },
          {
            title: '备注',
            key: 'remarks',
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
                      this.editMsgShow = true;
                      this.msgTitle = '案件分配通知—编辑模板';
                      this.noticeInfo = params.row;
                      console.log("编辑",params.row);
                    }
                  }
                }, '编辑'),
              ]);
            }
          },
        ],
        columns: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '模板名称',
            key: 'tempName',
            align: 'center'
          },
          {
            title: '模板内容',
            key: 'tempContent',
            align: 'center',
          },
          {
            title: '发送时间',
            key: 'sendTime',
            align: 'center',
            maxWidth: 180
          },
          {
            title: '备注',
            key: 'remarks',
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
                    width: '40px',
                    height: '20px',
                    lineHeight: '20px',
                    cursor: 'pointer',
                    border: '1px solid #4589FD',
                    borderRadius:'10px',
                    color: '#4589FD',
                    fontSize: '12px'
                  },
                  on: {
                    click: () => {
                      this.editModalShow = true;
                      this.sendInfo = params.row;
                      console.log("编辑");
                    }
                  }
                }, '编辑'),
                h('span', {
                  props: {
                    size: 'small',
                  },
                  style: {
                    display: 'inline-block',
                    marginLeft: '2px',
                    width: '40px',
                    height: '20px',
                    lineHeight: '20px',
                    cursor: 'pointer',
                    border: '1px solid #E78B28',
                    borderRadius:'10px',
                    color: '#E78B28',
                    fontSize: '12px'
                  },
                  on: {
                    click: () => {
                      this.tipModalShow = true;
                      console.log("删除",params.row.status);
                    }
                  }
                }, '删除'),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this.getList();//获取列表数据
    },
    beforeDestroy() {
      this.destroyWatchTableHeight(this);//注销监听事件
    },
    methods: {
      /*获取列表数据*/
      getList() {
        let _this = this;
        let url =  webApi.getMsgTempManageList;
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
        this.addModalShow = false;
        this.editMsgShow = false;
        this.editModalShow = false;
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

<style scoped lang="scss">
@import "../../../../css/messagePush/msgTempManage";
</style>
