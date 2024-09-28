<script setup>
import { computed } from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps(["useMenu", "index"]);
// console.log(props);
const router = useRouter();

const store = useStore();

const route = useRoute();
//ref,value 
const selsectMenu = computed(() => store.state.menu.selectMenu);

const handelepuch = (item, index) => {
  // console  .log(selsectMenu.value);
  // console.log(item.meta.path);
  store.commit("addMenu", item.meta);
  // console.log(index);
  
  // store.commit('updataList',index)
  router.push(item.meta.path);
};

const isActive = (path) => {
  if(path === route.path){
    return true;
  }else{
    return false;
  }
 
}
</script>

<template>
  <!-- 
 <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item> -->

  <template
    v-for="(item, index) in props.useMenu"
    :key="`${props.index}-${item.meta.id}`"
  >
    <el-menu-item
      v-if="!item.children || item.children.length == 0"
      :index="`${props.index}-${item.meta.id}`"
      @click="handelepuch(item, `${props.index}-${item.meta.id}`)" 
      :class="{'is-active' : isActive(item.meta.path)}"
    >
    <!-- {{selsectMenu.value  }} -->
      <!-- {{ item.meta.path }} -->
      <!-- <el-icon><setting /></el-icon>
          <span>Navigator Four</span> -->
      <el-icon size="20">
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <!-- 递归向上传递数据 -->
      <tree-menu
        :index="`${props.index}-${item.meta.id}`"
        :useMenu="item.children"
      ></tree-menu>
    </el-sub-menu>
  </template>
</template>

<style lang="less" scoped>

</style>
