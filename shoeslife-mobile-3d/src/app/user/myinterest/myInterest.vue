<template>
  <section id="myInterest">
    <ul>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>【Chelsea&Zoe定制】细跟鱼嘴平底高跟鞋</h4>
          <p>自然系女孩，轻松有情调自然生活…</p>
        </div>
        <i><img src="../assets/img/icon-to.png" alt=""></i>
      </li>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>SUMI酱</h4>
          <p>自然系女孩，轻松有情调自然生活…</p>
        </div>
        <i><img src="../assets/img/icon-to.png" alt=""></i>
      </li>
      <li class="bt clearfix">
        <div class="pic">
          <img src="../assets/img/Bitmap@3x.png" alt="">
        </div>
        <div class="txt">
          <h4>SUMI酱</h4>
          <p>自然系女孩，轻松有情调自然生活…</p>
        </div>
        <i><img src="../assets/img/icon-to.png" alt=""></i>
      </li>
    </ul>
    <div class="empty">
      <div class="pic"><img src="../assets/img/image_aattention.png" alt=""></div>
      <p>还没有关注的主编或设计师哦</p>
    </div>
  </section>
</template>
<script>
</script>
<style lang="less">
  @w:25;
  #myInterest{
    background:#f6f6f6;height: 100vh;
    li{
     background: #fff;position: relative;
      .pic{float:left;width: 60rem/@w;height:60rem/@w;
        padding:15rem/@w;
        img{border-radius: 50%;}
      }
      .txt{
        width: 240rem/@w;float: left;position: relative;
        h4{font-size: 16rem/@w;color:#131313;line-height: 19rem/@w;padding: 20rem/@w 0 10rem/@w 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        p{font-size: 14rem/@w;color:#9b9b9b;line-height: 20rem/@w;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
      }
      i{width: 10rem/@w;height:15rem/@w;position: absolute;right:15rem/@w;top:36rem/@w;}

    }
    .empty{
      .pic{width: 120rem/@w;height: 120rem/@w;margin: 80rem/@w auto 20rem/@w;}
      p{font-size: 15rem/@w;color:#9b9b9b;text-align: center;line-height: 24rem/@w;}
    }
    .bt{border-bottom: .5rem/@w solid #e1e1e1;}
  }
</style>
