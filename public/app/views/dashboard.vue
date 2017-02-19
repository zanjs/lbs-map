
<template>
    <div class="">
        <div class="shop-title">
            <span class="fl map-lng-lat title-sp" v-touch-ripple @click="pushShopLocation()">坐标</span>
            <span class="title-sp">
                店铺管理
            </span>
            <span class="fr map-navigate title-sp" v-touch-ripple @click="openUrl()" >
                导航
            </span>
        </div>
        <div class="shop-main">
            <div class="shop-search">
                <div class="shop-add-btn"><i class="fa fa-plus" aria-hidden="true"></i></div>
                <div class="shop-searchbar">
                    <div class="shop-searchbar-input">
                        <input type="search" placeholder="搜索店铺..." v-model.trim="search" >
                    </div>
                </div>
            </div>
            
            <div class="shop-list">
                
                <div v-for="d in data " class="shop-list-child" :key="d.id"  >
                    <input class="jui-checkbox" type="radio" id="jui-{{d.id}}" name="radio-shop" v-model="goLocation"  value="{{d.latitude}},{{d.longitude}},{{d.id}}" />
                    <label for="jui-{{d.id}}"></label>
                    <span class="shop-list-title">
                        <a v-link="{ name: 'shop_product', params: { shopid: d.id }}"  >
                        {{d.title}}
                        </a>
                    </span>
                    <span class="fr shop-list-top"
                         v-bind:class="{ 'flag_true': d.flag }"
                        @click="flagAdd(d.id)" >
                        <i class="fa fa-star-o" aria-hidden="true" v-touch-ripple ></i>
                    </span>
                </div>
                
            </div>
            <div class="hidden" id="m-map"></div>
        </div>
        <div class="getLoading" v-if="isloading">
            <div class="loading-text">
                {{ loadingText }}
            </div>
        </div>
    </div>
</template>
<script>
import Device from 'device.js';


export default {
        ready: function () {
            let map = new AMap.Map('m-map', { resizeEnable: true});
            window.map = map;
            this.getData();
            
        },
        watch:{
            'search': {
                handler: function (val, oldVal) {
                   this.filterData();
                },
                immediate: true,
                deep: true
            }
        },
        data: function () {
             return {
                page: 1,
                isloading:false,
                loadingText:'',
                pageSize: 1000,
                count: 0,
                search:'',
                onId:'',
                goLocation:'',
                onlocation:{
                    latitude:'',
                    longitude:''
                },
                searchData:[],
                data: [],

            }
        },
        components: {
            
        },
        methods: {
            getData: function() {
                var vm = this;
                this.$http.get('house', {
                    page: this.page,
                    page_size: this.pageSize
                }).then(function(result) {
                    let data = result.data;
                    let datas = data.data;
                    this.data = datas;
                    this.searchData = datas;

                    this.count = data.count;
                    this.onDataTable();
                });
            },
            getMyLocation:function(){
                let vm = this;
                map.plugin('AMap.Geolocation', function() {
                    let geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        buttonPosition:'RB'
                    });
                    map.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', function(data){
                        let posi = {
                            latitude:data.position.getLat(),
                            longitude:data.position.getLng()
                        }
        
       
                        if(!data){
                            vm.isloading = false;
                            return;
                        }
                        
                        vm.getLocaAddress(posi)
               
                       
                    }); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', function(msg){
                        vm.loadingText = '获取坐标失败...';
                        console.log(msg);
                    });      //返回定位出错信息
                });
                
            },
            getLocaAddress:function(data){
                console.log(data);
                let vm = this;
                let lat = data.latitude;
                let lng = data.longitude;
                let lnglatXY = [lng, lat]; //已知点坐标
                 //逆地理编码
                let geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all"
                });
                vm.loadingText = '坐标转码中...';       
                geocoder.getAddress(lnglatXY, function(status, result) {
                    
                    if (status === 'complete' && result.info === 'OK') {
                        let address = result.regeocode.formattedAddress; //返回地址描述
                        console.log(address)
                        vm.saveShopLocation(data);
                    }else{
                        vm.isloading = false;
                        vm.$toast['success']('转码失败,请稍后重试');
                        console.log('转码失败,请稍后重试')
                    }

                });        

            },
            pushShopLocation:function(){
                let vm = this;

                if(!vm.getRadioV()){
                    return false;
                }

                vm.isloading = true;
                vm.loadingText = '获取定位坐标中...';
                vm.getMyLocation();

            },
            saveShopLocation:function(obj){
                let vm = this;
                vm.isloading = true;
                vm.loadingText = '正在提交保存';
                let shopId = vm.getRadioV().id;
                let data = {
                    latitude:obj.latitude,
                    longitude:obj.longitude,
                    address:'nihao text address'
                }

                this.$http.put('location/' + shopId, data).then(function (result) {
                    vm.isloading = false;
                    let data = result.data;
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                    console.log(data);
                });
            },
            getRadioV:function(){
                let vm = this;
                let location = vm.goLocation;
                if(!location){
                    return false;
                }

                let newArr = location.split(",");
  
                return {
                    lat:newArr[0],
                    lng:newArr[1],
                    id:newArr[2],
                }

            },
            clickNavigation:function(){
                let url = '';

                let vm = this;

                if(!vm.getRadioV()){
                    return false;
                }
    
                let lat = vm.getRadioV().lat;
                let lng = vm.getRadioV().lng;
      
                if(Device().ios()){
                    url = 'iosamap://navi?sourceApplication=applicationName&backScheme=applicationScheme&poiname=fangheng&poiid=BGVIS&lat='+ lat +'&lon='+ lng +'&dev=1&style=2';
                }
                if(Device().android()){
                    url = 'androidamap://navi?sourceApplication=appname&poiname=fangheng&lat='+ lat +'&lon='+ lng +'&dev=1&style=2';
                }
                return url;
            },
            openUrl:function(){
                let vm = this;
                let url = vm.clickNavigation();

                if(url){
                    console.log(url);
                    window.open(url);
                }
            },
            onDataTable: function() {
                let vm = this;
                let data = vm.data;
                let len = data.length;

            },
            filterData:function(){
                let vm = this;
                let skey = vm.search.replace(/(^\s*)|(\s*$)/g, "");
                let data = vm.searchData;
                let leng = data.length;
                if(!skey){
                    vm.data = data;
                    return
                };
                let newData = [];
                let rep = new RegExp(skey);

                for(var i=0;i<leng;i++){
                    let item = data[i];
                    if(rep.test(item.title) || rep.test(item.number) || rep.test(item.address) || rep.test(item.description)){
                        newData.push(item);
                    }
                }

                vm.data = newData;
            },
            flagAdd:function(shop_id){
                let vm = this;
                this.$http.put('house/flag/' + shop_id).then(function (result) {
                    let data = result.data;
                    if (data.errors) {
                        this.errors = data.errors;
                        return
                    }
                    vm.getData();
                    console.log(data);
                });

            }
        }
    }
</script>
