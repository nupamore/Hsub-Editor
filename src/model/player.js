
import assRender from '../lib/videojs-ass'

// Import from other files
const { videojs } = window


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
 * Render videojs
 * @param  {String} videoType
 * @param  {String} videoSrc
 * @param  {String} trackSrc
 * @return {Void}
 */
function initVideojs({ videoType, videoSrc, trackSrc }) {
  return videojs('player', {
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
