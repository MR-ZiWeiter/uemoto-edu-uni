<template>
  <view class="home-swiper-component">
    <swiper
      class="swiper-container"
      indicator-dots
      autoplay
      circular>
      <swiper-item class="swiper-item-sty" v-for="item in renderInfo" :key="item.sort">
        <image class="swiper-item-sty-image" mode="widthFix" :src="item.url"></image>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts">
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

  // vuex
  private asyncFetchHomeBannerInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeBannerInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA;
    })
  }
}
</script>

<style lang="scss" scoped>
  @import './index';
</style>
