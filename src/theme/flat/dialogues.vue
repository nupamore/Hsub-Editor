
<template>

  <div class="dialogue-list">
    <div class="dialogue" v-for="dialogue of dialogues">
      <input type="number" v-model.number="dialogue.start" min="0">
      <input type="number" v-model.number="dialogue.end" min="0">
      <textarea v-model="dialogue.text"></textarea>
    </div>
  </div>

</template>



<style lang="less" scoped>
  .dialogue-list {
    height: 400px;
    margin-top: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .dialogue {
    input {
      width: 50px;
      vertical-align: top;
    }
    textarea {
      width: 100%;
    }
  }
</style>



<script>
  import dialogues from '../../model/dialogues'

  export default dialogues
</script>
