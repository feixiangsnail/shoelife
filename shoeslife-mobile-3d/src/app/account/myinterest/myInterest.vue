<template>
    <mt-loadmore :bottom-method="loadBottomUse" bottomPullText='' @bootom-status-change="handleBottomChange" ref="loadmore" :bottom-all-loaded="allLoaded">
        <section id="myInterest">
            <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
            <mt-popup v-model="$store.state.isSign" closeOnClickModal='true' position="bottom" style="margin-bottom: 50px">
                <login-wrap></login-wrap>
            </mt-popup>
            <ul v-if="items && items.total > 0">
                <li class="bt clearfix" v-for=" item in items.list">
                    <router-link
                            :to="{path:item.accountIdUserInfo && item.accountIdUserInfo.userType == 4?'/user/' + item.accountId:'/designer'+'/' + item.accountId}">
                        <div class="pic" v-if="item.accountIdUserInfo.photo">
                            <img :src="$img + item.accountIdUserInfo.photo">
                        </div>
                        <div class="pic" v-else>
                            <img :src="defaultPhoto">
                        </div>
                        <div class="txt">
                            <h4>{{item.accountIdUserInfo.adminName}}</h4>
                            <p>{{item.dynamic ? item.dynamic.title : ''}}</p>
                        </div>
                        <i><img src="../../../assets/img/icon-to.png" alt=""></i>
                    </router-link>
                </li>

            </ul>
            <div class="empty" v-else>
                <div class="pic"><img src="../../../assets/img/image_aattention.png" alt=""></div>
                <p>还没有关注的主编或设计师哦</p>
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
