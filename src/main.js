// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' //引入iview
import 'iview/dist/styles/iview.css'
import common from './../src/script/common' //公用方法
import commonMessage from './../src/script/messagePush/common' //信息推送公用方法
import echarts from 'echarts'
import tableModal from './components/public/countAnalysis/index'  //表格
import commonComp from './components/public/common/index' //公用组件(面包屑,选择项)
import docShield from './components/public/documentShield/index' //文书屏蔽修改标题
import './plugins/zTree/css/metroStyle/metroStyle.css' //引入zTree的css
import './plugins/zTree/js/jquery-1.4.4.min' //引入jq (zTree)
import './plugins/zTree/js/jquery.ztree.core.min' //引入zTree核心js
import './plugins/zTree/js/jquery.ztree.exhide.min' //引入zTree扩展
import './script/webApi' //接口
import './script/format' //字符串格式化
import './script/chartData' //图表对象
import './script/onMaximize'
import ExportJsonExcel from 'js-export-excel' //导出excel

import axios  from 'axios'

const Bus = new Vue();
let timer = null;
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
window.$echarts = echarts;
Vue.prototype.$bus = Bus;
Vue.prototype.axios = axios;
Vue.prototype.ExportJsonExcel = ExportJsonExcel;
Vue.use(iView);
Vue.use(common);
Vue.use(tableModal);
Vue.use(commonComp);
Vue.use(docShield);
Vue.use(commonMessage);


//axios请求拦截器
axios.interceptors.request.use(config=>{
  // console.log(router);
  if(router.history.current.path != '/'){
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token');
    }else{
      console.log("请先登录");
    }
  }
  return config;
},err => {
  return Promise.reject(err);
})
/*响应拦截*/
axios.interceptors.response.use(function (response) {
  if(response.data.code===-1) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function(){
      Bus.$Message.warning(response.data.errorMessage);
    },200)
  }
  return response
}, function (err) {
  if (err && err.response) {
    const status = err.response.status;
    switch (status) {
      case 400: err.message = '请求错误(400)' ;
                Bus.$Message.warning(err.message);
                break;
      case 401: err.message = '未授权，请重新登录(401)';
                Bus.$Message.warning(err.message);
                break;
      case 403: err.message = '拒绝访问(403)';
                  Bus.$emit('relModal',{
                    relShow: true
                  });
                break;
      case 404: err.message = '请求出错(404)';
                Bus.$Message.warning(err.message);
                break;
      case 408: err.message = '请求超时(408)';
                Bus.$Message.warning(err.message);
                break;
      case 500: err.message = '服务器错误(500)';
                Bus.$Message.warning(err.message);
                break;
      case 501: err.message = '服务未实现(501)';
                Bus.$Message.warning(err.message);
                break;
      case 502: err.message = '网络错误(502)';
                Bus.$Message.warning(err.message);
                break;
      case 503: err.message = '服务不可用(503)';
                Bus.$Message.warning(err.message);
                break;
      case 504: err.message = '网络超时(504)';
                Bus.$Message.warning(err.message);
                break;
      case 505: err.message = 'HTTP版本不受支持(505)';
                Bus.$Message.warning(err.message);
                break;
      default: err.message = `连接出错!`;
                const config = err.config;
                Bus.$emit('failModal',{
                  failShow: true,
                  config: config
                })
              ;
    }
  }else{
    const config = err.config;
    Bus.$Message.warning("无法连接服务器");
    console.dir(err)
    Bus.$emit('failModal',{
      failShow: true,
      config: config
    })
  }
  console.log(error,status);
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
