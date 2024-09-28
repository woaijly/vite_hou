<script setup>
import { computed } from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();
const selsectMenu = computed(() => store.state.menu.selectMenu);
// console.log(selsectMenu.value);

// 点击关闭tag
const closetag = (item, index) => {
  store.commit("closemanu", item);
  // 删除的是非当前页
  if (route.path !== item.path) {
    return;
  }
  // 删除的是最后一项
  if (selsectMenu.value.length === index) {
    // 如果数据只有一个就跳转至首页
    if (!selsectMenu.value.length) {
      router.push({ path: "/" });
    } else {
      router.push({ path: selsectMenu.value[index - 1].path });
    }
  } else {
    //如果删除的是中间位置的tag就会向后位置
    // console.log(index);

    console.log(selsectMenu.value);

    router.push({ path: selsectMenu.value[index].path });
  }
};
// 下来菜单的事件
const handlerClick = (command) => {
  if (command === "cancel") {
    localStorage.removeItem("pz_token");
    localStorage.removeItem("pz_userInfo");
    localStorage.removeItem("pz_v3pz");
    window.location.href = window.location.origin;
  }
};
// 获取用户信息
const userInfo = JSON.parse(localStorage.getItem("pz_userInfo"));
</script>
<template>
  <div class="header-container">
    <div class="head-left fix-box">
      <el-icon class="icon" size="20" @click="store.commit('collapseMenu')"
        ><Fold
      /></el-icon>
      <ul class="fix-box">
        <li
          v-for="(item, index) in selsectMenu"
          :key="item.path"
          class="tab fix-box"
          :class="{ selected: route.path === item.path }"
        >
          <el-icon size="12"><component :is="item.icon" /></el-icon>
          <router-link class="text fix-box" :to="{ path: item.path }">
            {{ item.name }}
          </router-link>
          <el-icon size="12" class="close" @click="closetag(item, index)"
            ><Close
          /></el-icon>
        </li>
      </ul>
    </div>
    <div class="head-right">
      <el-dropdown @command="handlerClick">
        <div class="el-dropdown-link fix-box">
          <el-avatar :src="userInfo.avatar" />
          <p class="user-name">{{ userInfo.name }}</p>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fix-box {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
  background-color: rgb(208, 219, 227);
  padding-right: 25px;
  .head-left {
    height: 100%;
    .icon {
      width: 45px;
      height: 100%;
    }
    .icon:hover {
      background-color: #e3dada;
      cursor: pointer;
    }
    .tab {
      padding: 0 10px;
      height: 100%;
      .text {
        height: 100%;
        margin: 0 5px;
      }
      .close {
        visibility: hidden;
      }
      &.selected {
        a {
          color: rgb(177, 19, 19);
        }
        i {
          color: rgb(210, 14, 0);
        }
        background-color: #d0dbe3;
      }
    }
    .tab:hover {
      background-color: #fffbfb;
      .close {
        visibility: inherit;
        cursor: pointer;
      }
    }
  }
  .head-right {
    .user-name {
      margin-left: 10px;
    }
  }
  a {
    height: 100%;
    color: #333;
    font-size: 15px;
  }
}
</style>
