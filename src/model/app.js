
// Import class
import Dialogue from '../class/Dialogue'


export default {
  el: '#app',

  data() {
    return {
      title: 'Hsub Editor',
      renderer: {},
      styles: [],
      dialogues: [],
    }
  },

  mounted() {
    // Get libjass renderer
    this.$options.components.player.assRender.then((renderer) => {
      this.renderer = renderer
      this.styles = renderer.ass.styles
      this.dialogues = renderer.ass.dialogues
        .map(dialogue => new Dialogue(dialogue, renderer))
    })
  },
}
