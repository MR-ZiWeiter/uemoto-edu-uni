<template>
  <view class="detail-info-page">
    <layout-header navigateColor="#000000" :title="title" class="custom-header"></layout-header>
    <scroll-view class="context" scroll-y="true" :style="{backgroundImage: `url(${renderInfo.image})`}">
      <view class="content-box">
        <view class="title-info">
          <text class="title-text">{{renderInfo.title}}</text>
          <text class="time-text">2021-07-01</text>
        </view>
        <view class="context-info">
          <rich-text class="context-text" :nodes="renderInfo.content"></rich-text>
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
      asyncFetchHomeInstitutionInfo: 'asyncFetchHomeInstitutionInfo',
      asyncFetchHomeNewsDetailInfo: 'asyncFetchHomeNewsDetailInfo'
    })
  }
})
export default class HomeSchoolInfoPage extends Vue {
  public title: string = '咨讯详情';
  public renderInfo: any = {};

  // @Prop({ default: [] }) public renderInfo: Array<any>;

  // vuex
  private asyncFetchHomeInstitutionInfo: () => Promise<ApiResponseModel>;
  private asyncFetchHomeNewsDetailInfo: () => Promise<ApiResponseModel>;

  // 初始化
  mounted() {
    // this.asyncFetchHomeInstitutionInfo().then(res => {
    //   // console.log(res)
    //   this.renderInfo = res.DATA;
    // })
  }


  onLoad(options: any) {
    this.title = options.title;
    this.renderInfo = options;
    // if (opt) {}
    this.onRenderInfo(options.type, options);
  }

  private onRenderInfo(eventName: string, options: any) {
    this[eventName](options).then((res: { DATA: any; }) => {
      this.renderInfo = res.DATA;
    })
  }
}
</script>

<style lang="scss" scoped>
  .detail-info-page {
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
      background-color: $default_color;
      flex-direction: column;
      overflow: hidden;
      flex: 1;
      .content-box {
        @include wh(100%, auto);
        margin-top: format(494);
        background: $default_color;
        border-radius: format(16) format(16) 0 0;
        >.title-info {
          @include wh(calc(100% - #{format(60)}), auto);
          @include flex-justify-align(space-between, center);
          flex-direction: column;
          padding: format(30);
          position: relative;
          .title-text {
            @include sc(format(34), $default_color_2);
            font-weight: bold;
          }
          .time-text {
            @include sc(format(24), $default_color_9);
            margin-top: format(20);
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
        >.context-info {
          padding: format(30);
          @include sc(format(28), $default_color_6);
        }
      }
    }
  }
</style>
