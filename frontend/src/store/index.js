import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: Object,
  },
  getters: {
    currentUser() {
      return JSON.parse(localStorage.getItem('currentUser'));
      //return state.currentUser;
    }
  },
  mutations: {
    setCurrentUser(user) {
      localStorage.setItem('currentUser', user);
    }
  },
  actions: {},
  modules: {},
});