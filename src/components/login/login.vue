<template>
    <div id="login">
        <div id="login-content">
          <!--logo-->
          <div id="login-logo">
            <img  src="../../assets/login/logo.png" alt="">
            <p>
              红蕲案件信息智慧
            </p>
            <p>
              公开系统
            </p>
          </div>
          <!--登录区-->
          <div id="login-input">
            <!--输入内容-->
            <div class="enter">
              <div class="enter-item">
                <img src="../../assets/login/company.png" alt="">
                <input type="text" placeholder="单位">
              </div>
              <div class="enter-item">
                <img src="../../assets/login/user.png" alt="">
                <input v-model="user" type="text" placeholder="请输入登录账号">
              </div>
              <div class="enter-item">
                <img src="../../assets/login/pwd.png" alt="">
                <input type="text" placeholder="输入您的密码">
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
              <button @click="login" class="login-btn">登录</button>
            </div>
            <!--登录按钮-->
          </div>
        </div>
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
          login() {//登录
            if(this.user=='张福珍'||this.user=='余俊') {
              localStorage.setItem('setAdmin',this.user);
              this.$router.push({path:'/index'});
            }else {
              this.$Message.warning('请正确输入账户名!');
            }
          }
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
      background: url('../../assets/login/loginBg.png') no-repeat;
      background-size: cover;
      /*box-shadow: 0 1px 1px 0 rgba(0,0,0,.5);*/
      #login-logo {
        position: relative;
        float: left;
        width: 461px;
        height: 100%;
        font-size: 38px;
        font-family: 'PingFang SC';
        font-weight: 600;
        color: rgba(255,255,255,1);
        text-shadow: 2px 3px 5px rgba(27,128,230,0.5);
        text-align: center;
        padding-bottom: 28px;
        padding-top: 82px;
        img {
          position: absolute;
          top: 0;
          left: 25px;
        }
        p {
          margin-top: 110px;
          &:last-child {
            margin-top: 15px;
          }
        }
      }
      #login-input {
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
          .login-btn {
            width: 289px;
            height: 45px;
            margin-top: 30px;
            margin-left: 4px;
            font-size: 16px;
            font-family: 'PingFangSC-Medium';
            font-weight: bolder;
            color: rgba(255,255,255,1);
            border: none;
            background: -webkit-linear-gradient(bottom,#2D67FF 0%,#4B91FF 100%);
          }
        }
      }
    }

  }

</style>
