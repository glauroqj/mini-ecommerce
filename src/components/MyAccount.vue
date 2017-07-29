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
				<div class="col-xs-6">
					<form class="form-horizontal" v-on:submit.prevent>
						<legend>Gerencie seus dados</legend>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Nome</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="Nome Completo" v-model="accName">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Email</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="accemail" placeholder="E-mail" v-model="accEmail">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Url Imagem</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="url imagem" v-model="imgProfile">
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-10 col-lg-offset-2">
								<button type="submit" class="btn btn-primary" v-on:click="sendDataAccount()">Salvar</button>
							</div>
						</div>
					</form>
				</div>
				<div class="col-xs-6">
					<legend>Contas Cadastradas</legend>
					<div class="form-group">
						<ul class="list-unstyled" v-for="user in users">
							<li>
								<img :src="user.imgprofile" class="img-circle" style="height: 30px; width: auto">
							</li>
							<li>{{user.name}}</li>
							<li>{{user.email}}</li>
							<li class="pull-rigth">
								<button type="button" class="btn btn-sm" v-for="key in keys">edit</button>
							</li>
						</ul>
					</div>
				</div>
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
				accName: '',
				accEmail: '',
				imgProfile: '',
				username: '',
				users: [],
				keys: []
			}
		},
		components: {
			'navBar': navBar,
			'sideMenu': sideMenu
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.user = Firebase.auth().currentUser;
				if ( vm.user ) {
					vm.accEmail = vm.user.email;
					$('#accemail').attr('disabled','')
				}
				vm.loadDataAccount();
			}, 450)
		},
		methods: {
			loadDataAccount: function() {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json',
					method: 'GET'
				})
				.done(function(data) {
					console.log('success', data)
					vm.users = data;
					vm.keys = Object.keys(data)
					console.log(vm.keys)
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});

			},
			sendDataAccount: function() {
				var vm = this;
				let data = {
					email: vm.accEmail,
					imgprofile: vm.imgProfile,
					name: vm.accName
				}				

				$.ajax({
					// url: 'https://portfolio-fe077.firebaseio.com/myaccount/'+username+'/.json',
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json',
					method: 'POST',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data)
					vm.$toasted.show('Usuário criado com sucesso!');
					vm.loadDataAccount();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
					vm.$toasted.show('Usuário não criado :(');
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
