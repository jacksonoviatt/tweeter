<template>
  <div>
    <section>
      <h3>Follows: {{ numberOfFollows.length }}</h3>
      <div v-for="object in numberOfFollows" :key="object.id">
        {{ object.username }}
      </div>
      <h3>Followers: {{ numberOfFollowers.length }}</h3>
      <div v-for="object in numberOfFollowers" :key="object.id">
        {{ object.username }}
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "user-follows",
  data() {
    return {
      numberOfFollows: [],
      numberOfFollowers: []
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    userId: Number,
  },
  mounted() {
    this.getFollows();
    this.getFollowers();
  },
  methods: {
    getFollowers: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/followers",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.numberOfFollowers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFollows() {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.userId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.numberOfFollows = res.data;
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