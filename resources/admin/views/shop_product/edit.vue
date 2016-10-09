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

                            <form class="form-horizontal" @submit.prevent="updateData">

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">产品名称：</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.name">
                                        <label class="help-block error" v-if="errors">{{errors['name']}}</label>
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
                                    <label class="col-sm-2 control-label">产品规格：</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" placeholder="每斤,一袋，一箱" v-model="data.norm">
                                        <label class="help-block error" v-if="errors">{{errors['norm']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button type="submit" class="btn btn-primary">提交
                                        </button>
                                        <a v-link="{name:'tag_index'}" class="btn btn-white">取消</a>
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
    import FileUpload from '../../components/file-upload';
    import UploadMixin from '../../mixins/upload';
    

    export default {
        ready: function () {
            this.data.id = this.$route.params.id;
            this.$http.get('product/' + this.data.id + '/edit').then(function (result) {
                let data = result.data;
                if (data.flag == true && data.data) {
                    this.data = data.data;
                }
                this.$toast['success'](data.msg);
            })
        },
        data: function () {
            return {
                title: '产品修改',
                breadcrumbs: [
                    {
                        name: '首页',
                        url: ''
                    },
                    {
                        name: '产品修改',
                        url: ''
                    }
                ],
                categories: [],
                data: {
                    id: 0,
                    image: '',
                    name: ''
                },
                errors: null
            }
        },
        mixins: [UploadMixin],
        components: {
            'bread-crumb': BreadCrumb,
            'file-upload': FileUpload
        },
        methods: {
            updateData: function () {
                this.$http.put('product/' + this.data.id, this.data).then(function (result) {
                    let data = result.data;
                    // if (data.flag == true) {
                    //     this.$route.router.go('/main/product/index'); 
                    // }
                    if (data.errors) {
                        this.errors = data.errors;
                    }
                    this.$toast['success'](data.msg);
                });
            }
        }
    }
</script>