<template>
  <div>
    <div v-for="object in thisTweetsLikes" :key="object.id">
      <img
      class="unlikeTweet"
        @click="unlikeTweet"
        v-if="object.userId === storeCurrentUser.userId"
        src="../assets/liked.png"
        alt="liked"
      />
    </div>
    <img
      class="likeTweet"
      @click="likeTweet"
      src="../assets/like.png"
      alt="like"
    />
    <div class="showWhoLiked" @click="showWhoLiked = !showWhoLiked">
      <p>{{ thisTweetsLikes.length }}</p>
    </div>
    <section v-if="showWhoLiked === true">
      <div v-for="object in thisTweetsLikes" :key="object.id">
        <p>{{ object.username }}</p>
        <p>{{ object.userId }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "like-tweet",
  data() {
    return {
      liked: false,
      thisTweetsLikes: [],
      showWhoLiked: false,
      i: 0,
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    tweetId: Number,
  },
  mounted() {
    this.getTweetLikes();
    //   console.log(this.thisTweetsLikes.userId);
    //   for(this.i=0; this.i<this.thisTweetsLikes; this.i++) {
    //       if(this.thisTweetsLikes[this.i].userId === this.storeCurrentUser.userId) {
    //     //   this.liked = true;
    //     console.log(this.thisTweetsLikes[this.i].userId);
    //   }
    //   }
  },
  methods: {
    likeTweet: function () {
      this.liked = true;
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
          this.getTweetLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getTweetLikes: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/tweet-likes",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            tweetId: this.tweetId,
          },
        })
        .then((res) => {
          let resultData = res.data;
          this.thisTweetsLikes = resultData.filter(
            (resultData) => resultData.tweetId === this.tweetId
          );
          console.log(this.thisTweetsLikes);
          // this.userLiked = this.thisTweetsLikes.userId.filter(thisTweetsLikes => thisTweetsLikes.userId === this.storeCurrentUser.userId);
          for (this.i = 0; this.i < this.thisTweetsLikes; this.i++) {
            // if (this.thisTweetsLikes[this.i].userId ===) {
            console.log(this.thisTweetsLikes[this.i].userId);
            // }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeTweet: function () {
      this.liked = false;
      axios
        .request({
          method: "DELETE",
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
          this.getTweetLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // filterTweets: function(){

    // }
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 20px;
  position: absolute;
}
.unlikeTweet {
    z-index: 5;
}

.showWhoLiked {
    padding-top: 40px;
}
</style>