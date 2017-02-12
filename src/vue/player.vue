
<template>

  <div class="hs-player-wrapper">
    <video id="hs-player" class="video-js vjs-default-skin vjs-big-play-centered"></video>
  </div>

</template>
<script>

/**
 * videojs player
 */

import assRender from '../lib/videojs-ass'


const videojs = window.videojs

export default {
  assRender,

  mounted() {
    const videoType = 'youtube'
    const videoSrc = 'https://www.youtube.com/watch?v=6BXKh4f6Vhw'
    const trackSrc = 'subs/sample2.ass'

    this.player = initVideojs({ videoType, videoSrc, trackSrc })
  },

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
  return videojs('hs-player', {
    controls: true,
    nativeControlsForTouch: false,
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
