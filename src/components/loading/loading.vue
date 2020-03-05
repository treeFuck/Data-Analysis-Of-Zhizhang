<style lang="scss" scoped>
.loading {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  
}
.style1 {
  color: #000;
  font-size: 60px;
  line-height: 100vh;
  background-color: rgba(1, 1, 1, 0.6);
}
.style2 {
  color: #f40;
  font-size: 30px;
  line-height: 71vh;
  background-color: #444;
}
.title {
  text-align: center;
  font-family: 微软雅黑;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.letter {
  animation: bounce 0.75s cubic-bezier(0.05, 0, 0.2, 1) infinite alternate;
  display: inline-block;
  
}
.letter:nth-child(1) {
  animation-delay: 0s;
}
.letter:nth-child(2) {
  animation-delay: 0.08s;
}
.letter:nth-child(3) {
  animation-delay: 0.16s;
}
.letter:nth-child(4) {
  animation-delay: 0.24s;
}
.letter:nth-child(5) {
  animation-delay: 0.35s;
}
.letter:nth-child(6) {
  animation-delay: 0.43s;
}
.letter:nth-child(7) {
  animation-delay: 0.52s;
}
.letter:nth-child(8) {
  animation-delay: 0.6s;
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -0.6em, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
  }
}
</style>
<template>
  <div class="loading" :class="{style1:type==1,style2:type==2}">
    <div class="title">
      <span class="letter">L</span>
      <span class="letter">o</span>
      <span class="letter">a</span>
      <span class="letter">d</span>
      <span class="letter">i</span>
      <span class="letter">n</span>
      <span class="letter">g</span>
      <span class="letter">…</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    type: Number,
  }
})
export default class login extends Vue {
  mounted() {}
}
</script>

