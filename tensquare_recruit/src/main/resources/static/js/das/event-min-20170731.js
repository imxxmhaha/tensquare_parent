var WssNet={defFlag:true,EventUtil:{addHandler:function(element,type,handler){if(element.addEventListener){element.addEventListener(type,handler,false)}else if(element.attachEvent){element.attachEvent("on"+type,handler)}else{element["on"+type]=handler}},getEvent:function(event){return event?event:window.event},getTarget:function(event){return event.target?event.target:event.srcElement}},CookieUtil:{c:"WSSNETID",s:"JSESSIONID",e:navigator.cookieEnabled,get:function(name){if(!this.e)return"";var ck=document.cookie;var cookieName=encodeURIComponent(name)+"=";var cookieStart=ck.indexOf(cookieName);var cookieValue="";if(cookieStart>-1){var cookieEnd=ck.indexOf(";",cookieStart);if(cookieEnd==-1){cookieEnd=ck.length}cookieValue=decodeURIComponent(ck.substring(cookieStart+cookieName.length,cookieEnd))}return cookieValue},set:function(name,value,expires){if(!this.e)return;var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);if(expires instanceof Date){cookieText+=";expires="+expires.toGMTString()}document.cookie=cookieText},unset:function(name){if(!this.e)return;this.set(name,"",new Date(0))},getSessId:function(){return this.get(this.s)||this.get(this.s.toLowerCase())},getCookId:function(){var cookId='';try{var d=new Date();cookId=""+d.getFullYear()+d.getMonth()+d.getDate()+"-"+Math.floor(Math.random()*1000000)}catch(e){}return cookId},getRandomString:function(len){len=len||32;var chars='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';var maxPos=chars.length;var pwd='';for(i=0;i<len;i++){pwd+=chars.charAt(Math.floor(Math.random()*maxPos))}return pwd}},DomUtil:{gi:function(id){return document.getElementById(id)},gc:function(searchClass,node,tag){var classElements=new Array();if(node==null)node=document;if(tag==null)tag='*';var els=node.getElementsByTagName(tag);var elsLen=els.length;var pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for(i=0,j=0;i<elsLen;i++){if(pattern.test(els[i].className)){classElements[j]=els[i];j++}}return classElements},gt:function(node,tag){if(node==null)node=document;if(tag==null)tag='*';var els=node.getElementsByTagName(tag);return els},fix:function(u){if(/\/$/.test(u))return u+="index.jsp";return u}},Client:{params:new Array(),urlArgs:new Array(),seriesActionUrl:new Array(),getParams:function(){return this.params.slice(0)},Const:{track_web_url:"http://caiji.wxcs.cn"},getDefPara:function(){var para=this.params.slice(0);var flag=false;var ret={para:para,flag:flag};return ret},getClkPara:function(event,def){var el=WssNet.EventUtil.getTarget(event);var de=document.documentElement;var clickParam=this.getParams();var x=event.clientX,y=event.clientY;var scrollx=window.pageXOffset||de.scrollLeft;var scrolly=window.pageYOffset||de.scrollTop;x+=scrollx,y+=scrolly;return clickParam},getEleName:function(o){var t=o.tagName.toUpperCase();var i=0;try{i=$(this).index();i=i>-1?i:0}catch(e){}if(t!='HTML'){t=t+'('+i+')';var p=o.parentElement||o.parentNode;t+='>'+arguments.callee(p)}return t},Init:function(){this.initUrlArgs();this.initCookie();this.initClient();this.onload()},initUrlArgs:function(){var search=location.search;if(search&&search.length>1){var search=search.substring(1);var items=search.split('&');for(var index=0;index<items.length;index++){if(!items[index]){continue}var kv=items[index].split('=');this.urlArgs[kv[0]]=typeof kv[1]==="undefined"?"":kv[1]}}},initCookie:function(){var cu=WssNet.CookieUtil;var ct=this.Const},initExtClk:function(){var it=WssNet.DomUtil.gc("wss_click");if(it&&it.length>0){var vl="";for(var i=0,j=it.length;i<j;i++){vl=it[i];WssNet.EventUtil.addHandler(vl,"click",function(event){var param=WssNet.Client.getClkPara(event);var flag=false;var clitems=WssNet.DomUtil.gc("wss_trick");var val="";for(var m=0,n=clitems.length;m<n;m++){var item=clitems[m];var nm=item.type;var nd=item.id;var key="ww_"+item.id+"^"+item.type;switch(nm){case"checkbox":if(item.checked){val=val?val+","+item.value:item.value}break;case"radio":if(item.checked){val=item.value}break;default:val=item.value}param.push(key+"="+val);flag=true}if(flag){WssNet.Sender("x",param)}})}}},initClient:function(){var _engine={ie:0,webkit:0,gecko:0,opera:0,khtml:0},_browser={se360:0,se:0,maxthon:0,qq:0,tt:0,theworld:0,cometbrowser:0,greenbrowser:0,ie:0,chrome:0,netscape:0,firefox:0,opera:0,safari:0,konq:0,uc:0},_platform={sys_name:navigator.platform.toLowerCase()},_system={win:false,mac:false,x11:false,android:false},_screen=screen.width+'x'+screen.height,ua=navigator.userAgent.toLowerCase(),up=_platform.sys_name,term_name='pc',mob=["ipad","iphone","android","midp","opera mobi","opera mini","blackberry","hp ipaq","iemobile","msiemobile","windows phone","symbian","windows ce","windowsce","smartphone","webos","palm","ucweb"];for(term in mob){if(ua.indexOf(mob[term])>-1){mob="0";break}}mob=(mob=='0'?'0':'1');if(mob=='0'){var agents=ua.split(";");if(agents!=null&&agents.length>4){var tn=agents[4].trim();if(tn.indexOf("build")!=-1){tn=tn.substring(0,tn.indexOf("build")).trim()}else{tn="u"}term_name=tn}}_system.win=up.indexOf("win")==0;_system.mac=(up.indexOf("mac")==0||ua.indexOf("mac")>0)?"mac":false;_system.x11=(up.indexOf("linux")==0||up=="x11")?"linux":false;_system.android=ua.indexOf("android")>-1?"android":false;if(_system.win){var prefix="windows ";if(/win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){if(RegExp["$1"]=="nt"){switch(RegExp["$2"]){case"5.0":_system.win=prefix+"2000";break;case"5.1":_system.win=prefix+"xp";break;case"6.0":_system.win=prefix+"vista";break;case"6.1":_system.win=prefix+"7";break;default:_system.win=prefix+"nt";break}}else if(RegExp["$1"]=="9x"){_system.win=prefix+"me"}else{_system.win=prefix+RegExp["$1"]}}}for(var type in _engine){if(typeof type==='string'){var regexp='gecko'===type?/rv:([\w.]+)/:RegExp(type+'[ \\/]([\\w.]+)');if(regexp.test(ua)){_engine.version=window.opera?window.opera.version():RegExp.$1;_engine[type]=parseFloat(_engine.version);_engine.type=type;break}}}for(var type in _browser){if(typeof type==='string'){var regexp=null;switch(type){case"se360":regexp=/360se(?:[ \/]([\w.]+))?/;break;case"se":regexp=/se ([\w.]+)/;break;case"qq":regexp=/qqbrowser\/([\w.]+)/;break;case"tt":regexp=/tencenttraveler ([\w.]+)/;break;case"safari":regexp=/version\/([\w.]+)/;break;case"konq":regexp=/konqueror\/([\w.]+)/;break;case"netscape":regexp=/navigator\/([\w.]+)/;break;default:regexp=RegExp(type+'(?:[ \\/]([\\w.]+))?')}if(regexp.test(ua)){_browser.version=window.opera?window.opera.version():RegExp.$1?RegExp.$1:'';_browser[type]=parseFloat(_browser.version);_browser.type=type;break}}}var pa=this.params;var cu=WssNet.CookieUtil;var du=WssNet.DomUtil;var urlArgsArray=this.urlArgs;var s_id=cu.get("DWRSESSIONID");$.cookie("sc_id",s_id);if(s_id==""){s_id=cu.get("sc_id")||'';if(s_id==""){s_id=cu.getRandomString(32);$.cookie("sc_id",s_id)}}var ck_id=urlArgsArray['ck_id']||'';var ctime=new Date().getTime();if(ck_id==""){ck_id=cu.get("ck_id")}if(ck_id==""){ck_id=s_id+ctime||'';$.cookie("ck_id",ck_id,{expires:3560})}var zmonky=cu.get("zmonky")||'';if(zmonky==""){$.cookie("zmonky",s_id,{expires:3560});$.cookie("zmonkyt",ctime,{expires:3560})}if(window.localStorage){var ls_id=window.localStorage.getItem("ls_id")||'';if(!ls_id||ls_id==""){window.localStorage.setItem("ls_id",ck_id)}}if(window.localStorage){pa.push("ls_id="+window.localStorage.getItem("ls_id")||'')}pa.push("c_id="+ck_id);pa.push("s_id="+s_id);var he_life_account=cu.get("he_life_account")||'';if(!he_life_account||he_life_account==""){if(window.localStorage){he_life_account=window.localStorage.getItem("he_life_account")||''}}pa.push("account="+he_life_account);var area_id=cu.get("areaID")||'';if(area_id==""){area_id=cu.get("areaCode")||'';if(area_id==""){area_id=urlArgsArray['areacode']}}pa.push("area_id="+area_id);var he_life_mobile_num=cu.get("he_life_mobile_num")||'';if(!he_life_mobile_num||he_life_mobile_num==""){if(window.localStorage){he_life_mobile_num=window.localStorage.getItem("he_life_mobile_num")||''}}$.cookie("he_life_mobile_num",he_life_mobile_num,{expires:3560});pa.push("mobile="+he_life_mobile_num);pa.push("ip_addr="+cu.get("ip"));var spec=cu.get("areaFullSpell")||'';if(spec==""){var lochref=location.href;var spec=lochref.substring(0,lochref.indexOf(".wxcs"));if(spec.indexOf('http://')==0){spec=spec.substr(7,spec.length)}if(spec.indexOf('https://')==0){spec=spec.substr(8,spec.length)}}pa.push("area_full_spell="+spec);pa.push("visit_url="+du.fix(escape(escape(location.href))));pa.push("source_url="+du.fix(escape(escape(document.referrer))));pa.push("user_id="+cu.get("he_life_user_id"));pa.push("user_code="+cu.get("user_code"));pa.push("portal_type="+cu.get("portalType"));pa.push("screen_size="+_screen);pa.push("os="+(_system.win||_system.mac||_system.x11||_system.android));pa.push("terminal_type="+mob);pa.push("terminal_name="+term_name);pa.push("browser="+_browser.type+" "+_browser.version);pa.push("attributarea="+cu.get("he_life_region_id"));pa.push("account_type_tag="+cu.get("account_type_tag"));pa.push("tc_account="+cu.get("tc_account"));$.cookie("os",(_system.win||_system.mac||_system.x11||_system.android));$.cookie("screen_size",_screen);$.cookie("terminal_type",term_name);$.cookie("browser",_browser.type+" "+_browser.version)},initSwb:function(){var _s="",_l=document.embeds.length;for(var i=0;i<_l;i++){var em=document.embeds[i];var _id=em.id;_s+="function "+_id+"_DoFSCommand(command, args) {if(command==\"callJavascript\") {arg = args.split(\"#\");saveswf.save('"+_id+"',arg[0],'','c');}} ";if(navigator.appName&&navigator.appName.indexOf("Microsoft")!=-1&&navigator.userAgent.indexOf("Windows")!=-1&&navigator.userAgent.indexOf("Windows 3.1")==-1){var h=new Array();h.push('<script language=\"VBScript\"\>\n');h.push('On Error Resume Next\n');h.push('Sub '+_id+'_FSCommand(ByVal command, ByVal args)\n');h.push('	Call '+_id+'_DoFSCommand(command, args)\n');h.push('End Sub\n');h.push('</script\>\n');document.write(h.join(""))}}if(_l>0){var script=document.createElement('script');script.innerHTML=_s;document.getElementsByTagName('head')[0].appendChild(script)}},initOutClk:function(){for(var i=0,j=document.links.length;i<j;i++){var link=document.links[i];if(link.host!=location.host){var u=link.href.toLowerCase();if(u.indexOf('script')>=0)return;WssNet.EventUtil.addHandler(link,"click",function(event){var curURL=location.href;var goURL=link.href;var param=WssNet.Client.getClkPara(event);param.push("source_url="+escape(escape(curURL)));param.push("visit_url="+escape(escape(goURL)));WssNet.Sender("1",param)})}}},onload:function(inParams){if(/hotmap|heatmap/.test(document.referrer))return;var urlArgsArray=this.urlArgs;var pars=this.getParams();if(typeof(inParams)!='undefined'){pars=inParams}var cu=WssNet.CookieUtil;var img=$("#jt-appxq-tit-img-dd")||'';if(img!=""){var src=img.attr("src")||'';if(src!=""){var eventMap={"url":src};try{if(typeof(cl)!='undefined'){cl.recordHeadImg(eventMap)}}catch(e){}}}pars.push("columnid="+urlArgsArray['columnid']);var resourceid=urlArgsArray['resourceid']||urlArgsArray['resid'];if(typeof(resourceid)=="undefined"||""==resourceid){resourceid=urlArgsArray['rescode']||urlArgsArray['resCode'];if(typeof(resourceid)=="undefined"||""==resourceid){resourceid=cu.get("resourceid")||cu.get("resourceId")}}pars.push("resourceid="+resourceid);pars.push("res_type="+urlArgsArray['restype']);WssNet.Sender("0",pars)},recordOnHotSearch:function(inParam){var url=inParam.url;var params=this.getParams();var newParams=[];var du=WssNet.DomUtil;for(var i=0;i<params.length;i++){var value=params[i];if(value.indexOf('visit_url=')==0){value='visit_url='+du.fix(escape(escape(url)))}else if(value.indexOf('source_url=')==0){value='source_url='+du.fix(escape(escape(window.location.href)))}newParams.push(value)};WssNet.Sender("hotSearch",newParams)},recordHeadImg:function(inParam){var url=inParam.url;var params=this.getParams();var newParams=[];var du=WssNet.DomUtil;for(var i=0;i<params.length;i++){var value=params[i];if(value.indexOf('visit_url=')==0){value='visit_url='+du.fix(escape(escape(url)))}else if(value.indexOf('source_url=')==0){value='source_url='+du.fix(escape(escape(window.location.href)))}newParams.push(value)};WssNet.Sender("getImg",newParams)}},PageClk:function(event){var el=this.EventUtil.getTarget(event);if(event&&event.clientX){if(/wss_click|wss_trick|trk_tab|track/.test(el.className))return;if(el.tagName.toUpperCase()=='INPUT')return;var clickParam=this.Client.getClkPara(event);this.Sender("c",clickParam)}},Sender:function(f,param,imgOnErrorEvent){var q=encodeURI(param.join("&"));q=q.replace(new RegExp("undefined|null","gm"),"");var url=WssNet.Client.Const.track_web_url+"/das/tr.js?f="+f+"&"+q+"&random="+WssNet.CookieUtil.getRandomString(32)+"&";var iswxcs=location.href.indexOf(".wxcs");if(iswxcs>=0){if(f=='hotSearch'||f=='0'){this.SenderTo(f,url,imgOnErrorEvent)}}else{if(f=='0'||f=='hotSearch'||f=='getImg'){this.SenderTo(f,url,imgOnErrorEvent)}}},SenderTo:function(f,url,imgOnErrorEvent){var img=new Image();try{img.onerror=function(a){if(typeof(imgOnErrorEvent)=='function'){imgOnErrorEvent.call(this,[a])}}}catch(e){}img.src=url}};var eu=WssNet.EventUtil;var cl=WssNet.Client;setTimeout(function(){cl.initOutClk();cl.initExtClk();cl.initSwb();eu.addHandler(window.document,"click",function(event){WssNet.PageClk(eu.getEvent(event))})},500);cl.Init();