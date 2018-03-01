/**
 * index.js
 * @date Created on 2017/5/19
 * @author Jamie
 *
 */
import {LoadScene} from '../common/three/loadScene.js';
import {CTMModel} from '../common/three/ctmModel.js';
import App from '../common/app.js';
import {is_phone} from '../common/utils.js';
import {Toast} from 'mint-ui';
var modeDefaults = function (d, is) {
    var isGroup;
    d.map((item) => {
        isGroup = true;
        item.mode.map((mode, i) => {
            if (mode.isGroup) {
                mode.mode.map((group, j) => {
                    if (group.isMain && is && isGroup) {
                        group.isDefault = true;
                        isGroup = false;
                        return;
                    }
                    group.isDefault = false;
                })
            } else {
                if (i || is == false) {
                    mode.isDefault = false;
                    isGroup = false;
                } else mode.isDefault = true;
            }
        })
    })
}

var http = function (id) {
    this.$http.g({name: 'shoeInfo3D', id: id}).then((d) => {
        d = d[0];
        modeDefaults(d.upper, true);
        modeDefaults(d.heel, false);
        for (var i in d) {
            if (this[i]) this[i] = d[i];
        }

        this.loadStart(d);
    });
}
export default {
    data(){
        return {
            Model: this.$store.state.Model,
            isLoading: true,
            heel: [],
            upper: [],
            adType: null,
            isAndroid: false,
            isIOS: true,
        }
    },
    computed: {},
    methods: {
        loadStart(shoeData) {
            var that = this;
            this.Model.init({
                shoeData: shoeData,
                container: this.$refs.showShoe,
                url: this.$img,
                loadingFunc: loadingFunc

            });
            function loadingFunc() {
                if (that.isLoading) {
                    that.isLoading = false;
                }
            }
        },
    },
    created(){
        /**
         * 1-她社区
         * 2-今日头条
         * 3-微博（应用家
         * 4-微博（博文）
         */
        this.adType = this.$route.params.type
        this.isAndroid = is_phone('android')
        this.isIOS = is_phone('ios')
    },
    mounted() {
        document.title = "我要设计";
        // true 一次设计（设计师）false  二次设计
        http.call(this, this.$route.params.id + '/' + true);
    },
    components: {
        HeaderWrap: require('./gformat.vue'),
    },
}