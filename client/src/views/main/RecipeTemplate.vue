<template>
    <el-row class="container">
        <el-col :span="16" :offset="4">
            <el-col :span="14" :offset="2" class="main">
                <div class="title">
                    <span class="title-font">{{recipe.name}}</span>
                </div>
                <el-col :span="24" class="recipe-base">
                    <el-col :span="10">
                        <img class="recipe-img" :src="handleImg(recipe.finishPhoto)">
                    </el-col>
                    <el-col :span="14" class="info">
                        <ul class="effect">
                            <li class="effect-item" v-for="item in recipe.effects" :key="item.id"><span>{{item.name}}</span></li>
                        </ul>
                        <div class="center">
                            <div class="left"><span>工艺</span><span class="font">{{checkName(recipe.technology)}}</span></div>
                            <div class="right"><span>难度</span><span class="font">{{checkLevel(recipe.level)}}</span></div>
                        </div>
                        <div class="bottom">
                            <div class="left"><span>口味</span><span class="font">{{checkName(recipe.taste)}}</span></div>
                            <div class="right"><span>时间</span><span class="font">{{recipe.time}}分</span></div>
                        </div>
                    </el-col>
                </el-col>
                <el-col :span="24" class="recipe-info">
                    <span class="description">
                        {{recipe.evaluate}}
                    </span>
                    <div class="material">
                        <span class="major">主料:</span>
                        <ul class="material-info">
                            <li class="material-item" v-for="item in recipe.majorMaterials" :key="item.id">
                                <img :src="handleImg(item.photo)">
                                <span class="name">{{item.name}}</span>
                                <span class="quality">{{item.quality}}</span>
                            </li>
                        </ul>
                        <span class="major">辅料:</span>
                        <ul class="material-info">
                            <li class="material-item" v-for="item in recipe.auxiliaryMaterials" :key="item.id">
                                <img :src="handleImg(item.photo)">
                                <span class="name">{{item.name}}</span>
                                <span class="quality">{{item.quality}}</span>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="24" class="step-info">
                    <div class="recipe-name">
                        <span>{{recipe.name}}的做法</span>
                    </div>
                    <ul class="step-list">
                        <li class="step-item" v-for="item in 5" :key="item">
                            <span class="step-number">{{item}}.</span>
                            <div class="step">
                                <span class="step-description">这个菜谱非常牛逼。这个步骤贼屌</span>
                                <img class="step-img" src="../../assets/headerbackground.jpg" alt="">
                            </div>
                        </li>
                    </ul>
                </el-col>
            </el-col>
            <el-col :span="6" class="col-right">
                <div class="user">
                    <div class="user-header">
                        <div class="user-img"><img src="../../assets/logo.jpg"></div>
                        <span class="username">{{user.name}}</span>
                    </div>
                    <div class="user-info">
                        <span>菜谱:&nbsp;{{user.recipeLength}}</span>
                        <span>菜单:&nbsp;{{user.menuLength}}</span>
                        <span>日记:&nbsp;{{user.diaryLength}}</span>
                        <span>收藏:&nbsp;{{user.collectionLength}}</span>
                    </div>
                </div>
                <div class="comment">
                    <ul class="comment-list">
                        <li class="comment-item" v-for="item in recipe.comments" :key="item.id">
                            <div class="comment-operation">
                                <el-button class="comment-praise" @click="praise(item.id)" type="text">点赞 {{item.praise}}</el-button>
                            </div>
                            <span class="comment-info">{{item.comment}}</span>
                            <span class="comment-user-info">{{item.createDate}}&nbsp;&nbsp;来自&nbsp;{{item.username}}</span>
                        </li>
                    </ul>
                    <div class="comment-publish">
                        <span class="publish-title">发表评论</span>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入评论" v-model="comment"></el-input>
                        <div class="operation"><el-button @click="publishComment()" type="primary" plain>发表</el-button></div>
                    </div>
                </div>
            </el-col>
        </el-col>
        <Footer></Footer>
    </el-row>
</template>

