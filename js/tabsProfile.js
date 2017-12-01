var userProfile, userComments;
getDatosUser();
$(document).ready(function() {
	document.getElementById('stars').addEventListener("click", function(){
		document.getElementById('datosPersonales').classList.add("active");
		document.getElementById('datosPersonales').classList.add("show");
		document.getElementById('misPublicaciones').classList.remove("active");
		document.getElementById('misPublicaciones').classList.remove("show");
		// document.getElementById('misFotos').classList.remove("active");
		// document.getElementById('misFotos').classList.remove("show");
	});
	document.getElementById('favorites').addEventListener("click", function(){
		document.getElementById('misPublicaciones').classList.add("active");
		document.getElementById('misPublicaciones').classList.add("show");
		document.getElementById('datosPersonales').classList.remove("active");
		document.getElementById('datosPersonales').classList.remove("show");
		// document.getElementById('misFotos').classList.remove("active");
		// document.getElementById('misFotos').classList.remove("show");
	});
	// document.getElementById('following').addEventListener("click", function(){
	// 	document.getElementById('misFotos').classList.add("active");
	// 	document.getElementById('misFotos').classList.add("show");
	// 	document.getElementById('misPublicaciones').classList.remove("active");
	// 	document.getElementById('misPublicaciones').classList.remove("show");
	// 	document.getElementById('datosPersonales').classList.remove("active");
	// 	document.getElementById('datosPersonales').classList.remove("show");
	// });
	checkSamePass('password', 'repassword');
});

function getDatosUser(){
	var id;
	if(location.hash.split("#")[1]){
		id = location.hash.split("#")[1];
	}else{
		id = JSON.parse(storageApiManager.localGetItem('logueado')).id;
	}
	nodeApiManager.show("users", id)
		.done(function(response){
			userProfile = response;
			cargarDatosUser();
		})
		.fail(function(response){
			console.log(response);
			showAlert("alertCargarDanger")
		});
	nodeApiManager.busqueda("posts", {"user_id" : id} )
		.done(function(response){
			userComments = response;
			// debugger
			cargarPostsUser(response, 'posts-body');
		})
		.fail(function(response){
			console.log(response);
			showAlert("alertCargarDanger")
		});
}

function cargarDatosUser(){
	console.log("=========CARGARDATOSUER-----------------")
	document.getElementById('nicknameUser').value = userProfile.nickname;
	document.getElementById('nicknameTitle').textContent = userProfile.nickname;
	document.getElementById('nameUser').value = userProfile.name;
	document.getElementById('surnameUser').value = userProfile.surname;
	document.getElementById('emailUser').value = userProfile.email;
	document.getElementById('countryUser').value = userProfile.pais;
	document.getElementById('imgBackground').src = userProfile.photo;
	document.getElementById('imgAvatar').src = userProfile.photo;
	console.log("=========CARGARDATOSUER-----------------")


}
function editUserEnabled(){
	document.getElementById('nameUser').disabled = false;
	document.getElementById('surnameUser').disabled = false;
	document.getElementById('emailUser').disabled = false;
	document.getElementById('countryUser').disabled = false;
	document.getElementById('editUser').onclick = function(){ editUser(); } ;
	document.getElementById('editUser').textContent = "Actualizar";
}
function editUserDisabled(){
	document.getElementById('nameUser').disabled = true;
	document.getElementById('surnameUser').disabled = true;
	document.getElementById('emailUser').disabled = true;
	document.getElementById('countryUser').disabled = true;
	document.getElementById('editUser').onclick = function(){ editUserEnabled(); } ;
	document.getElementById('editUser').textContent = "Editar";
}
function editUser(){
	data = {};
	// data['id']			= userProfile.id;
	data['name']		= document.getElementById('nameUser').value;
	data['surname'] 	= document.getElementById('surnameUser').value;
	data['email'] 	= document.getElementById('emailUser').value;
	data['pais']			= document.getElementById('countryUser').value;
	data = JSON.stringify(data);
	nodeApiManager.update("users", data, userProfile.id)
		.done(function(response){
			showAlert("alertEditSuccess");
			userProfile = response;
			cargarDatosUser();
			editUserDisabled();
		})
		.fail(function(response){
			showAlert("alertEditDanger");
		})
}
// function showAlert(id){
// 	document.getElementById(id).classList.add('alertShow');
//     setTimeout(function(){
//         document.getElementById(id).classList.remove('alertShow');
//     },5000);
// }
// function cargarPostsUser(posts){

