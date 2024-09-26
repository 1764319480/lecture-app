<template>
  <view class="content">
    <view class="text-area">
      <view>
        <!-- <up-image  :src="src" width="80px" height="80px"></up-image> -->
        <view>15986901234</view>
      </view>
      <view style="width: 100%;height: 200rpx;background-color: pink;">
        <text>15986901234</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const src = ref('https://cdn.uviewui.com/uview/album/1.jpg');
</script>

<style lang="scss" scoped>
.content {
 @include content-style;
  .text-area {
    width: 90vw;
    // view:nth-child(1) {
    //   display: flex;
    //   align-items: center;
    // }
  }
}
</style>
    
      