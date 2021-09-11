<!--
 * @Author: houli
 * @Date: 2021-08-08 12:42:45
 * @LastEditTime: 2021-08-23 01:23:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pages/user/index.vue
-->
<template>
  <view class="user-info-page">
    <layout-header
      navigateColor="#ffffff"
      :isBack="false"
      :title="title"
      :customStyle="{ justifyContent: 'flex-start', textIndent: '1em', background: 'transparent' }"
      class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <view class="user-info">
          <view class="user-anthor">
            <view class="anthor-image">
              <image class="image" :src="renderInfo.avatarUrl || $CoreTools.imageUrlToHostChange('/statics/svgs/user/user-lever-02@2x.svg')"/>
            </view>
            <view class="anthor-info">
              <text class="username">{{renderInfo.nickName}}</text>
              <view class="lever">
                <image :src="$CoreTools.imageUrlToHostChange('/statics/svgs/user/user-lever-02@2x.svg')" class="lever-icon" />
                <text class="label-text">至臻2</text>
              </view>
            </view>
          </view>
          <view class="view-code">
            <image :src="$CoreTools.imageUrlToHostChange('/statics/svgs/user/user-qrcode@2x.svg')" class="image-code" />
            <image :src="$CoreTools.imageUrlToHostChange('/statics/svgs/home/home-arrow-icon@2x.svg')" class="arrow-icon" />
          </view>
        </view>
        <view class="vip-info">
          <view :class="['vip-info-text', renderInfo.isShareHolder ? 'vip' : '']">
            <text class="label-text">VIP</text>
            <text class="value-text" v-if="renderInfo.isShareHolder">股东会员 {{renderInfo.memberCode}}</text>
            <text class="value-text" v-else>普通会员 {{renderInfo.memberCode}}</text>
          </view>
          <view class="price-group">
            <text class="price-mout">余额：{{renderInfo.balance || 0}}</text>
            <text class="price-integral">积分：0</text>
            <text class="price-other"></text>
          </view>
        </view>
        <view class="menu-info">
          <text class="title-text">常用工具</text>
          <view class="menu-group">
            <block v-for="menu in menuUtils" :key="menu.icon">
              <view class="menu-item" @click.stop="onOpenMenuEvent(menu)" v-if="!menu.isVIP || menu.isVIP && renderInfo.isShareHolder">
                <image :src="$CoreTools.imageUrlToHostChange(menu.icon)" class="menu-item-icon" />
                <text class="label-text">{{menu.label}}</text>
              </view>
            </block>
          </view>
        </view>
        <view class="menu-info">
          <text class="title-text">我的服务</text>
          <view class="menu-group">
            <block v-for="menu in menuServices" :key="menu.icon">
              <view class="menu-item" @click.stop="onOpenMenuEvent(menu)" v-if="!menu.isVIP || menu.isVIP && renderInfo.isShareHolder">
                <image :src="$CoreTools.imageUrlToHostChange(menu.icon)" class="menu-item-icon" />
                <text class="label-text">{{menu.label}}</text>
              </view>
            </block>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, } from 'vue-property-decorator';
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncAccountUserInfo: 'asyncAccountUserInfo'
    })
  }
})
export default class ReserveInfoPage extends Vue {
  public title: string = '用户中心';
  public renderInfo: any = {};

  // 菜单列表
  public menuUtils = [
    {
      label: '余额充值',
      value: '',
      icon: '/statics/svgs/user/user-menu-01@2x.svg',
      url: '/pagesC/recharge/index',
      event: ''
    },{
      label: '我的分红',
      value: '',
      icon: '/statics/svgs/user/user-menu-02@2x.svg',
      isVIP: true,
      url: '/pagesC/dividends/index',
      event: ''
    },{
      label: '我的礼包',
      value: '',
      icon: '/statics/svgs/user/user-menu-03@2x.svg',
      url: '/pagesC/gift-pack/index',
      event: ''
    },{
      label: '分享好友',
      value: '',
      icon: '/statics/svgs/user/user-menu-04@2x.svg',
      url: '',
      event: 'onShareFirend'
    }
  ];

  // 服务菜单
  public menuServices = [
    {
      label: '我的客源',
      value: '',
      icon: '/statics/svgs/user/user-menu-05@2x.svg',
      url: '/pagesC/customer-source/index?type=customer-source',
      isVIP: true,
      event: ''
    },{
      label: '资金明细',
      value: '',
      icon: '/statics/svgs/user/user-menu-06@2x.svg',
      url: '/pagesC/consumption/index?type=consumption',
      event: ''
    },{
      label: '消费明细',
      value: '',
      icon: '/statics/svgs/user/user-menu-07@2x.svg',
      url: '/pagesC/consumption/index?type=funding',
      event: ''
    },{
      label: '完善资料',
      value: '',
      icon: '/statics/svgs/user/user-menu-08@2x.svg',
      url: '/pagesC/complete-material/index',
      event: ''
    }
  ];

