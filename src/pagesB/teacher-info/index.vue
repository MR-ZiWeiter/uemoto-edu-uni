<!--
 * @Author: houli
 * @Date: 2021-08-07 15:14:35
 * @LastEditTime: 2021-08-08 12:47:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pagesB/teacher-info/index.vue
-->
<template>
  <view class="teacher-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.imagePath})`}">
      <view class="content-box">
        <view class="teacher-infos">
          <view class="teacher-info">
            <text class="teacher-name">张珊-语文老师</text>
            <text class="teacher-lever">{{renderInfo.teachingAge}}年教龄 | {{renderInfo.education}} | {{renderInfo.grade}}</text>
            <text class="teacher-desc">双击编辑文本</text>
          </view>
          <view class="teacher-text-info">
            <text class="title-text">所获荣誉</text>
            <rich-text class="article-text" :nodes="renderInfo.personalHonor"></rich-text>
          </view>
          <view class="teacher-course" v-if="renderInfo.products && renderInfo.products.length">
            <text class="title-text">参与课程</text>
            <view class="teacher-course-group">
              <view class="teacher-course-item" v-for="product in renderInfo.products" :key="product.id">
                <CourseItemComponent :renderInfo="product"></CourseItemComponent>
              </view>
            </view>
          </view>
          <view class="teacher-text-info">
            <text class="title-text">个人简介</text>
            <rich-text class="article-text" :nodes="renderInfo.introduction"></rich-text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import CourseItemComponent from '@/pages/course/components/course-item/index.vue';
@Component({
  components: {
    CourseItemComponent
  },
  methods: {
    ...mapActions({
      asyncFetchTeacherInfo: 'asyncFetchTeacherInfo'
    })
  }
})
export default class CourseInfoPage extends Vue {
  public title: string = '老师详情';
  public renderInfo: any = {};

  // VUEX
  public asyncFetchTeacherInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.onRenderInfo(options.id);
  }

  private onRenderInfo(teacherId: string) {
    this.asyncFetchTeacherInfo({teacherId}).then(res => {
      this.renderInfo = res.DATA;
    })
  }
}

</script>

<style lang="scss" scoped>
  .teacher-info-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    background-color: $default_color_9;
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      background-color: $default_color_9;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        margin-top: format(494);
        background: $default_color_9;
        border-radius: format(16) format(16) 0 0;
        .teacher-infos {
          @include wh(100%, auto);
          min-height: 100vh;
          background: $default_color;
          border-radius: format(32) format(32) 0 0;
          background: $default_color;
          padding: format(46) 0;
          .teacher-info {
            @include wh(calc(100% - #{format(60)}), auto);
            @include flex-justify-align(center, flex-start);
            flex-direction: column;
            padding: 0 format(30);
            padding-bottom: format(60);
            position: relative;
            &::before {
              content: '';
              @include wh(format(690), format(2));
              background: #E1E1E1;
              position: absolute;
              bottom: 0;
            }
            .teacher-name {
              @include sc(format(48), #000000);
              font-weight: bold;
            }
            .teacher-lever {
              @include sc(format(24), #1C222A);
              font-weight: 500;
              margin-top: format(12);
            }
            .teacher-desc {
              @include sc(format(24), #000);
              margin-top: format(28);
            }
          }
          .teacher-text-info {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, flex-start);
            flex-direction: column;
            margin-top: format(44);
            .title-text {
              @include wh(calc(100% - #{format(60)}), format(96));
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), format(30));
              font-weight: bold;
              padding: 0 format(30);
            }
            .article-text {
              @include sc(format(24), #3D4655);
              padding: 0 format(30);
            }
          }
          .teacher-course {
            @include wh(100%, auto);
            @include flex-justify-align(flex-start, flex-start);
            flex-direction: column;
            margin-top: format(44);
            .title-text {
              @include wh(calc(100% - #{format(60)}), format(96));
              @include flex-justify-align(flex-start, center);
              @include sc(format(28), format(30));
              font-weight: bold;
              padding: 0 format(30);
            }
            .teacher-course-group {
              @include wh(calc(100% - #{format(60)}), auto);
              padding: 0 format(30);
              .teacher-course-item {
                @include wh(100%, auto);
                margin-bottom: format(20);
              }
            }
          }
        }
      }
    }
  }
</style>
