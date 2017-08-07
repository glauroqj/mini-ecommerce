<template lang="html">
	<div>
		<div class="row-fluid">
			<aside class="col-xs-3">
				<sideMenu></sideMenu>
			</aside>

			<div class="col-xs-9">
				<h3>Ensino</h3>
			</div>
			<div class="col-xs-9">
				<div class="col-xs-8 row">
					<form class="form-horizontal" v-on:submit.prevent>
						<legend>Informe seus dados escolares</legend>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Graduação</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="Engenharia" v-model="graduation">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Instituição</label>
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="Una" v-model="school">
							</div>
						</div>
						<div class="form-group">
							<label for="" class="col-lg-2 control-label">Duração</label>
							<div class="col-lg-6">
								<input type="text" class="form-control" id="" placeholder="5 anos" v-model="duration">
							</div>
							<div class="col-lg-4 form-inline">
								<div class="radio">
									<label>
										<input type="radio" name="optionsRadios" id="optionsRadios1" value="cursando" v-model="coursestatus">
										Cursando
									</label>
								</div>
								<div class="radio">
									<label>
										<input type="radio" name="optionsRadios" id="optionsRadios1" value="graduado" v-model="coursestatus">
										Já Graduado
									</label>
								</div>
							</div>
						</div>
						<div class="form-group">
							<div class="col-lg-10 col-lg-offset-2">
								<button v-if="edit == false" :class="{'disabled': graduation == '' || school == ''}" type="submit" class="btn btn-primary" v-on:click="sendDataInfo()">Salvar</button>
								<button v-if="edit == true" :class="{'disabled': graduation == '' || school == ''}" type="submit" class="btn btn-warning" v-on:click="sendEditInfo(editKey)" v-on:keyup.enter.native="sendEditInfo(editKey)">Salvar alterações</button>
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
								<h5>Graduação</h5>
								<p>{{info.graduation}}</p>
							</li>
							<li>
								<h5>Instituição</h5>
								<p>{{info.school}}</p>
							</li>
							<li>
								<h5>Duração</h5>
								<ul class="list-inline">
									<li><p>{{info.duration}}</p></li>
									<li><p class="label label-success">{{info.coursestatus}}</p></li>
								</ul>
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
		name: 'panelEducation',
		data() {
			return {
				graduation: '',
				school: '',
				duration: '',
				coursestatus: '',
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
				this.graduation = '';
				this.school = '';
				this.duration = '';
				this.coursestatus = '';
				this.editKey = '';
			},
			sendDataInfo: function() {
				var vm = this;
				let data = {
					graduation: vm.graduation,
					school: vm.school,
					duration: vm.duration,
					coursestatus: vm.coursestatus
				}	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/education.json?auth='+config.auth,
					method: 'POST',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data) 
					vm.$toasted.show('Informações salvas com sucesso!');
					vm.loadDataInfo();
					vm.reset();
					vm.loading = false
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});

			},
			editInfo: function(index) {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/education/'+index+'.json?auth='+config.auth,
					method: 'GET'
				})
				.done(function(data) {
					vm.graduation = data.graduation,
					vm.school = data.school,
					vm.duration = data.duration,
					vm.coursestatus = data.coursestatus
					vm.edit = true;
					vm.editKey = index;
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			sendEditInfo: function(index) {
				var vm = this;
				let data = {
					graduation: vm.graduation,
					school: vm.school,
					duration: vm.duration,
					coursestatus: vm.coursestatus
				}	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/education/'+index+'.json?auth='+config.auth,
					method: 'PATCH',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					vm.$toasted.show('Informações editadas com sucesso!');
					vm.edit = false;
					vm.loadDataInfo();
					vm.reset();
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			removeInfo: function(index) {
				var vm = this;			
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/education/'+index+'.json?auth='+config.auth,
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
			loadDataInfo: function() {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/education.json?auth='+config.auth,
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
.list-unstyled  {
	border-bottom: 1px solid #cecece;
	padding-bottom: 15px;
}
</style>
