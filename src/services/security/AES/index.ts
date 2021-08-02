import CryptoJS from 'crypto-js'

export class AES {
  // 获取key，
  genKey(length = 16) {
    const random = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let str = ''
    for (let i = 0; i < length; i++) {
      str = str + random.charAt(Math.random() * random.length)
    }
    return str
  }

  // 加密
  encrypt(plaintext: string | Record<string, number>, key: string) {
    if (plaintext instanceof Object) {
      // JSON.stringify
      plaintext = JSON.stringify(plaintext)
    }
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plaintext), CryptoJS.enc.Utf8.parse(key), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.toString()
  }

  // 解密
  decrypt(ciphertext: string, key: string) {
    // console.log(key)
    // const keys = CryptoJS.enc.Utf8.parse('pkKJuTXZWhnSrhtoK3gNSg==')
    // const context = '7nqxw2DIDUJIyOV7Dlf1ww=='
    const encryptedUtf8WordArrayKey = CryptoJS.enc.Utf8.parse(key)
    const decrypt = CryptoJS.AES.decrypt(ciphertext, encryptedUtf8WordArrayKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    // console.log(CryptoJS.AES.decrypt(context, keys, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8))
    /* 对应后台128位加密方式 */
    // 得到密文使用CryptoJS.enc.Hex.parse转化成十六进制
    // const encryptedHexStr = CryptoJS.enc.Hex.parse(ciphertext)
    // /* 将16进制的数据使用CryptoJS.enc.Base64.stringify转化成 Base64编码字符 */
    // const encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    // /* 使用CryptoJS.enc.Hex.parse转化成16进制的秘钥 */
    // const encryptedHexKey = CryptoJS.enc.Hex.parse(key)
    // const decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, encryptedHexKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    if (decryptedStr.charAt(0) === '{' || decryptedStr.charAt(0) === '[') {
      // JSON.parse
      decryptedStr = JSON.parse(decryptedStr)
    }
    return decryptedStr
  }
}
