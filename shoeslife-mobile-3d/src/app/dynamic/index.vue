<template>
    <div>
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom">
            <login-wrap></login-wrap>
        </mt-popup>
        <div class="edge">
            <div class="arttitle">{{item.title}}</div>
            <div class="author clearfix">
                <router-link :to="{path:'/editor'+'/'+item.editorId}">
                    <a src="javascript:;">
                        <img :src="$img + item.icon">
                        <ul>
                            <li class="name">{{item.designerName}}</li>
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
        <div class="artcontent" v-html="item.content"></div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped src="./index.less"></style>