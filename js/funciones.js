// var login = storageApiManager.localGetItem("logueado");



$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });

    // if($('input[name=repassword]')[0]){
    //     $('input[name=repassword]')[0].addEventListener("keyup", function(){
    //         'use strict';
    //         if (this.parentElement.parentElement.querySelectorAll('[name=password]')[0].value === this.value) {
    //             this.setCustomValidity('');
    //         } else {
    //             this.setCustomValidity('Passwords deben coincidir');
    //         }
    //     })
    // }



   
    // $('#publishForm').on('keyup keypress', function(e) {
    //   var keyCode = e.keyCode || e.which;
    //   if (keyCode === 13) { 
    //     e.preventDefault();
    //     return false;
    //   }
    // });

});

function showPassword() {
    var key_attr = $('#login-password').attr('type');
    if(key_attr != 'text') {
        $('.checkbox').addClass('show');
        $('#login-password').attr('type', 'text');
    } else {
        $('.checkbox').removeClass('show');
        $('#login-password').attr('type', 'password');
    }
}

function logIn(form){

    var data = serializeForm(form, 'login');
    
    nodeApiManager.sign_in(data).done(function (response){
        if(storageApiManager.isSupported("localStorage")){
            console.log(response);
            storageApiManager.localSetItem("logueado",JSON.stringify(response));
            // location.reload();
            location.href = "/ObligatorioJar/pages/news.html";
        }else{
            console.log("Este navegador no soporta localStorage");
        }
    }).fail(function(response){
        console.log("Hubo un error al iniciar sesion");
        console.log(response);
        document.getElementById('alertLogin').classList.add('alertShow');
        setTimeout(function(){
            document.getElementById('alertLogin').classList.remove('alertShow');
        },5000);
    });

    return false;
}

function signUp(form){
    
    var data = serializeForm(form, 'register');
    data = JSON.parse(data);
    delete data["repassword"];
    data = JSON.stringify(data);

    nodeApiManager.create("users", data).done(function(response){
        console.log("-------CREADO---------");
        if(storageApiManager.isSupported("localStorage")){
            // storageApiManager.localSetItem("logueado","true");
            storageApiManager.localSetItem("logueado",JSON.stringify(response));
            // location.reload();
            location.href = "/ObligatorioJar/pages/news.html";
        }else{
            console.log("Este navegador no soporta localStorage");
        }
    }).fail(function(response){
        console.log("Hubo un error al registrarse");
        console.log(response.responseJSON)
        if(response.responseJSON['error'] == 'mail'){
           document.getElementById('alertSignUp').innerHTML = '<div class="col-sm-12"><center><strong>ERROR</strong></center><center><p>El email ingresado ya esta registrado, por favor intente con otro.</p></center></div>'
        }else if(response.responseJSON['error'] == 'nickname'){
           document.getElementById('alertSignUp').innerHTML = '<div class="col-sm-12"><center><strong>ERROR</strong></center><center><p>El nickname ingresado ya esta registrado, por favor intente con otro.</p></center></div>'
        }
        document.getElementById('alertSignUp').classList.add('alertShow');
        setTimeout(function(){
            document.getElementById('alertSignUp').classList.remove('alertShow');
        },5000);
    });

    return false;
}

function serializeForm(form, action){
    // let data = new Array();
    var data = {};
    // let inputs = form.getElementsByTagName('input');
    var inputs = $(form).find('input');
    inputs.each(function(index, value){
        data[value.name] = value.value;
    });
    // for (let i = 0; i < inputs.length; i++) {
    //     data[inputs[i].name] = inputs[i].value;
    // }
    // console.log(data);
    // debugger
    if(action == 'register'){
        var photo = $(form).find('img')[0];
        data['photo'] = photo.src;
    }
    var dataJson =  JSON.stringify(data);
    return dataJson;
}

// function logueado(response){
//     console.log("-----------LOGIN----------------")
//     console.log(JSON.stringify(response))
//     console.log("-----------LOGIN----------------")
// }




function logOut(){
    storageApiManager.localRemoveItem("logueado");
    location.href = "/ObligatorioJar/index.html";
}

