<template>
  <div>
    <div class="navigation">
      <button class="back-button" @click="goBack">Natrag</button>
      <button class="logout-button" @click="logout">Odjava</button>
    </div>
    <h2 class="naslov">{{ destinacija.nazivdestinacije }}, {{ destinacija.drzava }}</h2>
    <button class="mark-visited-button" :class="{ 'visited': destinacija.posjeceno }" @click="toggleVisited">
      {{ destinacija.posjeceno ? 'Posjećeno ✓' : 'Označi kao posjećeno' }}
    </button>
    <h3 class="aktivnost">Planinarenje</h3>
    <img :src="destinacija.slikaBase64" :alt="destinacija.nazivdestinacije" class="slika-destinacije">
    <div class="podaci-destinacije">
      <p>Vrijeme trajanja: {{ destinacija.vrijemetrajanja }}h</p>
      <p>Naplata: {{ destinacija.naplata }}€</p>
      <p>Potrebna oprema: {{ destinacija.potrebnaoprema }}</p>
      <p>Poveznica za rezervaciju: <a :href="destinacija.poveznicazarezervaciju" target="_blank">{{ destinacija.poveznicazarezervaciju }}</a></p>
    </div>
    <button class="dodaj-recenziju" @click="dodajRecenziju(destinacija.id)">Dodaj recenziju</button>
    <h3 class="naslov-recenzije">Recenzije</h3>
    <select v-model="sortiranjeRecenzija" class="filter-recenzija" @change="sortirajRecenzije">
      <option value="asc">Poredak recenzija prema visini ocjene uzlazno</option>
      <option value="desc">Poredak recenzija prema visini ocjene silazno</option>
    </select>
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

<script>
import { doc, getDoc, getDocs, query, collection, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default {
  data() {
    return {
      destinacija: {},
      recenzije: [],
      sortiranjeRecenzija: 'asc'
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

    async toggleVisited() {
      try {
        const korisnikId = auth.currentUser.uid; 
        const destinacijaId = this.$route.params.destinacijaId;
        const korisnikRef = doc(db, 'destinacije', destinacijaId, 'korisnici', korisnikId);
        await setDoc(korisnikRef, { posjeceno: !this.destinacija.posjeceno }, { merge: true });
        this.destinacija.posjeceno = !this.destinacija.posjeceno;
        localStorage.setItem(`posjeceno_${destinacijaId}_${korisnikId}`, this.destinacija.posjeceno.toString()); 
      } catch (error) {
        console.error('Greška prilikom označavanja destinacije kao posjećene:', error.message);
      }
    },

    dodajRecenziju(destinacijaId) {
      this.$router.push({ name: 'dodavanje_recenzije', params: { destinacijaId } });
    },

    getStarRating(ocjena) {
      return '★'.repeat(ocjena); 
    },

    sortirajRecenzije() {
      this.recenzije.sort((a, b) => {
        if (this.sortiranjeRecenzija === 'asc') {
          return a.ocjena - b.ocjena;
        } else {
          return b.ocjena - a.ocjena;
        }
      });
    },

    goBack() {
      this.$router.push('/planinarenje_stranica');
    },

    logout() {
      this.$router.push('/');
    }
  },
  async mounted() {
    const destinacijaId = this.$route.params.destinacijaId;
    await this.fetchDestinacija(destinacijaId);
    const korisnikId = auth.currentUser.uid; 
    this.destinacija.posjeceno = localStorage.getItem(`posjeceno_${destinacijaId}_${korisnikId}`) === 'true';
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

.back-button, .logout-button, .dodaj-recenziju {
  position: absolute;
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button {
  top: 20px;
  left: 20px;
}

.logout-button {
  top: 20px;
  right: 80px;
}

.dodaj-recenziju {
  left: 20px;
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

.filter-recenzija {
  border: none;
  background-color: #333;
  color: #D9D9D9;
  padding: 5px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
}

.mark-visited-button {
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.mark-visited-button.visited {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: green;
  color: white;
}

</style>
