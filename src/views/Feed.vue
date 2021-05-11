<template>
  <div id="feed">
    <header class="profileHeader">
      <img class="birdLogo" src="../assets/birdLogo.png" alt="">
    </header>
    <button @click="goBackToLogin" v-if="storeCurrentUser === undefined">You need to log in</button>
    <section v-if="storeCurrentUser !== undefined">
      <create-tweet></create-tweet>
      <explore-page></explore-page>
      <side-bar></side-bar>
      <img class="treeImg" src="../assets/tree.svg" alt="tree">
      <img class="flyingBirds" src="../assets/flyingBirds.svg" alt="birds flying">
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
 beforeMount () {
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
* {
  background: #E0E8D9;
}
@media screen and (max-width: 1100px) {

.treeImg {
  display: none;
}
.flyingBirds {
  display: none;
}
}
.treeImg {
  background: #ffffff00;
  // height: 60vh;
  width: 40vw;
  max-height: 60vh;
  position: fixed;
  bottom: 56px;
  right: -30px;
}
.flyingBirds {
  width: 100px;
  position: fixed;
  bottom: 72vh;
  right: 20vw;
  transform: scaleX(-1);
}
// @media screen and (min-width: 1100px) { 
//   header {
//     height: 60px;
//   }
// }
</style>