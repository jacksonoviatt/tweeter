<template>
  <div>
    <form action="javascript:void(0)">
      <p>Email:</p>
      <input type="email" placeholder="email" id="signUpEmail" />
      <p>username:</p>
      <input
        type="text"
        placeholder="username"
        autocomplete=""
        id="signUpUsername"
      />
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
       <br />
       <p>Image</p>
     
       <input type="text" placeholder="New Profile Image" id="signUpImageUrl" />
      <br />
      <p>Banner:</p>
    
      <input type="text" placeholder="New Banner Image" id="signUpBannerUrl" />

      <br />
      <p>birthday</p>
      <input type="date" name="birthday" id="signUpBirthday" />
      <br />
      <input type="submit" name="submitNewUser" @click="newUserSignUp" />
    </form>
    <button @click="userList">User list</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
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
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            email: document.getElementById("signUpEmail").value,
            username: document.getElementById("signUpUsername").value,
            password: document.getElementById("signUpPassword").value,
            bio: document.getElementById("signUpBio").value,
            birthdate: document.getElementById("signUpBirthday").value,
            bannerUrl: document.getElementById("signUpBannerUrl").value,
            imageUrl: document.getElementById("signUpImageUrl").value,
            
          },
        })
        .then((res) => {
          console.log(res);
          cookies.set("currentUser", res.data);
          this.$store.commit("updateCurrentUser", res.data);
          this.$router.push("/");

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
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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