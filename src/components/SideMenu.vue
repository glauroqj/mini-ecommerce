<template lang="html">
	<div>
		<div class="side-menu">
			<ul class="list-group">
				<li class="list-group-item" v-for="list in lists">
					<a :href="list.link" :class="{'active': list.link == route}">{{list.title}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'sideMenu',
		data () {
			return {
				lists: [
				{title: 'Painel de Controle', link: '#/painel-de-controle'},
				{title: 'Sobre', link: '#/sobre'},
				{title: 'Ensino', link: '#/ensino'},
				{title: 'Skills', link: '#/skills'},
				{title: 'Portfolio', link: '#/portfolio'},
				{title: 'Contato', link: '#/contato'}
				],
				route: ''
			}
		},
		mounted() {
			this.route = '#'+this.$route.path;
		},
		methods: {
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
