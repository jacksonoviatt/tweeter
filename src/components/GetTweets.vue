<template>
  <div id="getTweets">
    <!-- loop through the array of tweet information -->
    <section v-if="seeFollowsTweets === 'explore'">
      <h3 class="exploreTitle">Explore</h3>

      <div
        class="tweetContainer"
        v-for="object in storeTweets"
        :key="object.string"
      >
        <div class="spacing"></div>
        <edit-tweet
          v-if="storeCurrentUser.userId === object.userId"
          :editTweetId="object.tweetId"
          :getTweetsFunction="getAllTweets"
        ></edit-tweet>
        <friend-profile
          :getUserFollowsFunction="getUserFollows"
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
      <h3 class="exploreTitle">Friends</h3>
      <div class="underline"></div>
      <div class="tweetContainer" v-for="tweet in storeTweets" :key="tweet.id">
        <div v-for="object in userFollows" :key="object.id">
          <div v-if="object.userId === tweet.userId">
            <div class="spacing"></div>
            <edit-tweet
              v-if="storeCurrentUser.userId === tweet.userId"
              :editTweetId="tweet.tweetId"
              :getTweetsFunction="getAllTweets"
            ></edit-tweet>
            <friend-profile
              :getUserFollowsFunction="getUserFollows"
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
    <section v-if="seeFollowsTweets === 'search'">
      <h3 class="exploreTitle">Search</h3> 
      <a href="#" @click="searchType = 'users'">Users</a> |
      <a href="#" @click="searchType = 'tweets'">Tweets</a>
      <div v-if="searchType === 'tweets'">
        <form action="javascript:void(0)" autocomplete="off">
          <input name="search" id="searchBox" placeholder="search tweets" />
          <input type="submit" @click="searchTweets" />
        </form>
      </div>
       <div v-if="searchType === 'users'">
        <form action="javascript:void(0)" autocomplete="off">
          <input name="search" id="userSearchBox" placeholder="search users" />
          <input type="submit" @click="searchUsers" />
        </form>
      </div>
      <p v-if="searchValue !== undefined">
        Showing Results for: <a href="#">{{ searchValue }}</a>
      </p>
      <div
        class="tweetContainer"
        v-for="object in searchedTweets"
        :key="object.string"
      >
        <div class="spacing"></div>
        <edit-tweet
          v-if="storeCurrentUser.userId === object.userId"
          :editTweetId="object.tweetId"
          :getTweetsFunction="getAllTweets"
        ></edit-tweet>
        <friend-profile
          :getUserFollowsFunction="getUserFollows"
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
    <feed-footer
      :getTweetsFunction="getAllTweets"
      :getUserFollowsFunction="getUserFollows"
      @openExploreFeed="handleOpenExploreFeed"
      @openFriendFeed="handleOpenFriendsFeed"
    ></feed-footer>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import axios from "axios";
import EditTweet from "./EditTweet.vue";
import FriendProfile from "./FriendProfile.vue";
import CreatedAt from "./CreatedAt.vue";
import LikeTweet from "./LikeTweet.vue";
import FeedFooter from "./FeedFooter.vue";
export default {
  name: "get-tweets",
  components: {
    EditTweet,
    FriendProfile,
    // Recursive Component
    CommentSection: () => import("./CommentSection.vue"),
    CreatedAt,
    LikeTweet,
    FeedFooter,
  },
  data() {
    return {
      // tweets: [],
      seeFollowsTweets: cookies.get("seeTweets"),
      userFollow: [],
      userFollows: [],
      searchedTweets: [],
      searchValue: undefined,
      searchType: "tweets"
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
    searchUsers: function () {
      this.searchValue = document.getElementById("userSearchBox").value.toLowerCase();
      this.searchedTweets = this.storeTweets.filter((storeTweets) =>
        storeTweets.username.toLowerCase().includes(this.searchValue)
      );
      console.log(this.searchedTweets);
      this.getAllTweets();
    },
    searchTweets: function () {
      this.searchValue = document.getElementById("searchBox").value.toLowerCase();
      this.searchedTweets = this.storeTweets.filter((storeTweets) =>
        storeTweets.content.toLowerCase().includes(this.searchValue)
      );
      console.log(this.searchedTweets);
      this.getAllTweets();
    },
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
          this.userFollows = res.data;
          this.userFollows.push(this.storeCurrentUser);
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
  min-height: 100vh;
}
section {
  margin-bottom: 100px;
}
.tweetContainer {
  margin: 30px 0;
}
.exploreTitle {
  margin: 55px 0 30px;
}
</style>