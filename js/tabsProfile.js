$(document).ready(function() {
	document.getElementById('stars').addEventListener("click", function(){
		document.getElementById('datosPersonales').classList.add("active");
		document.getElementById('datosPersonales').classList.add("show");
		document.getElementById('misPublicaciones').classList.remove("active");
		document.getElementById('misPublicaciones').classList.remove("show");
		document.getElementById('misFotos').classList.remove("active");
		document.getElementById('misFotos').classList.remove("show");
	});
	document.getElementById('favorites').addEventListener("click", function(){
		document.getElementById('misPublicaciones').classList.add("active");
		document.getElementById('misPublicaciones').classList.add("show");
		document.getElementById('datosPersonales').classList.remove("active");
		document.getElementById('datosPersonales').classList.remove("show");
		document.getElementById('misFotos').classList.remove("active");
		document.getElementById('misFotos').classList.remove("show");
	});
	document.getElementById('following').addEventListener("click", function(){
		document.getElementById('misFotos').classList.add("active");
		document.getElementById('misFotos').classList.add("show");
		document.getElementById('misPublicaciones').classList.remove("active");
		document.getElementById('misPublicaciones').classList.remove("show");
		document.getElementById('datosPersonales').classList.remove("active");
		document.getElementById('datosPersonales').classList.remove("show");
	});
});