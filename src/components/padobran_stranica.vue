<template>
    <div id="app">
        <button class="natrag" @click="usmjeri_aktivnosti">Natrag</button>
        <button class="odjava" @click="usmjeri_pocetna">Odjava</button>
        <h2 class="naziv_aktivnosti">Skok padobranom</h2>
        <div class="dodaj_i_filter">
            <button class="dodaj_destinaciju" @click="dodaj_des">Dodaj destinaciju</button>
            <div class="filter_destinacije">
                <div class="filter_tekst">Filter destinacija</div>
                <select v-model="sortiranje" class="filter">
                    <option value="asc">Poredaj po ocijenjenosti uzlazno</option>
                    <option value="desc">Poredaj po ocijenjenosti silazno</option>
                </select>
            </div>
        </div>
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
  background: none;
  border: none;
  color: #D9D9D9;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.3em;
}

.dodaj_i_filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.filter_destinacije {
  margin-top: 30px;
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

</style>
