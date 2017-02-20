
<template>

  <div class="container">
    <header>
      <h1>{{ title }}</h1>
      <player></player>
    </header>

    <section>
      <toolbar
        :dialogues="dialogues"
        :renderer="renderer">
      </toolbar>
      <hr>
      <dialogues
        :dialogues="dialogues">
      </dialogues>
    </section>
  </div>

</template>



<style lang="less" scoped>
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

  app.components = {
    player: require('./player.vue'),
    dialogues: require('./dialogues.vue'),
    toolbar: require('./toolbar.vue'),
  }

  export default app
</script>
