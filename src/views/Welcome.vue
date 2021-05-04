<template>
  <div id="welcome">
    <h3>login to tweeter</h3>
    <login-form v-if="signMeUp === false"></login-form>
    <p v-if="signMeUp === false">Don't have an account? <a href="#" @click="signMeUp = true">Sign up now</a>
        </p>
    <signup-form v-if="signMeUp === true"></signup-form>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import SignupForm from "../components/SignupForm.vue";
export default {
  name: "welcome",
  data() {
      return {
          signMeUp: false,
      }
  },
  components: {
    SignupForm,
    LoginForm,
  },
  
};
</script>

<style lang="scss" scoped>
#welcome {
  background: linear-gradient(#001B2E, #294C60);
  // background: magenta;
  height: 100vh;
  width: 100%;
  color: #ADB6C4;
  display: grid;
  place-items: center;
}
</style>