var login = storageApiManager.localGetItem("logueado");
if (login)
    login = true;
else
    login = false;
$(document).ready(function(){

});

function init(){
    var page = location.pathname.split("/")[location.pathname.split("/").length-1];
    $( "footer" ).load( "./../pages/footer.html");
    if (!login ){
        if(page != "index.html" && page != ""){

            location.href = "./../index.html";
            $( "nav" ).load( "./../pages/headerNoLogin.html");
        }else{
            console.log("CARGO");
            $( "nav" ).load( "./pages/headerNoLogin.html");
        }
    }else{
        if(page != "index.html" && page != ""){
            // $( "nav" ).load( "./../pages/headerLogin.html",listenerLogOut());
            $( "nav" ).load( "./../pages/headerLogin.html",function(){
                document.getElementById('logOut').addEventListener("click", function(evt){
                
                });
            });
        }else{
            // $( "nav" ).load( "./pages/headerLogin.html",listenerLogOut());
            $( "nav" ).load( "./pages/headerLogin.html",function(){
                document.getElementById('logOut').addEventListener("click", function(evt){
                
                });
                
            });
        }
    }

    detectExplorer();
}


function detectExplorer(){
    if(detectIE()){
        storageApiManager.localSetItem("IE","true");        
    }else{
        storageApiManager.localSetItem("IE","false");
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
       // Edge (IE 12+) => return version number
       return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

// function listenerLogOut(){
//     document.getElementById('logOut').addEventListener("click", function(evt){
//         logOut();
//     });
// }
    