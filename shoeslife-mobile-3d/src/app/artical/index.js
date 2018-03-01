/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {timeDiff} from '../common/utils'
import {Toast} from 'mint-ui';
import wxShare from '../common/wxShare';
export default {
    data(){
        return {
            isHome: false,
            showUsr: true,
            isActive: false,
            isShow: false,
            activeClass: 'isActive',
            errorClass: 'notActive',
            follow: 'follow',
            item: {},
            systemTime: null,
            id: null,
            defaultPhoto:'../../../assets/img/userHead.png'
        }
    },
    computed: {
        shoeList(){
            return this.item.articleProduct && this.item.articleProduct.length && this.item.articleProduct.length > 10 ?
                this.item.articleProduct.slice(0, 10) : this.item.articleProduct
        },
        releaseTime(){
            return timeDiff(this.item.modifyTime, this.systemTime)
        },
        isSign() {
            return this.$store.state.isSign;
        }
    },
    methods: {
        attention(){
            /**
             * 获取个人信息ID
             */
            this.$http.p('getMyMess').then((response) => {
                if (response[0].isSign) {
                    this.$store.commit('upSing',{
                        is: true,
                        fullPath: 'artical/'+this.$route.params.id
                    });
                } else {
                    /**
                     * 是否关注
                     */
                    this.$http.p({name: 'isFollowed', id: this.id}).then((res) => {
                        if (res[0]) {
                            this.$http.p({name: 'delFollow', id: this.id}).then((resp) => {
                                this.isActive = resp[0]
                                Toast({
                                    message: '取消关注',
                                    duration: 500
                                });
                            });
                        } else {
                            this.$http.p({name: 'addFollow', id: this.id}).then((resp) => {
                                this.isActive = resp[0]
                                Toast({
                                    message: '已关注',
                                    duration: 500
                                });
                            });
                        }
                    });
                }
            });
        },
        isOpen(){
            this.isShow = !this.isShow
        },
        toHome() {
            this.$router.push('/');
        },
        toUser(){
            this.$router.push('/account/index');
        },
        getDetail(){
            /**
             * 文章详情
             */
            this.$http.p({name: 'getArticalDetail', id: this.$route.params.id}).then((response) => {
                this.item = response[0]
                this.id = response[0].editorId;
            });
        }
    },
    created(){
        this.$http.p({name: 'getArticalDetail', id: this.$route.params.id}).then((response) => {
            this.item = response[0]
            this.id = response[0].editorId
            if (!response[0].isSign) {
                this.$http.p({name: 'isFollowed', id: response[0].editorId}).then((res) => {
                    if(res.returncode == '0'){
                        this.isActive = res[0]
                    }else {
                        this.isActive = false
                    }
                });
            }else {
                this.isActive = false
            }
            //微信二次分享
            wxShare.init({'shareTitle':"鞋生活，开启您的定制生活！",
                'shareImg':this.$img+response[0].icon,
                'shareDesc':'【'+response[0].title+'分享了文章- 来自鞋生活】'});
        });

        /**
         * 获取系统时间
         */
        this.$http.p('getSystemTime').then((response) => {
            this.systemTime = response[0]
        });
    },
    mounted() {
        document.title = "文章主页";
        document.getElementsByTagName('body')[0].scrollTop = 0;
    },
    components: {
        HeaderWrap: require('../components/header.vue'),
        FooterWrap: require('../components/footer.vue'),
        LoginWrap: require('../components/login/index.vue')
    },
}