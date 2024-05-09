<template>
    <div id="app">
      <div class="navigacija">
        <button class="natrag" @click="natrag">Natrag</button>
        <button class="odjava" @click="odjava">Odjava</button>
      </div>
      <div class="naslov"><b>Korisnički račun</b></div>
      <div class="informacije">
        <div v-if="currentUser">E-pošta: {{ currentUser.email }}</div>
        <div>
          <span> Ažuriranje financija: </span> 
          <input type="number" v-model="financije" @change="azurirajFinancije" />
          €
        </div>
        <div>Posjećeno:</div>
      </div>
    </div>
  </template>

  <script>
  import { onAuthStateChanged } from 'firebase/auth';
  import { doc, getDoc, setDoc } from 'firebase/firestore';
  import { db, auth } from '@/firebase';

  export default {
    data() {
      return {
        currentUser: null,
        financije: localStorage.getItem('financije') || 0
      };
    },
    methods: {
      natrag() {
        this.$router.push('aktivnosti_stranica');
      },
      odjava() {
        localStorage.removeItem('financije');
        this.$router.push('/');
      },
      async azurirajFinancije() {
        if (!this.currentUser) {
          console.error('Korisnik nije prijavljen.');
          return;
        }
        try {
          const userId = this.currentUser.uid;
          await setDoc(doc(db, 'registrirani', userId), {
            financije: this.financije
          });
          console.log('Financije su ažurirane.');
        } catch (error) {
          console.error('Došlo je do pogreške prilikom ažuriranja financija:', error);
        }
      }
    },
    mounted() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.currentUser = user;
          const userId = user.uid;
          const userDoc = await getDoc(doc(db, 'registrirani', userId));
          if (userDoc.exists()) {
            this.financije = userDoc.data().financije || 0;
          }
        } else {
          this.currentUser = null;
        }
      });
    }
  };
  </script>

  <style lang="scss">
  .odjava {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #D9D9D9;
    color: #1B1C1B;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
  }

  .natrag {
    position: absolute;
    top: 20px;
    left: 20px;
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

  .informacije {
    color: #D9D9D9;
    margin-top: 20px;
    font-size: 1.1em;
  }

  .informacije div {
    margin-bottom: 10px;
  }
  </style>
