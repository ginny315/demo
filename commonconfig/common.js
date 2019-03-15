define(['host','zepto','template'],function(host,$,template) {
    var exports = {
        init:function (){

        },
        setLocal: function (data) {
            localStorage.setItem(data.key, JSON.stringify(data.value));
            if(typeof(data.value)=='object'){
                window.localStorage.setItem(data.key, JSON.stringify(data.value));
            } else if(typeof(data.value)=='string'){
                window.localStorage.setItem(data.key, data.value);
            }
        },
        getLocal: function (key) {
            var val = window.localStorage.getItem(key) || "";
            if(val.search(/:/i)>0){
                val = JSON.parse(val);
            }
            return val;
        },
        setCookie: function (c_name, value, day) {
            day = day || 700;
            var now = new Date();
            if (day >= 1) {
                now.setDate(now.getDate() + day);
                now.setHours(0);
                now.setMinutes(0);
                now.setSeconds(0);
            } else {
                var h = Math.floor(24 * day);
                now.setDate(now.getDate());
                now.setHours(now.getHours() + h);
                now.setMinutes(now.getMinutes());
                now.setSeconds(now.getSeconds());
            }

            document.cookie = c_name + "=" + escape(value) + ";expires=" + now.toGMTString();
        },
        getCookie: function (name) {
            return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
        },
        getLocationParam: function () {
            var url = window.location.search;
            var params = url.toString().slice(1).split("&");
            var returnObject = {};
            for (var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
            }
            return returnObject;
        },
        commonAjax: function (url, data, callback) {
            var self = this;
            var publicData = {
                access_token: '',
                app_version: window.version.split('.').join(''),
                channel: '1',
                meid: '1',
                p_version: window.version,
                phone_model: 'html5',
                system: 'html5',
                system_version: '7.0'
            };
            $.extend(data, publicData);
            $.ajax({
                url: window.debug != true ? (host.api + url) : ('data/' + url + '.json'),
                data: data,
                type: 'post',
                success: function (response) {
                    response = window.debug == true ? response : JSON.parse(response);
                    if (response.ret == 1) {
                        self.doCallback(callback, response)
                    } else {
                        self.msgShowDelay(response.msg,3)
                    }
                },
                error:function () {
                    self.msgShowDelay('网络异常,请稍后重试',3)
                }
            })
        },
        msgShow:function (msg) {
            var $dom = $(".message"),body = $("body");
            var source = '<div class="message">{{ main }}</div>';
            var render = template.compile(source);
            var html = render({
                main:msg
            });
            if($dom.get().length > 0){
                $dom.remove();
            }
            body.append(html);
            var msgMain = body.find(".message");
            if(!msgMain.hasClass('active')){
                msgMain.addClass("active");
            }
        },
        msgShowDelay:function (msg,time) {
            this.msgShow(msg);
            setTimeout(function () {
                $("body").find(".message").removeClass("active");
            },time*1000)
        },
        doCallback: function (callback, response) {
            if (!callback) return;
            var callbackFunc = callback.func,
                callbackContext = callback.context;
            callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        isAndroid: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
    }
    return exports;
})