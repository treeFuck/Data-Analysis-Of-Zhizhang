<style lang="scss" scoped>
.login {
  font-size: 16px;
  min-width: 100vw;
  min-height: 100vh;
  background: #e9f9f9;
  .bg {
    display: block;
    margin: 0 auto;
    height: 100vh;
  }
  .con {
    position: absolute;
    top: 50%;
    left: 60%;
    padding: 1em 2em;
    margin-top: -12.5em;
    width: 22em;
    height: 23em;
    border-radius: 20px;
    border-right: 1px solid #999;
    border-left: 1px solid #999;
    background-color: rgba(233, 249, 249, 0.8);
    .title {
      display: block;
      height: 2.5em;
      text-align: left;
      font-size: 40px;
      line-height: 2.2em;
      color: #666;
    }
    .input {
      div {
        position: relative;
        margin-bottom: 2.5em;
        height: 2em;
        border-bottom: 1px solid #999;
        img {
          position: absolute;
          left: 0;
          bottom: 0.3em;
          display: block;
          height: 1.5em;
        }
        input {
          position: absolute;
          bottom: 0.2em;
          left: 2em;
          outline: none;
          border: none;
          color: #666;
          background-color: rgba(1, 1, 1, 0);
        }
        .judge {
          position: absolute;
          right: 1em;
          bottom: -2em;
          color: #f40;
          font-weight: bold;
          font-size: 14px;
          text-align: right;
          letter-spacing: 0.5px;
        }
      }
    }
    .button {
      margin-top: 3.6em;
      button {
        display: block;
        margin: 0 auto;
        padding: 0.3em 1em;
        width: 12em;
        color: #666;
        outline: none;
        cursor: pointer;
        border: 1px solid #999;
        border-radius: 4px;
        background: rgba(1, 1, 1, 0);
        transition: all 0.3s;
      }
      button:hover {
        color: #fff;
        font-weight: bold;
        background-color: #999;
      }
    }
  }
}
</style>

<template>
  <div class="login">
    <img class="bg" :src="bg" />
    <div class="con">
      <span class="title">Login</span>
      <div class="input">
        <div>
          <img src="../assets/user.png" />
          <input
            v-model="user"
            placeholder="username"
            maxlength="6"
            @focus="removeJudge"
          />
          <span class="judge">{{userJudge}}</span>
        </div>
        <div>
          <img src="../assets/pass.png" />
          <input
            v-model="pass"
            placeholder="password"
            type="password"
            maxlength="6"
            @focus="removeJudge"
          />
          <span class="judge">{{passJudge}}</span>
        </div>
      </div>
      <div class="button">
        <button @click="commit">Sure</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import bg from "../assets/bg.jpg";
@Component
export default class login extends Vue {
  user: string = "";
  pass: string = "";
  userJudge: string = "";
  passJudge: string = "";
  bg:string =  bg;
  judeg():boolean {
    let judeg = /[\w_]{6,20}$/;
    if (!judeg.test(this.user)) {
      this.userJudge = "请输入0-6位有效字符";
      return false;
    }
    if (!judeg.test(this.pass)) {
      this.passJudge = "请输入0-6位有效字符";
      return false;
    }
    return true;
  }
  removeJudge() {
    this.userJudge = "";
    this.passJudge = "";
  }
  commit():void {
    if(!this.judeg()) {
      return;
    }
    this.$router.replace({name:'index'});
    // axios.post("",{

    // }).then(res=>{
    //   console.log(res);
    // })
  }
  mounted() {
  }
}
</script>
