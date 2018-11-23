<template>
    <div id="tableModal">
        <div id="content">
          <!--标题-->
          <div id="content-header">
            {{title}}
            <span class="close" @click="closeTable">
              <img  src="../../../assets/countAnalysis/close.png" alt="">
            </span>
          </div>
          <select-group>
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
            <Table ref="iTable" :height="tableHeight" border stripe :columns="columnsData" :data="infoData" ></Table>
          </div>
          <!--表格分页-->
          <div id="tablePage">
            <Page :total="infoData.length" show-sizer show-total show-elevator />
            <!--导出数据-->
            <div id="exportData">
              <button class="export-all btn-hover-large" @click="exportAll">导出全部数据</button>
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
              title: '',//标题
              statusData: [],
              columnsData: [],
              tableName: '',//表名
              infoData: [],
              tableData: {
                caseArea: {//区域分析(程序性公开)
                  statusData: ['案件总量','已公开','本系统已公开统一系统未公开','不公开'],
                  columns: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                  ],
                  infoData: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01'
                    }
                  ],
                  columnsShouldOpen: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                    {
                      title: '未公开原因',
                      key: 'result',
                      align: 'center',
                    },
                  ],
                  infoDataShouldOpen: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      result: '审结情况案卡里收到执行回执日期未填'
                    }
                  ],
                  //不公开
                  columnsNotOpen: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                    {
                      title: '文书数量',
                      key: 'docCount',
                      align: 'center',
                    },
                    {
                      title: '不公开原因',
                      key: 'result',
                      align: 'center',
                    },
                  ],
                  infoDataNotOpen: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '5',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '3',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '2',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    }
                  ],
                },
                docArea: {//区域分析(文书公开信息)
                  statusData: ['文书总量','已公开','本系统已公开统一系统未公开','不公开'],
                  columns: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                    {
                      title: '文书数量',
                      key: 'docCount',
                      align: 'center',
                    },
                  ],
                  infoData: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '5'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '3'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '2'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1'
                    }
                  ],
                  columnsShouldOpen: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                    {
                      title: '文书数量',
                      key: 'docCount',
                      align: 'center',
                    },
                    {
                      title: '未公开原因',
                      key: 'result',
                      align: 'center',
                    },
                  ],
                  infoDataShouldOpen: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '5',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '3',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '2',
                      result: '审结情况案卡里收到执行回执日期未填'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '审结情况案卡里收到执行回执日期未填'
                    }
                  ],
                  //不公开
                  columnsNotOpen: [
                    {
                      title: '序号',
                      key: 'order',
                      align: 'center',
                    },
                    {
                      title: '部门受案号',
                      key: 'caseId',
                      align: 'center',
                    },
                    {
                      title: '案件名称',
                      key: 'caseName',
                      align: 'center',
                    },
                    {
                      title: '承办部门',
                      key: 'department',
                      align: 'center',
                    },
                    {
                      title: '承办人',
                      key: 'people',
                      align: 'center',
                    },
                    {
                      title: '案件类别',
                      key: 'caseType',
                      align: 'center',
                    },
                    {
                      title: '当前阶段',
                      key: 'status',
                      align: 'center',
                    },
                    {
                      title: '受理日期',
                      key: 'receiveTime',
                      align: 'center',
                    },
                    {
                      title: '办结日期',
                      key: 'overTime',
                      align: 'center',
                    },
                    {
                      title: '完成日期',
                      key: 'completeTime',
                      align: 'center',
                    },
                    {
                      title: '文书数量',
                      key: 'docCount',
                      align: 'center',
                    },
                    {
                      title: '不公开原因',
                      key: 'result',
                      align: 'center',
                    },
                  ],
                  infoDataNotOpen: [
                    {
                      order: '1',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '2',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '5',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '3',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '3',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '4',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '5',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '2',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    },
                    {
                      order: '6',
                      caseId: '蕲检刑申受[2018]42112600001号',
                      caseName: '王晓能刑事申诉案',
                      department: '控告申诉',
                      people: '华菱',
                      caseType: '刑事申诉审查案件',
                      status: '流程结束',
                      receiveTime: '2018-01-01',
                      overTime: '2018-01-01',
                      completeTime: '2018-01-01',
                      docCount: '1',
                      result: '案由涉及刑法第120条或120条之一的罪名'
                    }
                  ],
                },
              }
            }
        },
      created() {
          var _this = this;
          this.$bus.$on('setTable',function(set) {
            _this.tableName = set.tableName;
            _this.title = set.title?set.title:'总计';
            _this.statusData = _this.tableData[set.tableName].statusData;
            _this.status = set.type;
            if(set.type=='本系统已公开统一系统未公开'){
              _this.infoData = _this.tableData[set.tableName].infoDataShouldOpen;
              _this.columnsData = _this.tableData[set.tableName].columnsShouldOpen;
            }else if(set.type=='不公开'){
              _this.infoData = _this.tableData[set.tableName].infoDataNotOpen;
              _this.columnsData = _this.tableData[set.tableName].columnsNotOpen;
            }else{
              _this.infoData = _this.tableData[set.tableName].infoData;
              _this.columnsData = _this.tableData[set.tableName].columns;
            }
          })
      },
      methods: {
        exportAll() {//导出数据
          let table = this.$refs.iTable;
          table.exportCsv({
            filename: 'testData'
          });
        },
        changeStatus(status) {//改变状态
          var _this = this;
          if(status=='本系统已公开统一系统未公开'){
            _this.infoData = _this.tableData[_this.tableName].infoDataShouldOpen;
            _this.columnsData = _this.tableData[_this.tableName].columnsShouldOpen;
          }else{
            _this.infoData = _this.tableData[_this.tableName].infoData;
            _this.columnsData = _this.tableData[_this.tableName].columns;
          }
        },
        closeTable() {//关闭表格
          this.$emit('closeTable');
        }
      },
        mounted() {
          let _this = this;
          this.setTableHeight(this);//设置表格高度
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
      #content-header {
        position: relative;
        font-size: 20px;
        height: 40px;
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
        height: calc(100% - 20px - 40px - 35px - 1px - 20px  - 65px);
      }
      /*表格分页*/
      #tablePage {
        position: relative;
        padding-top: 16px;
        height: 65px;
        #exportData {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translate(0,-50%);
        }
      }
    }
    z-index: 3000;
  }
</style>
