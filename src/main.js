import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import pocetna_stranica from './components/pocetna_stranica.vue';
import prijava_stranica from './components/prijava_stranica.vue';
import registracija_stranica from './components/registracija_stranica.vue';
import prijava_administrator from './components/prijava_administrator.vue';
import aktivnosti_stranica from './components/aktivnosti_stranica.vue';
import planinarenje_stranica from './components/planinarenje_stranica.vue';

const routes=[
    {path: '/', component: pocetna_stranica},
    {path: '/prijava_stranica', component: () => import ('./components/prijava_stranica.vue')},
    {path: '/registracija_stranica', component: () => import ('./components/registracija_stranica.vue')},
    {path: '/prijava_administrator', component: () => import ('./components/prijava_administrator.vue')},
    {path: '/aktivnosti_stranica', component: () => import ('./components/aktivnosti_stranica.vue')},
    {path: '/planinarenje_stranica', component: () => import ('./components/planinarenje_stranica.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.component('/', pocetna_stranica);
app.component('prijava_stranica', prijava_stranica);
app.component('registracija_stranica', registracija_stranica);
app.component('prijava_administrator', prijava_administrator);
app.component('aktivnosti_stranica', aktivnosti_stranica);
app.component('planinarenje_stranica', planinarenje_stranica);

app.use(router);
app.mount('#app');
