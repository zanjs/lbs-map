
var uMapConfig = {
    k:"title",
    status:'',
}

var uMapRoot = {
    init:function(){
        this.getData();
    },
    getData: function() {
        $.ajax({
            type: "GET",
            url: "/fend/map",
            dataType: "json",
            success: function(result) {
               
                initMap(result.data); //创建和初始化地图
                uMapConfig.status = result.status;
                statusList(result.status);
                // console.log(JSON.stringify(result));
            },
            error: function(result, status) {
                //处理错误
                console.log(result);
            }
        });
    },
    uphouseInfo:function(data){
        var Id = data.id;
        console.log(Id);
        $.ajax({
            type: "POST",
            url: "/backend/house/"+Id,
            data:data,
            dataType: "application/json",
            success: function(result) {
               
                initMap(result.data); //创建和初始化地图
                uMapConfig.status = result.status;
                statusList(result.status);
                // console.log(JSON.stringify(result));
            },
            error: function(result, status) {
                //处理错误
                console.log(result);
            }
        });

    }
}



uMapRoot.init();

//状态列表
function statusList(status){

   
    var ops = '';
    var len = status.length;
    for(var i = 0; i < len; i++){
      ops += '<option value="'+status[i].name+'">'+status[i].name+'</option>';
    }

    $("#keyv").html(ops);


    $('#keyv').change(function(){ 
   
         var p1=$(this).children('option:selected').val();
          uMapConfig.k = 'status.name';
          console.log(p1)
          $("#keyword").val(p1);
          search('type','keyword');
    }) 


}
$("#search-btn").on("click",function(){
    uMapConfig.k = 'title';
    search('type','keyword');
});

$("#l-map").on("click",function(){
     $(".select-us").remove();
})

$("body").on("click",".select-us li",function(){
     var _t = $(this);
     var _tId = _t.attr("data-id");
     var _Info = _t.parent("ul").attr("data-info");
     if(_t.hasClass("on")){
         return false;
     }
     console.log(_tId);
     console.log(_Info);
     if(_Info){
       _Info =  JSON.parse(_Info);
     }
     uMapRoot.uphouseInfo(_Info);
})

//统计数据
function countInfo(data){
    var leng = data.length;


    var stc = '搜索结果总数是:'+ leng;
    $("#count-info").html(stc);

}
// houseInfo

//创建和初始化地图函数：
function initMap(BASEDATA) {
    window.map = new BMap.Map("l-map");

    map.centerAndZoom(new BMap.Point(BASEDATA[0].longitude,BASEDATA[0].latitude), 14);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.NavigationControl());
    //创建自定义搜索类
    window.searchClass = new SearchClass();
    searchClass.setData(BASEDATA)
    reset();
}

//搜索方法 param{searchTypeRadio_name：搜索radio的名字,keyword_name:搜索文本框的id}
window.search = function(searchTypeRadio_name, keyword_name) {
        //获取页面dom
        var searchType = document.getElementsByName(searchTypeRadio_name);
        var keyword = document.getElementById(keyword_name).value;
        if(keyword == ""){
            return false;
        }
        //获取dom的值
        var isLikeSearch;
        for (var i = 0; i < searchType.length; i++) {
            if (searchType[i].checked) {
                isLikeSearch = searchType[i].value;
            }
        }
        //开始搜索
        searchClass.trim(isLikeSearch) == "" && (t_v = "single"); //去掉搜索关键字的html标签
        var dd = searchClass.search({
            k: uMapConfig.k,
            d: keyword,
            t: isLikeSearch,
            s: ""
        });
        addMarker(dd); //向地图中添加marker
    }
    //重置返回所有结果
window.reset = function() {
    //s:{''只返回找到的结果|all返回所有的} 
    var dd = searchClass.search({
        k: uMapConfig.k,
        d: "显示全部",
        t: "single",
        s: "all"
    });
    addMarker(dd); //向地图中添加marker
}

