import CryptoJS from 'crypto-js'
import {Base64} from 'js-base64'

export class decryptClass {
  static decryptData(sessionKey: string, encryptedData: string | CryptoJS.lib.CipherParams, iv: string) {
    let key = CryptoJS.enc.Base64.parse(sessionKey)
    let ivv = CryptoJS.enc.Base64.parse(iv)
    let decrypt = CryptoJS.AES.decrypt(encryptedData, key,  {
      iv: ivv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return JSON.parse(Base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
  }
  // 使用MD5进行加密
  static encryptMD5(context: string) {
    return CryptoJS.MD5(context).toString()
  }
}