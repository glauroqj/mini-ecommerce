<template lang="html">
	<div>
		<div class="row">
			<div class="col-md-offset-2 col-md-4 box-login">
				<div class="panel panel-default">
					<div class="panel-heading text-center">
						<h3><i class="fa fa-lock" aria-hidden="true"></i> Login</h3>
					</div>
					<div class="panel-body">
						<div class="">
							<form method="post" autocomplete="on" v-on:submit.prevent>
								<div class="form-group">
									<label>E-mail</label>
									<input type="email" name="Email" class="form-control" id="" v-model="email">
								</div>
								<div class="form-group">
									<label>Senha</label>
									<input type="password" name="Password" class="form-control" id="" v-model="password">
								</div>
								<button :disabled="email == '' && password == ''" type="submit" class="btn btn-success" v-on:click="sendLogin()">entrar</button>
							</form>
						</div>
					</div>
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
			/*
			var uiConfig = {
				signInSuccessUrl: '',
				signInOptions: [
				Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				Firebase.auth.EmailAuthProvider.PROVIDER_ID
				]
			};
			var ui = new Firebaseui.auth.AuthUI(Firebase.auth());
			ui.start('#firebaseui-auth-container', uiConfig);
			*/
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
	.box-login {
		margin-top: 15%;
	}
</style>
