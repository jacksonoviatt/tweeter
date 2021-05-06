<template>
  <div>
    <img
      @click="editCommentClicked = !editCommentClicked"
      src="https://www.flaticon.com/svg/vstatic/svg/1159/1159876.svg?token=exp=1619905929~hmac=877dd4d104f6474015cf5d003e8eb352"
      alt="edit comment"
    />
    <form
      v-if="editCommentClicked === true"
      action="javascript:void(0)"
      autocomplete="off"
    >
      <input
        type="text"
        placeholder="edit your tweet"
        autocomplete="null"
        id="editComment"
      />
      <br />
      <input type="submit" value="Save My Changes" @click="postEditedComment" />
    </form>

    <button v-if="editCommentClicked === true" @click="deleteTheComment">
      Delete Comment
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-comment",
  data() {
    return {
      editCommentClicked: false,
    };
  },
  computed: {
    storeCurrentUser() {
      return this.$store.state.currentUser;
    },
  },
  props: {
    editCommentId: Number,
    getTheComments: Function,
  },
  methods: {
    postEditedComment: function () {
      this.patchComment();
      this.editCommentClicked = !this.editCommentClicked;
    },
    deleteTheComment: function () {
      this.deleteComment();
      this.editCommentClicked = !this.editCommentClicked;
    },
    patchComment: function () {
      axios
        .request({
          method: "PATCH",
          url: "https://tweeterest.ml/api/comments",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            content: document.getElementById("editComment").value,
            loginToken: this.storeCurrentUser.loginToken,
            commentId: this.editCommentId,
          },
        })
        .then((res) => {
          console.log(res);
          this.getTheComments();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteComment: function () {
      axios
        .request({
          method: "DELETE",
          url: "https://tweeterest.ml/api/comments",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": `${process.env.VUE_APP_API_KEY}`,
          },
          data: {
            loginToken: this.storeCurrentUser.loginToken,
            commentId: this.editCommentId,
          },
        })
        .then((res) => {
          console.log(res);
          this.getTheComments();
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
  width: 15px;
}
</style>