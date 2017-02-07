
<template>

  <div class="hs-cue-list">
    <cue v-for="cue of cues" :text="cue.text"></cue>
  </div>

</template>
<script>

/**
 * list of cues
 */

import cue from './cue.vue'


export default {
  data() {
    return {
      cues: [{
        text: 'test',
      }, {
        text: 'test',
      }],
    }
  },

  components: {
    cue,
  },
}


</script>
