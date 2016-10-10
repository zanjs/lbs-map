<template>
    <div>
        <div class=" wrapper wrapper-content animated fadeInRight">

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>{{shopdata.title}} -- {{title}}</h5>

                            <div class="ibox-tools"></div>
                        </div>
                        <div class="ibox-content">

                            <form class="form-horizontal" @submit.prevent="createData">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">菜场名称：</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="shopdata.title" :disabled="shopdata.id">
                                        <label class="help-block error" v-if="errors">{{errors['email']}}</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">产品名称：</label>

                                    <div class="col-sm-10">
                                        <select class="form-control" id="shop_product_select" v-model="data.product_id">
                                            <option value="0">请选择</option>
                                            <option v-for="pdata in productdata" :value="pdata.id" :data-id="pdata.id" :data-price="pdata.price" >
                                                {{pdata.name}}
                                            </option>
                                        </select>
                                        <!--<label class="help-block error" v-if="errors">{{errors['city_id']}}</label>-->
                                    </div>
                                </div>
                                
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">产品价格：</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.price">
                                        <label class="help-block error" v-if="errors">{{errors['price']}}</label>
                                    </div>
                                </div>

                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">产品数量：</label>

                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="data.quantity">
                                        <label class="help-block error" v-if="errors">{{errors['quantity']}}</label>
                                    </div>
                                </div>
                                
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button type="submit" class="btn btn-primary">提交
                                        </button>
                                        <a v-link="{name:'shop_product_index'}" class="btn btn-white">取消</a>
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

    export default {
        ready: function () {
            let vm = this;
            this.data.shop_id = this.$route.params.shopid;

            this.getShopData().then(function () {

            });

            this.getProductData().then(function () {

                $('#shop_product_select').change(function() {

                    var price = $(this).children('option:selected').attr("data-price");
                    var product_id = $(this).children('option:selected').attr("data-id");
                    console.log(price);
                    vm.data.price = price;
                    vm.data.product_id = product_id;
                    console.log(vm.data.price);

                });


            });

        },
        data: function () {
            return {
                title: '产品创建',
                breadcrumbs: [
                    {
                        name: '首页',
                        url: ''
                    },
                    {
                        name: '产品创建',
                        url: ''
                    }
                ],
                shopdata:"",
                productdata:[],
                data: {
                    shop_id:"",
                    product_id:0,
                    price: '',
                    quantity: ''
                },
                errors: null
            }
        },
        methods: {
            createData: function () {
                let vm = this;
                this.$http.post('shop_product', this.data).then(function (result) {
                    let data = result.data;
                    if (data.flag == true) {
                        this.$route.router.go('/main/shop_product/'+ vm.data.shop_id); 
                    }
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                });
            },
            getShopData: function () {
                return new Promise(function (resolve, reject) {
                    this.$http.get('house/' + this.data.shop_id + '/edit').then(function (result) {
                        let data = result.data;
                        if (data.flag == true && data.data) {
                            this.shopdata = data.data;
                        }
                        this.$toast['success'](data.msg);
                        resolve(result);
                    }, function (error) {
                        reject(error);
                    });
                }.bind(this));
            },
            getProductData: function () {
                return new Promise(function (resolve, reject) {
                    this.$http.get('product').then(function (result) {
                        let data = result.data;
                        if (data.flag == true && data.data) {
                            this.productdata = data.data;
                            console.log(this.productdata)
                        }
                        this.$toast['success'](data.msg);
                        resolve(result);
                    }, function (error) {
                        reject(error);
                    });
                }.bind(this));
            }
        }
    }
</script>