/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {timeDiff} from '../common/utils'
import {Toast} from 'mint-ui';
import wxShare from '../common/wxShare';
export default{
    data(){
        return {
            isHome: false,
            showUsr: true,
            items: {},
            isFollow: false,
            aticalList: {},
            systemTime: null,
            releaseTime(item){
                return timeDiff(item.modifyTime, this.systemTime)
            },
            id: null,
            defaultPhoto:'http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png'
        }
    },
    methods: {
        toHome() {
            this.$router.push('/');
        },
        toUser(){
            this.$router.push('/account/index');
        },
        loadMore(){
            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android";
        },
        attention(){
            /**
             * 获取个人信息ID
             */
            this.$http.p('getMyMess').then((response) => {
                if (response[0].isSign) {
                    this.$store.commit('upSing',{
                        is: true,
                        fullPath: 'user/'+this.$route.params.id
                    });
                } else {
                    /**
                     * 是否关注
                     */
                    this.$http.p({name: 'isFollowed', id: this.id}).then((res) => {
                        if (res[0]) {
                            this.$http.p({name: 'delFollow', id: this.id}).then((resp) => {
                                this.isFollow = resp[0]
                                Toast({
                                    message: '取消关注',
                                    duration: 500
                                });
                            });
                        } else {
                            this.$http.p({name: 'addFollow', id: this.id}).then((resp) => {
                                this.isFollow = resp[0]
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
    },
    created(){
        /**
         * 主编信息
         */
        this.$http.p({name: 'getEditorDetail', id: this.$route.params.id}).then((response) => {
            this.items = response[0]
            this.isFollow = response[0].follow;
            this.id = response[0].id;

            //微信二次分享
            wxShare.init({
                'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                'shareImg': this.$img + response[0].photo,
                'shareDesc': '【'+response[0].userName+'主编的首页- 来自鞋生活】'
            });

        });
        /**
         * 主编发表过的文章
         */
        this.$http.p('getEditorArticleList', {
            pageSize: 20,
            pageNum: 1,
            editorId: this.$route.params.id
        }).then((response) => {
            this.aticalList = response[0]
        });
        /**
         * 获取系统时间
         */
        this.$http.p('getSystemTime').then((response) => {
            this.systemTime = response[0]
        });
    },
    computed: {
        isSign() {
            return this.$store.state.isSign;
        }
    },
    mounted(){
        document.title = "主编主页";
        wxShare.redir();
        document.getElementsByTagName('body')[0].scrollTop = 0;
    },
    components: {
        HeaderWrap: require('../components/header.vue'),
        FooterWrap: require('../components/footer.vue'),
        LoginWrap: require('../components/login/index.vue')
    },
}