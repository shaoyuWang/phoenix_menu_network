<template>
    <el-row>
        <el-col :span="16" :offset="4">
            <div class="list-item" v-for="item in menuList" :key="item.id">
                <a href="#">
                    <div class="item-img"><img class="img-responsive" :src="item.img"></div>
                    <div class="item-info">
                    <span class="info-title">{{item.title}}</span>
                    <span class="info-user">{{item.username}}</span>
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

        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../styles/style.scss';
</style>


