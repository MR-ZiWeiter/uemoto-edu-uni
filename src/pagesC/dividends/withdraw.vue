<!--
 * @Author: your name
 * @Date: 2021-08-09 00:54:11
 * @LastEditTime: 2021-08-09 02:06:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/dividends/withdraw.vue
-->
<template>
  <view class="withdraw-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="current-info">
          <view class="label-info">
            <text class="label-text">可提现金额（元）</text>
          </view>
          <view class="mount-info">
            <text class="mount-text">0.00</text>
          </view>
        </view>
        <view class="current-group">
          <view class="current-item">
            <text class="label-text">提现金额</text>
            <input v-model="renderConfig.amount" type="digit" placeholder="最低提现10.00元" class="input-sty"/>
          </view>
          <view class="current-item">
            <text class="label-text">姓名</text>
            <input v-model="renderConfig.name" type="text" placeholder="请输入真实姓名" class="input-sty"/>
          </view>
          <view class="current-item">
            <text class="label-text">开卡银行</text>
            <input v-model="renderConfig.backName" type="text" placeholder="请输入开卡银行" class="input-sty"/>
          </view>
          <view class="current-item">
            <text class="label-text">银行卡号</text>
            <input v-model="renderConfig.backNum" type="number" placeholder="请输入银行卡号" class="input-sty"/>
          </view>
        </view>
        <view class="current-mount">
          <text class="label-text">提现费率：0%</text>
        </view>
        <view class="current-btn-group">
          <view class="current-btn" @click.stop="onSubmitChange()">提交</view>
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
      asyncPostProductReserveInfo: 'asyncPostProductReserveInfo',
      asyncPostDividendInfo: 'asyncPostDividendInfo'
    })
  }
})
export default class RechargePage extends Vue {
  public title: string = '我要提现';
  public renderInfo: any = {};

  public renderConfig: any = {
    amount: null,
    name: null,
    backName: null,
    backNum: null
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
  public asyncPostProductReserveInfo: (info: any) => Promise<ApiResponseModel>;
  public asyncPostDividendInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.renderConfig.productId = options.id;
  }

  public onSubmitChange() {
    if (!this.renderConfig.amount) {
      this.systemService.createToast({
        title: '请输入提现金额',
        icon: 'error',
        duration: 2000
      });
    } else if (this.renderConfig.amount < 10) {
      this.systemService.createToast({
        title: '提现金额不能低于10元',
        icon: 'error',
        duration: 2000
      });
    } else if (!this.renderConfig.name) {
      this.systemService.createToast({
        title: '请输入提现人姓名',
        icon: 'error',
        duration: 2000
      });
    } else if (!this.renderConfig.backName) {
      this.systemService.createToast({
        title: '请输入提现开卡银行',
        icon: 'error',
        duration: 2000
      });
    } else if (!this.renderConfig.backNum) {
      this.systemService.createToast({
        title: '请输入提现开卡银行卡号',
        icon: 'error',
        duration: 2000
      });
    }
    this.asyncPostDividendInfo(this.renderConfig).then(res => {
      this.systemService.createToast({
        title: '提现成功',
        icon: 'success',
        duration: 2000
      });
      setTimeout(() => {
        this.$navigateModel.navigateBack({
          delta: 1
        })
      }, 2000);
    })
  }

}

</script>

<style lang="scss" scoped>
  .withdraw-page {
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
        .current-group {
          @include wh(format(600), auto);
          @include flex-justify-align(flex-start, flex-start);
          flex-direction: column;
          border-radius: format(12);
          transform: translateY(#{format(-84)});
          background-color: $default_color;
          margin: 0 auto;
          padding: format(24) format(40);
          .current-item {
            @include wh(100%, format(112));
            @include flex-justify-align(space-between, center);
            border-bottom: format(2) solid #EAEAEA;
            .label-text {
              @include sc(format(32), #1C222A);
            }
            .input-sty {
              flex: 1;
              border: none;
              @include sc(format(32),  #000);
              text-align: right;
            }
          }
        }
        .current-mount {
          padding-left: format(64);
          .label-text {
            @include sc(format(28), #151515);
          }
        }
        .current-btn-group {
          @include wh(format(690), format(80));
          @include sc(format(28), $default_color);
          @include flex-justify-align(center, center);
          margin: 0 auto;
          border-radius: format(80);
          margin-top: format(96);
          .current-btn {
            @include wh(format(690), format(80));
            @include flex-justify-align(center, center);
            @include click-active();
            border-radius: format(80);
            background-color: #FF9800;
          }
        }
      }
    }
  }
</style>
