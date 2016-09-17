window.mapInfoConfig = {
    k: "name",
    keyword: "",
    type: "more",
    s: "all",
    userPoint: {
        lat: "",
        lng: "",
    },
    sethData: [],
    searchData: [],
    start: function() {
        var vm = this;
        $(".footer-m-sec").on("click", "a", function() {
            var _t = $(this);
            var _tp = _t.parent();
            var _key = _t.attr("data-key");
            _tp.children().removeClass("on");
            vm.keyword = _key;
            _t.addClass("on");
            console.log(vm.keyword);
            vm.s = '';
            vm.search();
        });
    },
    status: [],
    init: function() {
        var vm = this;
        var defpoint = {
            coords: {
                latitude: 31.266507,
                longitude: 121.412366
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

        vm.showPosition(defpoint);

    },
    translateCall: function(point) {
        // point = defpoint;
      
        var vm = this;

        map.clearOverlays();
        vm.userPoint = point;
        vm.addMarkerUser();
        vm.getGeoHouse(point);
        vm.start();
    },
    showPosition: function(position) {
        var vm = this;
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

        }, 1000);


        //坐标转换完之后的回调函数
        translateCallback = function(point) {
            console.log(point);
            vm.translateCall(point);

        }
    },
    getGeoHouse: function(obj) {
        var vm = this;
        var latitude = obj.lat;
        var longitude = obj.lng;
        console.log(JSON.stringify(obj));
        $.ajax({
            type: "GET",
            url: "/fend/map/search/" + latitude + "/" + longitude,
            dataType: "json",
            success: function(result) {
                vm.addMarkerHouse(result.data);
                vm.sethData = result.data;
                vm.status = result.status;
                vm.statusList();
            },
            error: function(result, status) {
                //处理错误
                console.log(result);
            }
        });

    },
    showCount: function(count) {
        $(".show-info-m").text("现有 " + count + " 个");
    },
    addMarkerUser: function() {
        var vm = this;
        var point = vm.userPoint;
        var iconImg = new BMap.Icon('/imgs/me.svg', new BMap.Size(66, 86));
        var marker = new BMap.Marker(point, {
            icon: iconImg
        });
        map.addOverlay(marker);
        map.setCenter(point);
    },
    reset: function() {
        var vm = this;
        //s:{''只返回找到的结果|all返回所有的} 
        var dd = vm.searchClass(vm.searchData);
        vm.addMarkerHouse(dd); //向地图中添加marker
    },
    addMarkerHouse: function(data) {
        var vm = this;
        map.clearOverlays();
        console.log(data);
        vm.showCount(data.length);
        vm.addMarkerUser();
        var leng = data.length;
        for (var i = 0; i < leng; i++) {
            var json = data[i];
            var p0 = json.longitude;
            var p1 = json.latitude;
            var point = new BMap.Point(p0, p1);
            let imgSrc = json.image || '/imgs/map_2.svg';
            var iconImg = new BMap.Icon(imgSrc, new BMap.Size(20, 20));
            var marker = new BMap.Marker(point, {
                icon: iconImg
            });


            // var label = new BMap.Label(json.title, {
            //     "offset": new BMap.Size(0, 50)
            // });


            // marker.setLabel(label);
            map.addOverlay(marker);
            // label.setStyle({
            //     borderColor: "#808080",
            //     color: "#333",
            //     cursor: "pointer"
            // });

            (function() {
                var _json = json;
                var _iw = vm.createInfoWindow(_json);
                var _marker = marker;
                _marker.addEventListener("click", function() {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function() {
                    // _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function() {
                        // _marker.getLabel().show();
                    })
                    // label.addEventListener("click", function() {
                    //     _marker.openInfoWindow(_iw);
                    // })
                if (!!json.is_open) {
                    // label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    },
    createInfoWindow: function(json) {
        var stname = json.name ? json.name : "";
        var html = '<b class="iw_poi_title" title="' + json.title + '">' + json.title + '</b><div class="iw_poi_address">' + json.address + '</div><div class="iw_poi_stname">' + stname + '</div>';
        var iw = new BMap.InfoWindow(html);
        return iw;
    },
    statusList: function() {
        var vm = this;
        var status = vm.status;
        // 状态列表
        var ops = '';
        var len = status.length;
        for (var i = 0; i < len; i++) {
            ops += '<a data-key="' + status[i].name + '">' + status[i].name + '</a>';
        }

        $(".footer-m-sec").html(ops);

    },
    search: function() {
        var vm = this;
        //获取页面dom
        var searchType = vm.type;
        var keyword = $.trim(vm.keyword);
        if (keyword == "") {
            return false;
        }

        //开始搜索
        var dd = vm.searchClass();
        vm.addMarkerHouse(dd); //向地图中添加marker
    },
    searchClass: function() {
        // rule = {k:"title",d:"酒店",s:"all",t:"single"}=>t{single:(key=?),more:(key like[%?%])}//t:{single|more},s{all|!all}
        // rule = {k:"名字",d:"搜索关键字",t:{single名字精确查找|more名字模糊匹配查找},s{''只返回找到的结果|all返回所有的} 
        var vm = this;
        var rule = {
            k: vm.k,
            d: $.trim(vm.keyword),
            t: vm.type,
            s: vm.k
        }
        var datas = vm.sethData;
        if (datas == null) {
            alert("数据不存在!");
            return false;
        }

        var reval = [];

        var len = datas.length;

        var ruleReg = new RegExp($.trim(rule.d));
        var hasOpen = false;

        var addData = function(data, is_open) {
            // 第一条数据打开信息窗口
            if (is_open && !hasOpen) {
                hasOpen = true;
                data.is_open = 1;
            } else {
                data.is_open = 0;
            }
            reval.push(data);
        }
        var getData = function(data, key) {
            var ks = $.trim(key).split(/\./);
            var i = null,
                s = "data";
            if (ks.length == 0) {
                return data;
            } else {
                for (var i = 0; i < ks.length; i++) {
                    s += '["' + ks[i] + '"]';
                }
                return eval(s);
            }
        }
        for (var cnt = 0; cnt < len; cnt++) {
            var data = datas[cnt];
            var d = getData(data, rule.k);
            if (rule.t == "single" && rule.d == d) {
                addData(data, true);
            } else if (rule.t != "single" && ruleReg.test(d)) {
                addData(data, true);
            } else if (rule.s == "all") {
                addData(data, false);
            }
        }
        return reval;

    }
}


$(function(){
     // FastClick.attach(document.body); 
 mapInfoConfig.init();
  alert("ss");
})