// 	var divComments = document.getElementById('posts-body');

// 	if(posts.length == 0){
// 		var h5 = document.createElement('h5');
// 		h5.classList.add('center');
// 		h5.textContent = "No hay publicaciones para mostrar."

// 		divComments.appendChild(h5);
// 	}

// 	for(var i = 0; i<posts.length; i++){
// 		var separador		= document.createElement('div'),
// 			divMediaMb_4 	= document.createElement('div'),
// 			divUserAvatar	= document.createElement('div'),
// 			divImgUser 		= document.createElement('img'),
// 			divMediaBody	= document.createElement('div'),
// 			h5	 			= document.createElement('h5'),
// 			paragraph		= document.createElement('p'),
// 			anchor			= document.createElement('a');

// 		separador.classList.add('separador');
// 		divMediaMb_4.classList.add('media', 'mb-4');
// 		divUserAvatar.classList.add('useravatar');
// 		divImgUser.classList.add('d-flex');
// 		divImgUser.classList.add('mr-3');
// 		divImgUser.classList.add('rounded-circle');
// 		if(posts[i].photo){
// 			divImgUser.src 	= posts[i].photo;
// 		}else{
// 			divImgUser.src 	= "/ObligatorioJar/img/50x50.png";
// 		}
		
// 		divImgUser.alt 	= "Foto del post.";
// 		divMediaBody.classList.add("media-body");
// 		// anchor.href		= "./../pages/perfil.html#"+comments[i].user_id;
// 		h5.classList.add('mt-1');
// 		h5.textContent	= posts[i].title;
// 		paragraph.textContent = posts[i].body;
// 		anchor.classList.add('btn', 'btn-primary', 'float-right');
// 		anchor.classList.add('btn-primary');
// 		anchor.classList.add('float-right');
// 		// button.setAttribute('type', 'button');
// 		anchor.href = "./../pages/posts.html#"+posts[i].id;
// 		anchor.textContent = "Ver post.";

// 		// if(tipo == "news"){
// 		// 	anchor = document.createElement('a');
// 		// 	anchor.href = "./../pages/perfil.html#"+post[i].user_id;
// 		// 	h5.textContent = pa
// 		// }

// 		divMediaBody.appendChild(h5);
// 		divMediaBody.appendChild(paragraph);
// 		divMediaBody.appendChild(anchor);

// 		divUserAvatar.appendChild(divImgUser);

// 		divMediaMb_4.appendChild(divUserAvatar);
// 		divMediaMb_4.appendChild(divMediaBody);
// 		separador.appendChild(divMediaMb_4);

// 		divComments.appendChild(separador);
// 	}
// }

function changePass(form){
	// $('#formCambiarcontra')[0].getElementsByTagName('input')
	var fields = form.getElementsByTagName('input');
	var oldPassword = fields[0].value,
		newPassword = fields[1].value,
		dataSignIn = {};
		dataNewPass = {};


		dataSignIn['email'] 	= userProfile.email;
		dataSignIn['password']	= oldPassword;

		dataNewPass['password']	= newPassword;


		dataSignIn 	= JSON.stringify(dataSignIn);
		dataNewPass =JSON.stringify(dataNewPass);

		//Hago una llamada a SignIn para chequer que la oldpass sea correcta
		nodeApiManager.sign_in(dataSignIn).done(function(response){
			console.log("Success")
			nodeApiManager.update("users", dataNewPass, userProfile.id).done(function(response){
				showAlert("alertChangePassSuccess");
				userProfile = response;
				$('#modalCambiarContrasenia').modal('hide');
			}).fail(function(response){
				showAlert("alertChangePassError");
			});
		}).fail(function(response){
			console.log(response);
			showAlert("alertChangePassFail");
		});
	
	return false;
}







