<template>
  <div>
    <h3 class="username" @click="getOtherUser">{{ otherUserName }}</h3>
    <follow-someone :followId="otherUserId"></follow-someone>
    <!-- @updateFollowStatus="handleFollowStatus" -->
    <section class="otherProfiles" v-if="openOtherProfile === true">
      <div class="banner">
        <p>This Image is Not Available</p>
        <img
          :src="otherUserData.bannerUrl"
          alt="imageBanner"
          class="bannerImg"
        />
        <div class="userIdentity">
          <img class="profileImage" :src="otherUserData.imageUrl" />
          <img v-if="otherUserData.imageUrl === null" class="imageNotAvailable" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
          <div>
            <h3 class="profileName">{{ otherUserData.username }}</h3>
          </div>
        </div>
        <div class="goBack" @click="getAllTweetsOnGoBack">
        <img src="../assets/backArrow.svg" alt="back arrow" >
      </div>
      </div>
      <section class="profileBody">
        <user-follows :userId="otherUserId"></user-follows>

        <p>{{ otherUserData.bio }}</p>

        <friends-tweets :openOtherProfile="openOtherProfile"></friends-tweets>
      </section>
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
.profileBody {
  margin-top: 300px;
}
.banner {
  position: fixed;
  display: grid;
  place-items: center;
  background: #c6c3bc;
  height: 200px;
  width: 100%;
  .bannerImg {
    object-fit: cover;
    height: 200px;
    width: 100%;
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
      top: 130px;
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
  top: 105px;
  left: 20px;
}
.imageNotAvailable {
  z-index: 15;
  height: 70px;
  width: 70px;
  border: #b6c0af 3px solid;
  position: absolute;
  top: 105px;
  left: 20px;
}
.goBack {
  width: 40px;
  height: 40px;
  background: #CBD2C6;
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: absolute;
  top: 220px;
  left: 20px;
  box-shadow: #97a58d 2px 2px 0px, #97a58d -2px 2px 0px,
        #97a58d 2px -2px 0px, #97a58d -2px -2px 0px;
     
  img {
    width: 25px;
  }
}
</style>