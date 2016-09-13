$(document).ready(function() {
    /*h5获取地理位置*/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("未收到gps地址")
    };

    function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var gpsPoint = new BMap.Point(lng, lat);
        //地图初始化
        var bm = new BMap.Map("container");
        bm.centerAndZoom(gpsPoint, 20);
        //标记
        var marker = new BMap.Marker(gpsPoint);
        bm.addOverlay(marker);
        bm.addControl(new BMap.NavigationControl());
        setTimeout(function() {
            BMap.Convertor.translate(gpsPoint, 0, translateCallback); //真实经纬度转成百度坐标
        }, 1500);
        //坐标转换完之后的回调函数
        translateCallback = function(point) {
  
            var iconImg = new BMap.Icon('/imgs/me.svg', new BMap.Size(66, 86));
            var marker = new BMap.Marker(point, {
                icon: iconImg
            });
            bm.addOverlay(marker);
            bm.setCenter(point);
            getGeoHouse(point);
        }
    }

    function getGeoHouse(obj){
        var latitude = obj.lat;
        var longitude = obj.lng;
        alert(JSON.stringify(obj));
        $.ajax({
            type: "GET",
            url: "fend/map/search/"+ latitude +"/"+ longitude,
            dataType: "json",
            success: function(result) {
               
               
                alert(JSON.stringify(result));
            },
            error: function(result, status) {
                //处理错误
                console.log(result);
            }
        });


    };
});