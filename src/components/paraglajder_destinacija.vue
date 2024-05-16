/* eslint-disable */
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
    <button v-if="isAdmin" class="edit-destination-button" @click="toggleEditing">
      Uredi destinaciju
    </button>
    <h3 class="aktivnost">Letenje paraglajderom</h3>
    <img :src="destinacija.slikaBase64" :alt="destinacija.nazivdestinacije" class="slika-destinacije">
    <div class="podaci-destinacije">
      <p v-if="!editing">Vrijeme trajanja: {{ destinacija.vrijemetrajanja }}h</p>
      <input v-model="editedDestinacija.vrijemetrajanja" v-if="editing" type="number" placeholder="Vrijeme trajanja (h)">
      <p v-if="!editing">Naplata: {{ destinacija.naplata }}€</p>
      <input v-model="editedDestinacija.naplata" v-if="editing" type="number" placeholder="Naplata (€)">
      <p v-if="!editing">Potrebna oprema: {{ destinacija.potrebnaoprema }}</p>
      <input v-model="editedDestinacija.potrebnaoprema" v-if="editing" type="text" placeholder="Potrebna oprema">
      <p v-if="!editing">Poveznica za rezervaciju: <a :href="destinacija.poveznicazarezervaciju" target="_blank">{{ destinacija.poveznicazarezervaciju }}</a></p>
      <input v-model="editedDestinacija.poveznicazarezervaciju" v-if="editing" type="text" placeholder="Poveznica za rezervaciju">
    </div>
    <button v-if="editing" class="confirm-edit-button" @click="confirmEdit">
      Potvrdi promjene
    </button>
    <button v-if="editing" class="cancel-edit-button" @click="cancelEdit">
      Odustani
    </button>
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
          <button v-if="isAdmin" class="obrisi-recenziju-button" @click="obrisiRecenziju(recenzija.id)">Obriši recenziju</button>
        </ul>
      </ul>
      <p v-else class="nema-recenzija">Trenutno nema recenzija za ovu destinaciju.</p>
    </div>
    <mapa_prikaz></mapa_prikaz>
  </div>
</template>

<script>
import { doc, getDoc, getDocs, query, collection, deleteDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default {
  data() {
    return {
      destinacija: {},
      recenzije: [],
      sortiranjeRecenzija: 'asc',
      isAdmin: false,
      editing: false,
      editedDestinacija: {
        vrijemetrajanja: '',
        naplata: '',
        potrebnaoprema: '',
        poveznicazarezervaciju: ''
      }
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
      this.recenzije = recenzijeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

    toggleEditing() {
      this.editing = true;
      this.editedDestinacija = { ...this.destinacija };
    },

    async confirmEdit() {
      try {
        const destinacijaId = this.$route.params.destinacijaId;
        await setDoc(doc(db, 'destinacije', destinacijaId), this.editedDestinacija, { merge: true });
        this.destinacija = { ...this.editedDestinacija };
        this.editing = false;
      } catch (error) {
        console.error('Greška prilikom ažuriranja destinacije:', error.message);
      }
    },

    cancelEdit() {
      this.editing = false;
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

    async obrisiRecenziju(recenzijaId) {
      try {
        const destinacijaId = this.$route.params.destinacijaId;
        await deleteDoc(doc(db, `destinacije/${destinacijaId}/recenzije`, recenzijaId));
        this.recenzije = this.recenzije.filter(recenzija => recenzija.id !== recenzijaId);
      } catch (error) {
        console.error('Greška prilikom brisanja recenzije:', error.message);
      }
    },

    goBack() {
      this.$router.push('/paraglajder_stranica');
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
    const korisnikRef = doc(db, 'registrirani', korisnikId);
    const korisnikDoc = await getDoc(korisnikRef);
    
    if (korisnikDoc.exists()) {
      const isAdmin = korisnikDoc.data().isAdmin;
      
      if (isAdmin) {
        this.isAdmin = true;
      }
    }
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

.obrisi-recenziju-button {
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-destination-button, .confirm-edit-button, .cancel-edit-button {
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-destination-button {
  margin-top: 10px;
}

.confirm-edit-button, .cancel-edit-button {
  margin-top: 10px;
}

.confirm-edit-button {
  background-color: green;
  color: white;
}

.cancel-edit-button {
  background-color: red;
  color: white;
}

input[type="number"], input[type="text"] {
  width: calc(100% - 22px);
  margin-top: 5px;
  padding: 5px 10px;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
}
</style>
