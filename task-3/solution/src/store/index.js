import Vue from 'vue';
import Vuex from 'vuex';

import pager from '@/store/pager';
import main from '@/store/main';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { main, pager },
});
