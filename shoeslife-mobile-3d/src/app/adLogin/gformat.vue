<template>
    <div v-show="show">
        <div class="header-float clearfix">
            <div class="logo clearfix">
                <img src="../../assets/img/logo.svg" alt="">
                <span>一款可以自己设计鞋的APP</span>
            </div>
            <div class="ri">
                <span @click="open">打开</span>
                <i @click="close"><img src="../../assets/img/btnClose.png" alt=""></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props: ['childIsAndroid', 'childIsIOS', 'childAdType'],
        data(){
            return {
                show: true
            }
        },
        methods: {
            close(){
                this.show = false;
            },
            open(){
                let url = null;
                if (this.childIsAndroid) {
                    switch (this.childAdType) {
                        case '1':
                            url = 'https://at.umeng.com/jiCW9j';
                        case '2':
                            url = 'https://at.umeng.com/8T1Pfu?cid=478&clickid=__CALLBACK_PARAM__&imei=__IMEI__&mac=__MAC__&android_id=__ANDROIDID1__&ts=__TS__&ip=__IP__&os=__OS__&s2s=1&md5=1';
                        case '3':
                            url = 'https://at.umeng.com/4b8z0b?cid=4&clickid={IMP}&imei={imei_MD5}&ip={ip}&md5=1&s2s=1';
                        case '4':
                            url = 'https://at.umeng.com/8HDWTr';
                        default:
                            url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android';
                    }
                }
                if (this.childIsIOS) {
                    switch (this.childAdType) {
                        case '1':
                            url = 'https://at.umeng.com/1Di4ze';
                        case '2':
                            url = 'https://at.umeng.com/r4famC?cid=478&clickid=__CALLBACK_PARAM__&idfa=__IDFA__&mac=__MAC__&ts=__TS__&ip=__IP__&os=__OS__&s2s=1';
                        case '3':
                            url = 'https://at.umeng.com/4X99Ln?cid=4&clickid={IMP}&idfa={idfa_MD5}&ip={ip}&md5=1&s2s=1';
                        case '4':
                            url = 'https://at.umeng.com/iSrueu';
                        default:
                            url = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android';
                    }
                }
                window.location.href = url
            }
        },
        created(){

        }
    }
</script>

<style lang="less" scoped>
    @w: 25;
    .header-float {
        position: absolute;
        width: 375rem/@w;
        height: 64rem/@w;
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06), 0 0 6px 0 rgba(0, 0, 0, 0.19);
        //left: 0;top:0;
        z-index: 999;
        .logo {
            float: left;
            img {
                width: 46rem/@w;
                height: 46rem/@w;
                display: block;
                float: left;
                margin: 9rem/@w 10rem/@w 16rem/@w;
            }
            span {
                display: block;
                float: left;
                font-size: 14rem/@w;
                color: #616161;
                letter-spacing: 0.19px;
                line-height: 64rem/@w;
            }
        }
        .ri {
            float: right;
            span {
                border: 1rem/@w solid #F5334A;
                border-radius: 4rem/@w;
                width: 68rem/@w;
                height: 30rem/@w;
                line-height: 33rem/@w;
                text-align: center;
                font-size: 14rem/@w;
                color: #F5334A;
                letter-spacing: 0.19rem/@w;
                float: left;
                margin-top: 17rem/@w;
            }
            i {
                width: 22.6rem/@w;
                height: 22.6rem/@w;
                float: left;
                margin: 21rem/@w 6.4rem/@w 0 10rem/@w;
            }
        }
    }

</style>
