<template>
  <div>
    <img
      @click="editCommentClicked = !editCommentClicked"
      src="https://www.flaticon.com/svg/vstatic/svg/1159/1159876.svg?token=exp=1619905929~hmac=877dd4d104f6474015cf5d003e8eb352"
      alt="edit comment"
      class="editComment"
    />
    <img
      class="deleteComment"
      v-if="editCommentClicked === true"
      @click="deleteTheComment"
      src="https://image.flaticon.com/icons/png/128/109/109602.png"
      alt="delete comment"
    />
    <!-- <button v-if="editCommentClicked === true" @click="deleteTheComment">
      Delete Comment
    </button> -->
    <form
      v-if="editCommentClicked === true"
      action="javascript:void(0)"
      autocomplete="off"
    >
      <input
        type="text"
        placeholder="edit your comment"
        autocomplete="null"
        :id="editCommentId"
        class="editCommentInput"
      />
      <br />
      <input 
      class="saveEdit"
      type="submit" value="Save My Changes" @click="postEditedComment" />
    </form>
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
            content: document.getElementById(this.editCommentId).value,
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
.deleteComment {
  width: 10px;
  position: absolute;
  left: 24vw;
  margin-top: -28px;
}
button {
  margin-top: 3px;
  padding-top: 2px;
  width: 80px;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  input {
    opacity: 0;
  }
}
.editComment {
  margin-left: 160px;
}
.saveEdit {
  // margin-top: 3px;
  // padding-top: 2px;
  width: 180px;
  height: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #829376;
  background: #d9dfcd;
  border-radius: 10px;
  // position: absolute;
  margin-bottom: 20px;
}
@media screen and (min-width: 600px) {
  .editComment {
    margin-left: 210px;
    margin-top: -10px;
  }
  .deleteComment {
    left: 27vw;
  }
}
@media screen and (min-width: 1000px) {
  .editComment {
    margin-left: 260px;
    margin-top: -10px;
  }
  .editCommentInput {
    padding: 5px;
    font-family: Arial, Helvetica, sans-serif;
    max-width: 70%;
  }

}
</style>