<template lang="html">
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#/success">
						{{ title }}
					</a>
				</div>

				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#/success" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img :src="photo" class="img-circle" style="height: 30px; width: auto"> <span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li><a href="#/success" class="disabled">{{name}}</a></li>
								<li><a href="#/success">{{email}}</a></li>
								<li role="separator" class="divider"></li>
								<li>
									<a href="/" v-on:click="logout()">Sair</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="row">
			<aside class="col-xs-3">
				<div class="side-menu">
					<ul class="list-group">
						<li class="list-group-item">
							<a href="">Painel de Controle</a>
						</li>
						<li class="list-group-item"></li>
						<li class="list-group-item"></li>
					</ul>
				</div>
			</aside>
			<div class="col-xs-9">
				<h3>Logado</h3>
			</div>
		</div>
	</div>
</template>

<script>
	import Firebase from 'firebase'

	export default {
		name: 'authSuccess',
		data() {
			return {
				title: 'Área Autenticada',
				photo: '',
				userId: '',
				name: '',
				email: '',
				user: {}
			}
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.getUser()
			}, 1000);
		},
		methods: {
			getUser: function() {
				this.user = Firebase.auth().currentUser; 
				if(this.user) { 
					this.name = this.user.displayName; 
					this.email = this.user.email; 
					this.photo = this.user.photoURL; 
					this.userId = this.user.uid;
					if(this.name == null){
						this.$toasted.show('Bem-Vindo usuário!');
					} else {
						this.$toasted.show('Bem-Vindo '+ this.name);
					}
				} 
			},
			logout: function() {
				Firebase.auth().signOut();
				this.$router.push('/')
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
