/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {formatDate} from '../../common/utils'
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
            items: {},
            modTime(item){
                return formatDate(item.date)
            },
            loadOver: false,
            allLoaded: true,
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
        getList(){
            /**
             * 我的设计列表
             */
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$http.p('getMyCustomDesign', {
                pageSize: 20,
                pageNum: 1,
                customizedType: 2
            }).then((response) => {
                this.items = response[0];
                if (this.items.total > 20) {
                    this.allLoaded = false;
                } else {
                    this.loadOver = true;
                }
                Indicator.close();
                if (response[0].isSign) {
                    this.$store.commit('upSing', {
                        is: true,
                        fullPath: 'account/desgins'
                    });
                }
                //微信二次分享
                wxShare.init({
                    'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                    'shareImg': 'http://www.shoelives.com/assets/img/view4_item_left.jpg',
                    'shareDesc': "【快来看看我的设计吧- 来自鞋生活】"
                });
            });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottomUse() {
            this.nn++;
            this.$http.p('getMyCustomDesign', {
                pageSize: 20,
                pageNum: this.nn,
                customizedType: 2
            }).then((response) => {
                this.items.list = this.items.list.concat(response[0].list);
                if (response[0].list.length < 20) {
                    this.allLoaded = true;
                    this.loadOver = true;
                }
                this.$refs.loadmore.onBottomLoaded();
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
        document.title = "我的设计";
        wxShare.redir();
        let code = urlData('code');
        if (code) return;
        this.getList()
    },
    components: {
        HeaderWrap: require('../../components/header.vue'),
        LoginWrap: require('../../components/login/index.vue')
    },
}