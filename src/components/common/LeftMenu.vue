<template>
  <div class="menu">
    <el-menu default-active="1" :collapse="isCollapse" class="el-menu-vertical-demo" style="height: 100%" router>
      <div index="1" @click="isCollapse = !isCollapse" class="menuButton">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </div>
      <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
        <el-submenu v-if="!item.leaf" :index="index++ + ''">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item v-for="term in item.children" :index="term.path" :key="term.path" v-if="term.menuShow">
            {{term.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else-if="item.leaf && item.menuShow" :index="item.path" :key="item.path">
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
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
