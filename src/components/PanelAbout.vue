<template lang="html">
	<div>
		<div class="row-fluid">
			<aside class="col-xs-3">
				<sideMenu></sideMenu>
			</aside>

			<div class="col-xs-9">
				<h3>Sobre</h3>
			</div>
			<div class="col-xs-9">
				<div class="col-xs-8 row">
					<form class="form-horizontal" v-on:submit.prevent>
						<legend>Banner inicial, informe os dados</legend>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Título</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" v-model="title">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Sub-Título</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" v-model="subTitle">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Botão Texto</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="Label" v-model="btnText">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Botão URL</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="#/desafio" v-model="btnURL">
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-10 col-lg-offset-2">
								<button v-show="edit == false" :class="{'disabled': title == '' || subTitle == ''}" type="submit" class="btn btn-primary" v-on:click="sendDataInfo()">Salvar</button>
								<button v-show="edit == true" :class="{'disabled': title == '' || subTitle == ''}" type="submit" class="btn btn-warning" v-on:click="sendEditInfo(editKey)">Salvar alterações</button>
							</div>
						</div>
					</form>
				</div>
				<div class="col-xs-8 row">
					<legend>Informações exibidas</legend>
					<div class="form-group">
					<div v-if="loading==true">
							<loading :height="30" :width="30"></loading>
						</div>
						<ul class="list-unstyled animated fadeIn" v-for="(info, index) in infos" :index="index">
							<li>
								<h5>Título</h5>
								<p>{{info.title}}</p>
							</li>
							<li>
								<h5>Sub-Título</h5>
								<p>{{info.subtitle}}</p>
							</li>
							<li>
								<h5>Botão</h5>
								<p>
									<button class="btn btn-md disabled">{{info.btntext}}</button>
								</p>
								<p>URL botão: {{info.btnurl}}</p>
							</li>
							<li>
								<button :index="index" type="button" class="btn btn-xs btn-primary" v-on:click="editInfo(index)">
									<i class="fa fa-pencil" aria-hidden="true"></i>
								</button>
								<button :index="index" v-on:click="editKey = index" type="button" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#removeInfo">
									<i class="fa fa-trash" aria-hidden="true"></i>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="removeInfo" tabindex="-1" role="dialog" aria-labelledby="removeInfo">
			<div class="modal-dialog modal-md" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="myModalLabel">Atenção</h4>
					</div>
					<div class="modal-body">
						<h5>Deseja mesmo remover estas informações?</h5>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Não</button>
						<button type="button" :editkey="editKey" class="btn btn-danger btn-sm" v-on:click="removeInfo(editKey)" data-dismiss="modal" aria-label="Close">Desejo remover</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Firebase from 'firebase'
	import {config} from '../firebase.js'
	import sideMenu from './SideMenu.vue'
	import loading from '../components/Loading.vue'

	export default {
		name: 'panelAbout',
		data() {
			return {
				title: '',
				subTitle: '',
				btnText: '',
				btnURL: '',
				edit: false,
				editKey: '',
				infos: {},
				loading: true
			}
		},
		components:{
			'sideMenu': sideMenu,
			'loading': loading
		},
		mounted() {
			var vm = this;
			setTimeout(function() {
				vm.loadDataInfo();
			}, 450)
		},
		methods: {
			reset: function() {
				this.title = '';
				this.subTitle = '';
				this.btnText = '';
				this.btnURL = '';
				this.editKey = '';
			},
			editInfo: function(index) {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/about/'+index+'.json?auth='+config.auth,
					method: 'GET'
				})
				.done(function(data) {
					vm.title = data.title;
					vm.subTitle = data.subtitle;
					vm.btnText = data.btntext;
					vm.btnURL = data.btnurl;
					vm.edit = true;
					vm.editKey = index;
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			removeInfo: function(index) {
				var vm = this;			
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/about/'+index+'.json?auth='+config.auth,
					method: 'DELETE'
				})
				.done(function(data) {
					console.log('success', data);
					vm.$toasted.show('Informações deletadas com sucesso!');
					vm.loadDataInfo();
					vm.edit = false;
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			sendDataInfo: function() {
				var vm = this;
				let data = {
					title: vm.title,
					subtitle: vm.subTitle,
					btntext: vm.btnText,
					btnurl: vm.btnURL
				}	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/about.json?auth='+config.auth,
					method: 'POST',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data) 
					vm.$toasted.show('Informações salvas com sucesso!');
					vm.loadDataInfo();
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});

			},
			sendEditInfo: function(index) {
				var vm = this;
				let data = {
					title: vm.title,
					subtitle: vm.subTitle,
					btntext: vm.btnText,
					btnurl: vm.btnURL
				}	
				
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/about/'+index+'.json?auth='+config.auth,
					method: 'PATCH',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data)
					vm.edit = false;
					vm.$toasted.show('Informações editadas com sucesso!');
					vm.loadDataInfo();
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			loadDataInfo: function() {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/about.json?auth='+config.auth,
					method: 'GET'
				})
				.done(function(data) {
					vm.infos = data;
					vm.reset();
					vm.loading = false;
					//vm.keys = Object.keys(data)
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
