/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {Loadmore, Indicator} from 'mint-ui';
import {urlData} from '../../common/utils.js';
import wxShare from '../../common/wxShare';
export default{
    data(){
        return {
            isHome: false,
            showUsr: true,
            bottomText: '',
            bottomStatus: '',
            allLoaded: true,
            loadOver: false,
            items: {},
            nn: 1,
        }
    },
    methods: {
        toHome() {
            this.$router.push('/');
        },
        toUser(){
            this.$router.push('/account/index');
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottomUse() {
            this.nn++;
            this.$http.p('getMyCustomCollect', {
                pageSize: 20,
                pageNum: this.nn,
                customizedType: 1
            }).then((response) => {
                this.items.list = this.items.list.concat(response[0].list);
                if (response[0].list.length < 20) {
                    this.allLoaded = true;
                    this.loadOver = true;
                }
                this.$refs.loadmore.onBottomLoaded();
            });
        },
        getList(){
            /**
             * 我的收藏列表
             */
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$http.p('getMyCustomCollect', {
                pageSize: 20,
                pageNum: 1,
                customizedType: 1
            }).then((response) => {
                this.items = response[0]
                if (this.items.total > 20) {
                    this.allLoaded = false;
                } else {
                    this.loadOver = true;
                }
                Indicator.close();
                if (response[0].isSign) {
                    this.$store.commit('upSing', {
                        is: true,
                        fullPath: 'account/favorites'
                    });
                }
                //微信二次分享
                wxShare.init({
                    'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                    'shareImg': 'http://www.shoelives.com/assets/img/view4_item_left.jpg',
                    'shareDesc': "【快来看看我的收藏吧- 来自鞋生活】"
                });
            });
        }
    },
    created(){

    },
    watch: {
        isSign(curVal, oldVal){
            if (curVal) return;
            this.getList()
        },
    },
    computed: {
        isSign() {
            return this.$store.state.isSign;
        }
    },
    mounted(){
        document.title = "我的收藏";
        wxShare.redir();
        let code = urlData('code');
        if (code) return;
        this.getList();
    },
    components: {
        HeaderWrap: require('../../components/header.vue'),
        LoginWrap: require('../../components/login/index.vue')
    },
}