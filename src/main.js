import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import {config} from './firebase.js'
import Toasted from 'vue-toasted'
import VueLocalStorage from 'vue-ls'

import './assets/css/template.css'
import './assets/css/main.css'
import './assets/js/jquery.min.js'
import './assets/js/bootstrap.min.js'

import navBar from './components/NavBar.vue'
import loading from './components/Loading.vue'
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
{ path: '/minha-conta', auth: true, component: myAccount },
{ path: '*', redirect: '/painel-de-controle' }
]

const router = new VueRouter({
	routes
});


/*store*/
const SHOW_NAVBAR = 'SHOW_NAVBAR';
const HIDE_NAVBAR = 'HIDE_NAVBAR';
const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const HIDE_MENU = 'HIDE_MENU'
const SHOW_MENU = 'SHOW_MENU'
const store = new Vuex.Store({
	state: {
		isLoggedIn: !!localStorage.getItem('token'),
		menuChange: '',
		statusnavbar: false
	},
	mutations: {
		[SHOW_NAVBAR] (state) {
			state.statusnavbar = true;
		},
		[HIDE_NAVBAR] (state) {
			state.statusnavbar = false;
		},
		[LOGIN] (state) {
			state.pending = true;
		},
		[LOGIN_SUCCESS] (state) {
			state.isLoggedIn = true;
			state.pending = false;
		},
		[LOGOUT] (state) {
			state.isLoggedIn = false;
		},
		[HIDE_MENU] (state) {
			state.menuChange = false;
		},
		[SHOW_MENU] (state) {
			state.menuChange = true;
		}
	},
	actions: {
		showNavbar({ commit }) {
			commit(SHOW_NAVBAR);
		},
		hideNavbar({ commit }) {
			commit(HIDE_NAVBAR);
		},
		login({ commit }, creds) {
			commit(LOGIN); // show spinner
			return new Promise(resolve => {
				setTimeout(() => {
					localStorage.setItem('token', 'JWT');
					commit(LOGIN_SUCCESS);
					resolve();
				}, 1000);
			});
		},
		logout({ commit }) {
			localStorage.removeItem('token');
			commit(LOGOUT);
		},
		menuHide({commit}) {
			commit(HIDE_MENU)
		},
		menuShow({commit}) {
			commit(SHOW_MENU)
		}
	},
	getters: {
		statusnavbar: state => {
			return state.statusnavbar
		},
		isLoggedIn: state => {
			return state.isLoggedIn
		},
		menuChange: state => {
			return state.menuChange
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
	},
	render: h => h(App)
}).$mount('#app')