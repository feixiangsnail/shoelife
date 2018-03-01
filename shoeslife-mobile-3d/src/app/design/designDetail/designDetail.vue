<template>
  <section id="designDetail">
    <div class="msg">
      <i></i><span>您选择的款式或用料已下架，请修改设计。</span>
    </div>
    <div class="design-pic bt">
      <div>
        <img src="../assets/img/Bitmap@3x.png" alt="">
      </div>
    </div>
    <div class="design-intro">
      <div class="wrap">
        <h3>【Chelsea&Zoe定制】绑带刺绣淑女时尚女王高跟鞋</h3>
        <p class="shoe-heel">鞋跟：8cm细跟 <i class="sold-out"></i></p>
        <div class="designer-msg">
          <img src="../assets/img/avitar.png" alt="">
          <span>蔡文姬</span>
        </div>
        <div class="todo clearfix">
          <div class="to-save"><i class="save"></i>保存设计</div>
          <div class="to-design"><i class="design"></i>我要设计</div>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="design-detail clearfix">
      <h4>部位材料</h4>
      <span></span>
      <dl>
        <dt><img src="../assets/img/icon-Rectangle.svg" alt=""><i>鞋款</i> <i class="price fr">¥1523</i></dt>
        <dd><img src="../assets/img/avitar.png" alt=""><i>内里和垫脚：黑色羊皮</i><i class="sold-out"></i><i class="price fr">¥1523</i></dd>
        <dd><img src="../assets/img/avitar.png" alt=""><i>鞋面：超凡闪光格利特</i><i class="price fr">¥1523</i></dd>
        <dd><img src="../assets/img/avitar.png" alt=""><i>鞋底：浅色真皮底</i><i class="price fr">¥1523</i></dd>
        <dd><img src="../assets/img/avitar.png" alt=""><i>内里和垫脚：黑色羊皮</i><i class="price fr">¥1523</i></dd>
        <dd><img src="../assets/img/avitar.png" alt=""><i>内里和垫脚：黑色羊皮</i><i class="price fr">¥1523</i></dd>
      </dl>
      <p>鞋款总额：¥2040</p>
      <div class="line"></div>
    </div>
    <div class="design-state clearfix">
      <h4>因产品属于个人专属且特别定制</h4>
      <span></span>
        <ul>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
          <li><img src="../assets/img/icon-checked.png" alt=""><i>下单后不可取消订单</i></li>
        </ul>
      <div class="line"></div>
    </div>
    <div class="design-only clearfix ">
      <h4>仅自己可见</h4>
      <span></span>
      <p>开启后，你的设计不会推荐给更多用户</p>
      <div class="btn" :class="{ ac: isActive }" @click="switchbtn"></div>
    </div>
    <div class="footer clearfix">
      <div class="price fl">¥2040.00</div>
      <div class="buy fl">购买</div>
    </div>
  </section>
</template>
<script>
  export default{
      data(){
          return{
            isActive:false,
          }
    },
    methods:{
      switchbtn(){
          this.isActive=!this.isActive;
      }
    },
    mounted(){
      document.title = '设计详情';
    }
  }
