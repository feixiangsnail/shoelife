<template>
  <footer id="footer" ref="footer">
    <div class="top" @click="onDownload">
      <i></i><span>立即下载鞋生活APP</span>
    </div>
    <div class="bot">
      <p>Copyright © 2017 Shoelives. All Rights Reserved<br>
        粤ICP备16124523号</p>
    </div>
  </footer>
</template>
<script>
  export default{
      methods: {
          onDownload(){
              window.location = "http://a.app.qq.com/o/simple.jsp?pkgname=com.shoelives.android"
          }
      },
      mounted() {

      }
  }
</script>
<style lang="less" scoped>
  @w:25;
  footer{
      width: 375rem/@w;bottom:0;z-index: -9;
    .top{height: 60rem/@w;width: 100%;background: #fff;color:#f5334a;
      border-top: 1px solid #e1e1e1;text-align: center;line-height: 60rem/@w;
    i{display: inline-block;height: 15rem/@w;width:15rem/@w;background: url("../../assets/img/download.png") no-repeat;
      background-size: 15rem/@w 15rem/@w;margin-right: 10rem/@w;vertical-align: middle;}
    span{
      font-size: 16rem/@w;letter-spacing:0.22rem/@w;
      vertical-align: middle;
    }
    }
    .bot{
      background: #616161;
    p{width: 298.4rem/@w;margin: 0 auto;font-size: 10rem/@w;color:#f6f6f6;
      line-height: 18rem/@w;text-align: center;}
    }
  }
</style>
