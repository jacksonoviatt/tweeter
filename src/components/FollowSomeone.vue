<template>
  <div>
    <section v-if="storeCurrentUser.userId !== followId">
      <button @click="followFriend">follow</button>
      <button @click="unfollowFriend">unfollow</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "follow-someone",
  data() {
    return {
      doesUserFollow: false,
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