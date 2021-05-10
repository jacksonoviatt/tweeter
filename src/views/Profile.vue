<template>
    <div class="container">
        
        <side-bar></side-bar>
        <user-tweets></user-tweets>
        <edit-profile></edit-profile>

    </div>
</template>

<script>
// import CreateTweet from '../components/CreateTweet.vue';
import EditProfile from '../components/EditProfile.vue';
import SideBar from "../components/SideBar.vue";
import UserTweets from '../components/UserTweets.vue';
export default {
  name: "Profile",

  components: {
    SideBar,
    EditProfile,
    UserTweets,
 
    // CreateTweet   
  },
  computed: {
 storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },

mounted () { 
    if(this.storeCurrentUser === null) {
      this.$router.push("/welcome");
    } 
},
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
</style>