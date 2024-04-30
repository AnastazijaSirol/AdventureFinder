<template>
    <div>
      <div class="navigation">
        <button class="back-button" @click="goBack">Natrag</button>
        <button class="logout-button" @click="logout">Odjava</button>
      </div>
      <h2 class="naslov">{{ destinacija.nazivdestinacije }}, {{ destinacija.drzava }}</h2>
      <h3 class="aktivnost">Letenje paraglajderom</h3>
      <img :src="destinacija.slikaBase64" :alt="destinacija.nazivdestinacije" class="slika-destinacije">
      <div class="podaci-destinacije">
        <p>Vrijeme trajanja: {{ destinacija.vrijemetrajanja }}h</p>
        <p>Naplata: {{ destinacija.naplata }}€</p>
        <p>Potrebna oprema: {{ destinacija.potrebnaoprema }}</p>
        <p>Poveznica za rezervaciju: <a :href="destinacija.poveznicazarezervaciju" target="_blank">{{ destinacija.poveznicazarezervaciju }}</a></p>
        <button class="dodaj-recenziju" @click="dodajRecenziju">Dodaj recenziju</button>
      </div>
    </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  data() {
    return {
      destinacija: {} 
    };
  },
  methods: {
    async goBack() {
      this.$router.push('/paraglajder_stranica');
    },
    async logout() {
      this.$router.push('/pocetna_stranica');
    },
    async fetchDestinacija(destinacijaId) {
      const destinacijaDoc = await getDoc(doc(db, 'destinacije', destinacijaId));
      if (destinacijaDoc.exists()) {
        this.destinacija = destinacijaDoc.data(); 
      } else {
        console.error('Destinacija ne postoji');
      }
    },
    dodajRecenziju() {
      this.$router.push('/dodavanje_recenzije');
    }
  },
  async mounted() {
    const destinacijaId = this.$route.params.destinacijaId; 
    await this.fetchDestinacija(destinacijaId); 
  }
};
</script>

<style scoped>
.navigation {
  position: fixed;
  top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1em;
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 80px;
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1em;
}

.aktivnost {
  color: #D9D9D9;
}

.slika-destinacije {
  width: 50%;
  height: auto; 
}

.podaci-destinacije {
  color: #D9D9D9;
  margin-top: 20px;
}

.dodaj-recenziju {
  position: absolute;
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  font-size: 1em;
  left: 20px;
  padding: 5px;
}

</style>
