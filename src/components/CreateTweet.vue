<template>
  <div>
      <form action="javascript:void(0)" autocomplete="off">
          <input type="text" id="tweetContent" placeholder="tweet content">
          <br>
          <input type="text" id="userImage" placeholder="image url">
<br>
          <input type="submit" value="See tweet!" @click="createTweet">
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
    check: function(){
      console.log(document.getElementById("tweetContent").value + this.storeCurrentUser.loginToken);
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
        .then((res) => {
          console.log(res);
          location.reload();
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