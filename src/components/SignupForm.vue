<template>
  <div>
    <form action="javascript:void(0)">
      <p>Email:</p>
      <input type="email" placeholder="email" id="signUpEmail" />
      <p>username:</p>
      <input type="text" placeholder="username" autocomplete="" id="signUpUsername" />
      <p>password</p>
      <input
        type="password"
        name="password"
        placeholder="password"
        id="signUpPassword"
        autocomplete=""
      />
      <br />
      <p>bio</p>
      <input type="text" name="bio" placeholder="bio" id="signUpBio" />
      <p>birthday</p>
      <input type="date" name="birthday" id="signUpBirthday" />
      <br />
      <input type="submit" name="submitNewUser" @click="newUserSignUp" />
    </form>
    <button @click="userList"></button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "signup-form",
  methods: {
    newUserSignUp: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "xRlx789MAteFEj8KWmCnfcr2KIRY0ZvfoXENuAX6vrnqV",
          },
          data: {
            email: document.getElementById("signUpEmail").value,
            username: document.getElementById("signUpUsername").value,
            password: document.getElementById("signUpPassword").value,
            bio: document.getElementById("signUpBio").value,
            birthdate: document.getElementById("signUpBirthday").value,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    userList: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "X-Api-Key": "xRlx789MAteFEj8KWmCnfcr2KIRY0ZvfoXENuAX6vrnqV",
          },
          //   data: {
          //     email: document.getElementById("signUpEmail").value,
          //     username: document.getElementById("signUpUsername").value,
          //     password: document.getElementById("signUpPassword").value,
          //     bio: document.getElementById("signUpBio").value,
          //     birthdate: document.getElementById("signUpBirthday").value,
          //   },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>