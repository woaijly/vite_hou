<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useStore } from 'vuex';

import TreeMenu from '../components/treeMenu.vue';

const handleOpen = () => {};
const handleClose = () => {};
const router = useRouter();
// console.log(router);
const route = useRoute();
const store = useStore();
// console.log(store.state);

const isCollapse = computed(() => store.state.menu.isCollapse);

// const useMenu = ref(router.options.routes[0].children);
const useMenu = computed(() => store.state.menu.routerList);
// onMounted(() => {
//   console.log(useMenu.value);
// });
// 获取激活的属性
const menuList = computed(() => store.state.menu.menuList);
</script>
<template>
  <el-row class="tac">
    <el-col :span="24">
      <h5 class="mb-2"></h5>
      <!-- 添加默认的激活行为就是去掉激活:单纯的设置激活的话可以加上 :default-active=" route.path "-->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-container"
        :default-active="route.path "
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
      <!-- {{ route.path }} -->
        <!-- <p class="logo-lg">{{ isCollapse ? "DIDI" : "DIDI陪诊" }}</p> -->
        <p class="logo-lg">{{ isCollapse ? "DIDI" : "DIDI陪诊" }}</p>
        <TreeMenu :index="1" :useMenu="useMenu"></TreeMenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.aside-container {
  height: 100%;
  .logo-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
