<template>
	<view class="custom-map-component" @tap.stop="customMapTapEvent">
    <view class="custom-map-banner">
      <slot name="banner"></slot>
    </view>
    <view class="custom-map-container">
      <!-- :markers="prevMarkersStatusArrayInfo" -->
      <map
        class="custom-map"
        id="custom-map"
        ref="custom-map"
        :scale="defaultMapConfig.scale"
        :show-location="defaultMapConfig.showLocation"
        :markers="prevMarkersStatusArrayInfo"
        :polyline="defaultMapConfig.polyline"
        :polygons="defaultMapConfig.polygons"
        :latitude="defaultMapConfig.latitude"
        :longitude="defaultMapConfig.longitude"
        :subkey="defaultMapConfig.subkey"
        :circles="defaultMapConfig.circles"
        :controls="defaultMapConfig.controls"
        :includePoints="defaultMapConfig.includePoints"
        :enable3D="defaultMapConfig.enable3D"
        :showCompass="defaultMapConfig.showCompass"
        :enableZoom="defaultMapConfig.enableZoom"
        :enableScroll="defaultMapConfig.enableScroll"
        :enableRotate="defaultMapConfig.enableRotate"
        :enableOverlooking="defaultMapConfig.enableOverlooking"
        :enableSatellite="defaultMapConfig.enableSatellite"
        :enableTraffic="defaultMapConfig.enableTraffic"
        :showLocation="defaultMapConfig.showLocation"
        @updated="mapRenderUpdatedChange"
        @regionchange="mapRegionHandlerChange"
        @markertap="markerHandlerChange"
        @callouttap="markerCalloutHandlerChange"
        @tap="mapTabHandlerChange">
        <cover-view slot="callout">
          <slot name="custom-callout"></slot>
          <!-- <cover-view v-if="!defaultMapConfig.isCustomMarkerCallout" :marker-id="currentMarkerInfo.id" class="callout-style-tyep-1 AF-COMPONENT-OVERLAYER">
            <cover-image class="image-bg" :src="imageUrlToHostChange('/statics/images/public/min-icon/public-map-icon-label-bg@2x.png')"></cover-image>
            <cover-image class="icon-run" :src="imageUrlToHostChange('/statics/images/public/min-icon/public-map-icon-label-run@2x.png')"></cover-image>
            <cover-view class="label-text">{{currentMarkerInfo.duration}}分钟</cover-view>
            <cover-view class="label-text">|</cover-view>
            <cover-view class="label-text">{{currentMarkerInfo.distance}}m</cover-view>
            <cover-image @click.stop="openOtherAppNavigate" class="icon-navigate" :src="imageUrlToHostChange('/statics/images/public/min-icon/public-map-icon-label-navigate@2x.png')"></cover-image>
          </cover-view> -->
        </cover-view>
      </map>
      <!-- 中心实体Marker -->
      <view class="center-marker" v-if="isCenterMarker">
        <image class="location-marker-icon" :src="imageUrlToHostChange('/statics/svgs/public/min/public-min-location@2x.svg')"></image>
      </view>
      <!-- 其他工具 -->
      <view class="custom-map-other">
        <view class="custom-map-tools">
          <slot name="tools"></slot>
        </view>
        <slot name="content"></slot>
      </view>
      <!-- 内容 -->
      <slot name="scroll-content"></slot>
    </view>
	</view>
</template>

<script lang='ts'>
import CustomMapComponent from './index'
export default CustomMapComponent
</script>

<style lang="scss" scoped>
	@import './index';
</style>
