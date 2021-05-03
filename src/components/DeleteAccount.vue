<template>
  <section>
    <div id="deleteContainer">
      <!-- if the user successfully inputs the password, the accountDeleted var will change to true and display the success message -->
      <h3 v-if="accountDeleted">Your account was successfully deleted.</h3>
      <div>
        <p>Are you sure you want to delete your account?</p>
        <div id="deleteButtons">
          <button @click="inputPassword = !inputPassword">Delete My Account</button>
          <button @click="mutateDeleteAccountOptions">Nevermind</button>
          <router-link to="/">Welcome</router-link>
        </div>
        <form action="javascript:void(0)" v-if="inputPassword">
          <input type="password" id="confirmPassword" />
          <input type="submit" @click="deleteAccount" />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "delete-account",
  data() {
    return {
      inputPassword: false,
      accountDeleted: false,
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
    redirectAfterDelete() {
      cookies.remove("currentUser");
      this.$router.push("/welcome");
      location.reload();
    },
    mutateDeleteAccountOptions() {
      console.log(this.storeDeleteAccountOptions);
      
      this.$store.commit("updateDeleteAccountOptions", false);
    },
    deleteAccount() {
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "xRlx789MAteFEj8KWmCnfcr2KIRY0ZvfoXENuAX6vrnqV",
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            password: document.getElementById("confirmPassword").value,
          },
        })
        .then((res) => {
          console.log(res);
          this.accountDeleted = !this.accountDeleted;
          setTimeout(function () {
            cookies.remove("currentUser");
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 100vh;
  background: #294c60cc;
  position: absolute;
  top: 0;
  display: grid;
  place-items: center;
}
#deleteContainer {
  width: 70vw;
  height: 300px;
  background-color: #adb6c4;
  display: grid;
  place-items: center;
}
</style>