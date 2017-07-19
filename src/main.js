import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './assets/css/main.css'
import Login from './components/login.vue'
import Categories from './components/categories.vue'
import Products from './components/products.vue'


Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [ 
{ path: '/login', component: Login },
{ path: '/products', component: Products }, 
{ path: '/categories', component: Categories }
]

const router = new VueRouter({
	routes
});

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
