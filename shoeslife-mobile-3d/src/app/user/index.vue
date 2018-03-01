<template>
    <section id="designerHome">
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <div class="header">
            <div class="wrap">
                <div class="topbg">
                    <img :src="$img + items.photo">
                </div>
                <div class="content"></div>
            </div>
            <div class="intro">
                <div class="head-img">
                    <img :src="$img + items.photo">
                </div>
                <h3>{{items.adminName}}</h3>
                <p class="hits">关注 {{items.followNum}} | 文章 {{items.articleNum}}</p>
                <div v-bind:class="[isFollow ? 'notActive':'isActive', 'follow']" @click.stop="attention">
                    <i v-if="!isFollow">+</i><span>{{isFollow ? '已关注' : '关注'}}</span>
                </div>
                <p class="int">{{items.profile}}</p>
            </div>
        </div>

        <div class="news">
            <ul v-if="aticalList.total > 0">
                <li class="clearfix" v-for=" item in aticalList.list">
                    <div class="pic"><img :src="$img+item.icon" alt=""></div>
                    <div class="txt">
                        <p>{{item.title}}</p>
                        <div><span>{{releaseTime}}小时前</span><i></i><img src="../../assets/img/icon_viewAll.svg"
                                                                             alt=""><span>{{item.browseNum}}</span>
                        </div>
                    </div>
                </li>
                <li @click="loadMore">查看更多动态</li>
            </ul>
            <div class="nonews" v-else>
                <div><img src="../../assets/img/noNews.png"></div>
                <p>暂未发表文章</p>
            </div>
        </div>
    </section>
</template>

<script>
    import {timeDiff} from '../common/utils'
    export default{
        data(){
            return {
                isHome: false,
                showUsr: true,
                items: {},
                isFollow: false,
                aticalList: {},
                systemTime: null,
            }
        },
        computed: {
            releaseTime(){
                return timeDiff(this.item.modifyTime,this.systemTime)
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
                if (this.isFollow) {
                    // 登陆用户ID 12504
                    this.$http.p({name: 'delFollow', id: 12504}).then((response) => {
                        this.isFollow = response[0]
                    });
                } else {
                    this.$http.p({name: 'addFollow', id: 12504}).then((response) => {
                        this.isFollow = response[0]
                    });
                }
            }
        },
        created(){
            /**
             * 主编信息
             */
            this.$http.p({name: 'getEditorDetail', id: this.$route.params.id}).then((response) => {
                this.items = response[0]
                this.isFollow = response[0].follow
            });
            /**
             * 主编发表过的文章
             */
            this.$http.p('getEditorArticleList', {
                pageSize: 20,
                pageNum: 1,
                editorId: this.id
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
        mounted(){
            document.title = "主编主页";
        },
        components: {
            HeaderWrap: require('../components/header.vue'),
            FooterWrap: require('../components/footer.vue'),
        },


    }
</script>
<style lang="less" scoped src="./index.less"></style>