<template>
  <div>
    <section class="otherProfiles">
      <div class="banner">
        <img
          v-if="storeCurrentUser.bannerUrl"
          :src="storeCurrentUser.bannerUrl"
          alt="imageBanner"
          class="bannerImg"
        />
        <img
          class="bannerImg"
          v-if="storeCurrentUser.bannerUrl === null"
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="banner not available"
        />
        <div class="userIdentity">
          <img class="profileImage" :src="storeCurrentUser.imageUrl" />
          <img
            v-if="storeCurrentUser.imageUrl === null"
            class="imageNotAvailable"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
          <div>
            <h3 class="profileName">{{ storeCurrentUser.username }}</h3>
          </div>
        </div>
        <follow-someone
          :getUser="getUserTweets"
          :followId="storeCurrentUser.userId"
        ></follow-someone>
      </div>
      <section class="profileBody">

        <p>{{ storeCurrentUser.bio }}</p>

        <div v-for="object in storeCurrentUserTweets" :key="object.string">
        <edit-tweet :editTweetId="object.tweetId"></edit-tweet>
      <h4>{{ object.username }}</h4>
      <created-at></created-at>
      <p>{{ object.content }}</p>
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    <comment-section :commentTweetId="object.tweetId"></comment-section>
    </div>
      </section>
    </section>





    
    
  </div>
</template>

<script>
import axios from 'axios';
import FollowSomeone from './FollowSomeone.vue'
import CommentSection from "./CommentSection"
import EditTweet from './EditTweet.vue';
import CreatedAt from './CreatedAt.vue';
export default {
  components: { EditTweet, CommentSection, CreatedAt, FollowSomeone},
  name: "user-tweets",
  computed: {
      storeCurrentUser() {
          return this.$store.state.currentUser;
      },
     storeCurrentUserTweets: function() {
         return this.$store.state.currentUserTweets;
     },
  },
  mounted: function() {
      this.getUserTweets();
      
  },
  methods: {
    getUserTweets: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
         params: {
              userId: this.storeCurrentUser.userId,
          }
        })
        .then((res) => {
          console.log(res);
          let orderedUserTweets = res.data.sort(function(a, b){return new Date(a.createdAt) - new Date(b.createdAt)}).slice().reverse();
          this.$store.commit("updateCurrentUserTweets", orderedUserTweets)
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
  margin-top: 250px;
}
.banner {
  z-index: -1;
  position: fixed;
  top: 0;
  display: grid;
  place-items: center;
  background: #ecefe6;
  height: 250px;
  width: 100%;
  .bannerImg {
    object-fit: cover;
    height: 150px;
    width: 100%;
    position: absolute;
    top: 0;
  }
  p {
    position: absolute;
    z-index: -1;
  }
  .userIdentity {
    z-index: 6;
    // margin: -105px 0 0 -190px;
    // display: grid;
    // align-items: center;
    // gap: 10px;
    // grid-template-columns: 1fr 1fr;
    h3 {
      
      position: absolute;
      top: 60px;
      left: 110px;
      font-size: 32px;
      color: #ffffff;
      text-shadow: #97a58d 2px 2px 0px, #97a58d -2px 2px 0px,
        #97a58d 2px -2px 0px, #97a58d -2px -2px 0px;
      padding-bottom: 10px;
      margin-bottom: -20px;
    }
  }
}

.profileImage {
  height: 70px;
  width: 70px;
  border: #b6c0af 3px solid;
  position: absolute;
  top: 55px;
  left: 20px;
}
.imageNotAvailable {
  z-index: 15;
  height: 70px;
  width: 70px;
  border: #b6c0af 3px solid;
  position: absolute;
  top: 55px;
  left: 20px;
}

.goBack {
  width: 20px;
  height: 20px;
  background: #cbd2c699;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: absolute;
  top: 170px;
  left: 40px;
  box-shadow: #97a58d 2px 2px 0px, #97a58d -2px 2px 0px, #97a58d 2px -2px 0px,
    #97a58d -2px -2px 0px;

  img {
    width: 15px;
  }
}
</style>