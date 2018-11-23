import bread from './myBread'
import select from './selectItem'
import selectG from './selectGroup'
import myMenu from './myMenu'
const commonComp = {
  install: function(Vue) {
    Vue.component('myBread',bread);
    Vue.component('myMenu',myMenu);
    Vue.component('selectItem',select);
    Vue.component('selectGroup',selectG);
  }
};
export  default  commonComp;
