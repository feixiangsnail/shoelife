<template>
  <section id="login">
    <div class="sign-in">
      <div class="wrap">
        <div class="closebtn">
          <div @click="close"><img src="../../../assets/img/btnClose.png" alt=""></div>
        </div>
          <div class="web">
            <input type="number" v-model="mobile" @input="valiPhone" placeholder="手机号码" class="phone">
            <!--<input type="button" v-model="codeVal" @click="code" class="yzm" :class="{ac:codeVal!='获取验证码'||this.mobile.length==11}">-->
              <div  v-model="codeVal" @click="code" class="yzm" :class="{ac:codeVal!='获取验证码'||this.mobile.length==11}">{{codeVal}}</div>
          </div>
          <div class="wx">
            <input type='number' v-model="securityCode" @input="valiCode" placeholder="短信验证码">
          </div>
          <div class="login">
            <input type="button" value="登录" :class="isLoad" @click="signIn">
          </div>
      </div>
    </div>
  </section>
</template>
<script src="./index.js"></script>