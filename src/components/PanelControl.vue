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
				<ul class="list-unstyled">
					<li></li>
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
		data() {
			return {
			}
		},
		components:{
			'sideMenu': sideMenu
		},
		mounted() {
		},
		methods: {
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
