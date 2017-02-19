<template>
    <div class="flex-container">
        <span class="flex-1">
            <a class="is-click"  @click="addProduct"> 
                <i class="fa fa-plus" aria-hidden="true"></i> {{ product.add }} 
            </a>
        </span>
        <span class="flex-1">
            {{ product.name }}
        </span>
        <span class="flex-1">
            {{ product.price }}
        </span>
        <span class="flex-1">
            <a href="javascript:void(0);" class="is-click" >
                <i class="fa fa-chain-broken" aria-hidden="true"></i> 
                {{ product.out }} 
            </a>
        </span>
    </div>
</template>
<script>
    module.exports = {
        props:[
            'product'
        ],
        data: function (){
            return {
                numbe: 0
            }
        },
        methods:{
            addProduct:function (){
                this.product.$set(0, { add: 122}); 
            }
        }
    }
</script>
<style lang='stylus'>
/*.flex-container
    display: flex
    .flex-1
        margin:10px 0
        -webkit-flex: initial
        flex: initial*/
</style>