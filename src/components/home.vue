<template lang="html">
	<div>
		<div class="row">
			<div class="col-xs-12">
				<h2 class="md-title">Home</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<template>
					<p v-for="user of users">
						{{user.name}}
					</p>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	import {db} from '../firebase';
	export default {
		data () {
			return {
				users: {}
			}
		},
		firebase: {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
