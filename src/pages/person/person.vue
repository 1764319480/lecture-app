<template>
  <view class="content">
    <view class="text-area">
      <view class="avatar">
        <up-avatar :src="src" shape="circle" size=60></up-avatar>
        <text>15986901234</text>
      </view>
      <view style="margin: 20rpx 0">
        <up-subsection :list="list" current="0" mode="subsection" @change="selectCard"></up-subsection>
      </view>
      <view v-show="showOrder">
        <LectureCard :lectures="order"></LectureCard>
      </view>
      <view v-show="showFinish">
        <LectureCard :lectures="finish"></LectureCard>
      </view>
      <view v-show="showTimeout">
        <LectureCard :lectures="timeout"></LectureCard>
      </view>
      <view v-show="showSetting" class="setting">
        <view class="action" @click="show1 = true">
          <up-icon label="修改密码" size="30" name="/static/image/changepwd.png"></up-icon>
          <u-popup :show="show1" :round="10" mode="center" :safeAreaInsetBottom=false>
            <view class="changePwd-style">
              <view style="justify-content: center;margin-top: 10rpx;">
                <text style="font-size: 8vw;">修改密码</text>
              </view>
              <form action="">
                <view>
                  验证码：<text style="color: transparent;">透</text>
                  <up-input v-model="idCode" type="number" placeholder="请输入验证码">
                    <template #suffix>
                      <text @tap="sendIdCode('修改密码')" style="font-size: 20rpx;color: blue;">{{ timeText }}</text>
                    </template>
                  </up-input>
                </view>
                <view>
                  密码：<text style="color: transparent;">透明</text>
                  <up-input v-model="newPassword" :type="passwordType.firstPwd" placeholder="请输入密码">
                    <template #suffix>
                      <u-icon :name="openEye.firstEye" @tap="changeEye1"></u-icon>
                    </template>
                  </up-input>
                </view>
                <view>
                  确认密码：
                  <up-input v-model="newPasswords" :type="passwordType.secondPwd" placeholder="请再次输入密码">
                    <template #suffix>
                      <u-icon :name="openEye.secondEye" @tap="changeEye2"></u-icon>
                    </template>
                  </up-input>
                </view>
                <button style="width: 100%;background-color: rgb(4, 145, 253);" @click="changePwd">确认</button>
              </form>
            </view>
          </u-popup>
        </view>
        <view class="action" @click="show2 = true;">
          <up-icon label="退出登录" size="30" name="/static/image/logout.png"></up-icon>
          <up-popup :show="show2" :round="10" mode="center" :safeAreaInsetBottom=false>
            <view style="width: 90vw; border-bottom: 2rpx solid grey;font-size: 50rpx;font-weight: bold;
              display: flex;justify-content: center;">温馨提示</view>
            <view
              style="display: flex; flex-direction: column;justify-content: space-around;align-items: center; width: 90vw; height: 300rpx;">
              <view>
                <text style="color: blue;font-size: 40rpx;">确定退出登录吗?</text>
              </view>
              <view style="display: flex;justify-content: center;">
                <up-button @click="show2 = false" shape="circle" text="取消"></up-button>
                &nbsp;&nbsp;
                <up-button type="primary" @click="show2 = false" shape="circle" text="确定"></up-button>
              </view>
            </view>
          </up-popup>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import LectureCard from '@/components/LectureCard/LectureCard.vue';
import { ref } from 'vue';
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg');
// 选项列表
const list = ref([  
  { name: '已预约' },  
  { name: '已完成' },  
  { name: '已超时' },
  { name: '设置'}  
]);
// 为选项卡绑定数据
const order = ref([
  {
    lec_title: "已预约知识课堂",
    lec_id: "101111",
    lec_master: "张先生",
    lec_time: "2024-11-14-10:00-11:10",
    lec_place: "拓新楼105",
    lec_detail: "掌握高效房屋清洁技巧，打造健康宜居环境，知识课堂等你来学！",
    lec_type: "protect",
    lec_status: 1,
    lec_num: 60,
    lec_length: 0,
    lec_people: [],
    lec_sign: "123123"
  }
]);
const finish = ref([
  {
    lec_title: "已完成知识课堂",
    lec_id: "101111",
    lec_master: "张先生",
    lec_time: "2024-11-14-10:00-11:10",
    lec_place: "拓新楼105",
    lec_detail: "掌握高效房屋清洁技巧，打造健康宜居环境，知识课堂等你来学！",
    lec_type: "protect",
    lec_status: 1,
    lec_num: 60,
    lec_length: 0,
    lec_people: [],
    lec_sign: "123123"
  }
]);
const timeout = ref([
  {
    lec_title: "已超时知识课堂",
    lec_id: "101111",
    lec_master: "张先生",
    lec_time: "2024-11-14-10:00-11:10",
    lec_place: "拓新楼105",
    lec_detail: "掌握高效房屋清洁技巧，打造健康宜居环境，知识课堂等你来学！",
    lec_type: "protect",
    lec_status: 1,
    lec_num: 60,
    lec_length: 0,
    lec_people: [],
    lec_sign: "123123"
  }
]);
// 选项卡的显示与隐藏
// const statusList:boolean[] = [false, false, false, false];
const showOrder = ref(true);
const showFinish = ref(false);
const showTimeout = ref(false);
const showSetting = ref(false);
// 切换选项时更换显示内容 
const selectCard = (index: number) => {
  showOrder.value = false;
  showFinish.value = false;
  showTimeout.value = false;
  showSetting.value = false;
  switch(index) {
    case 0: {
      showOrder.value = true;
      break;
    }
    case 1: {
      showFinish.value = true;
      break;
    }
    case 2: {
      showTimeout.value = true;
      break;
    }
    default: {
      showSetting.value = true;
      break;
    }
  }
}
// 验证码
const idCode = ref('');
// 修改密码时的新密码和确认密码
const newPassword = ref('');
const newPasswords = ref('');
//显示或隐藏密码
const passwordType = ref({
  firstPwd: 'password',
  secondPwd: 'password'
});
const openEye = ref({
  firstEye: 'eye-off',
  secondEye: 'eye-off'
});
const changeEye1 = () => {
  if (openEye.value.firstEye === 'eye-off') {
    openEye.value.firstEye = 'eye-fill';
    passwordType.value.firstPwd = 'text';
  } else {
    openEye.value.firstEye = 'eye-off';
    passwordType.value.firstPwd = 'password';
  }
}
const changeEye2 = () => {
  if (openEye.value.secondEye === 'eye-off') {
    openEye.value.secondEye = 'eye-fill';
    passwordType.value.secondPwd = 'text';
  } else {
    openEye.value.secondEye = 'eye-off';
    passwordType.value.secondPwd = 'password';
  }
}
// 发送验证码
const timeText = ref('发送验证码')
const sendIdCode = (value: string) => {
  timeText.value = value;
}
// 修改密码
const show1 = ref(false);
const changePwd = async () => {
  show1.value = false;
}
// 退出登录
const show2 = ref(false);
</script>

<style lang="scss" scoped>
.content {
 @include content-style;
  .text-area {
    width: 90vw;
    .avatar {
      display: flex;
      align-items: center;
      padding: 20rpx;
      font-size: 50rpx;
      background-color: #e1e1e1;
    }
    .setting {
      margin-top: 40rpx;
      width: 90vw; 
      .action {
        width: 90vw;
        border-bottom: 2rpx solid rgb(167, 157, 157); 
        margin: 20rpx 0;
        .changePwd-style {
          width: 90vw;
          view {
            width: 80vw;
            margin: 0 5vw;
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;
          } 
        }
      }
    }
  }
}
</style>
    
      