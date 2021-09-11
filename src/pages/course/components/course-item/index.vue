<!--
 * @Author: houli
 * @Date: 2021-08-07 10:39:49
 * @LastEditTime: 2021-08-23 01:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pages/course/components/course-item/index.vue
-->
<template>
  <view class="course-item-component" @click.stop="openCourseInfoPage()">
    <view :class="['course-image-info', `count-${index}`]" :data-count="`热门No.${index}`">
      <image :src="renderInfo.imagePath" class="image-info"></image>
    </view>
    <view class="course-content">
      <view class="title-info">
        <text class="title-text">{{renderInfo.name}}</text>
        <view class="hot-icon-group">
          <image src="" class="hot-icon"></image>
        </view>
      </view>
      <view class="price-group">
        <text class="rebate-price" data-unit="¥">{{renderInfo.sellPrice}}</text>
        <text class="old-price" data-unit="¥">{{renderInfo.marketPrice}}</text>
      </view>
      <view class="course-time">
        <text class="label-text">课时：</text>
        <text class="value-text">{{renderInfo.courseDuration}}</text>
      </view>
      <view class="headler-info">
        <text class="reserve">预约体验</text>
        <text class="dopt" data-unit="">{{renderInfo.realReservationNumber}}人</text>
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
  @Prop({ default: null }) public index: any;
  onLoad(options: any) {}

  public openCourseInfoPage() {
    this.$navigateModel.navigateTo({
      url: '/pagesB/course-info/index',
      query: { id: this.renderInfo.productNo }
    })
  }
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
      position: relative;
      @for $i from 1 through length($color-list) {
        $item: nth($color-list, $i);
        &.count-#{$i}::before {
          @include wh(format(120), format(40));
          @include sc(format(22), $default_color);
          @include flex-justify-align(center, center);
          border-radius: format(16) format(4) format(8);
          content: attr(data-count);
          background: $item;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .image-info {
        @include wh(100%, 100%);
        overflow: hidden;
        object-fit: contain;
      }
    }
    .course-content {
      @include flex-justify-align(flex-start, flex-start);
      @include wh(100%, 100%);
      flex-direction: column;
      flex: 1;
      position: relative;
      margin-left: format(30);
      &::before {
        content: '';
        @include wh(100%, format(2));
        background: #F5F5F5;
        position: absolute;
        bottom: 0;
      }
      .title-info {
        @include wh(100%, auto);
        @include flex-justify-align(space-between, center);
        .title-text {
          @include sc(format(32), #1C222A);
          font-weight: 500;
        }
        .hot-icon-group {
          @include flex-justify-align(flex-start, center);
          .hot-icon {
            @include wh(format(24), format(24));
            object-fit: contain;
          }
        }
      }
      .price-group {
        @include wh(100%, auto);
        @include flex-justify-align(flex-start, center);
        margin-top: format(5);
        .rebate-price {
          @include sc(format(28), #DB3A59);
          @include flex-justify-align(flex-start, center);
          position: relative;
          padding-left: format(20);
          &::before {
            content: attr(data-unit);
            position: absolute;
            left: 0;
          }
        }
        .old-price {
          @include sc(format(28), #BBBBBB);
          @include flex-justify-align(flex-start, center);
          text-decoration: line-through;
          position: relative;
          padding-left: format(20);
          margin-left: format(40);
          &::before {
            content: attr(data-unit);
            position: absolute;
            left: 0;
          }
        }
      }
      .course-time {
        @include wh(100%, auto);
        @include flex-justify-align(flex-start, center);
        @include sc(format(24), #999);
        margin-top: format(5);
      }
      .headler-info {
        @include wh(100%, auto);
        @include flex-justify-align(space-between, center);
        margin-top: format(10);
        .reserve {
          @include wh(format(132), format(38));
          @include flex-justify-align(center, center);
          @include sc(format(22), $default_color);
          background: #009688;
          border-radius: format(6);
        }
        .dopt {
          @include sc(format(24), #999);
          @include flex-justify-align(center, center);
          position: relative;
          padding-left: format(20);
          &::before {
            content: '';
            @include wh(format(14), format(14));
            background: #84D02C;
            border-radius: 50%;
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
</style>
