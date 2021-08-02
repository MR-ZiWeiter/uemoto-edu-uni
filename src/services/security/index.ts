import { RSA } from './RSA/index'
import { AES } from './AES/index'

export class DataSecurityService {
  private privateKey: string;
  private RSAContext: RSA;
  private RSAPrivateKey: string;
  private AESContext: AES;
  constructor(privateKey?: string) {
    this.privateKey = privateKey || `MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEArMcJAsoXPSiHJN/P
    FN6feMHj0UP6JXRz/KxXBVYhEFWlZ6BaUxtO29NWteM90Xs9oqfDILhC3kpsyZBV
    z58U3wIDAQABAkEAoM5OcK4umtlRjtxPHBlnSzkKFAa0lo+gNBcilvDmrQ/B8iaY
    PDmhPo4DmvO9tJZouJqb9UtqAxaEfdT6824FIQIhANUGx7d8oPt1UlsW7w8+YaVR
    Nl3lD3kzBBq+sGAOy3pTAiEAz6GyKjAAFhcEDe67q7pIXF9UVUSgcnHobVJNMjR9
    4cUCIED/8Z6WI5S2pqtuowEWurqzvhAGXaNQorb6alzVBtdLAiEAmYabYbxqY+sS
    0WaEGD++v6axifcbmGQHk8Y2VHgh2G0CIFtYhdHKOkGiVAvRJqcVJd4jOmagNfNw
    toTut4IzwKvo`
  }
  public init(dataString: string, privateKey?: string) {
    this.RSAContext = new RSA()
    this.RSAPrivateKey = this.RSAContext.decrypt(dataString, privateKey || this.privateKey)
    this.AESContext = new AES()
  }
  /* 解密数据方法 */
  public decrypt(dataString: string) {
    return this.AESContext.decrypt(dataString, this.RSAPrivateKey)
  }
}
