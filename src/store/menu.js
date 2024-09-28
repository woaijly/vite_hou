const localdata = localStorage.getItem('pz_v3pz')


const state = localdata ? localdata.menu : {
  isCollapse: false,
  selectMenu: [
    // {id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据'}
  ],
  routerList: []
  
}
const mutations = {

  collapseMenu(state) {
    state.isCollapse = !state.isCollapse
  },
  addMenu(state, menu) {
    // console.log(state.selectMenu);

    if (state.selectMenu.findIndex(item => item.path === menu.path) === -1) {
      state.selectMenu.push(menu)
    }
  },
  closemanu(state, menu) {
    const index = state.selectMenu.findIndex(item => item.path === menu.path)
    // 通过索引删除指定的数据
    state.selectMenu.splice(index, 1)
  },
  dynamicMenu(state, menu) {
    // console.log(menu);
    const modules = import.meta.glob('../views/**/**/*.vue')
    // console.log(modules);
    function routerSet(router) {
      router.forEach(route => {
        if (!route.children) {
          const url = `../views${route.meta.path}/index.vue`
          route.component = modules[url]
          //  console.log(route.component);

        } else {
          routerSet(route.children)

        }
      });
    }
    routerSet(menu)
    state.routerList = menu

  },
 

}

export default { mutations, state };
