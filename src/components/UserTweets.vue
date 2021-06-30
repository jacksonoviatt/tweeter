<template>
  <div>
    <section class="otherProfiles">
      <div class="banner">
        <img
         
          :src="storeCurrentUser.bannerUrl"
          alt="imageBanner"
          class="bannerImg"
        />
        <div class="profileHeader">
          <img class="birdLogo" src="../assets/birdLogo.png" alt="bird logo" />
        </div>
        <!-- <img
          class="bannerImg"
          v-if="storeCurrentUser.bannerUrl === undefined"
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="banner not available"
        /> -->
        <img

          class="bannerImg imgNA"
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="banner not available"
        />
        <div class="userIdentity">
          <img class="profileImage" :src="storeCurrentUser.imageUrl" />
          <img
           
            class="profileImage imgNA"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
          <div>
            <h3 class="profileName">{{ storeCurrentUser.username }}</h3>
          </div>
        </div>
      </div>
      <div class="bio">
        <img src="../assets/profile.png" alt="profile icon" />
        <p>{{ storeCurrentUser.bio }}</p>
        <follow-someone
          :getUser="getUserTweets"
          :followId="storeCurrentUser.userId"
        ></follow-someone>
      </div>
      <section class="profileBody">
        <div
          class="tweetContainer"
          v-for="object in storeCurrentUserTweets"
          :key="object.string"
        >
          <!-- <div class="userTweetName"> -->
          <div class="spacing"></div>
          <edit-tweet
            :editTweetId="object.tweetId"
            :getTweetsFunction="getUserTweets"
          ></edit-tweet>

          <h4 class="usersname">@{{ storeCurrentUser.username }}</h4>
          <div class="line"></div>

          <!-- <h4>{{ object.username }}</h4> -->
          <created-at
            class="createdAt"
            :createdAt="object.createdAt"
          ></created-at>
          <p class="content">{{ object.content }}</p>
          <!-- </div> -->
          <img
            class="tweetImage"
            v-if="object.tweetImageUrl"
            :src="object.tweetImageUrl"
            :alt="object.content"
          />
          <comment-section :commentTweetId="object.tweetId"></comment-section>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import FollowSomeone from "./FollowSomeone.vue";
import CommentSection from "./CommentSection";
import EditTweet from "./EditTweet.vue";
import CreatedAt from "./CreatedAt.vue";

export default {
  components: { EditTweet, CommentSection, CreatedAt, FollowSomeone },
  name: "user-tweets",
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
    storeCurrentUserTweets: function () {
      return this.$store.state.currentUserTweets;
    },
  },
  mounted: function () {
    this.getUserTweets();
  },
  methods: {
    getUserTweets: function () {
      axios
        .request({
          method: "GET",
          url: `${process.env.VUE_APP_API_KEY}/api/tweets`,
          headers: {
            "Content-Type": "application/json",
            // "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.storeCurrentUser.userId,
          },
        })
        .then((res) => {
          console.log(res);
          let orderedUserTweets = res.data
            .sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            })
            .slice()
            .reverse();
          this.$store.commit("updateCurrentUserTweets", orderedUserTweets);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.profileBody {
  margin-top: 400px;
  margin-bottom: 100px;
  display: grid;
  place-items: center;
  gap: 20px;

}
.usersname {
  text-align: left;
  margin: 0px 20px;
}

@media screen and (min-width: 600px) {
.bio {
  margin-left: 100px;
}
}

.tweetContainer {
  .content {
    margin-left: 30px;
  }
}
</style>