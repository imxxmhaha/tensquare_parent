function t() {
  window.WeixinJSBridge ? n() : document.addEventListener("WeixinJSBridgeReady", n, !1)
}

function n() {
  WeixinJSBridge.on("menu:share:appmessage", function() {
    r()
  }), WeixinJSBridge.on("menu:share:timeline", function() {
    i()
  }), WeixinJSBridge.on("menu:share:weibo", function() {
    a()
  }), console.log("m_wxshareSet:wechat_platform:bindShare")
}

function o(e) {
  r = function() {
    WeixinJSBridge.invoke("sendAppMessage", {
      appid: e.appid,
      img_url: e.img_url,
      img_width: e.img_width,
      img_height: e.img_height,
      link: e.link,
      desc: e.desc,
      title: e.title
    }, function() {})
  }, i = function() {
    WeixinJSBridge.invoke("shareTimeline", {
      img_url: e.img_url,
      img_width: e.img_width,
      img_height: e.img_height,
      link: e.link,
      desc: e.desc,
      title: e.title
    }, function() {})
  }, a = function() {
    WeixinJSBridge.invoke("shareWeibo", {
      content: e.desc,
      url: e.link
    }, function() {})
  }
}

var r, i, a, WxshareSet = {},
  l = !1;

WxshareSet.set = function(n) {
  l || (t(), l = !0);
  var r = $.extend({
    appid: "wxd5c76178bf617551",
    img_url: "http://3gimg.qq.com/wap30/img/touch/icon.png",
    img_width: "180",
    img_height: "180",
    link: location.href.replace(/([?&])sid=[^&#]*/g, "$1ctlastwithsid=1"),
    desc: document.title,
    title: document.title
  }, n);
  o(r)
}

