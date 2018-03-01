<template>
    <section id="user">
        <header-wrap :on-click="toHome" :isHome="isHome" :showUsr="showUsr"></header-wrap>
        <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom">
            <login-wrap></login-wrap>
        </mt-popup>
       <!-- <div class="top bt" v-if="item.photo">
            <img :src="$img + item.photo" v-if="item.photo">
            <span>{{item.userName}}</span>
        </div>-->
        <div class="top bt">
            <img :src="headPhoto">
            <span>{{item.userName}}</span>
        </div>
        <div class="item">
            <ul>
                <router-link to="/account/desgins">
                    <li class="bt"><i class="myd"></i><span>我的设计</span><i></i></li>
                </router-link>
                <router-link to="/account/favorites">
                    <li class="bt"><i class="myf"></i><span>我的收藏</span><i></i></li>
                </router-link>
                <router-link to="/account/follows">
                    <li class="bt"><i class="myw"></i><span>我的关注</span><i></i></li>
                </router-link>
            </ul>
        </div>
    </section>
</template>
<script>
    import {urlData} from '../common/utils.js';
    import wxShare from '../common/wxShare';
    export default{
        data(){
            return {
                isHome: false,
                showUsr: false,
                item: {},
                headPhoto:'http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png'
            }
        },
        methods: {
            toHome() {
                this.$router.push('/');
            },
            getList(){
                /**
                 * 我的信息
                 */
                var code = urlData('code');
                if(code) return;
                this.$http.p('getMyMess').then((response) => {
                    this.item = response[0];
                    if(this.item.photo){
                        this.item.photo.indexOf("http://") === 0 ? this.headPhoto =  this.item.photo : this.headPhoto = this.$img +  this.item.photo;
                    }
                    if (this.item.isSign) {
                        this.$store.commit('upSing', {
                            is: true,
                            fullPath: 'account/index'
                        });
                    }
                    //微信二次分享
                    wxShare.init({
                        'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                        'shareImg': this.headPhoto,
                        'shareDesc': "【"+this.item.userName+"的主页- 来自鞋生活】"
                    });

                });
            }
        },
        created(){
            this.getList()
        },
        watch: {
            isSign(curVal){
                if (curVal) return;
                this.getList()
            },
        },
        computed: {
            isSign() {
                return this.$store.state.isSign;
            }
        },
        components: {
            HeaderWrap: require('../components/header.vue'),
            LoginWrap: require('../components/login/index.vue')
        },
        mounted(){
            document.title = "我的";
            wxShare.redir();
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/preset.less';

    @w: 25;
    #user {
        background: #f6f6f6;
        height: 100vh;
        .top {
            line-height: 120rem/@w;
            background: #fff;
            margin-bottom: 10rem/@w;
            img {
                width: 65rem/@w;
                height: 65rem/@w;
                display: inline-block;
                margin: 28rem/@w 15rem/@w 0;
                border-radius: 500%;
                border: 1px solid #fff;
                padding: 2rem/@w;
            }

                span{width:200rem/@w;color:#131313;vertical-align:top;display: inline-block;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;
                    font-size: 20rem/@w;}

        }
        .item {
            background: #fff;
            li {
                line-height: 50rem/@w;
                position: relative;
                i:first-of-type {
                    width: 22rem/@w;
                    height: 22rem/@w;
                    display: inline-block;
                    position: absolute;
                    left: 15rem/@w;
                    top: 15rem/@w
                }
                span {
                    font-size: 16rem/@w;
                    color: #333;
                    display: inline-block;
                    padding-left: 52rem/@w;
                }
                i:last-of-type {
                    background: url("../../assets/img/icon-r.png");
                    background-size: 18rem/@w;
                    width: 18rem/@w;
                    height: 18rem/@w;
                    position: absolute;
                    right: 15rem/@w;
                    top: 16rem/@w;
                }
                .myd {
                    background: url("../../assets/img/icon_myd.png") no-repeat;
                    background-size: 20rem/@w;
                    top: 17rem/@w !important;
                }
                .myf {
                    background: url("../../assets/img/my_collicon.png") no-repeat;
                    background-size: 20rem/@w;
                }
                .myw {
                    background: url("../../assets/img/icon_myw.png") no-repeat;
                    background-size: 20rem/@w;
                }
            }
        }
        .bt {
            border-bottom: 1px solid #e1e1e1;
        }
    }
</style>
