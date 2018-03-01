<template>
    <section id="designerHome">
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom">
            <login-wrap></login-wrap>
        </mt-popup>
        <div class="header">
            <div class="wrap">
                <div class="topbg">
                    <template v-if="items.photo">
                        <img :src="$img + items.photo">
                    </template>
                    <template v-else>
                        <img :src="defaultPhoto">
                    </template>
                </div>
                <div class="content"></div>
            </div>
            <div class="intro">
                <div class="head-img">
                    <template v-if="items.photo">
                        <img :src="$img + items.photo">
                    </template>
                    <template v-else>
                        <img :src="defaultPhoto">
                    </template>
                </div>
                <h3>{{items.userName}}</h3>
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
                    <router-link :to="{path:'/artical'+'/'+item.articleId}">
                        <div class="pic"><img :src="$img+item.icon" alt=""></div>
                        <div class="txt">
                            <p>{{item.title}}</p>
                            <div>
                                <span>{{releaseTime(item)}}</span>
                                <i></i>
                                <img src="../../assets/img/icon_viewAll.svg">
                                <span>{{item.browseNum}}</span>
                            </div>
                        </div>
                    </router-link>
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

<script src="./index.js"></script>

<style lang="less" scoped src="./index.less"></style>