import bread from './myBread'
import select from './selectItem'
import selectG from './selectGroup'
import myMenu from './myMenu'
import loading from './loading'
const commonComp = {
  install: function(Vue) {
    Vue.component('myBread',bread);
    Vue.component('myMenu',myMenu);
    Vue.component('selectItem',select);
    Vue.component('selectGroup',selectG);
    Vue.component('loading',loading);
  }
};
export  default  commonComp;
