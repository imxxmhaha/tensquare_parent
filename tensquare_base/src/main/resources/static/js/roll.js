if(!window.jq||"function"!=typeof jq){var jq=function(a){function b(a,b,c){var d=t.createDocumentFragment();if(c){for(c=a.length-1;c>=0;c--)d.insertBefore(a[c],d.firstChild);b.insertBefore(d,b.firstChild)}else{for(c=0;c<a.length;c++)d.appendChild(a[c]);b.appendChild(d)}}function c(a){return a in w?w[a]:w[a]=RegExp("(^|\\s)"+a+"(\\s|$)")}function d(a){for(var b=0;b<a.length;b++)a.indexOf(a[b])!=b&&(a.splice(b,1),b--);return a}function e(a,b){var c=[];if(a==s)return c;for(;a;a=a.nextSibling)1==a.nodeType&&a!==b&&c.push(a);return c}function f(a,b){try{return b.querySelectorAll(a)}catch(c){return[]}}function g(a,b){if(a){if(a.nodeType)return b[b.length++]=a;for(var c=0,d=a.length;d>c;c++)b[b.length++]=a[c]}}function h(){}function i(b,c){b.os={},b.os.webkit=c.match(/WebKit\/([\d.]+)/)?!0:!1,b.os.android=c.match(/(Android)\s+([\d.]+)/)||c.match(/Silk-Accelerated/)?!0:!1,b.os.androidICS=b.os.android&&c.match(/(Android)\s4/)?!0:!1,b.os.ipad=c.match(/(iPad).*OS\s([\d_]+)/)?!0:!1,b.os.iphone=!b.os.ipad&&c.match(/(iPhone\sOS)\s([\d_]+)/)?!0:!1,b.os.webos=c.match(/(webOS|hpwOS)[\s\/]([\d.]+)/)?!0:!1,b.os.touchpad=b.os.webos&&c.match(/TouchPad/)?!0:!1,b.os.ios=b.os.ipad||b.os.iphone,b.os.playbook=c.match(/PlayBook/)?!0:!1,b.os.blackberry=b.os.playbook||c.match(/BlackBerry/)?!0:!1,b.os.blackberry10=b.os.blackberry&&c.match(/Safari\/536/)?!0:!1,b.os.chrome=c.match(/Chrome/)?!0:!1,b.os.opera=c.match(/Opera/)?!0:!1,b.os.fennec=c.match(/fennec/i)?!0:c.match(/Firefox/)?!0:!1,b.os.ie=c.match(/MSIE 10.0/i)?!0:!1,b.os.ieTouch=b.os.ie&&c.toLowerCase().match(/touch/i)?!0:!1,b.os.supportsTouch=a.DocumentTouch&&t instanceof a.DocumentTouch||"ontouchstart"in a,b.feat={};var d=t.documentElement.getElementsByTagName("head")[0];b.feat.nativeTouchScroll="undefined"!=typeof d.style["-webkit-overflow-scrolling"]&&b.os.ios,b.feat.cssPrefix=b.os.webkit?"Webkit":b.os.fennec?"Moz":b.os.ie?"ms":b.os.opera?"O":"",b.feat.cssTransformStart=b.os.opera?"(":"3d(",b.feat.cssTransformEnd=b.os.opera?")":",0)",b.os.android&&!b.os.webkit&&(b.os.android=!1)}function j(a){return a._jqmid||(a._jqmid=F++)}function k(a,b,c,d){if(b=l(b),b.ns)var e=RegExp("(?:^| )"+b.ns.replace(" "," .* ?")+"(?: |$)");return(E[j(a)]||[]).filter(function(a){return!(!a||b.e&&a.e!=b.e||b.ns&&!e.test(a.ns)||c&&a.fn!=c&&("function"!=typeof a.fn||"function"!=typeof c||""+a.fn!=""+c)||d&&a.sel!=d)})}function l(a){return a=(""+a).split("."),{e:a[0],ns:a.slice(1).sort().join(" ")}}function m(a,b,c){C.isObject(a)?C.each(a,c):a.split(/\s/).forEach(function(a){c(a,b)})}function n(a,b,c,d,e){var f=j(a),g=E[f]||(E[f]=[]);m(b,c,function(b,c){var f=e&&e(c,b),h=f||c,i=function(b){var c=h.apply(a,[b].concat(b.data));return c===!1&&b.preventDefault(),c},f=C.extend(l(b),{fn:c,proxy:i,sel:d,del:f,i:g.length});g.push(f),a.addEventListener(f.e,i,!1)})}function o(a,b,c,d){var e=j(a);m(b||"",c,function(b,c){k(a,b,c,d).forEach(function(b){delete E[e][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function p(a){var b=C.extend({originalEvent:a},a);return C.each(I,function(c,d){b[c]=function(){return this[d]=G,a[c].apply(a,arguments)},b[d]=H}),b}function q(a,b){var c,d;if(b&&a.dispatchEvent&&(c=C.Event("destroy",{bubbles:!1}),a.dispatchEvent(c)),(c=j(a))&&E[c]){for(d in E[c])a.removeEventListener(E[c][d].e,E[c][d].proxy,!1);delete E[c]}}function r(a,b){var c,d;if(a){if(c=a.childNodes,c&&c.length>0)for(d in c)r(c[d],b);q(a,b)}}var s,D,E,F,G,H,I,J,K,L,M,N,t=a.document,u=[],v=u.slice,w=[],x=1,y=/^\s*<(\w+)[^>]*>/,z={},A={},B=function(a,b){if(this.length=0,!a)return this;if(a instanceof B&&b==s)return a;if(C.isFunction(a))return C(t).ready(a);if(C.isArray(a)&&a.length!=s){for(var c=0;c<a.length;c++)this[this.length++]=a[c];return this}if(C.isObject(a)&&C.isObject(b)){if(a.length==s)a.parentNode==b&&(this[this.length++]=a);else for(c=0;c<a.length;c++)a[c].parentNode==b&&(this[this.length++]=a[c]);return this}if(C.isObject(a)&&b==s)return this[this.length++]=a,this;if(b!==s){if(b instanceof B)return b.find(a)}else b=t;return this.selector(a,b)},C=function(a,b){return new B(a,b)};return C.is$=function(a){return a instanceof B},C.map=function(a,b){var c,e,d=[];if(C.isArray(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!==s&&d.push(c);else if(C.isObject(a))for(e in a)a.hasOwnProperty(e)&&(c=b(a[e],e),c!==s&&d.push(c));return C([d])},C.each=function(a,b){var c;if(C.isArray(a))for(c=0;c<a.length&&b(c,a[c])!==!1;c++);else if(C.isObject(a))for(c in a)if(a.hasOwnProperty(c)&&b(c,a[c])===!1)break;return a},C.extend=function(a){if(a==s&&(a=this),1===arguments.length){for(var b in a)this[b]=a[b];return this}return v.call(arguments,1).forEach(function(b){for(var c in b)a[c]=b[c]}),a},C.isArray=function(a){return a instanceof Array&&a.push!=s},C.isFunction=function(a){return"function"==typeof a},C.isObject=function(a){return"object"==typeof a},C.fn=B.prototype={constructor:B,forEach:u.forEach,reduce:u.reduce,push:u.push,indexOf:u.indexOf,concat:u.concat,selector:function(a,b){if(a=a.trim(),"#"===a[0]&&-1==a.indexOf(".")&&-1===a.indexOf(" ")&&-1===a.indexOf(">"))b==t?g(b.getElementById(a.replace("#","")),this):g(f(a,b),this);else if("<"===a[0]&&">"===a[a.length-1]){var c=t.createElement("div");c.innerHTML=a.trim(),g(c.childNodes,this)}else g(f(a,b),this);return this},oldElement:s,slice:u.slice,setupOld:function(a){return a==s?C():(a.oldElement=this,a)},map:function(a){var b,d,c=[];for(d=0;d<this.length;d++)b=a(d,this[d]),b!==s&&c.push(b);return C([c])},each:function(a){return this.forEach(function(b,c){a.call(b,c,b)}),this},ready:function(a){return"complete"===t.readyState||"loaded"===t.readyState||!C.os.ie&&"interactive"===t.readyState?a():t.addEventListener("DOMContentLoaded",a,!1),this},find:function(a){var c,b,e,f;if(0===this.length)return this;for(b=[],e=0;e<this.length;e++)for(c=C(a,this[e]),f=0;f<c.length;f++)b.push(c[f]);return C(d(b))},html:function(a,b){if(0===this.length)return this;if(a===s)return this[0].innerHTML;for(var c=0;c<this.length;c++)b!==!1&&C.cleanUpContent(this[c],!1,!0),this[c].innerHTML=a;return this},text:function(a){if(0===this.length)return this;if(a===s)return this[0].textContent;for(var b=0;b<this.length;b++)this[b].textContent=a;return this},css:function(b,c,d){if(d=d!=s?d:this[0],0===this.length)return this;if(c==s&&"string"==typeof b)return a.getComputedStyle(d),d.style[b]?d.style[b]:a.getComputedStyle(d)[b];for(d=0;d<this.length;d++)if(C.isObject(b))for(var e in b)this[d].style[e]=b[e];else this[d].style[b]=c;return this},vendorCss:function(a,b,c){return this.css(C.feat.cssPrefix+a,b,c)},empty:function(){for(var a=0;a<this.length;a++)C.cleanUpContent(this[a],!1,!0),this[a].innerHTML="";return this},hide:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"!=this.css("display",null,this[a])&&(this[a].setAttribute("jqmOldStyle",this.css("display",null,this[a])),this[a].style.display="none");return this},show:function(){if(0===this.length)return this;for(var a=0;a<this.length;a++)"none"==this.css("display",null,this[a])&&(this[a].style.display=this[a].getAttribute("jqmOldStyle")?this[a].getAttribute("jqmOldStyle"):"block",this[a].removeAttribute("jqmOldStyle"));return this},toggle:function(b){for(var c=b===!0?!0:!1,d=0;d<this.length;d++)"none"!==a.getComputedStyle(this[d]).display||b!==s&&c===!1?(this[d].setAttribute("jqmOldStyle",this[d].style.display),this[d].style.display="none"):(this[d].style.display=this[d].getAttribute("jqmOldStyle")!=s?this[d].getAttribute("jqmOldStyle"):"block",this[d].removeAttribute("jqmOldStyle"));return this},val:function(a){if(0===this.length)return a===s?s:this;if(a==s)return this[0].value;for(var b=0;b<this.length;b++)this[b].value=a;return this},attr:function(a,b){var c,d;if(0===this.length)return b===s?s:this;if(b===s&&!C.isObject(a))return this[0].jqmCacheId&&z[this[0].jqmCacheId][a]?this[0].jqmCacheId&&z[this[0].jqmCacheId][a]:this[0].getAttribute(a);for(c=0;c<this.length;c++)if(C.isObject(a))for(d in a)C(this[c]).attr(d,a[d]);else C.isArray(b)||C.isObject(b)||C.isFunction(b)?(this[c].jqmCacheId||(this[c].jqmCacheId=C.uuid()),z[this[c].jqmCacheId]||(z[this[c].jqmCacheId]={}),z[this[c].jqmCacheId][a]=b):null==b&&b!==s?(this[c].removeAttribute(a),this[c].jqmCacheId&&z[this[c].jqmCacheId][a]&&delete z[this[c].jqmCacheId][a]):this[c].setAttribute(a,b);return this},removeAttr:function(a){for(var b=this,c=0;c<this.length;c++)a.split(/\s+/g).forEach(function(d){b[c].removeAttribute(d),b[c].jqmCacheId&&z[b[c].jqmCacheId][a]&&delete z[b[c].jqmCacheId][a]});return this},prop:function(a,b){var c,d;if(0===this.length)return b===s?s:this;if(b===s&&!C.isObject(a))return this[0].jqmCacheId&&A[this[0].jqmCacheId][a]?this[0].jqmCacheId&&A[this[0].jqmCacheId][a]:!(c=this[0][a])&&a in this[0]?this[0][a]:c;for(c=0;c<this.length;c++)if(C.isObject(a))for(d in a)C(this[c]).prop(d,a[d]);else C.isArray(b)||C.isObject(b)||C.isFunction(b)?(this[c].jqmCacheId||(this[c].jqmCacheId=C.uuid()),A[this[c].jqmCacheId]||(A[this[c].jqmCacheId]={}),A[this[c].jqmCacheId][a]=b):null==b&&b!==s?C(this[c]).removeProp(a):this[c][a]=b;return this},removeProp:function(a){for(var b=this,c=0;c<this.length;c++)a.split(/\s+/g).forEach(function(d){b[c][d]&&delete b[c][d],b[c].jqmCacheId&&A[b[c].jqmCacheId][a]&&delete A[b[c].jqmCacheId][a]});return this},remove:function(a){if(a=C(this).filter(a),a==s)return this;for(var b=0;b<a.length;b++)C.cleanUpContent(a[b],!0,!0),a[b].parentNode.removeChild(a[b]);return this},addClass:function(a){var b,c,d,e;for(b=0;b<this.length;b++)c=this[b].className,d=[],e=this,a.split(/\s+/g).forEach(function(a){e.hasClass(a,e[b])||d.push(a)}),this[b].className+=(c?" ":"")+d.join(" "),this[b].className=this[b].className.trim();return this},removeClass:function(a){var b,d;for(b=0;b<this.length;b++){if(a==s){this[b].className="";break}d=this[b].className,a.split(/\s+/g).forEach(function(a){d=d.replace(c(a)," ")}),this[b].className=d.length>0?d.trim():""}return this},replaceClass:function(a,b){var d,e;for(d=0;d<this.length;d++)a==s?this[d].className=b:(e=this[d].className,a.split(/\s+/g).concat(b.split(/\s+/g)).forEach(function(a){e=e.replace(c(a)," ")}),e=e.trim(),this[d].className=e.length>0?(e+" "+b).trim():b);return this},hasClass:function(a,b){return 0===this.length?!1:(b||(b=this[0]),c(a).test(b.className))},append:function(c,d){var e,f;if(c&&c.length!=s&&0===c.length)return this;for((C.isArray(c)||C.isObject(c))&&(c=C(c)),e=0;e<this.length;e++)c.length&&"string"!=typeof c?(c=C(c),b(c,this[e],d)):(f=y.test(c)?C(c):s,(f==s||0==f.length)&&(f=t.createTextNode(c)),f.nodeName==s||"script"!=f.nodeName.toLowerCase()||f.type&&"text/javascript"!==f.type.toLowerCase()?f instanceof B?b(f,this[e],d):d!=s?this[e].insertBefore(f,this[e].firstChild):this[e].appendChild(f):a.eval(f.innerHTML));return this},appendTo:function(a){return C(a).append(this),this},prependTo:function(a){return C(a).append(this,!0),this},prepend:function(a){return this.append(a,1)},insertBefore:function(a,b){if(0==this.length)return this;if(a=C(a).get(0),!a)return this;for(var c=0;c<this.length;c++)b?a.parentNode.insertBefore(this[c],a.nextSibling):a.parentNode.insertBefore(this[c],a);return this},insertAfter:function(a){this.insertBefore(a,!0)},get:function(a){return a=a==s?0:a,0>a&&(a+=this.length),this[a]?this[a]:s},offset:function(){if(0===this.length)return this;if(this[0]==a)return{left:0,top:0,right:0,bottom:0,width:a.innerWidth,height:a.innerHeight};var b=this[0].getBoundingClientRect();return{left:b.left+a.pageXOffset,top:b.top+a.pageYOffset,right:b.right+a.pageXOffset,bottom:b.bottom+a.pageYOffset,width:b.right-b.left,height:b.bottom-b.top}},height:function(b){return 0===this.length?this:b!=s?this.css("height",b):this[0]==this[0].window?a.innerHeight:this[0].nodeType==this[0].DOCUMENT_NODE?this[0].documentElement.offsetheight:(b=this.css("height").replace("px",""))?b:this.offset().height},width:function(b){return 0===this.length?this:b!=s?this.css("width",b):this[0]==this[0].window?a.innerWidth:this[0].nodeType==this[0].DOCUMENT_NODE?this[0].documentElement.offsetwidth:(b=this.css("width").replace("px",""))?b:this.offset().width},parent:function(a,b){var c,e,f;if(0==this.length)return this;for(c=[],e=0;e<this.length;e++)for(f=this[e];f.parentNode&&f.parentNode!=t&&(c.push(f.parentNode),f.parentNode&&(f=f.parentNode),b););return this.setupOld(C(d(c)).filter(a))},parents:function(a){return this.parent(a,!0)},children:function(a){if(0==this.length)return this;for(var b=[],c=0;c<this.length;c++)b=b.concat(e(this[c].firstChild));return this.setupOld(C(b).filter(a))},siblings:function(a){if(0==this.length)return this;for(var b=[],c=0;c<this.length;c++)this[c].parentNode&&(b=b.concat(e(this[c].parentNode.firstChild,this[c])));return this.setupOld(C(b).filter(a))},closest:function(a,b){if(0==this.length)return this;var c=this[0],d=C(a,b);if(0==d.length)return C();for(;c&&-1==d.indexOf(c);)c=c!==b&&c!==t&&c.parentNode;return C(c)},filter:function(a){var b,c,e;if(0==this.length)return this;if(a==s)return this;for(b=[],c=0;c<this.length;c++)e=this[c],e.parentNode&&C(a,e.parentNode).indexOf(e)>=0&&b.push(e);return this.setupOld(C(d(b)))},not:function(a){var b,c,e;if(0==this.length)return this;for(b=[],c=0;c<this.length;c++)e=this[c],e.parentNode&&-1==C(a,e.parentNode).indexOf(e)&&b.push(e);return this.setupOld(C(d(b)))},data:function(a,b){return this.attr("data-"+a,b)},end:function(){return this.oldElement!=s?this.oldElement:C()},clone:function(a){if(a=a===!1?!1:!0,0==this.length)return this;for(var b=[],c=0;c<this.length;c++)b.push(this[c].cloneNode(a));return C(b)},size:function(){return this.length},serialize:function(){if(0==this.length)return"";for(var a=[],b=0;b<this.length;b++)this.slice.call(this[b].elements).forEach(function(b){var c=b.getAttribute("type");if("fieldset"!=b.nodeName.toLowerCase()&&!b.disabled&&"submit"!=c&&"reset"!=c&&"button"!=c&&("radio"!=c&&"checkbox"!=c||b.checked)&&b.getAttribute("name"))if("select-multiple"==b.type)for(c=0;c<b.options.length;c++)b.options[c].selected&&a.push(b.getAttribute("name")+"="+encodeURIComponent(b.options[c].value));else a.push(b.getAttribute("name")+"="+encodeURIComponent(b.value))});return a.join("&")},eq:function(a){return C(this.get(a))},index:function(a){return a?this.indexOf(C(a)[0]):this.parent().children().indexOf(this[0])},is:function(a){return!!a&&this.filter(a).length>0}},D={type:"GET",beforeSend:h,success:h,error:h,complete:h,context:s,timeout:0,crossDomain:null},C.jsonP=function(b,c){var d="jsonp_callback"+ ++x,e="",f=t.createElement("script");return a[d]=function(c){clearTimeout(e),C(f).remove(),delete a[d],b.success.call(void 0,c)},f.src=b.url.replace(/=\?/,"="+d),C.isObject(c)&&(c=C.param(c)),c&&(f.src+=-1===f.src.indexOf("?")?"?"+c:"&"+c),b.error&&(f.onerror=function(){clearTimeout(e),b.error.call(void 0,"","error")}),C("head").append(f),b.timeout>0&&(e=setTimeout(function(){b.error.call(void 0,"","timeout")},b.timeout)),{}},C.ajax=function(b){var c,e,d,f,g,i,j;try{d=b||{};for(e in D)"undefined"==typeof d[e]&&(d[e]=D[e]);if(d.url||(d.url=a.location),d.contentType||(d.contentType="application/x-www-form-urlencoded"),d.headers||(d.headers={}),"async"in d&&d.async===!1||(d.async=!0),d.dataType)switch(d.dataType){case"script":d.dataType="text/javascript, application/javascript";break;case"json":d.dataType="application/json";break;case"xml":d.dataType="application/xml, text/xml";break;case"html":d.dataType="text/html";break;case"text":d.dataType="text/plain";break;default:d.dataType="text/html";break;case"jsonp":return C.jsonP(b,d.data)}else d.dataType="text/html";if(C.isObject(d.data)&&(d.data=C.param(d.data)),"get"===d.type.toLowerCase()&&d.data&&(d.url+=-1===d.url.indexOf("?")?"?"+d.data:"&"+d.data),/=\?/.test(d.url))return C.jsonP(d);null===d.crossDomain&&(d.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(d.url)&&RegExp.$2!=a.location.host),d.crossDomain||(d.headers=C.extend({"X-Requested-With":"XMLHttpRequest"},d.headers)),g=d.context,i=/^([\w-]+:)\/\//.test(d.url)?RegExp.$1:a.location.protocol,c=new a.XMLHttpRequest,c.onreadystatechange=function(){var b,e,a=d.dataType;if(4===c.readyState){if(clearTimeout(f),e=!1,c.status>=200&&c.status<300||0===c.status&&"file:"==i){if("application/json"!==a||/^\s*$/.test(c.responseText))"application/xml, text/xml"===a?b=c.responseXML:"text/html"==a?(b=c.responseText,C.parseJS(b)):b=c.responseText;else try{b=JSON.parse(c.responseText)}catch(h){e=h}0===c.status&&0===b.length&&(e=!0),e?d.error.call(g,c,"parsererror",e):d.success.call(g,b,"success",c)}else e=!0,d.error.call(g,c,"error");d.complete.call(g,c,e?"error":"success")}},c.open(d.type,d.url,d.async),d.withCredentials&&(c.withCredentials=!0),d.contentType&&(d.headers["Content-Type"]=d.contentType);for(j in d.headers)c.setRequestHeader(j,d.headers[j]);if(d.beforeSend.call(g,c,d)===!1)return c.abort(),!1;d.timeout>0&&(f=setTimeout(function(){c.onreadystatechange=h,c.abort(),d.error.call(g,c,"timeout")},d.timeout)),c.send(d.data)}catch(k){console.log(k),d.error.call(g,c,"error",k)}return c},C.get=function(a,b){return this.ajax({url:a,success:b})},C.post=function(a,b,c,d){return"function"==typeof b&&(c=b,b={}),d===s&&(d="html"),this.ajax({url:a,type:"POST",data:b,dataType:d,success:c})},C.getJSON=function(a,b,c){return"function"==typeof b&&(c=b,b={}),this.ajax({url:a,data:b,success:c,dataType:"json"})},C.param=function(a,b){var d,e,f,c=[];if(a instanceof B)a.each(function(){c.push((b?b+"[]":this.id)+"="+encodeURIComponent(this.value))});else for(d in a)e=b?b+"["+d+"]":d,f=a[d],c.push(C.isObject(f)?C.param(f,e):e+"="+encodeURIComponent(f));return c.join("&")},C.parseJSON=function(a){return JSON.parse(a)},C.parseXML=function(a){return(new DOMParser).parseFromString(a,"text/xml")},i(C,navigator.userAgent),C.__detectUA=i,"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+|\s+$/,""),this}),C.uuid=function(){var a=function(){return(0|65536*(1+Math.random())).toString(16).substring(1)};return a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()},C.getCssMatrix=function(b){if(b==s)return a.WebKitCSSMatrix||a.MSCSSMatrix||{a:0,b:0,c:0,d:0,e:0,f:0};try{if(a.WebKitCSSMatrix)return new WebKitCSSMatrix(a.getComputedStyle(b).webkitTransform);if(a.MSCSSMatrix)return new MSCSSMatrix(a.getComputedStyle(b).transform);var c=a.getComputedStyle(b)[C.feat.cssPrefix+"Transform"].replace(/[^0-9\-.,]/g,"").split(",");return{a:+c[0],b:+c[1],c:+c[2],d:+c[3],e:+c[4],f:+c[5]}}catch(d){return{a:0,b:0,c:0,d:0,e:0,f:0}}},E={},F=1,C.event={add:n,remove:o},C.fn.bind=function(a,b){for(var c=0;c<this.length;c++)n(this[c],a,b);return this},C.fn.unbind=function(a,b){for(var c=0;c<this.length;c++)o(this[c],a,b);return this},C.fn.one=function(a,b){return this.each(function(c,d){n(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return o(d,b,a),c}})})},G=function(){return!0},H=function(){return!1},I={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"},C.fn.delegate=function(a,b,c){var d,e;for(d=0;d<this.length;d++)e=this[d],n(e,b,c,a,function(b){return function(c){var d,f=C(c.target).closest(a,e).get(0);return f?(d=C.extend(p(c),{currentTarget:f,liveFired:e}),b.apply(f,[d].concat([].slice.call(arguments,1)))):void 0}});return this},C.fn.undelegate=function(a,b,c){for(var d=0;d<this.length;d++)o(this[d],b,c,a);return this},C.fn.on=function(a,b,c){return b===s||C.isFunction(b)?this.bind(a,b):this.delegate(b,a,c)},C.fn.off=function(a,b,c){return b===s||C.isFunction(b)?this.unbind(a,b):this.undelegate(b,a,c)},C.fn.trigger=function(a,b,c){for("string"==typeof a&&(a=C.Event(a,c)),a.data=b,b=0;b<this.length;b++)this[b].dispatchEvent(a);return this},C.Event=function(a,b){var e,c=t.createEvent("Events"),d=!0;if(b)for(e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c},C.bind=function(a,b,c){a.__events||(a.__events={}),C.isArray(b)||(b=[b]);for(var d=0;d<b.length;d++)a.__events[b[d]]||(a.__events[b[d]]=[]),a.__events[b[d]].push(c)},C.trigger=function(a,b,c){var e,f,g,d=!0;if(!a.__events)return d;for(C.isArray(b)||(b=[b]),C.isArray(c)||(c=[]),e=0;e<b.length;e++)if(a.__events[b[e]])for(f=a.__events[b[e]],g=0;g<f.length;g++)C.isFunction(f[g])&&f[g].apply(a,c)===!1&&(d=!1);return d},C.unbind=function(a,b,c){var d,e,f;if(a.__events)for(C.isArray(b)||(b=[b]),d=0;d<b.length;d++)if(a.__events[b[d]])for(e=a.__events[b[d]],f=0;f<e.length;f++)if(c==s&&delete e[f],e[f]==c){e.splice(f,1);break}},C.proxy=function(a,b,c){return function(){return c?a.apply(b,c):a.apply(b,arguments)}},J=function(a,b){for(var c=0;c<a.length;c++)r(a[c],b)},C.cleanUpContent=function(a,b,c){if(a){var d=a.childNodes;d&&d.length>0&&C.asap(J,{},[v.apply(d,[0]),c]),b&&q(a,c)}},K=[],L=[],M=[],C.asap=function(b,c,d){if(!C.isFunction(b))throw"$.asap - argument is not a valid function";K.push(b),L.push(c?c:{}),M.push(d?d:[]),a.postMessage("jqm-asap","*")},a.addEventListener("message",function(b){b.source==a&&"jqm-asap"==b.data&&(b.stopPropagation(),K.length>0&&K.shift().apply(L.shift(),M.shift()))},!0),N={},C.parseJS=function(b){var c,d;if(b)for("string"==typeof b&&(c=t.createElement("div"),c.innerHTML=b,b=c),b=b.getElementsByTagName("script"),c=0;c<b.length;c++)b[c].src.length>0&&!N[b[c].src]?(d=t.createElement("script"),d.type=b[c].type,d.src=b[c].src,t.getElementsByTagName("head")[0].appendChild(d),N[b[c].src]=1):a.eval(b[c].innerHTML)},["click","keydown","keyup","keypress","submit","load","resize","change","select","error"].forEach(function(a){C.fn[a]=function(b){return b?this.bind(a,b):this.trigger(a)}}),C}(window);"$"in window||(window.$=jq),window.numOnly||(window.numOnly=function(a){if(void 0===a||""===a)return 0;if(isNaN(parseFloat(a))){if(!a.replace)return 0;a=a.replace(/[^0-9.-]/,"")}return parseFloat(a)})}