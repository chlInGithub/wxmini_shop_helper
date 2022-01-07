module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1641459160298, function(require, module, exports) {
module.exports = {
    aes : require("./aes"),
    qrcode: require("./qrcode"),
    util: require("./util"),
    request: require("./request"),
    token: require("./token")
}

/*var getKey = function (){
    return "sssssssssssssssssssssssssssss";
}
let encryptResult = module.exports.aes.encrypt("hellochl", getKey);
console.log("encryptResult " + encryptResult)*/

//console.log(module.exports.util.stringUtil.isEmpty(""))

/*
var param = {
    a: 1,
    z: 2,
    d: "d",
    azd: 12
}
let dealParamsResult = module.exports.request.dealParams("/xxx.json", param);
console.log(dealParamsResult)*/


}, function(modId) {var map = {"./aes":1641459160299,"./qrcode":1641459160301,"./util":1641459160302,"./request":1641459160303,"./token":1641459160304}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160299, function(require, module, exports) {
const CryptoJS = require("./crypto/4mini/aes.js")

/*需要调用者提供getKey方法*/
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

var encrypt = function (_content/*, _getKey*/) {
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

// 测试解密失败
var decrypt = function (_content/*, getKey*/) {
  var _key = getKey()
  var _iv = getIv(_key)

  let aesKey = CryptoJS.enc.Utf8.parse(_key);
  let iv = CryptoJS.enc.Utf8.parse(_iv);

  // 解密
  let decrypted = CryptoJS.AES.decrypt(_content, aesKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}
}, function(modId) { var map = {"./crypto/4mini/aes.js":1641459160300}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160300, function(require, module, exports) {
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

module.exports = CryptoJS
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160301, function(require, module, exports) {
// Core code comes from https://github.com/davidshimjs/qrcodejs
var QRCode;

(function () {
    /**
         * Get the type by string length
         * 
         * @private
         * @param {String} sText
         * @param {Number} nCorrectLevel
         * @return {Number} type
         */
    function _getTypeNumber(sText, nCorrectLevel) {
        var nType = 1;
        var length = _getUTF8Length(sText);

        for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
            var nLimit = 0;

            switch (nCorrectLevel) {
                case QRErrorCorrectLevel.L:
                    nLimit = QRCodeLimitLength[i][0];
                    break;
                case QRErrorCorrectLevel.M:
                    nLimit = QRCodeLimitLength[i][1];
                    break;
                case QRErrorCorrectLevel.Q:
                    nLimit = QRCodeLimitLength[i][2];
                    break;
                case QRErrorCorrectLevel.H:
                    nLimit = QRCodeLimitLength[i][3];
                    break;
            }

            if (length <= nLimit) {
                break;
            } else {
                nType++;
            }
        }

        if (nType > QRCodeLimitLength.length) {
            throw new Error("Too long data");
        }

        return nType;
    }

    function _getUTF8Length(sText) {
        var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
        return replacedText.length + (replacedText.length != sText ? 3 : 0);
    }

    function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
        this.parsedData = [];

        // Added to support UTF-8 Characters
        for (var i = 0, l = this.data.length; i < l; i++) {
            var byteArray = [];
            var code = this.data.charCodeAt(i);

            if (code > 0x10000) {
                byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[3] = 0x80 | (code & 0x3F);
            } else if (code > 0x800) {
                byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[2] = 0x80 | (code & 0x3F);
            } else if (code > 0x80) {
                byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                byteArray[1] = 0x80 | (code & 0x3F);
            } else {
                byteArray[0] = code;
            }

            this.parsedData.push(byteArray);
        }

        this.parsedData = Array.prototype.concat.apply([], this.parsedData);

        if (this.parsedData.length != this.data.length) {
            this.parsedData.unshift(191);
            this.parsedData.unshift(187);
            this.parsedData.unshift(239);
        }
    }

    QR8bitByte.prototype = {
        getLength: function (buffer) {
            return this.parsedData.length;
        },
        write: function (buffer) {
            for (var i = 0, l = this.parsedData.length; i < l; i++) {
                buffer.put(this.parsedData[i], 8);
            }
        }
    };


    // QRCodeModel
    function QRCodeModel(typeNumber, errorCorrectLevel) {
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.modules = null;
        this.moduleCount = 0;
        this.dataCache = null;
        this.dataList = [];
    }
    QRCodeModel.prototype = {
        addData: function (data) { var newData = new QR8bitByte(data); this.dataList.push(newData); this.dataCache = null; }, isDark: function (row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) { throw new Error(row + "," + col); }
            return this.modules[row][col];
        }, getModuleCount: function () { return this.moduleCount; }, make: function () { this.makeImpl(false, this.getBestMaskPattern()); }, makeImpl: function (test, maskPattern) {
            this.moduleCount = this.typeNumber * 4 + 17; this.modules = new Array(this.moduleCount); for (var row = 0; row < this.moduleCount; row++) { this.modules[row] = new Array(this.moduleCount); for (var col = 0; col < this.moduleCount; col++) { this.modules[row][col] = null; } }
            this.setupPositionProbePattern(0, 0); this.setupPositionProbePattern(this.moduleCount - 7, 0); this.setupPositionProbePattern(0, this.moduleCount - 7); this.setupPositionAdjustPattern(); this.setupTimingPattern(); this.setupTypeInfo(test, maskPattern); if (this.typeNumber >= 7) { this.setupTypeNumber(test); }
            if (this.dataCache == null) { this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList); }
            this.mapData(this.dataCache, maskPattern);
        }, setupPositionProbePattern: function (row, col) { for (var r = -1; r <= 7; r++) { if (row + r <= -1 || this.moduleCount <= row + r) continue; for (var c = -1; c <= 7; c++) { if (col + c <= -1 || this.moduleCount <= col + c) continue; if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) { this.modules[row + r][col + c] = true; } else { this.modules[row + r][col + c] = false; } } } }, getBestMaskPattern: function () {
            var minLostPoint = 0; var pattern = 0; for (var i = 0; i < 8; i++) { this.makeImpl(true, i); var lostPoint = QRUtil.getLostPoint(this); if (i == 0 || minLostPoint > lostPoint) { minLostPoint = lostPoint; pattern = i; } }
            return pattern;
        }, createMovieClip: function (target_mc, instance_name, depth) {
            var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth); var cs = 1; this.make(); for (var row = 0; row < this.modules.length; row++) { var y = row * cs; for (var col = 0; col < this.modules[row].length; col++) { var x = col * cs; var dark = this.modules[row][col]; if (dark) { qr_mc.beginFill(0, 100); qr_mc.moveTo(x, y); qr_mc.lineTo(x + cs, y); qr_mc.lineTo(x + cs, y + cs); qr_mc.lineTo(x, y + cs); qr_mc.endFill(); } } }
            return qr_mc;
        }, setupTimingPattern: function () {
            for (var r = 8; r < this.moduleCount - 8; r++) {
                if (this.modules[r][6] != null) { continue; }
                this.modules[r][6] = (r % 2 == 0);
            }
            for (var c = 8; c < this.moduleCount - 8; c++) {
                if (this.modules[6][c] != null) { continue; }
                this.modules[6][c] = (c % 2 == 0);
            }
        }, setupPositionAdjustPattern: function () {
            var pos = QRUtil.getPatternPosition(this.typeNumber); for (var i = 0; i < pos.length; i++) {
                for (var j = 0; j < pos.length; j++) {
                    var row = pos[i]; var col = pos[j]; if (this.modules[row][col] != null) { continue; }
                    for (var r = -2; r <= 2; r++) { for (var c = -2; c <= 2; c++) { if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) { this.modules[row + r][col + c] = true; } else { this.modules[row + r][col + c] = false; } } }
                }
            }
        }, setupTypeNumber: function (test) {
            var bits = QRUtil.getBCHTypeNumber(this.typeNumber); for (var i = 0; i < 18; i++) { var mod = (!test && ((bits >> i) & 1) == 1); this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod; }
            for (var i = 0; i < 18; i++) { var mod = (!test && ((bits >> i) & 1) == 1); this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod; }
        }, setupTypeInfo: function (test, maskPattern) {
            var data = (this.errorCorrectLevel << 3) | maskPattern; var bits = QRUtil.getBCHTypeInfo(data); for (var i = 0; i < 15; i++) { var mod = (!test && ((bits >> i) & 1) == 1); if (i < 6) { this.modules[i][8] = mod; } else if (i < 8) { this.modules[i + 1][8] = mod; } else { this.modules[this.moduleCount - 15 + i][8] = mod; } }
            for (var i = 0; i < 15; i++) { var mod = (!test && ((bits >> i) & 1) == 1); if (i < 8) { this.modules[8][this.moduleCount - i - 1] = mod; } else if (i < 9) { this.modules[8][15 - i - 1 + 1] = mod; } else { this.modules[8][15 - i - 1] = mod; } }
            this.modules[this.moduleCount - 8][8] = (!test);
        }, mapData: function (data, maskPattern) {
            var inc = -1; var row = this.moduleCount - 1; var bitIndex = 7; var byteIndex = 0; for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                if (col == 6) col--; while (true) {
                    for (var c = 0; c < 2; c++) {
                        if (this.modules[row][col - c] == null) {
                            var dark = false; if (byteIndex < data.length) { dark = (((data[byteIndex] >>> bitIndex) & 1) == 1); }
                            var mask = QRUtil.getMask(maskPattern, row, col - c); if (mask) { dark = !dark; }
                            this.modules[row][col - c] = dark; bitIndex--; if (bitIndex == -1) { byteIndex++; bitIndex = 7; }
                        }
                    }
                    row += inc; if (row < 0 || this.moduleCount <= row) { row -= inc; inc = -inc; break; }
                }
            }
        }
    };
    QRCodeModel.PAD0 = 0xEC;
    QRCodeModel.PAD1 = 0x11;
    QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel); var buffer = new QRBitBuffer(); for (var i = 0; i < dataList.length; i++) { var data = dataList[i]; buffer.put(data.mode, 4); buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber)); data.write(buffer); }
        var totalDataCount = 0; for (var i = 0; i < rsBlocks.length; i++) { totalDataCount += rsBlocks[i].dataCount; }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error("code length overflow. ("
                + buffer.getLengthInBits()
                + ">"
                + totalDataCount * 8
                + ")");
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) { buffer.put(0, 4); }
        while (buffer.getLengthInBits() % 8 != 0) { buffer.putBit(false); }
        while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) { break; }
            buffer.put(QRCodeModel.PAD0, 8); if (buffer.getLengthInBits() >= totalDataCount * 8) { break; }
            buffer.put(QRCodeModel.PAD1, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function (buffer, rsBlocks) {
        var offset = 0; var maxDcCount = 0; var maxEcCount = 0; var dcdata = new Array(rsBlocks.length); var ecdata = new Array(rsBlocks.length); for (var r = 0; r < rsBlocks.length; r++) {
            var dcCount = rsBlocks[r].dataCount; var ecCount = rsBlocks[r].totalCount - dcCount; maxDcCount = Math.max(maxDcCount, dcCount); maxEcCount = Math.max(maxEcCount, ecCount); dcdata[r] = new Array(dcCount); for (var i = 0; i < dcdata[r].length; i++) { dcdata[r][i] = 0xff & buffer.buffer[i + offset]; }
            offset += dcCount; var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount); var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1); var modPoly = rawPoly.mod(rsPoly); ecdata[r] = new Array(rsPoly.getLength() - 1); for (var i = 0; i < ecdata[r].length; i++) { var modIndex = i + modPoly.getLength() - ecdata[r].length; ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0; }
        }
        var totalCodeCount = 0; for (var i = 0; i < rsBlocks.length; i++) { totalCodeCount += rsBlocks[i].totalCount; }
        var data = new Array(totalCodeCount); var index = 0; for (var i = 0; i < maxDcCount; i++) { for (var r = 0; r < rsBlocks.length; r++) { if (i < dcdata[r].length) { data[index++] = dcdata[r][i]; } } }
        for (var i = 0; i < maxEcCount; i++) { for (var r = 0; r < rsBlocks.length; r++) { if (i < ecdata[r].length) { data[index++] = ecdata[r][i]; } } }
        return data;
    };
    var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
    var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
    var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
    var QRUtil = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0), G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0), G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1), getBCHTypeInfo: function (data) {
            var d = data << 10; while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) { d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15))); }
            return ((data << 10) | d) ^ QRUtil.G15_MASK;
        }, getBCHTypeNumber: function (data) {
            var d = data << 12; while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) { d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18))); }
            return (data << 12) | d;
        }, getBCHDigit: function (data) {
            var digit = 0; while (data != 0) { digit++; data >>>= 1; }
            return digit;
        }, getPatternPosition: function (typeNumber) { return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1]; }, getMask: function (maskPattern, i, j) { switch (maskPattern) { case QRMaskPattern.PATTERN000: return (i + j) % 2 == 0; case QRMaskPattern.PATTERN001: return i % 2 == 0; case QRMaskPattern.PATTERN010: return j % 3 == 0; case QRMaskPattern.PATTERN011: return (i + j) % 3 == 0; case QRMaskPattern.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0; case QRMaskPattern.PATTERN101: return (i * j) % 2 + (i * j) % 3 == 0; case QRMaskPattern.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 == 0; case QRMaskPattern.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 == 0; default: throw new Error("bad maskPattern:" + maskPattern); } }, getErrorCorrectPolynomial: function (errorCorrectLength) {
            var a = new QRPolynomial([1], 0); for (var i = 0; i < errorCorrectLength; i++) { a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0)); }
            return a;
        }, getLengthInBits: function (mode, type) { if (1 <= type && type < 10) { switch (mode) { case QRMode.MODE_NUMBER: return 10; case QRMode.MODE_ALPHA_NUM: return 9; case QRMode.MODE_8BIT_BYTE: return 8; case QRMode.MODE_KANJI: return 8; default: throw new Error("mode:" + mode); } } else if (type < 27) { switch (mode) { case QRMode.MODE_NUMBER: return 12; case QRMode.MODE_ALPHA_NUM: return 11; case QRMode.MODE_8BIT_BYTE: return 16; case QRMode.MODE_KANJI: return 10; default: throw new Error("mode:" + mode); } } else if (type < 41) { switch (mode) { case QRMode.MODE_NUMBER: return 14; case QRMode.MODE_ALPHA_NUM: return 13; case QRMode.MODE_8BIT_BYTE: return 16; case QRMode.MODE_KANJI: return 12; default: throw new Error("mode:" + mode); } } else { throw new Error("type:" + type); } }, getLostPoint: function (qrCode) {
            var moduleCount = qrCode.getModuleCount(); var lostPoint = 0; for (var row = 0; row < moduleCount; row++) {
                for (var col = 0; col < moduleCount; col++) {
                    var sameCount = 0; var dark = qrCode.isDark(row, col); for (var r = -1; r <= 1; r++) {
                        if (row + r < 0 || moduleCount <= row + r) { continue; }
                        for (var c = -1; c <= 1; c++) {
                            if (col + c < 0 || moduleCount <= col + c) { continue; }
                            if (r == 0 && c == 0) { continue; }
                            if (dark == qrCode.isDark(row + r, col + c)) { sameCount++; }
                        }
                    }
                    if (sameCount > 5) { lostPoint += (3 + sameCount - 5); }
                }
            }
            for (var row = 0; row < moduleCount - 1; row++) { for (var col = 0; col < moduleCount - 1; col++) { var count = 0; if (qrCode.isDark(row, col)) count++; if (qrCode.isDark(row + 1, col)) count++; if (qrCode.isDark(row, col + 1)) count++; if (qrCode.isDark(row + 1, col + 1)) count++; if (count == 0 || count == 4) { lostPoint += 3; } } }
            for (var row = 0; row < moduleCount; row++) { for (var col = 0; col < moduleCount - 6; col++) { if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) { lostPoint += 40; } } }
            for (var col = 0; col < moduleCount; col++) { for (var row = 0; row < moduleCount - 6; row++) { if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) { lostPoint += 40; } } }
            var darkCount = 0; for (var col = 0; col < moduleCount; col++) { for (var row = 0; row < moduleCount; row++) { if (qrCode.isDark(row, col)) { darkCount++; } } }
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5; lostPoint += ratio * 10; return lostPoint;
        }
    };
    var QRMath = {
        glog: function (n) {
            if (n < 1) { throw new Error("glog(" + n + ")"); }
            return QRMath.LOG_TABLE[n];
        }, gexp: function (n) {
            while (n < 0) { n += 255; }
            while (n >= 256) { n -= 255; }
            return QRMath.EXP_TABLE[n];
        }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)
    }; for (var i = 0; i < 8; i++) { QRMath.EXP_TABLE[i] = 1 << i; }
    for (var i = 8; i < 256; i++) { QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8]; }
    for (var i = 0; i < 255; i++) { QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i; }
    function QRPolynomial(num, shift) {
        if (num.length == undefined) { throw new Error(num.length + "/" + shift); }
        var offset = 0; while (offset < num.length && num[offset] == 0) { offset++; }
        this.num = new Array(num.length - offset + shift); for (var i = 0; i < num.length - offset; i++) { this.num[i] = num[i + offset]; }
    }
    QRPolynomial.prototype = {
        get: function (index) { return this.num[index]; }, getLength: function () { return this.num.length; }, multiply: function (e) {
            var num = new Array(this.getLength() + e.getLength() - 1); for (var i = 0; i < this.getLength(); i++) { for (var j = 0; j < e.getLength(); j++) { num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j))); } }
            return new QRPolynomial(num, 0);
        }, mod: function (e) {
            if (this.getLength() - e.getLength() < 0) { return this; }
            var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0)); var num = new Array(this.getLength()); for (var i = 0; i < this.getLength(); i++) { num[i] = this.get(i); }
            for (var i = 0; i < e.getLength(); i++) { num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio); }
            return new QRPolynomial(num, 0).mod(e);
        }
    };
    function QRRSBlock(totalCount, dataCount) { this.totalCount = totalCount; this.dataCount = dataCount; }
    QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
    QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel); if (rsBlock == undefined) { throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel); }
        var length = rsBlock.length / 3; var list = []; for (var i = 0; i < length; i++) { var count = rsBlock[i * 3 + 0]; var totalCount = rsBlock[i * 3 + 1]; var dataCount = rsBlock[i * 3 + 2]; for (var j = 0; j < count; j++) { list.push(new QRRSBlock(totalCount, dataCount)); } }
        return list;
    };
    QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) { switch (errorCorrectLevel) { case QRErrorCorrectLevel.L: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0]; case QRErrorCorrectLevel.M: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1]; case QRErrorCorrectLevel.Q: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2]; case QRErrorCorrectLevel.H: return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3]; default: return undefined; } };
    function QRBitBuffer() { this.buffer = []; this.length = 0; }
    QRBitBuffer.prototype = {
        get: function (index) { var bufIndex = Math.floor(index / 8); return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1; }, put: function (num, length) { for (var i = 0; i < length; i++) { this.putBit(((num >>> (length - i - 1)) & 1) == 1); } }, getLengthInBits: function () { return this.length; }, putBit: function (bit) {
            var bufIndex = Math.floor(this.length / 8); if (this.buffer.length <= bufIndex) { this.buffer.push(0); }
            if (bit) { this.buffer[bufIndex] |= (0x80 >>> (this.length % 8)); }
            this.length++;
        }
    };
    var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

    // QRCode object
    QRCode = function (canvasId, vOption) {
        this._htOption = {
            width: 256,
            height: 256,
            typeNumber: 4,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRErrorCorrectLevel.H
        };

        if (typeof vOption === 'string') {
            vOption = {
                text: vOption
            };
        }

        // Overwrites options
        if (vOption) {
            for (var i in vOption) {
                this._htOption[i] = vOption[i];
            }
        }

        this._oQRCode = null;
        this.canvasId = canvasId

        if (this._htOption.text && this.canvasId) {
            this.makeCode(this._htOption.text);
        }
    };

    QRCode.prototype.makeCode = function (sText) {
        this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
        this._oQRCode.addData(sText);
        this._oQRCode.make();
        this.makeImage();
    };

    QRCode.prototype.makeImage = function () {
        var _oContext
        if (this._htOption.usingIn) {
            _oContext = wx.createCanvasContext(this.canvasId, this._htOption.usingIn)
        }
        else {
            _oContext = wx.createCanvasContext(this.canvasId)
        }
        var _htOption = this._htOption;
        var oQRCode = this._oQRCode

        var nCount = oQRCode.getModuleCount();
        var nWidth = _htOption.padding ? (_htOption.width - 2 * _htOption.padding) / nCount : _htOption.width / nCount;
        var nHeight = _htOption.padding ? (_htOption.height - 2 * _htOption.padding) / nCount : _htOption.height / nCount;
        var nRoundedHeight = Math.round(nHeight);
        var nRoundedWidth = Math.round(nWidth);

        if (_htOption.image && _htOption.image != '') {
            _oContext.drawImage(_htOption.image, 0, 0, _htOption.width, _htOption.height)
        }
        _oContext.setFillStyle('#fff')
        _oContext.fillRect(0, 0, _htOption.width, _htOption.height)
        _oContext.save()
        for (var row = 0; row < nCount; row++) {
            for (var col = 0; col < nCount; col++) {
                var bIsDark = oQRCode.isDark(row, col);
                var nLeft = _htOption.padding ? col * nWidth + _htOption.padding : col * nWidth;
                var nTop = _htOption.padding ? row * nHeight + _htOption.padding : row * nHeight;
                _oContext.setStrokeStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight)
                // _oContext.setStrokeStyle('red')
                _oContext.setLineWidth(1)
                _oContext.setFillStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight)
                // _oContext.setFillStyle('red')
                // if (bIsDark) {
                _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
                // }

                // 안티 앨리어싱 방지 처리
                // if (bIsDark) {
                _oContext.strokeRect(
                    Math.floor(nLeft) + 0.5,
                    Math.floor(nTop) + 0.5,
                    nRoundedHeight
                );

                _oContext.strokeRect(
                    Math.ceil(nLeft) - 0.5,
                    Math.ceil(nTop) - 0.5,
                    nRoundedWidth,
                    nRoundedHeight
                );
                // }
                // _oContext.fillRect(
                //     Math.floor(nLeft) + 0.5,
                //     Math.floor(nTop) + 0.5,
                //     nRoundedWidth,
                //     nRoundedHeight
                // );
                // _oContext.fillRect(
                //     Math.ceil(nLeft) - 0.5,
                //     Math.ceil(nTop) - 0.5,
                //     nRoundedWidth,
                //     nRoundedHeight
                // );
                // _oContext.clearRect(
                //     Math.floor(nLeft) + 0.5,
                //     Math.floor(nTop) + 0.5,
                //     nRoundedWidth,
                //     nRoundedHeight
                // );
                // _oContext.clearRect(
                //     Math.ceil(nLeft) - 0.5,
                //     Math.ceil(nTop) - 0.5,
                //     nRoundedWidth,
                //     nRoundedHeight
                // );
            }
        }

        _oContext.draw(false, () => {
          setTimeout(() => {
            this.exportImage()
          }, 800)
        })
    };

    // 保存为图片，将临时路径传给回调
    QRCode.prototype.exportImage = function (callback) {
      if (this._htOption.callback && typeof this._htOption.callback === 'function') {
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: this._htOption.width,
            height: this._htOption.height,
            destWidth: this._htOption.width,
            destHeight: this._htOption.height,
            canvasId: this.canvasId,
            success: (res) => {
              this._htOption.callback({path: res.tempFilePath})
            }
        })
      } 
    }

    QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

