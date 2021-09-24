<template>
  <view class="home-notification-component">
    <view class="notification-info">
      <view class="label-group" @click="openNotiInfoPage()">
        <image class="notification-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-notification-icon@2x.svg')" mode="aspectFill"/>
        <rich-text class="title-text" :nodes="renderInfo.description"></rich-text>
      </view>
      <view class="ready-more" @click="openNotificationPage()">
        <text class="label-text">更多</text>
        <image class="more-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')"></image>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncFetchHomeNotificationInfo: 'asyncFetchHomeNotificationInfo'
    })
  }
})
export default class HomeNotificationComponent extends Vue {
  public renderInfo: any = {};

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHomeNotificationInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeNotificationInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA;
    })
  }

  // openList
  public openNotificationPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesA/notification-list/index'
    })
  }

  public openNotiInfoPage() {
    // this.$navigateModel
    // asyncFetchHomeNotiDetailInfo
    this.$navigateModel.navigateTo({
      url: '/pagesA/notification-list/detail',
      query: {id: this.renderInfo.id, type: 'asyncFetchHomeNotiDetailInfo'}
    })
  }
}

</script>

<style lang="scss" scoped>
  @import './index';
</style>

