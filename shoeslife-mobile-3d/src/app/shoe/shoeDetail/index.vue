<template>
    <section id="shoeDetail">
        <header-wrap :on-click="toHome" :isHome="isHome" :showUsr="showUsr"></header-wrap>
        <mt-popup  v-model="$store.state.isSign" closeOnClickModal='true'  position="bottom"> <login-wrap ></login-wrap></mt-popup>
        <div class="carousel">
            <mt-swipe :auto="3000" :showIndicators="coverPhoto.length>1">
                <mt-swipe-item v-for="item in coverPhoto">
                    <div class="item"><img :src="item" alt=""></div>
                </mt-swipe-item>
            </mt-swipe>
            <div class="video" @click="play" v-show="showPlay">
                <img :src="coverPhoto[0]" alt="">
                <div class="mark">
                    <i><img src="../../../assets/img/icon-play.png" alt=""></i>
                </div>
            </div>
            <div class="video-wrap" v-show="showVideo">
                <video :src="$img+videoUrl" controls ref="video"></video>
            </div>
        </div>
        <div class="intro bt">
            <h2>{{shoesData.shoeName}}</h2>
            <div class="clearfix">
                <span class="price" v-if="status">¥{{shoesData.bottomPrice}} — ¥{{shoesData.topPrice}}</span>
                <span class="price" v-else="status">¥{{shoesData.price}}</span>
                <div class="hits clearfix" v-if="designTotal">
                    <router-link :to="listUrl">
                        <i v-for="item in designPhoto"><img :src="item" alt=""></i>
                        <span>{{designTotal}}设计</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="recommend-design bt" v-show="recommend">
            <h3>推荐设计</h3>
            <div class="shoe-class">
                <ul class="clearfix" :style="{width:listWidth}">
                    <li v-for="item in recommendData">
                        <router-link :to="{path:'/design/details/'+item.customizedId+'/1'}">
                            <img :src="item.rendering" alt="">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="designer bt">
            <h3>设计师</h3>
            <div class="info clearfix">
                <router-link :to="{path:'/designer/'+designInfo.id}">
                    <div class="pic"><img :src="this.$img+designInfo.photo" alt=""></div>
                    <div class="txt">
                        <h4> {{shoesData.designer}}</h4>
                        <p><span>关注 {{designInfo.followNum}}</span><i></i><span>鞋款 {{designInfo.shoesNum}}</span></p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="shoe-detail">
            <h3>鞋款详情</h3>
            <div v-for="item in introducePhoto"><img :src="item" alt=""></div>
        </div>
        <div class="footer">
            <ul class="clearfix">
                <li @click.stop="collect"><i :class="{collect:isCollect}"></i><p>{{isCollect?'已收藏':'收藏'}}</p></li>
                <li @click="toBuy">购买</li>
                <li><router-link :to="{path:'/design/'+shoesData.shoeId+'/'+star}">开始设计</router-link> </li>
            </ul>
        </div>
        <footer-wrap class="pt50"></footer-wrap>
    </section>
