<template>
  <div>
    <img
      class="editTweet"
      @click="openEditTweet"
      src="../assets/edit.svg"
      alt="edit tweet icons"
    />
    <img
      class="deleteComment"
      @click="openDeleteTweet"
      src="../assets/x.svg"
      alt="delete comment"
    />
    <button
      class="editTweetButton"
      @click="deleteTweet"
      v-if="yesDeleteTweet === true"
    >
      Delete
    </button>
    <section v-if="editTweetClicked === true" class="editTweetContainer">
      <form action="javascript:void(0)" autocomplete="off">
        <input
          type="text"
          placeholder="Edit Your Tweet"
          autocomplete="null"
          id="editTweet"
        />
        <br />
        <input
          class="editTweetButton"
          type="submit"
          value="Edit Tweet"
          @click="patchTweet"
        />
        <!-- <button>Edit Tweet</button> -->
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
    getTweetsFunction: Function,
  },
  methods: {
    check: function () {
      console.log("this button works");
    },
    openEditTweet: function () {
      this.editTweetClicked = !this.editTweetClicked;
      if (this.yesDeleteTweet === true) {
        this.yesDeleteTweet = false;
      }
    },
    openDeleteTweet: function () {
      this.yesDeleteTweet = !this.yesDeleteTweet;
      this.editTweetClicked = false;
    },
    patchTweet: function () {
      axios
        .request({
          method: "PATCH",
          url: `${process.env.VUE_APP_API_KEY}/api/tweets`,
          headers: {
            "Content-Type": "application/json",
            // "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            content: document.getElementById("editTweet").value,
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.editTweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getTweetsFunction();
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
          url: `${process.env.VUE_APP_API_KEY}/api/tweets`,
          headers: {
            "Content-Type": "application/json",
            // "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.editTweetId,
          },
        })
        .then((res) => {
          console.log(res.data);
          // this.getAllTweets();
          this.getTweetsFunction();
          this.editTweetClicked = false;
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
  // margin-bottom: 20px;
}

.deleteComment {
  width: 10px;
  position: absolute;
  margin-left: 95px;
  margin-top: 30px;
}
.editTweetButton {
  margin-top: 3px;
  // padding-top: 2px;
  width: 80px;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  position: absolute;
  margin-bottom: 20px;
}
@media screen and (min-width: 600px) {
  .editTweet {
    margin-left: 140px;
  }

  .deleteComment {
    margin-left: 140px;
  }
}
@media screen and (min-width: 1100px) {
  .editTweet {
    margin-left: 170px;
  }

  .deleteComment {
    margin-left: 170px;
  }
}
</style>