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
          <view style="display: block; width: 160rpx; border: 0;"><text class="text">介绍：</text></view>{{ lectureDetails.lec_detail }}
        </view>
        <view class="option"><text class="text">讲座类型：</text>{{ lec_type}}</view>
        <view class="option"><text class="text">座位数量：</text>{{ lectureDetails.lec_num }}</view>
        <view class="option"><text class="text">剩余数量：</text>{{ lectureDetails.lec_num - lectureDetails.lec_length }}</view>
        <view class="option">
          <up-button shape="circle" text="分享"></up-button>
          <up-button type="primary" @click="show2 = true" shape="circle" text="预约"></up-button>
          <up-button type="primary" @click="show1 = true" shape="circle" text="签到"></up-button>
        </view>
        <up-popup :show="show1" :round="10" mode="center" :safeAreaInsetBottom=false>
          <view style="width: 100%;border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
          <view class="removeblank" style="display: flex; flex-direction: column;justify-content: space-around;height: 200rpx;padding:0 10rpx;">
            <view class="removeblank" style="display: flex;align-items: center;width: 60vw;">
              <text style="font-weight: 400;">签到:</text>
              &nbsp;
              <up-input type="number" v-model="sign_code" placeholder="输入签到码进行签到" clearable />
            </view>
            <view class="removeblank" style="display: flex; justify-content: center;align-items: center;">
              <view class="removeblank"><up-button @click="show1 = false" shape="circle" text="取消"></up-button></view>
              <view class="removeblank"><up-button type="primary" @click="show1 = false" shape="circle" text="确定"></up-button></view>
            </view>
          </view>
        </up-popup>
        <up-popup :show="show2" :round="10" mode="center" :safeAreaInsetBottom=false>
          <view style="width: 100%;border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
          <view class="removeblank"
            style="display: flex; flex-direction: column;justify-content: space-around;height: 200rpx;padding:0 10rpx;">
            <view class="removeblank">
              <text style="color: red;">确定</text>
              预约讲座《
              <text style="color: blue;">{{ lectureDetails.lec_title }}</text>》？
            </view>
            <view class="removeblank" style="display: flex; justify-content: center;align-items: center;">
              <view class="removeblank"><up-button @click="show2 = false" shape="circle" text="取消"></up-button></view>
              <view class="removeblank"><up-button type="primary" @click="show2 = false" shape="circle" text="确定"></up-button></view>
            </view>
          </view>
        </up-popup>
        <!-- <up-button @click="centerDialogVisible = true" type="primary" style="width: 4.5vw; font-size: 1.5vw;">分享</up-button> -->
        <!-- <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" center>
          <span>
            是否复制当前链接？
          </span>
          <template #footer>
            <view class="dialog-footer">
              <up-button @click="centerDialogVisible = false">否</up-button>
              <up-button type="primary" @click="shareLecture">
                是
              </up-button>
            </view>
          </template>
        </el-dialog> -->
        <!-- &nbsp;
        <up-button :type="userData.user.lec_order?.includes(lectureDetails.lec_id) ? '' : 'primary'"
          @click="centerDialogVisible1 = true" :disabled="lectureDetails.lec_status == 1 ? false : true"
          style="width: 4.5vw; font-size: 1.5vw;">
          {{ userData.user.lec_order?.includes(lectureDetails.lec_id)
            || userData.user.lec_finish?.includes(lectureDetails.lec_id)
            || userData.user.lec_timeout?.includes(lectureDetails.lec_id) ? '已预约' : '预约' }}
        </up-button>
        <el-dialog v-model="centerDialogVisible1" title="温馨提示" width="500" center>
          <span>
            {{ userData.user.lec_order?.includes(lectureDetails.lec_id)
              || userData.user.lec_finish?.includes(lectureDetails.lec_id)
              || userData.user.lec_timeout?.includes(lectureDetails.lec_id) ? '确定取消吗？' : '确定预约吗？' }}
          </span>
          <template #footer>
            <view class="dialog-footer">
              <up-button @click="centerDialogVisible1 = false">否</up-button>
              <up-button type="primary" @click="confirmOrder">
                是
              </up-button>
            </view>
          </template>
        </el-dialog> -->
        <!-- &nbsp;
        <up-button :type="signStatus(lectureDetails.lec_id) == '签到' ? 'primary' : ''"
          style="width: 4.5vw; font-size: 1.5vw;" @click="dialogFormVisible = true" v-show="lectureDetails.lec_status == 0
            && userData.user.lec_order?.includes(lectureDetails.lec_id)
            || userData.user.lec_finish?.includes(lectureDetails.lec_id)"
          :disabled="signStatus(lectureDetails.lec_id) == '签到' ? false : true">{{ signStatus(lectureDetails.lec_id)
          }}</up-button> -->
        <!-- <el-dialog v-model="dialogFormVisible" title="请输入签到码" width="500">
          <view>
            <el-input v-model="sign"></el-input>
          </view>
          <template #footer>
            <view class="dialog-footer" style="display: flex; justify-content: center;">
              <up-button @click="dialogFormVisible = false">取消</up-button>
              <up-button type="primary" @click="checkSign">
                确认
              </up-button>
            </view>
          </template>
        </el-dialog> -->
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLecture } from '@/stores/lecture';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
const lectureData = useLecture();
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
  if((options as object).hasOwnProperty('lec_id')) {
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
// 分享
const show1 = ref(false);
const share = () => {
}
// 预约
const show2 = ref(false);
// 签到
const sign_code = ref();

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