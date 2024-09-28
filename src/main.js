import './style.css';

import { createApp } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import PanelHeader from './components/panelHeader.vue';
import router from './router/index';
import { store } from './store';

// 刷新之后的动态路由缓存问题
const localdata=localStorage.getItem('pz_v3pz')

if(localdata){
  store.commit('dynamicMenu',JSON.parse(localdata).menu.routerList)
  store.state.menu.routerList.forEach(item => {
    router.addRoute('main',item)
    
  });
}


// 路由守卫页面跳转之前的
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("pz_token");
  // 如果是非登录页面
  if (to.path !== "/login" && !token) {
    
    next("/login");
    // 已经登录之后访问登录就直接到达登录之后的页面
  } else if (token && to.path === '/login') {
   
    next("/");

  }else{
    
    next();
  }
});

const app = createApp(App)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册全局组件
app.component('panelHeader',PanelHeader)
// 挂载路由
app.use(router)
// 挂载vuex
app.use(store)
app.mount('#app')
