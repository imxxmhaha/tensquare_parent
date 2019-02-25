var _bLoadedWxJs = false;

var l = window.navigator.userAgent, u = "//jsapi.qq.com/get?api=app.setShareInfo,app.share",
        c = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152",
        d = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349",
        p = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone",
        f = "mqqapi://share/to_fri?src_type=web&version=1&file_type=news&";
/*var h = "https://api.weibo.com/oauth2/authorize?client_id=791268966&redirect_uri=http%3A%2F%2Finfoapp.3g.qq.com%2Fg%2Fapp_include%2Ftouch%2FshareSinaWbCallback.jsp%3Fdisplay%3Dmobile%26state%3D";*/
var h = "http://service.weibo.com/share/mobile.php?";
var m = "http://infoapp.3g.qq.com/g/app_include/share/ShareTencentAction.jsp",
        g = "http://infoapp.3g.qq.com/g/app_include/share/ShareSinaAction.jsp",
        v = "http://3gimg.qq.com/wap30/img/touch/icon.png", y = ".3g.qq.com", _ = "info_share_sina_token",
        b = "infosharewbcbparams_", w = "mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1&",
        x = "//3gimg.qq.com/wap30/common/qrcode.min_v3.js",
        E = "mqqapi://share/to_fri?file_type=news&src_type=app&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&";
//var urlWxjs = "http://res.wx.qq.com/open/js/jweixin-1.2.0.js";
var urlWxjs = "http://wap.monternet.com/nmpfs/media/p/pubAttachment/20170621/132/134/10035/14169441.js";

var T = {
            shareSuc: "分享成功",
            shareFail: "分享失败",
            submitSame: "请不要提交相同的内容",
            noLogin: "您还没有登录",
            noTxWb: "您还没有开通腾讯微博",
            sinaAuthFail: "新浪微博授权失败",
            submitBtnName: "发表"
        },
        C = {
            wxShareTip: ['<div style="position:fixed; top:0; right:0; z-index:1000; display:none;">', '<img src="http://3gimg.qq.com/wap30/infoapp/touch/wx_choice/images/weixin_share_layer_bg.png" style="width:250px;">', "</div>"].join(""),
            qqShareTip: ['<div style="display:none; position:fixed; top:0; left:0; z-index:1000; width:100%; height:100%; background: rgba(0,0,0,0.7);">', '<img src="http://3gimg.qq.com/wap30/infoapp/touch/todaynews/images/weixin_share_mask_bg.png" style="position:absolute; right:0; top:0; width:200px;">', "</div>"].join(""),
            postTxWbTitle: '<h3 class="share-tit for-mb">腾讯微博</h3>',
            postSinaWbTitle: '<h3 class="share-tit for-sina">新浪微博</h3>'
        },
        k = {
            isFromAndroid: /android/gi.test(l),
            isFromIos: /iphone|ipod|ios/gi.test(l),
            isFromWx: /MicroMessenger/gi.test(l),
            isFromQQ: /mobile.*qq/gi.test(l),
            isFromUC: /ucbrowser/gi.test(l),
            isFromQQBrower: /mqqbrowser[^LightApp]/gi.test(l),
            isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(l),
            isFromSafari: /Safari/gi.test(l),
            getScript: function(e, t, n){
                var o = document.createElement("script");
                n = n || "utf-8", o.type = "text/javascript", o.charset = n, o.onload = o.onreadystatechange = function(){
                    this.readyState && "loaded"!=this.readyState && "complete"!=this.readyState || (t && t(), o.onload = o.onreadystatechange = null, o.parentNode.removeChild(o))
                }, o.src = e, document.getElementsByTagName("head")[0].appendChild(o)
            },
            getUrlParam: function(e){
                var t, n, o, e = e || location.search.slice(1), r = [], i = {}, a = decodeURIComponent;
                for(r = e.split("&"), t = r.length; t--;) n = r[t], o = n.split("="), i[a(o[0])] = a(o[1]);
                return i
            },
            htmlDecode: function(e){
                return e = e.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
            }
        },
        /*
         *@ Share - 分享
         * @params t {Object} 分享信息
         * @params bGlobalInfo{boolean} 是否从全局里获取分享信息，这样便能在调用接口后改变分享信息
         * @use: overlay1.showTip2(false, '<div class="overlay" id="overlay1"><div class="n"></div></div>', '#overlay1', 300, 5000, 300, true, null, ".mymain")
         * @use: overlay2.showTip2(true, null, null, 300, 5000, 300, false, "网络错误", ".mymain")
         */
        Share = function(t, bGlobalInfo){
            this.defaultConfig = {
                title: document.title,
                description: document.title,
                img: v,
                url: location.href,
                state: "index5_show",
                ifMap: {wx: "", sinaWb: "", txWb: "", qzone: "", qq: ""}
            },
                    this.config = $.extend({}, this.defaultConfig, t || {}),
                    this.config.title = k.htmlDecode(this.config.title),
                    this.config.description = k.htmlDecode(this.config.description),
                    this.shareUrlMap = {},
                    //this.sinaOauthUrl = h+this.config.state,
                    this.sinaOauthUrl = h,
                    this.init.call(this)
        };

