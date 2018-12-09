<template>
    <div id="login" ref="login">
        <div id="login-content">
          <!--logo-->
          <div id="login-logo">

          </div>
          <!--登录区-->
          <div id="login-input">

            <!--输入内容-->
            <div class="enter">
              <div class="enter-item">
                <img src="../../assets/login/company.png" alt="">
                <input id="keyword" class="focusCompany" ref="inputCompany" @focus="searchNodes"   v-model="company.name" type="text" placeholder="请输入单位" @keyup.enter="searchNodes"/>
                <!--搜索按钮-->
                <!--<span   v-show="showCompany"  @click="searchNodes" class="searchBtn focusCompany">-->
                  <!--<img src="../../assets/login/search.png" alt="">-->
                <!--</span>-->
                <div  class="select-company" v-show="showCompany">
                  <ul v-show="!loadComplete">
                    <li>
                      加载中
                      <!--<span>-->
                        <!--<loading :width="18" :height="18" :isLoading="true"></loading>-->
                      <!--</span>-->
                    </li>
                  </ul>
                  <div v-show="loadComplete">
                    <ul   id="tree" class="ztree"></ul>
                  </div>
                </div>
              </div>
              <div class="enter-item">
                <img src="../../assets/login/user.png" alt="">
                <input ref="userInput" v-model="user" type="text" placeholder="请输入登录账号" @keyup.enter="login">
              </div>
              <div class="enter-item">
                <img src="../../assets/login/pwd.png" alt="">
                <input type="text" v-model="password" placeholder="输入您的密码" @keyup.enter="login">
              </div>
            </div>
            <!--选择自动登录-->
            <div class="check-login">
              <div class="checkBtn">
                <div class="check">
                  <input type="checkbox" id="agree" class="checkbox" v-model="rememberAccount" >
                  <label for="agree"></label>
                </div>
                <span>记住账号</span>
              </div>
              <button @click="login" class="login-btn">登&nbsp;&nbsp;录</button>
              <button  class="exit-btn" @click="close">退&nbsp;&nbsp;出</button>
            </div>
            <!--登录按钮-->
          </div>
          <!--loading-->
          <loading :width="70" :height="70" :isLoading="isLoading"></loading>
        </div>
    </div>
</template>

