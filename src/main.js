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
import './plugins/zTree/css/metroStyle/metroStyle.css' //引入zTree的css
import './plugins/zTree/js/jquery-1.4.4.min' //引入jq (zTree)
import './plugins/zTree/js/jquery.ztree.core.min' //引入zTree核心js
import './plugins/zTree/js/jquery.ztree.exhide.min' //引入zTree扩展
import './script/webApi' //接口
import './script/format' //字符串格式化
import VueAMap from  'vue-amap' //引入地图组件
import axios  from 'axios'
/**/
import './../src/script/ajax' //ajax(测试用)
import '../static/json/jsonData' //数据(测试用)
const Bus = new Vue();

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = Bus;
Vue.prototype.axios = axios;
Vue.use(iView);
Vue.use(VueAMap);
Vue.use(common);
Vue.use(tableModal);
Vue.use(commonComp);
Vue.use(docShield);
VueAMap.initAMapApiLoader({
  key: '3bc7e1e821e9b3b5aa9618b34f86316b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


//axios请求拦截器
axios.interceptors.request.use(config=>{
  // console.log(router);
  if(router.history.current.path != '/'){
    if(localStorage.getItem('token')){
      config.headers.token = localStorage.getItem('token');
    }else{
      console.log("请先登录");
      // router.push({path:'/'});
    }
  }
  return config;
},err => {
  return Promise.reject(err);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