module.exports = QRCode
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160302, function(require, module, exports) {
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var initPage = function(that){
  var globalData = getApp().globalData
  that.setData(globalData)

  wx.setNavigationBarTitle({
    title: globalData.shopName
  })
  wx.setNavigationBarColor(
    {
      frontColor: globalData.ngFrontColor,
      backgroundColor: globalData.ngbgColor
    }
  )
  // 不生效
  /**wx.setBackgroundColor({
    backgroundColor: globalData.bgColor
  })**/
}

const EventUtil = {
  getParaFromEvent: function(event, name, must) {
    var id = event.currentTarget.dataset[name]
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    if (must) {
      wx.showToast({
        title: '缺少' + name,
      })
      throw new Error()
    }
  },
  getIndex: function(event) {
    var id = event.currentTarget.dataset.index
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少Index',
    })
    throw new Error()
  },
  getId: function(event) {
    var id = event.currentTarget.dataset.id
    if (StringUtil.isNotEmpty(id)) {
      return id
    }
    wx.showToast({
      title: '缺少ID',
    })
    throw new Error()
  }
}

const ArrayUtil = {
  isArray: function (v) {
    if(!ObjectUtil.verifyValidObject(v)){
      return false
    }
    return Array.isArray(v)
  },
  getEleByIndex: function(arrays, index) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(index)){
      return
    }
    var ele = arrays[index]
    return ele
  },
  delEleByIndex: function(arrays, index) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(index)){
      return
    }
    var ele = arrays[index]
    arrays.splice(index, 1)
    return ele
  },
  getEleById: function(arrays, id) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(id)){
      return
    }
    var ele = arrays.find((ele, index, arrays) => ele.id == id)
    return ele
  },
  replaceEleById: function(arrays, newEle) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(newEle.id)){
      return
    }
    for (let index = 0; index < arrays.length; index++) {
      const element = arrays[index];
      if(element.id == newEle.id){
        arrays[index] = newEle
        return index
      }
    }
    return -1
  },
  addEle: function(arrays, ele) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(ele)){
      return
    }
    arrays.push(ele)
  },
  delEleById: function(arrays, id) {
    if(!ObjectUtil.verifyValidObject(arrays)){
      return
    }
    if(!ObjectUtil.verifyValidObject(id)){
      return
    }
    var eleIndex = -1
    var ele
    for (var i = 0; i < arrays.length; i++) {
      ele = arrays[i]
      if (ele.id == id) {
        eleIndex = i
        break
      }
    }

    if (eleIndex != -1) {
      arrays.splice(eleIndex, 1)
    }

    return ele
  }
}

