<template>
  <div>
    <div v-for="object in storeTweets.slice().reverse()" :key="object.string">
      <h4>{{ object.username }}</h4>
      <p>{{ object.content }}</p>
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "get-tweet",

  computed: {
    storeTweets() {
      return this.$store.state.tweets;
    },
  },
  mounted: function () {
    this.getAllTweets();
  },
  methods: {
    getAllTweets: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("updateTweets", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>