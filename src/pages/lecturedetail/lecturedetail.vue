<template>
  <view class="content">
    <up-navbar title="讲座详情" @leftClick="goback" :placeholder="true">
    </up-navbar>
    <view class="text-area" v-if="lectureDetails">
      <view class="options">
        <view class="option"><text class="text">讲座名称：</text>{{ lectureDetails.lec_title }}</view>
        <view class="option"><text class="text">讲座编号：</text>{{ lectureDetails.lec_id }}</view>
        <view class="option"><text class="text">举办方：</text>{{ lectureDetails.lec_master }}</view>
        <view class="option"><text class="text">举办时间：</text>{{ lectureDetails.lec_time }}</view>
        <view class="option"><text class="text">举办地点：</text>{{ lectureDetails.lec_place }}</view>
        <view class="option">
          <view style="display: block; width: 160rpx; border: 0;"><text class="text">介绍：</text></view>{{
            lectureDetails.lec_detail }}
        </view>
        <view class="option"><text class="text">讲座类型：</text>{{ lec_type }}</view>
        <view class="option"><text class="text">座位数量：</text>{{ lectureDetails.lec_num }}</view>
        <view class="option"><text class="text">剩余数量：</text>{{ lectureDetails.lec_num - lectureDetails.lec_length }}
        </view>
        <view class="option">
          <up-button shape="circle" text="分享"></up-button>
          &nbsp;
          <up-button :type="btn_color" @click="show2 = true"
            shape="circle" :text="btn_text"
              :disabled="lectureDetails.lec_status == 1 ? false : true"></up-button>
          &nbsp;
          <up-button @click="show1 = true" shape="circle" 
          :type="userData.user.lec_finish?.includes(lectureDetails.lec_id) ? 'success' : 'primary'"
          :text="userData.user.lec_finish?.includes(lectureDetails.lec_id) ? '已签到' : '签到'" 
          :disabled="lectureDetails.lec_status == -1 ? true : false"
          v-if="userData.user.lec_order.includes(lectureDetails.lec_id) && (lectureDetails.lec_status !== 1)"></up-button>
        </view>
        <up-popup :show="show1" :round="10" mode="center" :safeAreaInsetBottom=false>
          <view style="width: 100%;border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
          <view class="removeblank"
            style="display: flex; flex-direction: column;justify-content: space-around;height: 200rpx;padding:0 10rpx;">
            <view class="removeblank"
              style="margin: 0 5vw; display: flex;align-items: center;width: 80vw;justify-content: space-between;">
              <text style="font-weight: 400;">签到:</text>
              &nbsp;
              <up-input type="number" v-model="sign_code" placeholder="输入签到码进行签到" clearable />
            </view>
            <view class="removeblank"
              style="width: 80vw;margin: 0 5vw;display: flex;align-items: center;justify-content: center;">
              <up-button @click="show1 = false" shape="circle" text="取消"></up-button>
              &nbsp;
              <up-button type="primary" @click="toSign" shape="circle" text="确定"></up-button>
            </view>
          </view>
        </up-popup>
        <up-popup :show="show2" :round="10" mode="center" :safeAreaInsetBottom=false>
          <view style="width: 100%;border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
          <view class="removeblank"
            style="display: flex; flex-direction: column;justify-content: space-around;align-items: center; height: 200rpx;padding:0 10rpx;">
            <view class="removeblank">
              <text style="color: red;">{{ userData.user.lec_order.includes(lectureDetails.lec_id) ? '确定取消' : '确定' }}</text>
              预约讲座《
              <text style="color: blue;">{{ lectureDetails.lec_title }}</text>》？
            </view>
            <view class="removeblank"
              style="width: 80vw;margin: 0 5vw;display: flex;align-items: center;justify-content: center;">
              <up-button @click="show2 = false" shape="circle" text="取消"></up-button>
              &nbsp;
              <up-button type="primary" @click="order" shape="circle" text="确定"></up-button>
            </view>
          </view>
        </up-popup>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLecture } from '@/stores/lecture';
import { useUser } from '@/stores/user';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { computed, ref } from 'vue';
const lectureData = useLecture();
const userData = useUser();
// 返回
const goback = () => {
  // uni.switchTab({
  //   url: '/pages/home/home'
  // });
  uni.navigateBack();
}
// 讲座类型中文显示
const lec_type = ref();
// 讲座详情
const lec_id = ref();
const lectureDetails = ref();
onLoad((options) => {
  uni.showLoading({
    title: '加载中'
  });
  if ((options as object).hasOwnProperty('lec_id')) {
    // @ts-ignore
    lec_id.value = options.lec_id;
    lectureDetails.value = lectureData.getLecture(lec_id.value);
    // @ts-ignore
    lec_type.value = lectureData.lectureType[lectureDetails.value.lec_type];
  }
})
onReady(() => {
  uni.hideLoading();
})
// 按钮颜色动态变化
const btn_color = computed(() => {
  if (userData.user.lec_order.includes(lectureDetails.value.lec_id) 
  || userData.user.lec_finish.includes(lectureDetails.value.lec_id))
    return 'success';
  else if (userData.user.lec_timeout.includes(lectureDetails.value.lec_id))
    return 'error';
  else return 'primary';
})
// 按钮文字动态变化
const btn_text = computed(() => {
  if (userData.user.lec_order.includes(lectureDetails.value.lec_id))
    return '已预约';
  else if (userData.user.lec_finish.includes(lectureDetails.value.lec_id))
    return '已完成';
  else if (userData.user.lec_timeout.includes(lectureDetails.value.lec_id))
    return '已超时';
  else return '预约';
})
// 分享
const show1 = ref(false);
const share = () => {
}
// 预约
const show2 = ref(false);
const order = () => {
  show2.value = false;
  userData.changeLecture(lectureDetails.value.lec_id);
}
// 签到
const sign_code = ref();
const toSign = async () => {
  if (sign_code.value == '') {
    uni.showToast({
      title: '签到码不能为空',
      icon: 'none'
    })
    return;
  }
  const res = await userData.toSign(lectureDetails.value.lec_id, sign_code.value);
  if (res == true) {
    show1.value = false;
  }
  sign_code.value = '';
}
</script>

<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text-area {
    width: 90vw;

    // background-color: #d6d5d5;
    .options {
      margin: 20rpx 0;

      .option {
        display: flex;
        padding-bottom: 20rpx;
        border-bottom: 2rpx solid rgb(234, 224, 224);
        margin-bottom: 20rpx;

        .text {
          font-weight: bold;
        }
      }

      .removeblank {
        margin: 0;
        padding: 0;
        border: 0;
      }
    }

  }
}
</style>