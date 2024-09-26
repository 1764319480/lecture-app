<template>
  <view class="content">
    <view class="text-area">
      <view>
        <up-checkbox-group>
          <up-checkbox v-model:checked="alls" label="全部" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="culture" label="文化" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="science" label="科普" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="protect" label="环保" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="academic" label="学术" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="topic" label="热点" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="technical" label="科技" usedAlone></up-checkbox>&nbsp;
          <up-checkbox v-model:checked="other" label="其他" usedAlone></up-checkbox>&nbsp;
        </up-checkbox-group>
        <view style="border-bottom: 2rpx solid rgb(165, 146, 146);"></view>
      </view>
      <view style="height: 170rpx"></view>
      <view>
        <LectureCard :lectures="filtLectures"></LectureCard>
      </view>
    </view>

  </view>
</template>
<script setup lang="ts">
import LectureCard from '@/components/LectureCard/LectureCard.vue';
import { computed, watch, ref } from 'vue';
// 多选框按钮
const culture = ref(true);
const science = ref(true);
const protect = ref(true);
const academic = ref(true);
const topic = ref(true);
const technical = ref(true);
const other = ref(true);
const alls = computed({
  get: () => {
    return culture.value && science.value && protect.value && academic.value && topic.value && technical.value && other.value
  },
  set: (newValue) => {
    culture.value = newValue;
    science.value = newValue;
    protect.value = newValue;
    academic.value = newValue;
    topic.value = newValue;
    technical.value = newValue;
    other.value = newValue;
  }
})
// 所有讲座信息
const allLectures = [
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
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
    lec_type: "other",
    lec_status: 0,
    lec_num: 60,
    lec_length: 0,
    lec_people: [],
    lec_sign: "123123"
  }
];
// 筛选讲座
const filtLectures = ref([...allLectures]);
watch(culture, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'culture'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'culture')));
    }
})
watch(science, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'science'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'science')));
    }
})
watch(protect, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'protect'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'protect')));
    }
})
watch(academic, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'academic'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'academic')));
    }
})
watch(topic, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'topic'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'topic')));
    }
})
watch(technical, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'technical'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'technical')));
    }
})
watch(other, (newValue) => {
    if (!newValue) {
        const newLectures = (filtLectures.value.filter(item => item.lec_type != 'other'));
        filtLectures.value.splice(0, filtLectures.value.length);
        filtLectures.value.push(...newLectures);
    } else {
        filtLectures.value.push(...(allLectures.filter(item => item.lec_type == 'other')));
    }
})
</script>

<style lang="scss" scoped>
$margin-height: 30rpx;
.content {
  @include content-style;
  .text-area {
    width: 90vw;
    view:nth-child(1) {
      padding: $margin-height 0;
      background-color: white;
      height: 100rpx;
      position: fixed;
      z-index: 1;
    };
  }
}
</style>