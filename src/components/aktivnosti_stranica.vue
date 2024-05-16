/* eslint-disable */
<template>
    <div id="app">
        <div class="usmjerenja">
            <button class="korisnickiracun" @click="usmjeri_korisnickiracun">Korisnički račun</button>
            <button class="pocetna" @click="usmjeri_pocetna">Odjava</button>
        </div>
        <div class="naslov"><b>Odabir aktivnosti</b></div>
        <select v-model="aktivnosti" class="izbornik">
            <option value="planinarenje">Planinarenje</option>
            <option value="padobran">Skok padobranom</option>
            <option value="ribolov">Ribolov u slatkim vodama</option>
            <option value="prezivljavanje">Preživljavanje u divljini</option>
            <option value="paraglajder">Letenje paraglajderom</option>
        </select>
        <button class="usmjeri_aktivnosti" @click="usmjeri_aktivnost">Istraži</button>
        <div class="broj">
          <div class="nb"><h3>Broj destinacija po aktivnostima: </h3></div>
          <div class="broj-container">
          <p>Planinarenje: {{ brojacPlaninarenje }}</p>
          <p>Skok padobranom: {{ brojacPadobran }}</p>
          <p>Ribolov u slatkim vodama: {{ brojacRibolov }}</p>
          <p>Preživljavanje u divljini: {{ brojacPrezivljavanje }}</p>
          <p>Letenje paraglajderom: {{ brojacParaglajder }}</p>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import { getDocs, collection } from 'firebase/firestore';
  import { db } from '@/firebase';
  export default {
  name: 'App',
  data() {
    return {
      aktivnosti: '',
      brojacPlaninarenje: 0,
      brojacPadobran: 0,
      brojacRibolov: 0,
      brojacPrezivljavanje: 0,
      brojacParaglajder: 0,
    };
  },
  methods: {
    async usmjeri_aktivnost() {
        switch(this.aktivnosti) {
            case 'planinarenje':
                this.$router.push('planinarenje_stranica');
                break;
            case 'padobran':
                this.$router.push('padobran_stranica');
                break;
            case 'ribolov':
                this.$router.push('ribolov_stranica');
                break;
            case 'prezivljavanje':
                this.$router.push('prezivljavanje_stranica');
                break;
            case 'paraglajder':
                this.$router.push('paraglajder_stranica');
                break;
            default:
                break;
        }
    },
    async brojDestinacijaPoAktivnostima() {
      const querySnapshot = await getDocs(collection(db, 'destinacije'));
      querySnapshot.forEach(doc => {
        const izvor = doc.data().izvor;
        switch(izvor) {
          case 'planinarenje':
            this.brojacPlaninarenje++;
            break;
          case 'padobran':
            this.brojacPadobran++;
            break;
          case 'ribolov':
            this.brojacRibolov++;
            break;
          case 'prezivljavanje':
            this.brojacPrezivljavanje++;
            break;
          case 'paraglajder':
            this.brojacParaglajder++;
            break;
          default:
            break;
        }
      });
    },
    usmjeri_pocetna() {
        this.$router.push('/');
    },
    usmjeri_korisnickiracun() {
      this.$router.push('korisnicki_racun');
    },
  },
  mounted() {
    this.brojDestinacijaPoAktivnostima();
  }
  };
  </script>
  
  <style lang="scss">
  html, body {
  background-color: #1B1C1B;
  }
  
  .usmjerenja {
  position: absolute;
  top: 20px;
  right: 20px; 
  }
  
  .korisnickiracun,
  .pocetna {
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
  }
  
  .naslov {
  color: #D9D9D9;
  font-size: 1.5em;
  margin-top: 20px;
  }
  
  .izbornik {
  margin-top: 10px;
  padding: 6px;
  font-size: 1.1em;
  border-radius: 5px;
  background-color: #2C2D2C;
  color: #D9D9D9;
  border: none;
  }
  
  .usmjeri_aktivnosti {
  position: absolute;
  padding: 10px 20px;
  background-color: #D9D9D9;
  color: #1B1C1B;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  right: 530px;
  top: 203px;
  }
  
  .broj {
      color: #D9D9D9;
  }

  .nb {
    color: rgb(25, 242, 254);
  }

  .broj-container {
  border: 2px solid #FFFFFF;
  padding: 10px;
  border-radius: 5px;
  }
  </style>
  
