<template>
  <view class="authorization-conponent" v-if="isShow">
    <view class="authorization-container">
      <view class="header-title">
        <text>{{title}}</text>
      </view>
      <view class="content-tip">
        <view class="otext4">{{content}}</view>
        <slot></slot>
      </view>
      <view class="footer-btn" v-if="type === 0">
        <button class="anth-button cancel" v-if="isCancel" @click="onCancel">{{cancel}}</button>
        <button class="anth-button confirm" v-if="!isAuth && isConfirm" @click="onConfirm">{{confirm}}</button>
        <button class="anth-button confirm" open-type="getUserInfo" @getuserinfo="getAuthorInfo" v-if="isAuth && isConfirm">{{confirm}}</button>
      </view>
      <view class="footer-btn" v-if="type === 1">
        <button class="anth-button cancel" v-if="isCancel" @click="onCancel">{{cancel}}</button>
        <button class="anth-button confirm" v-if="!isAuth && isConfirm" @click="onConfirm">{{confirm}}</button>
        <button class="anth-button confirm" open-type="getPhoneNumber" @getphonenumber="getPhoneInfo" v-if="isAuth && isConfirm">{{confirm}}</button>
      </view>
    </view>
  </view>
</template>

<script>
import LayoutAuthorizationComponent from './index'
export default LayoutAuthorizationComponent
</script>

<style lang="sass" scoped>
  .authorization-conponent
    width: 100vw
    height: 100vh
    background-color: rgba(0,0,0, .6)
    position: fixed
    z-index: 999
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    left: 0
    top: 0
    .authorization-container
      width: 500rpx
      background-color: #FFF
      border-radius: 8rpx
      box-shadow: 1rpx 1rpx 1rpx gray
      .header-title
        height: 90rpx
        width: 100%
        text-align: center
        display: flex
        justify-content: center
        align-items: center
        font-size: 36rpx
        border-bottom: 1px solid #ddd
      .content-tip
        min-height: 100rpx
        padding: 20rpx
        display: flex
        justify-content: center
        align-items: center
        font-size: 32rpx
      .footer-btn
        height: 100rpx
        display: flex
        padding-bottom: 20rpx
        .anth-button
          flex: 1
          margin: 10rpx 15rpx
          border-radius: 8rpx
          background-color: $default_color_8
          color: #FFF
          display: flex
          justify-content: center
          align-items: center
          font-size: 32rpx
          &.cancel
            background-color: #c2c2c2
</style>
