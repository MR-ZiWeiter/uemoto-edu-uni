<template>
  <view :class="['xmzt-popup-component', componentValue ? 'active' : '']">
    <slot></slot>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      componentValue: false
    }
  },
  watch: {
    value(_new) {
      this.componentValue = _new
    }
  },
  methods: {
    closeComponent(status: boolean) {
      this.componentValue = status
      this.$emit('change', status)
    }
  }
})
</script>

<style lang="scss" scoped>
  .xmzt-popup-component{
    position: fixed;
    bottom: -100%;
    transform: all .5s ease;
    background-color: #FFF;
    border-radius: 16rpx 16rpx 0 0;
    z-index: 9999;
    &.active{
      bottom: 0%;
    }
  }
</style>
