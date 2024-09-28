import { ref } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import myaxios from '@/utils/request.js';

interface lecture_struct {
  lec_title: string,
  lec_id: string,
  lec_master: string,
  lec_time: string,
  lec_place: string,
  lec_detail: string,
  lec_type: string,
  lec_status: number,
  lec_num: number,
  lec_length: number,
  lec_people: Array<string>,
  lec_sign: string
}
// 管理员信息
export const useManager = defineStore('manager', () => {
  const manager = ref({
    name: '',
    supertoken: '',
  });
  // 退出登录时清除信息
  function clear () {
    manager.value.name = '';
    manager.value.supertoken = '';
    carousel.value = '';
  }
  // 管理员列表
  const list = ref([]);
  // 获取管理员列表
  async function getManagerList() {
    const res = await myaxios.get('/api/superList');
    list.value = res.data;
    // console.log(list)
  }
  // 管理员登录
  async function login(name:string, pwd:string) {
    const res = await myaxios.post('/api/superLogin', {
      name,
      pwd
    });
    // console.log(res);
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      manager.value.name = res.data.name;
      manager.value.supertoken = res.data.supertoken;
      sessionStorage.setItem('supertoken', res.data.supertoken);
      return true;
    }
  }
  // 添加讲座
  async function addLecture(lecture:lecture_struct) {
    const res = await myaxios.post('/api/addLecture', {
      lec_title: lecture.lec_title,
      lec_id: lecture.lec_id,
      lec_master: lecture.lec_master,
      lec_time: lecture.lec_time,
      lec_place: lecture.lec_place,
      lec_detail: lecture.lec_detail,
      lec_type: lecture.lec_type,
      lec_status: lecture.lec_status,
      lec_num: lecture.lec_num,
      lec_people: lecture.lec_people,
      lec_sign: lecture.lec_sign,
      lec_length: lecture.lec_length
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
  // 搜索某一讲座
  async function findLecture (lec_id:string) {
    const res = await myaxios.post('/api/findLecture', {
      lec_id
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      return res.data;
    }
  }
  // 删除讲座
  async function removeLecture (lec_id:string) {
    const res = await myaxios.post('/api/removeLecture', {
      lec_id
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
  // 修改讲座
  async function modifyLecture (lectures:lecture_struct) {
    const res = await myaxios.post('/api/modifyLecture', {
      lectures
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
   // 修改密码
   async function modifyPwd (pwd:string) {
    const res = await myaxios.post('/api/modifyPwd', {
      name: manager.value.name,
      pwd
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
  // 获取轮播图
  const carousel = ref();
  async function getCarousel () {
    const res = await myaxios.get('/api/getCarousel');
    carousel.value = res.data;
  }
  // 删除图片
  async function deleteCarousel (lec_id:string) {
    const res = await myaxios.post('/api/deleteCarousel', {
      lec_id
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
  // 添加图片
  async function addCarousel (lec_id:string, img:any) {
    const res = await myaxios.post('/api/addCarousel', {
      lec_id,
      img
    });
    if (res.data.hasOwnProperty('error')) {
      uni.showToast({title: res.data.error, icon: 'none'});
      return false;
    } else {
      uni.showToast({title: res.data.message, icon: 'none'});
      return true;
    }
  }
  return { addCarousel, deleteCarousel, carousel, getCarousel, clear, modifyPwd, modifyLecture, removeLecture, findLecture, addLecture, manager, list, getManagerList, login };
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