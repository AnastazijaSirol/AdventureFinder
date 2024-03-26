<template>
  <div id="app">
    <h1 class="naslov">AdventureFinder</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #D9D9D9;
  margin-top: 60px;
}

.naslov {
  color: #D9D9D9;
}

</style>
