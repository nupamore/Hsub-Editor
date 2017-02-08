
<template>

  <div class="hs-cue-list">
    <cue v-for="cue of cues" :text="cue.parts[cue.parts.length-1]"></cue>
  </div>

</template>
<script>

/**
 * list of cues
 */

import cue from './cue.vue'


export default {
  props: ['cues'],

  data() {
    return {
      cues: this.cues,
    }
  },

  components: {
    cue,
  },
}


</script>
