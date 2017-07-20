<template lang="html">
	<div>
		<div class="row">
			<div class="col-xs-12">
				<h2 class="md-title">Login</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-4">
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">Email address</label>
						<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" v-model="email">
					</div>
					<div class="form-group">
						<label for="exampleInputPassword1">Password</label>
						<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
					</div>
					<button type="submit" class="btn btn-success" v-on:click="sendLogin()">Submit</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data () {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			sendLogin: function() {
				var vm = this;
				console.log(vm.email, vm.password)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
