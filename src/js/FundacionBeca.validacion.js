$(document).ready(function () {
    //var validation = {
    //    isEmailAddress: function (str) {
    //        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //        return pattern.test(str);  // returns a boolean
    //    },
    //    isNotEmpty: function (str) {
    //        var pattern = /\S+/;
    //        return pattern.test(str);  // returns a boolean
    //    },
    //    isNumber: function (str) {
    //        var pattern = /^\d+$/;
    //        return pattern.test(str);  // returns a boolean
    //    },
    //    isSame: function (str1, str2) {
    //        return str1 === str2;
    //    }
    //};

    //alert(validation.isNotEmpty("dff"));
    //alert(validation.isNumber(44));
    //alert(validation.isEmailAddress("mf@tl.ff"));
    //alert(validation.isSame("sf", "sf"));
    //console.log("Validaciones activas");
});

function validaLongitud(val, numCaracter, input) {
    if ((numCaracter - val.length) <= 2) {
         
        if (val.length >= numCaracter) {
            swal("Atención", "No debe contener más de " + numCaracter + " caracteres", "error");
            $("#" + input).val(val);
            return false;
         }
    }
    return true;
}

function validaCaracterEspecial(val, input) {
    if (val.includes("@")) {
        swal("Atención", "No debe contener caracter especial", "error");
        return false;
    }
    return true;
}

function validaTilde(val) {
    var arrTilde = ["á", "é", "í", "ó", "ú"];

    for (var i = 0; i < arrTilde.length; i++) {
        if (val.includes(arrTilde[i])) {
            swal("Atención","No se permiten acentos","error");
        }
    }
}

function validaCorreo(val, input) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(val)) {
        swal("Atención","Formato de correo inválido","error");
        return false;
    }
    return true;
}

function validaCorreoEnLbl(val, input, lblError) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(val)) {
        $("#" + lblError).html("Formato de correo inválido")
        return false;
    }
    $("#" + lblError).html("");
    return true;
}

function validaCampoVacio(val, input,focus) {
    if ($.trim(val) == "") {
        swal("Atención","No se permite " + input + " vacio","error");
        $("#" + focus).focus();
        return false;
    }
    return true;
}

function validaDdl(val, input) {
    if ($("#" + val).val() == 0) {
        swal('Atención','Debes seleccionar ' +input,'error');
        return false;
    }
    return true;
}
 
function validaCaracterEspecial(val,lbl, input) {
    var arrTilde = ["!", "#", "$", "%", "&", "/", "(", ")", "=", "?", "¡", "¿", "'", "<", ">", ";", ",", ":", ".", "-", "_", "{", "[", "^", "+", "¨", "~", "]", "}", "`","*","+",'"'];

      for (var i = 0; i < arrTilde.length - 1; i++) {
        if (val.includes(arrTilde[i])) {
            $("#" + input).val(val.replace(arrTilde[i],""));
            $("#" + input).focus();
            swal("Atención", lbl + " no permite caractéres especiales", "error");
            return false;
        }
    }
    return true;
}

function validaSoloNumeros(val, label, input) {
    var str = val.split('');     
    str.forEach(function (element) {
        if (!/^([0-9])*$/.test(element)) {
            $("#" + input).val(val.replace(element, ""));
        }
    });
    return true;
     
    //var pattern = /^\d+$/;
    //console.log(val);
    //if (val != ""){
    //    if (!pattern.test(val)) {
    //        swal("Atención","Solo se permiten números " + input,"error");
    //        return false;
    //    }
    //}
    //return true;
}
 
function sweetMsg(titulo, mensaje, typeMessage) {
    swal(titulo, mensaje, typeMessage);
}