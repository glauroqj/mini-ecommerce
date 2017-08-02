import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import {config} from './firebase.js'
import Toasted from 'vue-toasted'
import VueLocalStorage from 'vue-ls';

import './assets/css/template.css'
import './assets/css/main.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

import navBar from './components/NavBar.vue'
import login from './components/Login.vue'
import panelControl from './components/PanelControl.vue'
import panelAbout from './components/PanelAbout.vue'
import panelEducation from './components/PanelEducation.vue'
import panelSkills from './components/PanelSkills.vue'
import panelPortfolio from './components/PanelPortfolio.vue'
import panelContact from './components/PanelContact.vue'
import sideMenu from './components/SideMenu.vue'
import myAccount from './components/MyAccount.vue'

Vue.use(VueRouter)
Vue.use(VueFire)
Vue.use(Vuex)

var Options = {
	theme: 'primary',
	position: 'top-right',
	duration: 3000
}
Vue.use(Toasted, Options)

var vuelocalstorage_options = {
	namespace: 'vuejs__'
};
Vue.use(VueLocalStorage, vuelocalstorage_options);

Vue.config.productionTip = false

const routes = [ 
{ path: '/', component: login },
{ path: '/painel-de-controle', auth: true, component: panelControl },
{ path: '/sobre', auth: true, component: panelAbout },
{ path: '/ensino', auth: true, component: panelEducation },
{ path: '/skills', auth: true, component: panelSkills },
{ path: '/portfolio', auth: true, component: panelPortfolio },
{ path: '/contato', auth: true, component: panelContact },
{ path: '/minha-conta', auth: true, component: myAccount }
]

const router = new VueRouter({
	routes
});

const store = new Vuex.Store({
	state: {
		navbar: ''
	},
	mutations: {
		verifyUser(state, value) {
			var vm = this;
			state.navbar = value;
		}
	},
	getters: {
		stateUser() {
			return 'olar'
		}
	}
});

/* eslint-disable no-new */
new Vue({
	router,
	store,
	data () {
		return {
		}
	},
	created() {
		Firebase.initializeApp(config);
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$router.push('/painel-de-controle')
			} else {
				this.$router.push('/')
			}
		});
	},
	render: h => h(App)
}).$mount('#app')