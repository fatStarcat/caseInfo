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
  //案件不公开
import caseNotOpen from '@/components/pages/realTimeReminding/caseNotOpen'
  //案件已公开
import caseOpen from '@/components/pages/realTimeReminding/caseOpen'
  //案件未公开
import caseUndisclosed from '@/components/pages/realTimeReminding/caseUndisclosed'
  //实时提醒(法律文书公开信息表格)
  //文书不公开
import docNotOpen from '@/components/pages/realTimeReminding/docNotOpen'
  //文书已公开
import docOpen from '@/components/pages/realTimeReminding/docOpen'
  //文书未公开
import docUndisclosed from '@/components/pages/realTimeReminding/docUndisclosed'

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
import messagePush from '@/components/pages/messagePush/messagePush' //消息推送
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
        //实时提醒(案件不公开)
        {
          path: '/caseNotOpen',
          name: 'caseNotOpen',
          component: caseNotOpen,
        },
        //实时提醒(案件已公开)
        {
          path: '/caseOpen',
          name: 'caseOpen',
          component: caseOpen,
        },
        //实时提醒(未公开)
        {
          path: '/caseUndisclosed',
          name: 'caseUndisclosed',
          component: caseUndisclosed,
        },
        //实时提醒(文书不公开)
        {
          path: '/docNotOpen',
          name: 'docNotOpen',
          component: docNotOpen,
        },
        //实时提醒(文书公开)
        {
          path: '/docOpen',
          name: 'docOpen',
          component: docOpen,
        },
        //实时提醒(文书应公开未公开)
        {
          path: '/docUndisclosed',
          name: 'docUndisclosed',
          component: docUndisclosed,
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
