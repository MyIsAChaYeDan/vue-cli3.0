<template>
    <div>
        <el-form :model="formInline" class="login-form" label-width="70px">
            <el-form-item label="登录名：">
                <el-input v-model="formInline.username" placeholder="登录名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input v-model="formInline.password" type="password" placeholder="密码" clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin">登录</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'Login',
    data(){
        return{
            formInline:{
                username:'user',
                password:'123456',
            }
        }
    },
    created(){
    },
    methods:{
        onLogin(){
            this.httpRequest.post(
                this.URL.login,
                this.formInline
            ).then(res=>{
                if(res.data.data){
                    this.$router.replace({path:'/layout',query:{status:true}})
                    this.$store.commit('changeToken',res.data.data.authorization)
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }
    }
}
</script>
<style>
.login-form{
    width: 300px;
    display: block;
    margin: 0 auto;
    border: 2px solid #409EFF;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:50px 30px;
    text-align: center;
    border-radius:8px;
}
.login-form .el-form-item__content{
    text-align: left;
}
</style>