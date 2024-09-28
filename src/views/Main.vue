<template>
  <div class="common-layout">
    <el-container>
    
      
           <Aside ></Aside> 

      <el-container>
        <el-header>
          <navHeader />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted } from 'vue';

import {
  useRoute,
  useRouter,
} from 'vue-router';

import Aside from '../components/aside.vue';

const router=useRouter()
//  刷新就是为重定向到指定的路由
// onMounted(()=>{
//   router.push("/dashboard")
// })
</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>
