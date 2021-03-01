import Vue from 'vue';
import Vuex from 'vuex';

import _ from 'lodash';

Vue.use(Vuex);

export default {
  state: {
    currentPage: 1,
    routesOnPage: 3,
  },
  mutations: {
    setPage(state, page) {
      state.currentPage = page;
    },
  },
  actions: {
    setPage({ commit }, page) {
      commit('setPage', page);
    },
  },
  getters: {
    currentPage: (state) => state.currentPage,

    routesByPages: (state, getters) => _.chunk(getters.routesData, state.routesOnPage),

    currentPageRoutes: ({ currentPage }, { routesByPages }) => routesByPages[currentPage - 1],

    countPage: (state, getters) => getters.routesByPages.length,
  },
  modules: {},
};
