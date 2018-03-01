<template>
    <mt-loadmore :bottom-method="loadBottomUse" bottomPullText='' @bootom-status-change="handleBottomChange" ref="loadmore"
                 :bottom-all-loaded="allLoaded">
        <section id="mydesign">
            <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
            <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom" style="margin-bottom: 50px">
                <login-wrap></login-wrap>
            </mt-popup>
            <ul v-if="items && items.total > 0">
                <li class="bt clearfix" v-for="item in items.list">
                    <router-link :to="{path:'/design/details'+'/' + item.customizedId+'/1'}">
                        <div class="pic">
                            <img :src="$img + item.image">
                        </div>
                        <div class="txt">
                            <h4><i v-if="!item.open"></i>【{{item.brandName}}&bull;定制】 {{item.categoryName}}</h4>
                            <p class="date">{{modTime(item)}}</p>
                        </div>
                    </router-link>
                </li>
                <li class="loadOver" v-if="loadOver">已经全部加载完毕</li>
            </ul>

            <div class="empty" v-else>
                <div class="pic"><img src="../../../assets/img/img-Designempty.png" alt=""></div>
                <p>赶紧设计属于自己的鞋子吧</p>
            </div>
        </section>
        <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">正在加载</span>
            <span v-show="bottomStatus === 'loading'"></span>
        </div>
    </mt-loadmore>
</template>

<script src="./index.js"></script>

<style lang="less" scoped src="./index.less"></style>
