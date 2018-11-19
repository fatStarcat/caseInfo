import bread from './myBread'
const myBread = {
  install: function(Vue) {
    Vue.component('myBread',bread);
  }
};
export  default  myBread;
