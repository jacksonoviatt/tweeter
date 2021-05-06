<template>
  <div>
    <!-- the form will patch only the fields that the user inputs -->
    <form action="javascript:void(0)" autocomplete="off">
      <input
        type="text"
        placeholder="New Username"
        autocomplete="null"
        id="updateUsername"
      />
      <br />
      <input type="text" placeholder="New Bio" id="updateBio" />
      <br />
      <input type="text" placeholder="New Profile Image" id="updateImageUrl" />
      <br />
      <input type="text" placeholder="New Banner Image" id="updateBannerUrl" />

      <br />
      <input type="text" placeholder="New Birthday" id="updateBirthdate" />
      <br />
      <input type="text" placeholder="New Email" id="updateEmail" />
      <br />
      <input type="password" placeholder="New Password" id="updatePassword" />
      <br />
      <input type="submit" value="Save My Changes" @click="updateUserInfo" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import DeleteAccount from './DeleteAccount.vue';
export default {
  name: "edit-profile",
  // components: { DeleteAccount },

  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
    storeDeleteAccountOptions() {
      return this.$store.state.deleteAccountOptions;
    },
  },
  methods: {
    updateUserInfo: function () {
      axios
        .request({
          method: "PATCH",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            username: document.getElementById("updateUsername").value,
            bio: document.getElementById("updateBio").value,
            password: document.getElementById("updatePassword").value,
            birthdate: document.getElementById("updateBirthdate").value,
            email: document.getElementById("updateEmail").value,
            bannerUrl: document.getElementById("updateBannerUrl").value,
            imageUrl: document.getElementById("updateImageUrl").value,
            loginToken: this.storeCurrentUser.loginToken,
          },
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