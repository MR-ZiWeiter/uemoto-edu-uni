<template>
  <view class="school-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.imageUrl})`}">
      <view class="content-box">
        <view class="title-info">
          <text class="title-text">上本教育</text>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">学校资料</text>
          </view>
          <view class="menus-group">
            <view class="menus-item" v-for="(item, index) in renderInfo.extInfo" :key="index">
              <image class="menu-icon" :src="$CoreTools.imageUrlToHostChange(`/statics/svgs/home/home-school-info-icon-0${index+1}@2x.svg`)"></image>
              <view class="menu-item-content">
                <text class="label-text">{{item.label}}</text>
                <text class="value-text">{{item.value}}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">学校简介</text>
          </view>
          <view class="article-info">
            <rich-text class="article-text" :nodes="renderInfo.description"></rich-text>
          </view>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">教育使命</text>
          </view>
          <view class="article-info">
            <rich-text class="article-text" :nodes="renderInfo.mission"></rich-text>
          </view>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">教学理念</text>
          </view>
          <view class="article-info">
            <rich-text class="article-text" :nodes="renderInfo.concept"></rich-text>
          </view>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">企业文化</text>
          </view>
          <view class="article-info">
            <rich-text class="article-text" :nodes="renderInfo.culture"></rich-text>
          </view>
        </view>
        <view class="school-infos">
          <view class="title-info">
            <text class="title-text">联系信息</text>
          </view>
          <view class="article-info">
            <text class="article-text">市桥校区：{{renderInfo.address}}</text>
            <br>
            <text class="article-text">电话：{{renderInfo.phoneNo}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { mapActions } from 'vuex';
@Component({
  methods: {
    ...mapActions({
      asyncFetchHomeInstitutionInfo: 'asyncFetchHomeInstitutionInfo'
    })
  }
})
export default class HomeSchoolInfoPage extends Vue {
  public title: string = '学校简介';
  public renderInfo: any = {};

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHomeInstitutionInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    this.asyncFetchHomeInstitutionInfo().then(res => {
      // console.log(res)
      this.renderInfo = res.DATA;
    })
  }
}
</script>

<style lang="scss" scoped>
  .school-info-page {
    @include wh(100%, 100%);
    @include flex-justify-align(flex-start, flex-start);
    flex-direction: column;
    .custom-header {
      width: 100%;
    }
    .context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      background-size: contain;
      background-repeat: no-repeat;
      background-color: $default_color;
      flex-direction: column;
      overflow: hidden;
      .content-box {
        @include wh(100%, auto);
        margin-top: format(370);
        background: $default_color;
        border-radius: format(16) format(16) 0 0;
        >.title-info {
          @include wh(calc(100% - #{format(60)}), format(108));
          @include flex-justify-align(space-between, center);
          padding: format(30) format(30) 0;
          position: relative;
          .title-text {
            @include sc(format(34), $default_color_2);
            font-weight: bold;
          }
          &::after {
            content: '';
            @include wh(format(670), format(2));
            background: $default_border_color;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);

          }
        }
        >.school-infos {
          @include wh(calc(100% - #{format(60)}), auto);
          padding: 0 format(30);
          margin-bottom: format(20);
          .title-info {
            @include wh(100%, format(100));
            @include flex-justify-align(flex-start, center);
            .title-text {
              @include sc(format(28), $default_color_1);
              font-weight: bold;
              font-family: 'PingFangSC-bold';
            }
          }
          .menus-group {
            @include wh(100%, auto);
            @include grid-col-row-gap(repeat(2, 1fr), repeat(2, format(112)), format(18), format(18));
            .menus-item {
              @include wh(100%, 100%);
              @include  flex-justify-align(flex-start, center);
              background-color: $default_border_color;
              border-radius: format(16);
              .menu-icon {
                @include wh(format(72), format(72));
                margin: 0 format(20);
              }
              .menu-item-content {
                @include flex-justify-align(center, flex-start);
                flex-direction: column;
                .label-text {
                  @include sc(format(24), $default_color_9);
                }
                .value-text {
                  @include sc(format(28), #3D4655);
                }
              }
            }
          }
          .article-info {
            .article-text {
              @include sc(format(28), #3D4655);
            }
          }
        }
      }
    }
  }
</style>
