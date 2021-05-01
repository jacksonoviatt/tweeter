<template>
  <div>
    <h1>LOGIN</h1>
    <form action="javascript:void(0)">
      <p>Email:</p>
      <input type="email" placeholder="email" id="loginEmail" autocomplete="" />
      <p>password</p>
      <input
        type="password"
        name="password"
        placeholder="password"
        autocomplete=""
        id="loginPassword"
      />
      <br />
      <input type="submit" name="submitNewUser" @click="attemptLogin" />
      <h3>{{ loginStatus }}</h3>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "login-form",
  data() {
    return {
      loginStatus: "",
    };
  },
  methods: {
    attemptLogin: function () {
      axios
        .request({
          url: "https://tweeterest.ml/api/login",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value,
          },
        })

        .then((res) => {
          console.log(res.data);
          this.loginStatus = "you have logged in";
          cookies.set("currentUser", res.data);
          this.$router.push("/feed");
          location.reload();
        })
        // if the axios request fails, it will tell the user there was an error
        .catch((err) => {
          console.log(err);
          this.loginStatus = "your login attempt failed";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>