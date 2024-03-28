<template>
    <div id="app">
        <div class="usmjerenja">
            <button class="korisnickiracun "@click="usmjeri_korisnickiracun">Korisnički račun</button>
            <button class="pocetna" @click="usmjeri_pocetna">Odjava</button>
        </div>
        <div class="naslov"><b>Odabir aktivnosti</b></div>
        <select v-model="aktivnosti" class="izbornik">
            <option value="planinarenje">Planinarenje</option>
            <option value="padobran">Skok padobranom</option>
            <option value="ribolov">Ribolov u slatkim vodama</option>
            <option value="spilje">Istraživanje špilja</option>
            <option value="prezivljavanje">Preživaljvanje u divljini</option>
        </select>
    </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    usmjeri_pocetna() {
        this.$router.push('/');
    }
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
    background: none;
    border: none;
    color: #D9D9D9;
    cursor: pointer;
    margin-left: 10px;
    font-size: 1em;
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

</style>
