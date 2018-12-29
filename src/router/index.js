import Vue from 'vue'
import Router from 'vue-router'

//登录
import login from '@/components/login/login'
//主页
import Index from '@/components/index/index' //主页

//功能区
  //实时提醒(主页)
import realTimeReminding from '@/components/pages/realTimeReminding/realTimeReminding'
  //实时提醒(程序信息公开信息表格)
import caseInfo from '@/components/pages/realTimeReminding/caseInfo'
  //实时提醒(法律文书公开信息表格)
import docInfo from '@/components/pages/realTimeReminding/docInfo'


//文书屏蔽(表格)主页/承办人
import documentShield from '@/components/pages/documentShield/documentShield'
//文书屏蔽(表格)主页/案管人员
import docShieldAdmin from '@/components/pages/documentShield/docShieldAdmin'
  //文书屏蔽(修订)
import revise from '@/components/pages/documentShield/revise'
  //文书屏蔽(拟制)
import drafting from '@/components/pages/documentShield/drafting'
  //文书屏蔽(审核)
import examine from '@/components/pages/documentShield/examine'
 //文书屏蔽(查看)
import look from '@/components/pages/documentShield/look'

  //统计分析
import countAnalysis from '@/components/pages/countAnalysis/countAnalysis' //统计分析
  //统计分析主页
import countAIndex from '@/components/pages/countAnalysis/countAIndex'
 //统计分析(程序性公开-区域分析)
import countCaseArea from '@/components/pages/countAnalysis/countCaseArea'
//统计分析(程序性公开-案件类型分析)
import countCaseType from '@/components/pages/countAnalysis/countCaseType'
//统计分析(程序性公开-检察官分析)
import countCaseInquisitor from '@/components/pages/countAnalysis/countCaseInquisitor'
//统计分析(文书公开信息-区域分析)
import countDocArea from '@/components/pages/countAnalysis/countDocArea'
//统计分析(文书公开信息-文书类型分析)
import countDocType from '@/components/pages/countAnalysis/countDocType'
//统计分析(文书公开信息-检察官分析)
import countDocInquisitor from '@/components/pages/countAnalysis/countDocInquisitor'


import infoExport from '@/components/pages/infoExport/infoExport' //信息导出
/*信息推送*/
import messagePush from '@/components/pages/messagePush/messagePush' //消息推送

/*案件受理通知*/
import CaseAcceptNotice from '@/components/pages/messagePush/caseAcceptNotice/caseAcceptNotice'
/*案件分配通知*/
import CaseAllotNotice from '@/components/pages/messagePush/caseAllotNotice/caseAllotNotice'
/*案件审结通知*/
import CaseConcludeNotice from '@/components/pages/messagePush/caseConcludeNotice/caseConcludeNotice'
/*自定义短信发送*/
import CustomMessageSend from '@/components/pages/messagePush/customMessageSend/customMessageSend'
/*通讯录管理*/
import MailListManage from '@/components/pages/messagePush/mailListManage/mailListManage'
/*短信模板管理*/
import MsgTemplateManage from '@/components/pages/messagePush/msgTemplateManage/msgTemplateManage'



import relevantRegulations from '@/components/pages/relevantRegulations/relevantRegulations' //相关规定
//查看pdf
import pdf from '@/components/pages/pdf/pdf'
Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/',
      name: login,
      component: login
    },
    //查看pdf
    {
      path: '/pdf',
      name: pdf,
      component: pdf
    },
    //主页
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        //实时提醒(主页)
        {
          path: '/',
          name: 'realTimeReminding',
          component: realTimeReminding,
        },
        //实时提醒(案件信息)
        {
          path: '/caseInfo',
          name: 'caseInfo',
          component: caseInfo,
        },
        //实时提醒(文书信息)
        {
          path: '/docInfo',
          name: 'docInfo',
          component: docInfo,
        },
        //文书屏蔽(表格)/承办人
        {
          path: '/documentShield',
          name: 'documentShield',
          component: documentShield,
        },
        //文书屏蔽(表格)/案管人员
        {
          path: '/docShieldAdmin',
          name: 'docShieldAdmin',
          component: docShieldAdmin,
        },
        //文书屏蔽(修订)
        {
          path: '/revise',
          name: 'revise',
          component: revise,
        },
        //文书屏蔽(拟制)
        {
          path: '/drafting',
          name: 'drafting',
          component: drafting,
        },
        //文书屏蔽(审核)
        {
          path: '/examine',
          name: 'examine',
          component: examine,
        },//文书屏蔽(查看)
        {
          path: '/look',
          name: 'look',
          component: look,
        },
        //统计分析
        {
          path: '/countAnalysis',
          name: 'countAnalysis',
          component: countAnalysis,
          children: [
            //统计分析(主页)
            {
              path: '/',
              name: 'countAIndex',
              component: countAIndex
            },
            //统计分析(程序性公开-区域分析)
            {
              path: '/countCaseArea',
              name: 'countCaseArea',
              component: countCaseArea
            },
            //统计分析(程序性公开-案件类型分析)
            {
              path: '/countCaseType',
              name: 'countCaseType',
              component: countCaseType
            },
            //统计分析(程序性公开-检察官分析)
            {
              path: '/countCaseInquisitor',
              name: 'countCaseInquisitor',
              component: countCaseInquisitor
            },
            //统计分析(文书公开信息-区域分析)
            {
              path: '/countDocArea',
              name: 'countDocArea',
              component: countDocArea
            },
            //统计分析(文书公开信息-文书类型分析)
            {
              path: '/countDocType',
              name: 'countDocType',
              component: countDocType
            },
            //统计分析(文书公开信息-检察官分析)
            {
              path: '/countDocInquisitor',
              name: 'countDocInquisitor',
              component: countDocInquisitor
            },
          ]
        },
        //信息导出
        {
          path: '/infoExport',
          name: 'infoExport',
          component: infoExport,
        },
        //消息推送
        {
          path: '/messagePush',
          name: 'messagePush',
          component: messagePush,
          children: [
            /*案件受理通知*/
            {
              path: '/',
              name: 'CaseAcceptNotice',
              component: CaseAcceptNotice
            },
            /*案件分配通知*/
            {
              path: '/CaseAllotNotice',
              name: 'CaseAllotNotice',
              component: CaseAllotNotice
            },
            /*案件审结通知*/
            {
              path: '/CaseConcludeNotice',
              name: 'CaseConcludeNotice',
              component: CaseConcludeNotice
            },
            /*自定义短信发送*/
            {
              path: '/CustomMessageSend',
              name: 'CustomMessageSend',
              component: CustomMessageSend
            },
            /*通讯录管理*/
            {
              path: '/MailListManage',
              name: 'MailListManage',
              component: MailListManage
            },
            /*短信模板管理*/
            {
              path: '/MsgTemplateManage',
              name: 'MsgTemplateManage',
              component: MsgTemplateManage
            },
          ]
        },
        //相关规定
        {
          path: '/relevantRegulations',
          name: 'relevantRegulations',
          component: relevantRegulations,
        }
      ]
    }
  ]
})
