exports.install = function(Vue) {
  let currentObj = null;//当前vue实例
  /*设置表格高度*/
  Vue.prototype.setMainTableHeight = function(obj) {
    let mainSelect = obj.$refs.mainSelect;
    let mainPage = obj.$refs.mainPage;
    let mainTable = obj.$refs.mainTable;
    let mainBtn = obj.$refs.mainBtn;
    let height = 'calc(100% - '+mainSelect.offsetHeight + 'px - '+ mainPage.offsetHeight +'px)';
    mainTable.style.height = height;
    if(!mainBtn) {
      obj.tableHeight = mainTable.offsetHeight;
    }else {
      obj.tableHeight = mainTable.offsetHeight - mainBtn.offsetHeight;
    }
    currentObj = obj;
    console.log( getComputedStyle(mainSelect).height)
    window.addEventListener('resize',onWatchTableHeight);
  };
  function onWatchTableHeight() {
    currentObj.setMainTableHeight(currentObj);
  }
  /*绑定监听浏览器宽度改变设置表格高度*/
  Vue.prototype.onWatchTableHeight = function() {
    window.addEventListener('resize',onWatchTableHeight)
  };
  /*注销监听事件*/
  Vue.prototype.destroyWatchTableHeight = function() {
    window.removeEventListener('resize',onWatchTableHeight);
  }
};
