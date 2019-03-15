(function (doc, win) {
    let isPhone =  function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true;
        } else {
            return false;
        }
    }
    let recalc = function () {
        let width = docEl.clientWidth;
        let maxWidth = 414;
        if (width / dpr > maxWidth) {
            width = maxWidth * dpr;
        }
        if (width > maxWidth) {
            width = maxWidth
        }
        docEl.dataset.percent = 100;
        docEl.style.fontSize = width / 10 + 'px';
    };
    if(isPhone()){
        let docEl = doc.documentElement,
            isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        let dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
            dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        docEl.dataset.dpr = dpr;
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);  
    }
})(document, window);
	