import { createStore } from 'vuex';
import createPersistedstate from 'vuex-persistedstate';

import menu from './menu';

// console.log(menu);

 export const store =  createStore({
  plugins: [new createPersistedstate({
    key:'pz_v3pz'
  })],

modules: {menu}
})
