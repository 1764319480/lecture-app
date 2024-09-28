import { ref } from 'vue'
import { defineStore } from 'pinia'
// @ts-ignore
import myaxios from '@/utils/request.js';

//讲座数据
export const useLecture = defineStore('lecture', () => {
  const key = ref();
  function setKey(keyword:string) {
    key.value = keyword;
  }
  // 所有讲座数据
  const lectures = ref();
  // 热门讲座
  const hotLectures = ref();
  // 清除信息
  function clear() {
    lectures.value = [];
    hotLectures.value = [];
    carousel.value = [];
  }
  // 类型中英文转换
  const lectureType = ref({
    alls: '全部',
    culture: '文化',
    science: '科普',
    protect: '环保',
    academic: '学术',
    topic: '热点',
    technical: '科技',
    other: '其他'
  })
  // 获取所有讲座
  async function allLecture() {
    const res = await myaxios.get('/api/allLecture');
    lectures.value = res.data;
    // console.log(lectures);
    return res;
  }
  // 获取热门讲座
  async function hotLecture() {
    const res = await myaxios.get('/api/hotLecture');
    hotLectures.value = res.data;
    return res.data;
  }
  // 预约讲座
  function orderLecture(lecId:string, userName:string) {
    for (let k in lectures) {
      if (lectures.value[k].lec_id == lecId) {
        lectures.value[k].lec_people.push(userName);
        lectures.value[k].lec_length++;
        return true;
      }
    }
    return false;
  }
  //取消预约讲座
  function cancelLecture(lecId:string, userName:string) {
    for (let k in lectures) {
      if (lectures.value[k].lec_id == lecId) {
        lectures.value[k].lec_people = lectures.value[k].lec_people.filter((item:string) => item != userName);
        lectures.value[k].lec_length--;
        return true;
      }
    }
    return false;
  }

  // 搜索讲座
  function searchLecture(keyword:string) {
    const searchLectures = [];
    if (isNaN(Number(keyword))) {//为名称
      for (let k of lectures.value) {
        if (k.lec_title.includes(keyword)) {
          searchLectures.push(k);
        }
      }
    } else {//为编号
      for (let k of lectures.value) {
        if (k.lec_id == keyword) {
          searchLectures.push(k);
        }
      }
    }
    return searchLectures;
  }
  // 查询讲座详情
  function getLecture(lecId:string) {
    for (let k of lectures.value) {
      if (k.lec_id == lecId)
        return k;
    }
    return null;
  }
  // 轮播图
  const carousel = ref();
  async function getCarousel () {
    const res = await myaxios.get('/api/getCarousel');
    carousel.value = res.data;
  }
  
  return {clear, carousel, getCarousel, hotLecture, hotLectures, key, allLecture, setKey, lectures, getLecture, lectureType, searchLecture, orderLecture, cancelLecture };
},{
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
})