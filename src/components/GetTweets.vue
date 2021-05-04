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
      ></friend-profile>
     <div class="line"></div>
  
        <created-at class="createdAt" :createdAt="object.createdAt"></created-at>
        <!-- <p>{{ object.createdAt }}</p> -->
   
      <p class="content">{{ object.content }}</p>

      <!-- <friend-profile v-if="openProfile === true"></friend-profile> -->
      <img
        class="tweetImage"
        v-if="object.tweetImageUrl"
        :src="object.tweetImageUrl"
        :alt="object.content"
      />
      <comment-section :commentTweetId="object.tweetId"></comment-section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditTweet from "./EditTweet.vue";
import FriendProfile from "./FriendProfile.vue";
import CommentSection from "./CommentSection.vue";
import CreatedAt from './CreatedAt.vue';
export default {
  components: { EditTweet, FriendProfile, CommentSection, CreatedAt },
  name: "get-tweet",

  computed: {
    storeTweets() {
      return this.$store.state.tweets;
    },
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
    // storeFriendsId() {
    //   return this.$store.state.friendsId;
    // }
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
          console.log(res);
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
  background: #F6F7F3;
  box-shadow: #88997C 2px 2px 2px;
  color: #282E24;
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
  .dateButton {
    width: 10px;
  }
  .line {
    width: 70%;
    height: 1px;
    background: #282E24;
    margin: 10px 10px;
  
  }
  .content {
    text-align: left;
    margin-left: 10px;
  }
}
</style>