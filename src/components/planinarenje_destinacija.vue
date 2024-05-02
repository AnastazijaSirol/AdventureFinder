<template>
  <div>
    <div class="navigation">
      <button class="back-button" @click="goBack">Natrag</button>
      <button class="logout-button" @click="logout">Odjava</button>
    </div>
    <h2 class="naslov">{{ destinacija.nazivdestinacije }}, {{ destinacija.drzava }}</h2>
    <h3 class="aktivnost">Planinarenje</h3>
    <img :src="destinacija.slikaBase64" :alt="destinacija.nazivdestinacije" class="slika-destinacije">
    <div class="podaci-destinacije">
      <p>Vrijeme trajanja: {{ destinacija.vrijemetrajanja }}h</p>
      <p>Naplata: {{ destinacija.naplata }}€</p>
      <p>Potrebna oprema: {{ destinacija.potrebnaoprema }}</p>
      <p>Poveznica za rezervaciju: <a :href="destinacija.poveznicazarezervaciju" target="_blank">{{ destinacija.poveznicazarezervaciju }}</a></p>
      <button class="dodaj-recenziju" @click="dodajRecenziju(destinacija.id)">Dodaj recenziju</button>
    </div>
    <h3 class="naslov-recenzije">Recenzije</h3>
    <div class="rec">
    <ul class="recenzije-lista" v-if="recenzije.length > 0">
      <ul class="recenzija" v-for="(recenzija, index) in recenzije" :key="recenzija.id" :style="{ marginRight: (index + 1) % 4 !== 0 ? '20px' : '0' }">
        <div class="ocjena-recenzije"><span class="ocjena-zvjezdice">{{ getStarRating(recenzija.ocjena) }}</span></div>
        <div class="opis-recenzije">{{ recenzija.opis }}</div>
      </ul>
    </ul>
      <p v-else class="nema-recenzija">Trenutno nema recenzija za ovu destinaciju.</p>
    </div>
  </div>
</template>

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

.naslov-recenzije {
  margin-top: 30px;
  color: #D9D9D9;
}

.rec {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.recenzija {
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: calc(100% - 20px);
  color: #D9D9D9;
}

.ocjena-recenzije {
  font-weight: bold;
  color: #D9D9D9;
}

.opis-recenzije {
  margin-top: 10px;
  color: #D9D9D9;
}

.nema-recenzija {
  color: #D9D9D9;
  margin-top: 20px;
}

.ocjena-zvjezdice {
  color: #FFD700; 
}

</style>
<script>
import { doc, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  data() {
    return {
      destinacija: {},
      recenzije: []
    };
  },
  methods: {
   
    async fetchDestinacija(destinacijaId) {
  const destinacijaRef = doc(db, 'destinacije', destinacijaId);
  const destinacijaDoc = await getDoc(destinacijaRef);
  if (destinacijaDoc.exists()) {
    this.destinacija = destinacijaDoc.data();
    await this.fetchRecenzije(destinacijaId); 
  } else {
    console.error('Destinacija ne postoji');
  }
},

    async fetchRecenzije(destinacijaId) {
      const recenzijeQuery = query(collection(db, `destinacije/${destinacijaId}/recenzije`)); 
      const recenzijeSnapshot = await getDocs(recenzijeQuery);
      this.recenzije = recenzijeSnapshot.docs.map(doc => doc.data());
    },
    goBack() {
      this.$router.push('/planinarenje_stranica');
    },
    logout() {
      this.$router.push('/pocetna_stranica');
    },
    dodajRecenziju(destinacijaId) {
      this.$router.push({ name: 'dodavanje_recenzije', params: { destinacijaId } });
    },

    getStarRating(ocjena) {
      return '★'.repeat(ocjena); 
    }
  },
  async mounted() {
    const destinacijaId = this.$route.params.destinacijaId;
    await this.fetchDestinacija(destinacijaId);
  }
};
</script>

