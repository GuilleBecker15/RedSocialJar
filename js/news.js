$(document).ready(function(){
	nodeApiManager.all("posts").done(function(response){
		cargarPostsUser(response, 'news-body');
	}).fail(function(response){
		cargarPostsUser([], 'news-body');
		showAlert("alertCargarPostError");
	});
});