<script>
    import Footer from './Footer.vue';
export default {
    components:{Footer},
    data(){
        return {
            comment: '',
            recipe: '',
            user:'',
            recipeId: '',
        }
    },
    mounted(){
        this.getList();
        this.getUserInfo();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../../assets/imgs/${photo}`);
            }
        },
        checkLevel(item){
            switch(_.toNumber(item)){
                case 1: return '轻松'; break;
                case 2: return '适中'; break;
                case 3: return '中等'; break;
                case 3: return '较难'; break;
                case 4: return '困难'; break;
            }
        },
        checkName(item){
            if(!_.isEmpty(item)){
                return item.name;
            }
        },
        publishComment(){
            let user = JSON.parse(sessionStorage.getItem('user'));
            let data = {
                comment:this.comment,
                praise: 0,
                recipe:this.recipe,
                userId: _.isEmpty(user)? null : user.id,
                username: _.isEmpty(user)? '' : user.name,
            }
            if(!_.isEmpty(data.comment)){
                this.$axios({
                    url:`/main/recipeTemplate/publishComment`,
                    method: 'post',
                    data: data,
                }).then(res=>{
                    if(res.data.code == 200){
                        this.comment = '';
                        this.getList();
                    }
                });
            }else{
                this.$message({
                    message: '请输入评论信息',
                    type: 'warning'
                });
            }
        },
        praise(commentId){
            let data = {commentId};
            this.$axios({
                url:`/main/recipeTemplate/praiseComment`,
                method: 'post',
                data: data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: '点赞成功',
                        type: 'success'
                    });
                    this.getList();
                }
            });
        },
        getList(){
            this.recipeId = _.toNumber(this.$route.query.id);
            this.$axios({
                url:`/main/recipeTemplate/findRecipeById/${this.recipeId}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.recipe = res.data.data.recipe;
                }
            });
        },
        getUserInfo(){
            let userId = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? 1 : JSON.parse(sessionStorage.getItem('user')).id;
            this.$axios({
                url:`/main/recipeTemplate/findUserById/${userId}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.user = res.data.data.user;
                    this.user.menuLength = this.user.menus.length;
                    this.user.diaryLength = this.user.diarys.length;
                    this.user.collectionLength = this.user.collections.length;
                    this.user.recipeLength = this.user.recipes.length;
                }
            });
        }
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
                margin-top: 20px;
                background-color: white;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                .recipe-img{
                    display: block;
                    width: 100%;
                }
                .info{
                    .effect{
                        display: block;
                        padding: 20px;
                        width: auto;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                        overflow: scroll;
                        overflow-x: auto;
                        white-space: nowrap;
                        &::-webkit-scrollbar {display:none};
                        margin-bottom: $size0;
                        .effect-item{
                            display: inline-block;
                            margin: $size0 $size4;
                            width: 80px;
                            text-align: center;
                            span{
                                background-color: rgb(42, 231, 42);
                                border: 1px solid black;
                                padding: 4px;
                                display: block;
                                width: 80px;
                                border-radius: 2px;
                                font-weight: bold;
                            }
                        }
                    }
                    .center{
                        width: 100%;
                        height: 100px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                        text-align: center;
                        div{ display: inline-block; }
                        span{
                            display: block;
                            color: #909399;
                        }
                        .font{
                            color: #f40;
                            font-size: 24px;
                        }
                        .left{
                            width: 50%;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            padding-top: 30px;
                        }
                        .right{
                            width: 50%;
                            height: 100px;
                            padding-top: 30px;
                        }
                    }
                    .bottom{
                        width: 100%;
                        height: 101px;
                        text-align: center;
                        div{ display: inline-block; }
                        span{
                            display: block;
                            color: #909399;
                        }
                        .font{
                            color: #f40;
                            font-size: 24px;
                        }
                        .left{
                            width: 50%;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            padding-top: 30px;
                            
                        }
                        .right{
                            width: 50%;
                            height: 100px;
                            padding-top: 30px;
                        }
                    }
                }
            }
            .recipe-info{
                margin-top: $size10;
                width: $width100;
                background-color: white;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                .description{
                    display: block;
                    padding: $size20;
                    font-size: $font_size1_5;
                    color: #606266;
                    line-height: 20px;
                    text-indent: 2rem;
                }
                .material{
                    padding-left: 20px;
                    font-size: 14px;
                    .material-info{
                        display: block;
                        padding: 20px;
                        width: auto;
                        overflow: scroll;
                        overflow-x: auto;
                        white-space: nowrap;
                        &::-webkit-scrollbar {display:none};
                        margin-bottom: $size0;
                        .material-item{
                            display: inline-block;
                            width: 240px;
                            height: 100px;
                            border-right: 1px solid rgba(0, 0, 0, 0.322);
                            border-bottom: 1px solid rgba(0, 0, 0, 0.322);
                            margin: 0 5px;
                            overflow: hidden;
                            img{ display: inline-block; padding: 10px; width: 50%; height: 100%;}
                            span{display: inline-block;}
                            .name{color:#f40;}
                            .quality{ width: 30%; color: #909399; text-align: right;}
                        }
                    }
                    .major{
                        display: block;
                        font-size: 22px;
                        padding: 10px 0;
                        border-bottom: 1px solid black;
                    }
                }
            }
            .step-info{
                margin-top: 20px;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
                background-color: white;
                overflow: hidden;
                ul,li{list-style: none;}
                .recipe-name{
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.137);
                    span{ display: block; font-size: 22px; padding-left: 20px;}
                }
                .step-list{
                    .step-item{
                        width: 100%;
                        padding: 10px 0;
                        overflow: hidden;
                        span{display: block;}
                        .step-number{
                            float: left;
                            font-size: 30px;
                            width: 80px;
                            color: #f40;
                            text-align: center;
                        }
                        .step{
                            float: left;
                            .step-description{
                                font-size: 14px;
                                padding: 10px 0;
                                color: rgba(0, 0, 0, 0.267);
                            }
                            .step-img{
                                display: block;
                                width: 500px;
                                height: 300px;
                            }
                        }
                    }
                }
            }
        }
        .col-right{
            margin-top: 40px;
            margin-left: 10px;
            .user{
                background-color: rgb(255, 255, 255);
                .user-header{
                    width: $width100;
                    padding: 50px 0;
                    border-bottom: 1px dashed rgba(53, 50, 50, 0.575);
                    background-image: url('../../assets/headerbackground.jpg');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    overflow: hidden;
                    .user-img{
                        margin: 0 auto;
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{ width: 70px; display: block; background-color: black;}
                    }
                    .username{
                        padding: 20px 0;
                        display: block;
                        text-align: center;
                        color: black;
                    }
                }
                .user-info{
                    margin: 20px 0;
                    text-align: center;
                    span{
                        display: block;
                        margin: 5px 0;
                        font-size: 14px;
                        color: rgba(48, 45, 45, 0.548);
                    }
                }
            }
            .comment{
                background-color: white;
                ul,li{list-style: none;}
                .comment-list{
                    padding: 10px;
                    margin: 0;
                    .comment-item{
                        padding: 10px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.274);
                        .comment-operation{
                            text-align: right;
                            .comment-praise{color: rgba(12, 141, 12, 0.329); &:hover{color: #f40;}}
                        }
                        .comment-info{ 
                            display: block; 
                            padding-left: $size5; 
                            text-indent: 
                            $font_size2;
                        }
                        .comment-user-info{ 
                            display: block; 
                            text-align: right; 
                            padding-top: $size10; 
                            font-size: 12px;
                        }
                    }
                }
                .comment-publish{
                    padding: 10px;
                    .publish-title{
                        display: block;
                        font-size: 18px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.267);
                    }
                    .el-textarea{
                        margin: 10px 0;
                    }
                    .operation{
                        text-align: right;
                        .el-button{
                            padding: 8px 12px;
                        }
                    }
                }
            }
        }
    }
</style>


