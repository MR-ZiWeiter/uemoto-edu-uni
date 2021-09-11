<!--
 * @Author: houli
 * @Date: 2021-08-07 15:13:05
 * @LastEditTime: 2021-08-23 01:20:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesB/course-info/index.vue
-->
<template>
  <view class="course-info-page">
    <layout-header navigateColor="#000000" :isBack="true" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.imagePath})`}">
      <view class="content-box">
        <view class="course-top">
          <text class="title-text">{{renderInfo.name}}</text>
          <view class="price-group">
            <text class="rebate-price" data-unit="¥">{{renderInfo.sellPrice}}</text>
            <text class="old-price" data-unit="¥">{{renderInfo.marketPrice}}</text>
          </view>
        </view>
        <view class="course-infos">
          <view class="course-infos-header">
            <view class="course-infos-header-item">
              <view class="label-info">
                <image class="min-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/course/course-info-icon-01@2x.svg')"/>
                <text class="label-value">课程次数</text>
              </view>
              <text class="value-text">{{renderInfo.courseNumber}}节</text>
            </view>
            <view class="course-infos-header-item">
              <view class="label-info">
                <image class="min-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/course/course-info-icon-02@2x.svg')"/>
                <text class="label-value">课程时长</text>
              </view>
              <text class="value-text light">{{renderInfo.courseDuration}}分钟/节</text>
            </view>
            <view class="course-infos-header-item">
              <view class="label-info">
                <image class="min-icon" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/course/course-info-icon-03@2x.svg')"/>
                <text class="label-value">授课年级</text>
              </view>
              <text class="value-text">{{renderInfo.courseTarget}}</text>
            </view>
          </view>
          <view class="service-infos">
            <text class="title-text">服务支持</text>
            <view class="service-content">
              <view class="service-desc">
                <text class="reserve">预约体验</text>
                <text class="reserve-text">{{renderInfo.serviceSupport}}</text>
              </view>
              <view class="reserve-count-info">
                <text class="text-label">预约人数</text>
                <text class="reserve-count">{{renderInfo.realReservationNumber}}人</text>
              </view>
            </view>
          </view>
          <view class="teacher-infos" v-if="renderInfo.teachers">
            <text class="title-text">老师介绍</text>
            <view class="teacher-group">
              <view class="teacher-info-item" @click="openCourseInfoPage(teacher)" v-for="teacher in renderInfo.teachers" :key="teacher.id">
                <image class="teacher-image" :src="teacher.imagePath" />
                <view class="teacher-label-info">
                  <text class="label-text"></text>
                  <text class="value-text">{{teacher.name}} ｜ {{teacher.education}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="course-text-info">
            <text class="title-text">课程介绍</text>
            <rich-text class="article-text" :nodes="renderInfo.introduction"></rich-text>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="contact-info">
      <view class="contact-us">
        <image class="contact-us-image" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/course/course-phone-icon-01@2x.svg')"/>
        <text class="contact-us-text">联系我们</text>
      </view>
      <view class="contact-us" @click.stop="openReservePage()">
        <image class="contact-us-image" :src="$CoreTools.imageUrlToHostChange('/statics/svgs/course/course-time-icon-01@2x.svg')"/>
        <text class="contact-us-text">预约体验</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, } from 'vue-property-decorator';
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncFetchProductInfo: 'asyncFetchProductInfo'
    })
  }
})
export default class CourseInfoPage extends Vue {
  public title: string = '课程详情';
  // 课程详情
  public renderInfo: any = {};
  // VUEX
  public asyncFetchProductInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.onRenderInfo(options.id);
  }

  private onRenderInfo(productNo: string) {
    this.asyncFetchProductInfo({productNo}).then(res => {
      this.renderInfo = res.DATA;
    })
  }
  public openCourseInfoPage(info: any) {
    // console.log(info);
    this.$navigateModel.navigateTo({
      url: '/pagesB/teacher-info/index',
      query: {id: info.id}
    })
  }
  public openReservePage() {
    this.$navigateModel.navigateTo({
      url: '/pagesB/reserve-info/index',
      query: {id: this.renderInfo.productNo}
    })
  }
}

</script>

<style lang="scss" scoped>
  .course-info-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    background-color: $default_color;
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      // background-color: $default_color_9;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      .content-box {
        @include wh(100%, auto);
        margin-top: format(354);
        // background: $default_color_9;
        border-radius: format(16) format(16) 0 0;
        &::before {
          @include wh(100%, 100%);
          background-color: rgba(0,0,0,0.6);
          content: '';
          position: absolute;
          top: 0;
          left: 0;
        }
        .course-top {
          @include wh(calc(100% - #{format(96)}), format(140));
          @include flex-justify-align(center, flex-start);
          flex-direction: column;
          padding: 0 format(48);
          position: relative;
          z-index: 99;
          .title-text {
            @include sc(format(32), $default_color);
            font-weight: bold;
          }
          .price-group {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, center);
            margin-top: format(8);
            .rebate-price {
              @include sc(format(36), #DB3A59);
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
        }
        .course-infos {
          @include wh(100%, auto);
          background: $default_color;
          border-radius: format(32) format(32) 0 0;
          background: $default_color;
          padding: format(100) 0;
          position: relative;
          z-index: 99;
          .course-infos-header {
            @include wh(100%, auto);
            @include flex-justify-align(center, flex-start);
            flex-direction: column;
            position: relative;
            .course-infos-header-item {
              @include wh(calc(100% - #{format(60)}), format(68));
              @include flex-justify-align(space-between, center);
              padding: 0 format(30);
              .label-info {
                @include flex-justify-align(flex-start, center);
                .min-icon {
                  @include wh(format(32), format(32));
                }
                .label-value {
                  @include sc(format(28), #3D4655);
                }
              }
              .value-text {
                @include sc(format(28), #3D4655);
                &.light {
                  color: #1667D2;
                }
              }
            }
            &::before {
              content: '';
              height: format(2);
              width: format(345);
              background: #F9F9F9;
              position: absolute;
              bottom: 0;
            }
          }
          .service-infos {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, flex-start);
            flex-direction: column;
            .title-text {
              @include wh(calc(100% - #{format(60)}), format(96));
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), format(30));
              font-weight: bold;
              padding: 0 format(30);
            }
            .service-content {
              @include wh(calc(100% - #{format(60)}), auto);
              @include flex-justify-align(flex-start, flex-start);
              padding: 0 format(30);
              .service-desc {
                flex: 1;
                @include flex-justify-align(flex-start, flex-start);
                flex-direction: column;
                margin-right: format(100);
                .reserve {
                  @include wh(format(132), format(38));
                  @include flex-justify-align(center, center);
                  @include sc(format(22), $default_color);
                  border-radius: format(4);
                  background: #009688;
                }
                .reserve-text {
                  @include sc(format(24), #999);
                  @include overflow-text(5);
                  margin-top: format(12);
                }
              }
              .reserve-count-info {
                @include wh(format(200), format(162));
                @include flex-justify-align(center, center);
                flex-direction: column;
                background: #F9F9F9;
                border-radius: format(16);
                .text-label {
                  @include sc(format(24), #999);
                }
                .reserve-count {
                  @include sc(format(34), #1D65E3);
                  font-weight: bold;
                  margin-top: format(10);
                }
              }
            }
          }
          .teacher-infos {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, flex-start);
            flex-direction: column;
            .title-text {
              @include wh(calc(100% - #{format(60)}), format(96));
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), format(30));
              font-weight: bold;
              padding: 0 format(30);
            }
            .teacher-group {
              @include wh(calc(100% - #{format(60)}), auto);
              @include flex-justify-align(flex-start, flex-start);
              overflow-x: auto;
              overflow-y: hidden;
              padding: 0 format(30);
              .teacher-info-item {
                @include flex-justify-align(flex-start, flex-start);
                @include wh(format(220), format(292));
                flex: 0 0 format(220);
                flex-direction: column;
                margin-right: format(16);
                .teacher-image {
                  @include wh(format(220), format(220));
                  object-fit: contain;
                }
                .teacher-label-info {
                  @include wh(100%, auto);
                  @include flex-justify-align(center, flex-start);
                  flex-direction: column;
                  flex: 1;
                  .label-text {
                    @include sc(format(28), #101010);
                  }
                  .value-text {
                    @include sc(format(24), #ACACAC);
                    @include overflow-text(1);
                  }
                }
              }
            }
          }
          .course-text-info {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, flex-start);
            flex-direction: column;
            .title-text {
              @include wh(calc(100% - #{format(60)}), format(96));
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), format(30));
              font-weight: bold;
              padding: 0 format(30);
            }
            .article-text {
              @include sc(format(26), #3D4655);
              padding: 0 format(30);
            }
          }
        }
      }
    }
    .contact-info {
      @include flex-justify-align(center, center);
      @include wh(100%, format(120));
      background: $default_color;
      height: format(200);
      .contact-us {
        @include wh(format(336), format(80));
        @include flex-justify-align(center, center);
        background: #FF9800;
        border-radius: format(80);
        margin: 0 format(18);
        .contact-us-image {
          @include wh(format(42), format(42));
        }
        .contact-us-text {
          @include sc(format(28), $default_color);
          margin-left: format(14);
        }
      }
    }
  }
</style>
