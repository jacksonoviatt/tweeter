<template>
  <div>
    <h3 class="username" @click="getOtherUser">{{ otherUserName }}</h3>
    <follow-someone :followId="otherUserId"></follow-someone>
    
    <section class="otherProfiles" v-if="openOtherProfile === true">
      <user-follows :userId="otherUserId"></user-follows>
      <div class="green"></div>
      <button @click="openOtherProfile = false">GO BACK</button>
      <h3 id="username">{{ otherUserData.username }}</h3>
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
  components: { FriendsTweets, FollowSomeone, UserFollows },
  name: "friend-profile",
  data() {
    return {
      openOtherProfile: false,
      otherUserData: [{}],
    };
  },
  props: {
    otherUserId: Number,
    otherUserName: String,
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
#username {
  font-size: 40px;
}
.otherProfiles {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  position: absolute;
  top: 0;
  background: #294c60;
  color: #adb6c4;
}
.green {
  width: 100px;
  height: 100px;
}
.username {
  text-align: left;
  margin: 10px 15px;
}
</style>