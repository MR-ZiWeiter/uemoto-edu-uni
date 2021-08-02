<template>
  <view class="school-info-component">
    <view class="school-info-context">
      <view class="title-info">
        <text class="title-text">学校简介</text>
      </view>
      <view class="school-info-content" @click="openShoolInfo()">
        <image class="school-image" :src="renderInfo.imageUrl"></image>
        <text class="article-info">{{renderInfo.description}}</text>
      </view>
    </view>
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
export default class HomeSchoolInfoComponent extends Vue {
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

  // 打开学校简介
  public openShoolInfo() {
    this.$navigateModel.navigateTo({
      url: '/pagesA/school-info/index'
    })
  }
}
</script>

<style lang="scss" scoped>
  .school-info-component {
    @include wh(auto, auto);
    @include flex-justify-align(flex-start, flex-start);
    .school-info-context {
      @include wh(100%, auto);
      @include flex-justify-align(flex-start, flex-start);
      flex-direction: column;
      .title-info {
        @include wh(calc(100% - #{format(60)}), format(108));
        @include flex-justify-align(space-between, center);
        padding: 0 format(30);
        .title-text {
          @include sc(format(34), $default_color_2);
          font-weight: bold;
        }
      }
      .school-info-content {
        @include flex-justify-align(center, flex-start);
        flex-direction: column;
        padding: 0 format(30);
        .school-image {
          @include wh(format(690), format(240));
          border-radius: format(12);
        }
        .article-info {
          @include overflow-text(2);
          @include sc(format(28), $default_color_9);
          line-height: format(50);
          margin-top: format(28);
        }
      }
    }
  }
</style>
