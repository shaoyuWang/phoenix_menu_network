<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">我的收藏</span>
        </div>
        <el-col :span="24" class="infomation">
            <div class="list">
                <div class="item" v-for="item in collectionList" :key="item.id">
                    <img :src="handleImg(item.recipeFinishPhoto)">
                    <div class="info">
                        <span class="recipe-name">{{item.recipeName}}</span>
                        <span class="time"><i class="el-icon-date"></i>&nbsp;&nbsp;{{handleDate(item.createDate)}}</span>
                    </div>
                </div>
            </div>
      </el-col>
    </el-col>
</template>

<script>
export default {
    data(){
        return {
            userId:'',
            collectionList: [],
        }
    },
    created(){
        this.getRecipe();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../assets/imgs/${photo}`);
            }
        },
        handleDate(date){
            return this.moment(date).format('YYYY-MM-DD');
        },
        getRecipe(){
            this.userId = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user')).id;
            this.$axios({
                url: `/main/userCenter/getCollection/${this.userId}`,
                method: 'get',
            }).then(res =>{
                if(res.status == 200){
                    this.collectionList = res.data.data.collections;
                    if(_.isEmpty(this.recipeList)){
                        this.$message({ message: '暂无收藏信息', type: 'error' });
                    }
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
            .title-font{
                display: block;
                color:black;
                font-size: $font_size2;
                letter-spacing: 2px;
                margin-left: 20px;
                line-height: 60px;
                border-bottom: 1px solid rgb(156, 149, 149);
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
                }
            }
        }
    }
</style>

