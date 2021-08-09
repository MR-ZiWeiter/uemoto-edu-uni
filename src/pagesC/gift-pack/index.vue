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
          <text class="label-text" v-if="isShare">分享价值3980元余额680元黑金卡和优惠券大礼包给好友</text>
          <text class="label-text" v-else>{{renderInfo.description}}</text>
        </view>
        <view class="gift-pack-card">
          <image :src="renderInfo.imageUrl || $CoreTools.imageUrlToHostChange('/statics/images/user/user-gift-pack-card@2x.png')"  class="gift-pack-card-image"/>
        </view>
        <view v-if="isShare" class="end-timer">
          <text class="label-text">剩余 {{renderInfo.couponBagCount}}/{{renderInfo.useCount}} 截止 {{renderInfo.expireTime}}</text>
        </view>
        <view class="tab-group">
          <view :class="['tab-item', typeSelect === '01' ? 'active' : '']" @click="typeSelect = '01'">优惠券礼包</view>
          <view :class="['tab-item', typeSelect === '02' ? 'active' : '']" @click="typeSelect = '02'">商户介绍</view>
        </view>
        <view class="pack-group">
          <view class="pack-item" v-for="item in renderInfo.couponItems" :key="item.id">
            <image :src="item.couponInfo.imageUrl" class="min-icon" />
            <view class="pack-item-info">
              <text class="title-text">{{item.couponInfo.title}}</text>
              <text class="label-text">满{{item.couponInfo.discountMinimumConsume}}元可用</text>
              <text class="label-text">{{item.couponInfo.expireDay}}天后到期</text>
            </view>
          </view>
          <view class="content-null" v-if="renderInfo.couponItems || !renderInfo.couponItems.length">
            <text class="label-text">暂无数据</text>
          </view>
        </view>
        <view class="btn-share">
          <view class="label-text">立即分享</view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import { SystemService } from '@/services/system';
import Vue from 'vue';
import { Component, Watch, } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
@Component({
  computed: {
    ...mapGetters({
      userBasicInfo: 'userBasicInfo'
    })
  },
  methods: {
    ...mapActions({
      asyncFetchCouponListInfo: 'asyncFetchCouponListInfo'
    })
  }
})
export default class GiftPackPage extends Vue {
  public title: string = '礼包分享';
  public renderInfo: any = {};

  public typeSelect: string = '01';

  public isShare: boolean = false;

  public renderConfig: any = {
    appointmentTime: null,
    phoneNo: null,
    productId: null,
    userName: null
  };

  public systemService = new SystemService();

  // VUEX
  public userBasicInfo: any;
  @Watch('userBasicInfo', {deep: true, immediate: true}) private userBasicInfoChange(n: any) {
    // console.log(n);
    if (n) {
      this.renderConfig.userName = n.nickName
    }
  }
  public asyncFetchCouponListInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    // this.renderConfig.productId = options.id;
    if (options.type === 'vip-share') {
      this.isShare = true;
    } else {
      this.isShare = false;
    }
    this.onRenderInf();
  }

  public onRenderInf() {
    this.asyncFetchCouponListInfo().then(res => {
      this.renderInfo = res.DATA;
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
          @include flex-justify-align(center, flex-start);
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
        .btn-share {
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-60)});
          .label-text {
            @include wh(format(630), format(80));
            @include flex-justify-align(center, center);
            @include sc(format(28), $default_color);
            background-color: #FF9800;
            border-radius: format(80);
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
