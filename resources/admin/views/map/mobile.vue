<template>
    <div class="map-mobile">
        mmm
    </div>
</template>
<script>
    /** 
* 以下为html5代码,获取地理位置 
*/ 

// getLocation();
function getLocation() { 
//检查浏览器是否支持地理位置获取 
if (navigator.geolocation) { 
//若支持地理位置获取,成功调用showPosition(),失败调用showError 
// alert("正在努力获取位置..."); 
var config = { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 }; 
navigator.geolocation.getCurrentPosition(showPosition, showError, config); 
} else { 
//alert("Geolocation is not supported by this browser."); 
alert("定位失败,用户已禁用位置获取权限"); 
} 
} 
/** 
* 获取地址位置成功 
*/ 
function showPosition(position) { 
//获得经度纬度 
var x = position.coords.latitude; 
var y = position.coords.longitude; 
//配置Baidu Geocoding API 
var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b" + 
"&callback=renderReverse" + 
"&location=" + x + "," + y + 
"&output=json" + 
"&pois=0"; 
$.ajax({ 
type: "GET", 
dataType: "jsonp", 
url: url, 
success: function (json) { 
if (json == null || typeof (json) == "undefined") { 
return; 
} 
if (json.status != "0") { 
return; 
} 
setAddress(json.result.addressComponent); 
}, 
error: function (XMLHttpRequest, textStatus, errorThrown) { 
alert("[x:" + x + ",y:" + y + "]地址位置获取失败,请手动选择地址"); 
} 
}); 
} 
/** 
* 获取地址位置失败[暂不处理] 
*/ 
function showError(error) { 
switch (error.code) { 
case error.PERMISSION_DENIED: 
alert("定位失败,用户拒绝请求地理定位"); 
//x.innerHTML = "User denied the request for Geolocation.[用户拒绝请求地理定位]" 
break; 
case error.POSITION_UNAVAILABLE: 
alert("定位失败,位置信息是不可用"); 
//x.innerHTML = "Location information is unavailable.[位置信息是不可用]" 
break; 
case error.TIMEOUT: 
alert("定位失败,请求获取用户位置超时"); 
//x.innerHTML = "The request to get user location timed out.[请求获取用户位置超时]" 
break; 
case error.UNKNOWN_ERROR: 
alert("定位失败,定位系统失效"); 
//x.innerHTML = "An unknown error occurred.[未知错误]" 
break; 
} 
} 
/** 
* 设置地址 
*/ 
function setAddress(json) { 
var position = document.getElementById("txtPosition"); 
//省 
var province = json.province; 
//市 
var city = json.city; 
//区 
var district = json.district; 
province = province.replace('市', ''); 
position.value = province + "," + city + "," + district; 
position.style.color = 'black'; 
} 
</script>