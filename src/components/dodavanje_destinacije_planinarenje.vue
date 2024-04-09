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
                <button @click.prevent="potvrdi" class="potvrdi">Potvrdi</button>
            </form>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        
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