<script>
  import PinyinMatch from 'pinyin-match' //引入拼音检索
    export default {
        name: "login-old",
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
            zNodes: [],//树级节点数据
            loadComplete: false,
            hideNodes: [],//隐藏节点
            rememberAccount: true,//记住账号
            user: '',//用户名
            password: '',//密码
            company: {//单位
              name: '',
              DWBM: '',//单位编码
            },
            showCompany: false,//显示单位
            isInitZTree: false,//初始化zTree完成
            timer: null,//计时器
          }
      },
      methods: {
          listenClick(e) {//监听点击
            if(!(e.target.parentNode.className=="searchBtn focusCompany" ||e.target.className=='focusCompany' ||e.target.outerHTML.indexOf('treenode_switch') > -1)) {
              this.blurSelectCompany();
            }
          },
          initZTree() {//初始化zTree
            let _this = this;
            this.zTreeObj = $.fn.zTree.init($('#tree'), _this.setting, _this.zNodes);
            this.zTreeObj.expandAll(true);
            this.isInitZTree = true;
          },
          searchNodes(){
            let _this = this;
            let type;
            this.showCompany = true;
            this.loadComplete = false;
            if(!this.isInitZTree) {
              if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
              this.timer = setInterval(function(){
                console.log(1,_this.isInitZTree);
                if(_this.isInitZTree) {
                  console.log('timer',_this.timer);
                  clearInterval(_this.timer);
                  _this.timer = null;
                  if(_this.company) {//有关键字
                    _this.searchNodes();
                  }else {//没有关键字
                    _this.loadComplete = true;
                  }
                }
              },100)
              return
            }
            setTimeout(function(){
              (_this.company)&&(type='search')
              _this.searchNodesPromise(type)
                .then(function(res){
                  console.log('promiseOver',res)
                  _this.loadComplete = true;
                })
                .catch(function(err){
                  console.log(err)
                })
            },100)

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
                  for(let i = 0; i < showNodes.length ; i++) {
                    let pathOfOne = showNodes[i].getPath();
                    for(let j = 0; j < pathOfOne.length; j++) {
                      nodes.push(pathOfOne[j]);
                    }
                  }
                  _this.zTreeObj.showNodes(nodes);
                }
              }
              resolve('over');
            })
            return p;
          },
          filterHideNodes(node) {//过滤匹配的节点
            if(PinyinMatch.match(node.name, this.company.name)) {
              return true;
            }
            this.hideNodes.push(node);
            return false;//
          },
          zTreeOnMouseDown(e,treeId,treeNode) {//节点点击
            if(treeNode.hasOwnProperty('name')) {
              this.company.name = treeNode.name;
              this.company.DWBM = treeNode.DWBM;
              this.showCompany = false;
              event.preventDefault();
            }
          },
          blurSelectCompany() {
            this.showCompany = false;
          },
          close() {
            invoker.exit();
          },
        getUnits() {//获取单位信息
          let _this = this;
          let host = invoker.getServiceHost();//获取host地址
          console.log(invoker)
          host.then(function(hos){
            webApi.Host = hos;
            _this.axios.get(webApi.Host + webApi.SystemInfo.GetUnits)
              .then(function(res){
                console.log(res);
                let nodes = [];
                let root = {};//根节点
                let units = res.data.data;
                for(let i = 0 ;i < units.length; i++ ) {
                  if(!units[i].FDWBM&&units[i].DWBM==100000) {
                    units[i].name = units[i].DWMC;
                    // units[i].open = true;
                    root = units[i];
                    break
                  }
                }
                nodes.push(root);
                setUnits(nodes);//设置单位
                _this.zNodes = nodes;
                _this.initZTree();
                function setUnits(arr) {
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
                      setUnits(arr[i].children);
                    }else {
                      delete arr[i].children
                    }

                  }
                }

              })
              .catch(function(err){
                console.log(err);
              })
          })
        },
        getUserInfo(token,callback) {//获取角色身份
            let _this = this;
          _this.axios({
            method: 'get',
            url: webApi.Host + webApi.Auth.GetCurrentUser,
            headers: {token:token}
          }) .then(function(res){
            console.log(res)
            if(res.data.code==0) {
              let userInfo = res.data.data;
              if(userInfo.JS=='案管人员'){
                userInfo.JS = '案管人员';
              }else if(userInfo.JS=='承办人') {
                userInfo.JS = '承办人';
              }else if(userInfo.JS=='管理员') {
                userInfo.JS = '管理员';
              }
              localStorage.setItem('userInfo',JSON.stringify(userInfo));
              callback();
            }
          })
            .catch(function(err){
              console.log(err)
            })
        },
          login() {//登录
            let _this = this;
            this.isLoading = true;
            this.axios.get(webApi.Auth.Login.format({
              unit: this.company.DWBM,
              userName: this.user,
              password: this.password
            })).then(function(res){
              if(res.data.code==0) {
                let token = res.data.data;
                let callback = function(){
                  invoker.login(token)
                    .then((message) => {
                      console.log(message);
                      if(message==-1) {
                        this.$Message.warning('登录失败!');
                      }
                      _this.isLoading = false;
                    });
                }
                localStorage.setItem('token',token);
                localStorage.setItem('setAdmin',_this.user);
                _this. getUserInfo(token,callback);
              }else {
                _this.$Message.warning(res.data.errorMessage);
                _this.isLoading = false;
              }
            }).catch(function(err){
              _this.$Message.warning('登录失败!');
              _this.isLoading = false;
              console.log(err)
            })
            // invoker.login(this.user, this.password)
            //   .then((message) => {
            //     console.log(message);
            //     if(message==-1) {
            //       this.$Message.warning('请正确输入账户名和密码!');
            //     }
            //   });
          },
      },
      created() {
        if(this.rememberAccount) { //添加账号和单位信息
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          if(userInfo) {
            this.user = userInfo.MC;
            this.company.name = userInfo.Unit.DWMC;
            this.company.DWBM = userInfo.Unit.DWBM;
          }
        }
      },
      mounted() {
        window.addEventListener('click',this.listenClick);
        this.getUnits();
      },
      beforeDestroy() {
        window.removeEventListener('click',this.listenClick);
      }
    }
