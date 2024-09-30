<template>
  <view class="content">
    <up-navbar title="搜索讲座" @leftClick="goback" :placeholder="true">
    </up-navbar>
    <view class="text-area">
      <view class="search">
        <up-input v-model="keyword" shape="circle" customStyle="background-color: white"
         placeholder="输入讲座名称或编号" clearable />
        &nbsp;
        <text @click="search(keyword)" style="color:blue;">搜索</text>
      </view>
      <view class="selectLectures">
        <LectureCard :lectures="searchLectures" v-show="searchLectures"></LectureCard>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLecture } from '@/stores/lecture';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
// 搜索结果
const searchLectures = ref();
// 搜索关键词
const keyword = ref();
const lectureData = useLecture();
const search = (keyword:string) => {
  searchLectures.value = lectureData.searchLecture(keyword);
  lectureData.setKey(keyword);
  // console.log(searchLectures.value);
}
// 获取首页传来的关键词
onLoad((options) => {
  // console.log(options)
  if ((options as object).hasOwnProperty('keyword')) {
    // @ts-ignore
    keyword.value = (options as object).keyword;
    search(keyword.value);
  }
})
function goback () {
    uni.navigateBack();
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
    height: max-content;
    // background-color: rgb(237, 231, 231);
    .search {
      background-color: #e1d5d5;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      width: 86vw;
      height: 100rpx;
      padding: 0 2vw;
    }
    .selectLectures {
      margin: 20rpx 0;
      // background-color: pink;
    }
  }
}
</style>
    
      
