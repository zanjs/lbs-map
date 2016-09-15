<style>
    .nav > li > a.v-link-active {
        color: #fff;
    }

    body.mini-navbar .nav-header {
        background: none;
    }
</style>
<template>
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <img :src="admin.image" class="img-circle" width="60">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="block m-t-xs">
                                <strong class="font-bold">{{admin.name}}</strong>
                                <b class="caret"></b>
                            </span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a v-link="{name: 'admin_edit', params: {id: admin.id}}">个人资料</a></li>
                            <li class="divider"></li>
                            <li><a @click.prevent="logout">退出</a></li>
                        </ul>
                    </div>
                    <!--  <div class="logo-element">
                         LV
                     </div> -->
                </li>
            </ul>
            <ul class="nav" v-menu>
                <li class="active">
                    <a v-link="{name:'dashboard'}">
                        <i class="fa fa-th"></i>
                        <span class="nav-label">首页</span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="fa fa-sitemap"></i>
                        <span class="nav-label">城市</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li><a v-link="{name:'city_index'}">城市列表</a></li>
                        <li><a v-link="{name:'city_create'}">城市添加</a></li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i class="fa fa-files-o"></i>
                        <span class="nav-label">小区</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li><a v-link="{name:'post_index'}">小区列表</a></li>
                        <li><a v-link="{name:'post_create'}">小区添加</a></li>
                    </ul>
                </li>
                 <li>
                    <a>
                        <i class="fa fa-leaf"></i>
                        <span class="nav-label">状态</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li><a v-link="{name:'status_index'}">状态列表</a></li>
                        <li><a v-link="{name:'status_create'}">状态添加</a></li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i class="fa fa-user"></i>
                        <span class="nav-label">管理员</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li><a v-link="{name:'admin_index'}">管理员列表</a></li>
                        <li><a v-link="{name:'admin_create'}">管理员添加</a></li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i class="fa fa-map-marker"></i>
                        <span class="nav-label">地图展示</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li><a v-link="{name:'mappc'}">地图管理</a></li>
                        <li><a href="/m.html">地图管理</a></li>
        
                    </ul>
                </li>
            </ul>

        </div>
    </nav>
</template>

<script>
    import AuthMixin from '../../mixins/auth';

    export default {
        props: ['admin'],
        mixins: [AuthMixin]
    }
</script>