<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title"><span>红烧牛肉盖饭</span></div>
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
                span{
                    display: inline-block;
                    padding: 20px 10px;
                    font-size: $font_size2_5;
                    font-weight: bold;
                }
            }
        }
        .user{
            margin-left: 10px;
            border: 1px solid blue;
        }
    }
</style>


