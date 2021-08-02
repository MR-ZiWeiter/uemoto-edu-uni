<template>
  <view class="custom-action-sheet-component">
    <uni-popup ref="custom-popup-ref" type="bottom" @change="popupChange">
      <view class="content-group">
        <view class="list-cell" @click="clickEvent(item)" v-for="item in renderList" :key="item.id">
          <text class="value-text">{{item.label}}</text>
        </view>
        <!-- <view class="list-cell">
          <text class="value-text">帮助中心</text>
        </view>
        <view class="list-cell">
          <text class="value-text">帮助中心</text>
        </view> -->
      </view>
      <view class="footer-cancel" @click="close()" v-if="cancel">
        <text class="label-text">{{cancelText}}</text>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    cancelText: {
      default: '取消',
      type: String
    },
    cancel: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      renderList: []
    }
  },
  methods: {
    initalConfig(options) {
      this.renderList = options
    },
    clickEvent(info) {
      info.event(info)
    },
    open() {
      this.$refs['custom-popup-ref'].open()
    },
    close() {
      this.$refs['custom-popup-ref'].close()
    },
    popupChange(info) {
      // if (info.show) {
      //   this.close()
      // }
    }
  }
}
</script>

<style lang="sass" scoped>
  .custom-action-sheet-component
    .content-group
      background: $default_color
      border-radius: format(28)
      margin: 0 format(16)
      overflow: hidden
      pointer-events: auto
      .list-cell
        @include wh(100%, format(112))
        @include flex-justify-align(center)
        @include click-active($default_border_color, 2)
        .value-text
          @include sc(format(32), $default_color_8)
    .footer-cancel
      margin: 0 format(16)
      background: $default_color
      border-radius: format(28)
      @include wh(auto, format(112))
      @include flex-justify-align(center)
      @include click-active($default_border_color, 2)
      margin-top: format(16)
      pointer-events: auto
</style>
