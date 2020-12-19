<template>
    <div class="list">
        <div><span>name:</span><input type="text" v-model="name">输入了：{{name}}</div>
        <div><span>passowrd:</span><input type="text" v-model="password">输入了：{{password}}</div>
        <button @click="getInfo">点击我登录</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name:'',
            password:''
        };
    },
    methods: {
        getInfo() {
            console.log(this.name,"inp数据");
            console.log(this.password,"inp数据");
        }
    },
}
</script>