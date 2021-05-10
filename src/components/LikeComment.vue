<template>
  <div>
    <div v-for="object in thisCommentsLikes" :key="object.id">
      <img
      class="unlikeComment"
        @click="unlikeComment"
        v-if="object.userId === storeCurrentUser.userId"
        src="../assets/liked.png"
        alt="liked"
      />
    </div>
    <img
      class="likeComment"
      @click="likeComment"
      src="../assets/like.png"
      alt="like"
    />
    <div class="showWhoLiked" @click="showWhoLiked = !showWhoLiked">
      <p>{{ thisCommentsLikes.length }}</p>
    </div>
    <section v-if="showWhoLiked === true">
      <div v-for="object in thisCommentsLikes" :key="object.id">
        <p>{{ object.username }}</p>
        <p>{{ object.userId }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "like-Comment",
  data() {
    return {
      liked: false,
      thisCommentsLikes: [],
      showWhoLiked: false,
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    commentId: Number,
  },
  mounted() {
    this.getCommentLikes();
    //   console.log(this.thisCommentsLikes.userId);
    //   for(this.i=0; this.i<this.thisCommentsLikes; this.i++) {
    //       if(this.thisCommentsLikes[this.i].userId === this.storeCurrentUser.userId) {
    //     //   this.liked = true;
    //     console.log(this.thisCommentsLikes[this.i].userId);
    //   }
    //   }
  },
  methods: {
    likeComment: function () {
      this.liked = true;
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/comment-likes",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getCommentLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCommentLikes: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/comment-likes",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            commentId: this.commentId,
          },
        })
        .then((res) => {
          this.thisCommentsLikes = res.data;
          
        //   this.thisCommentsLikes = resultData.filter(
        //     (resultData) => resultData.CommentId === this.CommentId
        //   );
        //   console.log(this.thisCommentsLikes);
          // this.userLiked = this.thisCommentsLikes.userId.filter(thisCommentsLikes => thisCommentsLikes.userId === this.storeCurrentUser.userId);
        //   for (this.i = 0; this.i < this.thisCommentsLikes; this.i++) {
            // if (this.thisCommentsLikes[this.i].userId ===) {
            // console.log(this.thisCommentsLikes[this.i].userId);
            // }
        //   }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unlikeComment: function () {
      this.liked = false;
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/comment-likes",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            commentId: this.commentId,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getCommentLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // filterComments: function(){

    // }
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 10px;
  position: absolute;
  right: 25vw;
  // right: 28vw;
  // margin-top: -18%;


}
.unlikeComment {
    z-index: 2;
}

.showWhoLiked {
  // margin-right: -40vw;
  position: absolute;
 
  right: 31vw;
  margin-top: -5px;
}
@media screen and (min-width: 600px) {
  img {
    right: 28vw;
  }
}
@media screen and (min-width: 1000px) {
   img {
    right: 38.5vw;
  }
  .showWhoLiked {
    right: 40vw;
  }
}
</style>