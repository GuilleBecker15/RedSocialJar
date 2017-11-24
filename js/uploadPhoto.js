$(document).ready(function(){
	dropAndDragPhoto();
});

function dropAndDragPhoto(){
	
	var imageLoader = document.getElementById('filePhoto');
    imageLoader.addEventListener('change', handleImage, false);

	function handleImage(e) {
	    var reader = new FileReader();
	    reader.onload = function (event) {
	        $('#uploader img').attr('src',event.target.result);
	    }
		    reader.readAsDataURL(e.target.files[0]);
		    
		}

		var dropbox;
		dropbox = document.getElementById("uploader");
		dropbox.addEventListener("dragenter", dragenter, false);
		dropbox.addEventListener("dragover", dragover, false);
		dropbox.addEventListener("drop", drop, false);

		function dragenter(e) {
		  e.stopPropagation();
		  e.preventDefault();
		}

		function dragover(e) {
		  e.stopPropagation();
		  e.preventDefault();
		}

		function drop(e) {
		  e.stopPropagation();
		  e.preventDefault();
		  //you can check e's properties
		  //console.log(e);
		  var dt = e.dataTransfer;
		  var files = dt.files;
		  
		  //this code line fires your 'handleImage' function (imageLoader change event)
		  imageLoader.files = files;
		}
}