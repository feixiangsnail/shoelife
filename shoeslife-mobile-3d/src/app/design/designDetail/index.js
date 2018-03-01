import { LoadScene } from '../../common/three/loadScene.js';
import { CTMModel } from '../../common/three/ctmModel.js';
import App from '../../common/app.js';
import wxShare from '../../common/wxShare';
import { Toast } from 'mint-ui';
var modeDefaults = function(d, is) {
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

var http = function(id) {
    this.$http.g({ name: 'shoeInfo3D', id: id }).then((d) => {
        d = d[0];
        modeDefaults(d.upper, true);
        modeDefaults(d.heel, false);
        for (var i in d) {
            if (this[i]) this[i] = d[i];
        }

        this.loadStart(d);
    });
}
import { MessageBox } from 'mint-ui';
export default {
    data() {
        let star = true;
        if (this.$route.params.star == 2)
            star = false;
        return {
            isSign: true,
            shoeOff:false,
            soldOffff:false,
            soldOut: false,
            isActive: false,
            isHome: false,
            star: star,
            heel: [],
            upper: [],
            showUsr: true,
            designInfo: {},
            selfShare: false,
            todo1: '修改设计',
            todo2: '删除设计',
            headPhoto: '',
            materialUsedIds:[],
            freeRepair:0,
            Model:this.$store.state.Model,
            isLoading:true,
            outType:'您选择的款式或用料已下架，请修改设计。'
        }
    },
    methods: {
        switchbtn() {
            this.$http.g({ name: 'customizeOpen', id: this.designInfo.customizedId + "/" + this.isActive }).then((res) => {
                this.isActive = !this.isActive;
            })
        },
        toHome() {
            this.Model.clearAll();
            this.$router.push('/');

        },
        toUser() {
            this.Model.clearAll();
            this.$router.push('/account/index');
        },
        todo(e) {
            if (e.target.innerText === '我要设计') {
                this.Model.clearAll();
                this.$router.push({ path: '/design/' + this.designInfo.shoeId + '/1' })
            } else if (e.target.innerText === '保存设计') {
                this.$http.p( 'saveDesign',{
                        "customizedType": 2,
                        "materialUsedIds": this.materialUsedIds,
                        "shoeId": this.designInfo.shoeId,
                        "sourceCustomizeId": this.designInfo.customizedId,
                        "rendering":this.designInfo.image
                    }
                ).then((res) => {
                    if (res[0].isSign) {
                        this.$store.state.isSign = true;
                        if (res[0].isSign) {
                            this.$store.commit('upSing', {
                                is: true,
                                fullPath: 'design/details/' + this.$route.params.id + '/1'
                            });
                        }
                    } else {
                        Toast('保存成功！');
                        setTimeout(() => {
                            this.$router.push({ path: '/account/desgins' })
                        }, 1500)
                    }
                })
            } else if (e.target.innerText === '修改设计') {
                if(this.designInfo.shoeStatus === "OFFLINE"){
                    return true;
                }
                this.Model.clearAll();
                this.$router.push({ path: '/design/' + this.designInfo.customizedId + '/2' })
            } else if (e.target.innerText === '删除设计') {
                MessageBox({
                    message: '确定要删除该鞋款吗?',
                    showCancelButton: true
                }).then(action => {
                    if (action === 'confirm') {
                        this.$http.p({ name: 'delDesign', id: this.designInfo.customizedId }).then((res) => {
                            Toast('删除成功！');
                            setTimeout(() => {
                                this.$router.go(-1)
                            }, 1200)
                        })
                    }
                });
            }
        },
        loadStart(shoeData) {
            var that=this;
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
        loadShoeInfo() {
            this.$http.p({ name: 'customizeDetail', id: this.$route.params.id }).then((res) => {
                if(res[0].shoeStatus === "OFFLINE"){
                    this.outType='您选择的鞋款已下架，您可以删除设计。';
                    this.isLoading=false;
                    this.shoeOff=true;
                }else{
                    http.call(this, this.$route.params.id + '/' + false);
                }
                this.designInfo = res[0];
                if(this.designInfo.shoeStatus === "OFFLINE"||this.designInfo.heelStatus===0||this.designInfo.upperStatus===0){
                    this.soldOut = true;
                }
                /*if(this.designInfo.shoeStatus === "OFFLINE"){
                    this.shoeOff=true;
                }*/
                if(!this.designInfo.heelStatus){
                    this.soldOffff=true;
                }
                this.selfShare = this.designInfo.login;
                this.isActive = !this.designInfo.open;
                if (!this.designInfo.headPhoto) {
                    //this.headPhoto = 'http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png'
                } else {
                    if(!this.selfShare||this.designInfo.sourceCustomizeId!==null){
                        this.designInfo.headPhoto.indexOf("http://") === 0 ? this.headPhoto = this.designInfo.headPhoto : this.headPhoto = this.$img + this.designInfo.headPhoto;
                    }
                }

                let Repair={'0':'终身免费','1':'一个月内','3':'三个月内','6':'半年内','12':'一年内'};
                this.freeRepair=Repair[res[0].freeRepair];

                //微信二次分享
                wxShare.init({'shareTitle':"鞋生活，开启您的定制生活！",
                    'shareImg':this.$img+res[0].image,
                    'shareDesc':'【'+this.designInfo.userName+'设计的鞋款- 来自鞋生活】'});

                this.designInfo.list.map((sub) => {
                    this.materialUsedIds.push(sub.modeMaterialId);
                    if (sub.status !== 1) {
                        this.soldOut = true;
                        return false;
                    }
                });
                if (!this.selfShare) {
                    this.todo1 = '保存设计';
                    this.todo2 = '我要设计';
                }
            })
        },
        buy() {
            window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android"
        }
    },
    mounted() {
        wxShare.redir();
        document.title = '设计详情';
        this.loadShoeInfo();
        //http.call(this, this.$route.params.id + '/' + false);
        document.getElementsByTagName('body')[0].scrollTop = 0;
    },
    components: {
        HeaderWrap: require('../../components/header.vue'),
        FooterWrap: require('../../components/footer.vue'),
        LoginWrap: require('../../components/login/index.vue')
    }
}
