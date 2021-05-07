<template>
  <div id="getTweets">
    
    <!-- loop through the array of tweet information -->
    <div
      class="tweetContainer"
      v-for="object in storeTweets"
      :key="object.string"
    >
      <edit-tweet
        v-if="storeCurrentUser.userId === object.userId"
        :editTweetId="object.tweetId"
      ></edit-tweet>
      <friend-profile
        :otherUserId="object.userId"
        :otherUserName="object.username"
        :getTweetsFunction="getAllTweets"
      ></friend-profile>
      <div class="line"></div>

      <created-at class="createdAt" :createdAt="object.createdAt"></created-at>
      <!-- <p>{{ object.createdAt }}</p> -->

      <p  class="content">{{ object.content }}</p>

      <!-- <friend-profile v-if="openProfile === true"></friend-profile> -->
      <img
        class="tweetImage"
        v-if="object.tweetImageUrl"
        :src="object.tweetImageUrl"
        :alt="object.content"
      /><like-tweet :tweetId="object.tweetId"></like-tweet>
      <comment-section :commentTweetId="object.tweetId"></comment-section>
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditTweet from "./EditTweet.vue";
import FriendProfile from "./FriendProfile.vue";
import CommentSection from "./CommentSection.vue";
import CreatedAt from "./CreatedAt.vue";
import LikeTweet from "./LikeTweet.vue";
export default {
  name: "get-tweets",
  components: {
    EditTweet,
    FriendProfile,
    CommentSection,
    CreatedAt,
    LikeTweet,
  },

  computed: {
    storeTweets() {
      return this.$store.state.tweets;
    },
    storeCurrentUser() {
      return this.$store.state.currentUser;
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
          // console.log(rses);
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
       getUserFollows() {
      
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.$store.commit("updateGetAllFollows", res.data)
          
          //   console.log(this.thisTweetsLikes.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#getTweets {
  display: grid;
  place-items: center;
  margin-top: 30px;
  gap: 20px;
}
.tweetContainer {
  margin: 10px;
  // border: cornflowerblue 2px solid;
  height: 100%;
  width: 250px;
  background: #f6f7f3;
  box-shadow: #88997c 2px 2px 2px;
  color: #282e24;
  .tweetImage {
    width: 100px;
  }
  .createdAt {
    text-align: left;
    margin: 10px;
    font-size: 10px;
    display: grid;
    grid-template-columns: 1fr 8fr;
  }
  // .dateButton {
  //   width: 10px;
  // }
  .line {
    width: 70%;
    height: 1px;
    background: #282e24;
    margin: 10px 10px;
  }
  .content {
    text-align: left;
    margin-left: 10px;
    width: 70%;
    padding-bottom: 20px;
  }
  
}
</style>