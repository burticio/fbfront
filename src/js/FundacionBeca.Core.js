//var URL_SERVIDOR = "http://fundacionbeca.org.mx/sistema/Fundacionbecav5.1/public/index.php";
//var URL_SERVIDOR = "http://fundacionbeca.org.mx/sistema/Fundacionbecav5.1.Pruebas/public/index.php";
//var URL_SERVIDOR = "https://elb.fundacionbeca.net/qa/FundacionBecaV5.1/public/index.php";
//var URL_SERVIDOR = "https://srvback.fundacionbeca.net/qa/FundacionBecaV5.1/public/index.php";
var URL_SERVIDOR = "https://elb.fundacionbeca.net/qa/FundacionBecaV5.1/public/index.php";
function AjaxCall(method, pathurlService, objData, success, callback, onError) {
    $.ajax({
        type: method,
        url: pathurlService , 
        data: objData,
        timeout: 60000, 
        success: function (response) {
            success(response); 
        },
        failure: function (response) {
            alert(response.d);
        },
        error: function(error){
            onError(error);
        }
    }).done(callback);
}

function validaURL(url,obligatory,ftp)
{
    // Si no se especifica el paramatro "obligatory", interpretamos
    // que no es obligatorio
    if(obligatory==undefined)
        obligatory=0;
    // Si no se especifica el parametro "ftp", interpretamos que la
    // direccion no puede ser una direccion a un servidor ftp
    if(ftp==undefined)
        ftp=0;
 
    if(url=="" && obligatory==0)
        return true;
 
    if(ftp)
        var pattern = /^(http|https|ftp)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
    else
        var pattern = /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;
 
    if(url.match(pattern))
        return true;
    else
        return false;
}

function obtenerFormatoArchivo(formato){
    switch (formato) {
        case 'mp4':
            return 'video/mp4';
            break;
        case 'mp3':
            return 'audio/mp3'
            break;
        case 'msword':
            return 'application/msword'
            break;
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case 'vnd.ms-excel':
            return 'application/vnd.ms-excel';
            break;
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case 'png':
            return 'data:image/png;base64,';
            break;
        case 'jpg':
            return 'data:image/jpg;base64,';
            break;
        case 'jpeg':
            return 'data:image/jpeg;base64,';
            break;
        case 'pdf':
            return 'application/pdf;base64,';
            break;
    }
}
 

function SimpleMessage(message) {
    swal(message);
}

function TitleMessage(title, message) {
    swal(title, message);
}

function StateMessage(title, message, type) {
    swal(title, message, type);
}

function StateWithButtonName(title, message, type, textButton) {
    swal({
        title: title,
        text: message,
        icon: type,
        button: textButton,
    });
}

function ConfirmMessageWithAjaxCall(question, message, type, textButtonOK, textButtonCancel,
                                    textCancel, method, pathurlService, objData, success, callback) {
    swal({
            title: question,
            text: message,
            type: type,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
                //AjaxCall(method, pathurlService, objData, success , callback);
                SweetAlert.swal("Deleted!", "Your imaginary file has been deleted.", "success");
            } else {
                swal("Cancelado", "Acción Cancelada", "error");
            }
        });
}

function ConfirmMessage(question, message, type, textCancel, success) {

}