
import util from './lib/util'

// import from other files
const { Vue } = window


const app = new Vue({
  el: '#app',
  components: {
    'hs-player': require('./vue/player.vue'),
  },
  data: {
    title: util.xssFilter('hello world'),
  },
})
