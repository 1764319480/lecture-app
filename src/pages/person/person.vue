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
              <view class="view" style="justify-content: center;margin-top: 10rpx;">
                <text style="font-size: 8vw;">修改密码</text>
              </view>
              <form action="">
                <view class="view">
                  验证码：<text style="color: transparent;">透</text>
                  <up-input v-model="idCode" type="number" placeholder="请输入验证码">
                    <template #suffix>
                      <text @tap="sendIdCode('修改密码')" style="font-size: 20rpx;color: blue;">{{ timeText }}</text>
                    </template>
                  </up-input>
                </view>
                <view class="view">
                  密码：<text style="color: transparent;">透明</text>
                  <up-input v-model="newPassword" :type="passwordType.firstPwd" placeholder="请输入密码">
                    <template #suffix>
                      <u-icon :name="openEye.firstEye" @tap="changeEye1"></u-icon>
                    </template>
                  </up-input>
                </view>
                <view class="view">
                  确认密码：
                  <up-input v-model="newPasswords" :type="passwordType.secondPwd" placeholder="请再次输入密码">
                    <template #suffix>
                      <u-icon :name="openEye.secondEye" @tap="changeEye2"></u-icon>
                    </template>
                  </up-input>
                </view>
                <view class="view">
                  <up-button shape="circle" text="取消" @click="cancleChange"></up-button>
                  &nbsp;
                  <up-button type="primary" @click="changePwd" shape="circle" text="确认"></up-button>
                </view>
                <!-- <button style="width: 100%;background-color: rgb(4, 145, 253);" @click="changePwd">确认</button> -->
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
              <view style="width: 80vw;margin: 0 5vw;display: flex;align-items: center;">
                <up-button @click="show2 = false" shape="circle" text="取消"></up-button>
                &nbsp;&nbsp;
                <up-button type="primary" @click="exit" shape="circle" text="确定"></up-button>
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
import { useLecture } from '@/stores/lecture';
import { useUser } from '@/stores/user';
import { ref } from 'vue';
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg');
const userData = useUser();
const lectureData = useLecture();
// 选项列表
const list = ref([  
  { name: '已预约' },  
  { name: '已完成' },  
  { name: '已超时' },
  { name: '设置'}  
]);
// 为选项卡绑定数据
const order = ref([...userData.user.lec_order].map(item => lectureData.getLecture(item)));
const finish = ref([...userData.user.lec_finish].map(item => lectureData.getLecture(item)));
const timeout = ref([...userData.user.lec_timeout].map(item => lectureData.getLecture(item)));
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
let timer:any = null;
let checkIdCode:number|string;
const timeText = ref('发送验证码');
const sendIdCode =  async (typeText:string) => {
    if (!timer) {
        uni.showToast({
          title: '发送成功',
          icon: 'none'
        });
        let seconds = 60;
        timer = setInterval(() => {
            if (seconds == 0) {
                timeText.value = '发送验证码';
                checkIdCode = '';//1分钟验证码过期
                clearInterval(timer);
                timer = null;
            } else {
                timeText.value = seconds.toString();
                seconds--;
            }
        }, 1000)
        checkIdCode = Math.floor(Math.random() * 900000) + 100000;
        console.log(`尊敬的用户，您正在进行${typeText}操作，这是您的验证码:${checkIdCode}，1分钟内有效！`)
    }
}
// 取消修改
const cancleChange = () => {
  show1.value = false;
  newPassword.value = '';
  newPasswords.value = '';
  idCode.value = '';
}
// 修改密码
const show1 = ref(false);
const changePwd = async () => {
  if (newPassword.value.length < 8 || newPasswords.value.length < 8) {
    uni.showToast({
      title: '密码长度不能少于8位！',
      icon: 'none'
    });
    return;
  }
  if (!idCode.value) {
    uni.showToast({
      title: '请输入验证码！',
      icon: 'none'
    });
    return;
  }
  if (newPassword.value != newPasswords.value) {
    uni.showToast({
      title: '密码必须一致！',
      icon: 'none'
    });
    return;
  }
  if (checkIdCode != idCode.value) {
    uni.showToast({
      title: '验证码错误！',
      icon: 'none'
    });
    return;
  }
  const res = userData.changePwd(userData.user.userName, newPasswords.value);
  res.then(data => {
    if (data == 1) {
      show2.value = false;
      newPassword.value = '';
      newPasswords.value = '';
      idCode.value = '';
      uni.showToast({
        title: '修改成功，请重新登录',
        icon: 'none'
      });
      setTimeout(() => {
        uni.redirectTo({
          url: '/pages/login/login'
        })
      },1000)
    } else {
      uni.showToast({
        title: data,
        icon: 'none'
      });
      return;
    }
  })

}
// 退出登录
const show2 = ref(false);
const exit = () => {
  userData.setTimer(false);
  uni.clearStorage();
  userData.clear();
  uni.redirectTo({
    url: '/pages/login/login'
  })
}
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
          .view {
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
    
      