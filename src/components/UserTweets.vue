<template>
  <div>
    <div v-for="object in storeCurrentUserTweets" :key="object.string">
        <edit-tweet :editTweetId="object.tweetId"></edit-tweet>
      <h4>{{ object.username }}</h4>
      <created-at></created-at>
      <p>{{ object.content }}</p>
      <img v-if="object.tweetImageUrl" :src="object.tweetImageUrl" :alt="object.content">
    <comment-section :commentTweetId="object.tweetId"></comment-section>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import CommentSection from "./CommentSection"
import EditTweet from './EditTweet.vue';
import CreatedAt from './CreatedAt.vue';
export default {
  components: { EditTweet, CommentSection, CreatedAt},
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

</style>