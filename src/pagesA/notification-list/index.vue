<template>
  <view class="notification-list-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <view class="notification-item" v-for="(item, index) in renderInfo" :key="index" @click="openNotiInfoPage(item)">
          <text class="title-text">{{item.title}}</text>
          <view class="notification-item-info">
            <rich-text class="content-text" :nodes="item.content"></rich-text>
            <view class="view-more">
              <text class="label-text">查看详情</text>
              <image class="icon-arrow" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')"></image>
            </view>
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
      asyncFetchHomeNotificationListInfo: 'asyncFetchHomeNotificationListInfo'
    })
  }
})
export default class HomeNotificationListPage extends Vue {
  public title: string = '公告列表';
  public renderInfo: any = {};

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHomeNotificationListInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeNotificationListInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA.rows;
    })
  }

  openNotiInfoPage(info: any) {
    this.$navigateModel.navigateTo({
      url: '/pagesA/notification-list/detail',
      query: {id: info.id, type: 'asyncFetchHomeNotiDetailInfo'}
    })
  }
}
</script>

<style lang="scss" scoped>
  .notification-list-page {
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
        .notification-item {
          @include flex-justify-align(flex-start, flex-start);
          background-color: $default_color;
          flex-direction: column;
          margin: format(30);
          border-radius: format(16);
          .title-text {
            @include wh(auto, format(68));
            @include flex-justify-align(flex-start, center);
            @include sc(format(28), $default_color_1);
            padding: 0 format(30);
            border-bottom: format(2) solid $default_border_color;
          }
          .notification-item-info {
            @include flex-justify-align(flex-start, flex-start);
            padding: format(20) format(30);
            flex-direction: column;
            .content-text {
              @include wh(calc(100% - #{format(60)}), auto);
              @include sc(format(28), $default_color_6);
              @include overflow-text(4);
              margin-bottom: format(20);
              word-break: break-all;
              word-wrap: break-word;
            }
            .view-more {
              @include flex-justify-align(flex-start, center);
              .label-text {
                @include sc(format(28), #3D4655);
              }
              .icon-arrow {
                @include wh(format(48), format(48));
              }
            }
          }
        }
      }
    }
  }
</style>
