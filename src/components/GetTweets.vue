<template>
  <div id="getTweets">
    <!-- loop through the array of tweet information -->
    <section v-if="seeFollowsTweets === 'explore'">
      <div
        class="tweetContainer"
        v-for="object in storeTweets"
        :key="object.string"
      >
      <div class="spacing"></div>
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

        <created-at
          class="createdAt"
          :createdAt="object.createdAt"
        ></created-at>
        <!-- <p>{{ object.createdAt }}</p> -->

        <p class="content">{{ object.content }}</p>

        <!-- <friend-profile v-if="openProfile === true"></friend-profile> -->
        <img
          class="tweetImage"
          v-if="object.tweetImageUrl"
          :src="object.tweetImageUrl"
          :alt="object.content"
        /><like-tweet :tweetId="object.tweetId"></like-tweet>
        <comment-section :commentTweetId="object.tweetId"></comment-section>
      </div>
    </section>
    <section v-if="seeFollowsTweets === 'friends'">
      <div class="tweetContainer" v-for="tweet in storeTweets" :key="tweet.id">
        <div v-for="object in userFollows" :key="object.id">
          <div v-if="object.userId === tweet.userId">
            <div class="spacing"></div>
            <edit-tweet
              v-if="storeCurrentUser.userId === tweet.userId"
              :editTweetId="tweet.tweetId"
            ></edit-tweet>
            <friend-profile
              :otherUserId="tweet.userId"
              :otherUserName="tweet.username"
              :getTweetsFunction="getAllTweets"
          
            ></friend-profile>
            <div class="line"></div>

            <created-at
              class="createdAt"
              :createdAt="tweet.createdAt"
            ></created-at>
            <!-- <p>{{ object.createdAt }}</p> -->

            <p class="content">{{ tweet.content }}</p>

            <!-- <friend-profile v-if="openProfile === true"></friend-profile> -->
            <img
              class="tweetImage"
              v-if="tweet.tweetImageUrl"
              :src="tweet.tweetImageUrl"
              :alt="tweet.content"
            /><like-tweet :tweetId="tweet.tweetId"></like-tweet>
            <comment-section :commentTweetId="tweet.tweetId"></comment-section>
          </div>
        </div>
      </div>
    </section>
    <feed-footer @openExploreFeed="handleOpenExploreFeed" @openFriendFeed="handleOpenFriendsFeed"></feed-footer>
  </div>
</template>

<script>
import axios from "axios";
import EditTweet from "./EditTweet.vue";
import FriendProfile from "./FriendProfile.vue";
// import CommentSection from "./CommentSection.vue";
import CreatedAt from "./CreatedAt.vue";
import LikeTweet from "./LikeTweet.vue";
import FeedFooter from "./FeedFooter.vue";
export default {
  name: "get-tweets",
  components: {
    EditTweet,
    FriendProfile,
    // Recursive Component
    CommentSection: () => import('./CommentSection.vue'),
    CreatedAt,
    LikeTweet,
    FeedFooter,
  },
  data() {
    return {
      // tweets: [],
      seeFollowsTweets: "friends",
      userFollow: [],
      userFollows: [],
    };
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
    this.getUserFollows();
  },
  methods: {
    handleOpenExploreFeed: function (data) {
      this.seeFollowsTweets = data;
    },
    handleOpenFriendsFeed: function (data) {
      this.seeFollowsTweets = data;
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
          let orderedTweets = res.data
            .sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            })
            .slice()
            .reverse();
          // if (this.seeFollowsTweets === false) {
          this.$store.commit("updateTweets", orderedTweets);
          // this.tweets = orderedTweets;
          // console.log(this.tweets);
          // } else if (this.seeFollowsTweets === true) {
          //   let friendsTweets = this.userFollows.filter(
          //     (userFollows) =>
          //       userFollows.userId === this.storeCurrentUser.userId
          //   );
          //   console.log(friendsTweets);

          //   for (this.i = 0; this.i < this.userFollow.length; this.i++) {
          //     this.tweets = orderedTweets.filter(
          //       (orderedTweets) => orderedTweets.username === this.userFollow[this.i].username
          //     );
          // }
          // }
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
          params: {
            userId: this.storeCurrentUser.userId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.userFollows = res.data;
          console.log(this.userFollows);
          //  this.userFollow = res.data;
          //     console.log(this.userFollow[0] + "userFollow");

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
  
  margin: 50px 10px;

  height: 100%;
  width: 250px;
  background: #f6f7f3;
  box-shadow: #88997c 0px 0px 2px, #88997c 0px 0px 4px, #88997c 2px 2px 2px,;
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
.spacing {
  height: 15px;
}
</style>