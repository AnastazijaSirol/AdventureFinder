<template>

<div id="app">
    <button class="natrag" @click="usmjeri_aktivnosti">Natrag</button>
    <button class="odjava" @click="usmjeri_pocetna">Odjava</button>
    <h2 class="naziv_aktivnosti">Planinarenje</h2>
    <div><button class="dodaj_destinaciju" @click="dodaj_des">Dodaj destinaciju</button></div>
</div>

</template>

<script>
export default {
    name: 'App',
    methods: {
        usmjeri_pocetna() {
            this.$router.push('/');
        },
        usmjeri_aktivnosti() {
            this.$router.push('aktivnosti_stranica');
        },
        dodaj_des() {
            this.$router.push('planinarenje_stranica');
        }
    }
};
</script>

<style lang="scss">

html, body {
  background-color: #1B1C1B;
}

.natrag {
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

.odjava {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1em;
}

.dodaj_destinaciju {
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.3em;
}

</style>
