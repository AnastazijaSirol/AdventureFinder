<template>
  <div id="app">
    <button class="natrag" @click="usmjeri_aktivnosti">Natrag</button>
    <button class="odjava" @click="usmjeri_pocetna">Odjava</button>
    <h2 class="naziv_aktivnosti">Skok padobranom</h2>
    <div class="grafikon-container">
      <canvas id="myChart" class="grafikon"></canvas>
    </div>
    <div class="dodaj_i_filter">
      <button class="dodaj_destinaciju" @click="dodaj_des">Dodaj destinaciju</button>
      <div class="filter_destinacije">
        <select v-model="sortiranje" class="filter" @change="sortirajDestinacije">
          <option value="asc">Poredak destinacija po ocijenjenosti uzlazno</option>
          <option value="desc">Poredak destinacija po ocijenjenosti silazno</option>
        </select>
      </div>
    </div>
    <div class="okviri">
      <div v-for="destinacija in filtriraneDestinacije" :key="destinacija.id">
        <div class="okvir" @click="prikaziDetalje(destinacija.id)">
          <img :src="destinacija.slikaBase64" :alt="destinacija.nazivdestinacije" class="slika">
          <div class="tekst"><b>{{ destinacija.nazivdestinacije }}, {{ destinacija.drzava }}</b></div>
        </div>
        <button v-if="isAdmin" class="obrisi-destinaciju-button" @click.stop="obrisiDestinaciju(destinacija.id)">Obriši destinaciju</button>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase'; 
import Chart from 'chart.js/auto';

export default {
  name: 'App',
  data() {
    return {
      sortiranje: 'asc', 
      destinacije: [],
      myChart: null,
      isAdmin: false
    };
  },
  computed: {
    filtriraneDestinacije() {
      return this.destinacije.filter(destinacija => destinacija.izvor === 'padobran');
    }
  },
  methods: {
    async ucitajDestinacije() {
      try {
        const q = query(collection(db, 'destinacije'));
        const destinacijeSnapshot = await getDocs(q);
        this.destinacije = destinacijeSnapshot.docs
          .filter(doc => doc.data().izvor === 'padobran') 
          .map(async doc => {
            const destinacijaData = doc.data();
            destinacijaData.prosjecnaOcjena = await this.izracunajProsjecnuOcijenu(doc.id);
            return { id: doc.id, ...destinacijaData };
          });
        this.destinacije = await Promise.all(this.destinacije);
        this.generirajGrafikon(); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async izracunajProsjecnuOcijenu(destinacijaId) {
      const ocjeneQuery = query(collection(db, `destinacije/${destinacijaId}/recenzije`));
      const ocjeneSnapshot = await getDocs(ocjeneQuery);
      let sumaOcjena = 0;
      let brojOcjena = 0;
      ocjeneSnapshot.forEach(doc => {
         sumaOcjena += doc.data().ocjena;
         brojOcjena++;
      });
      return brojOcjena ? sumaOcjena / brojOcjena : 0;
    },
    sortirajDestinacije() {
      const sortedDestinacije = [...this.filtriraneDestinacije];
      sortedDestinacije.sort((a, b) => {
        if (this.sortiranje === 'asc') {
          return a.prosjecnaOcjena - b.prosjecnaOcjena;
        } else {
          return b.prosjecnaOcjena - a.prosjecnaOcjena;
        }
      });
      this.destinacije = sortedDestinacije;
    },
    async generirajGrafikon() {
      const ctx = document.getElementById('myChart').getContext('2d');
      
      const countriesData = {};
      this.destinacije.forEach(destinacija => {
        if (countriesData[destinacija.drzava]) {
          countriesData[destinacija.drzava]++;
        } else {
          countriesData[destinacija.drzava] = 1;
        }
      });
      
      const labels = Object.keys(countriesData);
      const data = Object.values(countriesData);
      
      this.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Broj destinacija',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: data
          }]
        },
        options: {
          responsive: true
        }
      });
    },
    postaviDimenzijeGrafikona() {
      const canvas = document.getElementById('myChart');
      canvas.width = 150;
      canvas.height = 150;
    },
    async obrisiDestinaciju(destinacijaId) {
      try {
        await deleteDoc(doc(db, 'destinacije', destinacijaId));
        this.destinacije = this.destinacije.filter(destinacija => destinacija.id !== destinacijaId);
      } catch (error) {
        console.error('Greška prilikom brisanja destinacije:', error.message);
      }
    },
    prikaziDetalje(id) {
      this.$router.push({ name: 'padobran_destinacija', params: { destinacijaId: id } });
    },
    usmjeri_pocetna() {
      this.$router.push('/');
    },
    usmjeri_aktivnosti() {
      this.$router.push('aktivnosti_stranica');
    },
    dodaj_des() {
      this.$router.push('dodavanje_destinacije_padobran');
    }
  },
  async mounted() {
    this.ucitajDestinacije(); 
    this.postaviDimenzijeGrafikona();

    const korisnikId = auth.currentUser.uid;
    const korisnikRef = doc(db, 'registrirani', korisnikId);
    const korisnikDoc = await getDoc(korisnikRef);
    
    if (korisnikDoc.exists()) {
      const isAdmin = korisnikDoc.data().isAdmin;
      this.isAdmin = isAdmin;
    }
  }
};
</script>

<style scoped>
html, body {
  background-color: #1B1C1B;
}

.natrag,
.odjava,
.dodaj_destinaciju,
.usmjeri_aktivnosti {
  position: absolute;
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em; 
  font-weight: 300; 
}

.natrag {
  left: 20px;
  top: 20px;
}

.odjava {
  right: 20px;
  top: 20px;
}

.dodaj_destinaciju {
  left: 20px;
  top: 130px;
}

.usmjeri_aktivnosti {
  right: 20px;
  top: 130px;
}

.naziv_aktivnosti {
  color: #D9D9D9;
}

.dodaj_i_filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter_destinacije {
  margin-top: 30px;
  margin-left: 10px;
}

.filter_tekst {
  color: #D9D9D9;
  font-size: 1.2em;
}

.filter {
  border: none;
  background-color: #333;
  color: #D9D9D9;
  padding: 5px;
  cursor: pointer;
  font-size: 1em;
  border-radius: 5px;
}

.okviri {
  display: flex; 
  margin-top: 30px; 
  flex-wrap: wrap
}

.okvir {
  width: 400px;
  height: 300px;
  background-color: #333; 
  padding: 20px; 
  box-sizing: border-box; 
  border-radius: 20px;
  cursor: pointer;
  margin: 10px;
}

.slika {
  width: 100%;
  height: auto; 
}

.tekst {
  color: #D9D9D9; 
  font-size: 1.2em; 
  margin-top: 10px; 
  text-align: center; 
}

.grafikon-container {
  width: 300px;
  height: 300px;
  position: relative;
  z-index: 1;
}

.grafikon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  justify-content: center;
}

.obrisi-destinaciju-button {
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
