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
      
      //let user = await fetch(`http://localhost:3000/api/login`); // check if anyone is logged in....
      let user = await fetch('http://localhost:3000/rest/whoami');
      user = await user.json();
      commit("setCurrentUser", user);
      //this.setCurrentUser(user);

      console.log("Fetched current user: ", user);

     // user !== null ? commit('setIsLoggedIn', true) : commit('setIsLoggedIn', false);
     // console.log(this.state.isLoggedIn);
    },

    async postNewPost(post) {
      console.log("TRYING TO POST: ", post);
      let res = await fetch('http://localhost:3000/rest/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(post)
      });
      res = await res.json();
      return res;
    }

  },
  modules: {},
});