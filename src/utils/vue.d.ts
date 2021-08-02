import Vue from 'vue'
import httpRequestPlugin from './plugins/request'
import navigateModel from './plugins/navigator'
import validateModel from './plugins/validate'
import { CoreToolsFunction } from './core.tools';

// 定义构造函数基类
interface PHttpRequestModel {
  new (param: any, backpage?: any, backtype?: any): httpRequestPlugin;
  [x: string]: any;
}
interface PNavigateModel {
  new (): navigateModel;
  [x: string]: any;
}
interface PValidateModel {
  new (): validateModel;
  [x: string]: any;
}
interface PCoreToolsModel {
  new (): CoreToolsFunction;
  [x: string]: any;
}

// 申明Vue挂载对象
declare module 'vue/types/vue' {
  interface VueConstructor {
    HttpRequest: PHttpRequestModel,
    navigateModel: PNavigateModel,
    ValidateTools: PValidateModel,
    CoreTools: PCoreToolsModel
  }
  interface Vue {
    // CombinedVueInstance
    $navigateModel: navigateModel,
    $ValidateTools: validateModel,
    $CoreTools: CoreToolsFunction
  }
}
