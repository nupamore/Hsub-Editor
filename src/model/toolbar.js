
// Import from other files
const { libjass } = window


export default {
  props: [
    'dialogues',
    'renderer',
  ],

  methods: {
    /**
     * Create new dialogue instance
     * @return {SideEffect}
     */
    addDialogue() {
      const dialogue = new libjass.Dialogue(new Map([
        ['Style', 'Default'],
        ['Start', '0:00:0.00'],
        ['End', '0:01:10.00'],
        ['Text', 'new text'],
      ]), this.renderer.ass)

      dialogue._containsTransformTag = true
      this.dialogues.push(dialogue)
      this.setFocus(dialogue)
    },

    /**
     * Set focus to new dialogue input
     * @return {SideEffect}
     */
    setFocus() {
    },
  },
}
