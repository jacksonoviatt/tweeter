import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: cookies.get("currentUser"),
    deleteAccountOptions: "false",
    tweets: [],
  },
  mutations: {
    updateDeleteAccountOptions: function(state, data) {
      state.deleteAccountOptions = data;
    },
    updateTweets: function(state, data) {
      state.tweets = data;
    },
  },
  actions: {
  },
  getters: {
  }
})
