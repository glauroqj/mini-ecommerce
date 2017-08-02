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
					<a class="navbar-brand" href="#/painel-de-controle">
						Área Autenticada - {{ title }}
					</a>
				</div>

				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
							<a href="#/painel-de-controle" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img :src="photo" class="img-circle" style="height: 30px; width: auto"> <span class="caret"></span>
							</a>
							<ul class="dropdown-menu">
								<li><a class="disabled">{{name}}</a></li>
								<li><a href="#/minha-conta">Minha Conta</a></li>
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
	</div>
</template>

<script>
	import Firebase from 'firebase'

	export default {
		name: 'navBar',
		data () {
			return {
				title: '',
				photo: '',
				userId: '',
				name: '',
				email: '',
				user: ''
			}
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.loadDataAccount();
				/*vm.getUser() */
			}, 450);
		},
		methods: {
			loadDataAccount: function() {
				var vm = this;
				vm.user = Firebase.auth().currentUser;
				if (vm.user) {
					vm.userId = vm.user.uid;
					$.ajax({
						url: 'https://portfolio-fe077.firebaseio.com/myaccount/users.json',
						method: 'GET'
					})
					.done(function(data) {
						vm.info = data;
						let key = Object.keys(data);
						key = key[0];
						vm.photo = data[key].imgprofile;
						vm.name = data[key].name;
						vm.title = data[key].name;
						let firstLogin = vm.$ls.get('show_name_user')
						if( firstLogin == false) {
							vm.$toasted.show('Bem-Vindo '+vm.name);
							vm.$ls.set('show_name_user', true);
						}
					})
					.fail(function(xhr) {
						console.log('error', xhr);
					});
				} else {
					/* not user */
				}
			},
			logout: function() {
				this.$ls.set('show_name_user', false);
				Firebase.auth().signOut();
				this.$router.push('/');
			},
			getUser: function() {
				var vm = this;
				this.user = Firebase.auth().currentUser;
				if(this.user) {
					this.name = this.user.displayName;
					this.email = this.user.email; 
					this.photo = this.user.photoURL; 
					this.userId = this.user.uid;
					let firstLogin = this.$ls.get('show_name_user')
					if(this.name == null && firstLogin == false) {
						this.$toasted.show('Bem-Vindo usuário!');
						this.$ls.set('show_name_user', true);
					}
				} 
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
