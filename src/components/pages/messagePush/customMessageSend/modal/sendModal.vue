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
            <span class="modal-span-top">短信内容 : </span>
            <span><textarea v-model="msgContent"></textarea></span>
          </div>
          <div class="main-modal-item">
            <span>发送时间 : </span>
            <span>
                  <DatePicker @on-change="setDate" :value="dateTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择发送时间" ></DatePicker>
            </span>
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
            <span class="modal-span-top">已选联系人 : </span>
            <span>
                  <textarea></textarea>
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
  import {DatePicker} from 'iview';
    export default {
      props: ['sendInfo'],
      components: {DatePicker},
      data() {
        return {
          msgContent: '',//短信内容
          dateValue:this.getCurrentTime(),//时间值
          dateTime: this.getCurrentTime(),//控件显示时间
        }
      },
      mounted() {
        console.log(this.getCurrentTime())
      },
      methods: {
        /*确认*/
        confirm() {
          this.$emit('confirm');
        },
        /*设置时间格式*/
        setDate(fmtDate) {
          console.log('time',fmtDate);
          fmtDate[0]+=' 00:00:00';
          fmtDate[1]+=' 00:00:00';
          this.dateValue = fmtDate;
        },
      }
    }
</script>

<style scoped>

</style>
