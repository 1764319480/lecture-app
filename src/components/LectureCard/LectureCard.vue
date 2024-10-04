<template>
  <view class="content">
    <template v-for="item in lectures" :key="item.lec_id">
      <view class="text-area">
        <view class="view">
          <text style="font-size: 40rpx;">{{ item.lec_title.length < 9 ? item.lec_title : item.lec_title.slice(0,8) + '...' }}</text>
          <text :style="statusStyle(item.lec_status)">{{ statusName(item.lec_status) }}</text>
        </view>
        <!-- <view>
          <text style="color: dimgray; font-size: 20rpx;">举办方：{{ item.lec_master }}</text>
        </view> -->
        <view class="view" style="width: 200rpx;">
          <up-button @click="goDetail(item.lec_id)" shape="circle" text="详情"></up-button>
          <up-button :type="btn_color(item.lec_id)" @click="goPopup(item.lec_title, item.lec_id)" shape="circle"
          :text="btn_text(item.lec_id)" :disabled="item.lec_status == 1 ? false : true"></up-button>
        </view>
      </view>
    </template>
    <up-popup :show="show" :round="10" mode="center" :safeAreaInsetBottom=false>
      <view style="width: 100%;border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
      <view style="display: flex; flex-direction: column;justify-content: space-around;align-items: center; height: 200rpx;padding:0 10rpx;">
        <view>
          <text style="color: red;">{{ userData.user.lec_order.includes(select_id) ? '确定取消' : '确定'  }}</text>
          预约讲座《
          <text style="color: blue;">{{ select_title }}</text>》？
        </view>
        <view style="display: flex;align-items: center;width: 80vw;margin: 0 5vw;">
          <up-button @click="show = false" shape="circle" text="取消" ></up-button>
          &nbsp;
          <up-button type="primary" @click="orderLecture()" shape="circle" text="确定" ></up-button>
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script lang="ts">
export default {
  name: "LectureCard",
}
</script>

<script setup lang="ts">
import { useUser } from '@/stores/user';
import { ref } from 'vue';
// 讲座结构
interface lectureStruct  {
  lec_title: string,
  lec_id: string,
  lec_master: string,
  lec_time: string,
  lec_place: string,
  lec_detail: string,
  lec_type: string,
  lec_status: number,
  lec_num: number,
  lec_people: Array<string>,
  lec_sign: string,
  lec_length: number
}
const props = defineProps({
    lectures: Array<lectureStruct>,
});
// 弹出框显示与隐藏
const show = ref(false);
// 选中讲座时的标题和id
const select_title = ref('');
const select_id = ref('');
const goPopup = (title:string, id:string) => {
  show.value = true;
  select_title.value = title;
  select_id.value = id;
}
// 用户数据
const userData = useUser();
// 详情跳转
function goDetail(lec_id: string) {
  uni.navigateTo({
    url: `/pages/lecturedetail/lecturedetail?lec_id=${lec_id}`
  })
}
// 讲座状态数字与文字转换
function statusName(status:number) {
    switch (status) {
        case -1: { return '已完结' };
        case 0: { return '进行中' };
        case 1: { return '报名中' };
    }
}
// 讲座状态文字样式
function statusStyle(status:number) {
    switch (status) {
        case -1: return { color: 'grey', 'font-size': '18rpx' };
        case 0: return { color: 'red', 'font-size': '18rpx' };
        case 1: return { color: 'blue', 'font-size': '18rpx' };
    }
}
// 预约讲座
const orderLecture = () => {
  show.value = false;
  userData.changeLecture(select_id.value);
}
// 按钮颜色动态变化
const btn_color = (lec_id: string) => {
  if (userData.user.lec_order.includes(lec_id)
    || userData.user.lec_finish.includes(lec_id))
    return 'success';
  else if (userData.user.lec_timeout.includes(lec_id))
    return 'error';
  else return 'primary';
}
// 按钮文字动态变化
const btn_text = (lec_id: string) => {
  if (userData.user.lec_order.includes(lec_id))
    return '已预约';
  else if (userData.user.lec_finish.includes(lec_id))
    return '已完成';
  else if (userData.user.lec_timeout.includes(lec_id))
    return '已超时';
  else return '预约';
}
</script>

<style lang="scss" scoped>
.content {
  width: 90vw;
  height: auto;
  .text-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 86vw;
    height: 100rpx;
    padding: 0 2vw;
    margin: 10rpx 0;
    border-radius: 40rpx;
    background-color: rgb(246, 224, 228);
    .view {
      display: flex;
      align-items: center;
    }
  }
}
</style>