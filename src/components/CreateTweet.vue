<template>
  <div>
      <form action="javascript:void(0)" autocomplete="off">
          <input type="text" id="tweetContent">
          <input type="submit" value="Post!" @click="createTweet">
      </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-tweet",
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
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
            loginToken: this.storeCurrentUser.loginToken,
            content: document.getElementById("tweetContent").value
          },
        })
        .then((res) => {
          console.log(res);
          
          
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