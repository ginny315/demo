! function(global) {
      var dpr, rem, scale, resizeTime;
      var docEl = document.documentElement;
      var metaEl = document.querySelector('meta[name="viewport"]');

      var ua = (window.navigator.appVersion.match(/android/gi), window.navigator.appVersion.match(/iphone/gi)),

          dpr = window.devicePixelRatio || 1;
      if (ua) {
          if (dpr > 3) {
              dpr = 3;
          }
      } else {
          dpr = 1;
      }

      scale = 1 / dpr;

      // 设置data-dpr属性，留作的css hack之用
      docEl.setAttribute('data-dpr', dpr);

      // 设置viewport，进行缩放，达到高清效果
      metaEl = document.createElement("meta");
      metaEl.setAttribute("name", "viewport"),
          metaEl.setAttribute('content', 'initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');

      if (docEl.firstElementChild) {
          docEl.firstElementChild.appendChild(metaEl);
      } else {
          var el = document.createElement("div");
          el.appendChild(metaEl);
          document.write(el.innerHTML);
      }

      function flexibal() {
          var winWidth = docEl.getBoundingClientRect().width,
              winHeight = docEl.getBoundingClientRect().height;
          if (winWidth < (540 * dpr)) {
              rem = winWidth / 10;
          } else {
              rem = 540 * dpr / 10;
          }

          var val = '' + rem + 'px';
          docEl.style.fontSize = val;
          global.rem = rem;
      }

      window.addEventListener("resize", function() {
          clearTimeout(resizeTime);
          resizeTime = setTimeout(flexibal, 300);
      }, false);

      window.addEventListener("pageshow", function(a) {
          if (window.persisted) {
              clearTimeout(resizeTime);
              resizeTime = setTimeout(flexibal, 300);
          }

      }, false);
      flexibal();
  }(window);