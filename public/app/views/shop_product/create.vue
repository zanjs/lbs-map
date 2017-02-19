<template>
    <div>
        <div class=" wrapper wrapper-content animated fadeInRight">

           

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