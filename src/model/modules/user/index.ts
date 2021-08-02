export * from './account'

export interface VUXUserModel {
  userBasicInfo: VUXUserBasicInfoModel;
  wxUserInfo: VUXWXUserInfoModel;
  [x: string]: any;
}

export interface VUXUserBasicInfoModel {
  [x: string]: any;
}

export interface VUXUserAccountInfoModel {
  [x: string]: any;
}

export interface VUXWXUserInfoModel {
  [x: string]: any;
}

// 个人中心页面数据模型
export interface IUserCenterInfoModel {
  [x: string]: any;
}

export interface IUserCenterInfoModelGradeModel {
  code: number;
  label: string;
}
export interface IUserCenterInfoModelOrderHintCount {
  [x: string]: any;
}
