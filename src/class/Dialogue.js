
// Import util functions
import { debounce } from 'lodash'
import { seconds2format } from '../lib/util'

// Import from other files
const { libjass } = window


/**
 * Change dialogue from parsed ass data
 * @return {SideEffect}
 */
const parseDialogue = debounce((that) => {
  const oldDialogue = that._dialogue
  const newDialogue = new libjass.Dialogue(new Map([
    ['Style', oldDialogue.style],
    ['Start', seconds2format(oldDialogue._start)],
    ['End', seconds2format(oldDialogue._end)],
    ['Text', that.text],
  ]), that._renderer._ass)

  newDialogue._id = oldDialogue.id
  const index = that._renderer._ass._dialogues
    .findIndex(dialogue => dialogue.id === oldDialogue.id)

  that._renderer._ass._dialogues[index] = newDialogue
  that._dialogue = newDialogue

  // Re-render force
  that._renderer._resize()
}, 500)


export default class Dialogue {
  constructor(dialogue, renderer) {
    this._renderer = renderer
    this._dialogue = dialogue
  }

  /**
   * Raw ass String
   */
  get text() {
    return this._dialogue._rawPartsString
  }
  set text(str) {
    this._dialogue._rawPartsString = str
    parseDialogue(this)
  }

  /**
   * Start time
   */
  get start() {
    return this._dialogue._start
  }
  set start(sec) {
    this._dialogue._start = sec
    parseDialogue(this)
  }

  /**
   * End time
   */
  get end() {
    return this._dialogue._end
  }
  set end(sec) {
    this._dialogue._end = sec
    parseDialogue(this)
  }
}
