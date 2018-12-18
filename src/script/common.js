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
      // console.log(_this.editor.txt.error());
    };
    obj.editor.create();//生成编辑器
    obj.editor.txt.html(html);
  }
  Vue.prototype.getCurrentTime = function() {//获取当前时间
    let cDate = new Date();//当前时间
    let date = new Date(cDate.getTime() + 86400000);//多一天时间
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = timeFormat(month);
    day = timeFormat(day);
    hours = timeFormat(hours);
    minutes = timeFormat(minutes);
    seconds = timeFormat(seconds);
    function timeFormat(time) {
      if(time < 10) {
        return '0' + time;
      }else {
        return time;
      }
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  Vue.prototype.getStartTime = function() {//获取开始时间
    let date = new Date();
    let year = date.getFullYear();
    // let month = date.getMonth() + 1;
    // (month < 10)&&(month = '0' + month)
    // let startTime = `${year}-${month}-01 00:00:00`;
    let startTime = `${year}-01-01 00:00:00`;
    return startTime;
  }

// 黄冈下区县单位编码
  Vue.prototype.unitsCode = {
    '黄冈市院': 421100,
    "蕲春县" :421126,
    "红安县" :421122,
    "团风县" :421121,
    "浠水县" :421125,
    "武穴市" :421182,
    "麻城市" :421181,
    "黄梅县" :421127,
    "黄州区": 421102,
    "罗田县" :421123,
    "英山县" :421124,
  }
  //排序->降序
  Vue.prototype.compare = function(property) {
    return function(pre,next) {
      let preVal = pre[property];
      let nextVal = next[property];
      return  nextVal -  preVal;
    }
  }
}
