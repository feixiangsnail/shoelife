/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {timeDiff} from '../common/utils'
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
            id:null
        }
    },
    computed: {
        releaseTime(){
            return timeDiff(this.item.modifyTime,this.systemTime)
        },
        isSign() {
            return this.$store.state.isSign;
        }
    },
    methods: {
        attention(){
            if (this.isActive) {
                // 登陆用户ID 12504
                this.$http.p({name: 'delFollow', id: this.id}).then((response) => {
                    this.isActive = response[0]
                });
            } else {
                this.$http.p({name: 'addFollow', id: this.id}).then((response) => {
                    this.isActive = response[0]
                });
            }
        },
        getUserInfo(){
            /**
             * 获取个人信息ID
             */
            let context = this;
            this.$http.p('getMyMess').then((response) => {
                this.item = response[0]
                this.id = response[0].id
                /**
                 * 是否关注
                 */
                this.$http.p({name: 'isFollowed', id: this.id}).then((response) => {
                    context.isActive = response[0]
                    this.getDetail()
                });
                if (response[0].isSign) {
                    this.$store.commit('upSing',true);
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
             * 动态详情
             */
            this.$http.p({name: 'getDynamicDetail', id: this.$route.params.id}).then((response) => {
                this.item = response[0];

                //微信二次分享
                wxShare.init({
                    'shareTitle': "动态详情",
                    'shareImg': this.$img + response[0].photo,
                    'shareDesc': response[0].title
                });
            });
        }
    },
    created(){
        document.getElementsByTagName('body')[0].scrollTop = 0;
        this.getUserInfo();

        /**
         * 获取系统时间
         */
        this.$http.p('getSystemTime').then((response) => {
            this.systemTime = response[0]
        });
    },
    watch: {
        isSign(curVal, oldVal){
            if (curVal) return;
            this.getUserInfo()
        },
    },
    mounted() {
        document.title = "文章主页";
        wxShare.redir();
    },
    components: {
        HeaderWrap: require('../components/header.vue'),
        FooterWrap: require('../components/footer.vue'),
        LoginWrap: require('../components/login/index.vue')
    },
}