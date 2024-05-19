/* eslint-disable */
<template>
  <div id="app">
    <div class="navigacija">
      <button class="natrag" @click="natrag">Natrag</button>
      <button class="odjava" @click="odjava">Odjava</button>
    </div>
    <div class="naslov"><b>Korisnički račun</b></div>
    <div class="informacije">
      <div v-if="currentUser">E-pošta: {{ currentUser.email }}</div>
      <div v-if="isAdmin">
        <div class="broj_reg">Broj registriranih korisnika: {{ brojRegistriranihKorisnika }}</div>
        <div class="reg">
          <h3>Registrirani korisnici</h3>
          <ul>
            <li v-for="(korisnik, index) in listaKorisnika" :key="index">{{ korisnik.email }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="razgovor">
      <h3>Razmjena poruka</h3>
    </div>
    <div class="unos-poruke">
      <input type="text" v-model="novaPoruka" placeholder="Unesite poruku..." />
      <button @click="posaljiPoruku">Pošalji</button>
    </div>
    <div class="poruke">
      <div class="poruka" v-for="(poruka, index) in poruke" :key="index">
        <span>{{ poruka.posiljatelj }}:</span> {{ poruka.sadrzaj }}
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default {
  data() {
    return {
      currentUser: null,
      isAdmin: false,
      financije: localStorage.getItem('financije') || 0,
      brojRegistriranihKorisnika: 0,
      listaKorisnika: [],
      poruke: [],
      novaPoruka: ''
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
    },
    async ucitajPoruke() {
      const querySnapshot = await getDocs(collection(db, 'poruke'));
      this.poruke = querySnapshot.docs.map(doc => doc.data()).sort((a, b) => b.vrijemeDodavanja - a.vrijemeDodavanja);
    },
    async ucitajKorisnike() {
      try {
        const querySnapshot = await getDocs(collection(db, 'registrirani'));
        this.listaKorisnika = querySnapshot.docs.map(doc => doc.data());
        this.brojRegistriranihKorisnika = this.listaKorisnika.length;
      } catch (error) {
        console.error('Došlo je do pogreške prilikom dohvaćanja korisnika:', error);
      }
    },
    async posaljiPoruku() {
      if (!this.currentUser) {
        console.error('Korisnik nije prijavljen.');
        return;
      }
      const posiljatelj = this.currentUser.email;
      const sadrzaj = this.novaPoruka;
      const vrijemeDodavanja = new Date(); 
      try {
        await setDoc(doc(collection(db, 'poruke')), { posiljatelj, sadrzaj, vrijemeDodavanja }); 
        console.log('Poruka je poslana.');
        this.novaPoruka = ''; 
        await this.ucitajPoruke(); 
      } catch (error) {
        console.error('Došlo je do pogreške prilikom slanja poruke:', error);
      }
    }
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.currentUser = user;
        await this.ucitajPoruke();
        const userId = user.uid;
        const userDoc = await getDoc(doc(db, 'registrirani', userId));
        if (userDoc.exists()) {
          this.financije = userDoc.data().financije || 0;
          this.isAdmin = userDoc.data().isAdmin || false;
          if (this.isAdmin) {
            await this.ucitajKorisnike();
          }
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

.poruke {
  margin-top: 20px;
}

.poruka {
  margin-bottom: 10px;
}

.unos-poruke {
  margin-bottom: 10px;
}

.unos-poruke input {
  width: 80%;
  padding: 5px;
}

.unos-poruke button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.razgovor {
  color: rgb(25, 242, 254);
}

.broj_reg {
  background-color: #E0E0E0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: fit-content;
  color: #1B1C1B;
  margin: 0 auto 20px auto; 
}

.reg {
  background-color: #E0E0E0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  width: fit-content;
  color: #1B1C1B;
  margin: 0 auto 20px auto;
}

.reg ul {
  list-style-type: none;
  padding: 0;
}

.reg ul li {
  margin-bottom: 5px;
}

</style>
