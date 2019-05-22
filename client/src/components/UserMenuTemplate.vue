<template>
    <el-col :span="24" class="container">
        <div class="title">
            <span class="title-font">菜单列表</span>
        </div>
        <el-col class="menu">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item :title="item.name" :name='item.id' v-for="item in menuList" :key="item.id">
                    <div class="menu-header">{{item.length}}/10</div>
                    <ul class="recipe">
                        <li class="recipe-item" v-for="recipeItem in item.recipes" :key="recipeItem.id">
                            <img :src="handleImg(recipeItem.finishPhoto)">
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </el-col>
    </el-col>
</template>

<script>
export default {
    data(){
        return {
            userId: '',
            activeName:'',
            menuList: [],
        }
    },
    mounted(){
        this.getMenu();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../assets/imgs/${photo}`);
            }
        },
        getMenu(){
            this.userId = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null : JSON.parse(sessionStorage.getItem('user')).id;
            this.$axios({
                url: `/main/userCenter/getMenu/${this.userId}`,
                method: 'get',
            }).then(res =>{
                if(res.status == 200){
                    this.menuList = res.data.data.menus;
                    _.forEach(this.menuList, item=>{
                        item.length = item.recipes.length;
                    })
                    console.log(this.menuList);
                    if(_.isEmpty(this.menuList)){
                        this.$message({ message: '暂无菜单信息', type: 'error' });
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
            width: $width100;
            height: $size60;
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
        .menu{
            padding: 20px;
            .menu-header{
                color: rgb(252, 94, 94);
                text-align: right;
            }
            .recipe{
                display: block;
                margin-top: $size10;
                width: auto;
                height: 170px;
                overflow: scroll;
                overflow-x: auto;
                white-space:nowrap;
                &::-webkit-scrollbar {display:none};
                .recipe-item{
                    display: inline-block;
                    margin: $size0 $size2;
                    width: 160px;
                    height: 160px;
                }
                img{
                    width: 160px;
                    height: 160px;
                    border-radius: $size5;
                    padding-right: $size1;
                }
                }
        }
    }
</style>

