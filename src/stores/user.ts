import { ref } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import myaxios from '@/utils/request.js';
import { useLecture } from '@/stores/lecture';

// 普通用户数据
export const useUser = defineStore('user', () => {
  // 用户信息
  const user = ref();
  const timer = ref();
  // 清除信息
  function clear() {
    user.value = {};
  }
  // 更新用户数据
  async function getUser () {
    const res = await myaxios.post('/api/getUser', {
      token: user.value.token,
      userName: user.value.userName
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.error, icon: 'none'});
    } else {
      user.value = { ...(res.data) };
    }
  }
  //登录
  async function login(userName:string, userPwd:string) {
    const lectureData = useLecture();
    // console.log(userName, userPwd);
    const res = await myaxios.post('/api/login', {
      userName,
      userPwd
    });
    // console.log(res.data)
    if (res.data.hasOwnProperty('error')) {
      // console.log(res.data.error)
      return res.data.error;
    } else {
      user.value = { ...(res.data) };
      updateUser();
      lectureData.getCarousel();
      timer.value = setInterval(updateUser, 1000*10);
      return 1;
    }
  }
  // 定时器
  function setTimer (option:any) {
    if (option) {
      timer.value = setInterval(updateUser, 1000*10);
    } else {
      clearInterval(timer.value);
      timer.value = '';
    }
    
  }

  // 更新数据
  async function updateUser() {
    const lectureData = useLecture();
    let orderLectures = user.value.lec_order;
    await lectureData.allLecture();
    await lectureData.hotLecture();
    await getUser();
    // console.log(1);
    // console.log(orderLectures);
    if (orderLectures) {
      for (let k of orderLectures) {
        let lecdata = lectureData.getLecture(k);
        if (lecdata.lec_status == -1) {
          await failSign(k);
        }       
      }
    }
  }
  // 注册
  async function logon(userName:string, userPwd:string) {
    await myaxios.post('/api/logon', {
      userName,
      userPwd
    });
  }

  // 登录页直接跳转到详情页
  const detailPath = ref();
  function setDetailPath(query_id:string) {
    detailPath.value = query_id;
  }
  // 判断用户是否存在
  async function isLogon(userName:string) {
    const res = await myaxios.post('/api/isLogon', {
      userName
    });
    // console.log(res);
    if (res.data.hasOwnProperty('error')) {
      return res.data.error;
    } else {
      return res.data.message;
    }
  }
  // 修改密码
  async function changePwd(userName:string, userPwd:string) {
    const res = await myaxios.post('/api/changePwd', {
      userName,
      userPwd
    });
    if (res.data.hasOwnProperty('error')) {
      // console.log(res.data.error)
      return res.data.error;
    } else {
      return 1;
    }
  }
  // 预约或取消
  async function changeLecture(lec_id:string) {
    const lectureData = useLecture();
    if (user.value.lec_order.includes(lec_id)) {
      // 取消讲座
      const res = await myaxios.post('/api/cancelLecture', {
        userName: user.value.userName,
        lec_id
      });
      if (res.data.hasOwnProperty('error')) {
        uni.showToast({title: res.data.error, icon: 'none'});
      } else {
        user.value.lec_order = user.value.lec_order.filter((item:string) => item != lec_id);
        lectureData.cancelLecture(lec_id, user.value.userName);
        uni.showToast({title: '取消成功', icon: 'none'});
      }
    }
    else {
      // 预约讲座
      const res = await myaxios.post('/api/orderLecture', {
        userName: user.value.userName,
        lec_id
      });
      if (res.data.hasOwnProperty('error')) {
        uni.showToast({title: res.data.error, icon: 'none'});
      } else {
        user.value.lec_order.push(lec_id);
        lectureData.orderLecture(lec_id, user.value.userName);
        // lectureData
        uni.showToast({title: '预约成功', icon: 'none'});
      }

    }
  }
  // 签到
  async function toSign(lec_id:string, lec_sign:string) {
    const res = await myaxios.post('/api/signing', {
      userName: user.value.userName,
      lec_id,
      lec_sign
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
    } else {
      user.value.lec_order = user.value.lec_order.filter((item:string) => item != lec_id);
      user.value.lec_finish.push(lec_id);
      uni.showToast({title: '签到成功', icon: 'none'});
      return true;
    }
  }
  async function failSign(lec_id:string) {
    await myaxios.post('/api/failSign', {
      userName: user.value.userName,
      lec_id
    });
    user.value.lec_order = user.value.lec_order.filter((item:string) => item != lec_id);
    user.value.lec_timeout.push(lec_id);
  }

  return { getUser, setTimer, timer, updateUser, failSign, toSign, logon, isLogon, clear, user, changeLecture, detailPath, setDetailPath, changePwd, login };
},
  {
    persist:{
      storage:{
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      }
    }
  }
)