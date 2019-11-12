<template>
    <div>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="模板编码">
                <el-input v-model="formInline.smsTemplateCode" placeholder="模板编码"></el-input>
            </el-form-item>
            <el-form-item label="模板类型">
                <el-select placeholder="模板类型" v-model="formInline.smsChannel" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','strategyChannel')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="formInline.receiverPhone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="log_query">查询</el-button>
                <el-button type="danger" @click="reset_query">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.content" border height="700px" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="smsTemplateCode" label="模板编码"  align="center"></el-table-column>
            <el-table-column label="模板类型" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.smsChannel,'strategyChannel').label}}
                </template>
            </el-table-column>
            <el-table-column prop="receiverPhone" label="收信人手机号"  align="center"></el-table-column>
            <el-table-column label="发送状态" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.status,'sendStatus').label}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    {{library.dateFormat(scope.row.createTime*1000,'yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="修改时间" width="180" align="center">
                <template slot-scope="scope">
                    {{library.dateFormat(scope.row.modifyTime*1000,'yyyy-MM-dd hh:mm:ss')}}
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
        this.log_query()
    },
    methods:{
        reset_query(){
            this.page=1,
            this.pageSize=50, 
            this.formInline={
                smsTemplateCode:'',
                smsChannel:'',
                receiverPhone:'',
                status:'',
                createTime:'',
                modifyTime:'',
            }
            this.log_query()
        },
        log_query(){
            let data={page:this.page,pageSize:this.pageSize}
            this.httpRequest.post(
                this.URL.log_query,
                Object.assign(data,this.formInline)
            ).then(res=>{
                if(res.data.data){
                    this.tableData=res.data.data
                }else{
                    this.tableData=""
                }
                this.$forceUpdate()
            })
        },
        onSubmit(){

        },
        onAdd(){

        },
        handleSizeChange(val) {  
            this.pageSize=val
            this.log_query()
        },
        handleCurrentChange(val) {
            this.page=val
            this.log_query()
        },
    }

}
</script>