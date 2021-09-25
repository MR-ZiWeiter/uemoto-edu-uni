<!--
 * @Author: your name
 * @Date: 2021-08-08 21:11:21
 * @LastEditTime: 2021-08-09 03:06:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/complete-material/index.vue
-->
<template>
  <view class="recharge-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="group">
          <view class="cell-item">
            <text class="label-text">头像</text>
            <image :src="userBasicInfo.avatarUrl" mode="aspectFill" class="anthor-info" />
          </view>
          <view class="cell-item">
            <text class="label-text">昵称</text>
            <text class="value-text">{{userBasicInfo.nickName}}</text>
          </view>
        </view>
        <view class="group">
          <view class="cell-item">
            <text class="label-text">真实姓名</text>
            <!--  :readonly="userBasicInfo.userName" :disabled="userBasicInfo.userName" -->
            <input class="value-input" type="text" placeholder="请输入真实姓名" v-model="renderConfig.userName" />
          </view>
          <view class="cell-item">
            <text class="label-text">手机</text>
            <!--  :readonly="userBasicInfo.phoneNo" :disabled="userBasicInfo.phoneNo" -->
            <input class="value-input" type="tel" :readonly="userBasicInfo.phoneNo" :disabled="userBasicInfo.phoneNo" placeholder="请输入手机号码" maxlength="11" max="19999999999" v-model="renderConfig.phoneNo"/>
          </view>
        </view>
        <text class="desc-info-text">请认真填写，资料一经完善不可修改。</text>
      </view>
    </scroll-view>
    <view class="submit-btn">
      <view class="change-info" @click="changeInfo">确定</view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { SystemService } from '@/services/system';
import { Component, Watch, } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { ToolsService } from '@/services/tools';
@Component({
  computed: {
    ...mapGetters({
      userBasicInfo: 'userBasicInfo'
    })
  },
  methods: {
    ...mapActions({
      asyncPostProductReserveInfo: 'asyncPostProductReserveInfo',
      asyncFetchUserBasicInfo: 'asyncFetchUserBasicInfo',
      asyncAccountPutUserInfo: 'asyncAccountPutUserInfo'
    })
  }
})
export default class RechargePage extends Vue {
  public title: string = '完善资料';
  public renderInfo: any = {};

  public renderConfig: any = {
    appointmentTime: null,
    phoneNo: null,
    productId: null,
    userName: null
  };

  public systemService = new SystemService();
  public toolsService = new ToolsService();

  // VUEX
  public userBasicInfo: any;
  @Watch('userBasicInfo', {deep: true, immediate: true}) private userBasicInfoChange(n: any) {
    // console.log(n);
    if (n) {
      this.renderConfig.userName = n.userName;
      this.renderConfig.phoneNo = n.phoneNo;
    }
  }
  public asyncPostProductReserveInfo: (info: any) => Promise<ApiResponseModel>;
  public asyncFetchUserBasicInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncAccountPutUserInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.renderConfig.productId = options.id;
  }

  public changeInfo() {
    this.asyncAccountPutUserInfo(this.renderConfig).then(res => {
      this.toolsService.customToast('更新个人信息成功');
      this.asyncFetchUserBasicInfo();
      setTimeout(() => {
        this.$navigateModel.navigateBack({
          delta: 1
        })
      }, 1500);
    })
  }

}

</script>

<style lang="scss" scoped>
  .recharge-info-page {
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
      flex: 1;
      .content-box {
        @include wh(100%, auto);
        background: #F9F9F9;
        border-radius: format(16) format(16) 0 0;
        .group {
          @include wh(100%, auto);
          margin-top: format(20);
          background: $default_color;
          .cell-item {
            @include wh(auto, format(112));
            @include flex-justify-align(space-between, center);
            padding: 0 format(30);
            .anthor-info {
              @include wh(format(80), format(80));
              border-radius: 50%;
            }
            .label-text {
              @include sc(format(32), #1C222A);
              font-weight: 400;
            }
            .value-text {
              @include sc(format(32), $default_color_9);
              font-weight: 400;
            }
            .value-input {
              @include wh(auto, 100%);
              @include flex-justify-align(flex-end, center);
              @include sc(format(32), #1C222A);
              text-align: right;
              font-weight: 400;
              flex: 1;
            }
          }
        }
        .desc-info-text {
          @include sc(format(28), #101010);
          @include wh(100%, format(84));
          @include flex-justify-align(flex-start, center);
          margin: 0 format(32);
          font-weight: 400;
        }
      }
    }
    .submit-btn {
      @include wh(100%, format(120));
      .change-info {
        @include wh(format(690), format(80));
        @include flex-justify-align(center, center);
        background: #FF9800;
        border-radius: format(80);
        color: $default-color;
        font-size: format(28);
        margin: 0 auto;
      }
    }
  }
</style>
