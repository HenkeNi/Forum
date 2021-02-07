import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
  },
  getters: {
    currentUser(state) {
      //return JSON.parse(localStorage.getItem('currentUser'));
      return state.currentUser;
    },
    // isLoggedIn(state) {
    //   return state.loggedIn;
    // }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
      //localStorage.setItem('currentUser', JSON.stringify(user));
    }
    // setIsLoggedIn(state, isLoggedIn) {
    //   state.isLoggedIn = isLoggedIn;
    // }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      
      //let user = await fetch(`/api/login`); // check if anyone is logged in....
      let user = await fetch('/rest/v1/whoami');
      user = await user.json();
      commit("setCurrentUser", user);
      //this.setCurrentUser(user);

 
     // user !== null ? commit('setIsLoggedIn', true) : commit('setIsLoggedIn', false);
     // console.log(this.state.isLoggedIn);
    },
    async postNewPost(post) {
      let res = await fetch('/rest/v1/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
      });
      res = await res.json();
      return res;
    },
    async signInUser({ commit }, credentials) {
      let res = await fetch("/rest/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      res = await res.json(); 
      commit("setCurrentUser", res);
      return res;
    },
    async registerUser({ dispatch }, credentials) {
      let res = await fetch("/rest/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      res = await res.json();
      credentials.id = res.lastInsertRowid;
      dispatch("signInUser", credentials);
      return res;
    },
    

  },
  modules: {},
});