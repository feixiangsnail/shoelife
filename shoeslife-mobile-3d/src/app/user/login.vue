<template>
  <section id="login">
    <div class="wrap">
    <div class="closebtn">
       <div><img src="../assets/img/btnClose.png" alt=""></div>
    </div>
      <div class="input1">
        <input type="number" placeholder="手机号码" class="phone">
        <input type="button" value="获取验证码" class="yzm ac">
      </div>
      <div class="input2">
        <input type='number' placeholder="短信验证码">
      </div>
      <div class="login">
        <input type="button" value="登录" class="acc">
      </div>
    </div>
  </section>
</template>

<script>
</script>

<style lang="less">
  @w:25;
  #login{
    width:375rem/@w;
    background: #fff;
    input{color: #131313;font-size:14rem/@w;border: none;background: #f7f7f7;height: 30rem/@w;line-height: 20rem/@w;display: inline-block;vertical-align: middle;margin-top: 12rem/@w;}
    .wrap{
      padding: 0 15rem/@w;
      .closebtn{
        height: 50rem/@w;position: relative;
        div{width: 28.3rem/@w;height: 28.3rem/@w;position: absolute;top:7.8rem/@w;right:-7.8rem/@w; }
      }
      .input1,.input2{margin-bottom: 20rem/@w;
        background: #f7f7f7;border-radius: 4rem/@w;height: 44rem/@w;
        .phone{
          width: 200rem/@w;
          margin-left: 12rem/@w;
        }
        .yzm{height: 17rem/@w;line-height: 17rem/@w;padding-left: 10rem/@w;
          font-size: 12rem/@w;margin-left: 33rem/@w;display: inline-block;vertical-align:top;
          border-left:0.5rem/@w solid #ccc;}
        .ac{color:#22BCB8;}
      }
      .input2 input{
        width: 200rem/@w;margin-left: 12rem/@w;
      }
      .login{text-align: center;padding: 10rem/@w 0 20rem/@w;
      input{background: #c7c7c7;height: 44rem/@w;color:#fff;font-size: 16rem/@w;display: block;width: 100%;line-height:44rem/@w;}
        .acc{background: #22BCB8;}
      }
    }

  }
</style>
