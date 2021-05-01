<template>
  <div>
    THE FEED
    <create-tweet></create-tweet>
    <explore-page></explore-page>
    <side-bar></side-bar>
  </div>
</template>

<script>
import CreateTweet from "../components/CreateTweet.vue";
import ExplorePage from '../components/ExplorePage.vue';
import SideBar from "../components/SideBar.vue";
export default {
  name: "Feed",
  components: {
    SideBar,
    CreateTweet,
    ExplorePage
  },
  
};
</script>

<style lang="scss" scoped>
</style>