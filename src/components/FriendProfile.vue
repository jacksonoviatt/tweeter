<template>
  <div>
    <h3 class="username" @click="getOtherUser">@{{ otherUserName }}</h3>

    <section class="otherProfiles" v-if="openOtherProfile === true">
      <div class="banner">
        <img
          v-if="otherUserData.bannerUrl"
          :src="otherUserData.bannerUrl"
          alt="imageBanner"
          class="bannerImg"
        />
        <img
          class="bannerImg"
          v-if="otherUserData.bannerUrl === null"
          src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="banner not available"
        />
        <div class="userIdentity">
          <img class="profileImage" :src="otherUserData.imageUrl" />
          <img
            v-if="otherUserData.imageUrl === null"
            class="imageNotAvailable"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          />
          <div>
            <h3 class="profileName">{{ otherUserData.username }}</h3>
          </div>
        </div>
        <div class="goBack" @click="getAllTweetsOnGoBack">
          <img src="../assets/backArrow.svg" alt="back arrow" />
        </div>
        <follow-someone
          :getUser="getOtherUser"
          :followId="otherUserId"
        ></follow-someone>
      </div>
      <section class="profileBody">

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
// import EditProfile from "./EditProfile.vue";
// import UserFollows from "./UserFollows.vue";

export default {
  components: {
    FriendsTweets,
    FollowSomeone,
    // EditProfile,
    // UserFollows,
  },
  name: "friend-profile",
  data() {
    return {
      openOtherProfile: false,
      otherUserData: [{}],
      updateFollows: false,
      openEditProfile: false,
    };
  },
  props: {
    otherUserId: Number,
    otherUserName: String,
    getTweetsFunction: Function,

  },
 
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
          // console.log(res.data);
          this.otherUserData = res.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllTweetsOnGoBack: function () {
      this.getTweetsFunction();
      this.openOtherProfile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  max-width: 70px;
  text-align: left;
  margin: 10px 15px;
  font-size: 18px;
}
.profileBody {
  margin-top: 250px;
}
.banner {
  position: fixed;
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