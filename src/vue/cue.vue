
<template>

  <div class="hs-cue">
    <input type="text" v-model="text">
  </div>

</template>
<script>

/**
 * cue
 */

export default {
  props: ['text'],

  data() {
    return {
      text: this.text,
    }
  },
}

</script>
