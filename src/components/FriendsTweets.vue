<template>
  <div class="friendsTweets">
    <div
      class="friendsTweetContainer"
      v-for="object in friendsTweets"
      :key="object.string"
    >
      <div class="line"></div>
      <created-at class="createdAt" :createdAt="object.createdAt"></created-at>
      <p class="content">{{ object.content }}</p>
      <img
        class="tweetImage"
        v-if="object.tweetImageUrl"
        :src="object.tweetImageUrl"
        :alt="object.content"
      />
      <comment-section :commentTweetId="object.tweetId"></comment-section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CommentSection from "./CommentSection.vue";
import CreatedAt from "./CreatedAt.vue";

export default {
  components: { CommentSection, CreatedAt },
  name: "friends-tweets",

  data() {
    return {
      friendsTweets: [],
    };
  },
  computed: {
    storeFriendsId() {
      return this.$store.state.friendsId;
    },
  },
  props: {
    //   friendsId: Number,
    openOtherProfile: Boolean,
  },
  mounted() {
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
          },
        })
        .then((res) => {
          // console.log(res);
          this.friendsTweets = res.data
            .sort(function (a, b) {
              return new Date(a.createdAt) - new Date(b.createdAt);
            })
            .slice()
            .reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.friendsTweets {
  display: grid;
  place-items: center;
  margin-top: 30px;
  gap: 60px;
}
.friendsTweetContainer {
  margin: 10px;
  // border: cornflowerblue 2px solid;
  height: 100%;
  width: 250px;
  background: #f6f7f3;
  box-shadow: #88997c 2px 2px 2px;
  color: #282e24;
  display: grid;
  padding: 0px 0 20px;
  // place-items: center;
  .tweetImage {
    width: 100px;
  }
  .createdAt {
    text-align: left;
    margin: 10px;
    font-size: 10px;
    display: grid;
    grid-template-columns: 1fr 8fr;
  }
  .dateButton {
    width: 10px;
  }
  .line {
    width: 70%;
    height: 1px;
    background: #282e24;
    margin: 20px 10px -10px;
  }
  .content {
    text-align: left;
    margin-left: 10px;
    width: 70%;
    padding-bottom: 20px;
    color: red;
  }
}
</style>