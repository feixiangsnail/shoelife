<template>
    <nav class="clearfix">
        <div class="logo">
            <router-link to="/"><img src="../../assets/img/logo.png" alt=""></router-link>
        </div>
        <div :class="[isHome? 'list':'home']" @click="onClick"></div>
        <!--<router-link to="/account/index">-->
            <div class="user" v-show="showUsr" @click="goUser"></div>
        <!--</router-link>-->
        <div v-show="show">
            <div class="header-float clearfix">
                <div class="logo clearfix">
                    <img src="../../assets/img/shoelives_logo.svg" alt="">
                    <span>诠释妳的鞋履美学</span>
                </div>
                <div class="ri">
                    <span @click="open">打开</span>
                    <i @click="close"><img src="../../assets/img/btnClose.png" alt=""></i>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
    export default{
        props: ['onClick', 'isHome', 'showUsr'],
        data(){
            return {
                show:true
            }
        },
        methods: {
            close(){
                this.show=false;
                this.$store.state.showHeader = this.show;
            },
            open(){
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android"
            },
            goUser(){
                this.$router.push('/account/index');
            }
        },
        mounted(){
            //console.log(this.$store.state.showHeader);
            this.show=this.$store.state.showHeader;
        }
    }
</script>
<style lang="less" scoped>
    @w: 25;
    //导航
    nav {
        position: relative;
        width: 375rem/@w;
        height: 40rem/@w;
        background: #F5334A;
        .logo {
            height: auto;
            width: 134rem/@w;
            padding-left: 6rem/@w;
            float: left;
            img{
                width: 100%;
                border-radius: 10rem/@w;
            }
        }
        .user {
            position: absolute;
            height: 19rem/@w;
            width: 17rem/@w;
            background: url("../../assets/img/user.png") no-repeat;
            background-size: 17rem/@w 19rem/@w;
            top: 12rem/@w;
            right: 65rem/@w;
        }
        .list {
            width: 19rem/@w;
            height: 14rem/@w;
            margin: 15rem/@w 15rem/@w 0 28rem/@w;
            float: right;
            background: url("../../assets/img/icon-list.png") no-repeat;
            background-size: 19rem/@w 14rem/@w;
        }
        .home {
            width: 22.6rem/@w;
            height: 23rem/@w;
            margin: 11rem/@w 13rem/@w 0 24rem/@w;
            background: url("../../assets/img/home.png") no-repeat;
            background-size: 22.6rem/@w 22.6rem/@w;
            float: right
        }

        .header-float {
            position: absolute;
            width: 375rem/@w;
            height: 64rem/@w;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 0 6px 0 rgba(0, 0, 0, 0.19);
            left: 0;top:0;
            z-index: 999;
            overflow: hidden;
            .logo {
                float: left;
                width:auto;
                img {
                    width: 46rem/@w;
                    height: 46rem/@w;
                    display: block;
                    float: left;
                    margin: 9rem/@w 10rem/@w 0;
                }
                span {
                    display: block;
                    float: left;
                    font-size: 14px;
                    color: #616161;
                    letter-spacing: 0.19px;
                    line-height: 64rem/@w;
                }
            }
            .ri {
                float: right;
                span {
                    border: 1px solid #F5334A;
                    border-radius: 4rem/@w;
                    width: 68rem/@w;
                    height: 30rem/@w;
                    line-height: 33rem/@w;
                    text-align: center;
                    font-size: 14rem/@w;
                    color: #F5334A;
                    letter-spacing: 0.19rem/@w;
                    float: left;
                    margin-top: 17rem/@w;
                }
                i {
                    width: 22.6rem/@w;
                    height: 22.6rem/@w;
                    float: left;
                    margin: 21rem/@w 6.4rem/@w 0 10rem/@w;
                }
            }
        }
    }
</style>
