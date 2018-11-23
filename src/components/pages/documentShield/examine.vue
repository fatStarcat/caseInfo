<template>
  <div id="examine">
    <div id="examine-content">
      <!--审核批复-->
      <div id="examine-result">
        <h3>审核批复</h3>
        <div id="timeLine">
          <Timeline>
            <TimelineItem color="#4589fd" v-for="item,index in timelineData" :key="index">{{item}}</TimelineItem>
          </Timeline>
        </div>
      </div>
      <!--编辑器-->
      <div id="editor-wrap">
        <my-bread :breadData="breadData"></my-bread>
        <!--标题-->
        <div class="docTitle">
          <div>{{docTitle}}<!--修改按钮--></div>
        </div>
        <!--内容区域-->
        <div id="editor-content">

        </div>
        <!--修订按钮-->
        <div class="examineBtn-wrap">
          <button class="examine-yes btn-tabDefault-large" @click="examineModal=true">审核通过</button>
          <button class="examine-no btn-reject-large" @click="examineModal=true">审核驳回</button>
        </div>

      </div>

    </div>
    <!--批复框-->
    <div class="modal-wrap"  v-show="examineModal">
      <div id="examineModal">
        <div class="exHeader-wrap">
          <div class="exHeader">
            批复
            <span class="closeExamine" @click="examineModal=false">
                <img src="../../../assets/documentShield/close.png" alt="">
              </span>
          </div>
        </div>
        <textarea  v-model="text" @input="changeTextarea" placeholder="请输入文字..."></textarea><br/>
        <router-link tag="button" to="/docShieldAdmin" :class="{hasText: text.length>0?true:false}" >确定</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import * as wangEditor from '../../../script/release/wangEditor'
  export default {
    name: "examine",
    data() {
      return {
        examineModal: false,//批复框显示
        text: '',//批复框内容
        breadData: ['文书屏蔽','审核'],
        docTitle: this.$route.query.title,
        editor: null,//富本文编辑器实例
        timelineData: [
          '10月3日：审核驳回——嫌疑人住址未屏蔽',
          '9月28日：审核驳回——嫌疑人白展昭姓名未屏蔽',
        ],//时间轴数据
      }
    },
    methods: {
      changeTextarea() {
      }
    },
    mounted() {
      var html = '<p><div style="text-align: center;">山东省临沂市兰山区人民检察院</div><div style="text-align: center;">不起诉决定书</div><div style="text-align: center;"><br></div><div style="text-align: right;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;临兰检刑不诉〔2014〕60号</div><br>&nbsp; &nbsp; &nbsp;&nbsp; 被不起诉人沈某甲，男，1973年**月**日出生，身份证号码3711221973********，汉族，大专文化，山东省莒县人，无业，住临沂市兰山区**街。2014年5月24日因涉嫌故意伤害罪被刑事拘留，同年5月29日被取保候审。本案由临沂市公安局兰山分局侦查终结，以被不起诉人沈某甲涉嫌故意伤害罪，于2014年7月21日向本院移送审查起诉。<br>&nbsp; &nbsp; &nbsp;&nbsp; 经本院依法审查查明：<br>&nbsp; &nbsp; &nbsp;&nbsp; 2014年4月15日7时许，被不起诉人沈某甲因其三姐沈某乙与丈夫杜某某离婚，陪沈某乙到临沂市兰山区**街杜某某单位宿舍拿衣服，与杜某某发生争执并厮打。厮打中，被不起诉人沈某甲用拳头击打杜某某面部等处，致杜某某头外伤后反应、全身多处软组织挫伤和皮肤损伤、左侧鼻骨及上颌骨额骨突骨折。经法医鉴定，杜某某的损伤构成轻伤二级。案发后，双方达成和解。<br>&nbsp; &nbsp; &nbsp;&nbsp; 本院认为，被不起诉人沈某甲实施了《中华人民共和国刑法》第二百三十四条规定的行为，构成故意伤害罪，但双方已和解，情节轻微，根据《中华人民共和国刑法》第三十七条、《中华人民共和国刑事诉讼法》第二百七十九条的规定，不需要判处刑罚。依照《中华人民共和国刑事诉讼法》第一百七十三条第二款的规定，决定对沈某甲不起诉。<br>被不起诉人如不服本决定，可以自收到本决定书后七日内向本院申诉。<br>被害人如不服本决定，可以自收到本决定书后七日以内向临沂市人民检察院申诉，请求提起公诉；也可以不经申诉，直接向临沂市兰山区人民法院提起自诉。<br><br><br><div style="text-align: right;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 临沂市兰山区人民检察院</div><div style="text-align: right;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 2014年8月20日</div></p>';
      this.initEditor(this,'#editor-content',wangEditor,html);
    }
  }
