var userLoguedo = JSON.parse(storageApiManager.localGetItem("logueado"));
$(document).ready(function(){
	$('#publishForm').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) { 
        e.preventDefault();
        return false;
      }
    });
});