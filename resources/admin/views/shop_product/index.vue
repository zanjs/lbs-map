<template>
    <div>
        <div class=" wrapper wrapper-content animated fadeInRight">

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>{{shop.title}} -- {{title}} </h5>
                            
                            <div class="ibox-tools">
                               
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="product-count">
                                <span class="sp1">
                                    补货 {{addUp}}
                                </span>
                                <span  class="sp1">
                                    结账 {{outUp}}
                                </span>
                            </div>
                            <div v-for="product in products">
                            <div class="flex-container">
                                <span class="flex-1">
                                    <a class="is-click"  @click="addProduct($index,product)"> 
                                        <i class="fa fa-plus" aria-hidden="true"></i> 
                                        <i v-if="product.add">{{ product.add }}</i>
                                    </a>
                                </span>
                                <span class="flex-1">
                                    {{ product.name }}
                                </span>
                                <span class="flex-1">
                                    {{ product.price }}
                                </span>
                                <span class="flex-1">
                                    <a  class="is-click" @click="outProduct($index,product)">
                                        <i class="fa fa-chain-broken" aria-hidden="true"></i>
                                        <i v-if="product.out"> {{ product.out }} </i>
                                    </a>
                                </span>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="col-lg-12 col-sm-4 col-sm-offset-2">
                    <button type="button" class="btn btn-primary" @click="saveFrom" >
                        保存
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import Product from './product';

    export default {
        ready: function () {
            let vm = this;
            this.shop_id = this.$route.params.shopid;
            this.getProductData().then(function () {
            });
         
        },
        data: function () {
            return {
                title: '产品列表',
                addUp:0,
                outUp:0,
                products:[],
                shop:{},
                page: 1,
                pageSize: 15,
                count: 0,
                data: []
            }
        },
        watch: {
            products: {
                handler: function (products) {
                    this.addUpFn();
                },
                deep: true
            }
        },
       components: {
            'product': Product
        },
        methods: {
            getProductData: function (){
                let vm = this;
                return new Promise(function (resolve, reject) {
                    this.$http.get('product_shop/' + this.shop_id).then(function (result) {
                        let data = result.data;
                        if (data.flag == true) {
                            this.products = data.products;
                            this.shop = data.shop;
                            vm.dealWith(data.products,data.shop);
                            console.log(data)
                        }
                        this.$toast['success'](data.msg);
                        resolve(result);
                    }, function (error) {
                        reject(error);
                    });
                }.bind(this));

            },
            dealWith: function (products,shop) {
                let vm = this;
                let leng = products.length;
                console.log(products)
                let newProducts = [];
                for(var i= 0 ; i< leng ;i ++){
                    let item = products[i];
                    item.add = 0;
                    item.out = 0;
                    console.log(item); 
                    newProducts.push(item);
                }
                vm.products = newProducts;
            },
            comSetProduct:function(product){
                return {
                   add:product.add,
                   out:product.out,
                   price:product.price,
                   name:product.name 
                }
            },
            addProduct:function (index,product){
                let pro = this.products[index];
                let newPro = this.comSetProduct(pro);
                newPro.add = newPro.add +1;
                this.products.$set(index,newPro); 
            },
            outProduct:function (index,product){
                let pro = this.products[index];
                let newPro = this.comSetProduct(pro);
                newPro.out = newPro.out +1;
                this.products.$set(index,newPro); 
            },
            addUpFn:function(){
                let vm = this;
                let products = vm.products;
                let leng = products.length;
                console.log(leng);
                let addPrice = 0;
                for(var i=0;i<leng;i++){
                    addPrice += products[i].add * products[i].price;
                }

                vm.addUp = addPrice;
            },
            outUpFn:function(){
                let vm = this;
                let products = vm.products;
                let leng = products.length;
           
                let addPrice = 0;
                for(var i=0;i<leng;i++){
                    addPrice += products[i].out * products[i].price;
                }

                vm.outUp = addPrice;
            },
            saveFrom:function(){
                let vm = this;
                let pros = vm.products;
                let leng = pros.length;
                let arr = [];

                for(var i=0;i<leng;i++){
                    arr.push(vm.comSetProduct(pros[i]));
                }

                console.log(arr);

            }
        },
        events: {
            onEdit: function (id) {
                this.$route.router.go({name: 'shop_product_edit', params: {id: id}})
            },
            onDelete: function (id) {
                this.$http.delete('shop_product/' + id).then(function (result) {
                    let data = result.data;
                    if (data.flag == true) {
                        console.log()
                        this.getData();
                    }
                    this.$toast['success'](data.msg);
                });

                return false;
            }
        }
    }
</script>
<style lang='stylus'>
.product-count
    display: flex
    flex: 1
    .sp1
        flex: 1
.flex-container
    display: flex
    .flex-1
        margin:10px 0
        -webkit-flex: initial
        flex: initial
        width: 200px
        min-width: 80px
</style>