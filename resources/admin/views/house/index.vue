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

                            <!--<data-table :data="data" :columns="columns"></data-table>

                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="pull-right">
                                        <pagination :count="count" :page="page" :page-size="pageSize"></pagination>
                                    </div>
                                </div>
                            </div>-->
                            <data-tables :data="data" :data-table="tableData"></data-tables>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import BreadCrumb from '../partial/bread-crumb';
    import DataTable from '../../components/data-table';
    import DataTables from '../../components/data-tables';
    import Pagination from '../../components/pagination';

    export default {
        ready: function() {
            this.getData();
        },
        data: function() {
            return {
                title: '菜场列表',
                breadcrumbs: [{
                    name: '首页',
                    url: ''
                }, {
                    name: '菜场列表',
                    url: ''
                }],
                page: 1,
                pageSize: 1000,
                count: 0,
                data: [],
                columns: {
                    id: '#',
                    title: '标题',
                    address: '地址',
                    description: '联系方式',
                    status: ['状态', 'name']
                },
                tableData: {
                    options: {
                        //Global sort option
                        sortable: true,
                        //Global edit option
                        //How many items will be shown in each page
                        pageCount: 10
                    },

                    columns: [{
                        value: 'id',
                        text: 'ID',
                        //If this column is sortable
                        sortable: true
                    }, {
                        value: 'title',
                        text: '标题',
                        //If this column is sortable
                        sortable: true
                    }, {
                        value: 'address',
                        text: '地址',
                        //If this column is sortable
                        sortable: true
                    }, {
                        value: 'description',
                        text: '联系方式',
                        //If this column is sortable
                        sortable: true
                    }, {
                        value: 'status',
                        text: '状态',
                        //If this column is sortable
                        sortable: true
                    }],

                    rows: []
                }

            }
        },
        components: {
            'bread-crumb': BreadCrumb,
            'data-table': DataTable,
            'data-tables': DataTables,
            'pagination': Pagination
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

                    this.count = data.count;
                    this.onDataTable();
                });
            },
            onDataTable: function() {
                let vm = this;
                let data = vm.data;
                let len = data.length;

                let tdata = [];

                for (var i = 0; i < len; i++) {
                    let obj = {
                        id: {
                            value: data[i].id,
                            editable: false
                        },

                        title: {
                            value: data[i].title,
                            editable: false
                        },

                        address: {
                            value: data[i].address,
                            editable: false
                        },

                        description: {
                            value: data[i].description,
                            editable: false
                        },

                        status: {
                            value: data[i].status.name,
                            editable: false
                        }
                    }

                   

                    tdata.push(obj)
                };
                

                vm.tableData.rows = tdata;

            }
        },
        events: {
            onEdit: function(id) {
                this.$route.router.go({
                    name: 'post_edit',
                    params: {
                        id: id
                    }
                })
            },
            onDelete: function(id) {
                this.$http.delete('house/' + id).then(function(result) {
                    let data = result.data;
                    if (data.flag == true) {
                        this.getData();
                    }
                    this.$toast['success'](data.msg);
                });
            },
            onChangePage: function(page) {
                this.page = page;
                this.getData();
            },

            onSearch: function(text) {
                console.log(text);
            }
        }
    }
</script>