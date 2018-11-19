function myAjax(option) {
  let xhr;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  }else if(window.ActiveXObject) {
    xhr = new window.ActiveXObject();
  }else {
    console.log('升级浏览器');
  }
  if(xhr) {
    xhr.open(option.type,option.href,option.async);
    xhr.send(option.send?option.send:null);
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200) {
        let obj = JSON.parse(xhr.responseText);
        option.callback(obj);
      }
    }
  }
}
window.myAjax = myAjax;
