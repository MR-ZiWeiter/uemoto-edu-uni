<!--
 * @Author: your name
 * @Date: 2021-08-07 10:39:49
 * @LastEditTime: 2021-08-23 01:28:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pages/start/index.vue
-->
<template>
  <view class="start-page">
    <image
      class="logo-image" :src="imageUrlToHostChange('/statics/images/pages/start/start-page-logo@2x.png')"></image>
    <button
      class="wechat-btn"
      open-type="getUserInfo"
      @getuserinfo="openLoginEvent"
    >
      <view class="btns wx-btn">
        <image
          class="wxIcon"
          :src="imageUrlToHostChange('/statics/images/pages/start/wx-icon.png')"
        ></image>
        <text class="wx-txt u-m-l-16">微信登录</text>
      </view>
      <!-- <image class="wechat-btn-image" :src="imageUrlToHostChange('/statics/images/pages/start/start-page-wecht-btn@2x.png')"></image> -->
    </button>
    <!-- <view class="wechat-btn btns accountBtn" @tap="accountLogin">账号登录</view> -->
  </view>
</template>

<script lang="ts">
import { staticNetworkBaseUrl } from "@/config";
import { Component, Vue, Ref, Watch } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import apiConfig from '@/config';
import { formatDate } from "@/utils";

@Component({
  components: {},
  computed: {
    ...mapGetters({
      token: "token",
      LngLat: "LngLat",
      systemInfo: "systemInfo",
      userBasicInfo: "userBasicInfo",
      accessInfo: "accessInfo",
    }),
  },
  methods: {
    ...mapActions({
      asyncAccountMinLogin: "asyncAccountMinLogin",
      asyncFetchHomeSelectCar: "asyncFetchHomeSelectCar",
    }),
  },
})
export default class HomePage extends Vue {
  public title = "";

  /* Vuex */
  private token!: string;
  private userBasicInfo!: any;
  private LngLat!: LMapPointArrayModel;
  private accessInfo!:any;

  private asyncAccountMinLogin: (info?: any) => Promise<ApiResponseModel>;

  async onLoad(options: any) {}

  /* 处理图片路径问题 */
  public imageUrlToHostChange(url: string): string {
    return staticNetworkBaseUrl + url;
  }

  /* 登录 */
  public openLoginEvent(e: { detail: { errMsg: string } }) {
    uni.getUserProfile({
      desc: '获取您的昵称，头像，地区及性别',
      // provider: result.provider[0],
      // withCredentials: true,
      success: ({ userInfo, rawData, signature, encryptedData, iv, errMsg }) => {
        // console.log(userInfo, rawData, signature, encryptedData, iv, errMsg)
        if (errMsg === 'getUserProfile:ok') {
          this.asyncAccountMinLogin({
            userInfo,
            encryptedData,
            iv
          }).then(res => {
            console.log(res);
          });
        }
      },
    })
    if (e.detail.errMsg === "getUserInfo:ok") {
      console.log(e.detail)
      this.asyncAccountMinLogin(e.detail)
    }
  }

  /* 页面销毁时构造函数 */
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>
