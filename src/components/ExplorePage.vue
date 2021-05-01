<template>
  <div>
    <the-tweet></the-tweet>
  </div>
</template>

<script>
import TheTweet from "./TheTweet.vue";
export default {
  name: "explore-page",
  components: { TheTweet },
  computed: {
    storeTweets() {
      return this.$store.state.tweets;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>