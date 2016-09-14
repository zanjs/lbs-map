
(function(){        //闭包
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //借鉴了jQuery的script跨域方法
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}
function translate(point,type,callback){
    var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
    var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from="+ type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
    //动态创建script标签
    load_script(xyUrl);
    BMap.Convertor[callbackName] = function(xyResult){
        delete BMap.Convertor[callbackName];    //调用完需要删除改函数
        var point = new BMap.Point(xyResult.x, xyResult.y);
        callback && callback(point);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.translate = translate;
})();


$(document).ready(function() {
    var defpoint = {
        coords:{
            latitude:31.266507,
            longitude:121.412366
        },
        lat: 31.253715,
        lng: 121.414496
    };
    window.map = new BMap.Map("m-map");
    /*h5获取地理位置*/
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    // } else {
    //     alert("未收到gps地址")
    // };
    showPosition(defpoint)

});


function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var gpsPoint = new BMap.Point(lng, lat);
    // 地图初始化
    map.centerAndZoom(gpsPoint, 13);
    // 标记
    var marker = new BMap.Marker(gpsPoint);
    map.addOverlay(marker);
    map.addControl(new BMap.NavigationControl());
    setTimeout(function() {
        BMap.Convertor.translate(gpsPoint, 0, translateCallback); //真实经纬度转成百度坐标
    }, 100);
    //坐标转换完之后的回调函数
    translateCallback = function(point) {
        mapInfoConfig.translateCallback(point);
    }
};