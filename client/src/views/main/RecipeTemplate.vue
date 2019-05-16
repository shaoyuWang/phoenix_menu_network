<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title">
                    <span class="title-font">红烧牛肉盖饭</span>
                </div>
                <el-col :span="24" class="recipe-base">
                    <el-col :span="10">
                        <img class="recipe-img" src="http://site.meishij.net/r/147/198/4174647/a4174647_144456278915386.jpg">
                    </el-col>
                    <el-col :span="14"></el-col>
                </el-col>
            </el-col>
            <el-col :span="6" class="user">a</el-col>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        console.log(this.$route.query.id);
    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>
  @import "../../styles/style.scss";
    .container{
        .main{
            .title{
                border-bottom: 1px solid black;
                .title-font{
                    display: inline-block;
                    padding: 20px 10px;
                    font-size: $font_size2_5;
                    font-weight: bold;
                }
            }
            .recipe-base{
                margin-top: 30px;
                background-color: white;
                .recipe-img{
                    display: block;
                    width: 100%;

                }
            }
        }
        .user{
            margin-left: 10px;
            border: 1px solid blue;
        }
    }
</style>


