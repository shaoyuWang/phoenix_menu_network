<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="title">
                <span class="title-font">全部{{checkStatus()}}</span>
            </div>
            <div class="list-item" v-for="item in infoList" :key="item.id">
                <a href="#">
                    <div class="item-img"><img class="img-responsive" :src="handleImg(item)"></div>
                    <div class="item-info">
                    <span class="info-title">{{item.name}}</span>
                    <span class="info-user">{{checkName(item.user)}}</span>
                    </div>
                </a>
            </div>
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
            status: '',
            img: 'https://s1.ig.meishij.net/p/20190225/5c3cfecbc666b3a256d5fd348ee82323.jpg',
            infoList:[],
        }
    },
    created(){
        this.getList();
    },
    methods:{
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
                case 1: return '菜谱'; break;
                case 2: return '食材'; break;
                case 3: return '日记'; break;
                default: return '菜谱'; break;
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
                    console.log(this.infoList);
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


