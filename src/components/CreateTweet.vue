<template>
  <div>
    <img  src="../assets/create.png" alt="create tweet">
   <section v-if="createAnewTweet === true">
    <form action="javascript:void(0)" autocomplete="off">
      <input type="text" id="tweetContent" placeholder="tweet content" />
      <br />
      <input type="text" id="userImage" placeholder="image url" />
      <br />
      <input type="submit" value="See tweet!" @click="createTweet" />
    </form></section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-tweet",
  data() {
    return {
      createAnewTweet: false,
    }
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    check: function () {
      console.log(
        document.getElementById("tweetContent").value +
          this.storeCurrentUser.loginToken
      );
    },
    createTweet: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            content: document.getElementById("tweetContent").value,
            imageUrl: document.getElementById("userImage").value,
            loginToken: this.storeCurrentUser.loginToken,
          },
        })
        .then((res)  => {
          console.log(res.data + " create tweet");
          this.getAllTweets();
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
          // console.log(res);
          let orderedTweets = res.data
            .sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            })
            .slice()
            .reverse();
          this.$store.commit("updateTweets", orderedTweets);
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
  width: 45px;
  // position: fixed;
  // bottom: 70px; 
  // right: 10px;
}
</style>