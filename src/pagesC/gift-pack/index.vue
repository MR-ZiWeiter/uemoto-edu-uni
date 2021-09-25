<!--
 * @Author: your name
 * @Date: 2021-08-08 21:12:00
 * @LastEditTime: 2021-08-09 04:23:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/gift-pack/index.vue
-->
<template>
  <view class="gift-pack-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="gift-pack-header">
          <text class="label-text" v-if="isShare && !isShareIn">分享价值3980元余额680元黑金卡和优惠券大礼包给好友</text>
          <text class="label-text" v-else-if="!isShare && !isShareIn">好友给你送大礼包了</text>
          <text class="label-text" v-else>已领取的礼包</text>
        </view>
        <view class="gift-pack-card">
          <image :src="renderInfo.imageUrl || $CoreTools.imageUrlToHostChange('/statics/images/user/user-gift-pack-card@2x.png')" @error="onImageError" class="gift-pack-card-image"/>
        </view>
        <view v-if="isShare" class="end-timer">
          <text class="label-text">剩余 {{renderInfo.couponBagCount}}/{{renderInfo.useCount}} 截止 {{renderInfo.expireTime}}</text>
        </view>
        <view class="tab-group" v-if="!isShare">
          <view :class="['tab-item', typeSelect === '01' ? 'active' : '']" @click="typeSelect = '01'">优惠券礼包</view>
          <!-- <view :class="['tab-item', typeSelect === '02' ? 'active' : '']" @click="typeSelect = '02'">商户介绍</view> -->
        </view>
        <view class="pack-group" v-if="typeSelect === '01'">
          <view class="pack-item" v-for="(item, index) in renderInfo.couponItems" :key="index">
            <image :src="item.couponInfo.imageUrl || item.imageUrl" class="min-icon" />
            <view class="pack-item-info">
              <text class="title-text">{{item.couponInfo.title || item.title}}</text>
              <text class="label-text">满{{item.description || item.discountMinimumConsume}}元可用</text>
              <text class="label-text" v-if="item.couponInfo.expireDay">{{item.couponInfo.expireDay}}天后到期</text>
              <text class="label-text" v-else>{{item.expireDate}}前使用</text>
            </view>
          </view>
          <view class="content-null" v-if="!renderInfo.couponItems && !renderInfo.couponItems.length">
            <text class="label-text">暂无数据</text>
          </view>
        </view>
        <view class="pack-info" v-if="typeSelect === '02'">
          
        </view>
        <view class="btn-share" v-if="isShare">
          <button class="label-text" open-type="share">立即分享</button>
        </view>
        <view class="btn-in" v-if="!isShare && renderInfo.couponItems && isShareIn">
          <view class="label-text" @click="openCourse()">立即领取</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { SystemService } from '@/services/system';
import { ToolsService } from '@/services/tools';
import Vue from 'vue';
import { Component, Watch, } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
@Component({
  computed: {
    ...mapGetters({
      token: 'token',
      userBasicInfo: 'userBasicInfo'
    })
  },
  methods: {
    ...mapActions({
      asyncFetchCouponListInfo: 'asyncFetchCouponListInfo',
      asyncFetchOdyCouponListInfo: 'asyncFetchOdyCouponListInfo',
      asyncFetchOdiedCouponListInfo: 'asyncFetchOdiedCouponListInfo',
      asyncPostInReceiveCouponBag: 'asyncPostInReceiveCouponBag',
      unifyLogin: 'unifyLogin'
    })
  }
})
export default class GiftPackPage extends Vue {
  public title: string = '礼包分享';
  public renderInfo: any = {
    couponItems: []
  };

  public typeSelect: string = '01';

  // 是否为股东分享
  public isShare: boolean = false;

  // 是否为普通用户领取
  public isShareIn: boolean = false;
  public renderConfig: any = {
    appointmentTime: null,
    phoneNo: null,
    productId: null,
    userName: null
  };

  public systemService = new SystemService();
  public toolsService = new ToolsService();

