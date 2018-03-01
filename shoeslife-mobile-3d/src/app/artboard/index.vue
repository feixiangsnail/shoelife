<template>
    <section id="artboard">
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser"></header-wrap>
        <div class="artboard" :class="{over:isShow }">
            <div class="artboard-header">
                <img src="assets/img/view.jpg" alt="">
            </div>
            <div class="artboard-main">
                <div class="artboard-title" @click="choose" :class="{titleFixed:scroll>=artTitleH}">
                    <span class="txt">{{title}}</span><img src="assets/img/icon-screen.png"/>
                </div>
                <div class="artboard-wrap clearfix" :class="{marginTop:scroll>=artTitleH}">
                    <div class="item">
                        <div class="pic"><img src="assets/img/Bitmap@3x.png" alt=""></div>
                        <div class="txt">
                            <h4>渐变平底鞋</h4>
                            <p class="price">¥1280</p>
                            <p class="remarks">2788设计</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="artboard-choose" :class="[isShow ? 'show' : 'hidden']">
                <div class="top clearfix">
                    <div class="close" @click="choose"><img src="assets/img/btnClose.png"  alt=""></div>
                </div>
                <div class="mid">
                    <div class="mid-content">
                        <div class="designer">
                            <h3>设计师</h3>
                            <div class="option clearfix">
                                <span class="a" @click="chooseDesigner" :class="{ 'ac':true}">Maggie Mu 穆玛吉</span>
                                <span class="a">Maggie Mu 穆玛吉</span>
                                <span class="b">Giovanni Pausini 乔瓦尼普西尼</span>
                            </div>
                        </div>
                    </div>
                    <div class="mid-content">
                        <div class="shoe-style">
                            <div class="top clearfix">
                                <h3>款式</h3>
                                <div class="all">全部<i><img src="assets/img/icon-b.png"  alt=""></i></div>
                            </div>
                            <div class="option clearfix">
                                <span class="a">尖头</span>
                                <span class="a">方头</span>
                                <span class="a">圆头</span>
                                <span class="a">扁头</span>
                            </div>
                        </div>

                    </div>
                    <div class="mid-content borderNone">
                        <div class="shoe-style">
                            <div class="top clearfix">
                                <h3>鞋跟高度</h3>
                            </div>
                            <div class="option clearfix">
                                <span class="a">1.5cm</span>
                                <span class="a">5cm</span>
                                <span class="a">8cm</span>
                                <span class="a">12cm</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bot clearfix">
                    <div class="reset">重置</div>
                    <div class="submit">确定</div>
                </div>
            </div>
            <div :class="{modallayer:isShow}"></div>
        </div>
        <footer-wrap :on-download="toDownload"></footer-wrap>
    </section>
</template>

<script>
    import './index.less';
    export default {
        data () {
            return {
                title: "筛选",
                isShow: false,
                designer: [],
                artTitleH: 0,
                scroll: -8,
                isHome:true,
            }
        },
        methods: {
            choose(){
                this.isShow = !this.isShow;
            },
            chooseDesigner(){

            },
            menu() {
                this.scroll = document.body.scrollTop;
                //console.log(this.scroll,this.scroll)
            },
            toHome() {
                this.$router.push('/');
            },
            toUser(){
                this.$router.push('/account/index');
            },
            toDownload(){
                console.log("下载");
            }
        },
        mounted() {
            document.title = '鞋款分类';
            this.artTitleH = document.getElementsByClassName("artboard-title")[0].offsetTop;
            document.getElementsByTagName('body')[0].scrollTop = 0;
            window.addEventListener('scroll', this.menu);
        },
        components:{
            HeaderWrap:require('../components/header.vue'),
            FooterWrap:require('../components/footer.vue'),
        },
    }
</script>
