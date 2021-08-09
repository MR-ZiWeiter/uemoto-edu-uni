<!--
 * @Author: your name
 * @Date: 2021-08-08 21:11:37
 * @LastEditTime: 2021-08-09 02:46:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/customer-source/index.vue
-->
<template>
  <view class="customer-source-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <view class="tab-group">
      <view :class="['tab-item', typeSelect === '01' ? 'active' : '']" @click="typeSelect = '01'">已领取</view>
      <view :class="['tab-item', typeSelect === '02' ? 'active' : '']" @click="typeSelect = '02'">已使用</view>
    </view>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <block v-for="item in renderInfo.rows" :key="item.id">
          <view class="anthor-item" v-if="item.balanceChangeType === typeSelect">
            <view class="anthor-info">
              <image src="" class="anthor-image"/>
            </view>
            <view class="label-info">
              <text class="label-text">Icey</text>
              <text class="phone-text">18306668267</text>
              <text class="value-text">领取时间：2020/12/30 10:00:00</text>
            </view>
          </view>
        </block>
        <view class="content-null" v-if="!renderInfo.rows.length">
          <text class="label-text">暂无数据</text>
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
      asyncFetchCustomerSourceInfo: 'asyncFetchCustomerSourceInfo',
      asyncFetchCustomerSourceUseInfo: 'asyncFetchCustomerSourceUseInfo'
    })
  }
})
export default class FundingPage extends Vue {
  public title: string = '我的客源';
  public renderInfo: any = {};

  public typeSelect: string = '01';
  @Watch('typeSelect') private typeSelectChange(n: string) {
    this.onRenderInfo();
  }

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
  public asyncFetchCustomerSourceInfo: (info?: any) => Promise<ApiResponseModel>;
  public asyncFetchCustomerSourceUseInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    // this.renderConfig.productId = options.id;
    // this.onRenderInfo();
    if (options.type === 'customer-source') {
      this.typeSelect = '01';
    } else {
      this.typeSelect = '02'
    }
  }

  public onRenderInfo() {
    this[this.typeSelect === '01' ? 'asyncFetchCustomerSourceInfo' : 'asyncFetchCustomerSourceUseInfo']().then(res => {
      // console.log(res);
      this.renderInfo = res.DATA;
    })
  }

}

</script>

<style lang="scss" scoped>
  .customer-source-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    background-color: #F9F9F9;
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .tab-group {
      @include wh(100%, format(124));
      @include flex-justify-align(center, center);
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
        .content-null {
          @include wh(100%, format(400));
          @include flex-justify-align(center, center);
        }
        .anthor-item {
          @include wh(format(690), format(160));
          @include flex-justify-align(space-around, flex-start);
          background-color: $default_color;
          border-radius: format(16);
          // border-bottom: #F9F9F9;
          margin-bottom: format(26);
          padding: 0 format(26);
          .anthor-info {
            @include wh(format(159), format(150));
            border-radius: 50%;
          }
          .label-info {
            @include wh(100%, auto);
            @include flex-justify-align(center, flex-start);
            padding-left: format(60);
            .label-text {
              @include sc(format(28), #1C222A);
            }
            .phone-text,
            .value-text {
              @include sc(format(24), #999999);
            }
          }
        }
      }
    }
  }
</style>
