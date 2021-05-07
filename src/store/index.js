import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: cookies.get("currentUser"),
    deleteAccountOptions: "false",
    tweets: [],
    currentUserTweets: [],
    friendsId: Number,
    // getAllFollows: []
  },
  mutations: {
    updateFriendsId: function (state, data) {
      state.friendsId = data;
    },
    updateDeleteAccountOptions: function (state, data) {
      state.deleteAccountOptions = data;
    },
    updateTweets: function (state, data) {
      state.tweets = data;
    },
    updateCurrentUserTweets: function (state, data) {
      state.currentUserTweets = data;
    },
  },
  actions: {
  },
  getters: {
    // getCurrentUserTweets: function (state) {
    //   let userTweets =  state.tweets
    //   // let userTweets = state.tweets.filter(currentUserTweets => (currentUserTweets.userId.includes(this.currentUser.userId)));
    //   return userTweets;
    // }
  }
})
