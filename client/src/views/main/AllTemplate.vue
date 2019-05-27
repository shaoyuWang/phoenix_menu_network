<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="title">
                <span class="title-font">{{checkStatus()}}</span>
            </div>
            <div class="list-item" v-for="item in infoList.slice((currentPage-1)*pagesize, currentPage*pagesize)" :key="item.id">
                <a href="#">
                    <div class="item-img"><img class="img-responsive" :src="handleImg(item)"></div>
                    <div class="item-info">
                    <span class="info-title">{{item.name}}</span>
                    <span class="info-user">{{checkName(item.user)}}</span>
                    </div>
                </a>
            </div>
            <el-col :span="24" style="text-align: center; margin-top: 10px;">
                <el-pagination layout="prev, pager, next" :page-size="pagesize" @current-change="current_change" 
                :current-page.sync="currentPage" :pager-count="5" :total="infoList.length">
                </el-pagination>
            </el-col>
        </el-col>
        <Footer></Footer>
    </el-row>
</template>

<script>
import Footer from './Footer.vue';
export default {
    components: {Footer},
    data(){
        return {
        pagesize: 15,
        currentPage: 1,
        status: '',
        infoList: [],
        }
    },
    created(){
        this.status = _.toNumber(this.$route.query.status);
        if(this.status != 99){
            this.getList();
        }else{
            let recipes = this.$route.query.recipes;
            this.infoList = recipes;
        }
    },
    methods:{
        current_change(currentPage){  //改变当前页
            this.currentPage = currentPage
        },
        handleImg(item){
            if(_.isEmpty(item.finishPhoto)){
                return require(`../../assets/imgs/${item.photo}`);
            }else{
                return require(`../../assets/imgs/${item.finishPhoto}`);
            }
        },
        checkName(item){
            if(!_.isEmpty(item)){
                return item.name;
            }
        },
        checkStatus(){
            this.status = _.toNumber(this.$route.query.status);
            switch(_.toNumber(this.status)){
                case 1: return '全部菜谱'; break;
                case 2: return '全部食材'; break;
                case 3: return '全部日记'; break;
                case 99: return '搜索结果'; break;
                default: return '全部菜谱'; break;
            }
        },
        getList(){
            this.status = _.toNumber(this.$route.query.status);
            let path = '';
            this.$axios({
                url:`/main/allTemplate/getList/${this.status}`,
                method: 'get',
            }).then(res=>{
                if(res.data.code == 200){
                    this.infoList = res.data.data.info;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/style.scss';
    .title{
        border-bottom: 1px solid black;
        .title-font{
            display: inline-block;
            padding: 20px 10px;
            font-size: $font_size2_5;
            font-weight: bold;
        }
    }
    .list-item{
        margin-top: 10px;
    }
</style>


