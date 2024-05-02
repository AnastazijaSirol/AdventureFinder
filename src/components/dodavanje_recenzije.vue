<template>
    <div id="app">
      <button class="odustani" @click="usmjeriNatrag">Odustani</button>
      <h2 class="naslov">Dodavanje recenzije</h2>
      <div class="kvadrat">
        <form class="forma">
          <div class="ocjena">
            <span v-for="index in 5" :key="index" @click="postaviOcjenu(index)" :class="{ 'puna': index <= ocjena, 'prazna': index > ocjena }">&#9733;</span>
          </div>
          <textarea placeholder="Opis recenzije" v-model="opis"></textarea>
          <button @click.prevent="potvrdi" class="potvrdi">Potvrdi</button>
        </form>
      </div>
      <router-view/>
    </div>
  </template>
  
  <script>
  import { addDoc, collection, doc } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  export default {
    data() {
      return {
        ocjena: 0,
        opis: '',
        destinacijaId: this.$route.params.destinacijaId, 
        oznaceneOcjene: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        }
      };
    },
    methods: {
      usmjeriNatrag() {
        this.$router.back();
      },
      postaviOcjenu(ocjena) {
        this.ocjena = ocjena;
        for (let i = 1; i <= this.ocjena; i++) {
          this.oznaceneOcjene[i] = true;
        }
        for (let i = this.ocjena + 1; i <= 5; i++) {
          this.oznaceneOcjene[i] = false;
        }
      },
      async potvrdi() {
        if (!this.destinacijaId) {
          console.error('Nije pravilno postavljen destinacijaId parametar');
          return;
        }
  
        const novaRecenzija = {
          ocjena: this.ocjena,
          opis: this.opis,
        };
  
        try {
          const destinacijaRef = doc(db, 'destinacije', this.destinacijaId);
          const recenzijeRef = collection(destinacijaRef, 'recenzije');
          await addDoc(recenzijeRef, novaRecenzija);
          this.$router.back();
        } catch (error) {
          console.error('Greška prilikom spremanja recenzije:', error);
        }
      },
    }
  };
  </script>
  
  <style lang="scss">
  .odustani {
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
  
  .naslov {
      font-size: 24px;
      margin-bottom: 20px;
  }
  
  .kvadrat {
      background-color: #D9D9D9;
      padding: 20px;
      border-radius: 10px;
  }
  
  .forma textarea {
      margin-bottom: 10px;
      width: calc(100% - 20px);
      padding: 10px;
      border-radius: 5px;
      border: none;
      resize: vertical;
  }
  
  .ocjena {
      margin-bottom: 10px;
  }
  
  .ocjena span {
      font-size: 24px;
      cursor: pointer;
  }
  
  .ocjena .puna {
      color: #FFD700; 
  }
  
  .ocjena .prazna {
      color: #1B1C1B; 
  }
  
  .forma button {
      margin-top: 10px;
      background-color: #1B1C1B;
      color: #D9D9D9;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      padding: 10px 0;
      width: 100%;
  }
  
  .forma button:hover {
      background-color: #1d2935;
  }
  </style>
  
