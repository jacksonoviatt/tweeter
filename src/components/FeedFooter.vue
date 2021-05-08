<template>
    <div id="feedFooter">
        <img @click="openExploreFeed" src="../assets/explore.png" alt="Explore Page">
        <img @click="openFriendFeed" src="../assets/friendsList.png" alt="people you follow">
    </div>
</template>

<script>
    export default {
        name: "feed-footer",
        // props: {
        //     whichFeed: Boolean,
        // },
        methods: {
            openExploreFeed: function() {
                this.$emit('openExploreFeed', false);
            },
             openFriendFeed: function() {
                this.$emit('openFriendFeed', true);
            }
        },
    }
</script>

<style lang="scss" scoped>
 #feedFooter {
     position: fixed;
     bottom: 0;
     height: 60px;
     background: #A1AE98ee;
     width: 100%;
     display: grid;
     place-items: center;
     grid-template-columns: 1fr 1fr;
     img {
         height: 40px;
     }
 }
</style>