</script>

<style scoped lang="scss">

  #examine {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 35px;
    #examine-content {
      display: table;
      width: 100%;
      height: 100%;
      /*编辑器*/
      #editor-wrap {
        position: relative;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow:0 10px 12px 3px rgba(19,38,88,0.15);
        border-radius:10px;
        margin-right: 443px;
        padding: 24px;
        overflow-y: auto;
        .docTitle {//标题
          text-align: center;
          font-size:24px;
          font-family: 'PingFang-SC-Bold';
          font-weight:bold;
          color: rgba(85,85,85,1);
          margin-bottom: 20px;
          >div {
            position: relative;
            display: inline-block;
            width: auto;
            border: 1px solid transparent;
            padding: 0 16px;
            border-radius: 10px;
            outline: none;
          }
        }
        #editor-content {//富文本编辑器
          /*height: calc(100% - 62px - 33px);*/
          height: calc(100% - 104px - 40px);
        }
        .examineBtn-wrap {
          padding: 22px 15px 0;
          overflow: hidden;
          button {
            float: left;
          }
          .examine-no {//审核驳回
            float: right;
          }
        }
        /*批复框*/


      }
      /*审核批复*/
      #examine-result {
        float: right;
        width: 407px;
        height: 100%;
        background:rgba(255,255,255,1);
        box-shadow:0 10px 12px 3px rgba(12,37,95,0.15);
        border-radius:10px;
        padding: 39px 19px 19px 19px;
        overflow-y: auto;
        h3 {//审核批复标题
          font-size:24px;
          font-family:'PingFangSC-Medium';
          font-weight:500;
          color:rgba(0,0,0,1);
          text-align: center;
        }
        #timeLine {//时间轴
          margin-top: 30px;
          height: calc(100% - 30px - 36px);
          overflow-y: auto;
          font-size:14px;
          font-family:'PingFangSC-Semibold';
          font-weight:600;
          color:rgba(85,85,85,1);
        }
      }
    }
    .modal-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
      z-index: 2000;
      #examineModal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 311px;
        height: 241px;
        background: rgba(255,255,255,1);
        border-radius: 10px;
        z-index: 101;
        text-align: center;
        .exHeader-wrap {
          height:52px;
          background:rgba(69,137,253,.5);
          border-radius:10px;
          .exHeader {
            position: relative;
            height: 47px;
            line-height: 47px;
            background:rgba(69,137,253,1);
            border-radius: 10px;
            font-size:18px;
            font-family:'PingFang-SC-Medium';
            font-weight:500;
            color:rgba(255,255,255,1);
            /*关闭*/
            .closeExamine {
              position: absolute;
              right: 20px;
              top: 50%;
              transform: translate(0, -50%);
              cursor: pointer;
            }
          }
        }
        .hasText {
          background: #4589FD;
          color: white;
          box-shadow:0 2px 3px 0  rgba(126,228,249,0.4);
        }
        button {
          width: 70px;
          height: 30px;
          line-height: 30px;
          background: rgba(203,202,202,0.34);
          border-radius: 20px;
          font-size: 14px;
          font-family:'PingFang-SC-Regular';
          font-weight:400;
          color:rgba(153,153,153,1);
          border: none;
          margin-top: 7px;
        }
        textarea {
          width: 290px;
          height:128px;
          border:1px solid rgba(239,239,239,1);
          border-radius:10px;
          resize: none;
          margin-top: 12px;
          padding: 10px;
          outline: none;
          &::-webkit-input-placeholder {
            color:rgba(206,206,206,1);
          }
          &:focus {
            border:1px solid #4589FD;
          }
        }

      }
    }
  }
</style>
