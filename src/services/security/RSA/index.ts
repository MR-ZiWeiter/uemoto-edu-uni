/* #ifdef H5 */
import JSEncrypt from 'jsencrypt'
/* #endif */
import { IRSATypeKeyModel } from './index.d'

export class RSA {
  // RSA 位数，这里要跟后端对应
  bits = 512;

  // 当前JSEncrypted对象
  thisKeyPair: any = {};

  constructor(bits?: number) {
    /* #ifdef H5 */
    this.thisKeyPair = new JSEncrypt({ default_key_size: bits || this.bits })
    /* #endif */
  }

  // 生成密钥对(公钥和私钥)
  genKeyPair() {
    const genKeyPair: IRSATypeKeyModel = {}

    // 获取私钥
    genKeyPair.privateKey = this.thisKeyPair.getPrivateKey()

    // 获取公钥
    genKeyPair.publicKey = this.thisKeyPair.getPublicKey()

    return genKeyPair
  }

  // 公钥加密
  encrypt(plaintext: string | Record<string, unknown>, publicKey: string) {
    if (plaintext instanceof Object) {
      // 1、JSON.stringify
      plaintext = JSON.stringify(plaintext)
    }
    publicKey && this.thisKeyPair.setPublicKey(publicKey)
    return this.thisKeyPair.encrypt(JSON.stringify(plaintext))
  }

  // 私钥解密
  decrypt(ciphertext: string, privateKey: string) {
    privateKey && this.thisKeyPair.setPrivateKey(privateKey)
    let decString = this.thisKeyPair.decrypt(ciphertext)
    // console.log(decString)
    if (decString.charAt(0) === '{' || decString.charAt(0) === '[') {
      // JSON.parse
      decString = JSON.parse(decString)
    }
    return decString
  }
}
