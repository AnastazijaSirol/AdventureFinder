<template>

  <div class="pocetna">
    <title>AdventureFinder</title>
    <h1 class="naslov">AdventureFinder</h1>
    <h2 class="poruka"><b>Pronađite destinacije u kojima možete doživjeti avanture po vlastitom izboru i podijelite svoja iskustva!</b></h2>
    <div class="autentifikacija">
      <a href="pocetna_stranica.vue" class="prijava">Prijava</a>
      <a href="pocetna_stranica.vue" class="registracija">Registracija</a>
    </div>
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

.autentifikacija  {
  display: flex;
  justify-content: space-between;
}

.prijava,
.registracija {
  padding: 30px 45px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  background-color: #1B1C1B;
  color: #D9D9D9;
  font-size: 1.5em;
  width: 150px; 
  height: 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.prijava:hover,
.registracija:hover {
  background-color: #333;
}

</style>
