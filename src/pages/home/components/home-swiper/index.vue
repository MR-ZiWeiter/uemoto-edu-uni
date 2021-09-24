<template>
  <view class="home-swiper-component">
    <swiper
      class="swiper-container"
      indicator-dots
      autoplay
      circular>
      <swiper-item @click="openBannerPage(item)" class="swiper-item-sty" v-for="(item, index) in renderInfo" :key="index">
        <image class="swiper-item-sty-image" mode="aspectFill" :src="item.url"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
import { SystemService } from '@/services/system';
import { WebviewService } from '@/services/webview';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncFetchHomeBannerInfo: 'asyncFetchHomeBannerInfo'
    })
  }
})
export default class HomeSwiperComponent extends Vue {

  public renderInfo: Array<any> = [];

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  private webviewService = new WebviewService();

  // vuex
  private asyncFetchHomeBannerInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeBannerInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA;
    })
  }

  public openBannerPage(info: any) {
    this.webviewService.openWebviewByUrl(info.url);
  }
}
</script>

<style lang="scss" scoped>
  @import './index';
</style>
