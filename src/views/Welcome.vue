<template>
  <div id="welcome">
    <img src="../assets/tweeterLogo.png" alt="tweeter logo" />
    <login-form v-if="signMeUp === false"></login-form>
    <p v-if="signMeUp === false">
      Don't have an account?
      <a href="#" @click="signMeUp = true">Sign up now</a>
    </p>
    <signup-form v-if="signMeUp === true"></signup-form>
    <!-- <div class="spacing"></div> -->
    <p v-if="signMeUp === true">
      Already have an account?
      <a href="#" @click="signMeUp = false">Login here</a>
    </p>
    <div class="spacing"></div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
export default {
  name: "welcome",
  data() {
    return {
      signMeUp: false,
    };
  },
  components: {
    SignupForm,
    LoginForm,
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 330px) {
  img {
    margin-top: 20px;
  }
}
#welcome {
  background: linear-gradient(#a1ae98, #5a6751);
  // background: magenta;
  height: 100%;
  min-height: 110vh;
  width: 100%;
  color: #e8eee3;
  display: grid;
  place-items: center;
}
img {
  width: 70%;
}


@media screen and (min-width: 600px) {
  img {
    width: 50%;
  }
}

@media screen and (min-width: 1000px) {
  img {
    width: 25%;
    max-width: 375px;
  }
}
</style>