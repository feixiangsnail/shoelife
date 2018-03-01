<template>
    <section id="adLogin">
        <header-wrap :childIsAndroid="isAndroid" :childIsIOS="isIOS" :childAdType="adType"></header-wrap>
        <div class="mode" ref="showShoe">
            <mt-spinner type="fading-circle" :size="60" v-show="isLoading" ></mt-spinner>
        </div>
        <div class="adBottom" v-if="isAndroid">
            <img src="../../assets/img/ad_login.png" alt="">
            <a href="https://at.umeng.com/jiCW9j" v-if="adType=='1'">我来设计</a>
            <a href="https://at.umeng.com/8T1Pfu?cid=478&clickid=__CALLBACK_PARAM__&imei=__IMEI__&mac=__MAC__&android_id=__ANDROIDID1__&ts=__TS__&ip=__IP__&os=__OS__&s2s=1&md5=1" v-if="adType=='2'">我来设计</a>
            <a href="https://at.umeng.com/4b8z0b?cid=4&clickid={IMP}&imei={imei_MD5}&ip={ip}&md5=1&s2s=1" v-if="adType=='3'">我来设计</a>
            <a href="https://at.umeng.com/8HDWTr" v-if="adType=='4'">我来设计</a>
        </div>
        <div class="adBottom" v-else-if="isIOS">
            <img src="../../assets/img/ad_login.png" alt="">
            <a href="https://at.umeng.com/1Di4ze" v-if="adType=='1'">我来设计</a>
            <a href="https://at.umeng.com/r4famC?cid=478&clickid=__CALLBACK_PARAM__&idfa=__IDFA__&mac=__MAC__&ts=__TS__&ip=__IP__&os=__OS__&s2s=1" v-if="adType=='2'">我来设计</a>
            <a href="https://at.umeng.com/4X99Ln?cid=4&clickid={IMP}&idfa={idfa_MD5}&ip={ip}&md5=1&s2s=1" v-if="adType=='3'">我来设计</a>
            <a href="https://at.umeng.com/iSrueu" v-if="adType=='4'">我来设计</a>
        </div>
        <div class="adBottom" v-else>
            <img src="../../assets/img/ad_login.png" alt="">
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android">我来设计</a>
        </div>
    </section>
</template>
<script src="./index.js"></script>
<style lang="less" src="./index.less"></style>
