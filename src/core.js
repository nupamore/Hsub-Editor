
import util from './lib/util'

import player from './vue/player.vue'

// import from other files
const { Vue, libjass } = window


const hs = new Vue({
  el: '#hs-app',

  components: {
    'hs-player': player,
  },

  data: {
    title: 'Hsub Editor',
    renderer: {},
    cues: [],
  },

  methods: {
    keyupText(cue) {
      cue._parts = libjass.parser.parse(cue._rawPartsString, 'dialogueParts')
    },

    changeText(oldCue) {
      const newCue = new libjass.Dialogue(new Map([
        ['Style', oldCue.style],
        ['Start', '0:00:0.00'],
        ['End', '0:01:10.00'],
        ['Text', oldCue._rawPartsString],
      ]), this.renderer.ass)

      const index = this.cues.findIndex(cue => cue.id === oldCue.id)
      newCue._id = oldCue.id
      this.cues[index] = newCue
      // re-render forced
      this.renderer._resize()
    },

    addCue() {
      const cue = new libjass.Dialogue(new Map([
        ['Style', 'Default'],
        ['Start', '0:00:0.00'],
        ['End', '0:01:10.00'],
        ['Text', 'new text'],
      ]), this.renderer.ass)
      cue._containsTransformTag = true

      this.cues.push(cue)
    },
  },

  mounted() {
    // get libjass cues
    player.assRender.then((r) => {
      this.renderer = r
      this.cues = r.ass.dialogues
      // re-render forced
      this.cues.forEach((cue) => { cue._containsTransformTag = true })
      // debug
      window.r = r
    })
  },
})

window.hs = hs
