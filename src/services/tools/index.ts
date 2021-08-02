// import { toastController } from '@ionic/vue'
import { deepCopy } from '@/utils'

export class ToolsService {
  // toast弹出框
  public async customToast(title: string, color?: string, position?: 'top' | 'bottom' | 'center', duration = 2000, icon: 'none' | 'success' = 'none') {
    const toast = await uni.showToast({
      icon,
      title,
      position,
      duration
    })
    return await toast
  }
  /* 腾讯地图位置规划坐标转化工具 */
  public tencentPolylineToLngLatArrayEvent(polyline: Array<number>) {
    // console.log('x' + polyline)
    const clonePolyline = deepCopy(polyline)
    const resultPolyline = []
    for (let i = 2; i < clonePolyline.length; i++) {
      clonePolyline[i] = clonePolyline[i - 2] + clonePolyline[i] / 1000000
    }
    // console.log(clonePolyline)
    for (let j = 0; j < clonePolyline.length / 2; j++) {
      // console.log(clonePolyline[j * 2])
      resultPolyline.push({
        latitude: clonePolyline[j * 2],
        longitude: clonePolyline[j * 2 + 1]
      })
    }
    return resultPolyline
  }
  /* 计算地图两坐标间距离 默认是距离当前位置坐标 */
  public mapGetDistance(lat1: number, lon1: number, lat2: number = uni.getStorageSync('location')[1], lon2: number = uni.getStorageSync('location')[0]): number {
    // const radLat1 = lat1 * Math.PI / 180.0;
    // const radLat2 = lat2 * Math.PI / 180.0;
    // const a = radLat1 - radLat2;
    // const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    // let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    // Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    // s = s * 6378.137;// EARTH_RADIUS;
    // s = Math.round(s * 10000) / 10000 * 1000;
    // return s;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d
  }

  /**
  * 地图某个点是否在某个区域
  */
  public isPointInPolygon(currentPoint: LMapPointArrayModel, polygon: Array<any>) {
    let numberOfPoints = polygon.length;
    let polygonLats = [];
    let polygonLngs = [];
    for (let i = 0; i < numberOfPoints; i++) {
      polygonLats.push(polygon[i]['lat']);
      polygonLngs.push(polygon[i]['lng']);
    }
    let polygonContainsPoint = false;
    for (let node = 0, altNode = (numberOfPoints - 1); node < numberOfPoints; altNode = node++) {
      if ((polygonLngs[node] > currentPoint[0] != (polygonLngs[altNode] > currentPoint[0]))
        && (currentPoint[1] < (polygonLats[altNode] - polygonLats[node])
          * (currentPoint[0] - polygonLngs[node])
          / (polygonLngs[altNode] - polygonLngs[node])
          + polygonLats[node]
        )
      ) {
        polygonContainsPoint = !polygonContainsPoint;
      }
    }

    return polygonContainsPoint;
  }
}
