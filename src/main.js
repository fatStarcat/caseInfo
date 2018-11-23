// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' //引入iview
import 'iview/dist/styles/iview.css'
import common from './../src/script/common' //公用方法

import echarts from 'echarts'
import tableModal from './components/public/countAnalysis/index'  //表格
import commonComp from './components/public/common/index' //公用组件(面包屑,选择项)
import docShield from './components/public/documentShield/index' //文书屏蔽修改标题
import './../src/script/ajax' //ajax(测试用)
import '../static/json/jsonData' //数据(测试用)
const Bus = new Vue();
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = Bus;
Vue.use(iView);
Vue.use(common);
Vue.use(tableModal);
Vue.use(commonComp);
Vue.use(docShield);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
