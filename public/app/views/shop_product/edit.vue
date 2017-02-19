<template>
    <div class="shop_product">
        <div class="shop_product_header">
            <a v-link="{ name: 'dashboard'}">
                <span class="shop_black_btn left_0">
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
            </a>
            {{shopdata.title}}
            <span class="shop_product_top right_0">
                <i class="fa fa-star-o" aria-hidden="true"></i>
            </span>
        </div>
        <div class="shop_product_main">
            <div flex="cross:stretch">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    ready: function () {
        
        this.data.shop_id = this.$route.params.id;
        console.log(this.data.shop_id)


        this.getShopData().then(function () {

        });

        // this.getData();
        
    },
    data: function () {
        return {
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
        getData:function(){
            this.$http.get('shop_product/' + this.data.shop_id + '/edit').then(function (result) {
                let data = result.data;
                if (data.flag == true && data.data) {
                    this.data = data.data;
                }
                
            })
        },
        updateData: function () {
            this.$http.put('shop_product/' + this.data.id, this.data).then(function (result) {
                let data = result.data;
                // if (data.flag == true) {
                //     this.$route.router.go('/main/product/index'); 
                // }
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