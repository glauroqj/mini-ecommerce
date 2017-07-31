import Vue from 'vue'
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
{ path: '/painel-de-controle', component: panelControl },
{ path: '/sobre', component: panelAbout },
{ path: '/ensino', component: panelEducation },
{ path: '/skills', component: panelSkills },
{ path: '/portfolio', component: panelPortfolio },
{ path: '/contato', component: panelContact },
{ path: '/minha-conta', component: myAccount }
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
