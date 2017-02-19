
// Import util functions
import { debounce } from 'lodash'
import { seconds2format } from '../lib/util'

// Import from other files
const { libjass } = window


export default {
  props: [
    'dialogues',
    'renderer',
  ],

  methods: {
    /**
     * Change dialogue from parsed ass data
     * @return {SideEffect}
     */
    parseDialogue: debounce(function parseDialogue(oldDialogue) {
      const newDialogue = new libjass.Dialogue(new Map([
        ['Style', oldDialogue.style],
        ['Start', seconds2format(oldDialogue._start)],
        ['End', seconds2format(oldDialogue._end)],
        ['Text', oldDialogue._rawPartsString],
      ]), this.renderer.ass)

      newDialogue._containsTransformTag = true
      newDialogue._id = oldDialogue.id

      const index = this.dialogues.findIndex(dialogue => dialogue.id === oldDialogue.id)
      this.dialogues[index] = newDialogue
      // re-render forced
      this.renderer._resize()
    }, 200),
  },
}
