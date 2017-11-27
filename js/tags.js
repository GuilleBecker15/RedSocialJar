$(document).ready(function(){

	let tagInput = document.getElementsByClassName('tag-input');
	let mails = document.getElementsByClassName('mails');
	let textarea = document.getElementsByClassName('fake-textarea');
	let cerrar = document.querySelectorAll("span > strong");
	var j = 0;
	let enterOrSpace = false;



	for (j ; j < tagInput.length; j++) {
	console.log("hola inputs!!!");
		tagInput[j].addEventListener("keypress",function(e){
			var evento = e;
			console.log(evento);
			var keyCode = e.keyCode || e.which; 
			if (keyCode ===32 || keyCode === 13){
				console.log(e.target);
				e.target.value = e.target.value.trim();
				console.log(e.target.value);
				if(e.target.value.replace(/\s/g, '').length != 0){
					let t = e.target.parentElement.parentElement.parentElement.parentElement.childNodes[3];
					let area = e.target.parentElement.parentElement;
					console.log(t);	
					t.value = t.value+" "+e.target.value;
					console.log(t.value);
					let span = document.createElement('span');
					span.classList.add('tag');
					span.classList.add('dataForm');
					// if(!validarMail(e.target)){
					// 	span.classList.add('novalido');
					// }
					let txt = document.createTextNode(e.target.value);
					span.appendChild(txt);
					let x = document.createElement('strong');
					span.appendChild(x);
					area.insertBefore(span, area.lastElementChild);
					x.addEventListener('click', function(){
						let c = t.value.trim().split(" ");
						for (let i = 0; i < c.length; i++) {

							console.log(x.parentElement.content);
							console.log(c[i]);
							console.log(x.parentElement.textContent == c[i]);

							if(x.parentElement.textContent == c[i]){

								c.splice(i,1);
								console.log(c);
								break;
							}
								console.log(c);
						}
						t.value = c.toString().replace(/,/g," ");
						let form = x.parentElement.parentElement.parentElement.parentElement.parentElement;
						console.log("--------form--------")
						console.log(form);
						console.log("---------------------")
						let clases = form.classList;
						for (let i = 0; i < clases.length; i++) {
							if(clases[i] == 'has-error'){
								form.classList.remove('has-error');
								// let hijo = form.getElementsByTagName('span')
								let hijo = form.getElementsByClassName('help-block')
								if (hijo.length > 0){
									console.log("-------form=-------")
									console.log(form);
									console.log("-------hijo=-------")
									console.log(hijo);
									console.log("-------hijo sub cero=-------")
									console.log(hijo[0]);

								hijo[0].remove();
								//evt.target.removeChild(hijo[0]);
								}
							}
						}
						span.remove();
					});
				}

				e.target.value = "";
			}

			});

	}

});





	function validarMail(form){
		let texto = form.value.trim().split(" ");
		let valido = true;
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(texto);
		if(texto == "") return false;
		// for (let i = 0; i < texto.length; i++){
			// if(texto==""){
			// 	texto.splice(i,1);
			// 	i--;
			// }
		  	if(!re.test(texto)){
		  		return false;
		  	}
		// }
  		return true;
	}
