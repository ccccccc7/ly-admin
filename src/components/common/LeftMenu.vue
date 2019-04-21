<template>
  <div class="menu">
    <el-menu default-active="1" :collapse="isCollapse" class="el-menu-vertical-demo" style="height: 100%" router>
      <div index="1" @click="isCollapse = !isCollapse" class="menuButton">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </div>
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index++ + ''">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="term in item.children" :index="term.path" :key="term.path" v-if="!term.hidden">
            {{term.meta.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'left-menu',
    data() {
      return {
        menuButton: "el-icon-d-arrow-left",
        isCollapse: false
      };
    },
    methods: {}
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: auto;
  }
</style>
