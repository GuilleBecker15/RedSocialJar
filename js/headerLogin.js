var login = storageApiManager.localGetItem("logueado");
$(document).ready(function(){

});

function init(){
   if (!!login){
        $( "nav" ).load( "/ObligatorioJar/pages/headerLogin.html",function(){
            document.getElementById('logOut').addEventListener("click", function(evt){
                logOut();
            });
        });
	}else{
        $( "nav" ).load( "/ObligatorioJar/pages/headerNoLogin.html");
    }
	$( "footer" ).load( "/ObligatorioJar/pages/footer.html");

}