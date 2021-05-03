<template>
  <div>
    <!-- loop through the array of tweet information -->
    <div v-for="object in storeTweets" :key="object.string">
      <edit-tweet v-if="storeCurrentUser.userId === object.userId" :editTweetId="object.tweetId"></edit-tweet>
      <friend-profile :otherUserId="object.userId" :otherUserName="object.username"></friend-profile>
      <!-- <h4 @click="openFriendsProfile(object.userId)">{{ object.username }}</h4> -->
      <p>{{ object.content }}</p>
      
      <!-- <friend-profile v-if="openProfile === true"></friend-profile> -->
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    </div>

    
  </div>
</template>

<script>
import axios from "axios";
import EditTweet from './EditTweet.vue';
import FriendProfile from './FriendProfile.vue';
export default {
  components: { EditTweet, FriendProfile },
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
          let orderedTweets = res.data.sort(function(a, b){return new Date(a.createdAt) - new Date(b.createdAt)}).slice().reverse();
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


</style>