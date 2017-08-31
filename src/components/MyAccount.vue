<template lang="html">
	<div>
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
						<label for="" class="col-lg-2 control-label">Imagem</label>
						<div class="col-lg-10">
							<input type="text" class="form-control" disabled="disabled" id="" placeholder="url imagem" v-model="urlImage">
						</div>
					</div>
					<div class="form-group" v-if="urlImage == ''">
						<label for="" class="col-lg-2 control-label">Imagem</label>
						<div class="col-lg-8">
							<input type="file" class="form-control" id="upImage" v-on:change="loadImage">
						</div>
						<div class="col-xs-2">
							<div v-if="loadingImg==true">
								<loading :height="30" :width="30"></loading> {{porcentagem}}
							</div>
						</div>
					</div>
					<div class="box-preview-img form-group" v-if="urlImage != ''">
						<label for="" class="col-lg-2 control-label">Preview Imagem</label>
						<div class="col-lg-8">
							<img :src="urlImage" alt="" class="img-circle" style="height: 30px; width: auto">
							<button type="button" :pathUrl="pathUrl" v-on:click="pathUrl = pathUrl" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#removeImg">
								<i class="fa fa-trash" aria-hidden="true"></i>
							</button>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-10 col-lg-offset-2">
							<button v-show="edit == false" :disabled="accEmail == '' || accName == ''" type="submit" class="btn btn-primary" v-on:click="sendDataAccount()">Salvar</button>
							<button v-show="edit == true" :editkey="editKey" :disabled="accEmail == '' || accName == '' || urlImage == ''" type="submit" class="btn btn-warning" v-on:click="sendEditAccount(editKey)">Salvar alterações</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-xs-8 row">
				<legend>Contas Cadastradas</legend>
				<div class="form-group">
					<div v-if="loading==true">
						<loading :height="30" :width="30"></loading>
					</div>
					<ul class="list-unstyled animated fadeIn" v-for="(user, index) in users">
						<li>
							<img :src="user.urlImage" class="img-circle" style="height: 30px; width: auto">
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

		<div class="modal fade" id="removeImg" tabindex="-1" role="dialog" aria-labelledby="removeImg">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Atenção</h4>
					</div>
					<div class="modal-body">
						<h5>Deseja mesmo remover esta imagem?</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Não</button>
						<button type="button" :pathUrl="pathUrl" class="btn btn-danger btn-sm" v-on:click="removeImg(pathUrl)" data-dismiss="modal" aria-label="Close">Desejo remover</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Firebase from 'firebase'
	import {config} from '../firebase.js'
	import loading from '../components/Loading.vue'

	export default {
		name: 'myAccount',
		data () {
			return {
				accName: '',
				accEmail: '',
				username: '',
				edit: false,
				editKey: '',
				users: [],
				gallery: [],
				loading: true,
				loadingImg: false,
				porcentagem: '',
				bucket: '',
				urlImage: '',
				pathUrl: ''
			}
		},
		components: {
			'loading': loading
		},
		created() {
			const storageRef = Firebase.storage().ref();
			this.bucket = storageRef;
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.loadDataAccount();
			}, 450);
		},
		methods: {
			reset: function() {
				this.accEmail = '';
				this.urlImage = '';
				this.accName = '';
				this.editKey = '';
				this.pathUrl = '';
				this.urlImage = '';
				this.porcentagem = '';
			},
			loadImage: function(e) {
				var vm = this;
				let file = e.target.files[0] || e.dataTransfer.files[0]
				let uploadTask = this.bucket.child('minhaconta/'+file.name).put(file);
				uploadTask.on('state_changed', function(snapshot) {
					console.log(snapshot)
					vm.loadingImg = true;
					vm.pathUrl = snapshot.ref.fullPath;
					vm.porcentagem = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				}, function(error) {
					vm.$toasted.show('Erro no upload :(');
				}, function() {
					vm.urlImage = uploadTask.snapshot.downloadURL;
					vm.loadingImg = false;
					vm.$toasted.show('Upload completo!');
					$('#upImage').val('');
					vm.$root.$emit('uploadImg', vm.urlImage);
				});
			},
			removeImg: function(path) {
				var vm = this;
				let deleteTask = this.bucket.child(path)
				deleteTask.delete().then(function() {
					vm.$toasted.show('Imagem deletada!');
					vm.urlImage = '';
					vm.pathUrl = '';
				}).catch(function(error) {
					vm.$toasted.show('Erro na remoção da imagem! :(');
					vm.urlImage = '';
					vm.pathUrl = '';
				});
			},
			editAccount: function(index) {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json?auth='+config.auth,
					method: 'GET'
				})
				.done(function(data) {
					console.log(data)
					vm.accEmail = data.email;
					vm.urlImage = data.urlImage;
					vm.pathUrl = data.pathUrl;
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
					urlImage: vm.urlImage,
					name: vm.accName,
					pathUrl: vm.pathUrl
				}	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json?auth='+config.auth,
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
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users/'+index+'.json?auth='+config.auth,
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
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json?auth='+config.auth,
					method: 'GET'
				})
				.done(function(data) {
					vm.users = data;
					vm.reset();
					vm.loading = false;
					//vm.$parent.$children[0].loadDataAccount()
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
					urlImage: vm.urlImage,
					name: vm.accName,
					pathUrl: vm.pathUrl
				}				

				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json?auth='+config.auth,
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
