// var login = storageApiManager.localGetItem("logueado");



$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });

    if($('input[name=repassword]')[0]){
        $('input[name=repassword]')[0].addEventListener("keyup", function(){
            'use strict';
            if (this.parentElement.parentElement.querySelectorAll('[name=password]')[0].value === this.value) {
                this.setCustomValidity('');
            } else {
                this.setCustomValidity('Passwords deben coincidir');
            }
        })
    }

    
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

    var data = serializeForm(form);

    nodeApiManager.sign_in(data).done(function (response){
        if(storageApiManager.isSupported("localStorage")){
            storageApiManager.localSetItem("logueado","true");
            // location.reload();
            location.href = "/ObligatorioJar/pages/news.html";
        }else{
            console.log("Este navegador no soporta localStorage");
        }
    }).fail(function(response){
        console.log("Hubo un error al iniciar sesion");
        document.getElementById('alertLogin').classList.add('alertFail');
        setTimeout(function(){
            document.getElementById('alertLogin').classList.remove('alertFail');
        },5000);
    });

    return false;
}

function signUp(form){
    
    var data = serializeForm(form);
    data = JSON.parse(data);
    delete data["repassword"];
    data = JSON.stringify(data);

    nodeApiManager.create("users", data).done(function(response){
        console.log("-------CREADO---------");
        if(storageApiManager.isSupported("localStorage")){
            storageApiManager.localSetItem("logueado","true");
            // location.reload();
            location.href = "/ObligatorioJar/pages/news.html";
        }else{
            console.log("Este navegador no soporta localStorage");
        }
    }).fail(function(response){
        console.log("Hubo un error al registrarse");
        document.getElementById('alertSignUp').classList.add('alertFail');
        setTimeout(function(){
            document.getElementById('alertSignUp').classList.remove('alertFail');
        },5000);
    });

    return false;
}

function serializeForm(form){
    // let data = new Array();
    let data = {};
    // let inputs = form.getElementsByTagName('input');
    let inputs = $(form).find('input');
    inputs.each(function(index, value){
        data[value.name] = value.value;
    });
    // for (let i = 0; i < inputs.length; i++) {
    //     data[inputs[i].name] = inputs[i].value;
    // }
    // console.log(data);
    var dataJson =  JSON.stringify(data);
    return dataJson;
}

function logueado(response){
    console.log("-----------LOGIN----------------")
    console.log(JSON.stringify(response))
    console.log("-----------LOGIN----------------")
}


function runMyFunction(){
    alert("Hola");
}

function logOut(){
    storageApiManager.localRemoveItem("logueado");
    location.href = "/ObligatorioJar/index.html";
}

function publish(form){
    alert("publicar");
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