import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import prijava_stranica from './components/prijava_stranica.vue';

const routes=[
    {path: '/', component: HelloWorld},
    {path: '/prijava_stranica', component: () => import ('./components/prijava_stranica.vue')},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.component('prijava_stranica', prijava_stranica);
app.component('HelloWorld', HelloWorld);
app.use(router);
app.mount('#app');
