<template lang="html">
	<div>
		<div class="col-xs-9">
			<h3>Skills</h3>
		</div>
		<div class="col-xs-9">
			<div class="col-xs-8 row">
				<form class="form-horizontal" v-on:submit.prevent>
					<legend>Especialidades, informe os dados</legend>
					<div class="form-group">
						<label for="" class="col-lg-2 control-label">Linguagem</label>
						<div class="box-skill">
							<div class="col-lg-5">
								<input type="text" class="form-control" id="" placeholder="html, css , js..." v-model="languageType">
							</div>
							<div class="col-lg-4">
								<input type="text" class="form-control" id="" placeholder="imagem" v-model="languageImg">
							</div>
						</div>
						<div class="col-lg-1">
							<button class="btn btn-xs btn-success" :disabled="languageType == ''" v-on:click="insertLanguage()">+</button>
						</div>
					</div>
					<div class="form-group">
						<div class="box-list col-xs-8">
							<ul class="list-unstyled">
								<li v-for="(item,index) in languages">
									<span>
										<img :src="item.img" :alt="item.img" class="list-img">
									</span>
									<span class="list-language">{{item.type}}</span> 
									<span>
										<button :index="index" class="btn btn-xs btn-danger" v-on:click="removeLanguage(index)">
											<i class="fa fa-trash-o" aria-hidden="true"></i>
										</button>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-10 col-lg-offset-2">
							<button v-if="edit == false" :disabled="languages.length == ''" type="submit" class="btn btn-primary" v-on:click="sendDataInfo()">Salvar</button>
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
							<h5>Linguagens</h5>
							<div v-for="item in info">	
							<p><span v-if="item.img != ''"><img :src="item.img" :alt="item.img" class="list-img"></span> <span>{{item.type}}</span></p>
							</div>
						</li>
						<li>
							<button :index="index" v-on:click="editKey = index" type="button" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#removeInfo">
								<i class="fa fa-trash" aria-hidden="true"></i>
							</button>
						</li>
					</ul>
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
	import loading from '../components/Loading.vue'

	export default {
		name: 'panelSkills',
		data() {
			return {
				languages: [],
				languageType: '',
				languageImg: '',
				edit: '',
				editKey: '',
				loading: true,
				infos: {}
			}
		},
		components:{
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
				this.languageType = '';
				this.languageImg = '';
				this.editKey = ''
			},
			insertLanguage: function () {
				let array = this.languages;
				let data = {
					type: this.languageType,
					img: this.languageImg 
				}
				array.push(data)
				this.reset();
			},
			removeLanguage: function (index) {
				let array = this.languages;
				array.splice(index, 1)
			},
			removeInfo: function(index) {
				var vm = this;			
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/skill/'+index+'.json?auth='+config.auth,
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
			sendDataInfo: function () {
				var vm = this;
				let data = this.languages	
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/skill.json?auth='+config.auth,
					method: 'POST',
					dataType: 'json',
					data: JSON.stringify(data)
				})
				.done(function(data) {
					console.log('success', data) 
					vm.$toasted.show('Informações salvas com sucesso!');
					vm.loadDataInfo();
					vm.reset();
					vm.languages = []
				})
				.fail(function(xhr) {
					console.log('error', xhr);
				});
			},
			loadDataInfo: function() {
				var vm = this;
				$.ajax({
					url: 'https://portfolio-fe077.firebaseio.com/skill.json?auth='+config.auth,
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
	.box-list {

	}
	.box-list li {
		margin-bottom: 5px;
	}
	.list-img {
		height: auto;
		max-width: 30px;
		max-height: 30px;
	}
	.list-language {
		margin-left: 5px;
		font-size: 14px;
	}
</style>
