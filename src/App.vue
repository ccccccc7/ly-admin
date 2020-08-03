<template>
  <div id="app">
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import yoyoyo from './util/yoyoyo.js';
export default {
  name: 'app'
}
</script>

<style>
  @import "../static/css/main.css";
</style>
