<template>
  <section id="myCollection">
    <ul>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>【Chelsea&Zoe定制】细跟鱼嘴平底高跟鞋</h4>
          <p class="price">¥1280</p>
        </div>
      </li>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>【Chelsea&Zoe定制】细跟鱼嘴平底高跟鞋</h4>
          <p class="price">¥1280</p>
        </div>
      </li>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>Chelsea&Zoe定制】细跟鱼嘴平底高跟鞋</h4>
          <p class="price">¥1280</p>
        </div>
      </li>
    </ul>
    <div class="empty">
      <div class="pic"><img src="../assets/img/icon_CollectionImg.png" alt=""></div>
      <p>还没收藏喜欢的鞋款, 快去挑选吧</p>
    </div>
  </section>
</template>
<script>
</script>
<style lang="less">
  @w:25;
  #myCollection{
    background:#f6f6f6;height: 100vh;
    li{
      padding-top: 20rem/@w;background: #fff;
      .pic{float:left;width: 80rem/@w;height:80rem/@w;padding:0 10rem/@w 20rem/@w 15rem/@w;}
      .txt{
        position: relative;
        h4{font-size: 15rem/@w;color:#333;line-height: 22rem/@w;padding-right: 14rem/@w;
          i{display: inline-block;height: 20rem/@w;width:20rem/@w;vertical-align: middle;
            margin-top: -3rem/@w;
            background:url("../assets/img/icon-hidden.png") no-repeat;background-size: 20rem/@w;}
        }
        p{font-size: 12rem/@w;color:#9b9b9b;position: absolute;left: 106rem/@w;top:58rem/@w;}
      }
    }
    .empty{
      .pic{width: 138rem/@w;height: 105rem/@w;margin: 80rem/@w auto 40rem/@w;}
      p{font-size: 15rem/@w;color:#9b9b9b;text-align: center;line-height: 24rem/@w;}
    }
    .bt{border-bottom: .5rem/@w solid #e1e1e1;}
  }
</style>
