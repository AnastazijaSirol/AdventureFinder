import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import prijava_stranica from './components/prijava_stranica.vue';
import registracija_stranica from './components/registracija_stranica.vue';
import aktivnosti_stranica from './components/aktivnosti_stranica.vue';

const routes=[
    {path: '/', component: HelloWorld},
    {path: '/prijava_stranica', component: () => import ('./components/prijava_stranica.vue')},
    {path: '/registracija_stranica', component: () => import ('./components/registracija_stranica.vue')},
    {path: '/aktivnosti_stranica', component: () => import ('./components/aktivnosti_stranica.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.component('prijava_stranica', prijava_stranica);
app.component('/', HelloWorld);
app.component('registracija_stranica', registracija_stranica);
app.component('aktivnosti_stranica', aktivnosti_stranica);

app.use(router);
app.mount('#app');
