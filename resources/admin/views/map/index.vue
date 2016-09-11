<template>
    <div class="ju-map-wrap">
        <div class="ju-map-main">
            <div id="allmap"></div>
        </div>
        <div class="ju-map-nav" id="map-nav">

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

            $("body").on("click",".select-us li",function(e){
                console.log($(this).text());
            });

            this.MarkerList(map, 1, 1)


        },
        data: function() {
            return {
                title: '小区地图',
                status: [],
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
            MarkerList: function(map, arr, index) {
                var arr = [{
                    l: "116.417854",
                    n: "39.921988",
                    name: "xioqu1",
                    hid: "1",
                    sid: "2"
                }, {
                    l: "116.417854",
                    n: "39.891288",
                    name: "xioqu122",
                    hid: "3",
                    sid: "4"
                }]

                this.addMarker(map, arr[0]);
                this.addMarker(map, arr[1]);


            },
            getAttr: function(e, key) {
                return e.getAttribute(key);
            },
            setAttr: function(e, key, val) {
                return e.setAttribute(key, val);
            },
            updateHouseStatus: function(houseId, statusId) {

            },
            addMarker: function(map, obj) {


                var point = new BMap.Point(obj.l, obj.n);
                map.centerAndZoom(point, 15);
                var opts = {
                    position: point, // 指定文本标注所在的地理位置
                    offset: new BMap.Size(30, -30) //设置文本偏移量
                }
                var divstr = '<div class="ju-map-over" ><span>' + obj.name + '</span><p>有店</p></div>';
                var label = new BMap.Label(divstr, opts); // 创建文本标注对象 
                label.setStyle({
                    border: "none",
                    padding: "0"
                });
                label.houseId = obj.hid;
                label.statusId = obj.sid;


                // var statusMarker = function(label) {
                //     console.log(label);

                // };
                var updateLabel = function(e, ee, label) {
                    // map.removeOverlay(label); 
                    console.log(ee.x);
                    $(".select-us").remove();
                    var selectSta = '<li>有店</li><li>洽谈中</li>';
                    var ul = $('<ul></ul>'); 
                    ul.attr("class","select-us");
                    ul.css({"top":ee.y,"left":ee.x})
                    ul.html(selectSta);
                    $("body").append(ul);　　

                };


                var markerMenu = new BMap.ContextMenu();
                markerMenu.addItem(new BMap.MenuItem('修改状态', updateLabel.bind(label)));




                label.addContextMenu(markerMenu);

                map.addOverlay(label);　　　　　　　　　　
                // data["chargerMarker"] = marker; //这里很重要, 把maker对象放到缓存的data 里面  
                　　　　　　　　　　
                label.addEventListener("click", function(e) {　　　　　　　　　　　　　　　　　　　　　　　　
                    $("#map-nav").html(e.target.content);　　　　　　　　　　　　　　　　　　　　　　　　
                    console.log(this)　　
                });



            }
        }
    }
</script>