  // VUEX
  public asyncFetchProductInfo: (info: any) => Promise<ApiResponseModel>;
  public asyncAccountUserInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.onRenderInfo();
  }

  private onRenderInfo() {
    this.asyncAccountUserInfo().then(res => {
      this.renderInfo = res.DATA;
    })
  }

  public onOpenMenuEvent(info: any) {
    // console.log(info);
    if (!info.event) {
      this.$navigateModel.navigateTo({
        url: info.url
      })
    } else {
      this[info.event]();
    }
  }

  // 分享
  private onShareFirend() {
    uni.getProvider({
      service: 'share',
      success: ({ service, provider }) => {
        uni.share({
          provider: provider[0],
          title: '送给您价值599元的学习大礼包！',
          href: '/pages/home/index',
          imageUrl: '',
          success: (result) => {
            console.log(result);
          },
          fail: (error) => {
            console.log(error);
          }
        })
      },
      fail: (error) => {}
    })
    
  }
}

</script>

<style lang="scss" scoped>
  .user-info-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    @include bimage('/statics/images/user/user-default_baground@2x.png');
    background-size: 100% contain;
    background-repeat: no-repeat;
    background-color: $default_color;
    background-position: 0 format(-500);
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      // background-color: $default_color;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        .user-info {
          @include wh(calc(100% - #{format(60)}), auto);
          @include flex-justify-align(flex-start, center);
          padding: format(38) format(30);
          .user-anthor {
            flex: 1;
            @include flex-justify-align(flex-start, center);
            .anthor-image {
              @include wh(format(144), format(144));
              border-radius: 50%;
              background-color: $default_color;
              overflow: hidden;
              .image {
                @include wh(100%, 100%);
              }
            }
            .anthor-info {
              @include flex-justify-align(center, flex-start);
              flex-direction: column;
              padding-left: format(30);
              .username {
                @include sc(format(34), $default_color);
              }
              .lever {
                @include flex-justify-align(flex-start, center);
                height: format(32);
                background: #FFD502;
                border-radius: format(40);
                padding: 0 format(12);
                position: relative;
                padding-left: format(44);
                margin-top: format(16);
                .lever-icon {
                  @include wh(format(32), format(32));
                  background-color: $default_color;
                  border-radius: 50%;
                  position: absolute;
                  left: 0;
                }
                .label-text {
                  @include sc(format(20), $default_color);
                }
              }
            }
          }
          .view-code {
            @include flex-justify-align(flex-start, center);
            .image-code {
              @include wh(format(56), format(56));
            }
            .arrow-icon {
              @include wh(format(48), format(48));
            }
          }
        }
        .vip-info {
          @include wh(format(690), format(368));
          @include flex-justify-align(flex-start, flex-start);
          flex-direction: column;
          border-radius: format(32);
          background: #2F2F2F;
          margin: 0 auto;
          .vip-info-text {
            @include wh(calc(100% - #{format(52)}), auto);
            @include flex-justify-align(space-between, flex-start);
            padding: format(32) format(26);
            &.vip {
              .label-text {
                @include sc(format(180), #EED1A9);
              }
              .value-text {
                @include sc(format(28), #EED1A9);
                @include overflow-text(1);
                word-wrap: break-word;
                white-space: normal;
                word-break: break-all;
              }
            }
            .label-text {
              @include wh(auto, format(140));
              @include sc(format(180), #ACACAC);
              @include flex-justify-align(center, center);
            }
            .value-text {
              @include sc(format(28), #ACACAC);
            }
          }
          .price-group {
            flex: 1;
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, center);
            .price-mout,
            .price-integral,
            .price-other {
              flex: 1;
              @include sc(format(28), $default_color);
              padding-left: format(50);
            }
          }
        }
        .menu-info {
          @include wh(100%, auto);
          background: $default_color;
          .title-text {
            @include wh(calc(100% - #{format(64)}), format(106));
            @include flex-justify-align(space-between, center);
            padding: 0 format(32);
            position: relative;
            &::before {
              content: '';
              @include wh(format(690), format(2));
              background: #F9F9F9;
              position: absolute;
              bottom: 0;
            }
          }
          .menu-group {
            @include grid-col-row-gap(repeat(4, 1fr), repeat(1, format(128)), 0, 0);
            padding: format(40) 0;
            .menu-item {
              @include wh(100%, 100%);
              @include flex-justify-align(center, center);
              flex-direction: column;
              .menu-item-icon {
                @include wh(format(56), format(56));
              }
              .label-text {
                @include sc(format(26), #666666);
                margin-top: format(16);
              }
            }
          }
        }
      }
    }
  }
</style>
