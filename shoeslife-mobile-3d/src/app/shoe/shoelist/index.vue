<template>
    <section id="artboard" ref="artboard">
        <header-wrap :on-click="toHome" :isHome="isHome" :showUsr="showUsr"></header-wrap>
        <div class="artboard" :class="{over:isShow }">
            <div class="artboard-header" v-if="bannerIcon">
                <img :src="$img+bannerIcon" alt="">
            </div>
            <div class="artboard-main">
                <div class="artboard-title" ref="artboardTitle" @click="filtrate({'selectedCategory': [categoryId]},0)" :class="{titleFixed:scroll>=artTitleH}" v-if="showFiltrate">
                    <span class="txt overflow">{{title}}</span><img src="../../../assets/img/icon-screen.png"/>
                </div>
                <div class="artboard-wrap clearfix" :class="{marginTop:scroll>=artTitleH,mg5:!showFiltrate}">
                    <div class="item" v-for="item in shoesList">
                        <router-link :to="{path:'/shoes/'+item.shoeId}">
                            <div class="pic"><img :src="$img+item.coverPhoto.split(',')[0]" alt=""></div>
                            <div class="txt">
                                <h4>{{item.shoeName}}</h4>
                                <p class="price">¥{{item.price}}</p>
                                <p class="remarks">{{item.customizeNumber!==null?item.customizeNumber : 0}}设计</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="artboard-choose" :class="[isShow ? 'show' : 'hidden']">
                <div class="top clearfix">
                    <div class="close" @click="closeChoose()"><img src="../../../assets/img/btnClose.png"  alt=""></div>
                </div>
                <div class="mid">
                    <div class="mid-content">
                        <div class="designer">
                            <h3>设计师</h3>
                            <div class="option clearfix">
                                <span class="a" v-for="(item,$index) in designers" :class="{b:item.name.length>18,'ac':Dindex===$index}"
                                      v-show="ddindex || Dindex===$index"
                                      @click="chooseDesigner(item,$index,$event)" >{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mid-content">
                        <div class="shoe-style">
                            <div class="top clearfix">
                                <h3>款式</h3>
                                <!--<div class="all">全部<i><img src="assets/img/icon-b.png"  alt=""></i></div>-->
                            </div>
                            <div class="option clearfix">
                                <span class="a" v-for="(item,$index) in categorys" :class="{'ac':sindex===$index}" v-show="ssindex || sindex===$index"
                                      @click="chooseStyle(item,$index)">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mid-content borderNone">
                        <div class="shoe-style">
                            <div class="top clearfix">
                                <h3>鞋跟高度</h3>
                            </div>
                            <div class="option clearfix">
                                <span class="a" v-for="(item,$index) in heigths" :class="{'ac':hindex===$index}" v-show="hhindex || hindex===$index"
                                      @click="chooseHigths(item,$index)">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bot clearfix">
                    <div class="reset" @click="reset">重置</div>
                    <div class="submit" @click="searchShoe">确定</div>
                </div>
            </div>
            <div :class="{modallayer:isShow}"></div>
        </div>
        <footer-wrap></footer-wrap>
    </section>
</template>

<script>
    import './index.less';
    import { Toast } from 'mint-ui';
    import wxShare from '../../common/wxShare';
    let status=1;
    export default {
        data () {
            return {
                title: "筛选",
                isShow: false,
                artTitleH: 40,
                scroll: -20,
                isHome:false,
                showUsr: true,
                categoryId:0,
                showFiltrate:1,
                showBanner:0,
                shoesList:[],
                bannerIcon:'',
                categorys:[],
                designers:[],
                heigths:[],
                Dindex:'',
                sindex:'',
                hindex:'',
                ddindex:true,
                ssindex:true,
                hhindex:true,
                selectedCategory:'',
                selectedHeight:'',
                selectedDesignerId:'',
                selectedDesignerName:'',
                selectedCategoryName:'',
                selectedHeightName:'',
                selectedTitle:'',
                searchData:{},
                Connection:0,
            }
        },
        methods: {
            filtrate(flit,n){
                if(n===0&&this.Connection){
                    this.isShow = !this.isShow;
                    return false;
                }
                this.$http.p('shoeCondition',flit).then((res) => {
                    if(n===0){
                        this.Connection=1;
                        this.isShow = !this.isShow;
                        this.designers=res[0].designers;
                        this.categorys=res[0].categorys;
                        this.heigths=res[0].heights;
                        //this.reset1();
                    }else if(n===1){
                        this.designers=res[0].designers;
                        this.categorys=res[0].categorys;
                        this.heigths=res[0].heights;
                    }else{
                        if(!res[0].designers&&!res[0].categorys&&res[0].heights){
                            this.filtrate({'selectedCategory': [categoryId]},1);
                            return true;
                        }
                        this.designers=res[0].designers;
                        this.categorys=res[0].categorys;
                        this.heigths=res[0].heights;
                        if(flit.selectedDesignerId){
                            this.Dindex=0;
                            this.ddindex=false;
                        }
                        if(flit.selectedCategory){
                            //console.log(flit.selectedCategory[0],this.categoryId,res[0].categorys[0].code);
                            if(flit.selectedCategory[0]===this.categoryId){
                               if(res[0].categorys[0].code===this.categoryId){
                                    this.sindex=0;
                                    this.ssindex=false;
                               }else{
                                    this.sindex='';
                                    this.ssindex=true;
                               }
                            }else{
                                this.sindex=0;
                                this.ssindex=false;
                            }
                        }
                        if(flit.selectedHeight){
                            this.hindex=0;
                            this.hhindex=false;
                        }
                        this.searchData=flit;
                    }
                });
            },
            closeChoose(){
                this.isShow = !this.isShow;
                //this.reset1();
            },
            reset(){
                this.filtrate({'selectedCategory':[this.categoryId]},1) ;
                this.title="筛选";
                this.reset1();
            },
            reset1(){
                this.Dindex='';
                this.sindex='';
                this.hindex='';
                this.ddindex=true;
                this.ssindex=true;
                this.hhindex=true;
                this.selectedCategory='';
                this.selectedHeight='';
                this.selectedDesignerId='';
                this.searchData={}
            },
            chooseDesigner(item,index){
                this.ddindex=false;
                if(index===this.Dindex){
                    this.selectedDesignerId='';
                    this.Dindex='';
                    this.ddindex=true;
                    this.toSearch();
                }else{
                    this.selectedDesignerId=item.code;
                    this.selectedDesignerName=item.name;
                    this.Dindex=index;
                    this.toSearch();
                }
            },
            chooseStyle(item,index){
                this.ssindex=false;
                if(index===this.sindex){
                    this.selectedCategory='';
                    this.sindex='';
                    this.ssindex=true;
                    this.toSearch()
                }else{
                    this.sindex=index;
                    this.selectedCategory=item.code;
                    this.selectedCategoryName=item.name;
                    this.toSearch();
                }
            },
            chooseHigths(item,index){
                this.hhindex=false;
                if(index===this.hindex){
                    this.selectedHeight='';
                    this.hindex='';
                    this.hhindex=true;
                    this.toSearch()
                }else{
                    this.hindex=index;
                    this.selectedHeight=item.code;
                    this.selectedHeightName=item.name;
                    this.toSearch();
                }
            },
            toSearch(){
                let m ={};
                if(this.selectedDesignerId){
                    m.selectedDesignerId=[this.selectedDesignerId];
                    m.selectedCategory=[this.categoryId];
                }else{
                    delete m.selectedDesignerId;
                    this.selectedDesignerName='';
                }
                if(this.selectedCategory){
                    m.selectedCategory=[this.selectedCategory];
                }else{
                    m.selectedCategory=[this.categoryId];
                    this.selectedCategoryName='';
                }
                if(this.selectedHeight){
                    m.selectedHeight=[this.selectedHeight];
                }else{
                    delete m.selectedHeight;
                    this.selectedHeightName='';
                }
                this.filtrate(m);
            },
            menu() {
                this.scroll = document.body.scrollTop;
            },
            toHome() {
                this.$router.push('/');
            },
            toUser(){
                this.$router.push('/account/index');
            },
            searchShoe(){
                if(this.searchData.selectedDesignerId|| this.searchData.selectedCategory || this.searchData.selectedHeight){
                    this.isShow = !this.isShow;
                    Object.assign(this.searchData, { "pageNum": 1,"pageSize": 20});
                    this.$http.p('shoeAppsearch',this.searchData).then((res) => {
                        this.shoesList=res[0].list;
                    });

                    if(this.selectedCategoryName){
                        if(this.selectedDesignerName){
                            this.title=this.selectedDesignerName+'-'+this.selectedCategoryName;
                        }
                        if(this.selectedHeightName){
                            this.title=this.selectedCategoryName+'-'+this.selectedHeightName;
                        }
                        if(this.selectedDesignerName&&this.selectedHeightName){
                            this.title=this.selectedDesignerName+'-'+this.selectedCategoryName+'-'+this.selectedHeightName;
                        }
                        if(!this.selectedDesignerName&&!this.selectedHeightName){
                            this.title=this.selectedCategoryName;
                        }
                    }else{
                        if(this.selectedDesignerName){
                            this.title=this.selectedDesignerName;
                        }
                        if(this.selectedHeightName){
                            this.title=this.selectedHeightName;
                        }
                        if(this.selectedDesignerName&&this.selectedHeightName){
                            this.title=this.selectedDesignerName+'-'+this.selectedHeightName;
                        }
                    }

                    if(!this.searchData.selectedDesignerId&&this.searchData.selectedCategory[0]===this.categoryId&&!this.searchData.selectedHeight){
                        this.title="筛选";
                    }
                }else{
                    this.title="筛选";
                    this.loadShoes();
                    this.isShow = !this.isShow;
                    return false;
                }
            },
            loadShoes(){
                //查询分类列表信息
                this.$http.p('shoeAppsearch',{"pageNum": 1,"pageSize": 20,"selectedCategory": [this.categoryId] }).then((res) => {
                    this.shoesList=res[0].list;
                    if(this.shoesList.length===0){
                        this.loadShoess();
                    }
                    //微信二次分享
                    wxShare.init({
                        'shareTitle': "鞋生活，诠释妳的鞋履美学！",
                        'shareImg': this.$img + this.shoesList[0].coverPhoto.split(',')[0],
                        'shareDesc': "【按当下潮流分类为您智能推荐- 来自鞋生活】"
                    });
                });
                //categoryGet  获取单个分类信息
                this.$http.p({name:'categoryGet','id':this.categoryId}).then((res) => {
                    document.title = res[0].categoryName;
                    this.bannerIcon=res[0].bannerIcon;
                });
            },
            loadShoess(){
                //查询分类列表信息
                this.$http.p('shoeAppsearch',{"pageNum": 1,"pageSize": 20,"selectedStyleId": [this.categoryId] }).then((res) => {
                    this.shoesList=res[0].list;
                    this.showFiltrate=0;
                    if(this.shoesList.length===0){
                         this.showFiltrate=0;
                         Toast({
                         message: '当前分类下没有鞋款',
                         position: 'center',
                         duration: 1500
                         });
                         setTimeout(()=>{
                         this.$router.go(-1)
                         },2000);
                    }
                });
            }
        },
        mounted() {
            wxShare.redir();
            window.addEventListener('scroll', this.menu);
            this.categoryId=parseInt(this.$route.params.id);
            if(this.categoryId>100000){
                this.showFiltrate=0;
            }
            this.loadShoes();
            status=1;

        },
        create(){
            /*document.documentElement.scrollTop=0;
            document.body.scrollTop=0;
            document.getElementsByTagName('body')[0].scrollTop = 0;*/
        },
        updated: function () {
            if(status){
                if(this.$refs.artboardTitle){
                    this.artTitleH =this.$refs.artboardTitle.offsetTop;
                }
                status=0;
            }
            let f=document.getElementById('footer');
            f.style.position=this.$refs.artboard.clientHeight>(document.documentElement.clientHeight*0.85)?'':'absolute';
        },
        components:{
            HeaderWrap:require('../../components/header.vue'),
            FooterWrap:require('../../components/footer.vue'),
        },
    }
</script>
