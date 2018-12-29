<template>
  <div class="modal-wrap">
    <div class="main-modal">
      <div class="modal-content">
        <!--标题-->
        <div class="main-modal-title">
          发送通知
        </div>
        <!--填写内容-->
        <div class="main-modal-fill">
          <div class="main-modal-item">
            <span>通知接收人 :</span>
            <span>{{sendInfo.acceptPerson}}</span>
          </div>
          <div class="main-modal-item">
            <span>手机号码 :</span>
            <span>{{sendInfo.phoneNumber}}</span>
          </div>
          <!--<div class="main-modal-item">-->
            <!--<span>通知模板:</span>-->
            <!--<span>-->
              <!--<Select v-model="selectTemp" @on-change="changeSelect">-->
                <!--<Option v-for="item in tempList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
              <!--</Select>-->
            <!--</span>-->
          <!--</div>-->
          <div class="main-modal-item">
            <span>通知内容 :</span>
            <span>
                  <textarea>{{sendInfo.content}}</textarea>
            </span>
          </div>
          <!--按钮组-->
          <div class="main-modal-btn">
            <button class="cus-info-btn" @click="confirm">发送</button>
            <button class="cus-cancel-btn" @click="confirm">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Select,Option} from 'iview'
    export default {
      props: ['sendInfo'],
      components: {Select,Option},
      data() {
        return {
          // selectTemp: 0,//选择模板
          // tempList: [//模板值
          //   {
          //     value: 0,
          //     label: '模板1'
          //   },
          //   {
          //     value: 1,
          //     label: '模板2'
          //   }
          // ]
        }
      },
      methods: {
        /*确认*/
        confirm() {
          this.$emit('confirm');
        },
        // /*改变选择模板*/
        // changeSelect(val) {
        //   console.log('模板',val);
        // }
      }
    }
</script>

<style scoped>

</style>
