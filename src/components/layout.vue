<template>
    <div class="layout">
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="defaultArray" :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="rgb(191, 203, 217)" active-text-color="#409eff">
                    <el-submenu :index="item.meta.code" v-for="(item,index) in routes" :key="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.meta.title}}</span>
                        </template>
                        <el-menu-item-group v-if="item.children">
                            <el-menu-item :index="childItem.meta.code" v-for="(childItem,childIndex) in item.children" :key="childIndex" @click="changeRouter(childItem)" v-show="!childItem.hidden">
                                {{childItem.meta.title}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="index">{{item.meta.title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-button type="danger" size="small" @click="outLogin" plain>退出登录</el-button>
                    </el-header>
                <el-main>
                    <router-view :key="$route.name"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    name:'layout',
    data(){
        return{
            routes:this.$router.options.routes[0].children,
            breadcrumbData:[],
            defaultArray:[],
            defaultActive:'',
        }
    },
    created(){
        if(this.$route.query.status){
            this.$router.push('/strategyManageList')
        }
        this.defaultRoute(this.$route)
    },
    methods:{
        outLogin(){
            this.$store.commit('changeToken','')
            this.$router.replace('/')
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        changeRouter(childItem){
            this.$router.push(childItem.path)
        },
        defaultRoute(to){
            this.breadcrumbData=to.matched
            this.defaultArray=[]
            if(to.meta.code){
                this.defaultArray.push(to.meta.code.split('-')[0])
            }
            this.defaultActive=to.meta.code
        }
    },
    watch:{
        $route(to, from) {
            this.defaultRoute(to)
        }
    }
}
</script>
<style scoped>
.layout{
    position: fixed;
    width: 100%;
    height: 100%;
}
.el-container{
    width: 100%;
    height: 100%;
}
.el-header, .el-footer {
    position: relative;
    z-index: 100;
    min-width: 1032px;
    overflow: hidden;
    background: #fff;
    text-align: center;
    line-height: 60px;
    -webkit-box-shadow: 0 1px 3px rgba(26,26,26,.1);
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background-clip: content-box;
}
.el-header .el-button{
    position: absolute;
    right: 60px;
    margin-top: 14px;
}
.el-aside {
    background-color: #545c64;
    color: #fff;
    text-align: center;
    height: 100%;
}
.el-main {
    background-color: #fff;
    color: #333;
    /* text-align: center; */
}
.el-menu{
    border-right: none;
    text-align: left;
}
.el-breadcrumb{
    position: absolute;
    height: 60px;
    line-height: 60px;
}
.el-submenu .el-menu-item{
    background-color: #1f2d3d!important;
}
</style>
<style>
.el-menu-item-group__title{
    display: none;
}
.el-breadcrumb__inner{
    color: #F56C6C!important;
}
</style>