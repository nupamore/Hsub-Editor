
<template>

  <div class="hs-cue">
    {{ text }}
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