function publish(form){
    console.log(form);
    console.log(form.getElementsByClassName("dataForm"));
    var fields = form.getElementsByClassName("dataForm"); 

    var data = {};
    var tags = "";
    $.each(fields, function(key, value){
        console.log(value.nodeName);
        if(value.nodeName == "INPUT" || value.nodeName == "TEXTAREA" ){
            data[value.name] = value.value;
        }
        if(value.nodeName == "SPAN"){
            tags += value.textContent+" ";
        }
        if(value.nodeName == "IMG"){
            data[value.name] = value.src;
        }
    });
    data["tags"] = tags;
    data["created_at"] = Date();
    // debugger
    data["user_id"] = userLoguedo["id"];
    console.log("--------DATOSSSS----------------------");
    console.log(data);

    console.log("------------------------------");
    var data = JSON.stringify(data);

    nodeApiManager.create("posts", data)
        .done(function(response){
            location.href = "/ObligatorioJar/pages/posts.html#"+response["id"];
        }).fail(function(response){
            console.log(response);
        });

    //Limpio el formulario

    return false;
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


// var form = document.getElementById('parse-me');

/*
var serialize = function (form) {
    return Array.from(new FormData(form)
        .entries())
        .reduce(function (response, current) {
            response[current[0]] = current[1];
            return response
        }, {})
};
*/

// var serialize = function (form) {
//     var field,
//         l,
//         s = [];

//     if (typeof form == 'object' && form.nodeName == "FORM") {
//         var len = form.elements.length;

//         for (var i = 0; i < len; i++) {
//             field = form.elements[i];
//             if (field.name && !field.disabled && field.type != 'button' && field.type != 'file' && field.type != 'hidden' && field.type != 'reset' && field.type != 'submit') {
//                 if (field.type == 'select-multiple') {
//                     l = form.elements[i].options.length;

//                     for (var j = 0; j < l; j++) {
//                         if (field.options[j].selected) {
//                             s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
//                         }
//                     }
//                 }
//                 else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
//                     s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
//                 }
//             }
//         }
//     }
//     return s.join('&').replace(/%20/g, '+');
// };


// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     var data = serialize(form);
//     console.log(data);
//     document.getElementById('output').textContent = JSON.stringify(data)
// });

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     var file = reader.result.split(",")[1];
     // uploadImage(refreshToken, access_token, file)
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
     return reader.error;
   };
   return reader;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imagenPreview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function checkSamePass(password, repassword){
    if($('#'+repassword)[0]){
        $('#'+repassword)[0].addEventListener("keyup", function(){
            'use strict';
            if ($('#'+password)[0].value === this.value) {
                this.setCustomValidity('');
            } else {
                this.setCustomValidity('Passwords deben coincidir');
            }
        })
    }
}

function cargarPostsUser(posts, divParent){

    // var divComments = document.getElementById('posts-body');
    var divComments = document.getElementById(divParent);

    if(posts.length == 0){
        var h5 = document.createElement('h5');
        h5.classList.add('center');
        h5.textContent = "No hay publicaciones para mostrar."

        divComments.appendChild(h5);
    }

    for(var i = 0; i<posts.length; i++){
        var separador       = document.createElement('div'),
            divMediaMb_4    = document.createElement('div'),
            divUserAvatar   = document.createElement('div'),
            divImgUser      = document.createElement('img'),
            divMediaBody    = document.createElement('div'),
            h5              = document.createElement('h5'),
            paragraph       = document.createElement('p'),
            anchor          = document.createElement('a');

        separador.classList.add('separador');
        divMediaMb_4.classList.add('media', 'mb-3');
        divUserAvatar.classList.add('useravatar');
        divImgUser.classList.add('d-flex');
        divImgUser.classList.add('mr-3');
        divImgUser.classList.add('rounded-circle');
        if(posts[i].photo){
            divImgUser.src  = posts[i].photo;
        }else{
            divImgUser.src  = "/ObligatorioJar/img/50x50.png";
        }
        
        divImgUser.alt  = "Foto del post.";
        divMediaBody.classList.add("media-body");
        // anchor.href      = "./../pages/perfil.html#"+comments[i].user_id;
        h5.classList.add('mt-1');
        h5.textContent  = posts[i].title;
        paragraph.textContent = posts[i].body;
        anchor.classList.add('btn', 'btn-primary', 'float-right');
        anchor.classList.add('btn-primary');
        anchor.classList.add('float-right');
        // button.setAttribute('type', 'button');
        anchor.href = "./../pages/posts.html#"+posts[i].id;
        anchor.textContent = "Ver post.";

        // if(tipo == "news"){
        //  anchor = document.createElement('a');
        //  anchor.href = "./../pages/perfil.html#"+post[i].user_id;
        //  h5.textContent = pa
        // }

        divMediaBody.appendChild(h5);
        divMediaBody.appendChild(paragraph);
        divMediaBody.appendChild(anchor);

        divUserAvatar.appendChild(divImgUser);

        divMediaMb_4.appendChild(divUserAvatar);
        divMediaMb_4.appendChild(divMediaBody);
        separador.appendChild(divMediaMb_4);

        divComments.appendChild(separador);
    }
}
function showAlert(id){
 document.getElementById(id).classList.add('alertShow');
    setTimeout(function(){
        document.getElementById(id).classList.remove('alertShow');
    },5000);
}

function search(form){
    var query = form.getElementsByTagName('input')[0].value;
    query.replace(/ /g, "%20");
    location.assign('/ObligatorioJar/pages/busqueda.html?'+query);
    return false;
}