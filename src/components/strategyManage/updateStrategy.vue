<template>
    <div>
        <el-form class="updata-form" label-width="300px">
            <el-form-item label="批量更新策略编码：">
                <el-radio-group v-model="formInline.strategyCode">
                    <el-radio
                        v-for="item in library.getAtValue('allData','strategyCode')"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    >
                    {{item.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="渠道：" v-if="formInline.strategyCode=='FIXED'" key="1">
                <el-select v-model="formInline.fixed" placeholder="渠道">
                    <el-option
                        v-for="item in strategyChannelData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="渠道：" v-if="formInline.strategyCode=='RANDOM'" key="2">
                <el-select v-model="formInline.random" placeholder="渠道" multiple collapse-tags>
                    <el-option
                        v-for="item in strategyChannelData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="渠道：" v-if="formInline.strategyCode=='ROUND'" key="3">
                <el-select v-model="formInline.round" placeholder="渠道" multiple collapse-tags>
                    <el-option
                        v-for="item in strategyChannelData"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="渠道权重配置：" v-if="formInline.strategyCode=='WEIGHT'">
                <!-- 当前权重总和：{{this.sum}} -->
                <ul class="updata_ul">
                    <li v-for="(item,index) in weightArray" :key="index">
                       <el-input v-model="item.key" type="number" min="0" max="100" @blur="changeWeight(item.key,index)" placeholder="权重占比(0%~100%)"><template slot="append">%</template></el-input>
                       &nbsp;<i class="el-icon-arrow-right"></i><span>{{item.label}}</span>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onUpdate">更新</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'updateStrategy',
    data(){
        return{
            formInline:{
                strategyCode:'',
                channelIds:'',
                fixed:'',
                random:[],
                round:[],
                weight:[],
            },
            weightArray:this.library.cloneObject(this.library.getAtValue('allData','strategyChannel')),
            sum:0,
            page:1,
            pageSize:10000,
            strategyData:[],
            strategyChannelData:[]
        }
    },
    created(){
        this.strategy_query()
    },
    watch:{
        sum(){
            // if(this.sum>=100){
            //     this.weightArray.map((v,mapIndex)=>{
            //         if(v.key==''||v.key==undefined){
            //             v.key=0
            //         }
            //     })
            // }
        },
    },
    methods:{
        strategy_query(){
            let data={page:this.page,pageSize:this.pageSize}
            this.httpRequest.post(
                this.URL.strategy_query,
                data
            ).then(res=>{
                if(res.data.data){
                    this.strategyData=res.data.data.list
                    this.strategyData.map((v,index)=>{
                        this.strategyChannelData[index]={
                            label:v.channelName,
                            value:v.channelId,
                            key:v.channelWeightPercentage
                        }
                        this.weightArray=this.library.cloneObject(this.strategyChannelData)
                        if(v.isDel==0){
                            if(v.strategyCode=="FIXED"){
                                this.formInline.fixed=v.channelId
                            }else if(v.strategyCode=="RANDOM"){
                                this.formInline.random[index]=v.channelId
                            }else if(v.strategyCode=="ROUND"){
                                this.formInline.round[index]=v.channelId
                            }else if(v.strategyCode=="WEIGHT"){
                                this.weightArray.map(k=>{
                                    if(v.channelId==k.value){
                                        k.key=v.channelWeightPercentage
                                    }
                                })
                            }
                        }
                    })
                    // this.weightArray.map(k=>{
                    //     this.sum=this.sum*1+k.key*1
                    // })
                    this.$forceUpdate()
                }
            })
        },
        changeWeight(val,index){
            let number=Math.abs(val)
            if(number>100){
                number=100
            }
            this.weightArray[index].key=number
            // this.sum=0
            // let i=0
            // this.weightArray.map((v,mapIndex)=>{
            //     if(v.key!=''&&v.key!=0){
            //         this.sum=this.sum*1+v.key*1
            //     }
            //     if(v.key==''){
            //         i++
            //     }
            // })
            // if(this.sum>100){
            //     this.sum=this.sum-number
            //     this.weightArray[index].key=0
            // }
            // if(i==1&&this.sum<100){
            //     this.weightArray.map((v,mapIndex)=>{
            //         if(v.key==''){
            //             this.weightArray[mapIndex].key=100-this.sum
            //             this.sum=100
            //         }
            //     })
            // }
        },
        onUpdate(){
            let data={
               strategyCode:this.formInline.strategyCode,
               channelIds:'',
               weights:[]
            }
            if(this.formInline.strategyCode=="FIXED"){
                data.channelIds=this.formInline.fixed
            }else if(this.formInline.strategyCode=="RANDOM"){
                data.channelIds=this.formInline.random.join(',')
            }else if(this.formInline.strategyCode=="ROUND"){
                data.channelIds=this.formInline.round.join(',')
            }
            if(this.formInline.strategyCode=="WEIGHT"){
                // if(this.sum!=100){
                //     this.$message.error('当前权重总和不等于100')
                //     return
                // }
                this.weightArray.map((v,index)=>{
                    data.weights[index]={
                        [v.value]:v.key+''
                    }
                })
                delete data.channelIds
            }else{
                delete data.weights
            }
            this.httpRequest.post(
                this.URL.strategy_modify,
                data
            ).then(res=>{
                if(res.data.data){
                    this.$router.push('/strategyManageList')
                }
            })
        }
    }
}
</script>
<style>
.updata_ul{
    margin: 0;
    padding: 0;
}
.updata_ul li{
    list-style: none;
    margin-bottom: 10px;
}
.updata_ul .el-input{
    width: 200px;
}
.updata_ul .el-input__inner{
    width: 200px;
}
.updata_ul span{
    display: inline-block;
    width: 80px;
    text-align: left;
}
</style>