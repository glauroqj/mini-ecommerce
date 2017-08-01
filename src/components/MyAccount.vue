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
			<div class="col-xs-9">
				<div class="col-xs-8 row">
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
								<input type="email" class="form-control" id="accemail" placeholder="E-mail" v-model="accEmail">
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
								<button v-show="edit == false" :class="{'disabled': accEmail == '' || accName == ''}" type="submit" class="btn btn-primary" v-on:click="sendDataAccount()">Salvar</button>
								<button v-show="edit == true" :editkey="editKey" :class="{'disabled': accEmail == '' || accName == ''}" type="submit" class="btn btn-warning" v-on:click="sendEditAccount(editKey)">Salvar alterações</button>
							</div>
						</div>
					</form>
				</div>
				<div class="col-xs-8 row">
					<legend>Contas Cadastradas</legend>
					<div class="form-group">
						<ul class="list-unstyled animated fadeIn" v-for="(user, index) in users">
							<li>
								<img :src="user.imgprofile" class="img-circle" style="height: 30px; width: auto">
							</li>
							<li>{{user.name}}</li>
							<li>{{user.email}}</li>
							<li>
								<button :index="index" type="button" class="btn btn-xs btn-primary" v-on:click="editAccount(index), editKey = index">
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</button>
								<button :index="index" v-on:click="editKey = index" type="button" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#removeUser">
									<i class="fa fa-trash" aria-hidden="true"></i>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="removeUser" tabindex="-1" role="dialog" aria-labelledby="removeUser">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Atenção</h4>
					</div>
					<div class="modal-body">
						<h5>Deseja mesmo remover este usuário?</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Não</button>
						<button type="button" :editkey="editKey" class="btn btn-danger btn-sm" v-on:click="removeAccount(editKey)" data-dismiss="modal" aria-label="Close">Desejo remover</button>
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
				edit: false,
				editKey: '',
				users: []
			}
		},
		components: {
			'navBar': navBar,
			'sideMenu': sideMenu
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.loadDataAccount();
			}, 450)
		},
		methods: {
			reset: function() {
				this.accEmail = '';
				this.imgProfile = '';
				this.accName = '';
				this.editKey = '';
			},
			editAccount: function(index) {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json',
					method: 'GET'
				})
				.done(function(data) {
					console.log(data)
					vm.accEmail = data.email;
					vm.imgProfile = data.imgprofile;
					vm.accName = data.name;
					vm.edit = true;
					vm.editKey = index;
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			sendEditAccount: function(index) {
				var vm = this;
				let data = {
					email: vm.accEmail,
					imgprofile: vm.imgProfile,
					name: vm.accName
				}	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json',
					method: 'PATCH',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data)
					vm.edit = false;
					vm.$toasted.show('Usuário editado com sucesso!');
					vm.loadDataAccount();
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			removeAccount: function(index) {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json',
					method: 'DELETE'
				})
				.done(function(data) {
					console.log('success', data);
					vm.$toasted.show('Usuário removido com sucesso!');
					vm.loadDataAccount();
					vm.edit = false;
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			loadDataAccount: function() {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json',
					method: 'GET'
				})
				.done(function(data) {
					vm.users = data;
					vm.reset();
					//vm.keys = Object.keys(data)
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
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json',
					method: 'POST',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					vm.$toasted.show('Usuário criado com sucesso!');
					vm.loadDataAccount();
					vm.reset();
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
