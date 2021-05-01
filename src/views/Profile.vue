<template>
    <div class="container">
        <h3>Welcome {{storeCurrentUser.username}}</h3>
        <p>{{storeCurrentUser.bio}}</p>
        <p>{{storeCurrentUser.birthdate}}</p>
        <p @click="editProfileClicked = !editProfileClicked">Edit Profile</p>
        <side-bar></side-bar>
        <edit-profile v-if="editProfileClicked === true"></edit-profile>
        <user-tweets></user-tweets>
        <create-tweet></create-tweet>
    </div>
</template>

<script>
import CreateTweet from '../components/CreateTweet.vue';
import EditProfile from '../components/EditProfile.vue';
import SideBar from "../components/SideBar.vue";
import UserTweets from '../components/UserTweets.vue';
export default {
  name: "Profile",
  data() {
    return {
      editProfileClicked: false,
    }
  },
  components: {
    SideBar,
    EditProfile,
    UserTweets,
    CreateTweet   
  },
  computed: {
 storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
}
</style>