
import util from './lib/util'


const app = new Vue({
  el: '#app',
  data: {
    title: util.xssFilter('hello world'),
  },
})
