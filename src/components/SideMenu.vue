<template lang="html">
	<div v-if="statusMenu == true">
		<div class="side-menu animated fadeInLeft">
			<ul class="list-group">
				<li class="list-group-item" v-for="list in lists">
					<a :href="list.link" :class="{'active': list.link == route}" v-on:click="getRoute()">{{list.title}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Firebase from 'firebase'
	import {config} from '../firebase.js'
	import loading from '../components/Loading.vue'
	
	export default {
		name: 'sideMenu',
		props: {
			statusMenu: Boolean
		},
		data() {
			return {
				lists: [{
					title: 'Painel de Controle',
					link: '#/painel-de-controle'
				},
				{
					title: 'Sobre',
					link: '#/sobre'
				},
				{
					title: 'Ensino',
					link: '#/ensino'
				},
				{
					title: 'Skills',
					link: '#/skills'
				},
				{
					title: 'Portfolio',
					link: '#/portfolio'
				},
				{
					title: 'Contato',
					link: '#/contato'
				}
				],
				route: ''
			}
		},
		computed: {
		},
		watch: {
		},
		mounted() {
		},
		methods: {
			getRoute: function() {
				var vm = this;
				setTimeout(function(){
					vm.route = '#' + vm.$route.path;
				}, 50)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.side-menu li {
		padding: 0px;
	}
	
	.side-menu li>a {
		padding: 15px;
		display: block;
	}
	
	.side-menu li>a.active {
		text-decoration: none;
		background-color: #eee;
		color: #323232;
		padding-left: 20px;
	}
	
	.side-menu li>a:hover {
		text-decoration: none;
		background-color: #eee;
		color: #323232;
		padding-left: 20px;
	}
</style>
