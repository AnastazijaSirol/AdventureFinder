<template>

  <div class="pocetna">
    <title>AdventureFinder</title>
    <h1 class="naslov">AdventureFinder</h1>
    <h2 class="poruka"><b>Pronađite destinacije u kojima možete doživjeti avanture po vlastitom izboru i podijelite svoja iskustva!</b></h2>
  </div>

</template>

<script>

export default {
  name: 'PocetnaStranica'
}

</script>

<style scoped lang="scss">

.pocetna {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('pozadina.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.naslov {
  font-size:  5em;
  margin-top: 120px;
  color:  #1B1C1B;
}

.poruka {
  color:  #1B1C1B;
}

</style>