<template>
  <div>
    <!-- the form will patch only the fields that the user inputs -->
    <button class="openEditor" @click="seeEditProfile = true">
      Edit Profile
    </button>
    <section class="editor" v-if="seeEditProfile === true">
      <div class="goBack" @click="seeEditProfile = false">
        <img src="../assets/backArrow.svg" alt="back arrow" />
      </div>

      <form action="javascript:void(0)" autocomplete="off">
        <h3>Edit Profile</h3>

        Update Username:
        <input
          type="text"
          placeholder="New Username"
          autocomplete="null"
          id="updateUsername"
        />
        Update Bio:
        <input type="text" placeholder="New Bio" id="updateBio" />
        Update Profile Image
        <input
          type="text"
          placeholder="New Profile Image"
          id="updateImageUrl"
        />
        Update Banner Image:
        <input
          type="text"
          placeholder="New Banner Image"
          id="updateBannerUrl"
        />

        Update Birthday:
        <input type="date" placeholder="New Birthday" id="updateBirthdate" />
        Update Email Address
        <input type="email" placeholder="New Email" id="updateEmail" />
        Update Password:
        <input type="password" placeholder="New Password" id="updatePassword" />
        <input
          class="saveMyChanges"
          type="submit"
          value="Save My Changes"
          @click="updateUserInfo"
        />
      </form>
      <delete-account></delete-account>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import DeleteAccount from "./DeleteAccount.vue";
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
          res.data.loginToken = this.storeCurrentUser.loginToken;
          this.$store.commit("updateCurrentUser", res.data);
          cookies.set("currentUser", res.data);

          this.seeEditProfile = false;
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
  left: 120px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  z-index: 5;
}
.editor {
  padding: 20px 0;
  background: #829376;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  form {
    display: grid;
    place-items: center;
    background: #d9dfcd;
    width: 250px;
    padding: 20px;
  }
  input {
    margin: 5px;
  }
}
.saveMyChanges {
  width: 180px;
  height: 30px;
  margin-top: 30px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 20px;
}
@media screen and (min-width: 1100px) {
  .openEditor {
    top: 140px;
    left: 40vw;
  }
}
</style>