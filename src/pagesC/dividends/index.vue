<!--
 * @Author: your name
 * @Date: 2021-08-08 21:11:45
 * @LastEditTime: 2021-08-09 04:43:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/dividends/index.vue
-->
<template>
  <view class="dividends-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <view class="current-info">
          <view class="label-info">
            <text class="label-text">当前股本</text>
            <text class="detail" @click.stop="openDividendPage()">明细</text>
          </view>
          <view class="mount-info">
            <text class="mount-text">{{vipUserInfo.shareCapital}}</text>
          </view>
        </view>
        <view class="current-insert">
          <view class="current-divi">
            <text class="label-text">可用分红</text>
            <text class="price-text">{{renderInfo.availableDividend}}</text>
            <text class="label-text">累计分红 0.00</text>
          </view>
          <view class="divident-btn" @click="openWithdrawPage()">提现</view>
        </view>
        <view class="current-group">
          <view class="current-item" @click.stop="openNavigatePage(menu)" v-for="(menu, index) in navigateGroup" :key="index">
            <text class="label-text">{{menu.label}}</text>
            <image :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')" class="arrow-icon" />
          </view>
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
      userBasicInfo: 'userBasicInfo',
      vipUserInfo: 'vipUserInfo'
    })
  },
  methods: {
    ...mapActions({
      asyncFetchDividendInfo: 'asyncFetchDividendInfo'
    })
  }
})
export default class RechargePage extends Vue {
  public title: string = '我的分红';
  public renderInfo: any = {};

  public navigateGroup: any[] = [
    {
      label: '资金明细',
      value: '',
      url: '/pagesC/funding/index?type=funding',
      event: ''
    },
    {
      label: '提现明细',
      value: '',
      url: '/pagesC/funding/index?type=withdraw',
      event: ''
    },
    {
      label: '分享礼包',
      value: '',
      url: '/pagesC/gift-pack/index?type=vip-share',
      event: ''
    },
    {
      label: '查看我的客源',
      value: '',
      url: '/pagesC/customer-source/index?type=customer-source',
      event: ''
    }
  ];

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
  public vipUserInfo: any;
  public asyncFetchDividendInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    // this.renderConfig.productId = options.id;
    this.onReaderInfo();
  }

  private onReaderInfo() {
    this.asyncFetchDividendInfo().then(res => {
      this.renderInfo = res.DATA;
    })
  }

  public openWithdrawPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesC/dividends/withdraw'
    })
  }

  public openDividendPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesC/funding/index'
    })
  }

  public openNavigatePage(info: any) {
    this.$navigateModel.navigateTo({
      url: info.url
    })
  }

}

</script>

<style lang="scss" scoped>
  .dividends-page {
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
        background: #F9F9F9;
        border-radius: format(16) format(16) 0 0;
        .current-info {
          background-color: #3E3E3E;
          @include wh(100%, format(292));
          @include flex-justify-align(flex-start, center);
          flex-direction: column;
          .label-info {
            @include wh(100%, auto);
            @include flex-justify-align(center, flex-start);
            position: relative;
            margin-top: format(40);
            .label-text {
              @include sc(format(28), $default_color);
            }
            .detail {
              @include sc(format(28), $default_color);
              position: absolute;
              right: format(36);
            }
          }
          .mount-info {
            @include wh(100%, auto);
            @include flex-justify-align(center, center);
            margin-top: format(10);
            .mount-text {
              @include sc(format(56), $default_color);
            }
          }
        }
        .current-insert {
          @include wh(format(680), format(240));
          @include flex-justify-align(space-between, center);
          border-radius: format(12);
          transform: translateY(#{format(-84)});
          background-color: $default_color;
          margin: 0 auto;
          .current-divi {
            @include flex-justify-align(center, flex-start);
            flex-direction: column;
            padding-left: format(52);
            .label-text {
              @include sc(format(28), #151515);
            }
            .price-text {
              @include sc(format(56), #151515);
              margin-top: format(8);
            }
          }
          .divident-btn {
            @include wh(format(194), format(80));
            @include flex-justify-align(center, center);
            @include click-active();
            border: format(2) solid #BBBBBB;
            border-radius: format(80);
            margin-right: format(34);
          }
        }
        .current-group {
          @include wh(100%, auto);
          @include flex-justify-align(center, center);
          transform: translateY(#{format(-60)});
          flex-direction: column;
          margin: 0 auto;
          .current-item {
            @include wh(format(680), format(112));
            @include flex-justify-align(space-between, center);
            @include click-active();
            background-color: $default_color;
            .label-text {
              @include sc(format(32), #1C222A);
              margin-left: format(48);
            }
            .arrow-icon {
              @include wh(format(48), format(48));
              margin-right: format(12);
            }
          }
        }
      }
    }
  }
</style>
