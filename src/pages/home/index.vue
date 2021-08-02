<template>
  <view class="home-page">
    <layout-header
      :isBack="false"
      :title="title"
      :customStyle="{ justifyContent: 'flex-start', textIndent: '1em' }"
      class="custom-header"
    ></layout-header>
    <scroll-view scroll-y="true" class="content">
      <!-- 首页轮播 -->
      <home-swiper-component></home-swiper-component>
      <!-- 公告提示 -->
      <home-notification-component></home-notification-component>
      <home-school-info-component></home-school-info-component>
      <home-news-component></home-news-component>
      <home-course-component></home-course-component>
    </scroll-view>
  </view>
</template>
<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { staticNetworkBaseUrl } from '@/config';
// 导入home页面组件
import HomeSwiperComponent from './components/home-swiper/index.vue';
import HomeNotificationComponent from './components/home-notification/index.vue';
import HomeSchoolInfoComponent from './components/home-school-info/index.vue';
import HomeNewsComponent from './components/home-news/index.vue';
import HomeCourseComponent from './components/home-course/index.vue';
@Component({
  components: {
    HomeSwiperComponent,
    HomeNotificationComponent,
    HomeSchoolInfoComponent,
    HomeNewsComponent,
    HomeCourseComponent
  },
  computed: {
    ...mapGetters({
      token: "token",
      LngLat: "LngLat",
      systemInfo: "systemInfo",
      userBasicInfo: "userBasicInfo",
    }),
  },
})
export default class HomePage extends Vue {
  public title = "首页";
  
  /* Vuex */
  private token!: string;
  private userBasicInfo!: any;
  private LngLat!: LMapPointArrayModel;

  /* 处理图片路径问题 */
  public imageUrlToHostChange(url: string): string {
    return staticNetworkBaseUrl + url;
  }
  /* 页面销毁时构造函数 */
  destroyed() {
  }
}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
