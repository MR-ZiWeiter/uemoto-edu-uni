# 上本教育-小程序端 项目名称`uemoto-edu-uni`

## 描述

`该项目属于上本教育。`

### 第一步进入项目目录，运行下面命令

```bash
#!/bin/bash
echo yarn install
```

PS：如果遇到 yarn 不是命令，请运行以下命令

```bash
#!/bin/bash
echo npm install -g yarn
```

### 第二步运行项目 默认运行 H5 端

```bash
#!/bin/bash
echo yarn serve
```

其他端的本地运行命令：

```bash
  #!/bin/bash
  H5: echo yarn run dev:h5
  微信: echo yarn run dev:mp-weixin
  支付宝: echo yarn run dev:mp-alipay
  百度: echo yarn run dev:mp-baidu
  QQ: echo yarn run dev:mp-qq
  快手: echo yarn run dev:mp-kuaishou
  头条: echo yarn run dev:mp-toutiao
  360: echo yarn run dev:mp-360
  快应用原生: echo yarn run dev:quickapp-native
  快应用WebView: echo yarn run dev:quickapp-webview
  快应用华为: echo yarn run dev:quickapp-webview-huawei
  快应用联盟: echo yarn run dev:quickapp-webview-union
```

### 第三步编译项目 默认打包 H5 端

```bash
  #!/bin/bash
  echo yarn build
```

其他端的发布运行命令：

```bash
  #!/bin/bash
  H5: echo yarn run build:h5
  微信: echo yarn run build:mp-weixin
  支付宝: echo yarn run build:mp-alipay
  百度: echo yarn run build:mp-baidu
  QQ: echo yarn run build:mp-qq
  快手: echo yarn run build:mp-kuaishou
  头条: echo yarn run build:mp-toutiao
  360: echo yarn run build:mp-360
  快应用原生: echo yarn run build:quickapp-native
  快应用WebView: echo yarn run build:quickapp-webview
  快应用华为: echo yarn run build:quickapp-webview-huawei
  快应用联盟: echo yarn run build:quickapp-webview-union
```

### 文档类

UNI 官方: `https://uniapp.dcloud.io/`
UNI 组件: `https://uniapp.dcloud.io/component/README`
微信小程序 API: `https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html`
微信小程序组件: `https://developers.weixin.qq.com/miniprogram/dev/component/`
支付宝小程序 API: `https://opendocs.alipay.com/mini/api/vzt2xm`
支付宝小程序组件: `https://opendocs.alipay.com/mini/component`

### 目录说明

src/components -- 公共组件库
src/config -- 配置文件
src/model -- 数据模型 interface 接口类
src/pages -- 主 TAB 页面
src/pagesB -- 用户模块
src/pagesC -- XX 模块
src/statics -- 静态资源
src/store -- vuex 状态管理模块
src/utils -- 插件管理

### 文件命名规则

1、图片：edu*主模块*页面*xxx@2x.png
2、icon 类【很小的图标】：edu*主模块*页面\_xxx@2x.svg
3、公共类 icon【公用】：edu_public_min_xxx@2x.svg
4、多类似 icon：edu*主模块\_页面\_xxx01@2x.xxx

### 组件名称规则

1、私有组件名称：页面名-功能
2、公有组件名称：功能/edu-功能名
3、uni 官方组件/或者其他插件：plugins/uni-xxx plugins/xxx
4、组件或者页面生成时，sass 文件伴生的.css/.min.css 应该不存在

### 接口数据模型规则

1、每个接口数据应有对应的数据 model 目录结构 model/modules/模块名/页面名/index.ts
模块下应挂载/导出整个模块的数据模型 即 model/modules/模块名/index.ts
2、公共数据模型：model/index.ts

### store 库管理规则

1、对于页面级别: store/modules/模块名/页面/index.ts 包括当前页面所需 api 接口请求
2、公共类：store/public/index.ts
3、每个 state 应对应 getters 使用方式统一使用 mapGetters 方式加载
4、模块应有对应的子集模块

### utils 自定义全局插件库或者方法库规则

1、对应 plugins/xxx/index.ts 注册到 main.ts 中时
1.1 如果是挂载到 Vue 实例上使用方式为： this.\$xxx 的需要在 utils/vue.d.ts 中添加到 Vue 的 interface 类中
1.2 如果是挂载到原型上使用方式为：Vue.xxx 的需要在 utils/vue.d.ts 中添加到 VueConstructor 的 interface 类中

### sass/scss 类名命名规则（参考）

1、所有页面页面布局应该全部采用 flex 布局 特殊情况可除外
给出如下布局参考：

<details>
  <summary>点击展开查看代码</summary>
  <pre>
    <code>
      <view class="edu-home-page">
        <LayoutHeaderComponent class="edu-home-header"/>
        <view class="edu-home-container"></view>
        <!-- 可有 -->
        <view class="edu-home-footer"></view>
      </view>
    </code>
  </pre>
</details>
2、命名规则：统一使用 edu-页面名称-构型/功能
3、sass/scss使用规则
<code>@import '~@/mixin.scss'</code>
$name: edu-页面名称-

示例
<code>
.#{$name}page {
  .#{$name}header {}
&-container {}
}
</code>
`
渲染后：

.edu-页面名称-page {}
.edu-页面名称-page .edu-页面名称-header {}
.edu-页面名称-page .edu-页面名称-page-container {}
`

### 页面方法注释 功能注释

1、注释方式：VSCode 添加插件 Document this 插件

使用方式：ctrl+alt+D

### 支持 Observable 监听方式

使用方法：
<code>
import XXX from 'rxjs'
</code>

### 导入 UNI-UI 公共组件库

使用方法：
参考文档：UI-官网
<code>
<uni-xxx></uni-xxx>
</code>

### 配置更改

@/config/index.ts
@/mixin.scss
修改对应的配置文件

### 静态资源使用方式 /statics

### 配置 IIS 本地服务器/配置 PHP 本地服务器

### 更改 config.ts 中 staticUrl 地址为你本地资源地址
