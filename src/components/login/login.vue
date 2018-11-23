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
                <input type="text" placeholder="单位" @keyup.enter="login">
              </div>
              <div class="enter-item">
                <img src="../../assets/login/user.png" alt="">
                <input v-model="user" type="text" placeholder="请输入登录账号" @keyup.enter="login">
              </div>
              <div class="enter-item">
                <img src="../../assets/login/pwd.png" alt="">
                <input type="text" placeholder="输入您的密码" @keyup.enter="login">
              </div>
            </div>
            <!--选择自动登录-->
            <div class="check-login">
              <div class="checkBtn">
                <div class="check">
                  <input type="checkbox" id="agree" class="checkbox" v-model="autoLogin" >
                  <label for="agree"></label>
                </div>
                <span>自动登录</span>
              </div>
              <button @click="login" class="login-btn">登&nbsp;&nbsp;录</button>
              <button  class="exit-btn" @click="close">退&nbsp;&nbsp;出</button>
            </div>
            <!--登录按钮-->
          </div>
        </div>
      <!--preload-->
      <div id="preloadOne"></div>
      <div id="preloadTwo"></div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data() {
          return {
            autoLogin: true,//自动登录
            user: '',//用户名
          }
      },
      methods: {
          close() {

          },
          login() {//登录
            if(this.user=='张福珍'||this.user=='余俊') {
              localStorage.setItem('setAdmin',this.user);
              this.$router.push({path:'/index'});
            }else {
              this.$Message.warning('请正确输入账户名!');
            }
          },
      },
      created() {
      },
      mounted() {

      }
    }
</script>

<style scoped lang="scss">
  #preloadOne {
    background: url("../../../static/images/index/mainBg.png")no-repeat -9999px -9999px;
  }
  #preloadTwo {
    background: url("../../../static/images/index/bg.jpg")no-repeat -9999px -9999px;
  }
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
      background: url('../../assets/login/loginBg.jpg') no-repeat;
      background-size: cover;
      border-radius: 10px;
      box-shadow: rgba(179,179,179,.72) 0 0 25px;
      #login-logo {
        position: relative;
        float: left;
        width: 461px;
        height: 100%;
        padding-bottom: 28px;
        padding-top: 82px;
      }
      #login-input {
        position: relative;
        float: right;
        width: 339px;
        height: 100%;

        .enter {
          width:297px;
          background:rgba(245,246,250,1);
          border:1px solid rgba(159, 184, 214, 1);
          box-shadow:1px 2px 7px 0 rgba(0, 0, 0, 0.25) inset;
          border-radius:6px;
          padding: 0 12px 0 14px;
          margin: 81px auto 0;
          .enter-item {
            position: relative;
            width: 100%;
            height: 50px;
            input {
              width: 100%;
              height: 100%;
              padding-left: 36px;
              border: none;
              border-bottom: 1px solid rgba(220,220,220,1);
              background: transparent;
              font-size: 16px;
              font-family: 'PingFangSC-Regular';
              font-weight:400;
              color:rgba(85,85,85,1);
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
          font-family: 'PingFangSC-Regular';
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

</style>
