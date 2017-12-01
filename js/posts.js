var idPost = location.hash.split("#")[1];
var dataPost,
	nicknamePublisher;
$(document).ready(function(){

	nodeApiManager.show("posts", idPost)
		.done(function(response){
			console.log(response);
			console.log("============SHOW==========================")
			dataPost = response;

			nodeApiManager.show("users", dataPost["user_id"])
			.done(function(response){
				console.log("======================================")
				console.log(response)
				console.log("======================================")
				nicknamePublisher = response["nickname"];
				mostrarDatos();
				cargarComments();
			}).fail(function(response){
				console.log("-----------FALLO----------")
			})

		})
		.fail(function(response){
			console.log(response);
		});

});

function mostrarDatos(){
	var titleElement 		= document.getElementsByTagName('h1')[0],
		publisherElement 	= document.getElementById('publisher'),
		postImageElement 	= document.getElementById('postImage'),
		created_atElement	= document.getElementById('created_at'),
		postBodyElement 	= document.getElementById('postBody')
		tagsElement			= document.getElementById('tags');

	titleElement.textContent 	= dataPost["title"];
	publisherElement.textContent = nicknamePublisher;
	publisherElement.href 		= "./../pages/perfil.html#"+dataPost["user_id"];
	created_at.textContent		= "Posteado "+dataPost["created_at"].split("G")[0];
	postBodyElement.textContent = dataPost["body"];
	if(!!dataPost["photo"]){
		postImage.src				= dataPost["photo"];
	}

	tags = dataPost["tags"].slice(0,-1).split(" ");

	$.each(tags, function(index, value){
		tag 			= document.createElement('a');
		tag.textContent = value;
		tag.href 		= "./../pages/busqueda.html?tags_like="+value;
		tagsElement.appendChild(tag);
		if (index+1 < tags.length ){
			var span = document.createElement('span');
			span.textContent = "|";
			tagsElement.appendChild(span);
		}
	});

		// debugger
}

function getNicknamePublisher(user_id){
	var nicknamePublisher;
	nodeApiManager.show("users", user_id)
		.done(function(response){
			console.log(response)
			nicknamePublisher = response["nickname"];
		})
	console.log("nickname")
	console.log(nicknamePublisher);
	return nicknamePublisher;
}

function publishComment(form){

	var data = {};
	data['body']		= form.getElementsByTagName('textarea')[0].value;
	data['post_id'] 	= idPost;
	data['user_id'] 	= JSON.parse(storageApiManager.localGetItem("logueado"))["id"];
	data['created_at'] 	= Date();

	data = JSON.stringify(data);

	nodeApiManager.create("comments", data)
		.done(function(response){
			console.log(response);
			cargarComments();
		})
		.fail(function(response){
			console.log(response);
		});

	form.reset();
	return false;
}

function cargarComments(){
	var data = {};
	data["post_id"] = idPost;

	nodeApiManager.allWithFilter("comments", "post_id", data["post_id"])
		.done(function(response){
			mostrarComments(response);
		})
		.fail(function(response){
			console.log(response);
		});
}

function mostrarComments(comments){
	var divComments = document.getElementById('divComments');
	divComments.innerHTML = "";

	for(var i = 0; i<comments.length; i++){
		var divMediaMb_3 	= document.createElement('div'),
			divImgUser 		= document.createElement('img'),
			divMediaBody	= document.createElement('div'),
			anchor			= document.createElement('a'),
			h5	 			= document.createElement('h5'),
			paragraph		= document.createElement('p');

		divMediaMb_3.classList.add('media');
		divMediaMb_3.classList.add('mb-4');
		divImgUser.classList.add('d-flex');
		divImgUser.classList.add('mr-3');
		divImgUser.classList.add('rounded-circle');
		if(comments[i].photo){
			divImgUser.src 	= comments[i].photo;
		}else{
			divImgUser.src 	= "/ObligatorioJar/img/50x50.png";
		}
			
		divImgUser.alt 	= "Foto de perfil de usuario que realizo el comentario";
		divMediaBody.classList.add("media-body");
		anchor.href		= "./../pages/perfil.html#"+comments[i].user_id;
		h5.classList.add('mt-0');
		h5.textContent	= comments[i].nickname;
		paragraph.textContent = comments[i].body;

		anchor.appendChild(h5);
		divMediaBody.appendChild(anchor);
		divMediaBody.appendChild(paragraph);

		divMediaMb_3.appendChild(divImgUser);
		divMediaMb_3.appendChild(divMediaBody);

		divComments.appendChild(divMediaMb_3);
	}
}