<template>
  <div id='mailList' class="mailList main-content" ref="main">
    <div class="main-select-wrap" ref="mainSelect">
      <div class="main-select clearfix main-sItemOffsetThree">
        <div class="main-sItem">
          <span class="sItem-name">联系人姓名 :</span>
          <span>
             <Input v-model="caseName" placeholder="请输入联系人姓名" />
          </span>
        </div>
        <div class="main-sItem">
          <span class="sItem-name">所属分组 :</span>
          <span>
            <Select v-model="contactsGroup" filterable multiple>
                <Option v-for="item in contactsGroupList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
        </div>
        <div class="main-sItem">
          <span class="sItem-name">手机号码 :</span>
          <span>
            <Input v-model="phoneNumber" placeholder="请输入手机号码" />
          </span>
        </div>
      </div>
      <!--按钮-->
      <div class="main-sBtn">
        <button class="cus-info-btn" @click="getList">查询</button>
      </div>
    </div>
    <!--<div class="main-select-wrap" ref="mainSelect">-->
      <!--<div class="main-select clearfix main-sItemOffsetTwo">-->
        <!--<div class="main-sItem">-->
          <!--<span class="sItem-name">发送时间 :</span>-->
          <!--<span>-->
            <!--<DatePicker @on-change="setDate" :value="dateTime" type="datetimerange" format="yyyy-MM-dd" placeholder="请选择发送时间" clearable></DatePicker>-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="main-sItem">-->
          <!--<span class="sItem-name">联系人 :</span>-->
          <!--<span>-->
            <!--<Select v-model="contacts" filterable multiple>-->
                <!--<Option v-for="item in contactsList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
            <!--</Select>-->
          <!--</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;按钮&ndash;&gt;-->
      <!--<div class="main-sBtn">-->
        <!--<button class="cus-info-btn" @click="getList">查询</button>-->
      <!--</div>-->
    <!--</div>-->
    <!--表格-->
    <div class="main-table" ref="mainTable">
      <!--按钮组-->
      <div class="main-btn" ref="mainBtn">
        <button class="cus-cancel-btn" @click="addModalShow=true">新增联系人</button>
      </div>
      <Table :height="tableHeight"  stripe :loading="loading"  :columns="columns" :data="tableData"></Table>
    </div>
    <!--分页-->
    <div class="main-pages clearfix" ref="mainPage">
      <Page  :pageSize='pageSize':current="pageNum" @on-page-size-change="changePageSize" @on-change="changePageNum"   :total="total" show-sizer show-total show-elevator />
    </div>
    <!--弹出框-->
    <!--编辑联系人-->
    <edit-modal modalTitle="编辑联系人" :info="sendInfo" @confirm="hideModal" v-show="editModalShow"></edit-modal>
    <!--新增联系人-->
    <add-modal modalTitle="新增联系人" @confirm="hideModal" v-show="addModalShow"></add-modal>
    <!--删除-->
    <tip-modal tipTitle='是否删除该联系人？' @confirm="hideModal" v-show="tipModalShow"></tip-modal>
  </div>
</template>

<script>
  import {Input,Select,Option,Table,Page} from 'iview';
  import addModal from './modal/addModal';
  import editModal from './modal/editModal';
  import tipModal from '../../../public/messagePush/modal/tipModal';
  export default {
    name: "case-accept-notice",
    components: {Input,Select,Option,Table,Page,addModal,editModal,tipModal},
    data() {
      return {
        editModalShow: false,//编辑联系人弹窗框
        addModalShow: false,//添加联系人弹出框
        tipModalShow: false,//提示弹出框
        sendInfo: {//已发送信息
          phoneNumber: '134562879569',//手机号
          contactsGroup: '浠水县检察院',//所属分组
          contacts: '张三',//联系人
          remarks: '',//备注
        },
        total: 0,//表格总数据
        pageNum: 1,//表格当前页
        pageSize: 20,//当前页大小
        loading: false,//表格加载中
        tableHeight: '',//表格高度
        contacts: '',//联系人
        contactsGroup: '',//联系人分组
        contactsGroupList: [],//联系人分组数据
        phoneNumber: '',//手机号
        tableData: [],//表格数据
        columns: [//表头数据
          {
            title: '序号',
            key: 'order',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '联系人',
            key: 'contacts',
            align: 'center',
            maxWidth: 80
          },
          {
            title: '所属分组',
            key: 'contactsGroup',
            align: 'center',
          },
          {
            title: '电话号码',
            key: 'phoneNumber',
            align: 'center',
            maxWidth: 150
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
        let url =  webApi.getMailListManageList;
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
        //console.log(status,statusCode)
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
  @import "../../../../css/messagePush/maiListManage";
</style>
