import './index.less';
import { is_weixn, is_pc } from '../common/utils.js';
import { LoadScene } from '../common/three/loadScene.js';
import { CTMModel } from '../common/three/ctmModel.js';
import { Indicator, Toast } from 'mint-ui';
import App from '../common/app.js';
import wxShare from '../common/wxShare';
var  Memory = {
    selected: 'style',
    shoe: [],
    heel: [],
    upper: [],
    colorD: [],
    isApp: App.is,
    isLoading: true,
    heightStyle: [],
    materialIds:{},
    file: {
        shoeId: null,
        customizedType: 2,
        rendering: null,
        isOpen: true,
        customizedId:null,
        materialUsedIds: []
    },
    Model:{},
    isWx: is_weixn(),
    isPc: is_pc(),
    isZero: false,
    isSign: false,
    isBgFixed: false,
    isPage: true,
    buts: {
        upper: '',
        heel: 'on',
        withHigh: ''
    }
};

window.appCall = function() {
    var file = setFile();

    if (Memory.isLoading) {
        Toast({
            message: '正在加载3D模型...'
        });
        return
    }
    Memory.Model.getSnapshot((url) => {
        file.rendering = url;
        file = JSON.stringify(file);
        Memory.isBgFixed = false;
        App.onComplete(file);
    });
}
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
                return;
            }
            if (i == 0 && is) {
                isGroup = false;
                mode.isDefault = true;
            } else mode.isDefault = false;
        })
    })
}
var colorDMap = function(succ){
     this.colorD.map((item)=>{
        if(item.isGroup){
            item.mode.map((mode)=>{
                succ(mode);
            })
        }
        succ(item);
    });
}

var setColorD = function(upper, heel) {
    let color = [];
    heel = heel || this.heel;
    upper = upper || this.upper;
    upper.map((item) => {
        if (item.isDefault == false || item.self == false) return;
        color.push(...item.mode);
    });
    heel.map((item) => {
        if (item.isDefault == false || item.self == false) return;
        color.push(...item.mode);
    });
    return color;
}
var http = function(id) {

    
    let star = this.$route.params.star,
        name = 'shoeInfo3D';

    if(star==2)
        this.file.customizedId = id;
    if (star == 'preview') name = 'seller3D';

    else id += '/' + this.star;
    
    this.$http.g({ name, id: id }).then((d) => {
       
        d=d[0];

        //微信二次分享
        wxShare.init({'shareTitle':"鞋生活，开启您的定制生活！",
            'shareImg':this.$img+d.shoe.coverPhoto.split(',')[0],
            'shareDesc':'【欢迎围观我正在设计的鞋款- 来自鞋生活】'});

        modeDefaults(d.upper, true);
        modeDefaults(d.heel, false);
        for (var i in d) {
            if (this[i]) this[i] = d[i];
        }
        this.loadStart(d,star);
        this.colorD = setColorD.call(this);
        
        colorDMap.call(this,(item)=>{
            if(!item.isMain) return;
            if(!item.noMaterial) return;
            colorDMap.call(this,(mode)=>{
                console.log(item.parentId!=mode.parentId||mode.isMain,mode.parentId);
                if(item.parentId!=mode.parentId||mode.isMain) return;
                if(mode.isCustomizable == true)
                    mode.isCustomizable = 'none';
            })
            
            
        });
        this.file.shoeId = d.shoe.shoeId;
    });
}
var setFile = () => {
    let list = [],
        data = setColorD(Memory.upper, Memory.heel);

    var material = function(d) {
        d.map((item) => {
            item.list.map((val) => {
                if (!val.isDefault) return;
                list.push(val.modeMaterialId);
            })
        })
    }
    data.map((item) => {

        if (item.isGroup) {
            item.mode.map((mode) => {
                if (!mode.isCustomizable) return;
                if (item.noMaterial) return; //选择无装饰
                material(mode.materils);
            })
            return;
        }
        if (!item.isCustomizable) return;
        if (item.noMaterial) return;
        material(item.materils);
    });
    Memory.file.materialUsedIds = list;
    return Memory.file;   
}

