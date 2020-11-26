const CryptoJS = require("../js/crypto/4mini/aes.js")

var getKey = function(){
  var temp = "signsignsignsign"
  var appId = getApp().globalData.appId
  appId = appId.length >= 16 ? appId.substring(0, 16) : appId + temp.substring(0, 16 - appId.length)
  var shopId = getApp().globalData.shopId + ""
  shopId = shopId.length >= 16 ? shopId.substring(0, 16) : shopId + temp.substring(0, 16 - shopId.length)
  var key = appId.concat(shopId)
  return key
}

var getIv = function(key){
  var iv = key.substring(0, 16)
  return iv
}

var encrypt = function (_content) {
  var _key = getKey()
  var _iv = getIv(_key)
  // 先以 UTF-8 编码解码参数 返回 any 类型
  let content = CryptoJS.enc.Utf8.parse(_content);
  let aesKey = CryptoJS.enc.Utf8.parse(_key);
  let iv = CryptoJS.enc.Utf8.parse(_iv);

  // 加密
  let encrypted = CryptoJS.AES.encrypt(content, aesKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

var decrypt = function (_content) {
  var _key = getKey()
  var _iv = getIv(_key)

  let aesKey = CryptJS.enc.Utf8.parse(_key);
  let iv = CryptJS.enc.Utf8.parse(_iv);

  // 解密
  let decrypted = CryptJS.AES.decrypt(_content, aesKey, {
    iv: iv,
    mode: CryptJS.mode.CBC,
    padding: CryptJS.pad.Pkcs7
  })

  return decrypted.toString(CryptJS.enc.Utf8);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}