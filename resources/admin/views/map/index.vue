<template>
    <div id="l-map"></div>
    <div id="r-result">
        <input id="type1" type="radio" name="type" value="single" /><label for="type1">精准查找</label><br/>
        <input id="type2" type="radio" name="type" value="more" checked="checked" /><label for="type2">模糊查找</label><br />
        <input id="keyword" type="text" value="" class="form-control" /><br />
        <input type="button" v-on:click="mapDateReset()" class="success button btn btn-white" value="显示全部" />
        <input id="search-btn" type="button" value="搜索" class="button btn  btn-primary" /><br /><br />
        <select name="keyv" id="keyv" class="form-control">
            <option value="title" v-for="sta in status" :value="sta.name" >{{sta.name}}</option>
        </select>
        <div id="count-info" class="count-info"></div>
        <div class="count-main">
            <table class="table">
                <thead>
                <tr>
                   <td>
                       状态名称
                    </td>
                    <td>
                       统计数
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="count in statusCount">
                    <td>
                    {{count.name}}
                    </td>
                    <td>
                    {{count.count}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <a v-link="{name:'dashboard'}" class="map-admin-link">
            <i class="fa fa-th"></i>
            <span class="nav-label">后台管理</span>
        </a>
    </div>
    <div class="map-show-btn" data-id="1">
        隐藏操作面板
    </div>
</template>
<style lang="stylus">
.amap-logo
    display none
.amap-copyright
    display none!important
</style>
<script>
    //scss
    import './map.scss';

    export default {
        ready: function() {
            let vm = this;

            window.map = new AMap.Map("l-map", {resizeEnable: true});

            this.getData().then(function() {
                vm.getDataCount();

                $('#keyv').change(function() {

                    var p1 = $(this).children('option:selected').val();
                    uMapConfig.k = 'status.name';

                    $("#keyword").val(p1);
                    vm.search('type', 'keyword');
                });

                 $('#keyword').on('keypress',function(event){
                    if(event.keyCode == "13")    
                    {
                        uMapConfig.k = 'title';
                        vm.search('type', 'keyword');
                        return false;
                    }
                });

                $(".map-show-btn").on("click",function(){
                    let _t = $(this);
                    let _tid = _t.attr("data-id");
                    if(_tid == "1"){
                        $("#r-result").hide();
                        _t.attr("data-id",2)
                        _t.text("显示");
                    }else{
                        $("#r-result").show();
                         _t.attr("data-id",1)
                         _t.text("隐藏");
                    }
                });

            });

            $("body").on("click", ".select-us li", function() {
                let _t = $(this);
                let _tId = _t.attr("data-id");
                let _par = _t.parent("ul");
                let _Info = _par.attr("data-info");
                if (_t.hasClass("on")) {
                    return false;
                }

                if (_Info) {
                    _Info = JSON.parse(_Info);
                }

                _par.children().removeClass("on");
                _t.addClass("on");

                _Info.status_id = _tId;
                vm.updateData(_Info);

                return false;
            });

            $("#search-btn").on("click", function() {
                uMapConfig.k = 'title';
                vm.search('type', 'keyword');
                return false;
            });

            $("#l-map").on("click", function() {
                $(".select-us").remove();
            })



        },
        data: function() {
            return {
                title: '小区地图',
                status: [],
                statusCount: [],
                statusname: '',
                searchData: [],
                searchType:'title',
                errors: null
            }
        },

        methods: {
            getData: function() {
                let vm = this;
                return new Promise(function(resolve, reject) {
                    this.$http.get('/fend/map').then(function(result) {
                        let data = result.data;
                        if (data.flag == true && data.data) {

                            vm.initMap(data.data); //创建和初始化地图
                            vm.status = data.status;
                        }
                        this.$toast['success'](data.msg);
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
                }.bind(this));
            },
            getDataCount: function() {
                let vm = this;
                return new Promise(function(resolve, reject) {
                    this.$http.get('/fend/map/count').then(function(result) {
                        let data = result.data;
                        if (data.flag == true && data.data) {
                            console.log(data.data);

                            vm.statusCount = data.data
                        }
                        this.$toast['success'](data.msg);
                        resolve(result);
                    }, function(error) {
                        reject(error);
                    });
                }.bind(this));
            },
            initMap: function(BASEDATA) {
                let vm = this;                
                //创建自定义搜索类
                window.searchClass = new SearchClass();
                searchClass.setData(BASEDATA)
                vm.mapDateReset();
            },
            createSelectStatus(obj){
                let vm = this;
                $(".select-us").remove();

                let selectSta = '';

                let uphouseInfo = obj.target.infojson;
                let uphouseInfoStc = JSON.stringify(uphouseInfo);
                let statusList = vm.status;
                let slen = statusList.length;
                for (var i = 0; i < slen; i++) {
                    let isClass = '';
                    if (statusList[i].id == uphouseInfo.status.id) {
                        isClass = 'on';
                    }
                    selectSta += '<li  class="' + isClass + '" data-id="' + statusList[i].id + '">' + statusList[i].name + '</li>';
                };



                let ul = $('<ul></ul>');
                ul.attr("data-info", uphouseInfoStc)
                ul.attr("class", "select-us");
                ul.css({
                    "top": obj.pixel.y,
                    "left": obj.pixel.x
                })
                ul.html(selectSta);
                $("body").append(ul);　
                
                return false;　

            },
            mapDateReset() {
                let vm = this;
                uMapConfig.k = 'title';
                //重置返回所有结果
                //s:{''只返回找到的结果|all返回所有的} 
                let dd = searchClass.search({
                    k: uMapConfig.k,
                    d: "显示全部",
                    t: "single",
                    s: "all"
                });
                vm.addMarker(dd); 
            },
            search: function(searchTypeRadio_name, keyword_name) {
                //搜索方法 param{searchTypeRadio_name：搜索radio的名字,keyword_name:搜索文本框的id}
                let vm = this;
                //获取页面dom
                let searchType = document.getElementsByName(searchTypeRadio_name);
                let keyword = document.getElementById(keyword_name).value;
                if (keyword == "") {
                    return false;
                }
                //获取dom的值
                let isLikeSearch;
                for (var i = 0; i < searchType.length; i++) {
                    if (searchType[i].checked) {
                        isLikeSearch = searchType[i].value;
                    }
                }
                //开始搜索
                searchClass.trim(isLikeSearch) == "" && (t_v = "single"); //去掉搜索关键字的html标签
                let dd = searchClass.search({
                    k: uMapConfig.k,
                    d: keyword,
                    t: isLikeSearch,
                    s: ""
                });
                vm.addMarker(dd); //向地图中添加marker
            },
            countInfo: function(data) {
                let leng = data.length;
                let stc = '搜索结果总数是:' + leng;
                $("#count-info").html(stc);
            },
            openShopUpdata:function(id){
                window.open("/admin/#!/main/house/edit/"+id);
            },
            addMarker: function(data) {
                let vm = this;
               
                map.clearMap();

                var dataleng = data.length;

                var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

                for (var i = 0, marker; i < dataleng; i++) {
                    var json = data[i];
                    var lnglats = [json.longitude,json.latitude];
                    var title = json.title;
                    var iconsrc = json.status.image || "http://webapi.amap.com/theme/v1.3/images/newpc/way_btn2.png"  ;
                 
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

                vm.countInfo(data);
                let leng = data.length;
              
            },
            createInfoWindow: function(json) {
                //创建InfoWindow
                let stname = json.status ? json.status.name : "";
                let html = '<b class="iw_poi_title" title="' + json.title + '">' + json.title + '</b><div class="iw_poi_address">' + json.address + '</div><div class="iw_poi_stname">' + stname + '</div>';
                // let iw = new BMap.InfoWindow(html);
                return html;
            },
            updateData: function(data) {
                let Id = data.id;
                console.log(Id);
                this.$http.put('/backend/house/' + Id, data).then(function(result) {
                    let data = result.data;

                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                });


            },
            getAttr: function(e, key) {
                return e.getAttribute(key);
            },
            setAttr: function(e, key, val) {
                return e.setAttribute(key, val);
            }
        }
    };


     window.uMapConfig = {
        k: "title",
        status: '',
    };

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
    
</script>