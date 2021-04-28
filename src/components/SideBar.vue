<template>
    <div>
        <h3 @click="logOut">LOGOUT</h3>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
    export default {
        name: "side-bar",
        methods: {
            logOut: function() {
                cookies.remove("token");
                cookies.remove("currentUser");          
                this.$router.push("/");
                location.reload();
                 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>