<template>
    <div class="shoeCategory">
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <div class="wrap ">
            <div class="wrap-item bt clearfix">
                <h3>推荐</h3>
                <ul class="shoe-list clearfix">
                   <li v-for="item in recommend">
                       <router-link :to="{path:'/shoelist/'+item.categoryId}">
                            <div :style="item.icon===''?'':'background:transparent'"><img :src="$img+item.icon" v-if="item.icon!==''"></div>
                            <p>{{item.categoryName}}</p>
                       </router-link>
                    </li>
                </ul>
            </div>
            <div class="wrap-item bt clearfix">
                <h3>设计风格</h3>
                <ul class="shoe-list clearfix">
                    <li v-for="item in designStyle">
                        <router-link :to="{path:'/shoelist/'+item.categoryId}">
                            <div :style="item.icon===''?'':'background:transparent'"><img :src="$img+item.icon" v-if="item.icon!==''"></div>
                            <p>{{item.categoryName}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="wrap-item clearfix">
                <h3>款式分类</h3>
                <ul class="shoe-list clearfix">
                    <li v-for="item in shoeClass">
                        <router-link :to="{path:'/shoelist/'+item.categoryId}">
                            <div :style="item.icon===''?'':'background:transparent'"><img :src="$img+item.icon" v-if="item.icon!==''"></div>
                            <p>{{item.categoryName}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <footer-wrap></footer-wrap>
    </div>
</template>

<script>
    import './index.less';
    import wxShare from '../../common/wxShare';
    export default {
        data(){
            return {
                recommend: [],
                designStyle: [],
                shoeClass: [],
                isHome:false,
                showUsr:true
            }
        },
        methods: {
            toHome() {
                this.$router.push('/');
            },
            toUser(){
                this.$router.push('/account/index');
            },
            toloadClass(nn){
                let data={"categoryType": nn};
                nn !==1 ? data["parentId"]=0 :'';
                if(nn===111){
                    data.categoryType=1;
                }
                this.$http.p("categorySearch",data).then((res) => {
                    if(nn===1){
                        this.recommend=res.slice(0,4);
                        this.toloadClass(4);
                        //微信二次分享
                        wxShare.init({
                            'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                            'shareImg': this.$img +  this.recommend[0].icon,
                            'shareDesc': "【按当下流行款式为您智能推荐- 来自鞋生活】"
                        });

                    }else if(nn===4){
                        this.designStyle=res;
                        this.toloadClass(111)
                    }else{
                        this.shoeClass=res;
                    }
                });
            }
        },
        components: {
            HeaderWrap: require('../../components/header.vue'),
            FooterWrap: require('../../components/footer.vue'),
        },
        mounted: function () {          // 挂在完成后的生命周期钩子注册。
            document.title = "鞋款分类";
            wxShare.redir();
            this.toloadClass(1,'');
        },
        create(){
            document.documentElement.scrollTop=0;
            document.body.scrollTop=0;
            document.getElementsByTagName('body')[0].scrollTop = 0;
        }
    }
</script>
