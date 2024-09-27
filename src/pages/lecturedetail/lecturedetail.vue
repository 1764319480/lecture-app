<template>
  <view class="content">
    <up-navbar title="讲座详情" @leftClick="goback" :placeholder="true">
    </up-navbar>
    <view class="text-area">
      <view class="options">
        <view><text>讲座名称：</text>{{ lectureDetails.lec_title }}</view>
        <view><text>讲座编号：</text>{{ lectureDetails.lec_id }}</view>
        <view><text>举办方：</text>{{ lectureDetails.lec_master }}</view>
        <view><text>举办时间：</text>{{ lectureDetails.lec_time }}</view>
        <view><text>举办地点：</text>{{ lectureDetails.lec_place }}</view>
        <view>
          <view style="display: block; width: 160rpx; border: 0;"><text>介绍：</text></view>{{ lectureDetails.lec_detail }}
        </view>
        <view><text>讲座类型：</text>{{ lectureData.lectureType[lectureDetails.lec_type] }}</view>
        <view><text>座位数量：</text>{{ lectureDetails.lec_num }}</view>
        <view><text>剩余数量：</text>{{ lectureDetails.lec_num - lectureDetails.lec_length }}</view>
        <view>
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
import { ref } from 'vue';
// 返回
const goback = () => {
  // uni.switchTab({
  //   url: '/pages/home/home'
  // });
  uni.navigateBack();
}
// 讲座操作实例
interface LectureType {
  protect: string;
}
const lectureData = ref<{ lectureType: LectureType }>({ lectureType: { protect: '环保' } });
const letype: keyof LectureType = 'protect';
// 讲座详情
const lectureDetails = ref({
  lec_title: "房屋清洁知识课堂",
  lec_id: "101111",
  lec_master: "张先生",
  lec_time: "2024-11-14-10:00-11:10",
  lec_place: "拓新楼105",
  lec_detail: "掌握高效房屋清洁技巧，打造健康宜居环境，知识课堂等你来学！",
  lec_type: letype,
  lec_status: 1,
  lec_num: 60,
  lec_length: 0,
  lec_people: [],
  lec_sign: "123123"
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
        view {
          display: flex;
          padding-bottom: 20rpx;
          border-bottom: 2rpx solid rgb(234, 224, 224);
          margin-bottom: 20rpx;
    
          text {
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