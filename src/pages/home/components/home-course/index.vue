<template>
  <view class="home-course-component" v-if="renderInfo.length">
    <view class="home-course-context">
      <view class="title-info">
        <text class="title-text">热门课程</text>
        <view class="ready-more" @click="openCoursePage()">
          <text class="label-text">更多</text>
          <image class="more-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')"></image>
        </view>
      </view>
      <scroll-view scroll-x="true">
        <view class="home-course-content">
          <block v-for="item in renderInfo" :key="item.id">
            <view class="home-course-item" @click="openCourseDetialPage(item)">
              <image class="news-image" :src="item.imagePath"></image>
              <text class="label-text">{{item.name}}</text>
              <text class="value-text">{{item.introduction}}</text>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncFetchHotProductListInfo: 'asyncFetchHotProductListInfo'
    })
  }
})
export default class HomeCourseComponent extends Vue {
  public renderInfo: Array<any> = [];

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHotProductListInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHotProductListInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA.rows;
    })
  }

  public openCourseDetialPage(info: any) {
    console.log(info);
    this.$navigateModel.navigateTo({
      url: '/pagesB/course-info/index',
      query: {id: info.productNo}
    })
  }

  public openCoursePage() {
    this.$navigateModel.navigateTo({
      url: '/pages/course/index'
    })
  }
}
</script>

<style lang="scss" scoped>
  .home-course-component {
    @include wh(auto, auto);
    @include flex-justify-align(flex-start, flex-start);
    .home-course-context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      flex-direction: column;
      .title-info {
        @include wh(calc(100% - #{format(60)}), format(108));
        @include flex-justify-align(space-between, center);
        padding: 0 format(30);
        .title-text {
          @include sc(format(34), $default_color_2);
          font-weight: bold;
        }
        .ready-more {
          @include flex-justify-align(center, center);
          .label-text {
            @include sc(format(28), $default_color_3);
          }
          .more-icon {
            @include wh(format(48), format(48));
          }
        }
      }
      .home-course-content {
        @include flex-justify-align(flex-start, flex-start);
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 format(30);
        .home-course-item {
          @include wh(format(336), auto);
          @include flex-justify-align(center, flex-start);
          flex-direction: column;
          flex: 0 0 format(336);
          margin-right: format(16);
          .news-image {
            @include wh(100%, format(254));
            border-radius: format(16);
          }
          .label-text {
            @include overflow-text(1);
            @include sc(format(28), $default_color_1);
          }
          .value-text {
            @include overflow-text(2);
            @include sc(format(28), $default_color_9);
            margin-top: format(8);
            line-height: format(40);
          }
        }
      }
    }
  }
</style>
