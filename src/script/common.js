exports.install = function(Vue) {
  Vue.prototype.setTableHeight = function(obj) {//设置表格高度
    if(obj.$refs.table) {
      var table = obj.$refs.table;
      obj.tableHeight = table.offsetHeight;
      // window.removeEventListener('resize');
      // window.addEventListener('resize',function(){
      //   obj.setTableHeight(obj);//设置表格高度
      //   console.log(obj)
      // })
    }
  };
  Vue.prototype.initEditor = function(obj,id,editorObj,html) {//初始化富文本编辑器
    var _this = obj;
    var E = editorObj.wangEditor;
    html = html || "";
    obj.editor = new E(id);
    obj.editor.change = function() {
      if(!obj.isEdit) {
        obj.isEdit = true;
      }
      // console.log(_this.editor.txt.html());
    };
    obj.editor.create();//生成编辑器
    obj.editor.txt.html(html);
  }
}
