import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import pocetna_stranica from './components/pocetna_stranica.vue';
import prijava_stranica from './components/prijava_stranica.vue';
import registracija_stranica from './components/registracija_stranica.vue';
import aktivnosti_stranica from './components/aktivnosti_stranica.vue';
import planinarenje_stranica from './components/planinarenje_stranica.vue';
import padobran_stranica from './components/padobran_stranica.vue';
import dodavanje_destinacije_planinarenje from './components/dodavanje_destinacije_planinarenje.vue';
import dodavanje_destinacije_padobran from './components/dodavanje_destinacije_padobran.vue';
import ribolov_stranica from './components/ribolov_stranica.vue';
import dodavanje_destinacije_ribolov from './components/dodavanje_destinacije_ribolov.vue';
import prezivljavanje_stranica from './components/prezivljavanje_stranica.vue';
import dodavanje_destinacije_prezivljavanje from './components/dodavanje_destinacije_prezivljavanje.vue';
import paraglajder_stranica from './components/paraglajder_stranica.vue';
import dodavanje_destinacije_paraglajder from './components/dodavanje_destinacije_paraglajder.vue';
import korisnicki_racun from './components/korisnicki_racun.vue';
import dodavanje_recenzije from './components/dodavanje_recenzije.vue';
import planinarenje_destinacija from './components/planinarenje_destinacija.vue';

const routes=[
    {path: '/', component: pocetna_stranica},
    {path: '/prijava_stranica', component: () => import ('./components/prijava_stranica.vue')},
    {path: '/registracija_stranica', component: () => import ('./components/registracija_stranica.vue')},
    {path: '/aktivnosti_stranica', component: () => import ('./components/aktivnosti_stranica.vue')},
    {path: '/planinarenje_stranica', component: () => import ('./components/planinarenje_stranica.vue')},
    {path: '/padobran_stranica', component: () => import ('./components/padobran_stranica.vue')},
    {path: '/dodavanje_destinacije_planinarenje', component: () => import ('./components/dodavanje_destinacije_planinarenje.vue')},
    {path: '/dodavanje_destinacije_padobran', component: () => import ('./components/dodavanje_destinacije_padobran.vue')},
    {path: '/ribolov_stranica', component: () => import ('./components/ribolov_stranica.vue')},
    {path: '/dodavanje_destinacije_ribolov', component: () => import ('./components/dodavanje_destinacije_ribolov.vue')},
    {path: '/prezivljavanje_stranica', component: () => import ('./components/prezivljavanje_stranica.vue')},
    {path: '/dodavanje_destinacije_prezivljavanje', component: () => import ('./components/dodavanje_destinacije_prezivljavanje.vue')},
    {path: '/paraglajder_stranica', component: () => import ('./components/paraglajder_stranica.vue')},
    {path: '/dodavanje_destinacije_paraglajder', component: () => import ('./components/dodavanje_destinacije_paraglajder.vue')},
    {path: '/korisnicki_racun', component: () => import ('./components/korisnicki_racun.vue')},
    {path: '/dodavanje_recenzije', component: () => import ('./components/dodavanje_recenzije.vue')},
    {path: '/planinarenje_destinacija', component: () => import ('./components/planinarenje_destinacija.vue')}, 
    {
        path: '/planinarenje_destinacija/:destinacijaId', 
        name: 'planinarenje_destinacija',
        component: planinarenje_destinacija
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.component('pocetna_stranica', pocetna_stranica);
app.component('prijava_stranica', prijava_stranica);
app.component('registracija_stranica', registracija_stranica);
app.component('aktivnosti_stranica', aktivnosti_stranica);
app.component('planinarenje_stranica', planinarenje_stranica);
app.component('padobran_stranica', padobran_stranica);
app.component('dodavanje_destinacije_planinarenje', dodavanje_destinacije_planinarenje);
app.component('dodavanje_destinacije_padobran', dodavanje_destinacije_padobran);
app.component('ribolov_stranica', ribolov_stranica);
app.component('dodavanje_destinacije_ribolov', dodavanje_destinacije_ribolov.vue);
app.component('prezivljavanje_stranica', prezivljavanje_stranica.vue);
app.component('dodavanje_destinacije_prezivljavanje', dodavanje_destinacije_prezivljavanje.vue);
app.component('paraglajder_stranica', paraglajder_stranica);
app.component('dodavanje_destinacije_paraglajder', dodavanje_destinacije_paraglajder);
app.component('korisnicki_racun', korisnicki_racun);
app.component('dodavanje_recenzije', dodavanje_recenzije);
app.component('planinarenje_destinacija', planinarenje_destinacija);

app.use(router);
app.mount('#app');

