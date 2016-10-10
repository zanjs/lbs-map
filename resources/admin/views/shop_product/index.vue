<template>
    <div>

        <!--<bread-crumb :title="title" :paths="breadcrumbs"></bread-crumb>-->

        <div class=" wrapper wrapper-content animated fadeInRight">

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>{{shopdata.title}} -- {{title}} </h5>
                            <a v-link="{name:'shop_product_create'}" class="fr">添加</a>
                            <div class="ibox-tools"></div>
                        </div>
                        <div class="ibox-content">

                            <data-table :data="data" :columns="columns"></data-table>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="pull-right">
                                        <pagination :count="count" :page="page" :page-size="pageSize"></pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>
<style lang="stylus">
.fr
    float right
</style>
<script>

    import DataTable from '../../components/data-table';
    import Pagination from '../../components/pagination';

    export default {
        ready: function () {
            let vm = this;
            this.shop_id = this.$route.params.shopid;
            this.getShopData().then(function () {
               
            });

             vm.getData();
         
        },
        data: function () {
            return {
                title: '产品列表',
                breadcrumbs: [
                    {
                        name: '首页',
                        url: ''
                    },
                    {
                        name: '产品列表',
                        url: ''
                    }
                ],
                shop_id:"",
                shopdata:{},
                page: 1,
                pageSize: 15,
                count: 0,
                data: [

                ],
                columns: {
                    id: '#',
                    product: ['产品名称', 'name'],
                    quantity: '数量',
                    price: '价格'
                }

            }
        },
        components: {

            'data-table': DataTable,
            'pagination': Pagination
        },
        methods: {
            getData: function () {
                this.$http.get('shop_product', { 
                    shop_id : this.shop_id,
                    page: this.page,
                    page_size: this.pageSize
                }).then(function (result) {
                    let data = result.data;
                    this.data = data.data;
                    this.count = data.count;
                });
            },
            getTest1:function () {
                console.log(this.shop_id);
                alert("1");
            },
            getShopData: function () {
                
                return new Promise(function (resolve, reject) {
                    this.$http.get('house/' + this.shop_id + '/edit').then(function (result) {
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