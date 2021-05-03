<template>
  <div>
    <h1 @click="getOtherUser">@{{ otherUserName }}</h1>
    <section class="otherProfiles" v-if="openOtherProfile === true">
      <button @click="openOtherProfile = false">GO BACK</button>
      <h3>{{ otherUserData.username }}</h3>
      <p>{{ otherUserData.bio }}</p>
      <friends-tweets :openOtherProfile="openOtherProfile"></friends-tweets>
    {{otherUserData.userId}}
    </section>
  </div>
</template>

<script>
import axios from "axios";
import FriendsTweets from './FriendsTweets.vue';
export default {
  components: { FriendsTweets },
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
//    mounted: function() {
//       this.$store.commit("updateFriendsId", this.otherUserId);
      
//   },
  methods: {
    
    getOtherUser: function () {
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
.otherProfiles {
    width: 100%;
    height: 200vw;
    position: absolute;
    top: 0;
    background: #294C60;
    color: #F4F5F6;
}
</style>