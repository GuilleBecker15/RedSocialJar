var search = location.search.substr(1);

nodeApiManager.busqueda("posts",search).done(function(response){
	cargarPostsUser(response,"todos");
})