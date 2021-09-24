<template>
  <div :class="['tabbar']" :style="{paddingBottom: systemInfo.statusBottomHeight + 'px'}">
    <div :class="['bar_list', item.isCenter ? 'center_icon flex flex-v flex-align-center flex-pack-center' : '']" v-for="item in tabbarOptions" :key="item.id" @click="switchTab(item)">
      <template v-if="item.isCenter">
        <div class="lottie-box">
          <image class="icon" v-if="currentPageUrl === item.uri" :src="item.options.checkicon"></image>
          <image class="icon" v-else :src="item.options.icon"></image>
          <!-- <VLottie class="customer_lottie" :name="item.name" :ref="item.name" :options="item.options" /> -->
        </div>
        <span>{{item.title}}</span>
      </template>
      <template v-else>
        <!-- <VLottie :name="item.name" :ref="item.name" class="lottie" :options="item.options" /> -->
        <image class="icon" v-if="currentPageUrl === item.uri" :src="item.options.checkicon"></image>
        <image class="icon" v-else :src="item.options.icon"></image>
        <span class="active">{{item.title}}</span>
      </template>
    </div>
    <!-- 授权 -->
    <LayoutAuthorizationComponent
      class="authorizationBox"
      v-if="authorizationConfig.isShowAuthorization"
      :content="authorizationConfig.authorizationContent"
      :confirm="authorizationConfig.authorizationConfirm"
      :isShow="authorizationConfig.isShowAuthorization"
      :type="authorizationConfig.authorizationType"
      :isCancel="true"
      @success="authorizationSuccess"
      @failed="authorizationFailed"
      @cancel="authorizationCancel"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import LayoutAuthorizationComponent from '@/components/layout/layout-authorization/index.vue'
