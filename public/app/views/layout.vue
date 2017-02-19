<template>
    <div id="app-box">
        <router-view></router-view>
    </div>
</template>

<script>
    import auth from '../lib/auth';
    import Bottom from './partial/bottom';

    export default {
        ready: function () {
            let vm = this;
            let local_admin = auth.user;
            if (local_admin) {
                vm.admin = local_admin;
            } else {
                let token = auth.getToken();
                vm.$http.get('admin_info', {token: token}).then(function (result) {
                    let data = result.data;
                    if (data.flag == true && data.data) {
                        vm.admin = data.data;
                    }else{
                         vm.$route.router.go('/login');
                    }
                    vm.$toast['success'](data.msg);
                });
            }
        },
        data: function () {
            return {
                admin: {}
            }
        },
        components: {
            bottom: Bottom
        }
    }
</script>