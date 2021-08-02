<template>
  <view class="custom-lottie">
    <!-- #ifdef MP-WEIXIN -->
    <canvas
      :id="options.name || 'lottie'"
      :canvas-id="options.name || 'lottie'"
      :style="currentLottieStyle"
      class="custom-canvas"
      binderror="error"
    ></canvas>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="custom-view" :style="currentLottieStyle" ref="lottieRef"></view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
import CustomLottieComponent from './index'
export default CustomLottieComponent
</script>

<style lang="scss" scoped>

</style>
