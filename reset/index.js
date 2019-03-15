require(['jquery', 'fastclick', 'layer', 'common', 'template', 'wx'], function ($, fastclick, layer, common, template, wx) {
    fastclick.attach(document.body);
    var main = {
        init: function () {
            var that = this;
            that.orderParams = {
                pageIndex: 1,
                pageSize: 10,
                orderBy: '', //asc,desc
                order: '' //hot,time
            };
            that.isPageAll = true;
            that.loadingFlag = true;
            that.shareTipsImg = '<img src="../images/share.png">';
			this.f = common.getLocationParam().f;
			if (this.f || this.f == '24a61b0aada4f8723346c35260d2da51ss') {
				common.setShareData();
			}
            that.renderUI();
            that.bindUI();
        },
        renderUI: function () {
            var that = this;
            that.$productList = $('#product-list');
            wx && wx.miniProgram && wx.miniProgram.getEnv(function (res) {
                console.log('index:' + res.miniprogram)
                if (res.miniprogram) {
                    //that.shareTipsImg = '<img src="../images/share_mini.png">';
                }
            })
            that.getProductListAjax();
			
        },
        bindUI: function () {
            var that = this,
                isHot = true,
                status = '0',
                $hotOrder = $('.hot-order'),
                $timOrder = $('.time-order'),
                $backTop = $('.common-back-top'),
                winHeight = (window.innerHeight || document.documentElement.clientHeight);
            $(window).scroll(function () {
                var $scrollH = $(window).scrollTop(),
                    $winH = $(window).height(),
                    $pageH = $(document).height();

                if ($scrollH > winHeight) {
                    $backTop.fadeIn(1000);
                } else {
                    $backTop.fadeOut(1000);
                }

                if ($scrollH + $winH >= $pageH && that.loadingFlag) {
                    that.loadingFlag = false;
                    if (that.isPageAll) {
                        that.orderParams.pageIndex += 1;
                        that.getProductListAjax();
                    }
                }
            });
            $backTop.on('click', function () {
                $("html,body").animate({ scrollTop: 0 }, 500);
                //document.documentElement.scrollTop = document.body.scrollTop = 0;
            });

            //common.tab();

            $hotOrder.on('click', function () {
                if (isHot) {
                    isHot = false;
                    $(this).addClass('selected');
                    that.orderParams.order = 'hot';
                } else {
                    that.orderParams.order = ''
                    hotOrderDefault();
                }
                timeOrderDefault();
                that.getProductListAjax();
            })
            $timOrder.on('click', function () {
                that.orderParams.order = 'time';
                if (status == '0') {
                    $(this).find('.arrow-up').addClass('arrow-up-selected');
                    $(this).addClass('red');
                    that.orderParams.orderBy = 'asc';
                    status = '1';
                } else if (status == '1') {
                    $(this).find('.arrow-up').removeClass('arrow-up-selected');
                    $(this).find('.arrow-down').addClass('arrow-down-selected');
                    that.orderParams.orderBy = 'desc';
                    status = '';
                } else {
                    that.orderParams.order = ''
                    timeOrderDefault();
                }
                hotOrderDefault();
                that.getProductListAjax();
            })
            function hotOrderDefault() {
                that.isPageAll = true;
                isHot = true;
                that.orderParams.pageIndex = 1;
                $hotOrder.removeClass('selected');
                that.$productList.html('');
                $('.tips').html('');
            }
            function timeOrderDefault() {
                that.isPageAll = true;
                status = '0'
                that.orderParams.orderBy = '';
                that.orderParams.pageIndex = 1;
                $timOrder.find('.arrow-up').removeClass('arrow-up-selected');
                $timOrder.find('.arrow-down').removeClass('arrow-down-selected');
                $timOrder.removeClass('red');
                that.$productList.html('');
                $('.tips').html('');
            }

            $('.common-top-share').on('click', function () {
                common.shareUI(that.shareTipsImg);
            })

            $('.product-list').on('click', '.product-info', function () {
                var id = $(this).data('id'),
                    page = $(this).data("page");
				var currentf = $(this).data('f');
				var f = common.getLocationParam().f || '24a61b0aada4f8723346c35260d2da51'
                window._hmt && window._hmt.push(['_trackEvent', id, '点击', page]);
				if (currentf) {
					f =  currentf;
				}
                setTimeout(function () {
                    window.location.href = 'product.html?productId=' + id + '&f=' + f;
                })
            })

            $('.product-list').on('click', '.write-userinfo', function () {
                var id = $(this).data('id');
                var f = common.getLocationParam().f ||'24a61b0aada4f8723346c35260d2da51'
                layer.open({
                    content: 'Sorry，此产品本期体验已经结束，' +
                        '<p>您可以预留信息，下期体验开始，</p>' +
                        '会以短信的形式提醒您～'
                    , btn: ['立即预留', '再逛逛']
                    , yes: function (index) {
                        layer.close(index);
                        window.location.href = 'write_userinfo.html?productId=' + id + '&f=' + f;
                    }
                });
            })

        },
        getProductListAjax: function () {
            var that = this;
            //common.loading();
			if (this.f && this.f != '24a61b0aada4f8723346c35260d2da51') {
				common.getProductList({
					data: that.orderParams,
					type: 'get'
				}, {
						func: function (res) {
							//common.endLoading();
							that.loadingFlag = true;
							that.renderProducts(res);
						},
						context: that
					})
			} else {
				// 没有f，默认获取全渠道商品数据
				common.getProductALL({
					data: that.orderParams,
					type: 'get'
				}, {
						func: function (res) {
							//common.endLoading();
							that.loadingFlag = true;
							that.renderProducts(res);
						},
						context: that
					})
			}
        },
        renderProducts: function (res) {
            var that = this;
            var data = res.data && res.data.list;
            if (!data) return;
            if (that.isPageAll && data.length >= 10) {
                $('.tips').html('小二正在补充货架~');
            }
            if (data.length < 10) {
                that.isPageAll = false;
                $('.tips').html('客官，就这些了~');
            }
            if (!data.length) {
                return;
            }
            data.forEach(function (item) {
                if (item.nowRequest > 10000) {
                    item.nowRequest = '9999+'
                }
                // if (item.productStatus == 1) {
                //     item.finishClass = '';
                //     item.btnText = '申请体验';
                // } else {
                //     item.finishClass = 'product-finish';
                //     item.btnText = '查看详情 >';
                // }
                if (item.surplusRequest <= 0) {
                    item.finishClass = 'write-userinfo';
                    item.btnText = '预约申请';
                } else {
                    item.finishClass = 'product-info';
                    item.btnText = '申请体验';
                }
				item.postUrl = common.getUrlCrop(item.postUrl)
            })
            var html = template('product-list-tpl', res.data);
            that.$productList.append(html);
        }
    }

    main.init();

    //return exports;
})