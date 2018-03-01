<template>
    <section>
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom">
            <login-wrap></login-wrap>
        </mt-popup>
        <div class="edge">
            <div class="arttitle">{{item.title}}</div>
            <div class="author clearfix">
                <router-link :to="{path:'/user'+'/'+item.editorId}">
                    <a src="javascript:;">
                        <template v-if="item.photo">
                            <img :src="item.photo?$img + item.photo:'http://shoelives.oss-cn-shenzhen.aliyuncs.com/HeadPhoto.png'">
                        </template>
                        <template v-else>
                            <img :src="defaultPhoto">
                        </template>
                        <ul>
                            <li class="name">{{item.editorName}}</li>
                            <li>
                                <span class="aDate">{{releaseTime}}</span>
                                <span class="dot">&bull;</span>
                                <img src="../../assets/img/icon_viewAll.svg" alt="">
                                <span class="bNum">{{item.browseNum}}</span>
                            </li>
                        </ul>
                    </a>
                </router-link>

                <span v-bind:class="[isActive ? errorClass : activeClass, follow]" v-on:click="attention">
                    <i v-if="!isActive">+</i><span>{{isActive ? '已关注' : '关注'}}</span>
                </span>
            </div>
        </div>
        <!-- 文章内容 -->
        <div class="artcontent" v-html="item.content">
        </div>
        <div class="artical-relevant" v-if="item.articleProduct && item.articleProduct.length && item.articleProduct.length > 0">
            <div class="but" v-on:click="isOpen">
                <span>相似鞋款</span>
                <span v-bind:class="['icon',isShow ? 'lower':'upper']"><b>{{isShow ? '收起' : '展开'}}</b><i></i></span>
            </div>
            <div v-bind:class="['shoes',isShow ? '' : 'hide']">
                <ul>
                    <li v-for="pShoe in shoeList">
                        <router-link :to="{path:'/shoes'+'/'+pShoe.shoe.shoeId}">
                            <a href="javascript:;">
                                <img :src="$img + pShoe.shoe.coverPhoto.split(',')[0]">
                            </a>
                            <h3>{{pShoe.shoe.shoeName}}</h3>
                        </router-link>
                    </li>
                    <li class="eye-all" v-if="item.articleProduct && item.articleProduct.length && item.articleProduct.length > 10">
                        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android:;">
                            <span class="num">10+</span>
                            <span class="all">查看全部</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bg"></div>
        </div>
    </section>
</template>

<script src="./index.js"></script>

<style lang="less" scoped src="./index.less"></style>