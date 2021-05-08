<template>
  <div>
    <!-- the form will patch only the fields that the user inputs -->
    <button class="openEditor" @click="seeEditProfile = true" >
      Edit Profile
    </button>
    <section class="editor" v-if="seeEditProfile === true">
        <div class="goBack" @click="seeEditProfile = false">
          <img src="../assets/backArrow.svg" alt="back arrow" />
        </div>
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
        <input
          type="text"
          placeholder="New Profile Image"
          id="updateImageUrl"
        />
        <br />
        <input
          type="text"
          placeholder="New Banner Image"
          id="updateBannerUrl"
        />

        <br />
        <input type="text" placeholder="New Birthday" id="updateBirthdate" />
        <br />
        <input type="text" placeholder="New Email" id="updateEmail" />
        <br />
        <input type="password" placeholder="New Password" id="updatePassword" />
        <br />
        <input type="submit" value="Save My Changes" @click="updateUserInfo" />
      </form>
      <delete-account></delete-account>
    </section>

  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import DeleteAccount from './DeleteAccount.vue';
// import DeleteAccount from './DeleteAccount.vue';
export default {
  components: { DeleteAccount },
  name: "edit-profile",
  // components: { DeleteAccount },
  data() {
    return {
     seeEditProfile: false,
    };
  },
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
          this.$store.commit("updateCurrentUser", res.data);
          cookies.set("currentUser", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.openEditor {
  width: 80px;
  height: 20px;
  position: fixed;
  top: 140px;
  left: 110px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  z-index: 5;
}
.editor {
  background: #829376;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
  display: grid;
  place-items: center;
}
</style>