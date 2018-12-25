<template>
    <div class="modal-wrap">
      <div id="reLogin">
        <!--标题-->
         <div class="rel-title">
           登录过期，请重新登录!
         </div>
          <div class="rel-content">

            <!--输入内容-->
            <div class="enter">
              <div class="enter-item">
                <img src="../../assets/login/company.png" alt="">
                <input  class="focusCompany" readonly   :value="company.name" type="text" />
              </div>
              <div class="enter-item">
                <img src="../../assets/login/user.png" alt="">
                <input  :value="user" type="text" readonly>
              </div>
              <div class="enter-item">
                <img src="../../assets/login/pwd.png" alt="">
                <input type="password" v-model="password" placeholder="输入您的密码" @keyup.enter="reLogin">
              </div>
            </div>
            <!--按钮-->
            <div class="rel-btn">
              <button class="confirm" @click="reLogin">登录</button>
              <button class="cancel"  @click="cancel">取消</button>
            </div>
          </div>
        <!--loading-->
        <loading  type="b" :width="70" :height="70" :isLoading="isLoading"></loading>
      </div>
    </div>
</template>

<script>
  import md5 from 'js-md5'
    export default {
      data() {
          return {
            company: {//单位
              name: JSON.parse(localStorage.getItem('userInfo')).Unit.DWMC,//单位名称
              DWBM: JSON.parse(localStorage.getItem('userInfo')).Unit.DWBM,//单位编码
            },
            user: JSON.parse(localStorage.getItem('userInfo')).MC,//用户名
            // company: {//单位
            //   name: '',//单位名称
            //   DWBM: '',//单位编码
            // },
            // user: '',//用户名
            passwrod: '',//密码
            isLoading: false,//加载显示
          }
      },
      methods: {
        reLogin() {//重新登录
          let _this = this;
          let password = md5(this.password);
          this.isLoading = true;
          this.axios.get(webApi.Auth.Login.format({
            unit: _this.company.DWBM,
            userName: _this.user,
            password: password
          })).then(function(res){
            if(res.data.code==0) {
              let token = res.data.data;
              localStorage.setItem('token',token);
              console.log(_this.$route)
              location.reload();
              _this.isLoading = false;
            }else {
              _this.$Message.warning(res.data.errorMessage);
              _this.isLoading = false;
            }
          }).catch(function(err){
            _this.$Message.warning('登录失败!');
            _this.isLoading = false;
            console.log(err)
          })
        },
        cancel() {//取消
          this.password = "";
          this.$emit('cancel');
        }
      },
      created(){

      }
    }
</script>

<style scoped lang="scss">
 #reLogin {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
   width: 360px;
   text-align: center;
   border-radius:10px;
   box-shadow: 0 0 10px rgba(75,73,73,0.18);
   .rel-title {
     height:112px;
     line-height: 112px;
     font-size:24px;
     font-family:'PingFang-SC-Bold';
     font-weight:bold;
     color:rgba(255,255,255,1);
     background: url('../../../static/images/index/bg.jpg') no-repeat;
     background-size: cover;
     border-radius:10px 10px 0 0;
   }
   .rel-content {
     height: 270px;
     padding-top: 20px;
     background-color: #fff;
     border-radius:0 0 10px 10px;
     .enter {
       width: 297px;
       background: #fff;
       box-shadow:1px 2px 7px 0 rgba(0, 0, 0, 0.25) inset;
       border-radius:6px;
       padding: 0 12px 0 14px;
       margin: 0 auto 48px;
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
     /*按钮*/
     .rel-btn {
      button {
        width: 92px;
        height: 28px;
        line-height: 28px;
        border: 1px solid rgba(69,137,253,1);
        border-radius: 14px;
        font-size: 20px;
        font-family:'PingFang-SC-Regular';
        font-weight:400;
        color:rgba(51,51,51,1);
        background-color: transparent;
        &:hover {
          cursor: pointer;
          background: rgba(69,137,253,1);
          color: rgba(255,255,255,1);
        }
      }
       .confirm {
         margin-right: 33px;
       }
       .cancel {
         margin-left: 33px;
       }
     }
   }
 }
</style>
