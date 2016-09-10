<!DOCTYPE html>
<html>
    <head>
        <title>lbs map</title>
        <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=0GzAkQ2AYYguKoMxgerY6hemo6kVC6XN"></script>
        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
            #allmap{
                width:300px;
                height:300px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <!--<div class="title">hello</div>-->
                <input type="text" value="" id="addrress">
                <div id="allmap" ></div>
            </div>
        </div>
    </body>
</html>
<script type="text/javascript" src="/libs/d.js"></script>
<script type="text/javascript">
	// 

    function newMap(){
        
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint("北京市海淀区上地10街", function(point){
            if (point) {
                console.log(point)
              
            }else{
                alert("您选择地址没有解析到结果!");
            }
        }, "北京市");

    }

    newMap()
	
</script>
