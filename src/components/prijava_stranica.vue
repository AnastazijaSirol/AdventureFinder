<template>
  <div id="app">
    <button class="pocetna-button" @click="usmjeri_pocetna">Početna</button>
    <h1 class="naslov">Prijava</h1>
    <div class="kvadrat">
      <form class="forma">
        <input type="text" placeholder="E-pošta" v-model="eposta" />
        <input type="password" placeholder="Lozinka" v-model="lozinka" />
        <button @click.prevent="prijava">Prijava</button>
      </form>
    </div>
    <p class="poruka">Nemate korisnički račun? <b class="preporuka" @click="usmjeri_registracija">Registrirajte se.</b></p>
    <router-view/>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '@/firebase';

export default {
  name: 'App',
  data() {
    return {
      eposta: '',
      lozinka: ''
    };
  },
  methods: {
    usmjeri_pocetna() {
      this.$router.push('/');
    },
async prijava() {
  try {
    await signInWithEmailAndPassword(auth, this.eposta, this.lozinka)
    .then(() => {
      this.$router.push('aktivnosti_stranica');
    })
  } catch (error) {
    console.error('Greška prilikom prijave:', error.message);
  }
},

    usmjeri_registracija() {
      this.$router.push('registracija_stranica');
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
</style>
