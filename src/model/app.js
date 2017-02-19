
// Import from other files
const { libjass } = window


export default {
  el: '#app',

  data: {
    title: 'Hsub Editor',
    renderer: {},
    styles: [],
    dialogues: [],
  },

  mounted() {
    // Get libjass renderer
    this.$options.components.player.assRender.then((renderer) => {
      this.renderer = renderer
      this.styles = renderer.ass.styles
      this.dialogues = renderer.ass.dialogues
      // Re-render forced
      this.dialogues.forEach((dialogue) => { dialogue._containsTransformTag = true })
    })
  },
}
