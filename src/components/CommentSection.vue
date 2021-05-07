<template>
  <div>
    <div @click="viewComments" class="comments">
      <img
        src="https://www.flaticon.com/svg/vstatic/svg/2462/2462719.svg?token=exp=1620082665~hmac=5b881cf16d9bb9369b3bd07b771ceaa8"
        alt="comments"
      />
      <p class="numberofcomments">{{ tweetComments.length }}</p>
    </div>

    <section v-if="isCommentsOpen === true">
      
      <div v-for="object in tweetComments" :key="object.id">
        <p>{{ object.username }}</p>
        <p>{{ object.content }}</p>
        <edit-comment v-if="storeCurrentUser.userId === object.userId" :editCommentId="object.commentId" :getTheComments="getComments"></edit-comment>
        <like-comment :commentId="object.commentId"></like-comment>
      </div>
      <form action="javascript:void(0)" autocomplete="off">
        <input
          type="text"
          placeholder="Make a comment"
          autocomplete="null"
          id="makeAComment"
        />
        <br />
        <input type="submit" value="Save My Changes" @click="postComment" />
      </form>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import EditComment from "./EditComment.vue";
import LikeComment from './LikeComment.vue';
export default {
  components: { EditComment, LikeComment },
  name: "comment-section",
  data() {
    return {
      isCommentsOpen: false,
      tweetComments: [],
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  mounted() {
    this.getComments();
  },
  props: {
    commentTweetId: Number,
  },
  methods: {
    viewComments: function () {
      if (this.isCommentsOpen === false) {
        this.isCommentsOpen = !this.isCommentsOpen;
      } else {
        this.isCommentsOpen = !this.isCommentsOpen;
      }
    },
    postComment: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/comments",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            content: document.getElementById("makeAComment").value,
            loginToken: this.storeCurrentUser.loginToken,
            tweetId: this.commentTweetId,
          },
        })
        .then((res) => {
          console.log(res.data + "comment succesfully posted");
        })
        .catch((err) => {
          console.log(err);
        });
        this.getComments();
    },

    getComments: function () {
      axios
        .request({
          method: "GET",
          url: "https://tweeterest.ml/api/comments",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          params: {
            tweetId: this.commentTweetId,
          },
        })
        .then((res) => {
          this.tweetComments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
 },
};
</script>

<style lang="scss" scoped>
.comments {
  margin-left: 200px;
  margin-bottom: -15px;
  padding-bottom: 10px;
   img {
    width: 20px;
    z-index: 5;
  }
  .numberofcomments {
    margin-top: -23px;
    font-size: 10px;
  }
}
</style>