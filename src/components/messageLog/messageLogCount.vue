<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="模板编码">
                <el-input v-model="formInline.smsTemplateCode" placeholder="模板编码"></el-input>
            </el-form-item>
            <el-form-item label="模板类型">
                <el-select v-model="formInline.smsChannel" placeholder="模板类型">
                    <el-option label="阿里云通信" :value="0"></el-option>
                    <el-option label="大汉三通" :value="1"></el-option>
                </el-select>
                
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.receiverPhone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="发送状态">
                <el-select v-model="formInline.status" placeholder="发送状态">
                    <el-option label="发送成功" :value="0"></el-option>
                    <el-option label="发送失败" :value="1"></el-option>
                    <el-option label="发送超时" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="formInline.createTime" type="date" placeholder="创建时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="修改时间">
                <el-date-picker v-model="formInline.modifyTime" type="date" placeholder="修改时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="log_count">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.list" border height="700px" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="smsTemplateCode" label="模板编码"  align="center"></el-table-column>
            <el-table-column label="模板类型" align="center">
                <template slot-scope="scope" v-if="scope.row.smsChannel">
                    {{library.getAtValue(scope.row.smsChannel,'strategyChannel').label}}
                </template>
            </el-table-column>
            <el-table-column prop="receiverPhone" label="收信人手机号"  align="center"></el-table-column>
            <el-table-column label="发送状态" align="center">
                <template slot-scope="scope" v-if="scope.row.status!=''">
                    {{library.getAtValue(scope.row.status,'sendStatus').label}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime|dateFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="修改时间" width="180" align="center">
                <template slot-scope="scope">
                    {{scope.row.modifyTime|dateFormat}}
                </template>
            </el-table-column>
        </el-table>
        <div class="footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name:'messageLogList',
    data(){
        return{
            formInline:{
                smsTemplateCode:'',
                smsChannel:'',
                receiverPhone:'',
                status:'',
                createTime:'',
                modifyTime:'',
            },
            tableData:'',
            currentPage:1,
            page:1,
            pageSize:50,
        }
    },
    created(){
        this.log_count()
    },
    methods:{
        log_count(){
            let data={page:this.page,pageSize:this.pageSize}
            this.httpRequest.post(
                this.URL.log_count,
                Object.assign(data,this.formInline)
            ).then(res=>{
                if(res.data.data){
                    this.tableData=res.data.data
                    this.$forceUpdate()
                }
            })
        },
        onSubmit(){

        },
        onAdd(){

        },
        handleSizeChange(val) {  
            this.pageSize=val
            this.log_count()
        },
        handleCurrentChange(val) {
            this.page=val
            this.log_count()
        },
    }

}
</script>