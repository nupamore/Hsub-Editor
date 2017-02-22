
<template>

  <div class="container">
    <header>
      <h1>{{ title }}</h1>
      <player></player>
    </header>

    <section>
      <dialogues
        :dialogues="dialogues">
      </dialogues>
    </section>
  </div>

</template>



<style lang="less">
  @import '../../../node_modules/keen-ui/dist/keen-ui.min.css';

  body {
    height: 100%;
  }

  .container {
    margin: 0 auto;
    max-width: 900px;
  }
</style>



<script>
  import app from '../../model/app'

  export default app
</script>
