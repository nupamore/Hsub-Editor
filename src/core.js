
// import util functions
import { debounce } from 'lodash'
import { seconds2format } from './lib/util'

// import vue components
import player from './vue/player.vue'

// import from other files
const { Vue, libjass } = window


/**
 * core vue instance
 * @type {Vue}
 */
const hs = new Vue({
  el: '#hs-app',

  components: {
    'hs-player': player,
  },

  data: {
    title: 'Hsub Editor',
    renderer: {},
    dialogues: [],
  },

  methods: {
    /**
     * [keyupText description]
     * @type {[type]}
     */
    keyupText: debounce((oldDialogue) => {
      const newDialogue = new libjass.Dialogue(new Map([
        ['Style', oldDialogue.style],
        ['Start', seconds2format(oldDialogue._start)],
        ['End', seconds2format(oldDialogue._end)],
        ['Text', oldDialogue._rawPartsString],
      ]), hs.renderer.ass)

      newDialogue._containsTransformTag = true
      newDialogue._id = oldDialogue.id

      const index = hs.dialogues.findIndex(dialogue => dialogue.id === oldDialogue.id)
      hs.dialogues[index] = newDialogue
      // re-render forced
      hs.renderer._resize()
    }, 200),

    changeText(oldDialogue) {
      this.keyupText(oldDialogue)
    },

    addDialogue() {
      const dialogue = new libjass.Dialogue(new Map([
        ['Style', 'Default'],
        ['Start', '0:00:0.00'],
        ['End', '0:01:10.00'],
        ['Text', 'new text'],
      ]), this.renderer.ass)

      dialogue._containsTransformTag = true
      this.dialogues.push(dialogue)
    },
  },

  mounted() {
    // get libjass dialogues
    player.assRender.then((r) => {
      this.renderer = r
      this.dialogues = r.ass.dialogues
      // re-render forced
      this.dialogues.forEach((dialogue) => { dialogue._containsTransformTag = true })
      // debug
      window.r = r
    })
  },
})

window.hs = hs