  public shareConfig = {
    couponBagId: null,
    shareHolderUserId: null
  }

  // VUEX
  public token!: any;
  public userBasicInfo: any;
  @Watch('userBasicInfo', {deep: true, immediate: true}) private userBasicInfoChange(n: any) {
    // console.log(n);
    if (n) {
      this.renderConfig.userName = n.nickName
      this.shareConfig.shareHolderUserId = n.userId
    }
  }
  public asyncFetchCouponListInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncFetchOdyCouponListInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncFetchOdiedCouponListInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncPostInReceiveCouponBag: (info?: any) => Promise<ApiResponseModel>;
  public unifyLogin: (info?: any) => Promise<ApiResponseModel>;

  // 设置分享
  onShareAppMessage(res: { from: string; target: any; }) {
    if (res.from === 'button') {// 来自页面内分享按钮
      // console.log(res.target)
      return {
        title: this.renderInfo.name,
        imageUrl: this.renderConfig.imageUrl,
        content: this.renderConfig.description,
        desc: this.renderConfig.description,
        query: `isShareIn=true&couponBagId=${this.shareConfig.couponBagId}&shareHolderUserId=${this.shareConfig.shareHolderUserId}`,
        path: `/pagesC/gift-pack/index?isShareIn=true&couponBagId=${this.shareConfig.couponBagId}&shareHolderUserId=${this.shareConfig.shareHolderUserId}`,
        success: () => {
          this.toolsService.customToast('分享成功~');
        }
      }
    }
    return {
      title: this.renderInfo.name,
      imageUrl: this.renderConfig.imageUrl,
      content: this.renderConfig.description,
      desc: this.renderConfig.description,
      query: `isShareIn=true&couponBagId=${this.shareConfig.couponBagId}&shareHolderUserId=${this.shareConfig.shareHolderUserId}`,
      path: `/pagesC/gift-pack/index?isShareIn=true&couponBagId=${this.shareConfig.couponBagId}&shareHolderUserId=${this.shareConfig.shareHolderUserId}`
    }
  }

  onLoad(options: any) {
    // this.renderConfig.productId = options.id;
    if (options.isShareIn) {
      this.isShareIn = true;
      uni.setStorageSync('can-pack-info', options);
      this.onRenderInf('asyncFetchOdyCouponListInfo');
    } else {
      if (options.type === 'vip-share') {
        this.onRenderInf('asyncFetchCouponListInfo');
        this.isShare = true;
      } else {
        this.onRenderInf('asyncFetchOdiedCouponListInfo');
        this.isShare = false;
      }
    }
  }

  public onRenderInf(renderName: 'asyncFetchCouponListInfo' | 'asyncFetchOdyCouponListInfo' | 'asyncFetchOdiedCouponListInfo') {
    // this.userBasicInfo.isShareHolder === '01' ? 'asyncFetchCouponListInfo' : 'asyncFetchOdyCouponListInfo'
    if (renderName === 'asyncFetchCouponListInfo') {
      this.title = '礼包分享';
    } else if (renderName === 'asyncFetchOdyCouponListInfo') {
      this.title = '领取大礼包';
    } else if (renderName === 'asyncFetchOdiedCouponListInfo') {
      this.title = '我的礼包';
    }
    this[renderName]().then(res => {
      if (this.isShare || this.isShareIn) {
        this.renderInfo = res.DATA;
        this.shareConfig.couponBagId = res.DATA.couponBagId || null;
      } else {
        this.renderInfo.couponItems = res.DATA.rows;
      }
    })
  }

  public onImageError() {
    this.renderInfo.imageUrl = this.$CoreTools.imageUrlToHostChange('/statics/images/user/user-gift-pack-card@2x.png');
  }

