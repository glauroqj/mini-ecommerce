<template lang="html">
	<div>
		<navBar></navBar>
		<div class="row-fluid">
			<aside class="col-xs-3">
				<sideMenu></sideMenu>
			</aside>
			<div class="col-xs-9">
				<h3>Minha Conta</h3>
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
	import navBar from './NavBar.vue'
	import Firebase from 'firebase'
	import sideMenu from './SideMenu.vue'

	export default {
		name: 'myAccount',
		data () {
			return {

			}
		},
		components: {
			'navBar': navBar,
			'sideMenu': sideMenu
		},
		mounted() {

		},
		methods: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
