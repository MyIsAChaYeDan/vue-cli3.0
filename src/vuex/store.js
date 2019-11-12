import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import createPersistedState from 'vuex-persistedstate';//数据持久化
// vuex状态引入主入口
import common from './common';
const store = new Vuex.Store({
    modules:{
        common: common,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
export default store;