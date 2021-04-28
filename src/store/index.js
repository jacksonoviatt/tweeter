import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginToken: cookies.get("token"),
    currentUser: cookies.get("currentUser"),
  },
  mutations: {
     
  },
  actions: {
  },
  getters: {
  }
})
