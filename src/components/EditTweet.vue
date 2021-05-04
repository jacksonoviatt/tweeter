<template>
  <div>
    <img class="editTweet" @click="editTweetClicked = !editTweetClicked"
      src="https://www.flaticon.com/svg/vstatic/svg/1159/1159876.svg?token=exp=1619905929~hmac=877dd4d104f6474015cf5d003e8eb352"
      alt="edit tweet icons"
    />
    <form v-if="editTweetClicked === true" action="javascript:void(0)" autocomplete="off">
      <input type="text" placeholder="edit your tweet" autocomplete="null" id="editTweet" />
      <br />
      <input type="submit" value="Save My Changes" @click="patchTweet" />
    </form>
    <button v-if="editTweetClicked === true" @click="deleteTweet">Delete Tweet</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-tweet",
  data() {
    return {
      editTweetClicked: false,
    };
  },
  computed: {
      storeCurrentUser() {
          return this.$store.state.currentUser;
      }
  },
  props: {
      editTweetId: Number,
  },
  methods: {
      patchTweet: function () {
      axios
        .request({
          method: "PATCH",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            content: document.getElementById("editTweet").value,
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.editTweetId,
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
  deleteTweet() {
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.editTweetId,
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
.editTweet {
  width: 20px;
  position: absolute;
  margin: 20px;
  margin-left: 90px;
  
}
</style>