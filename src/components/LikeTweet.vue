<template>
  <div>
    <img @click="likeTweet" v-if="liked === false" src="../assets/like.png" alt="like" />
    <img v-if="liked === true" src="../assets/liked.png" alt="liked" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "like-tweet",
  data() {
      return {
          liked: false,
      }
  },
  computed: {
      storeCurrentUser() {
          return this.$store.state.currentUser; 
      }
  },
  props: {
      tweetId: Number,
      
  },
  methods: {
    likeTweet: function () {
        this.liked = !this.liked
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/tweet-likes",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          //   location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
    width: 20px;
}
</style>