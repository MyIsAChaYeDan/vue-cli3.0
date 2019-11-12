<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="goRouter(true)">添加策略</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goRouter(false)" :disabled="!tableData||!Array.isArray(tableData.list)||tableData.list.length==0">更新策略</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData.list" border height="700px" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="strategyCode" label="策略编码"  align="center"></el-table-column>
            <el-table-column prop="strategyMsg" label="策略描述" align="center"></el-table-column>
            <!-- <el-table-column prop="channelName" label="渠道名称" align="center"></el-table-column> -->
            <!-- <el-table-column prop="date" label="渠道" width="180" align="center">
                <template slot-scope="scope">
                    {{library.getAtValue(scope.row.channelId,'strategyChannel').label}}
                </template>
            </el-table-column> -->
            <el-table-column prop="channelName" label="渠道名称"  align="center"></el-table-column>
            <el-table-column prop="channelId" label="渠道ID" align="center"></el-table-column>
            <el-table-column prop="channelWeightPercentage" label="权重占比" width="150" align="center"></el-table-column>
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
            <el-table-column label="启用状态" width="150" align="center">
                <template slot-scope="scope">
                    {{scope.row.isDel?'停用':'启用'}}
                </template>
            </el-table-column>
            <el-table-column prop="createUserName" label="操作人" align="center"></el-table-column>
            <el-table-column prop="date" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEdit(scope.row)" v-if="scope.row.strategyCode=='WEIGHT'">编辑</el-button>
                    <el-button type="text" @click="strategy_remove(scope.row)">删除</el-button>
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
    name:'strategyManageList',
    data(){
        return{
            tableData:'',
            currentPage:1,
            page:1,
            pageSize:50,
            addType:''
        }
    },
    created(){
        this.strategy_query()
    },
    methods:{
        goRouter(status){
            this.$router.push(
                {
                    path:status?'/strategyAdd':'updateStrategy',
                    query:{
                        addType:this.addType
                    }
                }
            )
        },
        strategy_query(){
            let data={page:this.page,pageSize:this.pageSize}
            this.httpRequest.post(
                this.URL.strategy_query,
                data
            ).then(res=>{
                if(res.data.data){
                    this.tableData=res.data.data
                    if(Array.isArray(this.tableData.list)&&this.tableData.list.length>0){
                        this.addType=this.tableData.list[0].strategyCode
                    }
                }else{
                    this.tableData=''
                    this.addType=''
                }
                this.$forceUpdate()
            }).catch(err=>{
                this.$forceUpdate()
            })
        },
        strategy_remove(row){
            this.httpRequest.post(
                this.URL.strategy_remove,
                {strategyId:row.strategyId}
            ).then(res=>{
                if(res.data.data){
                    this.$message.success(res.data.message)
                    this.strategy_query()
                }
            })
        },
        onEdit(row){
            this.$router.push(
                {
                    path:'/strategyEdit',
                    query:{
                        strategyCode:row.strategyCode,
                        channelWeightPercentage:row.channelWeightPercentage,
                        channelId:row.channelId,
                        // channelName:encodeURIComponent(row.channelName),
                        // strategyMsg:encodeURIComponent(row.strategyMsg),
                        strategyId:row.strategyId,
                        isDel:row.isDel
                    }
                }
            )
        },
        handleSizeChange(val) {  
            this.pageSize=val
            this.strategy_query()
        },
        handleCurrentChange(val) {
            this.page=val
            this.strategy_query()
        }
    }

}
</script>