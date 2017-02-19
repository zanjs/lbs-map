<template>
    <div class="login middle-box text-center">
        <div>
            <form  role="form" onsubmit="return false">
                <div class="form-group">
                    <input type="text" 
                    class="form-control" 
                    placeholder="邮箱/用户名" 
                    required v-model="credentials.name" />
                </div>
                <div class="form-group">
                    <input type="password" 
                           class="form-control"
                           placeholder="密码" 
                           required
                           v-model="credentials.password" />
                </div>
                <button type="submit" 
                        class="btn btn-primary block full-width m-b" 
                        @click="login"
                        v-touch-ripple>登陆
                </button>
            </form>
        </div>
    </div>
</template>
<style lang="stylus">
.middle-box
    text-align:center
    max-width:360px
    margin:0 auto
.login
    position: relative
    top: 50%
    padding:0 10px
    transform: translateY(-50%)
    .form-group
        margin:10px 0
    input
        display:block
        width:100%
        border:1px solid rgb(92, 184, 95)
        line-height: 30px
        color:#FFF
        text-indent:5px
    .btn
        display:block
        width:100%
        border:none
        line-height: 30px
        color:#FFF
        background-color:rgb(92, 184, 95)
</style>
<script>

    import auth from '../lib/auth';

    export default {
        data: function () {
            return {
                credentials: {
                    name: '',
                    password: ''
                }

            };
        },
        methods: {
            login: function () {

                let vm = this;

                if(vm.credentials.name === '' || vm.credentials.name === ''){
                   return false;
                }


                 auth.login(vm, vm.credentials).then(function () {
                    vm.$route.router.go('/main/dashboard');
                    vm.$toast['success']('登陆成功');
                    }, function (error) {
                        vm.$toast['success'](error.msg);
                });
            }
        }
    }
</script>