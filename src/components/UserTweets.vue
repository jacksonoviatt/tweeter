<template>
  <div></div>
</template>

<script>
export default {
  name: "user-tweets",
  computed: {
      storeCurrentUser() {
          return this.$store.state.currentUser;
      }
  },
  methods: {
    // getUserTweets: function () {
    //   axios
    //     .request({
    //       method: "GET",
    //       url: "https://tweeterest.ml/api/tweets",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
    //       },
    //       data: {
    //           userId: this.storeCurrentUser.userId,
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res);
          
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>