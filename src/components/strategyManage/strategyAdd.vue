<template>
    <div>
        <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="180px">
            <el-form-item label="策略编码" prop="strategyCode">
                <el-select placeholder="策略编码" v-model="formInline.strategyCode" :disabled="status" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','strategyCode')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="权重占比" prop="channelWeightPercentage" v-if="formInline.strategyCode=='WEIGHT'">
                <el-input v-model="formInline.channelWeightPercentage" type="number" max='100' min='0' placeholder="权重占比"></el-input>
            </el-form-item>
            <el-form-item label="渠道" prop="strategyCode">
                <el-select placeholder="渠道" v-model="formInline.channelId" width="100%" :disabled="$route.name=='strategyEdit'">
                    <el-option
                        v-for="item in library.getAtValue('allData','strategyChannel')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="渠道名称" prop="channelName">
                <el-input v-model="formInline.channelName" placeholder="渠道名称"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="策略描述" prop="strategyMsg">
                <el-input type="textarea" maxlength="20" placeholder="请输入内容(20字数)" v-model="formInline.strategyMsg"></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'strategyAdd',
    data(){
        var validateAmount = (rule, value, callback) => {
            if(value == '' || value < 0){
                callback(new Error('输入数字不能为空或者小余0，且是整数'));
            }else if(value%1!=0){
                callback(new Error('输入数字必须是整数'));
            }else if(value>100){
                callback(new Error('输入数字必须位于0~100'));
            }  else {
                callback();
            }
        };
        return{
            formInline:{
                strategyCode:this.$route.query.addType,
                channelWeightPercentage:'',
                channelId:'',
                channelName:'',
                // strategyMsg:'',
                // createUserId:'123456',
                // updateUserId:'123456',
                createTime:(new Date().getTime()/1000).toFixed(0),
                updateTime:(new Date().getTime()/1000).toFixed(0),
            },
            rules: {
                strategyCode: [{ required: true, message: '请输入策略编码', trigger: 'blur' }],
                channelWeightPercentage: [{validator:validateAmount, required: true, trigger: 'blur' }],
                channelId: [{ required: true, message: '请选择渠道', trigger: 'blur' }],
                // channelName:[{ required: true, message: '请输入渠道名称', trigger: 'blur' }],
                // strategyMsg: [{ required: true, message: '请输入策略描述', trigger: 'blur' }],
            },
            status:false
        }
    },
    created(){
        if(this.$route.query.strategyId){
            this.formInline.strategyCode=this.$route.query.strategyCode
            this.formInline.channelWeightPercentage=this.$route.query.channelWeightPercentage
            this.formInline.channelId=this.$route.query.channelId*1
            // this.formInline.strategyMsg=decodeURIComponent(this.$route.query.strategyMsg)
            // this.formInline.channelName=decodeURIComponent(this.$route.query.channelName)
            this.status=true
        }
        if(this.$route.query.addType){
            this.status=true
        }
    },
    methods:{
        onSubmit(){
            this.formInline.channelName=this.library.getAtValue(this.formInline.channelId,'strategyChannel').label
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(this.$route.query.strategyId){
                        let data={
                            strategyCode:this.formInline.strategyCode,
                            channelWeightPercentage:this.formInline.channelWeightPercentage,
                            channelId:this.formInline.channelId,
                            channelName:this.library.getAtValue(this.formInline.channelId,'strategyChannel').label,
                            // strategyMsg:this.formInline.strategyMsg,
                            strategyId:this.$route.query.strategyId,
                            updateTime:(new Date().getTime()/1000).toFixed(0),
                        }
                        this.httpRequest.post(
                            this.URL.strategy_modify,
                            data
                        ).then(res=>{
                            if(res.data.data){
                                this.$router.push('/strategyManageList')
                            }else{
                                this.$message.error(res.data.message)
                            }
                        })
                        return 
                    }
                    this.httpRequest.post(
                        this.URL.strategy_save,
                        this.formInline
                    ).then(res=>{
                        if(res.data.data){
                            this.$router.push('/strategyManageList')
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
                } else {
                }
            });
        }
    }
}
</script>
<style>
.demo-form-inline{
    width: 500px;
}
.demo-form-inline .el-form-item__content{
    text-align: left;
}
</style>