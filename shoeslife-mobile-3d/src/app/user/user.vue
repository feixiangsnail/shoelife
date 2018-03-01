<template>
  <section id="user">
      <header-wrap :on-click="toHome" :isHome="isHome" :showUsr="showUsr" ></header-wrap>
    <div class="top bt">
      <img src="../../assets/img/avitar.png" alt="">
      <span>shoelives</span>
    </div>
    <div class="item">
      <ul>
        <li class="bt"><i class="myd"></i><span>我的设计</span><i></i></li>
        <li class="bt"><i class="myf"></i><span>我的收藏</span><i></i></li>
        <li class="bt"><i class="myw"></i><span>我的关注</span><i></i></li>
      </ul>
    </div>
  </section>
</template>
<script>
    export default{
        data(){
            return{
                isHome:false,
                showUsr:false
            }
        },
        methods:{
            toHome() {
                this.$router.push('./');
            },
        },
        components:{
            HeaderWrap:require('../components/header.vue'),
        },
    }
</script>

<style lang="less">
    @import '../../assets/css/preset.less';
      @w:25;
      #user{
        background:#f6f6f6;height: 100vh;
        .top{
          line-height: 120rem/@w;background: #fff;margin-bottom: 10rem/@w;
          img{width: 65rem/@w;height: 65rem/@w;display: inline-block;padding: 28rem/@w 15rem/@w 0}
          span{color:#131313;vertical-align:top;display: inline-block;
          font-size: 20rem/@w;}
        }
        .item{
          background: #fff;
          li{
            line-height: 50rem/@w;position: relative;
            i:first-of-type{width: 22rem/@w;height:22rem/@w;display: inline-block;position: absolute;
            left:15rem/@w;top:15rem/@w}
            span{font-size: 16rem/@w;color:#333;display: inline-block;padding-left: 52rem/@w;}
            i:last-of-type{background: url("../../assets/img/icon-r.png");background-size: 18rem/@w;
              width: 18rem/@w;height:18rem/@w;position: absolute;right: 15rem/@w; top:16rem/@w;}
            .myd{background: url("../../assets/img/icon_myd.png") no-repeat;background-size: 20rem/@w;top:17rem/@w !important;}
            .myf{background: url("../../assets/img/icon-collect1.png") no-repeat;background-size: 20rem/@w;}
            .myw{background: url("../../assets/img/icon_myw.png") no-repeat;background-size: 20rem/@w;}
          }
        }
        .bt{border-bottom: .5rem/@w solid #e1e1e1;}
      }
</style>
