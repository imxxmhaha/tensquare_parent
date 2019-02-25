(function() {
  var t = '.pop-layer{position:absolute;width:100%;height:100%;background-color:black;opacity:.5;top:0;left:0;z-index:999;}.pop-layer{display:none;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0.4);top:45px;left:0;z-index:98;}.pop-window{font-family: "\\5FAE\\8F6F\\96C5\\9ED1","΢���ź�",helvetica,arial;background-color:white;border:1px solid white;-webkit-border-radius:5px;position:absolute;top:20%;left:50%;margin-left:-45%;min-width:288px;width:90%;z-index:1000;}.pop-window a{text-decoration: none;}.pop-window .pop-title{background-color:#eaeaea;-webkit-background-clip:content-box;border-bottom:1px solid #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;height:42px;line-height:42px;padding:1px;position:relative;text-align:center;}.pop-window .pop-title h3{margin:0;color:#888;font-size:14px;position:relative;}.pop-window .share-tit::before{content:"";display:inline-block;height:20px;width:20px;vertical-align:-4px;}.pop-window .for-mb::before{background-position:-186px -140px;}.pop-window .for-sina::before{background-position:-239px -140px;margin-right:4px;}.pop-window .for-qz::before{background-position:-213px -140px;}.pop-window .for-qq::before{background-position:-270px -140px;}.pop-window .pop-title .btn{position:absolute;top:8px;}.pop-window .btn{background:-webkit-gradient(linear,left top,left bottom,from(#95acc5),to(#7992af));border:1px solid #7992af;-webkit-border-radius:2px;color:white;display:inline-block;height:26px;line-height:26px;padding:0 10px;-webkit-box-shadow:0 1px 0 white;font-size:14px;}.pop-window .pop-title .close-btn{left:8px;}.pop-window .pop-title .send-btn{background:#4083ce;border-color:#2f74c1;right:8px;}.pop-window .pop-cont .textarea{padding:8px;background:0;border:0 none;-webkit-border-radius:0;}.pop-window .pop-cont .textarea textarea{-webkit-appearance:caret;border:0 none;color:#010000;font-size:14px;padding:0;width:100%;height:124px;}.pop-window .wb-dialog-bar{border-top:1px solid #eee;color:#888;padding:12px 8px;position:relative;overflow:hidden;}.pop-window .wb-dialog-num{text-align:right;font-size:14px;}.pop-window .wb-dialog-num strong{color:black;margin:0 3px;}',
    n = !1;
    window.PopDialog = function(e) {
      this.defualtText = "���ڴ��������Ĺ۵�...", this.option = {
        btntxt: "����",
        html: null,
        cssText: e ? e.cssText : t,
        content: "���ڴ��������Ĺ۵�...",
        postFunc: null,
        maxTextNum: 100,
        top: 0,
        left: "50%"
      }
    };

  PopDialog.prototype = {
    _init: function() {
      n = !0;
      var t = this;
      t._setId();
      var PopDialog = "<style>" + this.option.cssText + '</style><div id="div_xll_pop_layer' + this.id + '" class="pop-layer" style="display:none;"></div>';
      $("body").append(PopDialog);
      var r = '<div class="pop-window" id="pop-window' + this.id + '" style="display:none;"><div class="pop-title"><a href="javascript:void(0);" class="btn close-btn" style="z-index:1;">�ر�</a><span class="title"><%=html%></span><a href="javascript:void(0);" class="btn send-btn"><%=btntxt%></a></div><div class="pop-cont">   <div class="textarea">       <textarea>' + this.defualtText + '</textarea>   </div>   <div class="wb-dialog-bar">       <div class="wb-dialog-num">��ʣ<strong class="lastnum"><%=lastNum%></strong>��</div>   </div></div>';
      $("body").append(r), $("#pop-window" + t.id).delegate(".close-btn", "click", function() {
        t.hide()
      }).delegate(".send-btn", "click", function() {
        return "" == t._trim(t.getValue()) ? void alert("����������") : void t.option.postFunc()
      }).delegate("textarea", "click", function() {
        t._trim(t.getValue()) == t.defualtText && $(this).val("")
      }).delegate("textarea", "keyup", function() {
        t._showLast()
      })
    },
    _trim: function(e) {
      var t = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
      return(e || "").replace(t, "")
    },
    _setId: function() {
      this.id = $(".pop-window").length
    },
    _showLast: function() {
      $("#pop-window" + this.id + " .lastnum").text(this.option.maxTextNum - this._tStrLength(this.getValue()))
    },
    show: function(t) {
      !n && this._init(), $.extend(this.option, t), this._setPosition(), $("#pop-window" + this.id + " .send-btn").text(this.option.btntxt), $("#pop-window" + this.id + " .title").html(this.option.html), $("#pop-window" + this.id + " textarea").text(this.option.content), this._showLast(), $("#pop-window" + this.id).show(), $("#div_xll_pop_layer" + this.id).show(), $("#div_xll_pop_layer" + this.id).css({
        outline: "1px solid rgba(0, 0, 0, 0)"
      })
    },
    _tStrLength: function(e) {
      var t, n = 0;
      for(t = e.length; t--; 0) n += e.charCodeAt(t) > 128 ? 1 : .5;
      return Math.ceil(n)
    },
    hide: function() {
      !n && this._init(), $("#div_xll_pop_layer" + this.id).hide(), $("#pop-window" + this.id).hide(), /ucbrowser/i.test(navigator.userAgent) && $("#video-control").css("visibility", "visible"), / uc /i.test(navigator.userAgent) && $("#video-control").show()
    },
    _emptyText: function() {
      $("#pop-window" + this.id).find("textarea").val("")
    },
    destroy: function() {
      !n && this._init(), $("#pop-window" + this.id).undelegate(".close-btn", "click").undelegate(".send-btn", "click").undelegate("textarea", "click")
    },
    getValue: function() {
      !n && this._init();
      var t = $("#pop-window" + this.id).find("textarea"),
        PopDialog = this._trim(t.val()),
        r = PopDialog.length;
      if(this._tStrLength(PopDialog) > this.option.maxTextNum) {
        for(var i = "", a = 0, s = 0; r > a; a++) {
          var l = PopDialog.charAt(a);
          if(s += /[\x00-\xff]/.test(l) ? .5 : 1, !(Math.ceil(s) <= this.option.maxTextNum)) break;
          i += l
        }
        PopDialog = i, t.val(PopDialog)
      }
      return PopDialog
    },
    _setPosition: function() {
      $("#pop-window" + this.id).css("top", this.option.top).css("left", this.option.left)
    }
  }
  window.is_output_mod_log && console.log("popDialog of module is loaded.");
})()