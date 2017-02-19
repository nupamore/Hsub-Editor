
<template>

  <div class="player-wrapper">
    <video id="player" class="video-js vjs-default-skin vjs-big-play-centered"></video>
  </div>

</template>



<style lang="less" scoped>
  .player-wrapper {
    width: 100%;
  }
</style>



<script>
  import player from '../../model/player'

  export default player
</script>