const StringUtil = {

  isEmpty: function(str) {
    var r = undefined === str || "" === str || null === str
    return r
  },
  isNotEmpty: function(str) {
    var r = undefined !== str && "" !== str
    return r
  },
  abbreviatory: function(str, maxL) {
    if (!StringUtil.isEmpty(str) && str.length > (undefined == maxL ? 10 : maxL)) {
      return str.substring(0, 10) + '…'
    }
    return str
  },
  moneyDesc: function(money) {
    return "￥" + money + "元"
  },
  simplePrint: function(str) {
    if (StringUtil.isNotEmpty(str)) {
      return str
    }
    return '-'
  }
}


const ObjectUtil = {
  isNotUndefined: function(v) {
    return undefined !== v
  },
  isString: function (v) {
    return typeof v === 'string'
  },
  isUndefined: function(v) {
    return undefined === v
  },
  isFunction: function (v) {
    return ObjectUtil.verifyValidObject(v) &&  typeof v === 'function'
  },
  verifyValidObject: function(o) {
    return o !== null && o !== undefined && o !== "" && o !== "null" && o !== "undefined"
  }
}

const JsonUtil = {
  hasData: function(v){
    if(!ObjectUtil.verifyValidObject(v) || v == '[]'){
      return false
    }
    v = JsonUtil.toJson(v)
    for (var key in v) {
      if (ObjectUtil.verifyValidObject(v[key])){
        return true
      }
    }
    return false
  },
  toJson: function(v) {
    if(typeof v === 'string' && v.indexOf('{') != -1){
      return JSON.parse(v)
    }
    return v
  },
  /**
   * json key 的 数组，已安正序排序
   */
  getKeys: function (paramJson){
    var keys = []
    for (var k in paramJson) {
      keys.push(k)
    }

    keys.sort()

    return keys
  },
  /**
   * @param paramJson 数据的json形式
   * @param encode true表示对val进行URIEncode
   * key 排序，然后组织成用&间隔的参数串
   */
  toParamWithSortedKey: function (paramJson, encode){
    var keys = JsonUtil.getKeys(paramJson)
    var paraStr = ''
    var temp = []
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var val = paramJson[key]
      if(encode){
        val = encodeURIComponent(val)
      }
      var ele = key + '=' + val
      temp.push(ele)
    }

    if (temp.length > 0) {
      paraStr = temp.join("&")
    }

    return paraStr

  },
  /**
   * 组织成用&间隔的参数串
   */
  toParam: function(paramJson) {
    var paraStr = ''
    var temp = []
    for (var k in paramJson) {
      var v = paramJson[k]
      if (!StringUtil.isEmpty(v)) {
        var ele = k + "=" + v
        temp.push(ele)
      }
    }

    if(temp.length > 0){
      paraStr = temp.join("&")
    }

    return paraStr
  }
}