var gF
var addParamIndex = 0;

$.extend(Share.prototype, {
    init: function(){
        this._setShareUrlIf();
        this._loadQbWxShareUrl();
        // this._initPostPop();
        this._initShareSinaWb();
        this._initEvent();
        this._initWxshareSet();
        this._initMobileQQShareSet();
        this._setQbShareInfo();
    },
    _setShareUrlIf: function(){
        function e(e){
            var t = n;
            return -1==i[0].indexOf("g_f=") && (t = i[0]+a+"g_f="+o[e]+s), t
        }

        this._filterShareUrlLogPara();
        var t = this.config, n = t.url, o = t.ifMap, r = this.shareUrlMap, i = n.split("#"),
                a = i[0].indexOf("?")>0 ? "&" : "?", s = i[1] ? "#"+i[1] : "";
        r.wx = o.wx ? e("wx") : n, r.sinaWb = o.sinaWb ? e("sinaWb") : n, r.txWb = o.txWb ? e("txWb") : n, r.qzone = o.qzone ? e("qzone") : n, r.oriQQ = o.qq ? e("qq") : n, r.qq = this._base64EncodeQQUrl(r.oriQQ)
    },
    _loadQbWxShareUrl: function(){
        {
            var e = this;
            this.config
        }
        k.isFromQQBrower && "undefined"== typeof browser ? k.getScript(u, function(){
            e.otherWxShare()
        }) : e.otherWxShare()
    },
    _setQbShareInfo: function(){
        function e(){
            browser.app.setShareInfo({
                title: t.title,
                url: t.url,
                description: t.description,
                img_url: t.img
            })
        }

        var t = this.config;
        k.isFromQQBrower && (window.browser && browser.app && browser.app.setShareInfo ? e() : k.getScript(u, function(){
            window.browser && browser.app && browser.app.setShareInfo && e()
        }))
    },
    _initEvent: function(){
        var t = this, n = this.config, o = 0, r = 0;
        $(document.body).delegate(".ic-share", "touchstart", function(e){
            var t = e.touches[0];
            o = t.clientX, r = t.clientY
        });
        $(document.body).delegate(".ic-share", "touchend", function(i){
            var a = $(i.currentTarget), l = a.data("share"), u = "other", c = event.changedTouches[0];
            if(Math.abs(c.clientX-o)<2 && Math.abs(c.clientY-r)<2){
                console.log(l);
                console.log(t);
                /**
                 * weixin朋友圈：01
					weixin 好友：02
					qq : 03
					qqzone: 04
					weibo: 05
					feixin:06
                 */
                var invite_type='01';
                if(l=='share-wx-timeline'){
                	invite_type='01';
                }else if(l=='share-wx-friend'){
                	invite_type='02';
                }else if(l=='share-qq'){
                	invite_type='03';
                }else if(l=='share-qzone'){
                	invite_type='04';
                }else if(l=='share-sina-wb'){
                	invite_type='05';
                }
                
                if(t.config.code=='register_invite'){
                	//新增注册邀请日志
                    $.ajax({
                    	type: 'POST',
    					url: '/share/addInviteLog',
    					data: {invite_type:invite_type},
    					dataType: 'json',
    					success: function(data) { //请求成功时执行
    						if(data.returnCode == "001000") {
    							if(addParamIndex == 0) {
    								addParamIndex++;
    					           	t.config.url += (t.config.url.indexOf('icode=') <0 ? '?icode=' + data.data : '');
    					           	t.shareUrlMap.oriQQ += (t.shareUrlMap.oriQQ.indexOf('icode=') <0 ? '?icode=' + data.data : '');
    						        t.shareUrlMap.qq += (t.shareUrlMap.qq.indexOf('icode=') <0 ? '&icode=' + data.data : '');
    						        t.shareUrlMap.qzone += (t.shareUrlMap.qzone.indexOf('icode=') <0 ? '?icode=' + data.data : '');
    						        t.shareUrlMap.sinaWb += (t.shareUrlMap.sinaWb.indexOf('icode=')<0 ? '?icode=' + data.data : '');
    						        t.shareUrlMap.txWb += (t.shareUrlMap.txWb.indexOf('icode=') <0 ? '?icode=' + data.data : '');
    						        t.shareUrlMap.wx += (t.shareUrlMap.wx.indexOf('icode=') <0 ? '?icode=' + data.data : '');
    					        }
    					    }
    						todo();
    					 },
    					 error: function(data) { //请求错误时执行
    						todo();
    					 }
    				});
                } else if(t.config.code=='share_app'){
                	// 分享应用
                	shareApp();
                } 
						    
                function todo(){
                	switch(l){
                    case"share-wx-friend":
                        t.shareWxFriend(), gF = n.ifMap.wx ? n.ifMap.wx : u;
                        break;
                    case"share-wx-timeline":
                        t.shareWxTimeLine(), gF = n.ifMap.wx ? n.ifMap.wx : u;
                        break;
                    case"share-qzone":
                        t.shareQzone(), gF = n.ifMap.qzone ? n.ifMap.qzone : u;
                        break;
                    case"share-qq":
                        t.shareQQ(), gF = n.ifMap.qq ? n.ifMap.qq : u;
                        break;
                    case"share-sina-wb":
                        t.shareSinaWb(), gF = n.ifMap.sinaWb ? n.ifMap.sinaWb : u;
                        break;
                    case"share-tx-wb":
                        t.shareTxWb(), gF = n.ifMap.txWb ? n.ifMap.txWb : u;
                        break;
                    case"share-qrcode":
                        gF = u, t.generateQr("#qrcode-area")
                	}
                }
                // $.fn.trigger(t, "afterClickShareBtn", [{shareType: l}]);
                //ww:注释
                //Log.ckUserSend("user_action", "shareClick,"+gF);
            }
        });
    },
    //ww:生成二维码
    generateQr: function(e){
        function t(){
            /*n.qrcodeIns || (n.qrcodeIns = new QRCode(e, {
             width: 125,
             height: 125
             }), n.qrcodeIns.makeCode(n.config.url))*/

            if(!n.qrcodeIns){
                n.qrcodeIns = new QRCode(e, {
                    width: 125,
                    height: 125
                });
                n.qrcodeIns.makeCode(n.config.url);
            }
        }

        var n = this;
        e = "string"== typeof e ? document.querySelector(e) : e;
        if(window.QRCode){
            t()
        }
        else{
            k.getScript(x, function(){
                t()
            });
        }

    },
    _initWxshareSet: function(){
        var e = this.config;
        WxshareSet.set({
            title: e.title,
            desc: e.description,
            img_url: e.img,
            link: this.shareUrlMap.wx
        })

    },
    _initMobileQQShareSet: function(){
        function e(){
            mqq.data.setShareInfo({
                share_url: t.shareUrlMap.oriQQ,
                title: n.title,
                desc: n.description,
                image_url: n.img
            })
        }

        var t = this, n = this.config;
        k.isFromQQ && (window.mqq && mqq.data && mqq.data.setShareInfo ? e() : k.getScript(c, function(){
            e()
        }))
    },
    _filterShareUrlLogPara: function(){
        var t = this.config.url, n = k.getUrlParam(t), o = n.g_f;
        if(this.config.url = t = t.replace(/([?&])sid=[^&#]*/g, "$1rsid=1").replace(/([?&])i_f=[^&#]*/g, "$1rif=1").replace(/([?&])iarea=[^&#]*/g, "$1rarea=1").replace(/([?&])f_l=[^&#]*/g, "$1rfl=1").replace(/([?&])f_pid=[^&#]*/g, "$1rfpid=1").replace(/([?&])f_aid=[^&#]*/g, "$1rfaid=1").replace(/([?&])f_aid_ext=[^&#]*/g, "$1rfaide=1"), this.config.url = t = t.replace(/oauth_state=0&/g, ""), !(o && [23830, 23916].indexOf(parseInt(o))> -1) && /g_f=/i.test(t)){
            var r = t.split("#"), i = r[1] ? "#"+r[1] : "", a = r[0].split("?"), s = [];
            if(a[1]){
                var l = a[1].split("&");
                $.each(l, function(e, t){
                    t.indexOf("g_f")<0 && s.push(t)
                })
            }
            this.config.url = a[0]+"?"+s.join("&")+i
        }
    },
    _postTxWb: function(){
        function t(t, n){
            $.fn.trigger(r, t, [{type: "tx", msg: n}])
        }

        function n(e){
            //Tips.showTip(e, !0, "error");
            t("wbShareFailure", e)
        }

        var r = this, i = this.config,
                s = [ "url="+encodeURIComponent(this.shareUrlMap.txWb), "picUrl="+encodeURIComponent(i.img)].join("&");
        $.ajax({
            url: m+"?callback=?&"+s, dataType: "jsonp", success: function(e){
                0==e.code ? (/*Tips.showTip(T.shareSuc, !0, !0),*/ /*a.hide(),*/ t("wbShareSuccess", T.shareSuc)) : n("-101"==e.code ? T.noLogin : "-107"==e.code ? T.noTxWb : T.shareFail)
            }, error: function(){
                n(T.shareFail)
            }
        })
    },
    _postSinaWb: function(){
        function n(t, n){
            $.fn.trigger(i, t, [{type: "sina", msg: n}])
        }

        function r(e){
            //Tips.showTip(e, !0, "error");
            n("wbShareFailure", e)
        }

        var i = this, a = this.config,  l = Cookie.get(_),
                u = ["url="+encodeURIComponent(this.shareUrlMap.sinaWb), "picurl="+encodeURIComponent(a.img), "token="+l].join("&");
        $.ajax({
            url: g+"/g/s?callback=?&"+u, dataType: "jsonp", success: function(e){
                null==e.error_code ? (/*s.hide(),*/ /*Tips.showTip(T.shareSuc, !0),*/ n("wbShareSuccess", T.shareSuc)) : r("20019"==e.error_code ? T.submitSame : T.ShareFail)
            }, error: function(){
                r(T.ShareFail)
            }
        })
    },
    _initShareSinaWb: function(){
        try{
            var n = this, r = this.config, i = r.state, a = k.getUrlParam(), s = a.oauth_state, l = a.access_token;
            s && a.state && (0==s && i==a.state && l ? (Cookie.set(_, l, 1, y), Cookie.del(b+i, y), $.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/oauth_state=0&/g, ""))) : 0!=s /*&& Tips.showTip(T.sinaAuthFail, !0, !0)*/)
        }catch(u){
            console.error(u.message)
        }
    },
    _base64EncodeQQUrl: function(e){
        var t = this.config,
                n = f+["share_id=1101685683", "title="+Base64.encode(t.title), "thirdAppDisplayName="+Base64.encode("手机腾讯网"), "url="+Base64.encode(e)].join("&");
        return n
    },
    _shareWebQzone: function(){
        console.log('_shareWebQzone')
        var e = this.config, t = encodeURIComponent(this.shareUrlMap.qzone), n = e.description.substring(0, 200),
                o = ["title="+encodeURIComponent(e.title), "imageUrl="+encodeURIComponent(e.img), "desc="+encodeURIComponent(n), "summary="+encodeURIComponent(n), "url="+t, "successUrl="+t, "failUrl="+t, "callbackUrl="+t].join("&");
        window.location.href = p+"&"+o
    },
    shareTip: function(t){
        var n = this, o = $("body");
        "qqwebview"==t ? (this.shareTipMask || (this.shareTipMask = $(C.qqShareTip), o.append(this.shareTipMask)), this.shareTipMask.show(), setTimeout(function(){
            n.shareTipMask.hide()
        }, 3e3)) : (this.shareTipMask || (this.shareTipMask = $(C.wxShareTip), o.append(this.shareTipMask)), this.shareTipMask.show(), setTimeout(function(){
            n.shareTipMask.hide()
        }, 3e3))
    },
    isQbInstalled: function(e){
        e = e || {};
        var t = e.testUrl || location.href, onSucc = e.onSucc, onFail = e.onFail, r = Date.now(), i = 0,
                a = navigator.userAgent, s = 0, l = a.match(/iphone\s*os\s*\d\d?/gi);
        l && (s = parseInt(l[0].split(" ")[2])), t = "mttbrowser://url="+t.replace(/http:\/\//gi, "");
        //  ww:难点 为何这样就能分别跳转到onSucc和onFail
        var u = function(){
            /*r += 1e3, i += 1, 3>i ? setTimeout(u, 1e3) : Math.abs(r-Date.now())>1e3 ? onSucc && onSucc() : onFail && onFail()*/

            r += 1e3;
            i += 1;
            if(3>i){
                setTimeout(u, 1e3)
            }else if(Math.abs(r-Date.now())>1e3){
                onSucc && onSucc()
            }else{
                onFail && onFail()
            }

        };
        if(s>8) location.href = t;else{
            /*var c = document.createElement("iframe");
             c.src = t, c.id = "qbInstallValidator_"+Date.now(), c.style.display = "none", document.body.appendChild(c), setTimeout(u, 1e3), setTimeout(function(){
             c && c.parentNode && c.parentNode.removeChild(c)
             }, 5e3)*/
            //ww
            /*var t = "mttbrowser://url=a.10086.cn:7080/pams2/l/s.do?j=l&p=8&c=14720&pLinkCode=gqyv9po&fromsharefriend=1";*/
            var c = document.createElement("iframe");
            c.src = t;
            c.id = "qbInstallValidator_"+Date.now();
            c.style.display = "none";
            document.body.appendChild(c);
            //ww: 下载QQ浏览器
            setTimeout(u, 1e3);
            setTimeout(function(){
                c && c.parentNode && c.parentNode.removeChild(c)
            }, 5e3);

        }
        return !1
    },
    setShareConfig: function(t){
        $.extend(this.config, t), this._setShareUrlIf(), this._initWxshareSet(), this._setQbShareInfo()
    },
    qbWxShare: function(t){
        console.log('qbWxShare')
        var n = this, o = this.config;
        console.log(o)

        window.browser && browser.app && browser.app.share && browser.app.share({
            title: o.title,
            description: o.description,
            url: n.shareUrlMap.wx,
            img_url: o.img,
            to_app: t
        }, function(o){
            console.log('ww?')
            console.log(o)
            // 1==o.code ? $.fn.trigger(n, "wxShareSuccess", [{type: t}]) : $.fn.trigger(n, "wxShareFailure", [{type: t}])
        })
    },
    ucWxShare: function(e){
        console.log('ucWxShare')
        console.log(this.config)
        var t = this.config, n = this.shareUrlMap.wx, o = {ios: "kWeixinFriend", android: "WechatTimeline"};
        1==e && (o.ios = "kWeixin", o.android = "WechatFriends"), k.isFromIos ? ucbrowser && ucbrowser.web_share(t.title, t.description, n, o.ios, "", "@移动梦网", "") : k.isFromAndroid && ucweb && ucweb.startRequest("shell.page_share", [t.title, t.description, n, o.android, "", "", ""])
    },
    //ww:微信内置浏览器
    myWxShare: function(e){
        var t = this.config;
        var n = this.shareUrlMap.wx;
        var o = {ios: "kWeixinFriend", android: "WechatTimeline"};
        1==e && (o.ios = "kWeixin", o.android = "WechatFriends");


        function afterGetScript(){
            $.ajax({
                url: "http://wap.monternet.com/p/remoting/wechat_share_ticket.jsonp?url="+encodeURIComponent(location.href),
                type: "get",
                async: false,
                dataType: 'jsonp',
                timeout: 5000,
                success: function(data){

                    /*$('body').append("<br>afterGetScript success: data.timestamp=" +data.timestamp+ "; data.signature=" +data.signature+ "; data.nonceStr=" +data.nonceStr+ "<br>");
                     $('body').append("<br>t.title=" +t.title+ "; t.url=" +t.url+ "; t.img=" +t.img+ "; t.url=" +t.url +"<br>");
                     */

                    try{
                        _bLoadedWxJs = true;
                        //console.log('data:');
                        //console.log(data);
                        wx.config({
                            debug: false,
                            timestamp: data.timestamp,
                            signature: data.signature,
                            nonceStr: data.nonceStr,
                            //  ww
                            // appId: Global.gShareInfo.appId,
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage'
                            ]
                        });
                        //$('body').append("<br>执行完config<br>");

                        //设置微信内容
                        wx.ready(function(){
                            //$('body').append("<br>进入ready<br>");
                            //朋友圈
                            wx.onMenuShareTimeline({
                                title: t.title, // 分享标题
                                link: t.url, // 分享链接
                                imgUrl: t.img, // 分享图标
                                success: function(){
                                    //alert('设置分享朋友圈内容成功');
                                },
                                cancel: function(){
                                    // 用户取消分享后执行的回调函数
                                    //alert('用户取消分享后执行的回调函数');
                                }
                            });
                            //朋友
                            wx.onMenuShareAppMessage({
                                title: t.title, // 分享标题
                                desc: t.description, // 分享描述
                                link: t.url, // 分享链接
                                imgUrl: t.img, // 分享图标
                                type: '', // 分享类型,music、video或link，不填默认为link
                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                success: function(){
                                    //alert('设置分享好友内容成功');
                                },
                                cancel: function(){
                                    // 用户取消分享后执行的回调函数
                                    //alert('用户取消分享后执行的回调函数');
                                }
                            });
                            //$('body').append("<br>ready的最后<br>");
                        });

                        //$('body').append("<br>ready外面<br>");


                    }
                    catch(e){
                        //alert(e);
                    }

                },
                error: function(){
                    //alert('微信分享公众号获取信息失败');
                    console.log('微信分享公众号获取信息失败');
                }
            });
        }


        k.getScript(urlWxjs, function(){
            /*$('body').append("<br>getScript success<br>");*/

            afterGetScript();


        });

    },
    otherWxShare: function(){
        var t = this, n = k.getUrlParam(), o = k.isFromQQBrower;
        n.fromsharefriend && 1==n.fromsharefriend && o ? ($.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/fromsharefriend=1/g, "")), setTimeout(function(){
            t.qbWxShare(1)
        }, 50)) : n.fromsharetimeline && 1==n.fromsharetimeline && o && ($.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/fromsharetimeline=1/g, "")), setTimeout(function(){
            t.qbWxShare(8)
        }, 50))
    },
    callWxShare: function(e){
        console.log('callWxShare')
        var t = (this.config, ""), n = this.config.url.split("#"), o = n[0].indexOf("?")>0 ? "&" : "?",
                r = n[1] ? "#"+n[1] : "", i = 1==e ? "fromsharefriend=1" : "fromsharetimeline=1";
        //t = n[0]+o+i+r;
        //360浏览器只要开个iframe，ifame的url中带&fromsharefriend=1或fromsharetimeline=1，就能调起360的微信分享接口，为了禁止这个功能，就不加i
        t = n[0]+o/*+i*/+r;
				
        if(k.isFromWx){
            /*return void this.shareTip("wxwebview")*/
            if(!_bLoadedWxJs){
                this.myWxShare(e)
            }
            this.shareTip("wxwebview");
            return void this.shareTip("wxwebview")
        }else if(k.isFromQQ){
            return void this.shareTip("qqwebview")
        }else if(k.isFromUC){
            return void this.ucWxShare(e)
        }else if(k.isFromQQBrower){
            return void this.qbWxShare(e)
        }else if(k.isFromQQBrowerLight){
            return void(location.href = d)
        }else{
            /*return void this.isQbInstalled({
                testUrl: t,
                onSucc: function(){
                },
                onFail: function(){
                    //  ww:下载QQ浏览器
                    //location.href = d
                }
            })*/
           
						if($("body").qrcode){
							var target =$("#Share-wx-target");
							if(target.length){
								$("#Share-wx-target").fadeIn();
							}else{
								$('body').append("<div id='Share-wx-target' style='position:fixed;width:100%;height:100%;top:0;left:0;z-index:9999;display:none'><div id='Share-wx-target-mark' style='position:absolute;width:100%;height:100%;left:0;top:0;background-color: #000000'></div><div id='Share-wx-target-qrcode' style='position:absolute;top:50%;left:50%;margin-left:-128px;margin-top:-128px;'></div></div>");
								$("#Share-wx-target-qrcode").qrcode(this.config.url);
								
								//获取网页中的canvas对象  
								var mycans=$('#Share-wx-target-qrcode canvas')[0];   
								//调用convertCanvasToImage函数将canvas转化为img形式   
								var img=convertCanvasToImage(mycans);
								img.style.width = '256px';
								img.style.height = '256px';
								$("#Share-wx-target-qrcode canvas").css("display",'none');
								//将img插入容器 
								$('#Share-wx-target-qrcode').append(img);
								$("#Share-wx-target").fadeIn();
							}
							
							$("#Share-wx-target-mark").off("click");
							$("#Share-wx-target-mark").click(function(){
								$("#Share-wx-target").fadeOut();
							})
							
							//从 canvas 提取图片 image  
							function convertCanvasToImage(canvas) {
								//新Image对象，可以理解为DOM  
								var image = new Image();  
								// canvas.toDataURL 返回的是一串Base64编码的URL
								// 指定格式 PNG  
								image.src = canvas.toDataURL("image/png");  
								return image;  
							}  
						}
        }
        /*return k.isFromWx ? void this.shareTip("wxwebview") : k.isFromQQ ? void this.shareTip("qqwebview") : k.isFromUC ? void this.ucWxShare(e) : k.isFromQQBrower ? void this.qbWxShare(e) : k.isFromQQBrowerLight ? void(location.href = d) : void this.isQbInstalled({
         testUrl: t,
         onSucc: function(){
         },
         onFail: function(){
         location.href = d
         }
         })*/
    },
    shareWxTimeLine: function(){
        this.callWxShare(8)
    },
    shareWxFriend: function(){
        this.callWxShare(1)
    },
    shareSinaWb: function(){
        var e = this, n = this.config, o = Cookie.get(_);

        if(0&&""!=o){
            window.scrollTo(0, 1)
        }else{
            Cookie.set(b+n.state, location.href, 1, y);
            window.location.href = this.sinaOauthUrl+'title='+n.title+'&url='+encodeURIComponent(n.url)+'&pic='+n.img;
        }


        //http://service.weibo.com/share/mobile.php?title=" + b.title + "&url=" + b.url + "&pic=" + b.img_url
        //http://service.weibo.com/share/mobile.php?title=%E5%9C%A8MM%E9%98%85%E8%AF%BB%E7%9C%8B%E5%88%B0%E4%B8%80%E6%9C%AC%E8%B6%85%E7%BA%A7%E7%B2%BE%E5%BD%A9%E7%9A%84%E4%B9%A6%EF%BC%8C%E6%98%AF%E5%8F%A4%E5%93%A5%E6%AC%A0%E5%86%99%E7%9A%84%E3%80%8A%E9%80%8F%E8%A7%86%E5%B0%8F%E7%A5%9E%E5%86%9C%E3%80%8B%EF%BC%8C%E5%86%99%E5%BE%97%E5%AE%9E%E5%9C%A8%E5%A4%AA%E5%A5%BD%E5%95%A6%EF%BC%8C%E5%BF%85%E9%A1%BB%E9%A1%B6%E9%A1%B6%E9%A1%B6%EF%BC%8C%E8%BD%AC%E7%BB%99%E4%BD%A0%E4%BB%AC%EF%BC%81%28%E5%88%86%E4%BA%AB%E8%87%AA+%40MM%E9%98%85%E8%AF%BB+%E7%9A%84%E5%BE%AE%E5%8D%9A%29%EF%BC%8C%E6%8E%A8%E8%8D%90%E4%BD%A0%E4%B9%9F%E6%9D%A5%E7%9C%8B%E4%B8%80%E4%B8%8B%E3%80%82&rt=%E5%9C%B0%E5%9D%80%3A&st=1498054498552&ru=http%3A%2F%2Fa.10086.cn%2Fpams2%2Fl%2Fs.do%3FmgId%3D450460979%26j%3Dl%26p%3D72%26c%3D14646%26src%3D5210213505&backurl=http%3A%2F%2Fa.10086.cn%2Fpams2%2Fl%2Fs.do%3FmgId%3D450460979%26j%3Dl%26p%3D72%26c%3D14646%26src%3D5210213505&url=http%3A%2F%2Fa.10086.cn%2Fpams2%2Fl%2Fs.do%3FmgId%3D450460979%26j%3Dl%26p%3D72%26c%3D14646%26src%3D5210213505
    }
    ,
    shareTxWb: function(){
        var e = this, t = this.config;
        //ww:注释
        /*Login.login(function(){
         window.scrollTo(0, 1), e.popIns.show({
         btntxt: T.submitBtnName, html: C.postTxWbTitle, postFunc: function(){
         e._postTxWb()
         }, content: t.title
         })
         })*/
    }
    ,
    shareQzone: function(){
        var goWebQzone = function(){
            var config = this.config
            var shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'
            var params = ["url="+encodeURIComponent(config.url), "title="+encodeURIComponent(config.title), "desc="+encodeURIComponent(config.description), "pics="+encodeURIComponent(config.img)].join("&")
            window.location.href = shareUrl+"?"+params
        }
        var e, t, n = this, o = this.config,
                r = (encodeURIComponent(this.shareUrlMap.qzone), o.description.substring(0, 200), Base64.encode(o.img)),
                i = Base64.encode(o.title), s = Base64.encode(o.description), l = Base64.encode(this.shareUrlMap.qzone),
                u = Base64.encode("手机腾讯网"),
                c = w+["image_url="+r, "title="+i, "description="+s, "url="+l, "app_name="+u].join("&");
        if(k.isFromIos) var c = E+["description="+s, "url="+l, "title="+i, "thirdAppDisplayName="+u, "previewimageUrl="+r].join("&");

        if(k.isFromQQBrower){
            return void this.callWxShare(3)
        }else if(k.isFromAndroid){
            return n._shareWebQzone()
        }
        else if(k.isFromQQBrowerLight){
            return n._shareWebQzone()
        }else if(k.isFromSafari){
            t = Date.now()
            location.href = c
            return void(e = setTimeout(function(){
                var e = Date.now()-t;
                1e3>e && n._shareWebQzone()
            }, 1e3))
        }else{
            return void goWebQzone.apply(this)
        }
    }
    ,
    shareQQ: function(){
        var goWebQQ = function(){
            var config = this.config
            // var shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html'
            var shareUrl = 'http://connect.qq.com/widget/shareqq/index.html'
            var params = ["url="+encodeURIComponent(config.url), "title="+encodeURIComponent(config.title), "desc="+encodeURIComponent(config.description), "pics="+encodeURIComponent(config.img)].join("&")
            window.location.href = shareUrl+"?"+params
        }
        var e = (this.config, this.shareUrlMap.qq), t = null;
        return k.isFromQQBrower ? void this.qbWxShare(4) : k.isFromQQBrowerLight ? void(location.href = d) : void(k.isFromAndroid && k.isFromUC && 0 ? (t = document.createElement("div"), t.style.visibility = "hidden", t.innerHTML = '<iframe src="'+e+'" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(t), setTimeout(function(){
            t && t.parentNode && t.parentNode.removeChild(t)
        }, 5e3)) : /*location.href = e*/goWebQQ.apply(this))
    }
})
