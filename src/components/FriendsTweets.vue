<template>
  <div>
    <div v-for="object in friendsTweets" :key="object.string">

      <h4>{{ object.username }}</h4>
      <p>{{ object.content }}</p>
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    </div> 
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "friends-tweets",

  data() {
      return {
          friendsTweets: [],

      }
  },
  computed: {
      storeFriendsId() {
          return this.$store.state.friendsId; 
      }
  },
  props: {
    //   friendsId: Number,
      openOtherProfile: Boolean,
  },
    mounted () {
        this.getFriendsTweets();
   
    },
  methods: {
    getFriendsTweets: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
         params: {
              userId: this.storeFriendsId,
          }
        })
        .then((res) => {
          console.log(res);
        this.friendsTweets = res.data.sort(function(a, b){return new Date(a.createdAt) - new Date(b.createdAt)}).slice().reverse();
        
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