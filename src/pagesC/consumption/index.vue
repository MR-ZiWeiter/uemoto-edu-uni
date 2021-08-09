<!--
 * @Author: your name
 * @Date: 2021-08-08 21:11:29
 * @LastEditTime: 2021-08-08 23:37:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesC/consumption/index.vue
-->
<template>
  <view class="consumption-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <view class="tab-group">
      <view :class="['tab-item', typeSelect === '01' ? 'active' : '']" @click="typeSelect = '01'">消费明细</view>
      <view :class="['tab-item', typeSelect === '02' ? 'active' : '']" @click="typeSelect = '02'">充值明细</view>
    </view>
    <scroll-view class="context" scroll-y="true">
      <view class="content-box">
        <block v-for="item in renderInfo.rows" :key="item.id">
          <view class="mount-item" v-if="item.balanceChangeType === typeSelect">
            <view class="label-info">
              <text class="text-label">{{item.balanceChangeType === '01' ? '余额充值' : '余额支付'}}{{item.status}}</text>
              <text class="mount-num">{{item.balanceChangeType === '01' ? '+' : '-'}}{{item.balanceChangeAmount}}</text>
            </view>
            <view class="intro-info">
              <text class="time-text">{{item.cashierTime}}</text>
              <text class="old-mount">余额 {{item.balanceAmount}}</text>
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
      asyncFetchRechargeListInfo: 'asyncFetchRechargeListInfo'
    })
  }
})
export default class RechargePage extends Vue {
  public title: string = '余额明细';
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
  public asyncFetchRechargeListInfo: (info?: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    // this.renderConfig.productId = options.id;
    // this.onRenderInfo();
    if (options.type === 'funding') {
      this.typeSelect = '01';
    } else {
      this.typeSelect = '02'
    }
  }

  public onRenderInfo() {
    this.asyncFetchRechargeListInfo().then(res => {
      // console.log(res);
      this.renderInfo = res.DATA;
    })
  }

}

</script>

<style lang="scss" scoped>
  .consumption-page {
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
        .mount-item {
          @include wh(calc(100% - #{format(60)}), format(160));
          @include flex-justify-align(center, flex-start);
          background-color: $default_color;
          padding: 0 format(30);
          flex-direction: column;
          border-bottom: #F9F9F9;
          .label-info {
            @include wh(100%, auto);
            @include flex-justify-align(space-between, center);
            .text-label {
              @include sc(format(32), #3D4655);
            }
            .mount-num {
              @include sc(format(36), #DB3A59);
            }
          }
          .intro-info {
            @include wh(100%, auto);
            @include flex-justify-align(space-between, center);
            margin-top: format(12);
            .time-text {
              @include sc(format(24), #ACACAC);
            }
            .old-mount {
              @include sc(format(24), #919191);
            }
          }
        }
      }
    }
  }
</style>
