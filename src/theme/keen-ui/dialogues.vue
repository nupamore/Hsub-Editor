
<template>

  <div class="dialogue-list">
    <div class="dialogue" v-for="dialogue of dialogues">
      <input type="number" v-model.number="dialogue.start" min="0">
      <input type="number" v-model.number="dialogue.end" min="0">

      <ui-textbox
        v-model="dialogue.text"
        :multi-line="true"
      ></ui-textbox>
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
  }
</style>



<script>
  import { UiTextbox } from 'keen-ui'
  import dialogues from '../../model/dialogues'

  dialogues.components = {
    UiTextbox,
  }

  export default dialogues
</script>