</script>
<style lang="less">
  @w: 25;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  #designDetail {
    .msg{
      height: 40rem/@w;background: #FFF7F7;line-height: 40rem/@w;
      span{font-size: 14rem/@w;color:#f5334a;vertical-align: top;}
      i{margin: 12rem/@w 10rem/@w 0 17rem/@w; display: inline-block;height: 17rem/@w;width:17rem/@w;background: url("../assets/img/icon-msg.svg")}
    }
    .design-pic {
      width: 345rem/@w;
      margin: 0 auto;
      padding-bottom: 20rem/@w;
      div {
        width: 240rem/@w;
        height: 240rem/@w;
        margin: 0 auto;
      }
    }
    .design-intro {
      .wrap{padding: 0 15rem/@w 30rem/@w;
        h3{font-size: 16rem/@w;line-height: 22rem/@w;letter-spacing: 0.34rem/@w;
        color:#131313;padding-top: 20rem/@w;}
        p{font-size: 12rem/@w;color:#616161;letter-spacing:0.32rem/@w;padding: 10rem/@w 0;}
        .designer-msg{
          margin-bottom: 28rem/@w;
          img{height:20rem/@w;display: inline-block;vertical-align: middle;
            width:20rem/@w;}
          span{line-height: 17rem/@w;font-size: 14rem/@w;display: inline-block;
            vertical-align: middle;color:#616161;}
        }
        .todo{
          div{width: 153rem/@w;height: 38rem/@w;border:1rem/@w solid #333;color:#333;letter-spacing: 0.39rem/@w;
            border-radius:2rem/@w;line-height: 40rem/@w;font-size: 14rem/@w;text-align: center;
            float:left;
            i{height: 16rem/@w;width:16rem/@w;display: inline-block;vertical-align: middle;margin-right: 5rem/@w;background-size: 16rem/@w 14rem/@w;}
          }
          .to-save{margin-right:34rem/@w; }
          .design{ background: url("../assets/img/icon-ShapeCopy.svg") no-repeat;}
          .save{background: url("../assets/img/icon-group.svg") no-repeat;}
          .remove{background: url("../assets/img/icon-remove.svg") no-repeat;}
          .grayshoe{background: url("../assets/img/icon-grayshoe.svg") no-repeat;}
        }
      }
    }
    .design-detail,.design-state,.design-only{

        h4{line-height: 30rem/@w;background: #fff;padding-top: 15rem/@w;font-size: 14rem/@w;
          padding-left: 15rem/@w;letter-spacing: 0.34rem/@w;color:#131313;
        }
       span{height: 2rem/@w;width:50rem/@w;background: #131313;display: block;margin-bottom:15rem/@w;margin-left: 15rem/@w;}
      dl{
        padding: 0 15rem/@w;
        dt,dd{
          margin-bottom: 20rem/@w;
          height: 30rem/@w;overflow: hidden;
          img{width: 30rem/@w;height:30rem/@w;display: inline-block;vertical-align: top;}
          i{margin-top:-6rem/@w; vertical-align:middle; padding-left:10rem/@w;font-size: 14rem/@w;color:#616161;letter-spacing: 0.39rem/@w;line-height: 20rem/@w;display: inline-block;}
          .sold-out{margin-left: 5rem/@w;}
          .price{padding-top:10rem/@w; }
        }
        dd:last-of-type{margin:0;border-bottom: .5rem/@w solid #e1e1e1;padding-bottom: 20rem/@w;}
      }
      p{text-align: right;padding-right:15rem/@w;line-height: 52rem/@w;font-size: 16rem/@w;color:#131313;letter-spacing:0.39rem/@w;}
    }
    .design-state{
      ul{
        padding: 0 15rem/@w 5rem/@w;
        li{
          height: 20rem/@w;
          padding-bottom: 15rem/@w;
          img{height: 14rem/@w;width:14rem/@w;display: inline-block;vertical-align: top;padding-top: 2rem/@w;}
          i{vertical-align:top;font-size: 14rem/@w; color: #616161;letter-spacing: 0.34rem/@w;padding-left: 10rem/@w;}

        }
      }

    }
    .design-only{
      position: relative;
      p{text-align: left;padding: 2rem/@w 15rem/@w 21rem/@w;line-height: 20rem/@w;
        font-size: 14rem/@w;
        color: #616161;
        letter-spacing: 0.34rem/@w;}
      .btn{position:absolute;top:13rem/@w;right:15rem/@w;transition: all .3s;
        width: 50rem/@w;height:30rem/@w;background-color:#ccc;border-radius:41rem/@w;}
      .btn:before{content: '';height: 28rem/@w;width: 28rem/@w;background: #fff;
        position: absolute;border-radius:50%;top:1rem/@w;left: 1rem/@w;
        transition: all .3s;}
      .ac{background: #22bcb8;transition: all .3s;}
      .ac:before{left:21rem/@w;transition: all .3s;}

    }
    .footer{height: 49rem/@w;border-top: 1rem/@w solid #e1e1e1;overflow: hidden;
      .price{width: 240rem/@w;font-size: 20rem/@w;line-height: 50rem/@w;padding-left: 15rem/@w; color: #F5334A;letter-spacing: 0.3rem/@w;}
      .buy{line-height: 50rem/@w;background: #f5334a;width:120rem/@w;
        text-align: center;font-size: 16rem/@w;
        color: #FFFFFF;}
    }
    .line{height: 10rem/@w; border-top: .5rem/@w solid #e1e1e1;
      background:  #F7F7F7;
    }
    .bt {
      border-bottom: .5rem/@w solid #e1e1e1;
    }
    .sold-out{width: 32rem/@w;height:15rem/@w;background: url("../assets/img/img-xiajia.svg") no-repeat;
      background-size: 32rem/@w 15rem/@w;display: inline-block;vertical-align: middle;
      margin-top:-5rem/@w ;margin-left: 2rem/@w;
    }
  }
</style>