export default {
    data() {
        let star = true,
            parStar = this.$route.params.star;
        if (parStar == 2)
            star = false;
        if (parStar == 'preview')
            Memory.isPage = false;
        Memory.isLoading = true;
        Memory.star = star;
        Memory.Model = this.$store.state.Model;
        return Memory;
    },
    created() {
        
        let id = this.$route.params.id,
            parent = this;
        http.call(this, id);
    },
    mounted() {
        wxShare.redir();
        setTimeout(function() {
            document.getElementsByTagName('body')[0].scrollTop = 0;
        }); //兼容  手机浏览器 顶置
    },
    methods: {
        optNav(name) {
            if (this.buts[name]) return;
            for (var i in this.buts) {
                this.buts[i] = '';
            }
            this.buts[name] = 'on';
        },
        optStyle(d, name) {
            if (!d.self) {
                this.Model.clearAll();
                http.call(this, d.shoeId);
                return;
            }
            if (d.isDefault) return;
            this[name].map((item) => {
                item.isDefault = false;
            });
            d.isDefault = true;
            modeDefaults(this.upper, true);
            modeDefaults(this.heel, false);
            this.isZero = true;
            
            this.Model.reloadName(d, this[name]);
            
        },
        optDesign(name) {
            if (this.isLoading) {
                Toast({
                    message: '正在加载3D模型...'
                });
                return
            }
            let $refs = this.$refs
            if (this.selected == name) return;
            this.selected = name;
            if (name != 'color') return;
            this.colorD = setColorD.call(this);
            if (!this.isZero) return;
            setTimeout(() => {
                $refs.modeId.scrollLeft = 0;
            });
            this.isZero = false;
        },
        optMode(item, list, is) {
            if (item.isDefault && typeof is == 'undefined') return;
            list.map((vals) => {
                vals.isDefault = false;
                if (vals.isGroup) {
                    vals.mode.map((mode) => {
                        mode.isDefault = false;
                    })
                }
            });

            item.isDefault = true;
            if (item.modeMaterialId){
                
                this.Model.setMaterialById(item.modeId, item);
            }
        },
        optParts(item, list) {
            this.optMode(item, list);
            this.Model.highLight(item);
            
        },
        delDecorate(mode,is) {
            
            this.optMode({}, mode.materils); //材料菜单
            mode.materils.map((item)=>{
                item.list.map((val)=>{
                    if(val.isDefault){
                        Memory.materialIds[val.modeMaterialId] = true;
                    }
                    val.isDefault = false;
                    
                });
                item.isDefault = false;
            });
            mode.noMaterial = true;

            this.Model.hideDecorate(mode);
            if(mode.isMain==false||is) return
            colorDMap.call(this,(item)=>{
                if(item.parentId!=mode.parentId||item.isMain==true) return;
                if(item.isCustomizable == true) 
                item.isCustomizable = 'none';
                this.delDecorate(item,true);
            });
        },
        optDecorate(item, mode) {
            this.optMode(item, mode.materils);
            if(mode.noMaterial==true){
                mode.materils.map((materil)=>{
                    materil.list.map((val)=>{
                        if(!Memory.materialIds[val.modeMaterialId]) return;
                        Memory.materialIds[val.modeMaterialId] = false
                        val.isDefault = true;
                        this.Model.setMaterialById(val.modeId, val);
                    })
                });
                mode.noMaterial = false;
 
                colorDMap.call(this,(item)=>{
                    if(item.parentId!=mode.parentId||item.isMain==true) return;
                    if(item.isCustomizable=='none')
                    item.isCustomizable = true;
                    item.materils.map((materil)=>{
                        this.optDecorate(materil,item);
                    });
                });
            }
        },
        /**
         * 有关连材料时 
         * 主材料改变 副材料也有随之改变
         * @export
         */
        optMaterial(item, list) {
            
            list.map((material) => {
                this.optMode(item, material.list, true);
            });
           
            if(!item.ids) return;
            item.ids.map((id)=>{
                colorDMap.call(this,(mode)=>{
                    if(mode.noMaterial) return;
                    mode.materils.map((materil)=>{
                        materil.list.map((val)=>{
                            if(val.modeMaterialId!=id) return;
                            this.optMaterial(val,mode.materils);
                        })
                    })
                })
            });
        },
        optHeihtStyle(item) {
            if (item.self) return;
            this.Model.clearAll();
            this.isLoading = true;
            http.call(this, item.shoeId);
        },
        upStyle(name) {
            if (this.buts[name]) return;
            for (var i in this.buts) {
                this.buts[i] = '';
            }
            this.buts[name] = 'on';
        },
        loadStart(shoeData,enterFrom) {
            var that = this;
            var height3D = document.documentElement.clientHeight -238;
            if(this.isApp||this.isWx){
                this.$refs.showShoe.style.cssText="height:"+height3D+'px';  
            }
            this.Model.init({
                shoeData: shoeData,
                container: this.$refs.showShoe,
                url: that.$img,
                loadingFunc: loadingFunc,
                tabchangeFunc: tabchangeFunc,
                enterFrom:enterFrom
            });

            function loadingFunc() {
                if (that.isLoading) {

                    that.isLoading = false;
                }
            }

            function tabchangeFunc(meshName) {
                var modeId = meshName.substring(6),
                    $refs = that.$refs;
                that.colorD = setColorD.call(that);
                that.heel.map((item) => {
                    lood(item.mode)
                })
                that.upper.map((item) => {
                    lood(item.mode)
                })

                function lood(mode) {
                    mode.map((item) => {
                        if (item.modeId == modeId) {
                            item.isDefault = true;
                            return;
                        }
                        item.isDefault = false;
                        if (item.mode.length) lood(item.mode);
                    })
                }
                that.selected = 'color';
                setTimeout(() => {
                    $refs.modeId.scrollLeft = $refs[modeId][0].$el.offsetLeft-10;
                });
            }
        },
        
        resetAngle() {
            document.getElementsByTagName('body')[0].scrollTop = 0;
            this.Model.reset();
            this.Model.orbitControls.autoRotate = false;
        },
        ok() {
            let self = this,
                star = this.$route.params.star;
            if (this.isLoading) {
                Toast({
                    message: '正在加载3D模型...'
                });
                return
            }
            
            Indicator.open({
                text: '正在保存设计',
                spinnerType: 'fading-circle'
            });
            Memory.isBgFixed = true;
            setFile();
            this.Model.getSnapshot((url) => {
                self.file.rendering = url;
                self.$http.p('addUpdate', self.file).then((d) => {
                    Indicator.close();
                    Memory.isBgFixed = false;
                    if (d[0].isSign){
                        self.$store.commit('upSing', {
                            is: true,
                            fullPath: [
                                'design/', self.file.shoeId, '/', star
                            ].join('')
                        });
                        return
                    }
                    Toast({
                        message: '保存成功',
                        iconClass: 'icon icon-success'
                    });
                    
                    this.Model.clearAll();
                    self.$router.push('/design/details/' + d[0] + '/' + star);
                });
            })
        }
    }, components: {
        LoginWrap: require('../components/login/index.vue')
    },
}
