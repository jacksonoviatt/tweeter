<template>
  <div>
    <section id="fafaBars" @click="openSideMenu">
      <div></div>
      <div></div>
      <div></div>
    </section>
    <section id="sideBarContainer">
      <section id="xBars" @click="closeSideMenu">
        <div id="barOne"></div>
        <div id="barTwo"></div>
      </section>
     <nav>
      <router-link to="/welcome">Welcome</router-link> 
      <router-link to="/profile">Profile</router-link> 
      <router-link to="/">Feed</router-link> 
      <!-- <router-link to="/welcome">Welcome</router-link> -->
    </nav>
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
      openSideMenu: function() {
        this.isMenuOpen = true;
        document.getElementById('sideBarContainer').style.left = "0";
      },
      closeSideMenu: function() {
        document.getElementById('sideBarContainer').style.left = "-70vw";
      },
   
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
  left: 30px;
  div {
    
    width: 30px;
    height: 3px;
    background: #A1AE98;
    margin: 10px 0;
  }
}
#sideBarContainer {
  transition: ease-in 0.5s all;
  width: 70vw;
  height: 100vh;
  background-color: #D9DFCD;
  position: fixed;
  top: 0;
  left: -70vw;
  display: grid;
  place-items: center;
  color: #282E24;
  z-index: 3;
}
#xBars {
  width: 40px;
  height: 40px;
  //   margin-bottom: -20px;
  display: grid;
  place-items: center;
  position: absolute;
  top: 20px;
  left: 53vw;
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
nav {
  display: grid;
  a {
    font-size: 18px;
    color: #282E24;
    
  }
}

</style>