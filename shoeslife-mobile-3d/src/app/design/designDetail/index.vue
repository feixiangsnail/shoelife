<template>
    <section id="designDetail">
        <header-wrap :on-click="toHome" :isHome="isHome" :on-user="toUser" :showUsr="showUsr"></header-wrap>
        <mt-popup  v-model="$store.state.isSign" closeOnClickModal='true'  position="bottom"> <login-wrap ></login-wrap></mt-popup>
        <div class="msg" v-show="soldOut">
            <i></i><span>{{outType}}</span>
        </div>
        <div class="mode" ref="showShoe">
            <mt-spinner type="fading-circle" :size="60" v-show="isLoading" ></mt-spinner>
        </div>
        <div class="design-pic bt" v-if="this.designInfo.shoeStatus ==='OFFLINE'">
            <div>
                <img :src=$img+this.designInfo.image alt="">
            </div>
        </div>
        <div class="design-intro">
                <div class="wrap">
                <h3>【{{designInfo.brandName}}定制】{{designInfo.categoryName}}</h3>
                <p class="shoe-heel">鞋跟： {{designInfo.lastHeight}}cm{{designInfo.heelName}} <i class="sold-out"  v-if="soldOffff"></i></p>
                <!--<div class="designer-msg" v-if="!designInfo.headPhoto||!selfShare||designInfo.sourceCustomizeId!==null">-->
                <div class="designer-msg" v-if="headPhoto">
                    <img :src="headPhoto" alt="">
                    <!--<img :src='designInfo.headPhoto!==null&&designInfo.headPhoto.indexOf("http://") === 0 ? designInfo.headPhoto:$img + designInfo.headPhoto' alt="">-->
                    <span>{{designInfo.userName}}</span>
                </div>
                <div class="todo clearfix">
                    <div class="to-save" @click="todo" :class="{'soldOut':shoeOff}"><i class="design" :class="{'grayshoe':shoeOff,'save':!selfShare}"></i>{{todo1}}</div>
                    <div class="to-design" @click="todo" ><i class="remove" :class="{'design1':!selfShare}" ></i>{{todo2}}</div>
                </div>
            </div>
            <div class="line"></div>
        </div>
        <div class="design-detail clearfix">
            <h4>部位材料</h4>
            <span></span>
            <dl>
                <dt><img src="../../../assets/img/icon-Rectangle.svg" alt=""><i>鞋款</i> <i class="price fr" v-if="designInfo.login">¥{{designInfo.price}}</i></dt>
                <dd v-for="item in designInfo.list"><img :src="$img+item.icon" alt=""><i>{{item.modeName}}：{{item.materialColor}}{{item.categoryName}}</i>
                    <i class="sold-out" v-show="item.status!==1"></i><i class="price fr" v-if="designInfo.login">¥ {{item.materialPrice}}</i></dd>
            </dl>
            <p v-if="designInfo.login">鞋款总额：¥ {{designInfo.totalPrice}}</p>
            <div class="line"></div>
        </div>
        <div class="design-state clearfix" v-if="selfShare">
            <h4>因产品属于个人专属且特别定制</h4>
            <span></span>
            <ul>
                <li><img src="../../../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
                <li><img src="../../../assets/img/icon-checked.png" alt=""><i>下单后{{designInfo.productionPeriod}}天内发货</i></li>
                <li><img src="../../../assets/img/icon-checked.png" alt=""><i>除质量问题外，不予退换货</i></li>
                <li><img src="../../../assets/img/icon-checked.png" alt=""><i>{{freeRepair}}免费维修</i></li>
                <li><img src="../../../assets/img/icon-checked.png" alt=""><i>快递包邮</i></li>
            </ul>
            <div class="line"></div>
        </div>
        <div class="design-only clearfix " v-if="designInfo.sourceCustomizeId===null&&selfShare">
            <h4>仅自己可见</h4>
            <span></span>
            <p>开启后，你的设计不会推荐给更多用户</p>
            <div class="btn" :class="{ ac: isActive }" @click="switchbtn"></div>
        </div>
        <div class="footer clearfix" v-if="selfShare">
            <div class="price fl">¥{{designInfo.totalPrice}}</div>
            <div @click="buy" class="buy fl" :class="{'bg':soldOut}">购买</div>
        </div>
        <footer-wrap></footer-wrap>
    </section>
</template>
<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>
