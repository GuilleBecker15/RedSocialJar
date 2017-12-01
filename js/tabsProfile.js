var userProfile, userComments;
getDatosUser();
$(document).ready(function() {
	document.getElementById('stars').addEventListener("click", function(){
		document.getElementById('datosPersonales').classList.add("active");
		document.getElementById('datosPersonales').classList.add("show");
		document.getElementById('misPublicaciones').classList.remove("active");
		document.getElementById('misPublicaciones').classList.remove("show");
	});
	document.getElementById('favorites').addEventListener("click", function(){
		document.getElementById('misPublicaciones').classList.add("active");
		document.getElementById('misPublicaciones').classList.add("show");
		document.getElementById('datosPersonales').classList.remove("active");
		document.getElementById('datosPersonales').classList.remove("show");
	});
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

function changePass(form){
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







