<template>
  <div v-if="storeCurrentUser.userId !== followId">
      
    <div v-for="object in getAllFollows" :key="object.id">

      <button @click="unfollowFriend" v-if="storeCurrentUser.username === object.username" class="unfollowUser">Unfollow</button>
    </div>
    
    <button class="followFriend" @click="followFriend">Follow</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "follow-someone",
  data() {
    return {
      doesUserFollow: false,
      getAllFollows: [],
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    followId: Number,
  },
  mounted() {
    this.getUserFollows();
  },
  methods: {
  
    followFriend: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            followId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getUserFollows();
          location.reload();
          // this.$emit('updateFollowStatus', true);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    unfollowFriend: function () {
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            followId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log("hello");
          this.getUserFollows();
          location.reload();
          // this.$emit('updateFollowStatus', true);
        })
        .catch((err) => {
          console.log(err);
        });
        
    },
    getUserFollows() {
      
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/followers",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getAllFollows = res.data;
          
          //   console.log(this.thisTweetsLikes.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 40px;
}
button {
  width: 100px;
  position: absolute;
  margin-top: -30px;
}
.unfollowUser {
  z-index: 2;
}
</style>