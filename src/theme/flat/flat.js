
// Import vue components
import app from './app.vue'

app.components = {
  player: require('./player.vue'),
  dialogues: require('./dialogues.vue'),
  toolbar: require('./toolbar.vue'),
}

// Import from other files
const { Vue } = window


// Debug
window.hsub = new Vue(app)
