<template>
    <div class="ju-map-wrap animated fadeInDown">
        <div class="ju-map-main">
            <div id="allmap"></div>
        </div>
        <div class="ju-map-nav">

        </div>
    </div>
</template>
<script>
    //scss

    import './map.scss';

    export default {
        ready: function() {
            let vm = this;
            // 百度地图API功能
            let map = new BMap.Map("allmap");



            this.MarkerList(map,1,1)


        },
        data: function() {
            return {
                title: '小区地图',
                status: [],
                citys: [],
                tags: [],
                data: {
                    title: '',
                    city_id: 0,

                },
                errors: null
            }
        },

        methods: {
            createData: function() {
                this.$http.post('house', this.data).then(function(result) {
                    let data = result.data;
                    if (data.flag == true) {
                        this.$route.router.go('/main/house/index');
                    }
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                });
            },
            MarkerList: function(mp, arr, index) { 

                mp.centerAndZoom(new BMap.Point(116.3964, 39.9093), 15);
                mp.enableScrollWheelZoom();
                // 复杂的自定义覆盖物
                function ComplexCustomOverlay(point, obj) {
                    this._point = point;
                    this._obj = obj;
                    
                }
                ComplexCustomOverlay.prototype = new BMap.Overlay();
                ComplexCustomOverlay.prototype.initialize = function(map) {
                    this._map = map;
                    var div = this._div = document.createElement("div");
                    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
                    div.setAttribute("class", "ju-map-over");
                    var span = this._span = document.createElement("span");
                    var ptext = this._p = document.createElement("p");
                    div.appendChild(span);
                    div.appendChild(ptext);
                    span.appendChild(document.createTextNode(this._obj.name));
                    ptext.appendChild(document.createTextNode(this._obj.statusName));
                    var that = this;

                    var arrow = this._arrow = document.createElement("div");
                    arrow.style.position = "absolute";
                    arrow.style.width = "11px";
                    arrow.style.height = "10px";
                    arrow.style.top = "22px";
                    arrow.style.left = "10px";
                    arrow.style.overflow = "hidden";
                    div.appendChild(arrow);

                    // div.onmouseover = function() {
                    //     this.style.backgroundColor = "#6BADCA";
                    //     this.style.borderColor = "#0000ff";
                    //     this.getElementsByTagName("span")[0].innerHTML = that._overText;
   
                    // }

                    // div.onmouseout = function() {
                    //     this.style.backgroundColor = "#EE5D5B";
                    //     this.style.borderColor = "#BC3B3A";
                    //     this.getElementsByTagName("span")[0].innerHTML = that._text;

                    // }

                    mp.getPanes().labelPane.appendChild(div);

                    return div;
                }
                ComplexCustomOverlay.prototype.draw = function() {
                    var map = this._map;
                    var pixel = map.pointToOverlayPixel(this._point);
                    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
                    this._div.style.top = pixel.y - 30 + "px";
                }
                var objinfo = {
                        name:"银湖海岸城",
                        status:"1",
                        statusName:"有店",
                    };

                var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845, 39.914101), objinfo);

                mp.addOverlay(myCompOverlay);


                // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

                // function ZoomControl() {
                //     this.defaultAnchor = "zanjs";
                //     this.defaultOffset = new BMap.Size(10, 10);
                // }
                // ZoomControl.prototype = new BMap.Control();
                // ZoomControl.prototype.initialize = function(map) { // 创建一个DOM元素 
                //     var div = document.createElement("div"); // 添加文字说明 
                //     div.appendChild(document.createTextNode("放大2级")); // 设置样式 
                //     div.style.cursor = "pointer";
                //     div.style.border = "1px solid gray";
                //     div.style.backgroundColor = "white";
                //     div.setAttribute("data-id","67");
                //     div.onclick = function(e) {
                //         console.log(this.getAttribute("data-id"));
                //         map.setZoom(map.getZoom() + 2);
                //     }
                //     map.getContainer().appendChild(div);
                //     return div;
                // }
                // var myZoomCtrl = new ZoomControl();
                // map.addControl(myZoomCtrl);

                // var myIcon = new BMap.Icon("http://cdn7.dooioo.com/static/img/home/trust_2.png", new BMap.Size(100, 100), {
                //     // 指定定位位置。   
                //     // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
                //     // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
                //     // 图标中央下端的尖角位置。    
                //     offset: new BMap.Size(10, 25),
                //     // 设置图片偏移。   
                //     // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
                //     // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
                //     imageOffset: new BMap.Size(0, 0 - index * 25) // 设置图片偏移    
                // });
                // console.log(map);
                // var point = new BMap.Point(116.404, 39.915);
                // map.centerAndZoom(point, 15);
                // var marker = new BMap.Marker(point, {
                //     icon: myIcon
                // }); // 创建标注    
                // var label = new BMap.Label("我是可以拖动的，右键取消的", {
                //     offset: new BMap.Size(20, -10)
                // });
                // marker.setLabel(label);
                // map.addOverlay(marker);
                // var menu = new BMap.ContextMenu(); //右键菜单
                // var txtMenuItem = [ //右键菜单项目
                //     {
                //         text: '取消',
                //         callback: function() {
                //             map.removeOverlay(marker);


                //         }
                //     }
                // ];


                // for (var i = 0; i < txtMenuItem.length; i++) {
                //     menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100)); //菜单添加项目
                // }

                // map.addContextMenu(menu);


            },
            addMarker: function() {


            }
        }
    }
</script>