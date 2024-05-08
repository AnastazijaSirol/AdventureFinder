
<template>
  <div id="app">
    <button class="pocetna-button" @click="usmjeri_pocetna">Početna</button>
    <h1 class="naslov">Registracija</h1>
    <div class="kvadrat">
      <form class="forma">
        <input type="email" placeholder="E-pošta" v-model="email" />
        <input type="password" placeholder="Lozinka" v-model="lozinka" />
        <input type="password" placeholder="Potvrdi lozinku" v-model="potvrdaLozinke" />
        <button @click.prevent="registracija">Registracija</button>
      </form>
    </div>
    <p class="poruka">Već imate korisnički račun? <b class="preporuka" @click="usmjeri_prijava">Prijavi se.</b></p>
    <router-view/>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, setDoc, doc, db, getDocs, collection } from '@/firebase';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      lozinka: '',
      potvrdaLozinke: ''
    };
  },
  methods: {
    usmjeri_pocetna() {
      this.$router.push('/');
    },
    async registracija() {
  try {
    if (this.lozinka !== this.potvrdaLozinke) {
      console.error('Lozinke se ne podudaraju.');
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.lozinka);

    // Fetch all destinations from the Firestore collection
    const destinacijeSnapshot = await getDocs(collection(db, 'destinacije'));
    
    // Iterate over each destination document
    destinacijeSnapshot.forEach(async (destinacijaDoc) => {
      const destinacijaId = destinacijaDoc.id;

      // Create a reference to the user document in the destination's collection
      const userRef = doc(db, `destinacije/${destinacijaId}/korisnici`, userCredential.user.uid);

      // Set user data in the destination's collection
      await setDoc(userRef, {
        email: this.email,
        posjeceno: false
      });
    });

    // Redirect the user after successful registration
    this.$router.push('aktivnosti_stranica');
  } catch (error) {
    console.error('Greška prilikom registracije:', error.message);
  }
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
