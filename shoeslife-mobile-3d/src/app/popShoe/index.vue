<template>
    <section class="popShoe">
        <ul class="shoe-list">
            <li class="item clearfix" v-for="(item,index) in popShoe">
                <router-link :to="item.shoeID">
                    <div class="item-l fl">{{index + 1}}</div>
                    <div class="item-r fl clearfix">
                        <div class="pic fl"><img :src="item.img"></div>
                        <div class="txt fl">
                            <h4>{{item.shoeName}}</h4>
                            <p>
                                <span class="hits"><img src="assets/img/icon-hits.png"></span>
                                <span class="num">{{item.score}}</span>
                            </p>
                        </div>
                    </div>
                </router-link>
            </li>

        </ul>
    </section>
</template>

<script>
    import './index.less';
    import wxShare from '../common/wxShare';
    export default {
        data(){
            return {
                popShoe: [],
            }
        },
        methods: {
            loadShoes(){
                this.$http.p('shoeAppsearch', {
                    "pageNum": 1,
                    "pageSize": 20,
                    "popularityType": 365
                }).then((response) => {
                    response[0].list.forEach((e) => {
                        this.popShoe.push({
                            "img": this.$img + '/' + e.coverPhoto.split(",")[0],
                            "shoeName": e.shoeName,
                            "score": e.score,
                            "shoeID":"shoes/"+e.shoeId
                        });
                    });

                    //微信二次分享
                    wxShare.init({
                        'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                        'shareImg': this.$img + response[0].list[0].coverPhoto.split(",")[0],
                        'shareDesc': "鞋生活，诠释妳的鞋履美学！"
                    });

                })
            }
        },
        mounted: function () {          // 挂在完成后的生命周期钩子注册。
            document.title = "人气鞋款";
            this.loadShoes();
        },
    }
</script>
