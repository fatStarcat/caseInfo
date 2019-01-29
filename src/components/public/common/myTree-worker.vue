<template>
  <div  id="myTree">
    <ul v-show="!loadComplete">
      <li>
        加载中
      </li>
    </ul>
    <div v-show="loadComplete">
      <ul   id="tree" class="ztree"></ul>
    </div>
  </div>
</template>

<script>
  import PinyinMatch from 'pinyin-match' //引入拼音检索
    export default {
        name: "my-tree",
      props:['api'],
      data() {
          return {
            isLoading: false,//
            zTreeObj: null,//zTree
            setting: {//zTree配置
              view: {
                showIcon: false,//不显示图标
              },
              callback: {
                onMouseDown: this.zTreeOnMouseDown //节点点击事件
              },
            },
            keywords: '',//关键字
            zNodes: [],//树级节点数据
            loadComplete: false,
            hideNodes: [],//隐藏节点
            isInitZTree: false,//初始化zTree完成
            timer: null,//计时器
          }
      },
      methods: {
        getUnits() {//获取单位信息
          let _this = this;
          let host = invoker.getServiceHost();//获取host地址
          let api = '';
          if(this.api=='sub') {
            api = 'GetSubUnits';
          }else {
            api = 'GetUnits';
          }
          host.then(function(hos){
            webApi.Host = hos;
            _this.axios.get(webApi.Host + webApi.SystemInfo[api])
              .then(function(res){
                ;
                let nodes = [];
                let root = {};//根节点
                let units = res.data.data;
                for(let i = 0 ;i < units.length; i++ ) {
                  let isRoot = false;//是否为根节点
                  let count = 0;
                  for(let j = 0; j < units.length;j++) {
                     if(units[i].FDWBM!=units[j].DWBM) {
                       count++;
                     }
                     if(count == units.length) {
                       isRoot = true;
                     }
                  }
                  if(isRoot) {
                    units[i].name = units[i].DWMC;
                    root = units[i];
                    nodes.push(root);
                  }
                  // if(!units[i].FDWBM&&units[i].DWBM==100000) {
                  //   units[i].name = units[i].DWMC;
                  //   // units[i].open = true;
                  //   root = units[i];
                  //   break
                  // }
                }
                // nodes.push(root);
                _this.setUnits(nodes,units);//设置单位
                _this.zNodes = nodes;
                _this.initZTree();

              })
              .catch(function(err){
                console.log(err);
              })
          })
        },
        setUnits(arr,units) {//设置单位
          let _this = this;
          for(let i = 0,len = arr.length;i < len ;i++) {
            arr[i].children = [];
            for(let j = 0; j < units.length; j++) {
              if(arr[i].DWBM == units[j].FDWBM ) {
                units[j].name = units[j].DWMC;
                // units[j].open = true;
                arr[i].children.push(units[j]);
              }
            }
            if(arr[i].children.length > 0) {
              _this.setUnits(arr[i].children,units);
            }else {
              delete arr[i].children
            }
          }
        },
        initZTree() {//初始化zTree
          let _this = this;
          this.zTreeObj = $.fn.zTree.init($('#tree'), _this.setting, _this.zNodes);
          this.zTreeObj.expandAll(true);
          this.isInitZTree = true;
        },
        searchUnits(){
          let _this = this;
          let type;
          this.loadComplete = false;
          if(!this.isInitZTree) {
            if(this.timer) {
              clearInterval(this.timer);
              this.timer = null;
            }
            this.timer = setInterval(function(){
              //console.log(1,_this.isInitZTree);
              if(_this.isInitZTree) {
                //console.log('timer',_this.timer);
                clearInterval(_this.timer);
                _this.timer = null;
                if(_this.keywords) {//有关键字
                  _this.searchUnits();
                }else {//没有关键字
                  _this.loadComplete = true;
                }
              }
            },100)
            return
          }
          setTimeout(function(){
            (_this.keywords)&&(type='search')
            _this.searchNodesPromise(type)
              .then(function(res){
                //console.log('promiseOver',res)
                _this.loadComplete = true;
              })
              .catch(function(err){
                console.log(err)
              })
          },100)

        },
        workerfilterZTree(data){
          if(worker){
            console.log(worker)
          }
          let worker = new Worker('../../../worker/filterZTree.js');
          let _this = this;
          worker.postMessage(data);
          worker.onmessage = function (e) {
            //console.log(e.data);
            _this.zTreeObj.showNodes(e.data);
            worker.terminate();//关闭
          }
          worker.onerror = function (e) { //worker错误
            console.log(e);
          }
        },
        searchNodesPromise(type) {//搜索节点
          let _this = this;
          let p = new Promise(function(resolve,reject){
            _this.zTreeObj.showNodes(_this.hideNodes);
            _this.hideNodes = [];
            if(type=='search') {
              let showNodes = _this.zTreeObj.getNodesByFilter(_this.filterHideNodes);
              let nodes = [];
              if(showNodes.length>0){
                _this.zTreeObj.hideNodes(_this.hideNodes);
                // _this.workerfilterZTree(showNodes)
                // for(let i = 0,len = showNodes.length; i < len ; i++) {
                //   let pathOfOne = showNodes[i].getPath();
                //   for(let j = 0,len = pathOfOne.length; j < len; j++) {
                //     nodes.push(pathOfOne[j]);
                //   }
                // }
                // _this.zTreeObj.showNodes(nodes);
              }
            }
            resolve('over');
          })
          return p;
        },
        filterHideNodes(node) {//过滤匹配的节点
          if(PinyinMatch.match(node.name, this.keywords)) {
            return true;
          }
          this.hideNodes.push(node);
          return false;//
        },
        zTreeOnMouseDown(e,treeId,treeNode) {//节点点击
          if(treeNode.hasOwnProperty('name')) {
            let company = {
              name: treeNode.name,
              DWBM: treeNode.DWBM
            };
            this.$emit('selectUnits',{company:company});
            event.preventDefault();
          }
        },
      },
      created() {
          let _this = this;
          this.$bus.$on('searchUnits',function(val){
            _this.keywords = val.keywords;
            _this.searchUnits();
          })
      },
      mounted() {
          this.getUnits();//获取单位
      }
    }
</script>

<style scoped lang="scss">
  #myTree {
    position: absolute;
    width: 100%;
    max-width: 400px;
    max-height: 250px;
    height: auto;
    background: #fff;
    overflow-y: auto;
    margin: 5px 0;
    padding: 5px 0;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    z-index: 900;
    li {
      margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: #515a6e;
      font-size: 12px!important;
      white-space: nowrap;
      list-style: none;
      transition: background .2s ease-in-out;
    }
  }
</style>
