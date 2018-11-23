<template>
    <div id="relRegulations">
      <div id="relContent">
        <div class="content-item" v-for="item,index in regulationsData" :key="index">
          <div class="item" @dblclick="openPdf(item)">
            <!--<img src="../../../assets/relevantRegulations/folder.png" alt="">-->
            <span class="title">
              人民检察院<br/>
              案件信息公开
            </span><br/>
            <span class="docName">{{item}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          regulationsData: [
            "人民检察院案件信息公开规定（试行）" ,
            "公开法律文书的版式标准和技术处理要求（征求意见稿）" ,
            "湖北省检察机关案件信息公开工作指引（试行版）",
            "案件信息公开问题解答一",
            "案件信息公开培训教程",
            "案件信息公开系统的相关问题",
            "人民检察院案件信息公开网管理员操作手册（V1.1.2版）",
            "人民检察院案件信息公开网数据交换平台操作手册（V1.7版）",
            '人民检察院案件信息公开网微信平台操作手册（V1.1.0版）',
            '人民检察院案件信息公开网用户操作手册（V1.1.1版）'
            //
          ],//相关规定
        }
      },
      methods: {
        openPdf(text) {//查看pdf
          let src = this.$router.resolve({
            name: 'pdf',
            path: '/pdf',
            query: {
              // src: '../../../../static/folder/' + text+'.pdf'
              src: './static/folder/' + text+'.pdf'
            }
          });
          window.open(src.href,'_blank');
        }
      }
    }
</script>

<style scoped lang="scss">
  #relRegulations {
    width: 100%;
    height: 100%;
    padding: 35px;
    #relContent {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: rgba(255,255,255,1);
      box-shadow: 0 10px 12px 3px rgba(19,38,88,0.15);
      padding-top: 74px;
      .content-item {
        display: inline-block;
        width: 25%;
        height: 314px;
        /*height: 256px;*/
        margin-bottom: 54px;
        text-align: center;
        vertical-align: top;
        background: url('../../../assets/relevantRegulations/folder.png') no-repeat center;
        .item {
          position: relative;
          display: inline-block;
          cursor: pointer;
          width: 212px;
          height: 314px;
          span {
            display: inline-block;
          }
          .title {/*固定标题*/
            font-size: 16px;
            font-family: 'PingFang-SC-Bold';
            font-weight: bold;
            color: rgba(255,254,254,1);
            margin-top: 108px;
          }
          .docName {/*文件名称*/
            font-size:14px;
            font-family:'PingFang-SC-Medium';
            font-weight:500;
            color: rgba(255,255,255,1);
            width: 134px;
            margin-top: 20px;
          }
        }

      }
    }
  }
</style>