</template>
<script>
    import './index.less';
    import { Toast } from 'mint-ui';
    import wxShare from '../../common/wxShare';
    export default{
        data(){
            let star = 1;
            if(this.$route.query.star=='preview')
                star = this.$route.query.star;
            return {
                star:star,
                showVideo: false,
                showPlay: false,
                isHome: false,
                showUsr: true,
                shoeId: this.$route.params.id,
                shoesData: {},
                videoUrl: '',
                coverPhoto: [],
                msg: '',
                recommend: true,
                recommendData: [],
                listWidth: '',
                designTotal: 0,
                designPhoto: [],
                introducePhoto: [],
                listUrl: "/design/list/" + this.$route.params.id+"/1",
                designInfo: [],
                isCollect:false,
                signStatus:0,
                status:1
            }
        },
        methods: {
            play(){
                let myVideo=this.$refs.video;
                myVideo.play();
                this.showVideo = true;
                myVideo.addEventListener('pause',function(){
                    this.showVideo = false;
                }.bind(this));

                myVideo.addEventListener('play',function(){
                    this.showVideo = true;
                }.bind(this))
            },
            toHome() {
                this.$router.push('/');
            },
            toUser(){
                this.$router.push('/account/index');
            },
            shoeinfo(){
                this.$http.p({name: 'shoeInfo', id: this.shoeId}).then((response) => {
                    this.design(response[0].designerId);
                    //console.log(response[0].bottomPrice,response[0].topPrice)
                    if(response[0].bottomPrice===response[0].topPrice){
                        this.status=0;
                    }else{
                        if(response[0].status==='OFFLINE'||response[0].status==='UPLOADED'){
                            if(!this.$route.query.star){
                                Toast({
                                    message: '当前鞋款已下架',
                                    position: 'center',
                                    duration: 1500
                                });
                                setTimeout(()=>{
                                    this.$router.go(-1)
                                },2000);
                                return true;
                            }
                        }
                    }
                    //微信二次分享
                    wxShare.init({'shareTitle':"鞋生活，诠释妳的鞋履美学！",'shareImg':'http://shoelives.oss-cn-shenzhen.aliyuncs.com/'+response[0].coverPhoto.split(",")[0],
                        'shareDesc':'【最流行鞋款已上新- 来自鞋生活】'});

                    this.shoesData = response[0];
                    this.videoUrl = this.shoesData.video;
                    this.videoUrl === ""||this.videoUrl === null ? this.showPlay = false : this.showPlay = true;
                    let coverPhoto = this.shoesData.coverPhoto.split(",");
                    coverPhoto.forEach((e) => {
                        this.coverPhoto.push(this.$img+ e);
                    });
                    if (response[0].introducePhoto === "") {
                        this.introducePhoto = this.coverPhoto;
                        return false;
                    } else {
                        let introducePhoto = this.shoesData.introducePhoto.split(",");
                        introducePhoto.forEach((e) => {
                            this.introducePhoto.push(this.$img+ e);
                        })
                    }
                })
            },
            customizeSearch(){
                //推荐设计
                this.$http.p('customizeSearch', {
                    "customizedType": 2,
                    "isRecommend": true,
                    "orderBy": "createTime DESC",
                    "pageNum": 1,
                    "pageSize": 20,
                    "shoeId": this.shoeId
                }).then((res) => {
                    if (res[0].total === 0) {
                        this.recommend = false;
                        return true;
                    }
                    let rdata = res[0].list;
                    rdata.forEach((e) => {
                        this.recommendData.push({
                            'rendering': this.$img + '/' + e.rendering.split(',')[0],
                            customizedId: e.customizedId
                        });
                    });
                    this.listWidth = 110 * res[0].total / 25 + 'rem';
                })

                //设计列表
                this.$http.p('customizeSearch', {
                    "customizedType": 2,
                    "isRecommend": false,
                    "original":true,
                    "orderBy": "createTime DESC",
                    "pageNum": 1,
                    "pageSize": 3,
                    "isOpen":true,
                    "shoeId": this.shoeId
                }).then((res) => {
                    let userInfo = [];
                    let rdata = res[0].list;
                    rdata.forEach((e) => {
                        let photo =e.userInfo.photo;
                        if(photo)
                            photo.indexOf("http://") === 0 ? photo = e.userInfo.photo : photo = this.$img + photo;
                        else
                            photo='http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png';
                        userInfo.push(photo)
                    });
                    this.designPhoto = userInfo;
                    if(res[0].total>=10000){
                        this.designTotal = (res[0].total/10000).toFixed(1) +'万';
                    }else{
                        this.designTotal = res[0].total;
                    }
                })
            },
            design(did){
                this.$http.p({name: "designer", id: did}).then((res) => {
                    this.designInfo = res[0]
                })
            },
            toBuy(){
                window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android"
            },
            collect(event,is){
                this.signStatus++;
                this.$http.p({name: "queryCollect", id: this.shoeId},{},{isMessage:false}).then((res) => {
                    if (res[0].isSign) {
                       if(is)
                           return false;
                        this.$store.commit('upSing', {
                            is: true,
                            fullPath:  'shoes/'+this.shoeId
                        });
                    }else{
                        if (res[0].keep) {
                            this.isCollect = true;
                            this.signStatus = 0;
                        }
                        let text="";
                        if(event===undefined){
                            return true;
                        }
                        if (event.target.tagName === 'I' || event.target.tagName === 'P') {
                            text=event.target.parentNode.innerText.replace(/(^\s*)|(\s*$)/g, "");
                        }else{
                            text=event.target.innerText.replace(/(^\s*)|(\s*$)/g, "");
                        }
                        if(text==='已收藏') {
                            this.$http.p({name:"collectCancel","id":res[0].customizedId}).then((res) => {
                                this.isCollect = false;
                             })
                        }else{
                            this.$http.p("collectShoe", {"customizedType": 1, "shoeId": this.shoeId}).then((res) => {
                                this.isCollect = true;
                                this.signStatus = 0;
                            })
                        }
                    }
                })
            }
        },
        components: {
            HeaderWrap: require('../../components/header.vue'),
            FooterWrap: require('../../components/footer.vue'),
            LoginWrap: require('../../components/login/index.vue')
        },
        create(){
            document.documentElement.scrollTop=0;
            document.body.scrollTop=0;
            document.getElementsByTagName('body')[0].scrollTop = 0;
        },
        mounted(){
            document.title = '鞋款详情';
            wxShare.redir();
            this.shoeinfo();
            this.customizeSearch();
            this.collect({},true);
        },
        watch: {
            isSign(curVal){
                if (curVal){
                    return false;
                }else{
                    this.collect({},true);
                }
            },
        },
        computed: {
            isSign() {
                return this.$store.state.isSign;
            }
        },
    }
</script>