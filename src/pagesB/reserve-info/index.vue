<!--
 * @Author: houli
 * @Date: 2021-08-07 15:14:35
 * @LastEditTime: 2021-08-08 14:05:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesB/reserve-info/index.vue
-->
<template>
  <view class="reserve-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="reserve-header-info">
          <text class="reserve-text">2020年夏季初三语文教学计划</text>
        </view>
        <view class="reserve-information">
          <text class="title-text">预约免费体验课</text>
          <text class="label-text">预约成功后，我们将人工联系您，请务必填写正确的手机号码，注意接听来电。</text>
          <input type="tel" v-model="renderConfig.phoneNo" class="input-info" placeholder="输入手机号码"/>
          <view class="submit-button" @click.stop="onSubmitInfo()">提交</view>
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
      asyncPostProductReserveInfo: 'asyncPostProductReserveInfo'
    })
  }
})
export default class ReserveInfoPage extends Vue {
  public title: string = '预约详情';
  public renderInfo: any = {};

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
  public asyncPostProductReserveInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.renderConfig.productId = options.id;
  }

  public onSubmitInfo() {
    if (!this.$ValidateTools.validator.isMobile(String(this.renderConfig.phoneNo))) {
      this.systemService.createToast({
        title: '请输入正确的手机号',
        duration: 2000,
        icon: 'none'
      })
      return;
    }
    this.asyncPostProductReserveInfo({
      ...this.renderConfig,
      appointmentTime: new Date().getTime()
    }).then(res => {
      // this.renderInfo = res.DATA;
      this.systemService.createToast({
        title: '提交预约成功',
        duration: 2000,
        icon: 'success'
      })
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
  .reserve-info-page {
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
        .reserve-header-info {
          @include wh(calc(100% - #{format(60)}), format(264));
          border-radius: format(16);
          background: $default_color_9;
          position: relative;
          margin: 0 format(30);
          margin-top: format(30);
          .reserve-text {
            @include sc(format(32), $default_color);
            font-weight: 500;
            position: absolute;
            bottom: format(16);
            left: format(24);
          }
        }
        .reserve-information {
          @include wh(format(690), format(498));
          @include flex-justify-align(center, center);
          margin: 0 format(30);
          background: $default_color;
          margin-top: format(40);
          flex-direction: column;
          .title-text {
            @include wh(100%, format(108));
            @include sc(format(34), #1C222A);
            @include flex-justify-align(center, center);
            font-weight: bold;
          }
          .label-text {
            @include wh(format(630), auto);
            @include sc(format(28), #666);
            margin-bottom: format(30);
            text-align: center;
            font-weight: 400;
          }
          .input-info {
            @include wh(format(630), format(80));
            background: #F9F9F9;
            text-align: center;
          }
          .submit-button {
            @include wh(format(630), format(80));
            @include flex-justify-align(center, center);
            @include sc(format(28), $default_color);
            @include click-active();
            border-radius: format(80);
            margin-top: format(50);
            background: #FF9800;
            text-align: center;
          }
        }
      }
    }
  }
</style>
