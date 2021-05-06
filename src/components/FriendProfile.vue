<template>
  <div>
    <h3 class="username" @click="getOtherUser">{{ otherUserName }}</h3>
    <follow-someone :followId="otherUserId"></follow-someone>
    <!-- @updateFollowStatus="handleFollowStatus" -->
    <section class="otherProfiles" v-if="openOtherProfile === true">
      <div class="banner">
        <p>This Image is Not Available</p>
        <img :src="otherUserData.bannerUrl" alt="imageBanner" />
      </div>
      <user-follows :userId="otherUserId"></user-follows>
      <button @click="getAllTweetsOnGoBack">GO BACK</button>
      <div>
        <h3 id="username">{{ otherUserData.username }}</h3>
        <img class="profileImg" :src="otherUserData.imageUrl" />
      </div>
      <p>{{ otherUserData.bio }}</p>

      <friends-tweets :openOtherProfile="openOtherProfile"></friends-tweets>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import FriendsTweets from "./FriendsTweets.vue";
import FollowSomeone from "./FollowSomeone.vue";
import UserFollows from "./UserFollows.vue";

export default {
  components: {
    FriendsTweets,
    FollowSomeone,
    UserFollows,
  },
  name: "friend-profile",
  data() {
    return {
      openOtherProfile: false,
      otherUserData: [{}],
      updateFollows: false,
    };
  },
  props: {
    otherUserId: Number,
    otherUserName: String,
  },
  // mounted () {
  //   if(this.updateFollows === true){
  //     // this.getFollowInformation();
  //     this.$forceUpdate();
  //     console.log("forced update");
  //   }
  // },
  methods: {
    // handleFollowStatus: function (data) {
    //   this.updateFollows = data;
    //   this.$emit('updateFollowStatusAgain', this.updateFollows);
    // },
    getOtherUser: function () {
      window.scrollTo(0, 0);
      this.$store.commit("updateFriendsId", this.otherUserId);
      this.openOtherProfile = !this.openOtherProfile;
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.otherUserId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.otherUserData = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllTweetsOnGoBack: function () {
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
      this.openOtherProfile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#username {
  font-size: 40px;
}
.otherProfiles {
  width: 100%;
  height: 1000%;

  position: absolute;
  top: 0;
  left: 0;

  background: #ecefe6;
  // color: #adb6c4;
  z-index: 8;
}
.username {
  text-align: left;
  margin: 10px 15px;
}
.banner {
  display: grid;
  place-items: center;
  background: #c6c3bc;
  height: 150px;
  width: 100%;
  img {
    object-fit: cover;
    height: 150px;
    width: 100%;
  }
  p {
    position: absolute;
    z-index: -1;
  }
  
}
</style>