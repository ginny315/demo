/**
 * Created by ginny
 */
window.version = '1.0.0';
window.debug = false;
requirejs.config({
    baseUrl:'./',
    paths:{
        zepto:'js/lib/zeptojs/dist/zepto.min',
        common:'js/common',
        index:'js/index',
        host:'host',
    },
    shim:{
        pluginName:{
            deps:['zepto']
        },
        zepto:{
            exports:'$'
        }
    },
    urlArgs:'v='+(debug==true?version:version)
});
