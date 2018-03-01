<template>
    <mt-loadmore :bottom-method="loadBottomUse" bottomPullText='' @bootom-status-change="handleBottomChange" ref="loadmore" :bottom-all-loaded="allLoaded">
        <section id="myCollection">
            <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
            <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom" style="margin-bottom: 50px">
                <login-wrap></login-wrap>
            </mt-popup>
            <ul v-if="items && items.total > 0">
                <li class="bt clearfix" v-for=" item in items.list">
                    <router-link :to="{path:'/shoes/'+item.shoeId}" class="clearfix">
                        <div class="pic">
                            <img :src="$img + item.coverPhoto.split(',')[0]">
                        </div>
                        <div class="txt">
                            <h4>{{item.shoeName}}</h4>
                            <p class="price">&yen; {{item.price}}</p>
                        </div>
                    </router-link>
                </li>
                <li class="loadOver" v-if="loadOver">已经全部加载完毕</li>
            </ul>
            <div class="empty" v-else>
                <div class="pic"><img src="../../../assets/img/icon_CollectionImg.png" alt=""></div>
                <p>还没收藏喜欢的鞋款, 快去挑选吧</p>
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
