
import util from './lib/util'
import player from './vue/player.vue'
import cueList from './vue/cue-list.vue'

// import from other files
const { Vue } = window


const app = new Vue({
  el: '#app',

  components: {
    'hs-player': player,
    'hs-cue-list': cueList,
  },

  data: {
    title: 'Hsub Editor',
    cues: [],
  },

  mounted() {
    // get libjass cues
    player.assRender.then((r) => {
      this.cues = r.ass.dialogues.map(dialogue => dialogue.parts
        .filter(part => part.constructor.name === 'Text')
        .reduce((p, n) => p + n.value, ''))

      window.r = r.ass
    })
  },
})
