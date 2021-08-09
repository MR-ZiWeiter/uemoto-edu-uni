<!--
 * @Author: your name
 * @Date: 2021-08-07 10:39:49
 * @LastEditTime: 2021-08-07 15:04:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /uemoto-edu-uni/src/pages/course/index.vue
-->
<template>
  <view class="course-page">
    <view :style="[{paddingTop: systemInfo.statusBarHeight + 'px'}]" class="menu-group">
      <view :class="['menu-item', menuSelectType === item.id ? 'active' : '']" @dblclick="dbMenuEvent()" @click="switchMenuTabEvent(item)" v-for="item in menuRenderArray" :key="item.id">
        <text class="label-text">{{item.name}}</text>
      </view>
    </view>
    <!-- <view class="search-group">
      <image class="search-icon" src="course-search-icon-01@2x.svg"></image>
      <text class="label-text">热门课程 TOP</text>
    </view> -->
    <view class="swiper-group" v-if="menuSelectType">
      <swiper
        class="swiper-info"
        indicator-dots
        autoplay
        circular>
        <swiper-item class="swiper-item-info">
          <image :src="currentChildrenCategory.imagePath" class="image-info" mode="scaleToFill"/>
        </swiper-item>
      </swiper>
    </view>
    <view class="hot-course-tab" v-if="menuSelectType">
      <view :class="['hot-course-item', childGateType === cate.id ? 'active' : '']" @dblclick="dbMenuEvent()" @click="switchCateTabEvent(cate)" v-for="cate in currentChildrenCategory.childrenCategory" :key="cate.id">
        <text class="title-text">{{cate.name}}</text>
      </view>
    </view>
    <view class="hot-course-context" v-if="menuSelectType">
      <view class="hot-course-info" v-for="(product, index) in productRenterArray" :key="product.id">
        <CourseItemComponent :renderInfo="product" :index="index + 1"></CourseItemComponent>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { SystemService } from '@/services/system'

import CourseItemComponent from './components/course-item/index.vue';
@Component({
  components: {
    CourseItemComponent
  },
  computed: {
    ...mapGetters({
      systemInfo: 'systemInfo'
    })
  },
  methods: {
    ...mapActions({
      asyncFetchProductMenuTreeInfo: 'asyncFetchProductMenuTreeInfo',
      asyncFetchGateProductListInfo: 'asyncFetchGateProductListInfo'
    })
  }
})
export default class CoursePage extends Vue {
  public title: string = '课程';

  public menuRenderArray: Array<any> = [];

  // 子集元素
  public get currentChildrenCategory() {
    if (this.menuSelectType) {
      return this.menuRenderArray.filter(fs => fs.id === this.menuSelectType)[0]
    }
    return []
  }

  // 商品信息
  public productRenterInfo: any = {};
  // 商品列表
  public productRenterArray: Array<any> = [];

  // 系统配置服务
  private systemService: any = new SystemService();

  // 选择TAB的配置
  public menuSelectType: string = '';

  // 选择子类对象的类型
  public childGateType: string = '';
  @Watch('childGateType') private childGateTypeChange() {
    this.onLoadRenderList();
  }

  // Vuex mapGetters
  public systemInfo!: any;

  // Vuex Actions
  private asyncFetchProductMenuTreeInfo: () => Promise<ApiResponseModel>;
  private asyncFetchGateProductListInfo: (info: any) => Promise<ApiResponseModel>;

  onLoad(options: any) {
    this.asyncFetchProductMenuTreeInfo().then(res => {
      this.menuRenderArray = res.DATA;
      if (res.DATA && res.DATA.length) {
        // 设置默认
        this.menuSelectType = res.DATA[0].id;
        // 设置默认分类
        this.childGateType = res.DATA[0].childrenCategory[0].id
      } else {
        this.systemService.createToast({
          title: '数据错误，暂无相关课程.'
        })
      }
    })
  }

  // 获取列表数据
  private onLoadRenderList() {
    this.asyncFetchGateProductListInfo({
      categoryId: this.childGateType
    }).then(res => {
      console.log(res);
      this.productRenterInfo = res.DATA;
      this.productRenterArray = res.DATA.rows || [];
    })
  }

  // 切换TAB类别
  public switchMenuTabEvent(info: any) {
    // 判断是否点击的相同类别
    if (info.id !== this.menuSelectType) {
      this.menuSelectType = info.id;
      this.childGateType = info.childrenCategory[0].id;
    }
  }

  // 切换产品类别
  public switchCateTabEvent(info: any) {
    if (info.id !== this.childGateType) {
      this.childGateType = info.id;
      this.onLoadRenderList();
    }
  }

  // 双击刷新
  public dbMenuEvent() {
    this.onLoadRenderList();
  }

}

</script>

<style lang="scss" scoped>
  @import './index';
</style>

