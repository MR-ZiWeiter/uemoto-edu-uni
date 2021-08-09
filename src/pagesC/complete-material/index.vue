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
      .content-box {
        @include wh(100%, auto);
        background: #F9F9F9;
        border-radius: format(16) format(16) 0 0;
        
      }
    }
  }
</style>
