<template>
    <div class="userDesign">
        <mt-loadmore :bottom-method="loadmore" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"
                     ref="loadmore" bottomPullText="">
            <div class="wrap">
                <ul class="design-list clearfix">
                    <li v-for="item in recommendData" class="clearfix">
                        <router-link :to="{path:'/design/details/'+item.id+'/1'}">
                            <div><img :src="item.rendering" alt=""></div>
                            <p><img :src="item.userImg" alt=""><span>{{item.userName}}</span></p>
                        </router-link>
                    </li>
                </ul>
                <p class="loadOver" v-if="loadOver">已经全部加载完毕</p>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import './index.less';
    import wxShare from '../../common/wxShare';
    export default {
        data(){
            return {
                shoeId: this.$route.params.id,
                recommendData: [],
                allLoaded: false,
                bottomStatus: '',
                loadOver:false,
                nn:1,
            }
        },
        methods: {
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            customizeSearch(){
                this.$http.p('customizeSearch', {
                    "customizedType": 2,
                    "isRecommend": false,
                    "original":true,
                    "orderBy": "createTime DESC",
                    "pageNum": this.nn,
                    "pageSize": 18,
                    "isOpen":true,
                    "shoeId": this.shoeId
                }).then((res) => {
                    let rdata = res[0].list;

                    //微信二次分享
                    wxShare.init({'shareTitle':"鞋生活，诠释妳的鞋履美学！",
                        'shareImg':'http://shoelives.oss-cn-shenzhen.aliyuncs.com/'+rdata[0].rendering,
                        'shareDesc':'来看看我的专属定制吧！'});

                    this.nn++;
                    this.$refs.loadmore.onBottomLoaded();
                    rdata.forEach((e) => {
                        //console.log(e.customizedId);
                        let photo = e.userInfo.photo;
                        if(photo)
                            photo.indexOf("http://") === 0 ? photo = e.userInfo.photo : photo = this.$img + photo;
                        else
                            photo='http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png';
                        this.recommendData.push({
                            'rendering': this.$img+ e.rendering,
                            'userName': e.userInfo.adminName,
                            'userImg': photo,
                            'id': e.customizedId
                        });
                    });
                    //停止下拉
                    if(!res[0].size||res[0].total<=18||rdata.length<18){
                        this.allLoaded = true;
                        this.loadOver=true;
                    }
                })
            },
            loadmore(){
                //console.log('load more...');
                this.customizeSearch();
            }
        },
        mounted: function () {
            document.title = "用户设计";
            wxShare.redir();
            document.getElementsByTagName('body')[0].scrollTop = 0;
            this.customizeSearch()
        },
    }
</script>
