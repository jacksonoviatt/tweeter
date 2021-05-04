<template>
  <div>
    <section v-if="!isMenuOpen" id="fafaBars" @click="isMenuOpen = !isMenuOpen">
      <div></div>
      <div></div>
      <div></div>
    </section>
    <section id="sideBarContainer" v-else>
      <section id="xBars" @click="isMenuOpen = !isMenuOpen">
        <div id="barOne"></div>
        <div id="barTwo"></div>
      </section>
     <div id="nav">
      <router-link to="/welcome">Welcome</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/">Feed</router-link> |
      <!-- <router-link to="/welcome">Welcome</router-link> -->
    </div>
      <h3 @click="logOut">LOGOUT</h3>
      <a src="#" @click="mutateDeleteOptions">Delete My Account</a>
     <delete-account v-if="storeDeleteAccountOptions === true"></delete-account>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";
import DeleteAccount from './DeleteAccount.vue';
export default {
  components: { DeleteAccount },
  name: "side-bar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
   computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
    storeDeleteAccountOptions() {
      return this.$store.state.deleteAccountOptions;
    }
  },
  methods: {
    mutateDeleteOptions() {
      console.log(this.storeDeleteAccountOptions);
      this.$store.commit("updateDeleteAccountOptions", true);
    },
     
    logOut: function () {
      cookies.remove("currentUser");
      this.$router.push("/welcome");
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
#fafaBars {
  position: absolute;
  top: 20px;
  left: 20px;
  div {
    
    width: 40px;
    height: 5px;
    background: #8B745F;
    margin: 10px 0;
  }
}
#sideBarContainer {
  width: 70vw;
  height: 100vh;
  background-color: #C6C3BC;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  color: #282E24;
}
#xBars {
  width: 50px;
  height: 50px;
  //   margin-bottom: -20px;
  display: grid;
  place-items: center;
  position: relative;
  margin: -100px 0 0 45vw;
  div {
    width: 50px;
    height: 5px;
    background: #829376 ;
    position: absolute;
    // top: 40px;
    // left: 50vw;

    // box-shadow: #829376 0px 0px 3px;
  }
  #barOne {
    transform: rotate(135deg);
  }
  #barTwo {
    transform: rotate(45deg);

    // margin-bottom: -20px;
  }
 

  
}
</style>