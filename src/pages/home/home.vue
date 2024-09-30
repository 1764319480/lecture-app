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
      <view id="someLecture">
        <LectureCard :lectures="lectures"></LectureCard>
      </view>
    </view>
  </view>

</template>

<script setup lang="ts">
import { useLecture } from '@/stores/lecture';
import { onReady } from '@dcloudio/uni-app';
import { ref } from 'vue';
const lectureData = useLecture();
// 搜索关键词
const keyword = ref('');
// 轮播图数据
const carousel = ref(new Array);
const carouselData:any = lectureData.carousel;//轮播图热门讲座
// console.log(carouselData)
onReady(() => {
  for (let k in carouselData) {
    carousel.value.push({
      image: carouselData[k].src,
      lec_id: carouselData[k].lec_id
    })
  }
})
// 轮播图图片跳转
const goDetail = (index:number) => {
  const lec_id = carousel.value[index].lec_id;
  uni.navigateTo({
    url: `/pages/lecturedetail/lecturedetail?lec_id=${lec_id}`
  })
  // console.log(carousel.value[index as number].lec_id)
}
// 热门讲座
const lectures = ref([
  {
    lec_title: "房屋清洁知识课堂",
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
  },
  {
    lec_title: "道德课堂",
    lec_id: "101112",
    lec_master: "李先生",
    lec_time: "2024-11-14-10:00-11:10",
    lec_place: "拓新楼105",
    lec_detail: "掌握高效房屋清洁技巧，打造健康宜居环境，知识课堂等你来学！",
    lec_type: "protect",
    lec_status: 0,
    lec_num: 60,
    lec_length: 0,
    lec_people: [],
    lec_sign: "123123"
  }
]);
const search = (key: string | number) => {
  console.log(key);
}
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