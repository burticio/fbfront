(function () {
    'use strict';

    angular
        .module('app.catalogos.docPrograma')
        .controller('DocProgramaController', DocProgramaController);

    /** @ngInject */
    function DocProgramaController($scope, $mdDialog, $sce, localStorageService,$state) {
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
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador');
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
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador_vista');
        }else if (localStorageService.get("session_typeId") == 9) {//OPERADOR VISTA
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador_universidad');
        }

        $scope.areaPrograma = [];
        $scope.archivoFileFormat ="";
        $scope.uType = localStorageService.get("session_typeId");
        vm.upload = false;

        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            dom: 'Bfrtip',
            buttons: [
                'print',
                'csv'
            ],
            responsive: true,
            language: {
                processing: "Procesando...",
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
                info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
                infoEmpty: "Mostrando ningún elemento.",
                infoFiltered: "(filtrado _MAX_ elementos total)",
                infoPostFix: "",
                loadingRecords: "Cargando registros...",
                zeroRecords: "No se encontraron registros",
                emptyTable: "No hay datos disponibles en la tabla",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Último"
                },
                aria: {
                    sortAscending: ": Activar para ordenar la tabla en orden ascendente",
                    sortDescending: ": Activar para ordenar la tabla en orden descendente"
                }
            }
        };

        vm.init = init;

        vm.agregarDocumento = agregarDocumento;
        vm.editarDocumento = editarDocumento;
        vm.eliminarDocumento = eliminarDocumento;
        //vm.subirArchivo = subirArchivo;

        function eliminarDocumento(document) {
            AjaxCall("POST", URL_SERVIDOR + "/Document/delete/" + document.id, null, function (response) {
                StateMessage("Atención", "Documento eliminado correctamentre", "success");
                vm.init();
            });
        }

        vm.modalArchivo = modalArchivo;

        function modalArchivo(ev, data) {

            vm.mostrarCargando();

            AjaxCall("GET", URL_SERVIDOR + "/Document/ShowDocumentFile/" + data.id, null, function (response) {
                
                if (response.TemplateFile == " ") {
                    swal("Atención", "No se ha cargado un documento", "info");
                    $mdDialog.hide();
                }

                if ("application/" + data.file_format == "application/msword") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = data.DocumentName + ".doc";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + data.file_format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = data.DocumentName + ".docx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + data.file_format == "application/vnd.ms-excel") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = data.DocumentName + ".xls";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + data.file_format == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    
                    dlnk.download = data.DocumentName + ".xlsx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + data.file_format == "application/pdf") {
                    $mdDialog.show({
                        controller: function ($scope, $mdDialog, formWizardData) {
                            $scope.data = formWizardData;

                            $scope.data.bas64;
                            $scope.data.formato;
                            $scope.trustSrc = function (src) {
                                return $sce.trustAsResourceUrl(src);
                            }

                            AjaxCall("GET", URL_SERVIDOR + "/Document/ShowDocumentFile/" + $scope.data.id, null, function (response) {
                                if (response.TemplateFile == " ") {
                                    swal("Atención", "No se ha cargado un documento", "info");
                                    $mdDialog.hide();
                                }

                                $scope.data.formato = response.datos[0].file_format;
                                $scope.data.bas64 = response.datos[0].TemplateFile;

                            }, function () {
                                $scope.$apply(function () {
                                    $scope.mostrarArchivo();
                                });
                            });

                            $scope.mostrarArchivo = function () {
                                switch ($scope.data.formato) {
                                    case 'png':
                                        $scope.file = "data:image/png;base64," + $scope.data.bas64;
                                        break;
                                    case 'jpg':
                                        $scope.file = "data:image/jpg;base64," + $scope.data.bas64;
                                        break;
                                    case 'jpeg':
                                        $scope.file = "data:image/jpeg;base64," + $scope.data.bas64;
                                        break;
                                    case 'pdf':
                                        $scope.file = "data:application/pdf;base64," + $scope.data.bas64;
                                        break;
                                }
                            }

                            $scope.enviarInformacion = function () {
                                
                            }

                            $scope.closeDialog = function () {
                                $mdDialog.hide();
                            };
                        },
                        templateUrl: 'app/main/catalogos/docPrograma/html/formularioPDF.html',
                        parent: angular.element('body'),
                        targetEvent: ev,
                        locals: {
                            formWizardData: data
                        },
                        clickOutsideToClose: true
                    });
                }

            }, function () {
                
            });
        }

        function agregarDocumento(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = {
                        for_ticket_or_medical_support: false,
                        ForScholarshipAssignation : false,
                        url: false
                    };
                    $scope.disabledBoton = false;
                    $scope.archivoEnBase64;
                    $scope.enableForScholarshipAssignation = false;
                    
                    $scope.restriccionMedicalSupport = function(){
                        if($scope.data.ForScholarshipAssignation === false && $scope.data.for_ticket_or_medical_support === false){
                            $scope.data.ForScholarshipAssignation = true;
                        }
                    };

                    $scope.restriccionForScho = function(){
                        if($scope.data.ForScholarshipAssignation === true && $scope.data.for_ticket_or_medical_support === true){
                            $scope.data.for_ticket_or_medical_support = false;
                        }
                    }

                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.$apply(function () {
                            $scope.clasificacion.opciones = response.datos;
                        });
                    }, function () {

                    });

                    $scope.anexarArchivo = function () {
                        $scope.subirArchivo(document.getElementById('documentFile').files, 'documentFile', 4000);
                    }

                    $scope.subirArchivo = function (file, inputid, idProceso) {

                    }

                    $scope.enviarInformacion = function () {

                        if($scope.data.for_ticket_or_medical_support !== undefined && $scope.data.for_ticket_or_medical_support === true){
                            if($scope.data.ForScholarshipAssignation === undefined || $scope.data.ForScholarshipAssignation === false){
                                swal("Atención", "Debes seleccionar que es un documento para asignación de beca", "error");
                                return false;
                            }
                        }



                        vm.mostrarCargando();

                        $scope.disabledBoton = true;
                        var file = document.getElementById('documentFile').files;
                        var inputid = 'documentFile';
                        var idProceso = 4000;

                        var files = file;
                        var nombreArchivo = "";
                        var archivos = new Array();
 
                        if (files.length > 0) {
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
                                    swal("Atención", "Solamente puedes seleccionar archivos pdf|doc|docx|xlsx|xls|png|jpeg|jpg|pdf", "error");
                                    $scope.disabledBoton = false;
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
                                        var objData = {
                                            "Classification_id": $scope.clasificacion.modelo,
                                            "DocumentName": $scope.data.DocumentName,
                                            "RequiresTemplateFile": $scope.data.RequiresTemplateFile ? $scope.data.RequiresTemplateFile : false,
                                            "TemplateFile": $scope.archivoEnBase64 ? $scope.archivoEnBase64 : " ",
                                            "ForScholarshipAssignation": $scope.data.ForScholarshipAssignation ? $scope.data.ForScholarshipAssignation : false,
                                            "file_format": formatoDoc,
                                            "for_ticket_or_medical_support": $scope.data.for_ticket_or_medical_support ? $scope.data.for_ticket_or_medical_support : false,
                                            "url": $scope.data.url ? $scope.data.url:false
                                        };
                                        

                                        AjaxCall("POST", URL_SERVIDOR + '/Document',
                                            objData, function (response) {
                                                
                                                if (response.Codigo == "201") {
                                                    StateMessage("Atención", response.mensaje, "success");
                                                    $scope.closeDialog();
                                                    vm.cerrarCargando();
                                                    vm.init();
                                                } else if (response.Codigo == "422") {
                                                    StateMessage("Atención", response.mensaje, "info");

                                                }
                                            });

                                    }, false);
                                    picReader.readAsDataURL(_file);
                                }

                            }
                            $scope.disabledBoton = false;
                        } else {
                            var objData = {
                                "Classification_id": $scope.clasificacion.modelo,
                                "DocumentName": $scope.data.DocumentName,
                                "RequiresTemplateFile": $scope.data.RequiresTemplateFile ? $scope.data.RequiresTemplateFile : false,
                                "TemplateFile": $scope.archivoEnBase64 ? $scope.archivoEnBase64 : " ",
                                "ForScholarshipAssignation": $scope.data.ForScholarshipAssignation ? $scope.data.ForScholarshipAssignation : false,
                                "file_format": "",
                                "for_ticket_or_medical_support": $scope.data.for_ticket_or_medical_support ? $scope.data.for_ticket_or_medical_support : false,
                                "url": $scope.data.url ? $scope.data.url:false
                            };


                            AjaxCall("POST", URL_SERVIDOR + '/Document',
                                objData, function (response) {
                                    if (response.Codigo == "201") {
                                        StateMessage("Atención", response.mensaje, "success");
                                        $scope.closeDialog();
                                        vm.cerrarCargando();
                                        vm.init();
                                    } else if (response.Codigo == "422") {
                                        StateMessage("Atención", response.mensaje, "info");

                                    }
                                });
                            $scope.disabledBoton = false;
                        }


                    };

                    $scope.closeDialog = function () {

                        $mdDialog.hide();
                    };

                },
                templateUrl: 'app/main/catalogos/docPrograma/html/formularioDocPrograma.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function editarDocumento(ev, data) {
            
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;

                    
                    $scope.disabledBoton = false;
                    $scope.archivoEnBase64;
                    $scope.enableForScholarshipAssignation = false;
                    
                    $scope.restriccionMedicalSupport = function(){
                        if($scope.data.ForScholarshipAssignation === false && $scope.data.for_ticket_or_medical_support === false){
                            $scope.data.ForScholarshipAssignation = true;
                        }
                    };

                    $scope.restriccionForScho = function(){
                        if($scope.data.ForScholarshipAssignation === true && $scope.data.for_ticket_or_medical_support === true){
                            $scope.data.for_ticket_or_medical_support = false;
                        }
                    }

                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    }

                    if($scope.data.for_ticket_or_medical_support == 1){
                        $scope.data.for_ticket_or_medical_support = true;
                    }

                    if($scope.data.RequiresTemplateFile == 1){
                        $scope.data.RequiresTemplateFile = true;
                    }

                    if($scope.data.ForScholarshipAssignation == 1){
                        $scope.data.ForScholarshipAssignation = true;
                    }

                    if($scope.data.url == 1){
                        $scope.data.url = true;
                    }
 
                    $scope.anexarArchivo = function () {
                        $scope.subirArchivo(document.getElementById('documentFile').files, 'documentFile', 4000);
                    }

                    $scope.archivoEnBase64 = "";

                    $scope.subirArchivo = function (file, inputid, idProceso) {

                        var files = file;
                        var nombreArchivo = "";
                        var archivos = new Array();

                        if (files.length > 0) {
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
                                    swal("Atención", "Solamente puedes seleccionar archivos pdf|doc|docx|xlsx|xls|png|jpeg|jpg|pdf", "error");
                                    $scope.disabledBoton = false;
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
                                        $scope.archivoFileFormat = formatoDoc;
                                        $scope.archivoEnBase64 = base64.split(",")[1];
                                    }, false);
                                    picReader.readAsDataURL(_file);
                                }
                            }
                        }else{
                            swal("Atención", "Debe seleccionar un archivo", "error");
                            return false;
                        }
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.$apply(function () {
                            $scope.clasificacion.opciones = response.datos;
                            
                        });
                    }, function () {
                        $scope.clasificacion.modelo = $scope.data.Classification_Id;
                    });


                    $scope.enviarInformacion = function () {
                        var objData ={};
                        if(document.getElementById('documentFile').files.length>0){
                            $scope.anexarArchivo();
                            objData = {
                                "Classification_id": $scope.clasificacion.modelo,
                                "DocumentName": $scope.data.DocumentName,
                                "RequiresTemplateFile": $scope.data.RequiresTemplateFile ? $scope.data.RequiresTemplateFile : false,
                                "TemplateFile": $scope.archivoEnBase64 ? $scope.archivoEnBase64 : $scope.data.TemplateFile,
                                "ForScholarshipAssignation": $scope.data.ForScholarshipAssignation ? $scope.data.ForScholarshipAssignation : false,
                                "file_format": $scope.archivoFileFormat ? $scope.archivoFileFormat  : '',
                                "for_ticket_or_medical_support": $scope.data.for_ticket_or_medical_support ? $scope.data.for_ticket_or_medical_support : false,
                                "url": $scope.data.url ? $scope.data.url : false
                            };
                        }else{
                            objData = {
                                "Classification_id": $scope.clasificacion.modelo,
                                "DocumentName": $scope.data.DocumentName,
                                "RequiresTemplateFile": $scope.data.RequiresTemplateFile ? $scope.data.RequiresTemplateFile : false,
                                "ForScholarshipAssignation": $scope.data.ForScholarshipAssignation ? $scope.data.ForScholarshipAssignation : false,
                                "for_ticket_or_medical_support": $scope.data.for_ticket_or_medical_support ? $scope.data.for_ticket_or_medical_support : false,
                                "url": $scope.data.url ? $scope.data.url : false
                            };
                        }                 

                        AjaxCall("POST", URL_SERVIDOR + '/Document/update/' + $scope.data.id,
                            objData, function (response) {
                                if (response.Codigo == "201") {
                                    StateMessage("Atención", "Documento modificado correctamente", "success");
                                    $scope.closeDialog();
                                    vm.init();
                                } else if (response.Codigo == "422") {
                                    StateMessage("Atención", response.mensaje, "info");

                                }
                            });
                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/catalogos/docPrograma/html/formularioDocPrograma.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }


        // var tipoArchivo = $scope.obtenerTipoArchivo(archivoId);
        // var filetype = $scope.fileTypeArchivo(tipoArchivo);

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


        function init() {
            vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/Document", null, function (response) {
                $scope.$apply(function () {
                    $scope.documentos = response.datos;
                });
                
            }, function () {
                vm.cerrarCargando();
            });

        }
        vm.init();

 
        // if (filetype == "video/mp4") {
        //     $("#modalVideo").modal("show");

        //     var dlnk = document.getElementById('controlVideo');
        //     dlnk.poster = "./img/logo_4q.svg";
        //     var audio = 'data:video/mp4;base64,' + json;

        //     // dlnk.download = "evidencia.doc";
        //     dlnk.src = audio;
        //     //dlnk.play();
        // } else if (filetype == "audio/mp3") {
        //     $("#modalAudio").modal("show");
        //     var dlnk = document.getElementById('controlAudio');
        //     var audio = 'data:audio/ogg;base64,' + json;
        //     // dlnk.download = "evidencia.doc";
        //     dlnk.src = audio;
        //     //dlnk.play();
        // } else if (filetype == "application/msword") {
        //     var dlnk = document.getElementById('descargarArchivo');
        //     var pdf = 'data:application/octet-stream;base64,' + json;
        //     dlnk.download = "evidencia.doc";
        //     dlnk.href = pdf;
        //     dlnk.click();
        // } else if (filetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        //     var dlnk = document.getElementById('descargarArchivo');
        //     var pdf = 'data:application/octet-stream;base64,' + json;
        //     dlnk.download = "evidencia.docx";
        //     dlnk.href = pdf;
        //     dlnk.click();
        // } else if (filetype == "application/vnd.ms-excel") {
        //     var dlnk = document.getElementById('descargarArchivo');
        //     var pdf = 'data:application/octet-stream;base64,' + json;
        //     dlnk.download = "evidencia.xls";
        //     dlnk.href = pdf;
        //     dlnk.click();
        // } else if (filetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        //     var dlnk = document.getElementById('descargarArchivo');
        //     var pdf = 'data:application/octet-stream;base64,' + json;
        //     dlnk.download = "evidencia.xlsx";
        //     dlnk.href = pdf;
        //     dlnk.click();
        // } else if (filetype == "application/pdf;base64,") {
        //     $("#framePDF").attr("src", 'data:application/pdf;base64,' + json);
        //     $("#modalPDF").modal("show");
        //     // window.open('data:application/pdf;base64,' + json);
        // } else {
        //     $("#framePDF").attr("src", filetype + json);
        //     $("#modalPDF").modal("show");
        //     //window.open(filetype + json);
        // }


    }


})();
