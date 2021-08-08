/*! For license information please see app.js.LICENSE.txt */
(()=>{var e={806:(e,t,r)=>{e.exports=r(642)},107:(e,t,r)=>{"use strict";var n=r(320),o=r(135),i=r(211),a=r(610),s=r(28),c=r(77),u=r(734),l=r(226);e.exports=function(e){return new Promise((function(t,r){var f=e.data,d=e.headers;n.isFormData(f)&&delete d["Content-Type"];var p=new XMLHttpRequest;if(e.auth){var m=e.auth.username||"",h=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";d.Authorization="Basic "+btoa(m+":"+h)}var y=s(e.baseURL,e.url);if(p.open(e.method.toUpperCase(),a(y,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p.onreadystatechange=function(){if(p&&4===p.readyState&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?c(p.getAllResponseHeaders()):null,i={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:p.status,statusText:p.statusText,headers:n,config:e,request:p};o(t,r,i),p=null}},p.onabort=function(){p&&(r(l("Request aborted",e,"ECONNABORTED",p)),p=null)},p.onerror=function(){r(l("Network Error",e,null,p)),p=null},p.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(l(t,e,"ECONNABORTED",p)),p=null},n.isStandardBrowserEnv()){var v=(e.withCredentials||u(y))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;v&&(d[e.xsrfHeaderName]=v)}if("setRequestHeader"in p&&n.forEach(d,(function(e,t){void 0===f&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(p.withCredentials=!!e.withCredentials),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){p&&(p.abort(),r(e),p=null)})),f||(f=null),p.send(f)}))}},642:(e,t,r)=>{"use strict";var n=r(320),o=r(692),i=r(108),a=r(163);function s(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var c=s(r(285));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=r(7),c.CancelToken=r(476),c.isCancel=r(448),c.all=function(e){return Promise.all(e)},c.spread=r(166),c.isAxiosError=r(99),e.exports=c,e.exports.default=c},7:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},476:(e,t,r)=>{"use strict";var n=r(7);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},448:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},108:(e,t,r)=>{"use strict";var n=r(320),o=r(610),i=r(60),a=r(756),s=r(163);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(s(r||{},{method:e,url:t,data:(r||{}).data}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,n){return this.request(s(n||{},{method:e,url:t,data:r}))}})),e.exports=c},60:(e,t,r)=>{"use strict";var n=r(320);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},28:(e,t,r)=>{"use strict";var n=r(900),o=r(787);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},226:(e,t,r)=>{"use strict";var n=r(669);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},756:(e,t,r)=>{"use strict";var n=r(320),o=r(725),i=r(448),a=r(285);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},669:e=>{"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},163:(e,t,r)=>{"use strict";var n=r(320);e.exports=function(e,t){t=t||{};var r={},o=["url","method","data"],i=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function c(e,t){return n.isPlainObject(e)&&n.isPlainObject(t)?n.merge(e,t):n.isPlainObject(t)?n.merge({},t):n.isArray(t)?t.slice():t}function u(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(e[o],t[o])}n.forEach(o,(function(e){n.isUndefined(t[e])||(r[e]=c(void 0,t[e]))})),n.forEach(i,u),n.forEach(a,(function(o){n.isUndefined(t[o])?n.isUndefined(e[o])||(r[o]=c(void 0,e[o])):r[o]=c(void 0,t[o])})),n.forEach(s,(function(n){n in t?r[n]=c(e[n],t[n]):n in e&&(r[n]=c(void 0,e[n]))}));var l=o.concat(i).concat(a).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===l.indexOf(e)}));return n.forEach(f,u),r}},135:(e,t,r)=>{"use strict";var n=r(226);e.exports=function(e,t,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?t(n("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)}},725:(e,t,r)=>{"use strict";var n=r(320);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},285:(e,t,r)=>{"use strict";var n=r(320),o=r(554),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(s=r(107)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c},692:e=>{"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},610:(e,t,r)=>{"use strict";var n=r(320);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},787:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},211:(e,t,r)=>{"use strict";var n=r(320);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},900:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},99:e=>{"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports=function(e){return"object"===t(e)&&!0===e.isAxiosError}},734:(e,t,r)=>{"use strict";var n=r(320);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},554:(e,t,r)=>{"use strict";var n=r(320);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},77:(e,t,r)=>{"use strict";var n=r(320),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}})),a):a}},166:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},320:(e,t,r)=>{"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=r(692),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return void 0===e}function c(e){return null!==e&&"object"===n(e)}function u(e){if("[object Object]"!==i.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function l(e){return"[object Function]"===i.call(e)}function f(e,t){if(null!=e)if("object"!==n(e)&&(e=[e]),a(e))for(var r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isPlainObject:u,isUndefined:s,isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:l,isStream:function(e){return c(e)&&l(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:f,merge:function e(){var t={};function r(r,n){u(t[n])&&u(r)?t[n]=e(t[n],r):u(r)?t[n]=e({},r):a(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)f(arguments[n],r);return t},extend:function(e,t,r){return f(t,(function(t,n){e[n]=r&&"function"==typeof t?o(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},433:function(e,t,r){var n,o,i;function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}i=function(){"use strict";var e=Object.hasOwnProperty,t=Object.setPrototypeOf,r=Object.isFrozen,n=Object.getPrototypeOf,o=Object.getOwnPropertyDescriptor,i=Object.freeze,s=Object.seal,c=Object.create,u="undefined"!=typeof Reflect&&Reflect,l=u.apply,f=u.construct;l||(l=function(e,t,r){return e.apply(t,r)}),i||(i=function(e){return e}),s||(s=function(e){return e}),f||(f=function(e,t){return new(Function.prototype.bind.apply(e,[null].concat(function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(t))))});var d,p=T(Array.prototype.forEach),m=T(Array.prototype.pop),h=T(Array.prototype.push),y=T(String.prototype.toLowerCase),v=T(String.prototype.match),g=T(String.prototype.replace),b=T(String.prototype.indexOf),x=T(String.prototype.trim),w=T(RegExp.prototype.test),S=(d=TypeError,function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return f(d,t)});function T(e){return function(t){for(var r=arguments.length,n=Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return l(e,t,n)}}function A(e,n){t&&t(e,null);for(var o=n.length;o--;){var i=n[o];if("string"==typeof i){var a=y(i);a!==i&&(r(n)||(n[o]=a),i=a)}e[i]=!0}return e}function L(t){var r=c(null),n=void 0;for(n in t)l(e,t,[n])&&(r[n]=t[n]);return r}function k(e,t){for(;null!==e;){var r=o(e,t);if(r){if(r.get)return T(r.get);if("function"==typeof r.value)return T(r.value)}e=n(e)}return function(e){return console.warn("fallback value for",e),null}}var E=i(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),R=i(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),O=i(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),N=i(["animate","color-profile","cursor","discard","fedropshadow","feimage","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),D=i(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),C=i(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),M=i(["#text"]),F=i(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),_=i(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),j=i(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),U=i(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),I=s(/\{\{[\s\S]*|[\s\S]*\}\}/gm),H=s(/<%[\s\S]*|[\s\S]*%>/gm),P=s(/^data-[\-\w.\u00B7-\uFFFF]/),B=s(/^aria-[\-\w]+$/),q=s(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),z=s(/^(?:\w+script|data):/i),W=s(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),G="function"==typeof Symbol&&"symbol"===a(Symbol.iterator)?function(e){return a(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":a(e)};function V(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var X=function(){return"undefined"==typeof window?null:window},Y=function(e,t){if("object"!==(void 0===e?"undefined":G(e))||"function"!=typeof e.createPolicy)return null;var r=null,n="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(n)&&(r=t.currentScript.getAttribute(n));var o="dompurify"+(r?"#"+r:"");try{return e.createPolicy(o,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}};return function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X(),r=function(t){return e(t)};if(r.version="2.3.0",r.removed=[],!t||!t.document||9!==t.document.nodeType)return r.isSupported=!1,r;var n=t.document,o=t.document,a=t.DocumentFragment,s=t.HTMLTemplateElement,c=t.Node,u=t.Element,l=t.NodeFilter,f=t.NamedNodeMap,d=void 0===f?t.NamedNodeMap||t.MozNamedAttrMap:f,T=t.Text,K=t.Comment,$=t.DOMParser,J=t.trustedTypes,Z=u.prototype,Q=k(Z,"cloneNode"),ee=k(Z,"nextSibling"),te=k(Z,"childNodes"),re=k(Z,"parentNode");if("function"==typeof s){var ne=o.createElement("template");ne.content&&ne.content.ownerDocument&&(o=ne.content.ownerDocument)}var oe=Y(J,n),ie=oe&&Ue?oe.createHTML(""):"",ae=o,se=ae.implementation,ce=ae.createNodeIterator,ue=ae.createDocumentFragment,le=ae.getElementsByTagName,fe=n.importNode,de={};try{de=L(o).documentMode?o.documentMode:{}}catch(e){}var pe={};r.isSupported="function"==typeof re&&se&&void 0!==se.createHTMLDocument&&9!==de;var me=I,he=H,ye=P,ve=B,ge=z,be=W,xe=q,we=null,Se=A({},[].concat(V(E),V(R),V(O),V(D),V(M))),Te=null,Ae=A({},[].concat(V(F),V(_),V(j),V(U))),Le=null,ke=null,Ee=!0,Re=!0,Oe=!1,Ne=!1,De=!1,Ce=!1,Me=!1,Fe=!1,_e=!1,je=!0,Ue=!1,Ie=!0,He=!0,Pe=!1,Be={},qe=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ze=null,We=A({},["audio","video","img","source","image","track"]),Ge=null,Ve=A({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),Xe="http://www.w3.org/1998/Math/MathML",Ye="http://www.w3.org/2000/svg",Ke="http://www.w3.org/1999/xhtml",$e=Ke,Je=!1,Ze=null,Qe=o.createElement("form"),et=function(e){Ze&&Ze===e||(e&&"object"===(void 0===e?"undefined":G(e))||(e={}),e=L(e),we="ALLOWED_TAGS"in e?A({},e.ALLOWED_TAGS):Se,Te="ALLOWED_ATTR"in e?A({},e.ALLOWED_ATTR):Ae,Ge="ADD_URI_SAFE_ATTR"in e?A(L(Ve),e.ADD_URI_SAFE_ATTR):Ve,ze="ADD_DATA_URI_TAGS"in e?A(L(We),e.ADD_DATA_URI_TAGS):We,Le="FORBID_TAGS"in e?A({},e.FORBID_TAGS):{},ke="FORBID_ATTR"in e?A({},e.FORBID_ATTR):{},Be="USE_PROFILES"in e&&e.USE_PROFILES,Ee=!1!==e.ALLOW_ARIA_ATTR,Re=!1!==e.ALLOW_DATA_ATTR,Oe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ne=e.SAFE_FOR_TEMPLATES||!1,De=e.WHOLE_DOCUMENT||!1,Fe=e.RETURN_DOM||!1,_e=e.RETURN_DOM_FRAGMENT||!1,je=!1!==e.RETURN_DOM_IMPORT,Ue=e.RETURN_TRUSTED_TYPE||!1,Me=e.FORCE_BODY||!1,Ie=!1!==e.SANITIZE_DOM,He=!1!==e.KEEP_CONTENT,Pe=e.IN_PLACE||!1,xe=e.ALLOWED_URI_REGEXP||xe,$e=e.NAMESPACE||Ke,Ne&&(Re=!1),_e&&(Fe=!0),Be&&(we=A({},[].concat(V(M))),Te=[],!0===Be.html&&(A(we,E),A(Te,F)),!0===Be.svg&&(A(we,R),A(Te,_),A(Te,U)),!0===Be.svgFilters&&(A(we,O),A(Te,_),A(Te,U)),!0===Be.mathMl&&(A(we,D),A(Te,j),A(Te,U))),e.ADD_TAGS&&(we===Se&&(we=L(we)),A(we,e.ADD_TAGS)),e.ADD_ATTR&&(Te===Ae&&(Te=L(Te)),A(Te,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&A(Ge,e.ADD_URI_SAFE_ATTR),He&&(we["#text"]=!0),De&&A(we,["html","head","body"]),we.table&&(A(we,["tbody"]),delete Le.tbody),i&&i(e),Ze=e)},tt=A({},["mi","mo","mn","ms","mtext"]),rt=A({},["foreignobject","desc","title","annotation-xml"]),nt=A({},R);A(nt,O),A(nt,N);var ot=A({},D);A(ot,C);var it=function(e){var t=re(e);t&&t.tagName||(t={namespaceURI:Ke,tagName:"template"});var r=y(e.tagName),n=y(t.tagName);if(e.namespaceURI===Ye)return t.namespaceURI===Ke?"svg"===r:t.namespaceURI===Xe?"svg"===r&&("annotation-xml"===n||tt[n]):Boolean(nt[r]);if(e.namespaceURI===Xe)return t.namespaceURI===Ke?"math"===r:t.namespaceURI===Ye?"math"===r&&rt[n]:Boolean(ot[r]);if(e.namespaceURI===Ke){if(t.namespaceURI===Ye&&!rt[n])return!1;if(t.namespaceURI===Xe&&!tt[n])return!1;var o=A({},["title","style","font","a","script"]);return!ot[r]&&(o[r]||!nt[r])}return!1},at=function(e){h(r.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ie}catch(t){e.remove()}}},st=function(e,t){try{h(r.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){h(r.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!Te[e])if(Fe||_e)try{at(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},ct=function(e){var t=void 0,r=void 0;if(Me)e="<remove></remove>"+e;else{var n=v(e,/^[\r\n\t ]+/);r=n&&n[0]}var i=oe?oe.createHTML(e):e;if($e===Ke)try{t=(new $).parseFromString(i,"text/html")}catch(e){}if(!t||!t.documentElement){t=se.createDocument($e,"template",null);try{t.documentElement.innerHTML=Je?"":i}catch(e){}}var a=t.body||t.documentElement;return e&&r&&a.insertBefore(o.createTextNode(r),a.childNodes[0]||null),$e===Ke?le.call(t,De?"html":"body")[0]:De?t.documentElement:a},ut=function(e){return ce.call(e.ownerDocument||e,e,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT,null,!1)},lt=function(e){return!(e instanceof T||e instanceof K||"string"==typeof e.nodeName&&"string"==typeof e.textContent&&"function"==typeof e.removeChild&&e.attributes instanceof d&&"function"==typeof e.removeAttribute&&"function"==typeof e.setAttribute&&"string"==typeof e.namespaceURI&&"function"==typeof e.insertBefore)},ft=function(e){return"object"===(void 0===c?"undefined":G(c))?e instanceof c:e&&"object"===(void 0===e?"undefined":G(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},dt=function(e,t,n){pe[e]&&p(pe[e],(function(e){e.call(r,t,n,Ze)}))},pt=function(e){var t=void 0;if(dt("beforeSanitizeElements",e,null),lt(e))return at(e),!0;if(v(e.nodeName,/[\u0080-\uFFFF]/))return at(e),!0;var n=y(e.nodeName);if(dt("uponSanitizeElement",e,{tagName:n,allowedTags:we}),!ft(e.firstElementChild)&&(!ft(e.content)||!ft(e.content.firstElementChild))&&w(/<[/\w]/g,e.innerHTML)&&w(/<[/\w]/g,e.textContent))return at(e),!0;if(!we[n]||Le[n]){if(He&&!qe[n]){var o=re(e)||e.parentNode,i=te(e)||e.childNodes;if(i&&o)for(var a=i.length-1;a>=0;--a)o.insertBefore(Q(i[a],!0),ee(e))}return at(e),!0}return e instanceof u&&!it(e)?(at(e),!0):"noscript"!==n&&"noembed"!==n||!w(/<\/no(script|embed)/i,e.innerHTML)?(Ne&&3===e.nodeType&&(t=e.textContent,t=g(t,me," "),t=g(t,he," "),e.textContent!==t&&(h(r.removed,{element:e.cloneNode()}),e.textContent=t)),dt("afterSanitizeElements",e,null),!1):(at(e),!0)},mt=function(e,t,r){if(Ie&&("id"===t||"name"===t)&&(r in o||r in Qe))return!1;if(Re&&!ke[t]&&w(ye,t));else if(Ee&&w(ve,t));else{if(!Te[t]||ke[t])return!1;if(Ge[t]);else if(w(xe,g(r,be,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==b(r,"data:")||!ze[e])if(Oe&&!w(ge,g(r,be,"")));else if(r)return!1}return!0},ht=function(e){var t=void 0,n=void 0,o=void 0,i=void 0;dt("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var s={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Te};for(i=a.length;i--;){var c=t=a[i],u=c.name,l=c.namespaceURI;if(n=x(t.value),o=y(u),s.attrName=o,s.attrValue=n,s.keepAttr=!0,s.forceKeepAttr=void 0,dt("uponSanitizeAttribute",e,s),n=s.attrValue,!s.forceKeepAttr&&(st(u,e),s.keepAttr))if(w(/\/>/i,n))st(u,e);else{Ne&&(n=g(n,me," "),n=g(n,he," "));var f=e.nodeName.toLowerCase();if(mt(f,o,n))try{l?e.setAttributeNS(l,u,n):e.setAttribute(u,n),m(r.removed)}catch(e){}}}dt("afterSanitizeAttributes",e,null)}},yt=function e(t){var r=void 0,n=ut(t);for(dt("beforeSanitizeShadowDOM",t,null);r=n.nextNode();)dt("uponSanitizeShadowNode",r,null),pt(r)||(r.content instanceof a&&e(r.content),ht(r));dt("afterSanitizeShadowDOM",t,null)};return r.sanitize=function(e,o){var i=void 0,s=void 0,u=void 0,l=void 0,f=void 0;if((Je=!e)&&(e="\x3c!--\x3e"),"string"!=typeof e&&!ft(e)){if("function"!=typeof e.toString)throw S("toString is not a function");if("string"!=typeof(e=e.toString()))throw S("dirty is not a string, aborting")}if(!r.isSupported){if("object"===G(t.toStaticHTML)||"function"==typeof t.toStaticHTML){if("string"==typeof e)return t.toStaticHTML(e);if(ft(e))return t.toStaticHTML(e.outerHTML)}return e}if(Ce||et(o),r.removed=[],"string"==typeof e&&(Pe=!1),Pe);else if(e instanceof c)1===(s=(i=ct("\x3c!----\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===s.nodeName||"HTML"===s.nodeName?i=s:i.appendChild(s);else{if(!Fe&&!Ne&&!De&&-1===e.indexOf("<"))return oe&&Ue?oe.createHTML(e):e;if(!(i=ct(e)))return Fe?null:ie}i&&Me&&at(i.firstChild);for(var d=ut(Pe?e:i);u=d.nextNode();)3===u.nodeType&&u===l||pt(u)||(u.content instanceof a&&yt(u.content),ht(u),l=u);if(l=null,Pe)return e;if(Fe){if(_e)for(f=ue.call(i.ownerDocument);i.firstChild;)f.appendChild(i.firstChild);else f=i;return je&&(f=fe.call(n,f,!0)),f}var p=De?i.outerHTML:i.innerHTML;return Ne&&(p=g(p,me," "),p=g(p,he," ")),oe&&Ue?oe.createHTML(p):p},r.setConfig=function(e){et(e),Ce=!0},r.clearConfig=function(){Ze=null,Ce=!1},r.isValidAttribute=function(e,t,r){Ze||et({});var n=y(e),o=y(t);return mt(n,o,r)},r.addHook=function(e,t){"function"==typeof t&&(pe[e]=pe[e]||[],h(pe[e],t))},r.removeHook=function(e){pe[e]&&m(pe[e])},r.removeHooks=function(e){pe[e]&&(pe[e]=[])},r.removeAllHooks=function(){pe={}},r}()},"object"===a(t)?e.exports=i():void 0===(o="function"==typeof(n=i)?n.call(t,r,t,e):n)||(e.exports=o)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";var e=r(806),t=r.n(e),n=r(433),o=r.n(n);function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.headerSearchIcon=document.querySelector("[data-header-search-icon]"),this.overlay=document.querySelector("[data-search-overlay]"),this.closeIcon=document.querySelector("[data-search-close]"),this.inputField=document.querySelector("#live-search-field"),this.resultArea=document.querySelector("[data-live-search-results]"),this.resultList=this.resultArea.querySelector("[data-live-search-results-list]"),this.loaderIcon=document.querySelector("[data-search-loader]"),this.typingWaitTime=null,this.previousValue="",this.headerSearchIcon&&(this.init(),this.events())}var r,n;return r=e,(n=[{key:"init",value:function(){this.overlay.style.transition=".33s visibility ease-in-out, .33s opacity ease-in-out, .33s transform ease-in-out"}},{key:"events",value:function(){var e=this;this.headerSearchIcon.addEventListener("click",(function(t){t.preventDefault(),e.openOverlay()})),this.closeIcon.addEventListener("click",(function(t){t.preventDefault(),e.closeOverlay()})),this.inputField.addEventListener("keyup",(function(){return e.keyPressHandler()}))}},{key:"openOverlay",value:function(){var e=this;this.overlay.classList.add("search-overlay--visible"),setTimeout((function(){e.inputField.focus()}),50)}},{key:"closeOverlay",value:function(){this.overlay.classList.remove("search-overlay--visible")}},{key:"keyPressHandler",value:function(){var e=this,t=this.inputField.value;""!=t&&t!==this.previousValue&&(this.showLoaderIcon(),this.hideListResult(),clearTimeout(this.typingWaitTime),this.typingWaitTime=setTimeout((function(){return e.sendRequest()}),750)),this.previousValue=t}},{key:"showLoaderIcon",value:function(){this.loaderIcon.classList.add("circle-loader--visible")}},{key:"hideLoaderIcon",value:function(){this.loaderIcon.classList.remove("circle-loader--visible")}},{key:"showListResult",value:function(){this.resultArea.classList.add("live-search-results--visible")}},{key:"hideListResult",value:function(){this.resultArea.classList.remove("live-search-results--visible")}},{key:"sendRequest",value:function(){var e=this;t().post("/search",{searchTerm:this.inputField.value}).then((function(t){e.hideLoaderIcon();var r=t.data;e.resultList.innerHTML="",r&&r.length?e.resultList.insertAdjacentHTML("afterbegin",function(e){return t=e.length,'<div class="list-group-item active"><strong>Search Results</strong> ('.concat(t," items found)</div>")+e.map((function(e){return function(e){return o().sanitize('<a class="list-group-item list-group-item-action" href="/post/'.concat(e._id,'">\n            <img class="avatar-sm rounded-circle mr-2" src="').concat(e.author.avatar,'" alt="">\n            <strong class="d-inline-block mr-2">').concat(e.title,'</strong>\n            <span class="text-muted small">by ').concat(e.author.username," on ").concat(new Date(e.createdDate).getMonth()+1,"/").concat(new Date(e.createdDate).getDay(),"/").concat(new Date(e.createdDate).getFullYear(),"</span>\n          </a>"))}(e)})).join("");var t}(r)):e.resultList.insertAdjacentHTML("afterbegin",'<div class="list-group-item">No search result</div>'),e.showListResult()})).catch((function(e){console.log(e)}))}}])&&i(r.prototype,n),e}();function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.openedYet=!1,this.chatWrapper=t,this.openIcon=document.querySelector("[data-header-chat-icon]"),this.injectHTML(),this.chatLog=document.querySelector("#chat"),this.chatField=document.querySelector("#chatField"),this.chatForm=document.querySelector("#chatForm"),this.closeIcon=document.querySelector(".chat-title-bar-close"),this.events()}var t,r;return t=e,(r=[{key:"events",value:function(){var e=this;this.openIcon.addEventListener("click",(function(){return e.showChat()})),this.closeIcon.addEventListener("click",(function(){return e.hideChat()})),this.chatForm.addEventListener("submit",(function(t){t.preventDefault(),e.sendMessageToServer()}))}},{key:"sendMessageToServer",value:function(){this.socket.emit("chatMessageFromBrowser",{message:this.chatField.value}),this.chatLog.insertAdjacentHTML("beforeend",o().sanitize('\n      <div class="chat-self">\n        <div class="chat-message">\n            <div class="chat-message-inner">\n                '.concat(this.chatField.value,'\n            </div>\n        </div>\n        <img src="').concat(this.user.avatar,'" alt="').concat(this.user.username,'" class="chat-avatar avatar-xs rounded-circle">\n      </div>    \n    '))),this.chatLog.scrollTop=this.chatLog.scrollHeight,this.chatField.value="",this.chatField.focus()}},{key:"showChat",value:function(){this.openedYet||this.openConnection(),this.openedYet=!0,this.chatWrapper.classList.add("chat--visible"),this.chatField.focus()}},{key:"hideChat",value:function(){this.chatWrapper.classList.remove("chat--visible")}},{key:"openConnection",value:function(){var e=this;this.socket=io(),this.socket.on("welcome",(function(t){e.user=t.user})),this.socket.on("chatMessageFromServer",(function(t){e.displayMessageFromServer(t)}))}},{key:"displayMessageFromServer",value:function(e){this.chatLog.insertAdjacentHTML("beforeend",o().sanitize('\n    <div class="chat-other">\n      <a href="/profile/'.concat(e.user.username,'">\n          <img class="avatar avatar-xs rounded-circle" src="').concat(e.user.avatar,'" alt="').concat(e.user.username,'">\n      </a>\n      <div class="chat-message">\n        <div class="chat-message-inner">\n          <a href="#">\n              <strong>\n                  ').concat(e.user.username,"\n              </strong>\n          </a>\n            ").concat(e.message,"\n        </div>\n      </div>\n    </div>\n    "))),this.chatLog.scrollTop=this.chatLog.scrollHeight}},{key:"injectHTML",value:function(){this.chatWrapper.innerHTML='\n    <div class="chat-title-bar">Chat \n      <span class="chat-title-bar-close"><i class="fe fe-x-circle"></i></span>\n    </div>\n      <div id="chat" class="chat-log"></div>\n    \n      <form id="chatForm" class="chat-form border-top">\n        <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">\n      </form>'}}])&&s(t.prototype,r),e}();new a;var u=document.querySelector("#chat-wrapper");u&&new c(u)})()})();