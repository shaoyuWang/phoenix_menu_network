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
                <el-col :span="24" class="recipe-operation">
                    <el-button @click="collection()" type="success" plain>收藏</el-button>
                    <el-button @click="openDialog()" type="primary" plain>添加到菜单</el-button>
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
                        <span class="username">{{recipeUser.name}}</span>
                    </div>
                    <div class="user-info">
                        <span>菜谱:&nbsp;{{recipeUser.recipeLength}}</span>
                        <span>菜单:&nbsp;{{recipeUser.menuLength}}</span>
                        <span>日记:&nbsp;{{recipeUser.diaryLength}}</span>
                        <span>收藏:&nbsp;{{recipeUser.collectionLength}}</span>
                    </div>
                </div>
                <div class="comment">
                    <ul class="comment-list">
                        <li class="comment-item" v-for="item in recipe.comments" :key="item.id">
                            <div class="comment-operation">
                                <el-button class="comment-praise" @click="praise(item.id)" type="text" :disabled="disabled">点赞 {{item.praise}}</el-button>
                            </div>
                            <span class="comment-info">{{item.comment}}</span>
                            <span class="comment-user-info">
                                {{handleDate(item.createDate)}}&nbsp;&nbsp;来自&nbsp;
                                <span class="comment-user-name">{{item.username}}</span>
                                </span>
                        </li>
                    </ul>
                    <div class="comment-publish">
                        <span class="publish-title">发表评论</span>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入评论" v-model="comment"></el-input>
                        <div class="operation"><el-button @click="publishComment()" type="primary" plain>发表</el-button></div>
                    </div>
                </div>
            </el-col>
            <el-dialog title="选择菜单" :visible.sync="dialogVisible" width="30%" center>
                <el-select v-model="searchMenuId" default-first-option filterable placeholder="请选择">
                    <el-option
                    v-for="item in user.menus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="success" @click="dialogFormVisible = true" style="margin-left: 10px;">新建菜单</el-button>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addMenu()">确 定</el-button>
                </span>
            </el-dialog>
            <el-dialog title="新建菜单" :visible.sync="dialogFormVisible" width="30%" center>
                <el-form :model="form">
                    <el-form-item label="菜单名" label-width="120px">
                    <el-input v-model="form.name" placeholder="Please Input Name"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false;form.name = '';">取 消</el-button>
                    <el-button type="primary" @click="createMenu()">确 定</el-button>
                </span>
            </el-dialog>
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
            dialogVisible: false,
            dialogFormVisible: false,
            disabled: false,
            searchMenuId: '',
            comment: '',
            recipe: '',
            recipeUser: '',
            user:'',
            recipeId: '',
            form:{
                name:'',
            },
        }
    },
    mounted(){
        this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
        this.getList();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../../assets/imgs/${photo}`);
            }
        },
        handleDate(date){
            return this.moment(date).format('YYYY-MM-DD hh:mm:ss');
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
            let data = {
                comment:this.comment,
                praise: 0,
                recipe:this.recipe,
                userId: _.isEmpty(this.user)? null : this.user.id,
                username: _.isEmpty(this.user)? '' : this.user.name,
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
                this.$message({ message: '请输入评论信息', type: 'warning' });
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
                    this.$message({ message: '点赞成功', type: 'success' });
                    this.getList();
                    this.disabled = true;
                }
            });
        },
        collection(){
            let data = {
               recipeId: this.recipe.id,
               recipeName: this.recipe.name,
               user: this.user,
               recipeFinishPhoto: this.recipe.finishPhoto,
            };
            this.$axios({
                url:`/main/recipeTemplate/collectionRecipe`,
                method: 'post',
                data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({ message: '收藏成功', type: 'success' });
                    this.getList();
                }
            });
        },
        openDialog(){
            if(_.isEmpty(this.user)) { this.$message.error({ message: '请登录' }); return false;};
            this.getCurrentUser();
        },
        addMenu(){
            let data = {
                menuId: this.searchMenuId,
                recipe: this.recipe,
            }
            let judge = false;
            _.forEach(this.user.menus, item => {
                if(item.id == data.menuId){
                    if(item.recipes.length >= 10) judge = true;
                }
            })
            if(judge) { this.$message({ message: '菜单中菜谱以达到上限', type: 'warning' }); return false;};
            this.$axios({
                url:`/main/recipeTemplate/recipeAddMenu`,
                method: 'post',
                data,
            }).then(res=>{
                console.log(res);
                if(res.data == -1){
                    this.$message({ message: '此菜谱已经存在与你的菜单中', type: 'warning' });
                }else if(res.data.code == 200){
                    this.dialogVisible = false;
                    this.$message({ message: '添加到菜谱成功', type: 'success' });
                    this.searchMenuId = '';
                }
            });
        },
        createMenu(){
            let data = {
                name: this.form.name,
                collectionNumber: 0,
                vistor: 0,
                user: this.user,
            }
            let judge = false;
            _.forEach(this.user.menus, item=>{
                if(item.name == data.name) judge = true;
            })
            if(judge){ this.$message({ message: '菜单名重复', type: 'warning' }); this.dialogFormVisible = true; return false; }
            this.$axios({
                url:`/main/recipeTemplate/createMenu`,
                method: 'post',
                data,
            }).then(res=>{
                if(res.data.code == 200){
                    this.$message({ message: '创建菜单成功', type: 'success' });
                    this.dialogFormVisible = false;
                    this.getCurrentUser();
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
                    this.getUserInfo();
                }
            });
        },
        getUserInfo(){
            let userId = this.recipe.user.id;
            this.$axios({
                url:`/main/recipeTemplate/findUserById/${userId}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.recipeUser = res.data.data.user;
                    this.recipeUser.menuLength = this.recipeUser.menus.length;
                    this.recipeUser.diaryLength = this.recipeUser.diarys.length;
                    this.recipeUser.collectionLength = this.recipeUser.collections.length;
                    this.recipeUser.recipeLength = this.recipeUser.recipes.length;
                }
            });
        },
        getCurrentUser(){
            this.$axios({
                url:`/main/recipeTemplate/findUserById/${this.user.id}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.user = res.data.data.user;
                    console.log(this.user);
                    this.dialogVisible = true;
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
            .recipe-operation{
                margin-top: $size10;
                padding: 20px 0;
                text-align: center;
                width: $width100;
                background-color: white;
                box-shadow: 0 0 3px rgba(255, 0, 0, 0.4);
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
                            .comment-user-name{
                                color: rgba(0, 0, 0, 0.548);
                            }
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


