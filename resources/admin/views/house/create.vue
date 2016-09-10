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
                                    <label class="col-sm-2 control-label">小区名称：</label>

                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="data.title">
                                        <label class="help-block error" v-if="errors">{{errors['title']}}</label>
                                    </div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区城市：</label>

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
                                    <label class="col-sm-2 control-label">小区状态：</label>

                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="data.status">
                                            <option value="0">请选择</option>
                                            <option v-for="sta in status" :value="sta.id">
                                                {{sta.name}}
                                            </option>
                                        </select>
                                        <label class="help-block error" v-if="errors">{{errors['status']}}</label>
                                    </div>
                                </div>
                                <!--<div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区标签：</label>

                                    <div class="col-sm-10">
                                        <select class="form-control" id="select2" multiple="multiple" style="display: none;">
                                            <option v-for="tag in tags" :value="tag.id">
                                                {{tag.name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>-->
                                <div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区描述：</label>

                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="data.description"></textarea>
                                        <label class="help-block error" v-if="errors">{{errors['description']}}</label>
                                    </div>
                                </div>
                                <!--<div class="hr-line-dashed"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区内容：</label>

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
                    this.tags = data.tags;
                    this.status = data.status;
                    console.log( this.status)
                }
            });


            // $('#select2').select2({
            //     placeholder: '选择标签',
            //     tags: true
            // }).on('change.select2', function () {
            //     vm.data.tagIds = ($('#select2').val());
            // }).trigger('change');
        },
        data: function () {
            return {
                title: '小区创建',
                breadcrumbs: [
                    {
                        name: '首页',
                        url: ''
                    },
                    {
                        name: '小区创建',
                        url: ''
                    }
                ],
                status:[],
                citys: [],
                tags: [],
                data: {
                    title: '',
                    city_id: 0,
                    cityName:'',
                    status:1,
                    tagIds: [],
                    description: '',
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