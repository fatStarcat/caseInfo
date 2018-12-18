import tableModal from './tableModal'
import tableMenu from './tableMenu'
import rankChart from './rankChart'
const table = {
  install: function(Vue) {
    Vue.component('tableModal',tableModal);
    Vue.component('tableMenu',tableMenu);
    Vue.component('rankChart',rankChart);
  }
};
export default table;
