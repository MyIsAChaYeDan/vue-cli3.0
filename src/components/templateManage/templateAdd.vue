<template>
    <div>
        <el-form :model="formInline" :rules="rules" ref="ruleForm" class="demo-form-inline" label-width="180px">
            <el-form-item label="模板名称" prop="templateName">
                <el-input v-model="formInline.templateName" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item label="模板编码" prop="templateCode">
                <el-input v-model="formInline.templateCode" placeholder="模板编码"><template slot="prepend" v-if="!this.$route.query.templateId">SMS_</template></el-input>
            </el-form-item>
            <el-form-item label="消息类型" prop="templateBusiType">
                <el-select v-model="formInline.templateBusiType" placeholder="消息类型">
                    <el-option
                        v-for="item in library.getAtValue('allData','templateBusiType')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="模板类型" prop="templateType">
                <el-select v-model="formInline.templateType" placeholder="消息类型">
                    <el-option
                        v-for="item in library.getAtValue('allData','templateType')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="模板渠道" prop="templateChannel">
                <el-select v-model="formInline.templateChannel" placeholder="渠道">
                    <el-option
                        v-for="item in library.getAtValue('allData','strategyChannel')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item> -->
            <el-form-item label="模板内容" prop="templateContext">
                <el-input type="textarea" maxlength="100" placeholder="请输入内容" v-model="formInline.templateContext"></el-input>
            </el-form-item>
            <!-- <el-form-item label="渠道描述" prop="templateVarDesc">
                <el-input type="textarea" maxlength="100" placeholder="请输入内容(20字数)" v-model="formInline.templateVarDesc"></el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'templateAdd',
    data(){
        return{
            formInline:{
                templateName:'',
                templateCode:'',
                templateBusiType:0,
                templateType:0,
                // templateChannel:'',
                templateContext:'',
                // templateVarDesc:'',
                // createUserId:'123456',
                // updateUserId:'123456',
                createTime:(new Date().getTime()/1000).toFixed(0),
                updateTime:(new Date().getTime()/1000).toFixed(0),
            },
            rules: {
                templateName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
                templateCode: [{required: true, message: '请输入模板编码', trigger: 'blur' }],
                templateBusiType: [{ required: true, message: '请选消息类型', trigger: 'blur' }],
                templateType: [{ required: true, message: '请选模板类型', trigger: 'blur' }],
                // templateChannel: [{ required: true, message: '请选模板渠道', trigger: 'blur' }],
                templateContext: [{ required: true, message: '请输入模板内容', trigger: 'blur' }],
                // templateVarDesc: [{required: true, message: '请输入模板变量描述', trigger: 'blur' }],
            }
        }
    },
    created(){
        if(this.$route.query.templateId){
            this.template_detail()
        }
    },
    methods:{
        template_detail(){
            this.httpRequest.post(
                this.URL.template_detail,
                {templateId:this.$route.query.templateId}
            ).then(res=>{
                if(res.data.data){
                    for(var i in this.formInline){
                        this.formInline[i]=res.data.data[i]
                    }
                }
            })
        },
        onSubmit(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if(this.$route.query.templateId){
                        let data={
                            templateId:this.$route.query.templateId,
                            templateName:this.formInline.templateName,
                            templateCode:this.formInline.templateCode,
                            templateBusiType:this.formInline.templateBusiType,
                            templateType:this.formInline.templateType,
                            // templateChannel:this.formInline.templateChannel,
                            templateContext:this.formInline.templateContext,
                            // templateVarDesc:this.formInline.templateVarDesc,
                            isDel:'0',
                            // retryTime:'1',
                            updateTime:(new Date().getTime()/1000).toFixed(0),
                        }
                        this.httpRequest.post(
                            this.URL.template_modify,
                            data
                        ).then(res=>{
                            if(res.data.data){
                                this.$router.push('/templateManageList')
                            }else{
                                this.$message.error(res.data.message)
                            }
                        })
                        return 
                    }
                    let data=this.library.cloneObject(this.formInline)
                    data.templateCode="SMS_"+this.formInline.templateCode
                    this.httpRequest.post(
                        this.URL.template_save,
                        data
                    ).then(res=>{
                        if(res.data.data){
                            this.$router.push('/templateManageList')
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
<style scoped>
.demo-form-inline{
    width: 500px;
}
</style>