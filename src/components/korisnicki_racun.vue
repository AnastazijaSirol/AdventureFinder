<template>
    <div id="app">
        <div class="navigacija">
            <button class="natrag" @click="natrag">Natrag</button>
            <button class="odjava" @click="odjava">Odjava</button>
        </div>
        <div class="naslov"><b>Korisnički račun</b></div>
        <div class="informacije">
            <div>Korisničko ime: </div>
            <div>E-pošta: </div>
            <div>Posjećeno: </div>
        </div>
    </div>
</template>

<script>
export default {
name:'App',
methods: {
    natrag() {
        this.$router.push('aktivnosti_stranica');
    },
    odjava() {
         this.$router.push('/');
    }
}
};
</script>

<style lang="scss">

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
