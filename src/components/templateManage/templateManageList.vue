<template>
    <div>
        <el-dialog
            title="短信模板详情"
            :visible.sync="dialogVisible"
            width="40%"
            class="dialog-template"
            append-to-body
            :before-close="handleClose">
            <div>
                <el-form class="demo-form-inline" label-width="180px">
                    <el-form-item label="模板类型：">
                        {{library.getAtValue(dialogData.templateType,'templateType').label}}
                    </el-form-item>
                    <el-form-item label="模板名称：">
                        {{dialogData.templateName}}
                    </el-form-item>
                    <el-form-item label="模板编码：">
                        {{dialogData.templateCode}}
                    </el-form-item>
                    <el-form-item label="模板内容：">
                        {{dialogData.templateContext}}
                    </el-form-item>
                    <!-- <el-form-item label="渠道描述：">
                        {{dialogData.templateVarDesc}}
                    </el-form-item> -->
                </el-form>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-form :inline="true">
            <el-form-item label="模板名称">
                <el-input v-model="formInline.templateName" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item label="模板编码">
                <el-input v-model="formInline.templateCode" placeholder="模板编码"></el-input>
            </el-form-item>
            <!-- <el-form-item label="模板渠道">
                <el-select placeholder="模板渠道" v-model="formInline.templateChannel" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','strategyChannel')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item> -->
            <el-form-item label="模板类型">
                <el-select placeholder="模板类型" v-model="formInline.templateType" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','templateType')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="消息类型">
                <el-select placeholder="消息类型" v-model="formInline.templateBusiType" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','templateBusiType')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="启用状态">
                <el-select placeholder="启用状态" v-model="formInline.isDel" width="100%">
                    <el-option
                        v-for="item in library.getAtValue('allData','delStatus')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="template_list()">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="template_list(true)">清空</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goRouter(true)">添加模板</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.list" border height="700px" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="templateName" label="模板名称" width="240"  align="center"></el-table-column>
            <el-table-column prop="templateCode" label="模板编码" width="240" align="center"></el-table-column>
            <el-table-column label="消息类型" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.templateBusiType,'templateBusiType').label}}
                </template>
            </el-table-column>
            <el-table-column label="模板类型" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.templateType,'templateType').label}}
                </template>
            </el-table-column>
            <!-- <el-table-column label="模板渠道" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.templateChannel,'strategyChannel').label}}
                </template>
            </el-table-column> -->
            <el-table-column prop="retryTime" label="重发次数" align="center"></el-table-column>
            <el-table-column prop="date" label="创建时间" width="180" align="center">
                <template slot-scope="scope">
                    {{library.dateFormat(scope.row.createTime*1000,'yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="date" label="修改时间" width="180" align="center">
                <template slot-scope="scope">
                    {{library.dateFormat(scope.row.updateTime*1000,'yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="启用状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.isDel?'停用':'启用'}}
                </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="操作人" align="center"></el-table-column>
            <el-table-column prop="date" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="template_modify(scope.row)">{{scope.row.isDel?'启用':'停用'}}</el-button>
                    <el-button type="text" @click="template_detail(scope.row)">详情</el-button>
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
    name:'templateManageList',
    data(){
        return{
            tableData:'',
            currentPage:1,
            page:1,
            pageSize:50,
            dialogVisible:false,
            dialogData:'',
            formInline:{
                templateName:'',
                templateBusiType:'',
                // templateChannel:'',
                templateType:'',
                templateCode:'',
                isDel:'',
            }
        }
    },
    created(){
        this.template_list()
    },
    methods:{
        goRouter(){
            this.$router.push(
                {
                    path:'/templateAdd',
                    query:{
                    }
                }
            )
        },
        template_list(status){
            if(status){
                this.page=1,
                this.pageSize=50,
                this.formInline={
                    templateName:'',
                    templateBusiType:'',
                    // templateChannel:'',
                    templateType:'',
                    templateCode:'',
                    isDel:'',
                }
            }
            let data={page:this.page,pageSize:this.pageSize}
            this.httpRequest.post(
                this.URL.template_list,
                Object.assign(this.formInline,data)
            ).then(res=>{
                if(res.data.data){
                    this.tableData=res.data.data
                }else{
                    this.tableData=""
                }
                this.$forceUpdate()
            })
        },
        template_modify(row){
            this.httpRequest.post(
                this.URL.template_modify,
                {
                    templateId:row.templateId,
                    isDel:row.isDel?0:1,
                    updateTime:(new Date().getTime()/1000).toFixed(0),
                }
            ).then(res=>{
                if(res.data.data){
                    this.$message.success((row.isDel?'启用':'停用')+'成功')
                    this.template_list()
                }
            })
        },
        onEdit(row){
            this.$router.push(
                {
                    path:'/templateEdit',
                    query:{
                        templateId:row.templateId,
                    }
                }
            )
        },
        template_detail(row){
            let data={
                templateType:row.templateType,
                templateName:row.templateName,
                templateCode:row.templateCode,
                templateContext:row.templateContext,
                // templateVarDesc:row.templateVarDesc,
                templateRmk:row.templateRmk,
            }
            this.dialogData=data
            this.dialogVisible=true
            this.$forceUpdate()
        },
        handleSizeChange(val) {  
            this.pageSize=val
            this.template_list()
        },
        handleCurrentChange(val) {
            this.page=val
            this.template_list()
        },
        handleClose(){
            this.dialogVisible=false
        }
    }

}
</script>
<style>
.dialog-template{
    text-align: center;
}
.dialog-template .el-form-item__content{
    text-align: left;
}
</style>