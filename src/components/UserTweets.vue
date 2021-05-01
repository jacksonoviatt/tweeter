<template>
  <div>
    <div v-for="object in storeCurrentUserTweets.slice().reverse()" :key="object.string">
      <h4>{{ object.username }}</h4>
      <p>{{ object.content }}</p>
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "user-tweets",
  computed: {
      storeCurrentUser() {
          return this.$store.state.currentUser;
      },
     storeCurrentUserTweets: function() {
         return this.$store.state.currentUserTweets;
     },
  },
  mounted: function() {
      this.getUserTweets();
  },
  methods: {
    getUserTweets: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
         params: {
              userId: this.storeCurrentUser.userId,
          }
        })
        .then((res) => {
          console.log(res);
          this.$store.commit("updateCurrentUserTweets", res.data)
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