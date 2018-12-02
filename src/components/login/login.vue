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
                <!--<input @click.stop="filterCompany"  @blur="blurSelectCompany" @input="filterCompany" v-model="company" type="text" placeholder="单位" @keyup.enter="login">-->
                <input class="focusCompany" ref="inputCompany"     @click.stop="searchNodes"  v-model="company.name" type="text" placeholder="请输入单位" @keyup.enter="searchNodes">
                <!--搜索按钮-->
                <span   v-show="showCompany"  @click="searchNodes" class="searchBtn focusCompany">
                  <img src="../../assets/login/search.png" alt="">
                </span>
                <div ref="selectCompany" class="select-company" v-show="showCompany">
                  <ul  v-show="!loadComplete">
                    <li>加载中</li>
                  </ul>
                  <ul v-show="loadComplete" id="tree" class="ztree"></ul>
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
      <!--preload-->
      <div id="preloadOne"></div>
      <div id="preloadTwo"></div>
    </div>
</template>

<script>
  import PinyinMatch from 'pinyin-match' //引入拼音检索
    export default {
        name: "login",
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
            zNodes: [
             {name:"河南",
                open:true,
                children:[
                  {name:"白州"},
                  {name:"蕲春"}
                ]
              },
              {name:"北京",
                open:true,
                children:[
                  {
                    name:"三里屯",
                    open:true,
                    children:[
                      {name:"成都"},
                      {name:"重庆"}
                    ]
                  },
                  {name:"白洋淀"}
                  ]
              }
            ],
            loadComplete: false,
            hideNodes: [],//隐藏节点
            keywords: '',//搜索关键字
            rememberAccount: true,//记住账号
            user: '',//用户名
            password: '',//密码
            company: {//单位
              name: '',
              DWBM: '',//单位编码
            },
            showCompany: false,//显示单位
            isSeachNodes: false,//是否搜索
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
            this.loadComplete = true;
          },
          searchNodes(type) {//搜索节点
            this.showCompany = true;
            if(this.loadComplete) {
              let _this = this;
              this.zTreeObj.showNodes(this.hideNodes);
              this.hideNodes = [];
              if(type!='input') {
                let showNodes = this.zTreeObj.getNodesByFilter(this.filterHideNodes);
                console.log(showNodes);
                for(let i = 0; i < showNodes.length ; i++) {
                  let pathOfOne = showNodes[i].getPath();
                  console.log(pathOfOne);
                  for(let j = 0; j < pathOfOne.length; j++) {
                    _this.zTreeObj.showNode(pathOfOne[j]); //显示节点
                    _this.zTreeObj.expandNode(pathOfOne[j],true); //展开节点
                  }
                }
              }
            }
          },
          filterHideNodes(node) {//过滤匹配的节点
            if(PinyinMatch.match(node.name, this.company.name)) {
              return true;
            }
            this.hideNodes.push(node);
            this.zTreeObj.hideNode(node);
            return false;//
          },
          zTreeOnMouseDown(e,treeId,treeNode) {//节点点击
            if(treeNode.name) {
              this.company.name = treeNode.name;
              this.company.DWBM = treeNode.DWBM;
              this.showCompany = false;
              this.keywords = "";
              this.$refs.selectCompany.scrollTop = 0;
              event.preventDefault();
            }
          },
          blurSelectCompany() {
            this.showCompany = false;
            this.$refs.selectCompany.scrollTop = 0;
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
                setUnits(nodes);
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
                _this.zNodes = nodes;
                _this.initZTree();
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
  /*#preloadOne {
    background: url("../../../static/images/index/mainBg.png")no-repeat -9999px -9999px;
  }
  #preloadTwo {
    background: url("../../../static/images/index/bg.jpg")no-repeat -9999px -9999px;
  }*/
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
    .select-data {
      li {
        cursor: pointer;
        &:hover {
          background-color: #F3F3F3;
        }
      }
    }
  }

</style>
