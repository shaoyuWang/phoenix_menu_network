<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="16" :offset="4" class="header-logo">
                <a href="/request/index"><img src="../../assets/logo.png" alt=""></a>
            </el-col>
        </el-col>
        <el-col :span="16" :offset="4">
            <el-col :span="8" class="nav">
                <div class="user">
                    <div class="user-header"><img src="../../assets/client.jpg" alt="用户头像"></div>
                    <div class="username">aaa</div>
                </div>
                <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
                    <el-menu-item index="1" @click="checkNav($event)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="checkNav($event)">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的菜谱</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="checkNav($event)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="checkNav($event)">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的菜单</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="checkNav($event)">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的日记</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16" class="main">
                <UserModifyTemplate :userInfo='user' v-show="checkUserModify"></UserModifyTemplate>
                <UserRecipeTemplate v-show="checkUserRecipe"></UserRecipeTemplate>
                <UserCollectTemplate v-show="checkUserCollect"></UserCollectTemplate>
                <UserMenuTemplate :userInfo='user' v-show="checkUserMenu"></UserMenuTemplate>
                <UserDiaryTemplate v-show="checkUserDiary"></UserDiaryTemplate>
            </el-col>
        </el-col>
        <Footer class="footer"></Footer>
    </el-row>
</template>

<script>
import Footer from './Footer.vue';
import UserModifyTemplate from '../../components/UserModifyTemplate.vue';
import UserRecipeTemplate from '../../components/UserRecipeTemplate.vue';
import UserCollectTemplate from '../../components/UserCollectTemplate';
import UserMenuTemplate from '../../components/UserMenuTemplate.vue';
import UserDiaryTemplate from '../../components/UserDiaryTemplate.vue';

export default {
    components: {UserModifyTemplate, UserMenuTemplate, UserCollectTemplate, UserRecipeTemplate, UserDiaryTemplate, Footer},
    data(){
        return {
            defaultActive: '1',
            checkUserModify: false,
            checkUserRecipe: false,
            checkUserCollect: false,
            checkUserMenu: false,
            checkUserDiary: false,
            user: {id: 1, username: 'aaa'}
        }
    },
    mounted(){
        this.defaultActive = this.$route.query.status;
        this.checkShow();
    },
    methods:{
        checkShow(){
            switch(this.defaultActive){
                case '1': this.checkUserModify = true; break;
                case '2': this.checkUserRecipe = true; break;
                case '3': this.checkUserCollect = true; break;
                case '4': this.checkUserMenu = true; break;
                case '5': this.checkUserDiary = true; break;
                default: this.checkUserModify = true; break;
            }
        },
        checkNav(event){
            switch(event.index){
                case '1': {
                    this.checkUserModify = true;
                    this.checkUserRecipe = false;
                    this.checkUserCollect = false;
                    this.checkUserMenu = false;
                    this.checkUserDiary = false;
                    break;
                }
                case '2': {
                    this.checkUserModify = false;
                    this.checkUserRecipe = true;
                    this.checkUserCollect = false; 
                    this.checkUserMenu = false;
                    this.checkUserDiary = false;
                    break;
                }
                case '3': {
                    this.checkUserModify = false;
                    this.checkUserRecipe = false;
                    this.checkUserCollect = true; 
                    this.checkUserMenu = false;
                    this.checkUserDiary = false;
                    break;
                }
                case '4': {
                    this.checkUserModify = false;
                    this.checkUserRecipe = false;
                    this.checkUserCollect = false;
                    this.checkUserMenu = true;
                    this.checkUserDiary = false;
                    break;
                }
                case '5': {
                    this.checkUserModify = false;
                    this.checkUserRecipe = false;
                    this.checkUserCollect = false;
                    this.checkUserMenu = false;
                    this.checkUserDiary = true;
                    break;
                }
                default: {
                    this.checkUserModify = true;
                    this.checkUserRecipe = false;
                    this.checkUserCollect = false;
                    this.checkUserMenu = false;
                    this.checkUserDiary = false;
                    break;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/style.scss';
    .container{
        .header{
            background-color: $color_navbar;
            .header-logo{
                a{
                    display: inline-block;
                    padding: $size5 $size10;
                    img{
                        width: $size100;
                    }
                }
            }
        }
        .nav{
            .el-menu-vertical-demo{
                height: 600px;
            }
            .user{
                width: 100%;
                height: 200px;
                background-image: url('../../assets/headerbackground.jpg');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .user-header{
                    margin: 0 auto;
                    width: 100px;
                    height: 100px;
                    // background-color: black;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        display: inline-block;
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .username{
                    margin-top: 10px;
                    text-align: center;
                }
            }
        }
        .main{
            height: 800px;
        }
        .footer{
            top: 0;
        }
    }
    
</style>


