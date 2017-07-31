<template lang="html">
	<div>
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<h2 class="md-title">Login</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-4">
					<form v-on:submit.prevent>
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
	</div>
</template>

<script>
	import Firebase from 'firebase'
	import Firebaseui from 'firebaseui'
	import {config} from '../firebase.js'

	export default {
		name: 'login',
		data () {
			return {
				email: '',
				password: ''
			}
		},
		mounted() {
			var uiConfig = {
				signInSuccessUrl: '',
				signInOptions: [
				Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				Firebase.auth.EmailAuthProvider.PROVIDER_ID
				]
			};
			var ui = new Firebaseui.auth.AuthUI(Firebase.auth());
			ui.start('#firebaseui-auth-container', uiConfig);
		},
		methods: {
			sendLogin: function() {
				var vm = this;
				Firebase.auth().signInWithEmailAndPassword(vm.email, vm.password).catch(function(error) {
					if ( !error.code ) {

					} else {
						vm.$toasted.show('Login/Senha inválidos! :(')
					}
					var errorCode = error.code;
					var errorMessage = error.message;
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
