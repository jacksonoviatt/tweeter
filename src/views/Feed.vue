<template>
  <div>
    <button @click="goBackToLogin" v-if="storeCurrentUser === undefined">You need to log in</button>
    <section v-if="storeCurrentUser !== undefined">
      <create-tweet></create-tweet>
      <explore-page></explore-page>
      <side-bar></side-bar>
    </section>
  </div>
</template>

<script>
import CreateTweet from "../components/CreateTweet.vue";
import ExplorePage from "../components/ExplorePage.vue";
import SideBar from "../components/SideBar.vue";
export default {
  name: "Feed",
  components: {
    SideBar,
    CreateTweet,
    ExplorePage,
  },
 mounted () {
    if(this.storeCurrentUser === null) {
      this.$router.push("/welcome");
    } 
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser 
    }
  },
  methods: {
    goBackToLogin: function() {
       this.$router.push("/welcome");
    }
  },
  
};
</script>

<style lang="scss" scoped>
</style>