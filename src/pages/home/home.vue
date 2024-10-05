<template>
  <view class="content">
    <view class="text-area">
      <view class="search">
        <up-input v-model="keyword" shape="circle" customStyle="background-color: white"
         placeholder="输入讲座名称或编号" clearable />
        &nbsp;
        <text @click="search(keyword)" style="color:blue;">搜索</text>
      </view>
      <!--轮播图-->
      <view>
        <up-swiper :list="carousel" circular indicator keyName="image" @click="goDetail"></up-swiper>
      </view>
      <text style="color: red;">大家都在看：</text>
      <br>
      <br>
      <!-- 热门讲座 -->
      <view>
        <LectureCard :lectures="lectures"></LectureCard>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { useLecture } from '@/stores/lecture';
import { useUser } from '@/stores/user';
import { onLoad, onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
const lectureData = useLecture();
const userData = useUser();
// 搜索关键词
const keyword = ref('');
// 轮播图数据
const carousel = ref(new Array);
const carouselData:any = lectureData.carousel;//轮播图讲座
// 热门讲座
const lectures = ref();
onReady(async () => {
  for (let k in carouselData) {
    carousel.value.push({
      image: carouselData[k].src,
      lec_id: carouselData[k].lec_id
    })
  }
  lectures.value = await lectureData.hotLecture();
})
// 轮播图图片跳转
const goDetail = (index:number) => {
  const lec_id = carousel.value[index].lec_id;
  userData.setAllowBack(true);
  uni.navigateTo({
    url: `/pages/lecturedetail/lecturedetail?lec_id=${lec_id}`
  })
  // console.log(carousel.value[index as number].lec_id)
}
// 搜索
const search = (key: string | number) => {
  // console.log(key);
  uni.navigateTo({
    url: `/pages/search/search?keyword=${key}`
  })
}
onLoad(() => {
  uni.showLoading({
    title: '加载中'
  });
})
onReady(() => {
  uni.hideLoading();
})
</script>

<style lang="scss" scoped>
.content {
  @include content-style;
  .text-area {
    width: 90vw;
    // background-color: green;
    .search {
      background-color: #e1d5d5;
      display: flex;
      // justify-content: space-between;
      align-items: center;
      width: 86vw;
      height: 100rpx;
      padding: 0 2vw;
    }
  }
}
</style>