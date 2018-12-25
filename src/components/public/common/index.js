import bread from './myBread'
import select from './selectItem'
import selectG from './selectGroup'
import myMenu from './myMenu'
import loading from './loading'
import myModal from './myModal'
import myTree from './myTree'
import noData from './noDataTip'
const commonComp = {
  install: function(Vue) {
      Vue.component('myBread',bread);
      Vue.component('myMenu',myMenu);
      Vue.component('selectItem',select);
      Vue.component('selectGroup',selectG);
      Vue.component('loading',loading);
      Vue.component('myModal',myModal);
      Vue.component('myTree',myTree);
      Vue.component('noData',noData);
  }
};
export  default  commonComp;
