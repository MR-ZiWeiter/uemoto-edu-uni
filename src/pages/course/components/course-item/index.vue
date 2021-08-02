<template>
  <view class="course-item-component">
    <view class="course-image-info" data-count="热门No.1">
      <image src="/" class="image-info"></image>
    </view>
    <view class="course-content">
      <view class="title-info">
        <text class="title-text">英语暑期特别班</text>
        <view class="hot-icon-group">
          <image src="/" class="hot-icon"></image>
        </view>
      </view>
      <view class="price-group">
        <text class="rebate-price" data-unit="¥">160.00</text>
        <text class="old-price" data-unit="¥">320.00</text>
      </view>
      <view class="course-time">
        <text class="label-text">课时：</text>
        <text class="value-text">20</text>
      </view>
      <view class="headler-info">
        <text class="reserve">预约体验</text>
        <text class="dopt" data-unit="·">231人</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({})
export default class CourseItemComponent extends Vue {
  @Prop({ default: {} }) public renderInfo: any;
  onLoad(options: any) {}
}

</script>

<style lang="scss" scoped>
  $color-list: #FF5A57, #FF9800, #FFD502;
  .course-item-component {
    @include wh(100%, format(198));
    @include flex-justify-align(flex-start, flex-start);
    .course-image-info {
      @include wh(format(220), format(166));
      border-radius: format(16);
      @for $i from 1 through length($color-list) {
        $item: nth($color-list, $i);
        &.count-#{$i}::before {
          @include wh(format(120), format(40));
          content: attr(data-count);
          background: $item;
          border: format(16) format(4) format(8);
        }
      }
    }
  }
</style>
