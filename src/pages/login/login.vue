<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png" /> -->
    <view class="text-area">
      <view id="loginForm" v-show="status">
        <view v-show="status2">
          <view style="justify-content: center;margin-bottom:10vw">
            <text style="font-size: 8vw;">登录</text>
          </view>
          <form action="">
            <view>
              账号：<text style="color: transparent;">透明</text>
              <up-input type="number" v-model="oldAccount" placeholder="请输入手机号" clearable />
            </view>
            <view>
              密码：<text style="color: transparent;">透明</text>
              <up-input v-model="oldPassword" :type="passwordType.firstPwd" placeholder="请输入密码">
                <template #suffix>
                  <u-icon :name="openEye.firstEye" @tap="changeEye1"></u-icon>
                </template>
              </up-input>
            </view>
            <!-- <br> -->
            <view style="display: flex; justify-content: space-between; border-top: 8px solid transparent;">
              <text @tap="status = false" style="font-size: 20rpx;color: blue;">没有账号？点击注册</text>
              <text @tap="status2 = false" style="font-size: 20rpx;color: blue;">忘记密码</text>
            </view>
            <br>
            <button style="width: 100%;background-color: rgb(4, 145, 253);" @click="login">登录</button>
          </form>
          <br>
          <view style="font-size: 18rpx; color: grey;display: block;">
            <text>-请使用11位号码进行登录或注册。</text>
            <br>
            <text>-若忘记密码，可通过验证码方式找回。</text>
          </view>
          <view style="color: transparent;">空白行用于撑大表单</view>
          <view style="color: transparent;">透明</view>
        </view>
        <view v-show="!status2">
          <view style="justify-content: center;margin-bottom:10vw">
            <text style="font-size: 8vw;">修改密码</text>
          </view>
          <form action="">
            <view>
              账号：<text style="color: transparent;">透明</text>
              <up-input type="number" v-model="newAccount" placeholder="请输入手机号" clearable />
            </view>
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
            <view style="display: flex; justify-content: space-between; border-top: 8px solid transparent;">
              <text @tap="status2 = true" style="font-size: 20rpx;color: blue;">返回登录</text>
            </view>
            <button style="width: 100%;background-color: rgb(4, 145, 253);" @click="changePwd">确认</button>
          </form>
        </view>
      </view>
      <view id="loginForm" v-show="!status">
        <view style="display: flex; justify-content: center;margin-bottom:10vw">
          <text style="font-size: 8vw;">注册</text>
        </view>
        <form action="">
          <view style="display: flex;align-items: center; ">
            账号：<text style="color: transparent;">透明</text>
            <up-input type="number" v-model="newAccount" placeholder="请输入手机号" clearable />
          </view>
          <view style="display: flex; align-items: center;">
            验证码：<text style="color: transparent;">透</text>
            <up-input v-model="idCode" type="number" placeholder="请输入验证码">
              <template #suffix>
                <text @tap="sendIdCode('注册')" style="font-size: 20rpx;color: blue;">{{ timeText }}</text>
              </template>
            </up-input>
          </view>
          <view style="display: flex; align-items: center;">
            密码：<text style="color: transparent;">透明</text>
            <up-input v-model="newPassword" :type="passwordType.firstPwd" placeholder="请输入密码">
              <template #suffix>
                <u-icon :name="openEye.firstEye" @tap="changeEye1"></u-icon>
              </template>
            </up-input>
          </view>
          <view style="display: flex; align-items: center;">
            确认密码：
            <up-input v-model="newPasswords" :type="passwordType.secondPwd" placeholder="请再次输入密码">
              <template #suffix>
                <u-icon :name="openEye.secondEye" @tap="changeEye2"></u-icon>
              </template>
            </up-input>
          </view>
          <view style="display: flex; justify-content: space-between; border-top: 8px solid transparent;">
            <text @tap="status = true" style="font-size: 20rpx;color: blue;">已有账号？点击登录</text>
          </view>
          <button style="width: 100%;background-color: rgb(4, 145, 253);" @click="logon">注册</button>
        </form>
      </view>
    </view>
    <view></view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import { useLecture } from '@/stores/lecture';
import { useManager } from '@/stores/manager';
import { useUser } from '@/stores/user';
// const lectureData = useLecture();
const managerData = useManager();
const userData = useUser();
// 切换登录和注册
const status = ref(true);
//切换登录和改密
const status2 = ref(true);
// 已有账号和密码
const oldAccount = ref('');
const oldPassword = ref('');
// 注册时的新账号
const newAccount = ref('');
// 注册和修改密码时的新密码和确认密码
const newPassword = ref('');
const newPasswords = ref('');
// 验证码
const idCode = ref('');
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
// 切换表单时重置表单状态
watch([status, status2], () => {
  openEye.value.firstEye = 'eye-off';
  openEye.value.secondEye = 'eye-off';
  passwordType.value.firstPwd = 'password';
  passwordType.value.secondPwd = 'password';
  newAccount.value = '';
  oldAccount.value = '';
  oldPassword.value = '';
  newPassword.value = '';
  newPasswords.value = '';
  idCode.value = '';
})
// 登录
const login = async () => {
  // 判断管理员身份
  // if (managerData.list.includes(oldAccount.value)) {
  //   const res = await managerData.login(oldAccount.value, oldPassword.value);
  //   if (res) {
  //     uni.showToast({
  //       title:'欢迎管理员',
  //       icon: 'none'
  //     });
  //     await managerData.getCarousel();
  //     setTimeout(() => {
  //       router.push('/super/welcome');
  //     }, 1000)
  //   }
  //   return;
  // }
  // 普通用户验证
  if (oldAccount.value.length != 11 || isNaN(Number(oldAccount.value))) {
    uni.showToast({ title: '账号格式错误',icon:'none' });
    return;
  }
  if (oldPassword.value.length < 8) {
    uni.showToast({ title: '密码长度不能少于8位！',icon:'none' });
    return;
  }
  const res = await userData.login(oldAccount.value, oldPassword.value);
  if (res == 1) {
    uni.showToast({
      title: '登录成功',
      icon: 'none'
    });
    if (userData.detailPath) {
      setTimeout(() => {
        uni.redirectTo({
          url:`/pages/lecturedetail/lecturedetail?lec_id=${userData.detailPath}`
        })
      }, 1000);
    } else {
      setTimeout(() => {
        uni.switchTab({
          url:'/pages/home/home'
        })
      }, 1000);
    }
  } else {
    uni.showToast({
      title: res,
      icon: 'none'
    });
    return;
  }
}
// 发送验证码
const timeText = ref('发送验证码')
const sendIdCode = (value: string) => {
  timeText.value = value;
}
// 修改密码
const changePwd = async () => {

}
// 注册
const logon = async () => {

}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-image: url('http://192.168.43.22:8080/login5.jpg');
  // background-size: 200px 400px;
  // background-color: pink;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
.text-area {
  height: auto;
  width: 80vw;
  background-color: rgb(244, 236, 241);
  padding: 6rpx;
  border-radius: 4rpx;
  view {
    margin: 4rpx;
    view {
      view {
        display: flex;
        align-items: center;
      }
    }
  }
}
.input_view {
  width: auto;
  flex: 1;
  display: flex;
}
</style>
