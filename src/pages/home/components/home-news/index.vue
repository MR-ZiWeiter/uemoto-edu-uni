<template>
  <view class="home-news-component" v-if="renderInfo.length">
    <view class="home-news-context">
      <view class="title-info">
        <text class="title-text">最新资讯</text>
        <view class="ready-more" @click="openNewsPage()">
          <text class="label-text">更多</text>
          <image class="more-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')"></image>
        </view>
      </view>
      <scroll-view scroll-x="true">
        <view class="home-news-content">
          <view class="home-news-item" v-for="item in renderInfo" :key="item.id">
            <image class="news-image" mode="widthFix" :src="item.image"></image>
            <text class="label-text">{{item.title}}</text>
            <rich-text class="value-text" :nodes="item.content"></rich-text>
          </view>
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
      asyncFetchHomeNewsInfo: 'asyncFetchHomeNewsInfo'
    })
  }
})
export default class HomeNewsComponent extends Vue {
  public renderInfo: Array<any> = [];

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHomeNewsInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeNewsInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA.rows;
    })
  }
  // 列表
  public openNewsPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesA/news-list/index'
    })
  }
}
</script>

<style lang="scss" scoped>
  .home-news-component {
    @include wh(auto, auto);
    @include flex-justify-align(flex-start, flex-start);
    .home-news-context {
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
      .home-news-content {
        @include flex-justify-align(flex-start, flex-start);
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0 format(30);
        .home-news-item {
          @include wh(format(452), auto);
          @include flex-justify-align(center, flex-start);
          flex-direction: column;
          flex: 0 0 format(452);
          margin-right: format(16);
          .news-image {
            @include wh(100%, format(254));
            border-radius: format(16);
          }
          .label-text {
            @include overflow-text(1);
            @include sc(format(28), $default_color_1);
            margin-top: format(16);
          }
          .value-text {
            @include overflow-text(1);
            @include sc(format(28), $default_color_9);
            margin-top: format(8);
            line-height: format(50);
          }
        }
      }
    }
  }
</style>
