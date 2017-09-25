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
							<div class="col-lg-10">
								<input type="text" class="form-control" id="" placeholder="html, css , js..." v-model="languageType">
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<label for="" class="col-lg-2 control-label">URL</label>
						<div class="col-lg-10">
							<input type="text" class="form-control" disabled="disabled" id="" placeholder="url imagem" v-model="urlImage">
						</div>
					</div>

					<div class="form-group">
						<label for="" class="col-lg-2 control-label">Inserir IMG</label>
<!-- 						<div class="col-lg-8">
							<input type="file" class="form-control" id="upImage" v-on:change="loadImage">
						</div> -->
						<div class="col-lg-8">
							<dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="uploadSuccess">
								<!-- Optional parameters if any! -->
								<input type="hidden" name="token" value="xxx">
							</dropzone>
						</div>
						<div class="col-xs-2">
							<div v-if="loadingImg==true">
								<loading :height="30" :width="30"></loading> {{porcentagem}}
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-6">
							<button class="btn btn-sm btn-success" :disabled="languageType == ''" v-on:click="insertLanguage()">Adicionar Skill</button>
						</div>
					</div>

					<div class="box-preview-img form-group" v-if="images.length != ''">
						<label for="" class="col-lg-2 control-label">Preview Imagem</label>
						<div class="col-lg-8">
							<ul class="list-inline">
								<li v-for="(image,index) in images">
									<img :src="image.src" alt="" class="img-circle" style="height: 30px; width: auto">
									<button type="button" :numimage="index" :pathUrl="image.path" v-on:click="pathUrl = image.path, numimage = index" class="btn btn-xs btn-danger" data-toggle="modal" data-target="#removeImg">
										<i class="fa fa-trash" aria-hidden="true"></i>
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div class="form-group">
						<div class="box-list col-xs-8">
							<ul class="list-unstyled">
								<li v-for="(item,index) in languages">
									<span>
										<img :src="item.urlImage" :alt="item.urlImage" class="list-img">
									</span>
									<span class="list-language">{{item.type}}</span> 
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
								<p>
									<span v-if="item.img != ''">
										<img :src="item.urlImage" :alt="item.urlImage" class="list-img">
									</span> 
									<span>{{item.type}}</span>
								</p>
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
						<button type="button" :pathUrl="pathUrl" :numimage="numimage" class="btn btn-danger btn-sm" v-on:click="removeImg(pathUrl, numimage)" data-dismiss="modal" aria-label="Close">Desejo remover</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
 /*
	multi upload on firebase
	https://gist.github.com/mcdonamp/d4f1327b58ad69334ef06327184df790
	*/
	import Firebase from 'firebase'
	import {config} from '../firebase.js'
	import Dropzone from 'vue2-dropzone'
	import loading from '../components/Loading.vue'

	export default {
		name: 'panelSkills',
		data() {
			return {
				languages: [],
				images: [],
				languageType: '',
				edit: '',
				editKey: '',
				loading: true,
				loadingImg: false,
				urlImage: '',
				pathUrl: '',
				numimage: '',
				porcentagem: '',
				bucket: '',
				infos: {}
			}
		},
		components:{
			'loading': loading,
			'Dropzone': Dropzone
		},
		created() {
			const storageRef = Firebase.storage().ref();
			this.bucket = storageRef;
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
				this.editKey = ''
				this.pathUrl = '';
				this.urlImage = '';
				this.porcentagem = '';
			},
			uploadSuccess: function(e) {
				/* called a function to upload firebase */
				this.loadImage(e)
			},
			loadImage: function(e) {
				var vm = this;
				console.log(e)
				// let file = e.target.files[0] || e.dataTransfer.files[0];
				let file = e;
				let uploadTask = this.bucket.child('skills/'+file.name).put(file);
				uploadTask.on('state_changed', function(snapshot) {
					console.log(snapshot)
					vm.loadingImg = true;
					vm.pathUrl = snapshot.ref.fullPath;
					vm.porcentagem = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				}, function(error) {
					vm.$toasted.show('Erro no upload :(');
				}, function() {
					vm.urlImage = uploadTask.snapshot.downloadURL;
					let infoIMG = { src: vm.urlImage, path: vm.pathUrl }
					vm.images.push(infoIMG);
					vm.loadingImg = false;
					vm.$toasted.show('Upload completo!');
					$('#upImage').val('');
				});
			},
			removeImg: function(path, index) {
				console.log(path, index)
				var vm = this;
				let deleteTask = this.bucket.child(path)
				deleteTask.delete().then(function() {
					vm.$toasted.show('Imagem deletada!');
					vm.images.splice(index, 1);
				}).catch(function(error) {
					vm.$toasted.show('Erro na remoção da imagem! :(');
				});
			},
			insertLanguage: function () {
				let array = this.languages;
				let data = {
					type: this.languageType,
					pathUrl: this.pathUrl,
					urlImage: this.urlImage
				}
				array.push(data)
				// this.reset();
			},
			removeLanguage: function (index, path) {
				let array = this.languages;
				array.splice(index, 1);
				this.removeImg(path);
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
					/* delete folder */
					let deleteTask = vm.bucket.child('skills');
					console.log(deleteTask)
					deleteTask.delete().then(function() {
						vm.$toasted.show('Imagem deletada!');
					}).catch(function(error) {
						vm.$toasted.show('Erro ao deletar pasta! :(');
					});
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
