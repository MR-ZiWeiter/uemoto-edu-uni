<template>
  <view class="news-list-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <view class="news-item" v-for="(item, index) in renderInfo" :key="index" @click="openNewsInfoPage(item)">
          <image class="news-image" :src="item.image"></image>
          <view class="news-item-info">
            <text class="title-text">{{item.title}}</text>
            <text class="value-text">{{item.description}}</text>
            <text class="time-text">{{item.time || '-'}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
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
export default class HomeNewsListPage extends Vue {
  public title: string = '资讯列表';
  public renderInfo: any = {};

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
  // 详情
  public openNewsInfoPage(info: any) {
    this.$navigateModel.navigateTo({
      url: '/pagesA/news-list/detail',
      query: info
    })
  }
}
</script>

<style lang="scss" scoped>
  .news-list-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      background-color: $default_border_color;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        background: $default_border_color;
        border-radius: format(16) format(16) 0 0;
        .news-item {
          @include flex-justify-align(flex-start, flex-start);
          background-color: $default_color;
          margin: format(30);
          border-radius: format(16);
          .news-image {
            @include wh(format(264), format(198));
            flex: 0 0 format(198);
            border-radius: format(16);
          }
          .news-item-info {
            @include flex-justify-align(flex-start, flex-start);
            height: format(178);
            padding: format(10) format(20);
            flex-direction: column;
            flex: 1;
            .title-text {
              @include wh(auto, auto);
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), $default_color_1);
            }
            .value-text {
              @include wh(calc(100% - #{format(40)}), auto);
              @include sc(format(26), $default_color_6);
              @include overflow-text(2);
              margin-bottom: format(20);
              word-break: break-all;
              word-wrap: break-word;
              margin-top: format(10);
            }
            .time-text {
              @include sc(format(26), $default_color_6);
            }
          }
        }
      }
    }
  }
</style>
