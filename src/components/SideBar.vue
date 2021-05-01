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
        <div id="barThree"></div>
      </section>
     <div id="nav">
      <router-link to="/">Welcome</router-link> |
      <router-link to="/profile">Profile</router-link> |
      <router-link to="/feed">Feed</router-link> |
      <!-- <router-link to="/welcome">Welcome</router-link> -->
    </div>
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
  methods: {
    logOut: function () {
      cookies.remove("currentUser");
      this.$router.push("/");
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
    background: #703d57;
    margin: 10px 0;
  }
}
#sideBarContainer {
  width: 70vw;
  height: 100vh;
  background-color: #adb6c4;
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
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
    background: #ffefd3;
    position: absolute;
    // top: 40px;
    // left: 50vw;

    box-shadow: #001b2e 0px 0px 3px;
  }
  #barOne {
    transform: rotate(135deg);
  }
  #barTwo {
    transform: rotate(45deg);

    // margin-bottom: -20px;
  }
  #barThree {
    transform: rotate(135deg);

    z-index: 10;
    box-shadow: none;
  }
}
</style>