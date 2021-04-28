<template>
    <div>
        <!-- <h3>Welcome {{storeCurrentUser.username}}</h3> -->
        <p>{{storeCurrentUser.bio}}</p>
        <p>{{storeCurrentUser.birthdate}}</p>
        <side-bar></side-bar>

    </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
export default {
  name: "Profile",
  components: {
    SideBar,
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>