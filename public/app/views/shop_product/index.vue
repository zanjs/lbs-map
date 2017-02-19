<template>
    <div class="shop_product">
        <div class="shop_product_header">
            <a v-link="{ name: 'dashboard'}">
                <span class="shop_black_btn left_0">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
            </a>
            {{shop.title}}
            <span class="shop_product_top right_0" 
                v-bind:class="{ 'flag_true': flag }"
                @click="flagAdd">
                <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
        </div>
        <div class="shop_product_main">
            <div class="ibox-content">
                <div class="product-count" flex="main:justify">
                    <span class="sp1">
                                补货 <i v-if="addUp">{{addUp}}</i>
                            </span>
                    <span class="sp1">
                                结账 <i v-if="outUp">{{outUp}}</i>
                            </span>
                </div>

                <div class="flex-container">
                    <table>
                        
                            <tr  v-for="product in products">
                                <td class="td1" @click="addProduct($index,product)">
                                    <a class="is-click" >
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                        <i v-if="product.add"  class="number">{{ product.add }}</i>
                                    </a>
                                </td>
                                <td class="td2">
                                    {{ product.name }}
                                </td>
                                <td class="td3">
                                    {{ product.price }} /{{ product.norm }}
                                </td>
                                <td class="td4">
                                    {{ product.reserve }}
                                </td>
                                <td class="td5" @click="outProduct($index,product)">
                                    <a class="is-click" >
                                        <i class="fa fa-chain-broken" aria-hidden="true"></i>
                                        <i v-if="product.out" class="number">- {{ product.out }} </i>
                                    </a>
                                </td>
                            </tr>
                        
                    </table>

                </div>
            </div>
            <button type="button" class="btn btn-primary jui-btn" @click="saveFrom">
                保存
             </button>
             <div class="product-time">
                 {{ anlaTime }}
             </div>
        </div>
        <div class="shop_product_footer">
            打印小票
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
            vm.winW = window.innerWidth;
            vm.nowTime();
        },
        data: function () {
            return {
                winW:320,
                addUp:0,
                outUp:0,
                shop_id:0,
                products:[],
                shop:{},
                page: 1,
                pageSize: 15,
                count: 0,
                anlaTime:'',
                flag:false,
                enime:2000,
                data: []
            }
        },
        watch: {
            products: {
                handler: function (products) {
                    this.addUpFn();
                    this.outUpFn();
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
                        // this.$toast['success'](data.msg);
                        resolve(result);
                    }, function (error) {
                        reject(error);
                    });
                }.bind(this));

            },
            nowTime:function(){
                let vm = this;
                let tm = new Date();
                let year = tm.getFullYear();
                let month = tm.getMonth();
                let day = tm.getDate();
                let hours = tm.getHours();
                let min = tm.getMinutes();
                let sec = tm.getSeconds();
                console.log(year)
                vm.anlaTime = year+'/'+ month + '/' + day + ' ' + hours + ':' + min;
                setTimeout(function(){
                    vm.nowTime();
                },30000)
            },
            dealWith: function (products,shop) {
                let vm = this;
                let leng = products.length;
                console.log(shop.products);
                let shopProduct = shop.products ? JSON.parse(shop.products) : [];
                let shopProductLeng = shopProduct.length;
                
                let newProducts = [];
                for(var i= 0 ; i< leng ;i ++){
                    let item = products[i];
                    item.add = 0;
                    item.out = 0;
                    item.reserve = 0;
                    console.log(item); 

                    for(var j=0;j<shopProductLeng;j++){
                        var jItem = shopProduct[j];
                        console.log(jItem);
                        if(jItem.id == item.id){
                            jItem.reserve ? item.reserve = jItem.reserve:"";
                        }

                    }

                    newProducts.push(item);
                }
                vm.products = newProducts;
            },
            comSetProduct:function(product){
                return {
                   add:product.add,
                   out:product.out,
                   price:product.price,
                   reserve:product.reserve,
                   norm:product.norm,
                   id:product.id,
                   name:product.name 
                }
            },
            updateReserve:function(index,product,num){
                let pro = this.products[index];
                let newPro = this.comSetProduct(pro);
                newPro.reserve = newPro.reserve +num;
                this.products.$set(index,newPro); 
            },
            addProduct:function (index,product){
                let pro = this.products[index];
                let newPro = this.comSetProduct(pro);
                newPro.add = newPro.add +1;
                newPro.reserve = newPro.reserve +1;
                this.products.$set(index,newPro); 
            },
            outProduct:function (index,product){
                let pro = this.products[index];
                let newPro = this.comSetProduct(pro);
                if(newPro.reserve > 0){
                    newPro.out = newPro.out +1;
                    newPro.reserve = newPro.reserve -1;
                    this.products.$set(index,newPro); 
                }
                
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

                

                let products = {
                    products:JSON.stringify(arr)
                }

                this.$http.put('product_shop/' + this.shop_id, products).then(function (result) {
                    let data = result.data;
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                    console.log(data);
                });
            },
            flagAdd:function(){
                let vm = this;
                vm.flag = true;
                this.$http.put('house/flag/' + this.shop_id).then(function (result) {
                    let data = result.data;
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    
                    console.log(data);
                });
                
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
