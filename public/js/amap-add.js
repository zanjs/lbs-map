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
    start: function () {
        var vm = this;
        $(".footer-m-sec").on("click", "a", function () {
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
    translateCallback: function (point) {
        // point = defpoint;
        var vm = this;

        map.clearMap();
        vm.userPoint = point;
        vm.addMarkerUser();
        vm.getGeoHouse(point);
        vm.start();
    },
    getGeoHouse: function (obj) {
        var vm = this;
        var latitude = obj.lat;
        var longitude = obj.lng;
        console.log(JSON.stringify(obj));
        $.ajax({
            type: "GET",
            url: "/fend/map/search/" + latitude + "/" + longitude,
            dataType: "json",
            success: function (result) {
                vm.addMarkerHouse(result.data);
                vm.sethData = result.data;
                vm.status = result.status;
                vm.statusList();
            },
            error: function (result, status) {
                //处理错误
                console.log(result);
            }
        });

    },
    showCount: function (count) {
        $(".show-info-m").text("现有 " + count + " 个");
    },
    addMarkerUser: function () {
        var vm = this;
        var point = vm.userPoint;
        // var iconImg = new BMap.Icon('/imgs/me.svg', new BMap.Size(66, 86));
        // var marker = new BMap.Marker(point, {
        //     icon: iconImg
        // });
        console.log(point)
        console.log(map)
   

         var marker = new AMap.Marker({
                map: map,
                position: [point.lng, point.lat],
                icon: new AMap.Icon({            
                    size: new AMap.Size(24, 24),  //图标大小
                    // imageOffset: new AMap.Pixel(0, -60),
                    image: "/imgs/people.png",

                })        
        });
        marker.setAnimation('AMAP_ANIMATION_BOUNCE');
         
         map.setFitView();

        // map.addOverlay(marker);
        // map.setCenter(point);
    },
    reset: function () {
        var vm = this;
        //s:{''只返回找到的结果|all返回所有的} 
        var dd = vm.searchClass(vm.searchData);
        vm.addMarkerHouse(dd); //向地图中添加marker
    },
    addMarkerHouse: function (data) {
       var vm = this;
               
                map.clearMap();

                var dataleng = data.length;

                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

                for (var i = 0, marker; i < dataleng; i++) {
                    var json = data[i];
                    var lnglats = [json.longitude,json.latitude];
                    var title = json.title;
                    var iconsrc = json.image || "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png"  ;
                 
                    var marker = new AMap.Marker({
                        map: map,
                        position: lnglats,
                        icon: new AMap.Icon({            
                            size: new AMap.Size(20, 20),  //图标大小
                            // imageOffset: new AMap.Pixel(0, -60),
                            image: iconsrc,

                        })        
                    });
                    
                    marker.content = vm.createInfoWindow(json);
                    marker.on('click', markerClick);
                    marker.emit('click', {target: marker});
                    
                    marker.infojson = json;

                    marker.on('rightclick', function(e) {
                        console.log(e);
                        vm.openShopUpdata(e.target.infojson.id);
                    });


                }
                function markerClick(e) {
                    infoWindow.setContent(e.target.content);
                    infoWindow.open(map, e.target.getPosition());
                }
                map.setFitView();

                vm.addMarkerUser();
                var leng = data.length;
                vm.showCount(leng);
    },
    createInfoWindow: function (json) {
        var stname = json.name ? json.name : "";
        var html = '<b class="iw_poi_title" title="' + json.title + '">' + json.title + '</b><div class="iw_poi_address">' + json.address + '</div><div class="iw_poi_stname">' + stname + '</div>';
        
        return html;
    },
    statusList: function () {
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
    search: function () {
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
    searchClass: function () {
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

        var addData = function (data, is_open) {
            // 第一条数据打开信息窗口
            if (is_open && !hasOpen) {
                hasOpen = true;
                data.is_open = 1;
            } else {
                data.is_open = 0;
            }
            reval.push(data);
        }
        var getData = function (data, key) {
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