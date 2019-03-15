define(['jquery', 'fastclick', 'layer', 'host', 'wx'], function ($, fastclick, layer, host, wx) {
    //fastclick.attach(document.body);
    var common1 = {
        isWeixin: function () {
            var ua = navigator.userAgent.toLowerCase();
            return (/micromessenger/.test(ua)) ? true : false;
        },
        /**
         * 拼接参数
        */
        setParam: function (obj) {
            var str = [];
            for (var key in obj) {
                str.push(key + "=" + obj[key]);
            }
            return str.join("&");
        },
        /**
         * 验证手机号
        */
        checkPhone: function (phone) {
            var that = this;
            var reg = /^((1[3-9][0-9])+\d{8})$/;
            if (phone == '') {
                that.msgShow("手机号不能为空");
                return false;
            } else if (!reg.test(phone)) {
                that.msgShow("手机号格式错误");
                return false;
            } else {
                return true;
            }
        },
		/**
		 * 格式化手机号
		 * @param phone
		 * @returns {*|XML|void|string}
		 */
        formatPhone: function (phone) {
            return phone && phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        },
		/**
		 *  提示
		 * @param msg
		 * @param time
		 */
        msgShow: function (msg, time) {
            if (msg) {
                layer.open({
                    content: msg,
                    skin: 'msg',
                    time: 2 //2秒后自动关闭
                });
            }
        },
        /**
		 *  开始加载
		 * @param msg
		 * @param time
		 */
        loading: function (msg) {
            layer.open({
                type: 2,
                shadeClose: false,
                content: msg || '加载中'
            });
        },
		/**
		 * 结束加载
		 */
        endLoading: function () {
            layer.closeAll();
        },
		/**
		 * 设置sessionStorage数据
		 * 格式
		 * {key:'',value:''}
		 *
		 * @param data
		 */
        setSessionStorage: function (data) {
            if (typeof (data.value) == 'object') {
                window.sessionStorage.setItem(data.key, JSON.stringify(data.value));
            } else /*if (typeof(data.value) == 'string')*/ {
                window.sessionStorage.setItem(data.key, data.value);
            }
        },
		/**
		 * 设置sessionStorage数据
		 * @param key
		 * @returns {string}
		 */
        getSessionStorage: function (key) {
            var val = window.sessionStorage.getItem(key) || "";
            if (val.search(/:/i) > 0) {
                val = JSON.parse(val);
            }
            return val;
        },
		/**
		 * 获取url参数
		 * 使用方式：getLocationParam.key 这里的key是你参数名
		 * @returns {{}}
		 */
        getLocationParam: function (p) {
            var url = p ? p : window.location.search;
            var params = url.toString().slice(1).split("&");
            var returnObject = {};
            for (var i = 0; i != params.length; i++) {
                var index = params[i].indexOf("=");
                returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
            }
            return returnObject;
        },
		/**
		 * 格式化 参数
		 * @param url
		 * @returns {{}}
		 */
        getParam: function (url) {
            url = decodeURIComponent(url);
            var params = url ? url.toString().split("&") : [];
            var returnObject = {};

            for (var i = 0; i != params.length; i++) {
                var canshu = params[i].split("=");
                returnObject[canshu[0]] = canshu[1];
            }
            return returnObject;
        },
		getUrlCrop:function(url,w,h) {
			if (this.getParam(url)['x-oss-process']){
				return url
			}
			if(!w) w=320;
			if(!h) h=320;
			return url +'?x-oss-process=image/resize,w_'+w+',h_'+h+',limit_0,m_lfit'
		},
		/**
		 * 请求回调
		 * @param callback
		 * @param response
		 */
        doCallback: function (callback, response) {
            callback.func(response);
        },
		/**
		 * 公共请求
		 * @param url
		 * @param data
		 * @param callback
		 */
        commonAjax: function (url, data, callback) {
            var that = this;
            var resultUrl = '';
            var params = {};
            var defaults = {
                type: "post",
                jsonParam: false, //是不是用JSON字符串发送参数
                data: {},
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                async: true,
            };
            $.extend(defaults, data);
			// url = 'http://trial.xbpig.cn/' + url;
            defaults.data.f = that.getSessionStorage('f') || ''
            if (defaults.type == "get") {
                resultUrl = url + "?" + that.setParam(defaults.data);
                defaults.contentType = "application/json; charset=UTF-8";
            } else {
                resultUrl = url;
                params = defaults.data;
            }
            $.ajax({
                url: resultUrl,
                type: defaults.type,
                data: params,
                dataType: defaults.dataType,
                contentType: defaults.contentType,
                async: defaults.async,
                success: function (response) {
                    var res = response;
                    that.doCallback(callback, res);
                },
                statusCode: {
                    404: function () {
                        that.msgShow("接口找不到了");
                    }
                },
                error: function (e) {
					console.log(e)
                    that.msgShow("坏了出错了");
                }
            })
        },
        /**
         * 体验品产品列表
         */
        getProductList: function (data, callback) {
            var that = this;
            return that.commonAjax('api/product/list', data, callback);
        },
		/**
         * 体验品产品列表（全部渠道）
         */
		getProductALL: function (data, callback) {
			var that = this;
			return that.commonAjax('api/product/all', data, callback);
		},
        /**
         * 体验品详细接口
         */
        getProductDetail: function (data, callback) {
            var that = this;
            return that.commonAjax('api/product/detail', data, callback);
        },
        /**
         * 获取产品信息
         */
        getMiniDetail: function (data, callback) {
            var that = this;
            return that.commonAjax('api/product/miniDetail', data, callback);
        },
        /**
         * 提交申请体验
         */
        getReportRequest: function (data, callback) {
            var that = this;
            return that.commonAjax('api/request/report', data, callback);
        },
        /**
         * 申请预留信息
         */
        getObligate: function (data, callback) {
            var that = this;
            return that.commonAjax('api/request/obligate', data, callback);
        },
        /**
         * 获取短信验证码
         */
        getSms: function (data, callback) {
            var that = this;
            return that.commonAjax('api/request/sms', data, callback);
        },
        /**
         * 获取 图形二维码
         */
        getGraph: function (data, callback) {
            var that = this;
            return that.commonAjax('api/request/graph', data, callback);
        },
        /**
         * 体验品报告列表
         */
        getReportList: function (data, callback) {
            var that = this;
            return that.commonAjax('api/report/list', data, callback);
        },
        /**
         * 选择产品列表
         */
        getProductSelect: function (data, callback) {
            var that = this;
            return that.commonAjax('api/product/select', data, callback);
        },
        /**
         * 提交体验报告
         */
        getAddReport: function (data, callback) {
            var that = this;
            return that.commonAjax('api/report/add', data, callback);
        },
        /**
         * 上传图片
         */
        requestPic: function (data, callback) {
            var that = this;
            return that.commonAjax('api/request/pic', data, callback);
        },
        /**
         * 获取系统配置信息
         */
        getSystem: function (data, callback) {
            var that = this;
            return that.commonAjax('api/system/getPage', data, callback);
        },
        /**
        * 获取联系我们信息
        */
        getContact: function (data, callback) {
            var that = this;
            return that.commonAjax('api/system/get', data, callback);
        },
        /**
        * 问题反馈
        */
        adviceAdd: function (data, callback) {
            var that = this;
            return that.commonAjax('api/advice/add', data, callback);
        },
        /**
        * 分享微信jssdk
        */
        getWxShare: function (data, callback) {
            var that = this;
            return that.commonAjax('api/wechat/config', data, callback);
        },
        setShareData: function () {
            var that = this;
            var iconUrl = 'https://' + window.location.href.split('/')[2] + '/images/sharelogo.png';
            that.shareData = {
                title: '健康社区',
                desc: '最好的免费体验中心',
                link: window.location.href,
                icon: iconUrl
            }
            that.getContact({
                data: {
                    type: 8
                },
                type: 'get'
            }, {
                    func: function (res) {
                        var data = res.data && res.data.list[0];
                        if (res.code == 0) {
                            if (data) {
                                that.shareData.title = data.title;
                                that.shareData.desc = data.value;
                            }
                        } else {
                            that.msgShow(res.msg || "坏了出错了");
                        }
                        that.weiXinConfig();
                    },
                    context: that
                })
        },
        weiXinConfig: function (shareDataInfo) {
            var that = this;
            var shareData = {};
            if (shareDataInfo) {
                shareDataInfo.icon = shareDataInfo.icon + '?x-oss-process=image/resize,l_128,w_128';
                shareData = shareDataInfo;
            } else {
                shareData = that.shareData;
            }

            if (that.isWeixin()) {
                that.getWxShare({
                    type: 'get',
                    data: {
                        url: encodeURIComponent(window.location.href)
                    }
                }, {
                        func: function (res) {
                            wx = wx || window.wx;
                            wx.config({
                                debug: false,
                                appId: res.appId, // 必填，公众号的唯一标识
                                timestamp: res.timestamp, // 必填，生成签名的时间戳
                                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                                signature: res.signature,// 必填，签名，见附录1
                                jsApiList: res.jsApiList
                            });
                            wx.ready(function () {
                                //老方法：兼容低版本微信，官方文档即将废弃18.11.4
                                //分享到朋友圈及QQ空间
                                wx.onMenuShareTimeline({
                                    title: shareData.title, // 分享标题
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                                //分享给朋友及QQ
                                wx.onMenuShareAppMessage({
                                    title: shareData.title, // 分享标题
                                    desc: shareData.desc, // 分享描述
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                                //分享到腾讯微博
                                wx.onMenuShareWeibo({
                                    title: shareData.title, // 分享标题
                                    desc: shareData.desc, // 分享描述
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                                //新方法
                                //分享到朋友圈及QQ空间
                                wx.updateTimelineShareData && wx.updateTimelineShareData({
                                    title: shareData.title, // 分享标题
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                                //分享给朋友及QQ
                                wx.updateAppMessageShareData && wx.updateAppMessageShareData({
                                    title: shareData.title, // 分享标题
                                    desc: shareData.desc, // 分享描述
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                                //分享到腾讯微博
                                wx.onMenuShareWeibo && wx.onMenuShareWeibo({
                                    title: shareData.title, // 分享标题
                                    desc: shareData.desc, // 分享描述
                                    link: shareData.link, // 分享链接
                                    imgUrl: shareData.icon, // 分享图标
                                });
                            });

                        }, context: that
                    })
            }
        },
        /**
         * 
         */
        shareUI: function (img) {
            var that = this;
            //自定义标题风格
            if (that.isWeixin()) {
                layer.open({
                    className: 'share-mask',
                    content: img || '<img src="../images/share.png">'
                });
            } else {
                var nativeShare = new NativeShare();
                nativeShare.setShareData(that.shareData);
                call();
                function call(command) {
                    try {
                        nativeShare.call(command)
                    } catch (err) {
                        // 如果不支持，你可以在这里做降级处理
                        that.msgShow("请点击底部分享~");
                    }
                }
            }
        },
        /**
         * 返回上一页
         */
        backPage: function () {
            var $backBtn = $('.common-top-back');
            $backBtn.on('click', function () {
                history.back(-1);
            })
        },
        /**
         * tab选项卡
         */
        tab: function () {
            var $tabTit = $('.tab-tit');
            var $tabContent = $('.tab-content');
            $tabTit.on('click', 'span', function () {
                var index = $(this).index();
                $(this).parents('.tab').find('.tab-content').hide();
                $(this).parents('.tab-tit').find('span').removeClass('selected');
                $(this).addClass('selected');
                $tabContent.eq(index).show();
            })
        },
        /*****
         * 
         * 引入百度统计js后，会在window下暴露_hmt的方法
         * 事件跟踪最核心的方法_hmt.push
         * _trackEvent：固定参数，表明统计类型是时间跟踪
         * category：目标的类型名称，必选
         * action：用户跟目标交互的行为，必选
         * opt_label：额外信息，可选
         * opt_value：数值信息，可选
         * 后台查看”事件分析”报告
         *  
         * */
        baiduTrack: function () {
            var that = this;
            $("[data-track]").on("click", function () {
                var label = $(this).data("track");
                var f = that.getSessionStorage('f');
                if (f) {
                    label = label + '_' + f;
                }
                page = $(this).data("page");
                window._hmt && window._hmt.push(['_trackEvent', label, '点击', page]);
            });
        },
        pagePath: function () {
            var that = this;
            $("[data-link]").on("click", function () {
                var link = $(this).data("link");
                window.location.href = link + '.html?f=' + that.F;
            });
        },
        iosHack: function () {
            var mainWidth = document.body.clientWidth;
            $('body').width(mainWidth);
        },
        init: function () {
            var that = this;
            that.F = that.getLocationParam().f || '24a61b0aada4f8723346c35260d2da51';
            that.setSessionStorage({ key: 'f', value: that.F });
            that.backPage();
            that.pagePath();
            that.baiduTrack();
            if (window.frames.length != parent.frames.length) {
                that.iosHack();
            }
        }
    };
    common1.init();
    return common1;
});

