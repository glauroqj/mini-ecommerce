<template lang="html">
	<div>
		<div class="row-fluid">
			<aside class="col-xs-3">
				<sideMenu></sideMenu>
			</aside>
			<div class="col-xs-9">
				<h3>Lista itens menu</h3>
			</div>
			<div class="col-xs9">
				<ul class="list-inline">
					<li>
						<button class="btn btn-md btn-success" v-on:click="showMenu()">Ativar</button>
					</li>
					<li>
						<button class="btn btn-md btn-danger" v-on:click="hideMenu()">Desativar</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Firebase from 'firebase'
	import sideMenu from './SideMenu.vue'

	export default {
		name: 'panelControl',
		components:{
			'sideMenu': sideMenu
		},
		data() {
			return {
				statusMenu: ''
			}
		},
		computed: {
			menuChange: function() {
				return this.$store.getters.menuChange;
			}
		},
		mounted() {
			this.statusMenu = this.menuChange
		},
		methods: {
			hideMenu: function() {
				this.$store.dispatch('menuHide');
			},
			showMenu: function() {
				this.$store.dispatch('menuShow');
			},
			listItens: function() {
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/home/navbar.json',
					method: 'GET'
				})
				.done(function(data) {
					console.log('success', data) 
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
