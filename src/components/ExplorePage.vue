<template>
  <div>
    <get-tweets></get-tweets>
  </div>
</template>

<script>
import GetTweets from "./GetTweets.vue";
export default {
  name: "explore-page",
  components: { GetTweets },
  computed: {
    storeTweets() {
      return this.$store.state.tweets;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>