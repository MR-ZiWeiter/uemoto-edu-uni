export interface ILocationConfigCityInfoModel {
  city: string;
  initiative: boolean;
  // 详细街道地址
  formattedAddress: string | null;
  // 编码
  adcode: string | null;
  // 省份
  province: string | null;
  // 城市编号
  citycode: string | null;
  // code
  towncode: string | null;
  [x: string]: any;
}
