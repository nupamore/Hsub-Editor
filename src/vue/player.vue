
<template>

  <div class="player-wrapper">
    <video id="player" class="video-js vjs-default-skin vjs-big-play-centered"></video>
  </div>

</template>



<script>

const videojs = window.videojs

export default {
  // constructor
  mounted() {
    const videoType = 'youtube'
    const videoSrc = 'https://www.youtube.com/watch?v=HswIHVN5D4o'
    const trackSrc = 'subs/sample.ass'

    this.player = initVideojs({ videoType, videoSrc, trackSrc })
  },
  // data
  data() {
    return {
      player: {},
    }
  },
}


/**
 * render videojs
 * @param  {String} videoType
 * @param  {String} videoSrc
 * @param  {String} trackSrc
 * @return {Void}
 */
function initVideojs({ videoType, videoSrc, trackSrc }) {
  return videojs('player', {
    controls: true,
    nativeControlsForTouch: false,
    width: 640,
    height: 360,
    fluid: true,
    plugins: {
      ass: {
        src: trackSrc,
        delay: -0.1,
      },
    },
    techOrder: [videoType],
    sources: [{
      type: `video/${videoType}`,
      src: videoSrc,
    }],
  })
}

</script>
