<template>
<div>
  <div id="footerFeed">
    <div id="feedFooter">
      <img  @click="openSearchFeed"
      class="searchImg" src="../assets/search.png" alt="Search Page" />
      <img
        @click="openFriendFeed"
        src="../assets/friendsList.png"
        alt="people you follow"
      />

      <img
        @click="openExploreFeed"
        src="../assets/explore.png"
        alt="Explore Page"
      />
    </div>
    <create-tweet></create-tweet>
  </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import CreateTweet from "./CreateTweet.vue";
export default {
  components: { CreateTweet },
  name: "feed-footer",
  props: {
    getTweetsFunction: Function,
    getUserFollowsFunction: Function,
  },
  
  methods: {
    openExploreFeed: function () {
      this.$emit("openExploreFeed", "explore");
      cookies.set("seeTweets", "explore");
      this.getUserFollowsFunction();
      this.getTweetsFunction();
    },
    openFriendFeed: function () {
      this.$emit("openFriendFeed", "friends");
      cookies.set("seeTweets", "friends");
      this.getUserFollowsFunction();
      this.getTweetsFunction();
    },
    openSearchFeed: function () {
      this.$emit("openFriendFeed", "search");
      cookies.set("seeTweets", "search");
      this.getUserFollowsFunction();
      this.getTweetsFunction();
    },
  },
};
</script>

<style lang="scss" scoped>
#feedFooter {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
  background: #a1ae98ee;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  z-index: 2;
  img {
    height: 40px;
  }
}
.searchImg {
  transform: scaleX(-1);
}
@media screen and (min-width: 600px) {


}
@media screen and (min-width: 1000px) {
#feedFooter {
  width: 50%;
  margin-left: 25%;
  margin-right: 25%;
  
}
#footerFeed {

  z-index: 2;
  position: fixed;
  bottom: 0;
  right: 0;
  height: 60px;
  background: #a1ae98ee;
   width: 100%;
  display: grid;
  place-items: center;
}
}
</style>