(function () {
    'use strict';

    angular
        .module('app.validarDocumentos')
        .controller('ValidarDocumentosController', ValidarDocumentosController);

    /** @ngInject */
    function ValidarDocumentosController(msNavigationService, $sce, $scope, $state, $mdSidenav, $timeout, $document, $mdMedia, localStorageService, $mdDialog) {
        var vm = this;
        if (localStorageService.get("session_typeId") == null) {
            //console.log("NINGUN LOGIN");
            location.replace("/pages/auth/login");
        }else if (localStorageService.get("session_typeId") == 2) {//SUPERVISOR
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_supervisor');
        }else if (localStorageService.get("session_typeId") == 3) {//COMITE
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_comite');
        }else if (localStorageService.get("session_typeId") == 4) {//OPERADOR
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_operador');
        }else if (localStorageService.get("session_typeId") == 5) {//SOLICITANTE
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_solicitante');
        }else if (localStorageService.get("session_typeId") == 6) {//SUPERUSUARIO
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_super');
        }else if (localStorageService.get("session_typeId") == 7) {//SUPERVISTA
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_super');
        }else if (localStorageService.get("session_typeId") == 8) {//OPERADOR VISTA
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_operador_vista');
        }
        else if (localStorageService.get("session_typeId") == 9) {//OPERADOR VISTA
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_operador_universidad');
        }
        $scope.isDocumentosAceptacion = localStorageService.get("isDocumentosAceptacion");
        $scope.solicitud = localStorageService.get("validarDocumentos");
        
        $scope.mostrarBotonValidar = false;
        $scope.mostrarBotonDescargar = false;
        $scope.solicitudes = [];
        $scope.file = "about:blank";
        $scope.subeDocumentoOperador = false;
        $scope.uType = localStorageService.get("session_typeId");

        vm.init = init;

        vm.pintaPDF = pintaPDF;

        vm.mostrarCargando = mostrarCargando;
        vm.cerrarCargando = cerrarCargando;
        var alert;
        function mostrarCargando() {
            alert = $mdDialog.alert({
                templateUrl: 'app/main/cargando/modalCargando.html',
                parent: angular.element('body')
            });

            $mdDialog.show(alert).finally(function () {
                alert = undefined;
            });
        }

        function cerrarCargando() {
            $mdDialog.hide(alert, "finished");
            alert = undefined;
        }

        function pintaPDF(band) {
             
            var formato = localStorageService.get("formato_");
            //var json = localStorageService.get("json");
            var base64 = localStorageService.get("base64");
            $scope.file ="about:blank";
            switch (formato) {
                case 'mp4':
                    $scope.mostrarBotonDescargar = true;
                    return 'video/mp4';
                    break;
                case 'mp3':
                    $scope.mostrarBotonDescargar = true;
                    return 'audio/mp3'
                    break;
                case 'msword':
                    $scope.mostrarBotonDescargar = false;
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.doc";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
                case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                    $scope.mostrarBotonDescargar = false;
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "docuemento.docx";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
                case 'vnd.ms-excel':
                    $scope.mostrarBotonDescargar = false;
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.xls";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
                case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    $scope.mostrarBotonDescargar = false;
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.xlsx";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
                case 'png': 
                    $scope.mostrarBotonDescargar = true;
                    $scope.file = "data:image/png;base64," + base64; 
                    break;
                case 'jpg':
                    $scope.mostrarBotonDescargar = true;
                    $scope.file = "data:image/jpg;base64," + base64; 
                    break;
                case 'jpeg':
                    $scope.mostrarBotonDescargar = true;
                    $scope.file = "data:image/jpeg;base64," + base64; 
                    break;
                case 'pdf':
                    $scope.mostrarBotonDescargar = true;
                    $scope.file = "data:application/pdf;base64," + base64;
                    break;
                case 'youtube':
                    $scope.mostrarBotonDescargar = false;
                    $scope.file = "https://www.youtube.com/embed/" + base64;
                    break;
            }

            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.mostrarBotonValidar = band;
        }

        /*FUNCION PARA DESCARGAR ARCHIVOS QUE SE PUEDEN VISUALIZAR*/
        //vm.descargarPDF = descargarPDF;
        $scope.descargarPDF = function(){
             
            var formato = localStorageService.get("formato_");
            var base64 = localStorageService.get("base64");
            //$scope.file ="about:blank";
            //alert("ENTRO A DESCARGA");
            switch (formato) {
                case 'mp4':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'mp3':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'msword':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'vnd.ms-excel':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    $scope.mostrarBotonDescargar = false;
                    break;
                case 'png': 
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.png";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
                case 'jpg':
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.jpg";
                    dlnk.href = pdf;
                    dlnk.click(); 
                    break;
                case 'jpeg':
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.jpeg";
                    dlnk.href = pdf;
                    dlnk.click(); 
                    break;
                case 'pdf':
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + base64;
                    dlnk.download = "documento.pdf";
                    dlnk.href = pdf;
                    dlnk.click();
                    break;
            }

            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }
        }



        vm.subeDoc = subeDoc;

        function subeDoc() {
            
            swal({
                title: "Atención",
                text: "No ha cargado un documento el solicitante, ¿Deseas subir el documento del solicitante?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (click) {
                if (click) {
                    $scope.$apply(function () { 
                        $scope.subeDocumentoOperador = true; 
                        $scope.mostrarBotonValidar = false;
                        $scope.mostrarBotonDescargar = false;
                        $scope.file ="about:blank";
                    });
                } else {
                    $scope.$apply(function () { 
                        $scope.subeDocumentoOperador = false; 
                        $scope.mostrarBotonValidar = false;
                        $scope.file ="about:blank";
                    });
                   
                }
            });
        }

        $scope.subirArchivo = function () {
            $scope.disabledBoton = true;
            var file = document.getElementById('documentFile').files;
            var files = file;
            var nombreArchivo = "";
            var archivos = new Array();

            if (files.length > 0) {
                vm.mostrarCargando();
                for (var i = 0; i < files.length; i++) {
                    if (files[i].type === "application/msword" ||
                        files[i].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                        files[i].type === "application/vnd.ms-excel" ||
                        files[i].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                        files[i].type === "image/png" ||
                        files[i].type === "image/jpeg" ||
                        files[i].type === "image/jpg" ||
                        files[i].type === "application/pdf") {
                        nombreArchivo = "<b>" + files[i].name + "</b>";
                    } else {
                        swal("Atención", "Solamente puedes seleccionar archivos .pdf", "error");
                        return false;
                    }
                }

                if (files[0].type === "application/msword" ||
                    files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    files[0].type === "application/vnd.ms-excel" ||
                    files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    files[0].type === "image/png" ||
                    files[0].type === "image/jpeg" ||
                    files[0].type === "image/jpg" ||
                    files[0].type === "application/pdf") {
                    for (var j = 0; j < files.length; j++) {
                        var _file = files[j];
                        var picReader = new FileReader();

                        picReader.addEventListener("load", function (event) {

                            var base64 = event.target.result;
                            var formatoDoc = _file.type.split("/")[1];
                            $scope.archivoEnBase64 = base64.split(",")[1];
                            var sol = localStorageService.get("documentoValidar");

                            var objData = {
                                "id": sol.id,
                                "name": files[0].name,
                                "value": $scope.archivoEnBase64,
                                "Application_id": sol.application_Id,
                                "file_format": formatoDoc
                            }

                            if($scope.isDocumentosAceptacion){
                                AjaxCall("POST", URL_SERVIDOR + '/ApplicationDocumentFA/loadfile',
                                objData, function (response) {
 
                                    if (response.Codigo == "201") {
                                        StateMessage("Atención", response.mensaje, "success");
                                        $scope.validarDocumento();
                                        vm.cerrarCargando();
                                        vm.init();
                                    } else if (response.Codigo == "422") {
                                        StateMessage("Atención", response.mensaje, "info");
                                    }
                                });
                            }else{
                                AjaxCall("POST", URL_SERVIDOR + '/ApplicationDocument/loadfile',
                                objData, function (response) {

                                    if (response.Codigo == "201") {
                                        StateMessage("Atención", response.mensaje, "success");
                                        $scope.validarDocumento();
                                        vm.cerrarCargando();
                                        vm.init();
                                    } else if (response.Codigo == "422") {
                                        StateMessage("Atención", response.mensaje, "info");
                                    }
                                });
                            }
                            $scope.subeDocumentoOperador = false;
                            $scope.mostrarBotonValidar = false;
                                                            /*
                                    Aceptación
                                */
                               
                        }, false);
                        picReader.readAsDataURL(_file);
                    }
                }
                  $scope.subeDocumentoOperador = false; $scope.mostrarBotonValidar = false; 

                $scope.disabledBoton = false;
            } else {
                swal("Atención", "Selecciona un documento Por favor", "error");
                vm.cerrarCargando();
            }
        };

        $scope.verDocumento = function (ev, data) {
            $scope.subeDocumentoOperador = false; 
            $scope.mostrarBotonValidar = false;
            $scope.file ="about:blank";
            localStorageService.set("documentoValidar", data);
            if ($scope.isDocumentosAceptacion) {
                $mdDialog.show({
                    controller: function ($scope, $mdDialog, formWizardData) {
                        $scope.data = formWizardData;
                        AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocumentFA/" + $scope.data.id, null, function (response) {
                            
                            if (response.datos[0].value == "") {
                                vm.subeDoc();
                            } else if (response.datos[0].status > 1) {
                                localStorageService.set("formato_", response.datos[0].file_format);
                                //localStorageService.set("base64", "data:application/pdf;base64," + response.datos[0].value);
                                //localStorageService.set("json", response.datos[0].value);
                                localStorageService.set("base64", response.datos[0].value);
                                if(response.datos[0].status == 3){
                                    vm.subeDoc();
                                }
                                vm.pintaPDF(false);
                            } else {
                                localStorageService.set("formato_", response.datos[0].file_format);
                                //localStorageService.set("base64", "data:application/pdf;base64," + response.datos[0].value);
                                //localStorageService.set("json", response.datos[0].value);
                                localStorageService.set("base64", response.datos[0].value);
                                vm.pintaPDF(true);
                            }
                        }, function () {

                            $scope.closeDialog();
                        });

                        $scope.closeDialog = function () {
                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'app/main/validarDocumentos/html/modalCargando.html',
                    parent: angular.element('body'),
                    targetEvent: ev,
                    locals: {
                        formWizardData: data
                    },
                    clickOutsideToClose: false
                });
            } else {

                $mdDialog.show({
                    controller: function ($scope, $mdDialog, formWizardData) {
                        $scope.data = formWizardData;
                        AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocument/" + $scope.data.id, null, function (response) {
                            
                            if (response.datos[0].value == "") {
                                vm.subeDoc();
                            } else if (response.datos[0].status > 1) {
                                localStorageService.set("formato_", response.datos[0].file_format);
                                //localStorageService.set("base64", "data:application/pdf;base64," + response.datos[0].value);
                                //localStorageService.set("json", response.datos[0].value);
                                localStorageService.set("base64", response.datos[0].value);
                                if(response.datos[0].status == 3){
                                    vm.subeDoc();
                                }
                                vm.pintaPDF(false);
                            } else {
                                localStorageService.set("formato_", response.datos[0].file_format);
                                //localStorageService.set("base64", "data:application/pdf;base64," + response.datos[0].value);
                                //localStorageService.set("json", response.datos[0].value);
                                localStorageService.set("base64", response.datos[0].value);
                                vm.pintaPDF(true);
                            }
                        }, function () {

                            $scope.closeDialog();
                        });

                        $scope.closeDialog = function () {
                            $mdDialog.hide();
                        };
                    },
                    templateUrl: 'app/main/validarDocumentos/html/modalCargando.html',
                    parent: angular.element('body'),
                    targetEvent: ev,
                    locals: {
                        formWizardData: data
                    },
                    clickOutsideToClose: false
                });
            }
        }

        $scope.validarDocumento = function () {
            var sol = localStorageService.get("documentoValidar");

            if ($scope.isDocumentosAceptacion) {
                if (sol !== null && sol !== undefined) {
                    var objData = {
                        "id": sol.id,
                        "Application_id": sol.application_Id
                    }
                    AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocumentFA/validateFile", objData, function (response) {
                        if (response.codigo2 == "204") {
                            swal("Atención", response.mensaje2, "success");
                            vm.init();
                        } else if (response.codigo2 == "201") {
                            swal("Atención", response.mensaje2, "success");
                            vm.init();
                        }

                    }, function () {
                        localStorageService.remove("documentoValidar");
                        $scope.mostrarBotonValidar = false;
                    });
                } else {
                    swal("Atención", "Debes seleccionar un documento", "error");
                }
            } else {
                if (sol !== null && sol !== undefined) {
                    var objData = {
                        "id": sol.id,
                        "Application_id": sol.application_Id
                    }
                    AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/validateFile", objData, function (response) {
                        if (response.codigo2 == "204") {
                            swal("Atención", response.mensaje2, "success");
                            vm.init();
                        } else if (response.codigo2 == "201") {
                            swal("Atención", response.mensaje2, "success");
                            vm.init();
                        }

                    }, function () {
                        localStorageService.remove("documentoValidar");
                        $scope.mostrarBotonValidar = false;
                    });
                } else {
                    swal("Atención", "Debes seleccionar un documento", "error");
                }
            }

        }

        $scope.rechazarDocumento = function (ev, data) {
            var sol = localStorageService.get("documentoValidar");
            if ($scope.isDocumentosAceptacion) {
                if (sol !== null && sol !== undefined) {
                    $mdDialog.show({
                        controller: function ($scope, $mdDialog, formWizardData) {
                            $scope.data = {comentarioRechazo:""};
                            $scope.rechazo = {
                                modelo: null,
                                opciones: [{
                                    id: "1",
                                    name: "DOCUMENTO NO CORRESPONDE CON EL ESPERADO"
                                },
                                {
                                    id: "2",
                                    name: "DOCUMENTO ILEGIBLE"
                                }
                                    ,
                                {
                                    id: "3",
                                    name: "INFORMACIÓN INCOMPLETA"
                                },
                                {
                                    id: "4",
                                    name: "LOS DATOS DEL SOLICITANTE NO COINCIDEN"
                                },
                                {
                                    id: "5",
                                    name: "OTRO"
                                }]
    
                            }
                            $scope.changeOption = function(){
                                $scope.rechazo.opciones.forEach(function(el) {
                                    if($scope.rechazo.modelo === el.id){
                                        $scope.data.comentarioRechazo = el.name;
                                    }
                                });
                               
                            }
                             
                            $scope.rechazarDocumento = function () {

                                if ($scope.data === undefined) {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }

                                if ($scope.data.comentarioRechazo === undefined) {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }


                                if ($scope.data.comentarioRechazo === "") {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }

                                var objData = {
                                    "id": sol.id,
                                    "notes": $scope.data.comentarioRechazo,
                                    "Application_id": sol.application_Id
                                };
                                
                                AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocumentFA/rejectFile", objData, function (response) {
                                    if (response.Codigo == "404") {
                                        swal("Atención", response.mensaje, "error");
                                    } else {
                                        swal("Atención", response.mensaje, "success");
                                        vm.init();
                                    }
                                }, function () {
                                    localStorageService.remove("documentoValidar");
                                    $scope.mostrarBotonValidar = false;

                                    $scope.closeDialog();
                                });
                            }

                            $scope.closeDialog = function () {

                                $mdDialog.hide();
                            };
                        },
                        templateUrl: 'app/main/validarDocumentos/html/modalRechazo.html',
                        parent: angular.element('body'),
                        targetEvent: ev,
                        locals: {
                            formWizardData: data
                        },
                        clickOutsideToClose: true
                    });
                    localStorageService.remove("documentoValidar");
                } else {
                    swal("Atención", "Debes seleccionar un documento", "error");
                }
            } else {
                if (sol !== null && sol !== undefined) {
                    $mdDialog.show({
                        controller: function ($scope, $mdDialog, formWizardData) {
                            $scope.data = {
                                comentarioRechazo : ""
                            };

                            $scope.rechazo = {
                                modelo: null,
                                opciones: [{
                                    id: "DOCUMENTO NO CORRESPONDE CON EL ESPERADO",
                                    name: "DOCUMENTO NO CORRESPONDE CON EL ESPERADO"
                                },
                                {
                                    id: "DOCUMENTO ILEGIBLE",
                                    name: "DOCUMENTO ILEGIBLE"
                                }
                                    ,
                                {
                                    id: "INFORMACIÓN INCOMPLETA",
                                    name: "INFORMACIÓN INCOMPLETA"
                                },
                                {
                                    id: "INFORMACIÓN INCORRECTA",
                                    name: "INFORMACIÓN INCORRECTA"
                                },
                                {
                                    id: "LOS DATOS DEL SOLICITANTE NO COINCIDEN",
                                    name: "LOS DATOS DEL SOLICITANTE NO COINCIDEN"
                                },
                                {
                                    id: "OTRO",
                                    name: "OTRO"
                                }]
    
                            }

                            $scope.changeOption = function(){
                                $scope.rechazo.opciones.forEach(function(el) {
                                    if($scope.rechazo.modelo === el.id){
                                        $scope.data.comentarioRechazo = el.name;
                                    }
                                });
                               
                            }

                            $scope.rechazarDocumento = function () {

                                if ($scope.data === undefined) {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }

                                if ($scope.data.comentarioRechazo === undefined) {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }


                                if ($scope.data.comentarioRechazo === "") {
                                    swal("Atención", "Es necesario ingresar un motivo de rechazo", "error");
                                    return false;
                                }

                                var objData = {
                                    "id": sol.id,
                                    "notes": $scope.data.comentarioRechazo,
                                    "Application_id": sol.application_Id
                                };
                                
                                AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/rejectFile", objData, function (response) {
                                    if (response.Codigo == "404") {
                                        swal("Atención", response.mensaje, "error");
                                    } else {
                                        swal("Atención", response.mensaje, "success");
                                        vm.init();
                                    }
                                }, function () {
                                    localStorageService.remove("documentoValidar");
                                    $scope.mostrarBotonValidar = false;

                                    $scope.closeDialog();
                                });
                            }

                            $scope.closeDialog = function () {

                                $mdDialog.hide();
                            };
                        },
                        templateUrl: 'app/main/validarDocumentos/html/modalRechazo.html',
                        parent: angular.element('body'),
                        targetEvent: ev,
                        locals: {
                            formWizardData: data
                        },
                        clickOutsideToClose: true
                    });
                    localStorageService.remove("documentoValidar");
                } else {
                    swal("Atención", "Debes seleccionar un documento", "error");
                }
            }
        }

        $scope.volver = function(){
            if($scope.uType==9){
                $state.go("app.documentoSolicitanteUni");
            }else{
                if($scope.isDocumentosAceptacion){
                    $state.go("app.documentosSolicitanteAsignacion");
                }else{
                    $state.go("app.documentoSolicitante");
                }
            }
        }

        function init() {
            //debugger;
            if ($scope.isDocumentosAceptacion) {
                var objData = {
                    "id": $scope.solicitud.id,
                    "Classification_Id": $scope.solicitud.Classification_Id
                }

                AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocumentFA/showPerApplication", objData, function (response) {
                    $scope.$apply(function () {
                        $scope.solicitudes = response.datos;
                        if ($scope.solicitudes.length == 0) {
                            swal("Atención", "El solicitante no tiene documentos por validar", "error");
                            $state.go("app.inicio_operador");
                        }
                    });
                }, function () {
                    
                });
            } else {
                var objData = {
                    "id": $scope.solicitud.id,
                    "Classification_Id": $scope.solicitud.Classification_Id
                }

                AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/showPerApplication", objData, function (response) {
                    $scope.$apply(function () {
                        $scope.solicitudes = response.datos;
                        if ($scope.solicitudes.length == 0) {
                            swal("Atención", "El solicitante no tiene documentos por validar", "error");
                            $state.go("app.inicio_operador");

                        }
                        // angular.forEach(response.datos, function (value) {
                        //     console.log(value);
                        //     if (value.status == 1)
                        //         $scope.solicitudes.push(value);
                        // });
                    });
                }, function () {
                    
                });
            }


           $scope.mostrarBotonValidar = false;
            $scope.file = "about:blank";
        }

        init();

    }
})();