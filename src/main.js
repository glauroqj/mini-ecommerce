import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import {config} from './firebase.js'
import Toasted from 'vue-toasted'

import './assets/css/template.css'
import './assets/css/template.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

import login from './components/Login.vue'
import panelControl from './components/PanelControl.vue'
import sideMenu from './components/SideMenu.vue'


Vue.use(VueRouter)
Vue.use(VueFire)
var Options = {
	theme: 'primary',
	position: 'top-right',
	duration: 3000
}
Vue.use(Toasted, Options)

Vue.config.productionTip = false

const routes = [ 
{ path: '/', component: login },
{ path: '/painel-de-controle', component: panelControl }
]

const router = new VueRouter({
	routes
});

/* eslint-disable no-new */
new Vue({
	router,
	created() {
		Firebase.initializeApp(config);
		Firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				this.$router.push('/painel-de-controle')
			} else {
				this.$router.push('/')
			}
		});
	},
	render: h => h(App)
}).$mount('#app')
