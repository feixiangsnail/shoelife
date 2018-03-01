<template>
    <section id="home">
        <header-wrap :on-click="toShoeLists" :isHome="isHome" :showUsr="showUsr"></header-wrap>
        <div class="banner" v-if="banner.length>0">
            <mt-swipe :auto="3000" :showIndicators="banner.length>1">
                <mt-swipe-item v-for="item in banner">
                    <a :href="item.url">
                        <div><img :src="$img+item.icon"></div>
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="shoesClass">
            <ul class="clearfix">
                <li v-for="item in shoesList">
                    <router-link :to="{path:'/shoelist/'+item.categoryId}">
                        <div :style="item.icon===''?'background:#f4f4f4':'background:transparent'"><img :src="$img+item.icon" v-if="item.icon!==''">
                        </div>
                        <p class="tc">{{item.categoryName}}</p>
                    </router-link>
                </li>
                <li @click="toShoeLists">
                    <div><img src="../../assets/img/icon-list1.png" alt=""></div>
                    <p class="tc">鞋款分类</p>
                </li>
            </ul>
        </div>
        <div class="newClass">
            <h2>新款上架</h2>
            <div class="shoe-list">
                <ul class="clearfix" :style="{width:((newClass.length)*117/25)+'rem'}">
                    <li v-for="item in newClass">
                        <router-link :to="{path:'/shoes/'+item.id}">
                            <div><img :src='item.img'></div>
                            <p>{{item.shoeName}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="popClass clearfix">
            <div class="popShoe">
                <router-link to="/tops"><img :src="$img+topsImg"></router-link>
            </div>
            <div class="popShoe">
                <a :href="findDesigner.url">
                    <img :src="$img+findDesigner.icon">
                </a>
            </div>
        </div>
        <div class="seriesTheme" v-if='seriesTheme.length'>
            <h2>系列主题</h2>
            <div class="item" v-for="c in seriesTheme">
                <div class="focus-pic">
                    <a :href="c.url">
                        <img :src="$img+c.icon" alt="">
                    </a>
                </div>
                <div class="shoe-list">
                    <ul class="clearfix"
                        :style="{ width:(c.shoeInfos.length)>=8?((c.shoeInfos.length+1)*110/25)+'rem':((c.shoeInfos.length)*110/25)+'rem'}">
                        <li v-for="item in c.shoeInfos">
                            <router-link :to="{path:'/shoes/'+item.shoeId}">
                                <img :src="$img+item.coverPhoto.split(',')[0]">
                            </router-link>
                        </li>
                        <li v-if="c.shoeInfos.length>=8">
                            <a :href="c.url">
                                查看全部
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="featureFashion">
            <h2>时尚特辑</h2>
            <ul>
                <li v-for="item in featureFashion">
                    <router-link :to="{path:'/artical/'+item.articleId }">
                        <div class="pic"><img :src="$img+item.icon"></div>
                        <div class="plate clearfix">
                            <i><img :src="$img+item.secondCategoryIcon"></i>
                            <span>{{item.secondCategoryName}}</span>
                        </div>
                        <p>{{item.title}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="shoesKnew" v-if="shoesKnew.length">
            <h2>鞋履知识</h2>
            <ul>
                <li v-for="item in shoesKnew">
                    <router-link :to="{path:'/artical/'+item.articleId }">
                        <p>{{item.title}}</p>
                        <i></i>
                    </router-link>
                </li>
            </ul>
        </div>
        <footer-wrap></footer-wrap>
    </section>
</template>
<script>
    import './index.less';
    import wxShare from '../common/wxShare';
    export default{
        data(){
            return {
                newClass: [],
                topsImg: '',
                isHome: true,
                showUsr: true,
                findDesigner: {url: "", icon: ''},
                shoesList: [],
                featureFashion: [],
                shoesKnew: [],
                seriesTheme: [],
                banner: []
            }
        },
        methods: {
            toShoeLists() {
                this.$router.push('./category');
            },
            newShoes(){
                this.$http.p("shoeNew", {
                    "pageNum": 1,
                    "pageSize": 10,
                    "popularityType": 365
                }).then((response) => {
                    response[0].list.forEach((e) => {
                        this.newClass.push({"img": this.$img + e.sightPhoto, "shoeName": e.shoeName, id: e.shoeId});
                    })
                })
            },
            categorySearch(){
                this.$http.p("categorySearch", {"categoryType": 1}).then((res) => {
                    this.shoesList = res.slice(0, 3);
                });
            },
            commonPlay(i){
                this.$http.p({name: "commonPlay", id: i}).then((res) => {
                    //if(!res[0]){
                    if (i === 5) {
                        this.findDesigner = res[0][0];
                        this.commonPlay(6);
                    } else if (i === 6) {
                        if (res[0][0] !== undefined) this.topsImg = res[0][0].icon;
                        this.commonPlay(1);
                    } else {
                        this.banner = res[0];
                        //微信二次分享
                        wxShare.init({
                            'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                            'shareImg': this.$img + res[0][0].icon,
                            'shareDesc': "【为女性独家定制一款适合自己的鞋- 来自鞋生活】"
                        });
                    }
                    //}

                });
            },
            fashion(){
                this.$http.p("homesearch", {"pageNum": 1, "pageSize": 20}).then((res) => {

                    this.featureFashion = res[0].list;
                });
            },
            loadshoesKnew(){
                this.$http.p("articleSearch", {"pageNum": 1}).then((res) => {
                    this.shoesKnew = res[0].list;
                });
            },
            subjectSearch(){
                this.$http.p("subjectSearch", {"pageNum": 1, "pageSize": 100}).then((res) => {
                    this.seriesTheme = res[0].list;
                });
            },
        },
        components: {
            //  topWrap: require('../components/gformat.vue'),
            HeaderWrap: require('../components/header.vue'),
            FooterWrap: require('../components/footer.vue'),
        },
        mounted(){
            document.title = "鞋生活";
            wxShare.redir();
            setTimeout(() => {
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 100);
            this.newShoes();
            this.commonPlay(5);
            this.categorySearch();
            this.fashion();
            this.loadshoesKnew();
            this.subjectSearch();
        },
        create(){
            document.getElementsByTagName('body')[0].scrollTop = 0;
        }
    }
</script>
