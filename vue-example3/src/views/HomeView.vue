<template>
  <div class="home">
    <div class="videoContainer">
      <video autoplay muted loop class="myVideo">
        <source src="../assets/home.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
    <div class="content">
      <h1>WELCOME TO IUDC</h1>
      <h4><i>Styles from all around the world!</i></h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style lang="scss" scoped>
.videoContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}
.videoContainer > video {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
@media screen and (max-aspect-ratio: 1920/1080) {
  .videoContainer > video {
    height: 100%;
  }
}
@media screen and (min-aspect-ratio: 1920/1080) {
  .videoContainer > video {
    width: 100%;
  }
}

.content {
  position: absolute;
  top: 40vh;
  width: 100vw;
  text-align: center;
  h1 {
    font-weight: bolder;
  }
}
</style>
