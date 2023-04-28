import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
const vuetify = createVuetify({
    components,
    directives,
});

app.use(router);
app.use(vuetify);
app.mount('#app');
