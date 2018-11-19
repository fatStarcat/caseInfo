<template>
  <div id="drafting">
    <div id="drafting-content">
      <!--屏蔽内容-->
      <div id="shield-content">
        <h4>屏蔽</h4>
        <ul>
          <!--屏蔽人名-->
          <li class="shield-item">
            <div class="shield-name">
              人名
            </div>
            <div class="shield-change">
              <!--屏蔽前-->
              <div class="shield-before">
                <label>屏蔽前:</label>
                <Select  v-model="selectName" style="width:298px" @on-change="selectShield($event,'name')">
                  <Option v-for="item in shieldName" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </div>
              <!--屏蔽后-->
              <div class="shield-before">
                <label>屏蔽后:</label>
                <Input v-model="shieldNameAfter" placeholder="请输入屏蔽后内容" style="width: 298px" />
              </div>
            </div>
          </li>
          <!--屏蔽身份证-->
          <li class="shield-item">
            <div class="shield-name">
              身份证
            </div>
            <div class="shield-change">
              <!--屏蔽前-->
              <div class="shield-before">
                <label>屏蔽前:</label>
                <Select  v-model="selectIdCard" style="width:298px" @on-change="selectShield($event,'IdCard')">
                  <Option v-for="item in shieldIdCard" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </div>
              <!--屏蔽后-->
              <div class="shield-before">
                <label>屏蔽后:</label>
                <Input v-model="shieldIdCardAfter" placeholder="请输入屏蔽后内容" style="width: 298px" />
              </div>
            </div>
          </li>
          <!--屏蔽生日-->
          <li class="shield-item">
            <div class="shield-name">
              生日
            </div>
            <div class="shield-change">
              <!--屏蔽前-->
              <div class="shield-before">
                <label>屏蔽前:</label>
                <Select  v-model="selectBirth" style="width:298px" @on-change="selectShield($event,'birthday')">
                  <Option v-for="item in shieldBirth" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </div>
              <!--屏蔽后-->
              <div class="shield-before">
                <label>屏蔽后:</label>
                <Input v-model="shieldBirthAfter" placeholder="请输入屏蔽后内容" style="width: 298px" />
              </div>
            </div>
          </li>
          <!--屏蔽地址-->
          <li class="shield-item">
            <div class="shield-name">
              地址
            </div>
            <div class="shield-change">
              <!--屏蔽前-->
              <div class="shield-before">
                <label>屏蔽前:</label>
                <Select v-model="selectAddress" style="width:298px" @on-change="selectShield($event,'address')">
                  <Option  v-for="item in shieldAddress" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
              </div>
              <!--屏蔽后-->
              <div class="shield-before">
                <label>屏蔽后:</label>
                <Input v-model="shieldAddressAfter" placeholder="请输入屏蔽后内容" style="width: 298px" />
              </div>
            </div>
          </li>
        </ul>
        <!--按钮-->
        <div class="btn">
          <button class="reset-btn">重置</button>
          <!--<button class="save-btn">保存</button>-->
          <router-link  class="save-btn" tag="button" to="/documentShield">保存</router-link>
        </div>
      </div>
      <!--富文本编辑器-->
      <div id="editor-wrap">
        <my-bread :breadData="breadData"></my-bread>
        <!--标题-->
        <doc-title :docTitle="docTitle"></doc-title>
        <div id="editor">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as wangEditor from '../../../script/release/wangEditor'
  export default {
      name: "drafting",
      data() {
        return {
          breadData: ['文书屏蔽','拟制'],
          docTitle: this.$route.query.title,//文书名称
          editor: null,//富本文编辑器实例
          selectName: '白展堂',
          selectIdCard: '42212619630120021X',
          selectBirth: '1963年01月20日',
          selectAddress: '湖北省英山县石龙镇航空街镇',
          //人名
          shieldName: [//屏蔽人名数据
            {
              value: '白展堂',//屏蔽前
              shieldValue: '白某甲'//屏蔽后
            },
            {
              value: '白展昭',//屏蔽前
              shieldValue: '白某乙'//屏蔽后
            }
          ],
          shieldNameAfter: '白某甲',//屏蔽后名字
          //身份证
          shieldIdCard: [//屏蔽身份证数据
            {
              value: '42212619630120021X',//屏蔽前
              shieldValue: '4221261963********'//屏蔽后
            }
          ],
          shieldIdCardAfter: '4221261963********',//屏蔽后身份证
          //生日
          shieldBirth: [//屏蔽生日数据
            {
              value: '1963年01月20日',//屏蔽前
              shieldValue: '1963年**月**日'//屏蔽后
            }
          ],
          shieldBirthAfter: '1963年**月**日',//屏蔽后生日
          //地址
          shieldAddress: [//屏蔽地址数据
            {
              value: '湖北省英山县石龙镇航空街镇',//屏蔽前
              shieldValue: '湖北省英山县**镇**街'//屏蔽后
            }
          ],
          shieldAddressAfter: '湖北省英山县**镇**街',//屏蔽后地址
        }
      },
    mounted() {
      var html = '<p><div style="text-align: center;">湖北省黄冈市人民检察院</div><div style="text-align: center;"><br></div><div style="text-align: center;">刑事申诉复查决定书</div><br> <br><br><div style="text-align: right;">黄检控申刑申复决〔2018〕1号&nbsp; &nbsp;</div><br> <br><br>申诉人白某甲，男，1963年**月**日出生，身份证号码4221261963********，汉族，湖北省英山县**镇**街。系原案受害人。<br><br>原案被不起诉人柯某某，男，1958年**月**日出生，身份证号码4221261958********，汉族，住湖北省英山县**镇**街。<br><br>申诉人白某甲因柯某某涉嫌故意伤害罪一案，不服英山县人民检察院作出的英检公诉刑不诉[2017]3号不起诉决定，以柯某某的行为已经构成故意伤害罪，请求依法提起公诉追究其刑事责任为由，其在收到不起诉决定书后七日内向本院提出申诉。<br><br>本院复查查明：2017年10月6日早上，柯某某因与邻居白某甲、郭某某的房屋交界处屋角石头被挖一事，在白**、郭**家的院内与郭某某理论并发生争执，后发生肢体冲突，郭某某被柯某某甩倒在地。郭某某倒地后，柯某某与白某甲发生撕扭。与此同时，柯某某之子柯*、妻子彭**进入院内。柯某某、白某甲在相互扭扯中倒地。双方在扭扯中均有不同程度受伤。经鉴定，郭某某、白某甲人体损伤程度为轻伤，柯某某、彭**人体损伤程度为轻微伤。<br><br>本院复查认为，在案证据能够证明白某甲的伤情是在此次冲突过程中造成，但是被不起诉人柯某某及被害人郭某某、白某甲关于如何造成被害人的伤情各执一词，证人白某乙等证人证言能够证明当事人双方发生争执互殴，没有看到被害人受伤细节。综合全案证据，无法得出被害人的伤情是被不起诉人柯某某的伤害行为造成的唯一性、排他性的结论。认定柯某某的行为构成故意伤害罪的事实不清、证据不足，不符合提起公诉的证据标准。申诉人郭某某提出柯某某的行为构成故意伤害罪要求追究其刑事责任的意见缺乏事实及证据支持，不能成立。英山县人民检察院依据《中华人民共和国刑事诉讼法》第一百七十一条第四款规定，对柯某某作出不起诉决定正确。<br><br>本院决定：依据《人民检察院复查刑事申诉案件规定》第四十条第一项之规定，维持英山县人民检察院作出的英检公诉刑不诉[2017]3号不起诉决定。<br><br> <br><br> <br><br><div style="text-align: right;">2018年7月26日</div></p>';
      this.initEditor(this,'#editor',wangEditor,html);
    },
    methods: {
      selectShield(val,type) {//选择屏蔽信息
        var index;
        var shieldData = [];//屏蔽数据
        var shieldAfter = '';//屏蔽后名称
        if(type=='name') {//屏蔽人名
          shieldData = 'shieldName';
          shieldAfter = 'shieldNameAfter';
        }else if(type=='IdCard') {//屏蔽身份证
          shieldData = 'shieldIdCard';
          shieldAfter = 'shieldIdCardAfter';
        }else if(type=='birthday') {//屏蔽生日
          shieldData = 'shieldBirth';
          shieldAfter = 'shieldBirthAfter';
        }else if(type=='address') {//屏蔽地址
          shieldData = 'shieldAddress';
          shieldAfter = 'shieldAddressAfter';
        }
        for(let i = 0,len = this[shieldData].length; i < len; i++) {
          if(this[shieldData][i].value == val) {
            this[shieldAfter] = this[shieldData][i].shieldValue;
            return;
          }
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  #drafting {
    width: 100%;
    height: 100%;
    padding: 35px;
    #drafting-content {
      width: 100%;
      height: 100%;
      background:rgba(255,255,255,1);
      box-shadow:0 10px 12px 3px rgba(11,39,95,0.18);
      border-radius:10px;
      #editor-wrap {
        height: 100%;
        margin-right: 568px;
        padding: 24px;
        overflow-y: auto;
      }
      #editor {
        height: calc(100% - 42px - 40px);
      }

      #shield-content {//屏蔽内容
        position: relative;
        float: right;
        width: 568px;
        height: 100%;
        padding: 24px 24px 24px 0;
        h4 {
          text-align: center;
          font-size:18px;
          font-family:'PingFangSC-Medium';
          font-weight:500;
          color:rgba(98,98,98,1);
          margin-bottom: 15px;
        }
        .btn {//按钮
          position: absolute;
          bottom: 24px;
          left: 21px;
          button {
            width:151px;
            height:40px;
            background:-webkit-linear-gradient(bottom,rgba(255,161,150,1) 0%,rgba(255,121,149,1) 100%);
            border-radius:8px 8px 8px 8px;
            cursor: pointer;
            font-size:20px;
            font-family:'PingFangSC-Regular';
            font-weight:400;
            color:rgba(255,255,255,1);
            border: none;
          }
          .reset-btn {//重置按钮

          }
          .save-btn {//保存按钮
            margin-left: 109px;
            background:-webkit-linear-gradient(bottom,rgba(45,103,255,1) 0%,rgba(75,145,255,1) 100%);
          }
        }
        .shield-item {
          border-top: 1px solid rgba(223,223,223,1);
          padding: 17px 35px 20px;
          overflow: hidden;
          .shield-name {
            float: left;
            font-size:18px;
            font-family:'PingFangSC-Regular';
            font-weight:400;
            color:rgba(98,98,98,1);
          }
          .shield-change {
            float: right;
            .shield-before {
              margin-bottom: 13px;
            }
          }

        }
      }
    }
  }
</style>
