<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">我的菜谱</span>
            <div class="title-operation">
                <el-button @click="operation = true;" type="text" v-show="operation? false : true">管理</el-button>
                <el-button @click="operation = false;" style="color: #f40;" type="text" v-show="operation">退出管理</el-button>
            </div>
        </div>
        <el-col :span="24" class="infomation">
            <div class="list">
                <div class="item" v-for="item in recipeList.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item.id">
                    <a @click="jumpRecipe(item.id)">
                        <img :src="handleImg(item.finishPhoto)" style="height: 210px;">
                        <div class="info">
                            <span class="recipe-name">{{item.name}}</span>
                            <span class="time"><i class="el-icon-date"></i>&nbsp;&nbsp;{{handleDate(item.createDate)}}</span>
                        </div>
                    </a>
                    <div class="operation" v-show="operation">
                        <el-button type="primary" plain>修改</el-button>
                        <!-- <el-button @click="deleteRecipe(item.id)" type="danger" plain>删除</el-button> -->
                    </div>
                </div>
            </div>
        </el-col>
            <el-col :span="24" style="text-align: center; margin-top: 10px;">
                <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
                    :current-page.sync="currentPage" :pager-count="5" :total="recipeList.length">
                </el-pagination>
            </el-col>
        </el-col>
</template>

<script>
export default {
    data(){
        return {
            pagesize: 9,
            currentPage: 1,
            userId:'',
            recipeList: [],
            operation: false,
        }
    },
    created(){
        this.getRecipe();
    },
    methods:{
        current_change(currentPage){  //改变当前页
            this.currentPage = currentPage
        },
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../assets/imgs/${photo}`);
            }
        },
        handleDate(date){
            return this.moment(date).format('YYYY-MM-DD');
        },
        jumpRecipe(id){
            this.$router.push({path: '/request/recipeTemplate', query: { id }});
        },
        getRecipe(){
            this.userId = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user')).id;
            this.$axios({
                url: `/main/userCenter/getRecipe/${this.userId}`,
                method: 'get',
            }).then(res =>{
                if(res.status == 200){
                    this.recipeList = res.data.data.recipes;
                    if(_.isEmpty(this.recipeList)){
                        this.$message.error({ message: '暂无菜谱信息' });
                    }
                }
            });
        },
        deleteRecipe(recipeId){
            this.$axios({
                url: `/main/userCenter/deleteRecipe/${recipeId}`,
                method: 'post',
            }).then(res =>{
                if(res.status == 200){
                    this.$message({ message: '删除菜谱成功', type: 'success' });
                    this.getRecipe();
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/style.scss';
    .container{
        background-color: white;
        height: 1200px;
        .title{
            width: 100%;
            height: 60px;
            background-color: white;
            overflow: hidden;
            border-bottom: 1px solid rgb(156, 149, 149);
            .title-font{
                float: left;
                display: block;
                color:black;
                font-size: $font_size2;
                letter-spacing: 2px;
                margin-left: 20px;
                line-height: 60px;
            }
            .title-operation{
                float: right;
                padding: 10px 10px 0 0;
            }
        }
        .infomation{
            margin-top: 40px;
            .list{
                margin: 0 20px;
                overflow: hidden;
                .item{
                    width: 33.3%;
                    padding: 10px;
                    border-radius: 10px;
                    float: left;
                    img{
                        display: block; 
                        text-align: center;
                        width: 100%;
                        overflow: hidden;
                    }
                    .info{
                        width: 100%;
                        height: 70px;
                        background-color: #F2F6FC;
                        .recipe-name{
                            font-size: 18px;
                            padding: 10px 0 0 10px;
                            display: block;
                        }
                        .time{
                            display: block;
                            padding-top: 10px;
                            text-align: right;
                            color: #909399;
                        }
                    }
                    .operation{
                        width: 100%;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

