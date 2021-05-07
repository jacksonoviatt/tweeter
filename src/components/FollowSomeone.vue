<template>
  <div>
    <section v-if="storeCurrentUser.userId !== followId"> 
      <div v-for="object in numberOfFollowers" :key="object.string">
         <button
          @click="unfollowFriend"
          v-if="storeCurrentUser.username === object.username"
          class="unfollowUser"
        >    Unfollow
        </button>
      </div> 
        

      <button class="followFriend" @click="followFriend">Follow</button>
    </section>
    <section class="followNumbers">
      <span>
        <h4>{{ numberOfFollows}}</h4>
        <h6>Follows</h6>
      </span>
     
      <span>
        <h4>{{ numberOfFollowers.length }}</h4>
        <h6>Followers</h6>
      </span>
      <!-- <div v-for="object in numberOfFollowers" :key="object.id">
        {{ object.username }}
      </div> -->
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "follow-someone",
  data() {
    return {
      doesUserFollow: false,
      getAllFollows: [],
      numberOfFollows: Number,
      numberOfFollowers: Number,
    
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
    // storeGetAllFollows() {
    //   return this.$store.state.getAllFollows;
    // },
  },
  props: {
    followId: Number,
    getTweetsFunction: Function,
  },
  mounted() {
    this.getUserFollows();
    this.getUserFollowers();
  },
  methods: {
    followFriend: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            followId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getUserFollows();
          this.getUserFollowers();
          // getTweetsFunction();
          // this.$emit('updateFollowStatus', true);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    unfollowFriend: function () {
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            followId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log("hello");
          this.getUserFollows();
          this.getUserFollowers();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserFollowers: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/followers",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.followId,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.numberOfFollowers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserFollows() {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/follows",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            userId: this.followId,
          },
        })
        .then((res) => {
          console.log(res.data.length);
          // userFollows = res.data;
          this.numberOfFollows = res.data.length;
    
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 40px;
}
button {
  width: 80px;
  height: 20px;
  position: absolute;
  top: 105px;
  left: 110px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
}
.unfollowUser {
  z-index: 2;
  color: #d9dfcd;
  background: #829376;
}
.followNumbers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  position: absolute;
  top: 175px;
  right: 40px;
}
</style>