//创建marker
window.addMarker = function(data) {
        map.clearOverlays();
        countInfo(data);
        var leng = data.length;
        for (var i = 0; i < leng; i++) {
            var json = data[i];
            var p0 = json.longitude;
            var p1 = json.latitude;
            var point = new BMap.Point(p0, p1);
            var iconImg = new BMap.Icon('/imgs/map_2.svg', new BMap.Size(50, 50));
            var marker = new BMap.Marker(point, {
                icon: iconImg
            });

            marker.houseInfo = json;

           var updateLabel = function(e, ee, label) {
                    // map.removeOverlay(label); 
                    console.log(label);
                    console.log(uMapConfig.status);
                    $(".select-us").remove();

                    var selectSta = '';

                    var uphouseInfo = label.houseInfo;
                    var uphouseInfoStc = JSON.stringify(uphouseInfo);
                    var slen = uMapConfig.status.length;
                    for(var i = 0; i < slen; i++){
                        var isClass = '';
                        if(uMapConfig.status[i].id == uphouseInfo.status.id){
                            isClass = 'on';
                        }
                        selectSta += '<li  class="'+ isClass +'" data-id="'+ uMapConfig.status[i].id +'">'+uMapConfig.status[i].name+'</li>';
                    };
                    


                    var ul = $('<ul></ul>'); 
                    ul.attr("data-info",uphouseInfoStc)
                    ul.attr("class","select-us");
                    ul.css({"top":ee.y,"left":ee.x})
                    ul.html(selectSta);
                    $("body").append(ul);　　

           };

        //创建右键菜单
            var markerMenu=new BMap.ContextMenu();
            markerMenu.addItem(new BMap.MenuItem('修改'+json.title,updateLabel.bind(marker)));
            

           
            marker.addContextMenu(markerMenu);

            //var iw = createInfoWindow(json);
            var label = new BMap.Label(json.title, {
                "offset": new BMap.Size(0, 50)
            });

            
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function() {
                var _json = json;
                var _iw = createInfoWindow(_json);
                var _marker = marker;
                _marker.addEventListener("click", function() {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function() {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function() {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function() {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.is_open) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }
    //创建InfoWindow
function createInfoWindow(json) {
    var stname = json.status ? json.status.name :"";
    var html = '<b class="iw_poi_title" title="' + json.title + '">' + json.title + '</b><div class="iw_poi_address">' + json.address + '</div><div class="iw_poi_stname">' + stname + '</div>';
    var iw = new BMap.InfoWindow(html);
    return iw;
}
//创建一个Icon
function createIcon(json) {
    var icon = new BMap.Icon("/imgs/map_2.svg", new BMap.Size(json.w, json.h), {
        imageOffset: new BMap.Size(-json.l, -json.t),
        infoWindowAnchor: new BMap.Size(json.lb + 5, 1),
        offset: new BMap.Size(json.x, json.h)
    })
    return icon;
}

function SearchClass(data) {
    this.datas = data;
}
// rule = {k:"title",d:"酒店",s:"all",t:"single"}=>t{single:(key=?),more:(key like[%?%])}//t:{single|more},s{all|!all}
// rule = {k:"名字",d:"搜索关键字",t:{single名字精确查找|more名字模糊匹配查找},s{''只返回找到的结果|all返回所有的} 
SearchClass.prototype.search = function(rule) {
    if (this.datas == null) {
        alert("数据不存在!");
        return false;
    }
    if (this.trim(rule) == "" || this.trim(rule.d) == "" || this.trim(rule.k) == "" || this.trim(rule.t) == "") {
        alert("请指定要搜索内容!");
        return false;
    }
    var reval = [];
    var datas = this.datas;
    var len = datas.length;
    var me = this;
    var ruleReg = new RegExp(this.trim(rule.d));
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
        var ks = me.trim(key).split(/\./);
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
SearchClass.prototype.setData = function(data) {
    this.datas = data;
}
SearchClass.prototype.trim = function(str) {
    if (str == null) {
        str = "";
    } else {
        str = str.toString();
    }
    return str.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g, "");
}

