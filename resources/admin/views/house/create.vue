<template>
    <div>

        <bread-crumb :title="title" :paths="breadcrumbs"></bread-crumb>

        <div class=" wrapper wrapper-content animated fadeInRight">

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>{{title}}</h5>

                            <div class="ibox-tools"></div>
                        </div>
                        <div class="ibox-content">

                            <form class="form-horizontal" @submit.prevent="createData">

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场名称：</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.title">
                                        <label class="help-block error" v-if="errors">{{errors['title']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场城市：</label>

                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="data.city_id">
                                            <option value="0">请选择</option>
                                            <option v-for="city in citys" :value="city.id">
                                                {{city.name}}
                                            </option>
                                        </select>
                                        <label class="help-block error" v-if="errors">{{errors['city_id']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场状态：</label>

                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="data.status_id">
                                            <option value="0">请选择</option>
                                            <option v-for="sta in status" :value="sta.id">
                                                {{sta.name}}
                                            </option>
                                        </select>
                                        <label class="help-block error" v-if="errors">{{errors['status_id']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场地址：</label>
                                    <div class="col-sm-10">
                                        <input type="text" @blur="onBlurMap"  class="form-control" v-model="data.address">
                                        <label class="help-block error" v-if="errors">{{errors['addrsss']}}</label>
                                    </div>
                                </div>
                                <!--<div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">纬度：</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.latitude">
                                        <label class="help-block error" v-if="errors">{{errors['latitude']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">经度：</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.longitude">
                                        <label class="help-block error" v-if="errors">{{errors['longitude']}}</label>
                                    </div>
                                </div>-->
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">联系方式：</label>

                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="data.description"></textarea>
                                        <label class="help-block error" v-if="errors">{{errors['description']}}</label>
                                    </div>
                                </div>
                                <!--<div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场内容：</label>

                                    <div class="col-sm-10">
                                        <editor :model.sync="data.content"></editor>
                                        <label class="help-block error" v-if="errors">{{errors['content']}}</label>
                                    </div>
                                </div>-->
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button type="submit" class="btn btn-primary">提交
                                        </button>
                                        <a v-link="{name:'post_index'}" class="btn btn-white">取消</a>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>

    import BreadCrumb from '../partial/bread-crumb';
    import Editor from '../../components/editor';

    import '../../assets/js/plugins/select2/select2.css';
    import '../../assets/js/plugins/select2/select2';

    export default {
        ready: function () {
            let vm = this;
            this.$http.get('house/create').then(function (result) {
                let data = result.data;
                if (data.flag == true) {
                    this.citys = data.citys;
                    // this.tags = data.tags;
                    this.status = data.status;
                    console.log( this.status)
                }
            });
        },
        data: function () {
            return {
                title: '菜场创建',
                breadcrumbs: [
                    {
                        name: '首页',
                        url: ''
                    },
                    {
                        name: '菜场创建',
                        url: ''
                    }
                ],
                status:[],
                citys: [],
                tags: [],
                data: {
                    title: '',
                    city_id: 0,
                    status_id:1,
                    geohash:'',
                    address:'',
                    latitude:'',
                    longitude:'',
                    cityName:'',
                    description: '',
                    tags: [],
                    tagIds: [],
                    content: ''
                },
                errors: null
            }
        },
        components: {
            'bread-crumb': BreadCrumb,
            'editor': Editor
        },
        methods: {
             getCityInfo:function(cid){
                 let citys = this.citys;
                 for(var i = 0, len = citys.length; i < len; i++){
                     if(citys[i].id == cid ){

                         return citys[i];
                     }
                 }
                 
                 return false;
             },
             getGohash:function(latitude,longitude){
                 let vm = this;
                 this.$http.get('/fend/map/geohash/'+ latitude+'/'+ longitude).then(function (result) {
                    let data = result.data;
                    if (data.flag == true) {
                        vm.data.geohash = data.data;
                        console.log( data.data)
                    }
                });
             },
             onBlurMap:function(){
                let vm = this;
                
                console.log(this.data.address);
                let data = this.data;
                let address = this.data.address;
                let cityName = this.getCityInfo(data.city_id);
                cityName ? "" : cityName = "无锡";
                // 创建地址解析器实例
                let myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野  
                console.log(cityName);
                console.log(data.city_id);
                
                myGeo.getPoint(address, function(point){
                    if (point) {
                        console.log(point)
                        data.latitude = point.lat;
                        data.longitude = point.lng;
                        vm.getGohash(point.lat,point.lng);
                    }else{
                        alert("您选择地址没有解析到结果");
                    }
                }, cityName);
            },
            createData: function () {
                this.$http.post('house', this.data).then(function (result) {
                    let data = result.data;
                    if (data.flag == true) {
                        this.$route.router.go('/main/house/index');
                    }
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                });
            }
        }
    }
</script>