var showMsg = function(msg, callback) {
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false,
    success: function (res) {
      if(ObjectUtil.isFunction(callback)){
        callback()
      }
    },
  })
}


var showToast = function (msg) {
  wx.showToast({
    title: msg,
    duration: 2000
  })
}

var getCurrentS = function () {
  return Math.floor(new Date().getTime() / 1000)
}

var replace4Spe = function(v){
  return v.replace(/[\\+]{1}/g, "==plus==")
}

module.exports = {
  formatTime: formatTime,
  eventUtil: EventUtil,
  arrayUtil: ArrayUtil,
  stringUtil: StringUtil,
  objectUtil: ObjectUtil,
  jsonUtil: JsonUtil,
  showMsg: showMsg,
  showToast: showToast,
  getCurrentS: getCurrentS,
  replace4Spe: replace4Spe,
  initPage: initPage
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160303, function(require, module, exports) {
const util = require("./util.js")
const aesUtil = require("./aes.js")

/**
 * url: 请求url
 * data: 请求data json
 * return: k=v&k=v..&sign=signv
 * steps: 
 *  data key 正序，k=v并使用&拼接；拼接其他数据并使用&拼接；生成sign并拼接
 */
var dealParams = function(url, data) {
  if (util.objectUtil.isUndefined(data)) {
    data = {}
  }

  var dataStrWithSortedKey = util.jsonUtil.toParamWithSortedKey(data)
  var dataEncodeStrWithSortedKey = util.jsonUtil.toParamWithSortedKey(data, true)

  var newToken = url.indexOf('newToken') !== -1
  // 检查token
  if(!newToken){

  }

  // 追加数据
  var appendData = {}
  if (!newToken) {
    appendData['appId'] = getApp().globalData.appId
    appendData['token'] = getApp().globalData.token
    appendData['sessionId'] = getApp().globalData.sessionId
  }
  // 时间戳
  appendData['t'] = Math.floor(new Date().getTime() / 1000)
  // 请求处理版本
  appendData['v'] = 2
  var appendDataStrWithSortedKey = util.jsonUtil.toParam(appendData)

  var lastData = ""
  var lastDataEncode = ""
  if (util.stringUtil.isEmpty(dataStrWithSortedKey)) {
    lastData = appendDataStrWithSortedKey
    lastDataEncode = appendDataStrWithSortedKey
  } else {
    lastData = dataStrWithSortedKey + "&" + appendDataStrWithSortedKey
    lastDataEncode = dataEncodeStrWithSortedKey + "&" + appendDataStrWithSortedKey
  }

  // 生成sign
  var sign = aesUtil.encrypt(lastData)
  // 这些字符作为参数会变为空格，所以提前替换
  //sign = sign.replace(/[\\&\\=\\+\\$\\,\\#]+/g, "")
  sign = util.replace4Spe(sign)

  // 最终的data数据
  var finalData = lastDataEncode + "&sign=" + sign

  //finalData = encodeURI(finalData)
  return finalData
}

var checkApp = function(){
  if (!util.objectUtil.verifyValidObject(getApp().globalData.appId) || !util.objectUtil.verifyValidObject(getApp().globalData.shopId)){
    util.showMsg("小程序缺少初始化数据")
    throw new Error("小程序缺少初始化数据")
  }
}

var goPageUtil = {
  goPage : {
    goIndex : function () {
      wx.navigateTo({
        url: '/pages/index/index'
      })
    },
    goShopMan: function () {
      wx.redirectTo({
        url: '/pages/shopMan/shopMan'
      })
    }
  }
}


/**
 * context = {
 *  url: url,
 *  data: data,
 *  method: method,
 *  successCallBack: successCallBack,
 *  failCallBack: failCallBack
 * }
 */
var request = function(context) {
  var url = context.url
  if (util.stringUtil.isEmpty(url)) {
    util.showMsg("缺少URL")
    return
  }

  var data = context.data
  data = dealParams(url, data)

  url = getApp().globalData.requestUrlPrefix + url

  var method = context.method
  if (util.stringUtil.isEmpty(method)) {
    method = "GET"
  }
  method = method.toUpperCase()

  var contentType = 'text/plain'
  if (method === 'POST') {
    contentType = 'application/x-www-form-urlencoded'
  }else {
    url = url + "?" + data
  }
  /*if (!util.stringUtil.isEmpty(context.contentType)) {
    contentType = context.contentType
  }*/

  var successCallBack = context.successCallBack
  if (typeof successCallBack !== 'function') {
    successCallBack = function() {}
  }
  var failCallBack = context.failCallBack
  if (typeof failCallBack !== 'function') {
    failCallBack = function() {}
  }

  wx.showLoading({
    title: '努力处理中',
  })

  wx.request({
    url: url,
    data: data,
    header: {
      'content-type': contentType
    },
    method: method,
    complete(res) {
      wx.hideLoading()
    },
    fail(res) {
      wx.hideLoading()
      var resultStr = JSON.stringify(res)
      if (resultStr.indexOf("未登录") !== -1) {
        util.showMsg('登录失效', function(){
          goPageUtil.goPage.goIndex()
        })

        return false
      }
      if (resultStr.indexOf("notShopMan") !== -1) {
        util.showMsg('没有绑定店铺', function(){
          goPageUtil.goPage.goShopMan()
        })

        return false
      }

      failCallBack(resultStr)
    },
    success(res) {
      wx.hideLoading()
      var resultStr = JSON.stringify(res)

      console.log(res.data)
      if (res.data.s) {
        if (util.objectUtil.isString(res.data.d)){
          if (res.data.d == '[]'){
            res.data.d = []
          }
          res.data.d = util.jsonUtil.toJson(res.data.d)
        }
        successCallBack(res.data.d)

      } else {
        if (resultStr.indexOf("未登录") !== -1) {
          util.showMsg('登录失效', function(){
            goPageUtil.goPage.goIndex()
          })

          return false
        }
        if (resultStr.indexOf("notShopMan") !== -1) {
          util.showMsg('没有绑定店铺', function(){
            goPageUtil.goPage.goShopMan()
          })
  
          return false
        }

        var msg = res.data
        if (util.objectUtil.isNotUndefined(res.data.m)) {
          msg = res.data.m
        } else if (util.objectUtil.isNotUndefined(res.data.message)){
          msg = res.data.message
        }
        failCallBack(msg)
      }
    }
  })
}

var requestProxy = function (context){
  checkApp()

  // TODO 是否需要刷新token


  request(context)
}


module.exports = {
  request: requestProxy,
  dealParams: dealParams
}
}, function(modId) { var map = {"./util.js":1641459160302,"./aes.js":1641459160299}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1641459160304, function(require, module, exports) {
const util = require("./util.js")
const requestUtil = require("./request.js")

var getCurrentS = function(){
  return util.getCurrentS()
}

var newToken = function(successCallBack, failCallBack) {
  // get from local
  const app = getApp()
  // 打开小程序 复用上次的local token；如果出现登录超时，则重新进入index，非重新打开app，则不使用local token。
  var key = app.globalData.appId + "Token"
  if(app.globalData.hasUsedLocalToken != true){
    var tokenCache = app.getCache(key, true)
    if(util.objectUtil.verifyValidObject(tokenCache)){
      app.globalData.expire = tokenCache.expire
      app.globalData.token = tokenCache.token
      app.globalData.sessionId = tokenCache.sessionId
      app.globalData.hasUsedLocalToken = true
    }

    // check has token
    if (util.objectUtil.verifyValidObject(getApp().globalData.expire) &&
      util.objectUtil.verifyValidObject(getApp().globalData.token) &&
      util.objectUtil.verifyValidObject(getApp().globalData.sessionId) &&
      getApp().globalData.expire > getCurrentS()) {
      return successCallBack()
    }
  }else{
    getApp().delCache(key, true)
  }

  var sucCall = function(d) {
    console.log(d)
    console.log("sucCall")

    // 检查token数据
    if (!util.objectUtil.verifyValidObject(d.expire) || !util.objectUtil.verifyValidObject(d.token) ||
      !util.objectUtil.verifyValidObject(d.sessionId) || getCurrentS() > d.expire) {
        getApp().delCache(key, true)
      util.showMsg("token错误")
      return false
    }
    // 存储token等
    getApp().globalData.expire = d.expire
    getApp().globalData.token = d.token
    getApp().globalData.sessionId = d.sessionId

    getApp().addCache(key, d, null, true)

    return successCallBack()
  }
  var failCall = function(res) {
    console.log(res)
    console.log("failCall")
    return failCallBack(res)
  }
  wx.login({
    fail: res => {
      console.log(res)
    },
    success: res => {
      //console.log(res)
      var code = res.code
      getApp().globalData.loginCode = code
      //console.log("globalData : " + getApp().globalData)

      var data = {
        shopId: getApp().globalData.shopId,
        tId: getApp().globalData.tId,
        appId: getApp().globalData.appId,
        requestDomain: getApp().globalData.requestDomain,
        code: code
      }

      requestUtil.request({
        url: "/wmall/token/newToken",
        data: data,
        method: 'POST',
        successCallBack: sucCall,
        failCallBack: failCall
      })
    }
  })
}

module.exports = {
  newToken: newToken
}
}, function(modId) { var map = {"./util.js":1641459160302,"./request.js":1641459160303}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1641459160298);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map