export default {
  components: {
    LayoutAuthorizationComponent
  },
  data() { // 选项 数据
    return {
      tabbarOptions: [
        {
          id: 0,
          type: 0,
          name: 'homeLottie',
          title: '首页',
          uri: '/pages/home/index',
          isCenter: false,
          options: {
            checkicon: 'https://weixin.xmzt.cn/statics/img/home_icon_active.png',
            icon: 'https://weixin.xmzt.cn/statics/img/home_icon.png',
            // animationData: require('https://weixin.xmzt.cn/statics/animete/home_animete.json'),
            loop: false,
            autoplay: false
          }
        },
        {
          id: 1,
          type: 1,
          name: 'routeLottie',
          title: '线路',
          uri: '/pages/route/index',
          isCenter: false,
          options: {
            checkicon: 'https://weixin.xmzt.cn/statics/img/router_icon_active.png',
            icon: 'https://weixin.xmzt.cn/statics/img/router_icon.png',
            // animationData: require('https://weixin.xmzt.cn/statics/animete/route_animete.json'),
            loop: false,
            autoplay: false
          }
        },
        {
          id: 2,
          type: 2,
          name: 'toolsLottie',
          title: '自驾工具',
          uri: '/pages/help-tool/index',
          isCenter: true,
          options: {
            checkicon: 'https://weixin.xmzt.cn/statics/img/tool_icon.png',
            icon: 'https://weixin.xmzt.cn/statics/img/tool_icon.png',
            // animationData: require('https://weixin.xmzt.cn/statics/animete/tools_public_bar.json'),
            loop: false,
            autoplay: false
          }
        },
        {
          id: 3,
          type: 3,
          name: 'callLottie',
          title: '行程',
          uri: '/pages/stroke/index',
          isCenter: false,
          options: {
            checkicon: 'https://weixin.xmzt.cn/statics/img/storke_icon_active.png',
            icon: 'https://weixin.xmzt.cn/statics/img/storke_icon.png',
            // animationData: require('https://weixin.xmzt.cn/statics/animete/stroke_animete.json'),
            loop: false,
            autoplay: false
          }
        },
        {
          id: 4,
          type: 4,
          name: 'userLottie',
          title: '我的',
          uri: '/pages/user/index',
          isCenter: false,
          options: {
            checkicon: 'https://weixin.xmzt.cn/statics/img/my_icon_active.png',
            icon: 'https://weixin.xmzt.cn/statics/img/my_icon.png',
            // animationData: require('https://weixin.xmzt.cn/statics/animete/user_animete.json'),
            loop: false,
            autoplay: false
          }
        }
      ],
      tabTypeInfo: {},
      authorizationConfig: {
        // 授权弹出层
        isShowAuthorization: false,
        // 确认授权后的重定向页面状态
        redirectState: null,
        // 授权类型 0登录授权 1电话绑定授权
        authorizationType: 0,
        // 授权弹出框内容
        authorizationContent: '是否授权您的用户信息登录小程序？',
        // 授权弹出框确认按钮内容
        authorizationConfirm: '一键授权登录'
      }
    }
  },
  computed: {
    ...mapGetters({
      systemInfo: 'systemInfo',
      appStatus: 'appStatus',
      currentPageUrl: 'currentPageUrl',
      token: 'token'
    })
  },
  methods: { // 事件处理方法
    ...mapMutations({
      UPDATA_APP_STATUS: 'UPDATA_APP_STATUS'
    }),
    ...mapActions({
      unifyLogin: 'unifyLogin',
      asyncAccountMinLogin: 'asyncAccountMinLogin',
      asyncFetchCurrentPageUrl: 'asyncFetchCurrentPageUrl',
      asyncFetchAuthorInfoCheckToKey: 'asyncFetchAuthorInfoCheckToKey',
      asyncAccountCheckUserBindPhone: 'asyncAccountCheckUserBindPhone'
    }),
    switchTab(info) {
      this.tabTypeInfo = info
      if (info.type !== 3) {
        this.UPDATA_APP_STATUS({ tabType: info.type })
        this.$navigateModel.switchTab({
          url: info.uri
        })
      } else {
        uni.showLoading({
          title: '加载中...'
        })
        /* #ifdef H5 */
        if (this.token) {
          this.UPDATA_APP_STATUS({ tabType: info.type })
          uni.hideLoading()
          this.$navigateModel.switchTab({
            url: info.uri
          })
        } else {
          this.unifyLogin()
        }
        /* #endif */
        /* #ifdef MP-WEIXIN */
        this.asyncFetchAuthorInfoCheckToKey('scope.userInfo').then(status => {
          if (status) {
            if (this.token) {
              this.asyncAccountCheckUserBindPhone().then(res => {
                uni.hideLoading()
                if (res.rel) {
                  this.UPDATA_APP_STATUS({ tabType: info.type })
                  this.$navigateModel.switchTab({
                    url: info.uri
                  })
                } else {
                  this.authorizationConfig.authorizationContent = '是否授权您的手机号码绑定小程序？'
                  this.authorizationConfig.authorizationConfirm = '一键授权绑定'
                  this.authorizationConfig.authorizationType = 1
                  this.authorizationConfig.isShowAuthorization = true
                  this.authorizationConfig.redirectState = info.id
                }
              }).catch(() => {
                uni.hideLoading()
                // console.log(err)
              })
            } else {
              // 获取用户信息 => 执行登录操作
              uni.getUserInfo({
                success: res => {
                  // console.log(res.userInfo)
                  this.asyncAccountMinLogin({ ...res.userInfo, isLogin: 2 }).then(res => {
                    this.switchTab(info)
                  }).catch(() => {
                    this.authorizationConfig.authorizationContent = '是否授权您的用户信息登录小程序？'
                    this.authorizationConfig.authorizationConfirm = '一键授权登录'
                    this.authorizationConfig.authorizationType = 0
                    this.authorizationConfig.isShowAuthorization = true
                    // 需要重新拉取授权 /// 随机设置重载ID
                    this.authorizationConfig.redirectState = 100 - info.id
                  })
                  uni.hideLoading()
                }
              })
            }
          } else {
            uni.hideLoading()
            this.authorizationConfig.authorizationContent = '是否授权您的用户信息登录小程序？'
            this.authorizationConfig.authorizationConfirm = '一键授权登录'
            this.authorizationConfig.authorizationType = 0
            this.authorizationConfig.isShowAuthorization = true
            // 需要重新拉取授权 /// 随机设置重载ID
            this.authorizationConfig.redirectState = 100 - info.id
          }
        })
        /* #endif */
      }
    },
    authorizationSuccess() {
      this.authorizationConfig.isShowAuthorization = false
      // this.redirectState
      switch (this.authorizationConfig.redirectState) {
        // 分为两部分 直接授权后回调结果
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
          this.$navigateModel.switchTab({
            url: this.tabbarOptions[this.authorizationConfig.redirectState].uri
          })
          break
        // 二次授权回调
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
          uni.showLoading({
            title: '正在重新检查授权信息...'
          })
          this.switchTab(this.tabTypeInfo)
          break
      }
    },
    authorizationFailed() {
      this.authorizationConfig.isShowAuthorization = false
    },
    authorizationCancel() {
      this.authorizationConfig.isShowAuthorization = false
    }
  },
  created() { // 生命周期函数
    uni.hideTabBar()
    this.asyncFetchCurrentPageUrl()
  },
  updated() {
    uni.hideTabBar()
  }
}
</script>

<style lang="sass" scoped>
  @import './index.scss'
</style>
