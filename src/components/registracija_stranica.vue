<template>
  <div id="app">
    <button class="pocetna-button" @click="usmjeri_pocetna">Početna</button>
    <h1 class="naslov">Registracija</h1>
    <div class="kvadrat">
      <form class="forma">
        <input type="text" placeholder="Korisničko ime" v-model="korisnickoIme" />
        <input type="email" placeholder="E-pošta" v-model="email" />
        <input type="password" placeholder="Lozinka" v-model="lozinka" />
        <input type="password" placeholder="Potvrdi lozinku" v-model="potvrdaLozinke" />
        <button @click="usmjeri_aktivnosti">Registracija</button>
      </form>
    </div>
    <p class="poruka">Već imate korisnički račun? <b class="preporuka" @click="usmjeri_prijava">Prijavi se.</b></p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    usmjeri_pocetna() {
      this.$router.push('/');
    },
    usmjeri_prijava() {
      this.$router.push('prijava_stranica');
    }
  }
};
</script>

<style lang="scss">

html, body {
  background-color: #1B1C1B;
}

.pocetna-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.kvadrat {
  background-color: #D9D9D9;
  padding: 20px;
  border-radius: 10px;
  margin: 0 auto;
  max-width: 400px;
}

.forma input[type="text"],
.forma input[type="email"],
.forma input[type="password"],
.forma button {
  margin-bottom: 10px;
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 5px;
  border: none;
}

.forma button {
  background-color: #1B1C1B;
  color: #D9D9D9;
  cursor: pointer;
}

.forma button:hover {
  background-color: #1d2935;
}

.poruka {
  color: #D9D9D9;
  margin-top: 10px;
}

.preporuka {
  color: #D9D9D9;
  cursor: pointer;
}

</style>
