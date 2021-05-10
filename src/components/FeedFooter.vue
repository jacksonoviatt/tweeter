<template>
  <div>
    <div id="feedFooter">
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
</template>

<script>
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
      this.getUserFollowsFunction();
      this.getTweetsFunction();
    },
    openFriendFeed: function () {
      this.$emit("openFriendFeed", "friends");
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
  grid-template-columns: 1fr 1fr;
  z-index: 2;
  img {
    height: 40px;
  }
}
</style>