<template>
    <section id="designerHome" ref="designerHome">
        <mt-popup  v-model="$store.state.isSign" closeOnClickModal='true'  position="bottom"> <login-wrap ></login-wrap></mt-popup>
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <div class="header">
            <div class="wrap">
                <div class="topbg">
                    <img :src="this.$img+designInfo.photo" alt="">
                </div>
                <div class="content"></div>
            </div>
            <div class="intro">
                <div class="head-img"><img :src="this.$img+designInfo.photo" alt=""></div>
                <h3>{{designInfo.adminName}}</h3>
                <p class="hits">关注 {{designInfo.followNum}}</p>
                <div class="follow" @click.stop="follow" v-html="isfollow ? '已关注' : '<i>+</i><span>关注</span>'"></div>
                <p class="int">{{designInfo.introduction?designInfo.introduction:designInfo.adminName}}</p>
            </div>
        </div>
        <div class="title" ref="title" :class="{fixed:scroll>titleTop}">
            <ul class="clearfix">
                <li v-for="(item,index) in title" @click="switchMean($event,index)"><span :class="{'ac':index==ac}">{{item}}</span>
                </li>
            </ul>
        </div>
        <div class="introduce" v-if="ac==0"  :class="{paddingTop:scroll>titleTop}">
            <div v-html="designInfo.profils"></div>
        </div>
        <div class="shoeClass" v-else-if="ac==1"  :class="{paddingTop:scroll>titleTop}">
            <ul class="clearfix">
                <li v-for="item in shoesClass.list">
                    <router-link :to="{path:'/shoes/'+item.shoeId}">
                        <div class="pic"><img :src="$img+item.coverPhoto.split(',')[0]" alt=""></div>
                        <div class="txt">
                            <h4>{{item.shoeName}}</h4>
                            <p class="price">¥{{item.price}}</p>
                            <p class="remark">{{item.customizeNumber === null ? 0 : item.customizeNumber}}设计</p>
                        </div>
                    </router-link>
                </li>
                <li @click="loadMore">
                    查看更多
                </li>

            </ul>
        </div>

        <div class="news" v-else  :class="{paddingTop:scroll>titleTop}">
            <ul v-if="designNews.total>0">
                <li class="clearfix" v-for=" item in designNews.news">
                    <router-link :to="{path:'/dynamic/'+item.designerDynamicId}">
                        <div class="pic"><img :src="$img+item.icon.split(',')[0]" alt=""></div>
                        <div class="txt">
                            <p>{{item.title}}</p>
                            <div><span>{{item.releaseTime}}</span><i></i><img src="../../assets/img/icon_viewAll.svg"
                                                                                 alt=""><span>{{item.browseNum}}</span>
                            </div>
                        </div>
                    </router-link>
                </li>
                <li @click="loadMore">查看更多动态</li>
            </ul>
            <div class="nonews" v-else>
                <div><img src="../../assets/img/noNews.png" alt="暂无设计师动态"></div>
                <p>暂无设计师动态哦~</p>
            </div>
        </div>
        <footer-wrap></footer-wrap>
    </section>
</template>

<script>
    import './index.less';
    import {timeDiff} from '../common/utils';
    import wxShare from '../common/wxShare';
    let status=0;
    export default{
        data(){
            return {
                ac: 0,
                title: ["个人简介", "鞋款", "动态"],
                isHome: false,
                showUsr: true,
                designerId: this.$route.params.id,
                designInfo: [],
                designNews: {},
                shoesClass: {},
                systemTime: null,
                isfollow:false,
                titleTop:'0',
                fixed:false,
                scroll:0,
            }
        },
        methods: {
            follow(){
                if (this.isfollow) {
                    this.$http.p({name: 'delFollow', id: this.designerId}).then((response) => {
                        this.isfollow = response[0]
                    });
                } else {
                    this.$http.p({name: 'addFollow', id: this.designerId}).then((response) => {
                        if (response[0].isSign) {
                            this.$store.commit('upSing', {
                                is: true,
                                fullPath: 'designer/' + this.designerId
                            });
                        }else{
                            this.isfollow = response[0]
                        }
                    });
                }

            },
            switchMean(event, index){
                this.ac = index;
            },
            toHome() {
                this.$router.push('/');
            },
            toUser(){
                this.$router.push('/account/index');
            },
            designer(){
                this.$http.p({name: "designer", id: this.designerId}).then((res) => {
                    this.designInfo = res[0];
                    this.isfollow=res[0].follow;

                    //微信二次分享
                    wxShare.init({'shareTitle':"鞋生活，开启您的定制生活！",
                        'shareImg':this.$img+res[0].photo,
                        'shareDesc':'【'+res[0].adminName+'设计师的首页- 来自鞋生活】'});
                });
                this.designerNews();
                this.shoeClass();
            },
            designerNews(){
                this.$http.p("designerdynamic", {
                    "designerId": this.designerId,
                    "pageNum": 1,
                    "pageSize": 20
                }).then((res) => {
                    res[0].list.forEach((e) => {
                        // e.releaseTime = parseInt((new Date().getTime() - e.releaseTime) / 1000 / 60 / 60)
                        e.releaseTime =timeDiff(e.releaseTime,this.systemTime);
                    });
                    this.designNews = {'news': res[0].list, 'total': res[0].total};
                })
            },
            shoeClass(){
                this.$http.p("shoeAppsearch", {
                    "selectedDesignerId": [this.designerId],
                    "pageNum": 1,
                    "pageSize": 20
                }).then((res) => {
                    this.shoesClass.total = res[0].total;
                    this.shoesClass.list = res[0].list;
                })
            },
            loadMore(){
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android";
            },
            menu() {
                this.scroll = document.body.scrollTop;
            }
        },
        mounted(){
            document.title = "设计师主页";
            wxShare.redir();
            this.designer();
            this.$http.p('getSystemTime').then((response) => {
                this.systemTime = response[0]
            });
            window.addEventListener('scroll', this.menu);
            status=1;
            document.getElementsByTagName('body')[0].scrollTop = 0;
        },
        watch: {
            isSign(curVal){
                if (curVal) return;
                this.designer()
            },
        },
        computed: {
            isSign() {
                return this.$store.state.isSign;
            }
        },
        updated: function () {
            if(status){
                this.titleTop=this.$refs.title.offsetTop;
                status=0;
            }
            let f=document.getElementById('footer');
            f.style.position=this.$refs.designerHome.clientHeight>(document.documentElement.clientHeight)?'':'absolute';
            //console.log(this.titleTop)
        },
        components: {
            HeaderWrap: require('../components/header.vue'),
            FooterWrap: require('../components/footer.vue'),
            LoginWrap: require('../components/login/index.vue')
        }
    }
</script>
