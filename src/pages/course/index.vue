<template>
  <view class="course-page">
    <scroll-view scroll-x="true" class="menu-group">
      <view class="menu-item active">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
      <view class="menu-item">
        <text class="label-text">英语</text>
      </view>
    </scroll-view>
    <!-- <view class="search-group">
      <image class="search-icon" src="course-search-icon-01@2x.svg"></image>
      <text class="label-text">热门课程 TOP</text>
    </view> -->
    <view class="swiper-group">
      <swiper
        class="swiper-info"
        indicator-dots
        autoplay
        circular>
        <swiper-item class="swiper-item-info">
          <image src="/" class="image-info" mode="scaleToFill"/>
        </swiper-item>
      </swiper>
    </view>
    <view class="hot-course-tab">
      <view class="hot-course-item">
        <text class="title-text">3-4岁</text>
      </view>
      <view class="hot-course-item">
        <text class="title-text">4-5岁</text>
      </view>
      <view class="hot-course-item">
        <text class="title-text">4-5岁</text>
      </view>
    </view>
    <view class="hot-course-context">
      <view class="hot-course-info">
        <CourseItemComponent></CourseItemComponent>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapActions } from 'vuex';

import CourseItemComponent from './components/course-item/index.vue';
@Component({
  components: {
    CourseItemComponent
  },
  methods: {
    ...mapActions({
      asyncFetchProductMenuTreeInfo: 'asyncFetchProductMenuTreeInfo'
    })
  }
})
export default class CoursePage extends Vue {
  public title: string = '课程';

  public menuRenderArray: Array<any> = [];

  // Vuex Actions
  private asyncFetchProductMenuTreeInfo: () => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.asyncFetchProductMenuTreeInfo().then(res => {
      this.menuRenderArray = res.DATA;
    })
  }

}

</script>

<style lang="scss" scoped>
  @import './index';
</style>