</script>

<style scoped lang="scss">
  #login {
    position: relative;
    width: 100%;
    height: 100%;
    #login-content {
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 800px;
      height: 450px;
      background: url('../../assets/login/loginBgT.png') no-repeat;
      background-size: cover;
      #login-logo {
        position: relative;
        float: left;
        width: 460px;
        height: 100%;
        padding-bottom: 28px;
        padding-top: 82px;
      }
      #login-input {
        position: relative;
        float: left;
        width: 340px;
        height: 100%;
        .enter {
          width:297px;
          background: #fff;
          box-shadow:1px 2px 7px 0 rgba(0, 0, 0, 0.25) inset;
          border-radius:6px;
          padding: 0 12px 0 14px;
          margin: 81px auto 0;
          .enter-item {
            position: relative;
            width: 100%;
            height: 50px;
            .searchBtn {//搜索按钮
              position: absolute;
              top: 50%;
              right: 30px;
              transform: translate(0,-50%);
              img {
                width: 20px;
                height: 20px;
              }
              &:hover {
                cursor: pointer;
              }
            }
            input{
              width: 100%;
              height: 100%;
              padding-left: 36px;
              padding-right: 30px;
              border: none;
              border-bottom: 1px solid rgba(220,220,220,1);
              background: transparent;
              font-size: 16px;
              font-family: 'PingFang-SC-Regular';
              font-weight:400;
              color:rgba(85,85,85,1);
              &:first-child {
                &:after {
                  content: ''
                }
              }
              &::-webkit-input-placeholder {
                color:rgba(85,85,85,.6);
                font-size: 14px;
              }
              &::-moz-placeholder {
                color:rgba(85,85,85,.6);
                font-size: 14px;
              }
              &:-moz-placeholder {
                color:rgba(85,85,85,.6);
                font-size: 14px;
              }
              &:-ms-input-placeholder {
                color:rgba(85,85,85,.6);
                font-size: 14px;
              }
              &:nth-child(3) {
                border: none;
              }
            }
            img {
              position: absolute;
              top: 50%;
              left: 5px;
              transform: translate(0,-50%);
            }
          }
        }
        //自动登录
        .check-login {
          width: 297px;
          margin: 44px auto 0;
          font-family: 'PingFang-SC-Regular';
          font-weight: 400;
          color: rgba(70,70,70,1);
          .checkBtn {
            margin-left: 5px;
            .check {
              display: inline-block;
              vertical-align: middle;
              .checkbox {
                display: none;
              }
              .checkbox + label {
                position: relative;
                display: block;
                /*float: left;*/
                width: 18px;
                height: 18px;
                border-radius: 3px;
                background-color: #fff;
                cursor: pointer;
              }
              .checkbox:checked + label:after {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 10px;
                height: 10px;
                border-radius: 2px;
                background:rgba(40,131,202,1);
              }
            }
            span {
              display: inline-block;
              vertical-align: middle;
            }
          }
          button {
            width: 125px;
            height: 40px;
            font-size: 18px;
            font-family: 'PingFang-SC-Medium';
            font-weight: 500;
            border-radius: 20px;
            border: none;
            margin-top: 25px;
          }
          .login-btn {
            float: left;
            background: rgba(69,137,253,1);
            color: rgba(255,255,255,1);
            box-shadow:  0 0 16px rgba(77,137,238,.64);
          }
          .exit-btn {
            float: right;
            background:rgba(255,255,255,1);
            color:rgba(69,137,253,1);
            box-shadow:  0 0 16px rgba(208,208,208,.64);
          }
        }
      }
    }

  }
  /*单位下拉框*/
  .select-company {
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
