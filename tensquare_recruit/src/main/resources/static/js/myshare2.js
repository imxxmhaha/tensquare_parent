/**
 * 当前脚本针对uc浏览器、qq浏览器、微信浏览器的朋友及朋友圈分享功能
 * 微信浏览器的分享只能针对域名为a.10086.cn和wap.monternet.com的页面
 * 依赖jquery的jsonp方法
 */

var mShare = (function (share){
    'use strict';
    var UA = navigator.appVersion;

    /**
     * 是否是 UC 浏览器
     */
    var uc = UA.split('UCBrowser/').length > 1 ? true : false;

    /**
     * 判断 qq 浏览器
     * 然而qq浏览器分高低版本
     * 2 代表高版本
     * 1 代表低版本
     */
    var qq = UA.split('MQQBrowser/').length > 1 ? 2 : false;

    /**
     * 是否是百度
     */
    var baidu = /mobile.*baidubrowser/i.test(UA);

    /**
     * 是否是搜狗 
     */
     var sogou =  /SogouMobileBrowser/i.test(UA);  // 暂时不跳转


    /**
     * 是否是微信
     */
    var wxb = /micromessenger/i.test(UA);
    
    /*是否是普通浏览器*/
    var BROWSEROBJ = {}
   var browserFlag = true;//普通浏览器标识


    /**
     * 浏览器版本
     */
    var qqVs = qq ? parseFloat(UA.split('MQQBrowser/')[1]) : 0;
    var ucVs = uc ? parseFloat(UA.split('UCBrowser/')[1]) : 0;

    /**
     * 获取操作系统信息  iPhone(1)  Android(2)
     */
    var os = (function () {
        var ua = navigator.userAgent.toLowerCase();

        if (/iphone|ipod/i.test(ua)) {
            return 1;
        } else if (/android/i.test(ua)) {
            return 2;
        } else {
            return 0;
        }
    }());

    /**
     * qq浏览器下面 是否加载好了相应的api文件
     */
    var qqBridgeLoaded = false;

    // 进一步细化版本和平台判断
    if ((qq && qqVs < 5.4 && os == 1) || (qq && qqVs < 5.3 && os == 2)) {
        qq = 0;
    } else {
        if (qq && qqVs < 5.4 && os == 2) {
            qq = 1;
        } else {
            if (uc && ((ucVs < 10.2 && os == 1) || (ucVs < 9.7 && os == 2))) {
                uc = 0;
            }
        }
    }

    /**
     * qq浏览器下面 根据不同版本 加载对应的bridge
     * @method loadqqApi
     * @param  {Function} cb 回调函数
     */
    function loadqqApi(cb) {
        // qq == 0

        if (!qq) {
            return cb && cb();
        }
        //变量前加上+后，变量将转换为数字，进行数字运算
        var script = document.createElement('script');
        script.src = (+qq === 1) ? '//3gimg.qq.com/html5/js/qb.js' : '//jsapi.qq.com/get?api=app.share';

        /**
         * 需要等加载过 qq 的 bridge 脚本之后
         * 再去初始化分享组件
         */
        script.onload = function () {
            cb && cb();
        };
        document.body.appendChild(script);
    }

    /**
     * 预加载 weixin框架js
     * @method loadJweixin
     */
    function loadJweixin(){
        if (wxb) {
            var weixinJs = document.createElement('script');
            weixinJs.src = 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js';
            document.head.appendChild(weixinJs);
        }
    }
    /**
     * UC浏览器分享
     * @method ucShare
     */
    function ucShare(config) {
        // ['title', 'content', 'url', 'platform', 'disablePlatform', 'source', 'htmlID']
        // 关于platform
        // ios: kWeixin || kWeixinFriend;
        // android: WechatFriends || WechatTimeline
        // uc 分享会直接使用截图

        var platform = '';
        var shareInfo = null;

        // 指定了分享类型
        if (config.type) {
            if (os == 2) {
                platform = config.type == 1 ? 'WechatTimeline' : 'WechatFriends';
            } else if (os == 1) {
                platform = config.type == 1 ? 'kWeixinFriend' : 'kWeixin';
            }
        }

        shareInfo = [config.title, config.desc, config.url, platform, '', '', ''];

        // android
        if (window.ucweb) { ///(Android)/i.test(ua)
            ucweb.startRequest && ucweb.startRequest('shell.page_share', shareInfo);
            return;
        }
        //ios
        if (window.ucbrowser) {///(iphone|ipod|ios)/i.test(ua)
            ucbrowser.web_share && ucbrowser.web_share.apply(null, shareInfo);
            return;
        }
    }

    /**
     * qq 浏览器分享函数
     * @method qqShare
     */
    function qqShare(config) {

        var type = config.type,share;

        //微信好友 1, 微信朋友圈 8
        type = type ? ((type == 1) ? 8 : 1) : '';

        share = function () {
            var shareInfo = {
                'url': config.url,
                'title': config.title,
                'description': config.desc,
                'img_url': config.img,
                'img_title': config.title,
                'to_app': type,
                'cus_txt': ''
            };
            //高版本
            if (window.browser) {
                browser.app && browser.app.share(shareInfo);
            //低版本
            } else if (window.qb) {

                qb.share && qb.share(shareInfo);
            }
        };

        if (qqBridgeLoaded) {

            share();
        } else {
            loadqqApi(share);
        }
    }

    /**
     * 百度 浏览器分享函数
     * @method baiduShare
     */
    function baiduShare(config) {
        if(os == 1){
            location.href = "baidubrowserapp://bd_utils?action=shareWebPage&params="+encodeURIComponent(JSON.stringify({
                title: config.title,
                content: config.desc,  
                landurl: config.url,
                imageurl: config.img,
                mediaType: 0,
                share_type: "webpage"
            }));
        }else if(os == 2){
            _flyflowNative.exec("bd_utils", "shareWebPage", JSON.stringify({
                title: config.title,
                content: config.desc,  
                landurl: config.url,
                imageurl: config.img,
                shareSource:""
            }), "");
        }
    }

    /**
     * 搜狗 浏览器分享函数
     * @method sogouShare
     */
    function sogouShare(el){
        // 需要安装qq浏览器
        // 原理：从搜狗浏览器进入到qq浏览上
      var el = el || {};
      var time = "";
      clearTimeout(time)
      var t = el.testUrl || location.href
        , n = el.onSucc
        , i = el.onFail
        , a = navigator.userAgent
        , s = 0
        , c = a.match(/iphone\s*os\s*\d\d?/gi);
      c && (s = parseInt(c[0].split(" ")[2])),
      t = "mttbrowser://url=" + t.replace(/http:\/\//gi, "");
      if (s > 8){
          location.href = t;
          // time = setTimeout(fxTips("请使用浏览器分享功能"),3000);
        }
      else {
          var u = document.createElement("iframe");
          u.src = t,
          u.style.display = "none",
          document.body.appendChild(u),
          u && u.parentNode && u.parentNode.removeChild(u);
          // time = setTimeout(fxTips("请使用浏览器分享功能"),3000);
      }
    }


    /**
     * 使用浏览器默认分享
     * @method qqShare
     */
     function getBrowserInfo() {
        BROWSEROBJ.browserFlag = false
     }


    //设置是否加载了公众号信息;
    var wxShareInfo = false;
    /**
     * 内置浏览器分享函数
     * @method wxShare
     */
    function wxShare(config){
        if(wxShareInfo) return;
        //发送jsonP去取公众号数据
        $.ajax({
            url: "http://wap.monternet.com/p/remoting/wechat_share_ticket.jsonp?url=" + encodeURIComponent(location.href),
            type: "get",
            async: false,
            dataType: 'jsonp',
            timeout: 5000,
            success: function (data) {
                wxShareInfo = true;
                wx.config({
                    debug: false,
                    timestamp: data.timestamp,
                    signature: data.signature,
                    nonceStr: data.nonceStr,
                    appId : 'wxd5c76178bf617551',
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ]
                });
                //设置微信内容
                wx.ready(function(){
                    //朋友圈
                    wx.onMenuShareTimeline({
                        title: config.title, // 分享标题
                        link: config.url, // 分享链接
                        imgUrl: config.img, // 分享图标
                        success: function () {
                            //alert('设置分享朋友圈内容成功');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    //朋友
                    wx.onMenuShareAppMessage({
                        title: config.title, // 分享标题
                        desc: config.desc, // 分享描述
                        link: config.url, // 分享链接
                        imgUrl: config.img, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            //alert('设置分享好友内容成功');
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            error: function () {
                console.log('微信分享公众号获取信息失败');
            }
        });
    }

    /**
     * 微信内置浏览器提示浮层
     * @method wxTip
     */
    function wxTip(config){
        // wxShare(config);
        //弹窗
        if(wxb){
            if(config.type == 1){
                BROWSEROBJ.shareByPyq = true
            }else if(config.type == 2){
                BROWSEROBJ.shareByPy = true
            }
        }
    }
    /**
     * 对外暴露的接口函数
     * @method mShare
     * @param  {Object} config 配置对象
     * mShare为构造函数,创建实例的值
     */
    function mShare(config) {
       this.config = config
        if(wxb){
            wxShare(this.config);
        }
        this.init = function (type) {

            if (typeof type != 'undefined') {
                this.config.type = type;
            }
            try {
                if (uc) {
                    ucShare(this.config);
                } else if (qq && !wxb) {
                    qqShare(this.config);
                } else if(wxb){
                    wxTip(this.config);
                }else if(baidu){
                    baiduShare(this.config);
                }else if(sogou){
                    sogouShare();
                }else{
                    getBrowserInfo()
                }
            } catch (e) {}
        };

        this.browserFlagObj = {
            browserFlag: qq==1 || qq==2 || wxb || baidu || sogou || uc ,
            weixinBrowser:wxb
        }
    }

    // 预加载 qq bridge
    loadqqApi(function () {
        qqBridgeLoaded = true;
    });

    // 预加载 jweixinjs
    loadJweixin();

    return mShare;

})(window.mShare || {});

