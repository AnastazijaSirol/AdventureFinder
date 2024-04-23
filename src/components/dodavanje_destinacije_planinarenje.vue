<template>
    <div id="app">
        <button class="odustani" @click="usmjeri_natrag">Odustani</button>
        <h2 class="naslov">Dodavanje destinacije</h2>
        <div class="kvadrat">
            <form class="forma">
                <input type="text" placeholder="Naziv destinacije" v-model="nazivdestinacije"/>
                <input type="text" placeholder="Država" v-model="drzava"/>
                <input type="text" placeholder="Vrijeme trajanja" v-model="vrijemetrajanja"/>
                <input type="text" placeholder="Naplata" v-model="naplata"/>
                <input type="text" placeholder="Potrebna oprema" v-model="potrebnaoprema"/>
                <input type="text" placeholder="Poveznica za rezervaciju" v-model="poveznicazarezervaciju"/>
                <input type="file" @change="handleFileUpload">
                <button @click.prevent="potvrdi" class="potvrdi">Potvrdi</button>
            </form>
        </div>
        <router-view/>
    </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'; 

export default {
    name: 'App',
    data() {
        return {
            nazivdestinacije: '',
            drzava: '',
            vrijemetrajanja: '',
            naplata: '',
            potrebnaoprema: '',
            poveznicazarezervaciju: '',
            slikaBase64: ''
        };
    },
    methods: {
        async potvrdi() {
            if (this.nazivdestinacije.trim() === '' || this.drzava.trim() === '' || this.vrijemetrajanja.trim() === '' || this.naplata.trim() === '' || this.potrebnaoprema.trim() === '' || this.poveznicazarezervaciju.trim() === '' || this.slikaBase64 === '') {
                console.error('Sva polja moraju biti popunjena.');
                return;
            }

            try {
                const destinacijaData = {
                    nazivdestinacije: this.nazivdestinacije,
                    drzava: this.drzava,
                    vrijemetrajanja: this.vrijemetrajanja,
                    naplata: this.naplata,
                    potrebnaoprema: this.potrebnaoprema,
                    poveznicazarezervaciju: this.poveznicazarezervaciju,
                    slikaBase64: this.slikaBase64 
                };
                const docRef = await addDoc(collection(db, 'destinacije'), destinacijaData);
                console.log('Document written with ID: ', docRef.id);
                this.$router.push('planinarenje_stranica');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        },
        usmjeri_natrag() {
            this.$router.push('planinarenje_stranica');
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                this.slikaBase64 = e.target.result; 
            };

            reader.readAsDataURL(file);
        }
    }
};
</script>

<style lang="scss">
html, body {
    background-color: #1B1C1B;
    color: #D9D9D9;
}

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

.forma input[type="text"],
.forma input[type="file"],
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
</style>