  public openCourse() {
    // this.$navigateModel.switchTab({
    //   url: '/pages/course/index'
    // })
    const options = uni.getStorageSync('can-pack-info');
    if (!this.token) {
      if (options && options.isShareIn) {
        uni.setStorageSync('can-pack-info', options);
        this.toolsService.customToast('授权登录小程序即可领取大礼包～');
        if (!uni.getStorageSync('redict-url')) {
          uni.setStorageSync('redict-url', (getCurrentPages()[0] as any).$page.fullPath || ('/' + getCurrentPages()[0].route));
        }
        this.unifyLogin().then(res => {
          this.fetchPack(options);
          this.onRenderInf('asyncFetchOdiedCouponListInfo');
        })
      } else {
        this.toolsService.customToast('您当前不可领取该礼包~');
      }
    } else {
      if (options && options.isShareIn) {
        this.fetchPack(options);
        this.onRenderInf('asyncFetchOdiedCouponListInfo');
      } else {
        this.toolsService.customToast('您当前不可领取该礼包~');
      }
    }
  }

  // 领取操作
  public fetchPack(options: any) {
    this.asyncPostInReceiveCouponBag(options).then(res => {
      this.toolsService.customToast('领取成功');
      uni.removeStorageSync('can-pack-info');
    })
  }
}

</script>

<style lang="scss" scoped>
  .gift-pack-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    background-color: #F9F9F9;
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #F9F9F9;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        background: #F2F2F2;
        border-radius: format(16) format(16) 0 0;
        .gift-pack-header {
          background: #3E3E3E;
          @include wh(100%, format(312));
          @include flex-justify-align(center, flex-star);
          padding-top: format(56);
          .label-text {
            @include sc(format(36), $default_color);
            @include wh(format(550), autu);
            text-align: center;
          }
        }
        .gift-pack-card {
          @include wh(100%, auto);
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-136)});
          .gift-pack-card-image {
            @include wh(format(716), format(452));
          }
        }
        .end-timer {
          @include wh(100%, auto);
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-100)});
          .label-text {
            @include wh(format(530), format(54));
            @include sc(format(24), $default_color);
            @include flex-justify-align(center, center);
            background: #FF4D4D;
            border-radius: format(54);
          }
        }
        .pack-group {
          @include flex-justify-align(flex-start, center);
          flex-direction: column;
          transform: translateY(#{format(-100)});
          margin-top: format(26);
          .pack-item {
            @include wh(format(624), format(206));
            @include flex-justify-align(flex-start, center);
            background-color: $default_color;
            margin-bottom: format(20);
            position: relative;
            &::before {
              content: '';
              @include wh(format(44), format(44));
              border-radius: 50%;
              background: #F2F2F2;
              position: absolute;
              left: format(-22);
            }
            &::after {
              content: '';
              @include wh(format(44), format(44));
              border-radius: 50%;
              background: #F2F2F2;
              position: absolute;
              right: format(-22);
            }
            .min-icon {
              @include wh(format(156), format(156));
              margin: format(28) format(30);
            }
            .pack-item-info {
              @include flex-justify-align(space-around, flex-start);
              flex-direction: column;
              .title-text {
                @include sc(format(36), #101010);
              }
              .label-text {
                @include sc(format(24), #ACA9A4);
                margin-top: format(8);
              }
            }
          }
        }
        .btn-share,
        .btn-in {
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-60)});
          .label-text {
            @include wh(format(630), format(80));
            @include flex-justify-align(center, center);
            @include sc(format(28), $default_color);
            background-color: #FF9800;
            border-radius: format(80);
            &::after {
              display: none;
            }
          }
        }
        .tab-group {
          @include wh(100%, format(124));
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-100)});
          .tab-item {
            @include sc(format(32), #999999);
            @include wh(100%, 100%);
            @include flex-justify-align(center, center);
            flex: 1;
            &.active {
              color: #FF9800;
              position: relative;
              &::before {
                @include wh(format(128), format(4));
                background: #FF9800;
                content: '';
                position: absolute;
                bottom: format(20);
              }
            }
          }
        }
        .content-null {
          @include wh(100%, format(400));
          @include flex-justify-align(center, center);
        }
      }
    }
  }
</style>
