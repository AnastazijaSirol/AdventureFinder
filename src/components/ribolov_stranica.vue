<template>
  <div id="app">
    <button class="natrag" @click="usmjeri_aktivnosti">Natrag</button>
    <button class="odjava" @click="usmjeri_pocetna">Odjava</button>
    <h2 class="naziv_aktivnosti">Ribolov u slatkim vodama</h2>
    <div class="dodaj_i_filter">
      <button class="dodaj_destinaciju" @click="dodaj_des">Dodaj destinaciju</button>
      <div class="filter_destinacije">
        <div class="filter_tekst">Filter destinacija</div>
        <select v-model="sortiranje" class="filter">
          <option value="asc">Poredak po ocijenjenosti uzlazno</option>
          <option value="desc">Poredak po ocijenjenosti silazno</option>
        </select>
      </div>
    </div>
    <div class="okviri">
      <div class="okvir" @click="usmjeri_mp">
        <img src="./amazona.jpg" alt="Amazona" class="slika">
        <div class="tekst"><b>Amazona, Brazil</b></div>
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
    this.$router.push('dodavanje_destinacije_ribolov');
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
</style>
