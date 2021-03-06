/* eslint-disable new-cap */
/**
 * 单点坐标纠偏
 */
const pi = 3.14159265358979324
const a = 6378245.0
const ee = 0.00669342162296594323
// tslint:disable-next-line: variable-name
const x_pi: number = 3.14159265358979324 * 3000.0 / 180.0

/**
 * 地球坐标转换为火星坐标，即WGS84（国际通用）转为GCJ02坐标系
 * 适用于腾讯地图、高德（阿里）地图或谷歌地图
 */
// tslint:disable-next-line: class-name
class transform {
  constructor(wgLat: any, wgLon: any) {
    const latlng: any = []
    if (outOfChina(wgLat, wgLon)) {
      latlng[0] = wgLat
      latlng[1] = wgLon
      return latlng
    }
    let dLat = transformLat(wgLon - 105.0, wgLat - 35.0)
    let dLon = transformLon(wgLon - 105.0, wgLat - 35.0)
    const radLat = wgLat / 180.0 * pi
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi)
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi)
    latlng[0] = wgLat + dLat
    latlng[1] = wgLon + dLon
    return latlng
  }
}

function outOfChina(lat: any, lon: any) {
  if (lon < 72.004 || lon > 137.8347) { return true }
  if (lat < 0.8293 || lat > 55.8271) { return true }
  return false
}

function transformLat(x: any, y: any) {
  let ret: any = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0
  return ret
}

function transformLon(x: any, y: any) {
  let ret: any = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0
  return ret
}

/**
 * 地球坐标转换为百度坐标，即GCJ02坐标系转为为BD09坐标系
 * 适用于百度地图
 * @param gg_lat
 * @param gg_lon
 */
// tslint:disable-next-line: max-classes-per-file class-name
class bd_transform {
  constructor(lat: any, lon: any) {
    const latlng: any = new transform(lat, lon)
    // tslint:disable-next-line: one-variable-per-declaration
    const x = latlng[1]
    const y = latlng[0]
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
    latlng[0] = z * Math.sin(theta) + 0.006
    latlng[1] = z * Math.cos(theta) + 0.0065
    return latlng
  }
}

export {
  transform,
  bd_transform
}

