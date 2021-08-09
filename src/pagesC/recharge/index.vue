<!--
 * @Author: houli
 * @Date: 2021-08-08 21:05:41
 * @LastEditTime: 2021-08-08 23:40:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/recharge/index.vue
-->
<template>
  <view class="recharge-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="recharge-header">
          <text class="label-text">余额（元）</text>
          <text class="value-text">{{renderInfo.availableDividend}}</text>
        </view>
        <view class="recharge-input">
          <text class="label-text">充值金额（元）</text>
          <input class="input-info" type="digit" data-unit="¥" v-model="renderConfig.amount"/>
        </view>
        <view class="recharge-group">
          <view @click.stop="renderConfig.amount = item.value" :class="['recharge-item', renderConfig.amount === item.value ? 'active' : '']" v-for="item in rechargeList" :key="item.value">{{item.label}}</view>
        </view>
        <view class="recharge-btn-group">
          <view class="recharge-btn" @click.stop="onSubmitChange()">立即充值</view>
          <text class="recharge-text" @click.stop="openConsumptionPage()">余额明细</text>
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
      asyncFetchRechargeInfo: 'asyncFetchRechargeInfo',
      asyncPostRechargeInfo: 'asyncPostRechargeInfo'
    })
  }
})
export default class RechargePage extends Vue {
  public title: string = '余额充值';
  public renderInfo: any = {};

  public rechargeList: any[] = [
    {
      label: '￥100',
      value: '100'
    },
    {
      label: '￥200',
      value: '200'
    },
    {
      label: '￥500',
      value: '500'
    },
    {
      label: '￥800',
      value: '800'
    },
    {
      label: '￥1000',
      value: '1000'
    },
    {
      label: '￥2000',
      value: '2000'
    }
  ];

  public renderConfig: any = {
    amount: null
  };

  public systemService = new SystemService();

  // VUEX
  public userBasicInfo: any;

  public asyncFetchRechargeInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncPostRechargeInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
  }

  // 获取当前账户金额
  public fetchRechargeInfo() {
    this.asyncFetchRechargeInfo().then(res => {
      this.renderInfo = res.DATA;
    })
  }

  // 打开资金明细
  public openConsumptionPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesC/consumption/index?type=consumption'
    })
  }

  // 提交充值
  public onSubmitChange() {
    if (!this.renderConfig.amount) {
      this.systemService.createToast({
        title: '请选择/输入需要充值的金额',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.asyncPostRechargeInfo(this.renderConfig).then(res => {
      this.systemService.openLoadWexPlayChange({...res.DATA, package: res.DATA.packageValue, success: () => {
        this.systemService.createToast({
          title: '充值成功',
          icon: 'success',
          duration: 2000
        })
      }, fail: () => {
        this.systemService.createToast({
          title: '充值失败，请稍后再试',
          icon: 'error',
          duration: 2000
        })
      }})
    })
  }

}

</script>

<style lang="scss" scoped>
  .recharge-info-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    background-color: $default_color;
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      background-color: $default_color;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        background: $default_color;
        border-radius: format(16) format(16) 0 0;
        .recharge-header {
          @include wh(100%, format(244));
          @include flex-justify-align(center, center);
          background-color: #F9F9F9;
          flex-direction: column;
          .label-text {
            @include sc(format(32), #1C222A);
          }
          .value-text {
            @include sc(format(56), #101010);
            margin-top: format(26);
          }
        }
        .recharge-input {
          @include wh(calc(100% - #{format(60)}), auto);
          @include flex-justify-align(center, flex-start);
          flex-direction: column;
          padding: 0 format(30);
          .label-text {
            @include sc(format(32), #1C222A);
          }
          .input-info {
            border: none;
            @include wh(calc(100% - #{format(60)}), format(80));
            @include sc(format(56), #101010);
            @include flex-justify-align(flex-start, center);
            position: relative;
            // text-indent: format(60);
            padding-left: format(60);
            &::before {
              content: attr(data-unit);
              @include sc(format(36), #101010);
              position: absolute;
              left: 0;
            }
            &::after {
              content: '';
              @include wh(100%, format(2));
              background: #D2D2D2;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
        }
        .recharge-group {
          @include wh(100%, auto);
          @include grid-col-row-gap(repeat(3, format(198)), repeat(2, format(148)), format(36), format(28));
          padding: 0 format(32);
          margin: format(60) 0;
          .recharge-item {
            @include wh(100%, 100%);
            @include flex-justify-align(center, center);
            @include sc(format(40), #FF9800);
            @include click-active();
            flex-direction: column;    
            border-radius: format(8);
            background-color: #FFF5E4;
            &.active {
              background-color: #FF9800;
              color: $default_color;
            }
          }
        }
        .recharge-btn-group {
          @include wh(100%, auto);
          @include flex-justify-align(center, center);
          flex-direction: column;
          .recharge-btn {
            @include wh(format(690), format(80));
            @include sc(format(28), $default_color);
            @include flex-justify-align(center, center);
            @include click-active();
            background-color: #FF9800;
            border-radius: format(200);
          }
          .recharge-text {
            @include wh(auto, format(112));
            @include sc(format(28), #151515);
            @include flex-justify-align(center, center);
            @include click-active();
          }
        }
      }
    }
  }
</style>
