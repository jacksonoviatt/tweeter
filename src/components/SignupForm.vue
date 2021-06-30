<template>
  <div id="signUpForm">
    <section class="formContainer">
    <form action="javascript:void(0)">
      <h4>Please enter the following information to make a new account</h4>
      <p>Email:</p>
      <input type="email" placeholder="email" id="signUpEmail" required />
      <p>username:</p>
      <input
      required
        type="text"
        placeholder="username"
        autocomplete=""
        id="signUpUsername"
      />
      <p>password</p>
      <input required
        type="password"
        name="password"
        placeholder="password"
        id="signUpPassword"
        autocomplete=""
      />
      <br />
      <p>bio</p>
      <input type="text" name="bio" placeholder="bio" id="signUpBio" required />
       <br />
       <p>Image</p>
     
       <input type="text" placeholder="New Profile Image" id="signUpImageUrl" />
      <br />
      <p>Banner:</p>
    
      <input type="text" placeholder="New Banner Image" id="signUpBannerUrl" />

      <br />
      <p>birthday</p>
      <input type="date" name="birthday" id="signUpBirthday" required />
      <br />
      <input class="signUpButton" type="submit" name="submitNewUser" @click="newUserSignUp" />
    </form>
 </section> 
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
          url: `${process.env.VUE_APP_API_KEY}/api/users`,
          headers: {
            "Content-Type": "application/json",
            // "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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
          url: `${process.env.VUE_APP_API_KEY}/api/users`,
          headers: {
            // "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
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
.formContainer {
  color: #282E24;
  width: 72vw;
  background: #D0D7C1;
  border: #A1AE98 3px ridge;
  padding: 20px 0;
  p {
    margin: 5px;
  }
  input {
    padding: 5px;
    
  }
}
.signUpButton {
  margin-top: 15px;
  border: #88997c 3px ridge;
  border-radius: 10px;
  width: 100px;
}
@media screen and (min-width: 600px) {
  .formContainer {
    width: 60vw;
  }
}

@media screen and (min-width: 1100px) {
   .formContainer {
    width: 40vw;
  }
}
</style>