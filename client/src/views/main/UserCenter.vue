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
                    <div class="user-header"><img :src="handleImg(user.photo)" alt="用户头像"></div>
                    <div class="username">{{user.name}}</div>
                </div>
                <el-menu :default-active="defaultActive" router class="el-menu-vertical-demo">
                    <el-menu-item index="/userCenter/myInfo">
                        <i class="el-icon-menu"></i>
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="/userCenter/myRecipe">
                        <i class="el-icon-edit"></i>
                        <span slot="title">我的菜谱</span>
                    </el-menu-item>
                    <el-menu-item index="/userCenter/myCollection">
                        <i class="el-icon-document"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="/userCenter/myMenu">
                        <i class="el-icon-setting"></i>
                        <span slot="title">我的菜单</span>
                    </el-menu-item>
                    <el-menu-item index="/userCenter/myDiary">
                        <i class="el-icon-share"></i>
                        <span slot="title">我的日记</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="16" class="main">
                <router-view></router-view>
            </el-col>
        </el-col>
        <Footer class="footer"></Footer>
    </el-row>
</template>

<script>
import Footer from './Footer.vue';

export default {
    data(){
        return {
            user: '',
            defaultActive: ''
        }
    },
    created(){
        this.user = _.isEmpty(JSON.parse(sessionStorage.getItem('user')))? null: JSON.parse(sessionStorage.getItem('user'));
        this.checkPath();
    },
    methods:{
        handleImg(photo){
            if(!_.isEmpty(photo)){
                return require(`../../assets/imgs/${photo}`);
            }
        },
        checkPath(){
            let status = _.toNumber(this.$route.query.status);
            switch(status){
                case 1: this.defaultActive = '/userCenter/myInfo'; break;
                case 2: this.defaultActive = '/userCenter/myRecipe'; break;
                case 3: this.defaultActive = '/userCenter/myCollection'; break;
                case 4: this.defaultActive = '/userCenter/myMenu'; break;
                case 5: this.defaultActive = '/userCenter/myDiary'; break;
                default: this.defaultActive = '/userCenter/myInfo'; break;
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
                text-align: center;
                .user-header{
                    display: inline-block;
                    width: 100px;
                    height: 80px;
                    border-radius: 50%;
                    margin-top: 40px;
                    overflow: hidden;
                    img{
                        display: inline-block;
                        width: 100%;
                        border-radius: 50%;
                    }
                }
                .username{
                    margin-top: 10px;
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


