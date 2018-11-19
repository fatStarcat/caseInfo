import tableModal from './tableModal'
import tableMenu from './tableMenu'
const table = {
  install: function(Vue) {
    Vue.component('tableModal',tableModal);
    Vue.component('tableMenu',tableMenu);
  }
};
export default table;
