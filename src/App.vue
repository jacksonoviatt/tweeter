<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #F4F5F6;
}
 
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #001b2e;
  input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {

  transition: background-color 5000s ease-in-out 0s;
  
}
}

.tweetContainer {
  
  margin: 20px 10px;

  height: 100%;
  width: 250px;
  background: #f6f7f3;
  box-shadow: #88997c 0px 0px 2px, #88997c 0px 0px 4px, #88997c 2px 2px 2px,;
  color: #282e24;
  .tweetImage {
    width: 60%;
    margin-bottom: 25px;
    border: ridge 3px #88997c;
  }
  .createdAt {
    text-align: left;
    margin: 10px;
    font-size: 10px;
    display: grid;
    grid-template-columns: 1fr 8fr;
  }
  // .dateButton {
  //   width: 10px;
  // }
  .line {
    width: 70%;
    height: 1px;
    background: #282e24;
    margin: 10px 10px;
  }
  .content {
    text-align: left;
    margin-left: 10px;
    width: 70%;
    padding-bottom: 20px;
  }
}
.spacing {
  height: 15px;
}
.imgNA {
  z-index: -1;
}
.banner {
  z-index: 5;
  position: fixed;
  top: 0;
  display: grid;
  place-items: center;
  background: #ecefe6;
  height: 200px;
  width: 100%;
  .bannerImg {
    object-fit: cover;
    height: 200px;
    width: 100%;
    position: absolute;
    top: 0;
  }
  p {
    position: absolute;
    z-index: -1;
  }
  .userIdentity {
    z-index: 6;
    // margin: -105px 0 0 -190px;
    // display: grid;
    // align-items: center;
    // gap: 10px;
    // grid-template-columns: 1fr 1fr;
    h3 {
      position: absolute;
      top: 95px;
      left: 110px;
      font-size: 32px;
      color: #ffffff;
      text-shadow: #97a58d 2px 2px 0px, #97a58d -2px 2px 0px,
        #97a58d 2px -2px 0px, #97a58d -2px -2px 0px;
      padding-bottom: 10px;
      margin-bottom: -20px;
    }
  }
}

.profileImage {
  height: 70px;
  width: 70px;
  border: #b6c0af 3px solid;
  position: absolute;
  top: 100px;
  left: 20px;
  object-fit: cover;
}
.imageNotAvailable {
  z-index: 15;
  height: 70px;
  width: 70px;
  border: #b6c0af 3px solid;
  position: absolute;
  top: 100px;
  left: 20px;
}

.profileHeader {
  background: #d9dfcdee;
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 6;
  box-shadow: #97a58d 0px 1px 4px;
  .birdLogo {
    height: 40px;
    margin: 10px;
    position: absolute;
    right: 30px;
  }
}
.bio {
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  // background: #d9dfcdcc;
  // width: 200px;
  position: absolute;
  top: 210px;
  height: 50px;
  p {
    z-index: 3;
    width: 140px;
    margin-right: 20px;
    text-align: left;
  }
  img {
    width: 35px;

  }
}
.goBack {
  position: absolute;
  top: 20px;
  left: 40px;
  width: 20px;
  height: 20px;
  background: #cbd2c6;
  border-radius: 50%;
  display: grid;
  place-items: center;
  box-shadow: #97a58d 2px 2px 0px, #97a58d -2px 2px 0px, #97a58d 2px -2px 0px,
    #97a58d -2px -2px 0px;
 img {
   width: 15px;
 } 
}
</style>
