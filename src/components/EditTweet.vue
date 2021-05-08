<template>
  <div>
    <img
      class="editTweet"
      @click="editTweetClicked = !editTweetClicked"
      src="https://www.flaticon.com/svg/vstatic/svg/1159/1159876.svg?token=exp=1619905929~hmac=877dd4d104f6474015cf5d003e8eb352"
      alt="edit tweet icons"
    />
    <img
        class="deleteComment"
        @click="yesDeleteTweet = !yesDeleteTweet"
        src="https://image.flaticon.com/icons/png/128/109/109602.png"
        alt="delete comment"
      />
      <button @click="deleteTweet" v-if="yesDeleteTweet === true">Delete</button>
    <section v-if="editTweetClicked === true" class="editTweetContainer">
      
      <form action="javascript:void(0)" autocomplete="off">
        <input
          type="text"
          placeholder="Edit Your Tweet"
          autocomplete="null"
          id="editTweet"
        />
        <br />
        <button>Edit Tweet<input type="submit" value="Edit   Tweet" @click="patchTweet" /></button>
      </form>
    </section>
    <!-- <button v-if="editTweetClicked === true" @click="deleteTweet">
      Delete Tweet
    </button> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-tweet",
  data() {
    return {
      editTweetClicked: false,
      yesDeleteTweet: false,
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
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
          console.log(res.data);
          this.getAllTweets();
          this.editTweetClicked = false;
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
          console.log(res.data);
          this.getAllTweets();
          this.editTweetClicked = false;
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
.editTweet {
  width: 20px;
  position: absolute;
  margin-left: 90px;
}
#editTweet {
  padding: 5px;
  margin: 5px;
  margin-top: -10px;
}

.deleteComment {
  width: 10px;
  position: absolute;
  margin-left: 95px;
  margin-top: 30px;
}
button {
  margin-top: 3px;
  padding-top: 2px;
  width: 80px;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  position: absolute;
  input {
    opacity: 0;
  }
}

</style>