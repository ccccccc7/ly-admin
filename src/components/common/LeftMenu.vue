<template>
  <div>
    <!--<div @click="isCollapse = !isCollapse" style="padding-left: 20px;color: #409EFF">-->
    <!--<i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>-->
    <!--</div>-->
    <el-menu default-active="1" :collapse="isCollapse" class="el-menu-vertical-demo" @open="handleOpen"
             @close="handleClose" style="margin-top: 10px;height: 100%">
      <div index="1" @click="isCollapse = !isCollapse" class="menuButton">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </div>
      <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
        <el-submenu v-if="!item.leaf" :index="index++">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{item.name}}</span>
          </template>
            <el-menu-item v-for="term in item.children" :index="item.path + term.path" :key="term.path" v-if="term.menuShow">
              {{term.name}}
            </el-menu-item>

        </el-submenu>
        <el-menu-item v-else-if="item.leaf" :index="item.path">
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
      <!--<el-menu-item index="1">-->
      <!--<i class="el-icon-menu"></i>-->
      <!--<span slot="title">首页</span>-->
      <!--</el-menu-item>-->
      <!--<el-submenu index="2">-->
      <!--<template slot="title">-->
      <!--<i class="el-icon-location"></i>-->
      <!--<span slot="title">导航一</span>-->
      <!--</template>-->
      <!--<el-menu-item-group>-->
      <!--<span slot="title">分组一</span>-->
      <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
      <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--<el-menu-item-group title="分组2">-->
      <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--<el-submenu index="1-4">-->
      <!--<span slot="title">选项4</span>-->
      <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
      <!--</el-submenu>-->
      <!--</el-submenu>-->
      <!--<el-menu-item index="3">-->
      <!--<i class="el-icon-menu"></i>-->
      <!--<span slot="title">导航二</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4">-->
      <!--<i class="el-icon-setting"></i>-->
      <!--<span slot="title">导航三</span>-->
      <!--</el-menu-item>-->

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
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: auto;
  }
</style>
