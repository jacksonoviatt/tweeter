<template>
  <div>
    <section id="fafaBars" @click="openSideMenu" v-if="isMenuOpen === false">
      <div></div>
      <div></div>
      <div></div>
    </section>
    <section id="sideBarContainer">
      <section id="xBars" @click="closeSideMenu">
        <div id="barOne"></div>
        <div id="barTwo"></div>
      </section>
      <img
        id="sideBarLogo"
        src="../assets/tweeterLogo.png"
        alt="tweeter logo"
      />
      <nav>
        <p>Hello {{ storeCurrentUser.username }}</p>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/">Feed</router-link>
        <!-- <router-link to="/welcome">Welcome</router-link> -->
      </nav>
      <h3 @click="logOut">LOGOUT</h3>
    </section>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {
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
    // storeDeleteAccountOptions() {
    //   return this.$store.state.deleteAccountOptions;
    // },
  },

  methods: {
    openSideMenu: function () {
      this.isMenuOpen = true;
      document.getElementById("sideBarContainer").style.left = "0";
    },
    closeSideMenu: function () {
      document.getElementById("sideBarContainer").style.left = "-70vw";
      this.isMenuOpen = false;
    },

    // mutateDeleteOptions() {
    //   console.log(this.storeDeleteAccountOptions);
    //   this.$store.commit("updateDeleteAccountOptions", true);
    // },

    logOut: function () {
      cookies.remove("currentUser");
      this.$store.commit("updateCurrentUser", [{}]);
      location.reload();
    //   this.$router.push("/welcome");
    },
  },
};
</script>

<style lang="scss" scoped>
#fafaBars {
  position: fixed;
  top: 5px;
  left: 40px;
  z-index: 6;
  div {
    text-shadow: #ffffff 2px 2px 0px, #ffffff -2px 2px 0px, #ffffff 2px -2px 0px,
      #ffffff -2px -2px 0px;
    width: 30px;
    height: 3px;
    background: #a1ae98;
    margin: 10px 0;
  }
}
#sideBarContainer {
  transition: ease-in 0.5s all;
  width: 70vw;
  height: 100vh;
  background-color: #d9dfcd;
  position: fixed;
  top: 0;
  left: -70vw;
  display: grid;
  place-items: center;
  color: #282e24;
  z-index: 7;
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
    background: #829376;
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
#sideBarLogo {
  width: 60%;
  margin-top: -70px;
}
nav {
  display: grid;
  margin-top: -100px;
  p {
    margin-bottom: 10px;
    font-size: 22px;
  }
  a {
    margin: 10px;
    font-size: 18px;
    color: #282e24;
  }
}
@media screen and (min-width: 600px) {
  #sideBarLogo {
    width: 40%;
  }
  #sideBarContainer {
    width: 50vw;
  }
  #fafaBars {
    position: absolute;
  
  }
  #xBars {
    left: 40vw;
  }

}
@media screen and (min-width: 1100px) {
 #sideBarContainer {
   padding: 40px 0;
    left: 0;
    position: fixed;
    width: 28vw;
    z-index: 1;
  }
  #xBars {
    display: none;
  }
  nav {
    margin-top: -250px;
  }
}
</style>