(function () {
    'use strict';

    angular
        .module('app.inicio_solicitante')
        .controller('InicioSolicitanteController', InicioSolicitanteController);

    /** @ngInject */
    function InicioSolicitanteController($scope, localStorageService, msNavigationService, $mdDialog, $sce) {
        var vm = this;

        $scope.ocultaPrincipal = true;
        $scope.habilitarDocumentos = false;
        $scope.habilitarDocumentosAceptacion = false;
        $scope.cambiaColorBoton = function (documento) {
            if ($("#documentFile_" + documento.id).files > 0) {
                $("#estiloBoton_" + documento.id).css({ 'background-color': 'green' });
            }
        }

        // angular.module('app.inicio_solicitante', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
        //     this.myDate = new Date();
        //     this.minDate = new Date(
        //       this.myDate.getFullYear(),
        //       this.myDate.getMonth(),
        //       this.myDate.getDate()
        //     );
        //     this.onlyWeekendsPredicate = function(date) {
        //       var day = date.getDay();
        //       return day === 6;
        //     };
        // });

        // <========== VARIABLES INICIALES ==========>
        $scope.cita = {};
        $scope.citaLength = {};
        $scope.date = {};
        $scope.documentos = {};
        $scope.documentosAceptacion = {};
        $scope.solicitudes = {};
        $scope.solicitudesAceptacion = {};
        // <========== VARIABLES INICIALES ==========>

        // <========== FECHA Y HORA OBTENIDAS ==========>
        vm.fechaEntrevista = new Date();
        $scope.minFechaEntrevista = moment(new Date()).format('YYYY-MM-DD')
        vm.isOpen = false;
        // <========== FECHA Y HORA OBTENIDAS ==========>

        // <========== CONFIGURACION DEL CALENDARIO ==========>
        $scope.meses = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        // <========== CONFIGURACION DEL CALENDARIO ==========>

        // <========== VARIABLES INICIALES ==========>
        vm.init = init;
        vm.aceptarFecha = aceptarFecha;
        vm.proponerFecha = proponerFecha;
        vm.verDocumentos = verDocumentos;
        // <========== VARIABLES INICIALES ==========>

        // <========== METODO PROPONER FECHA SOLICITANTE ==========>
        function proponerFecha(cita) {
            var ctrl = {
                minDateActual: new Date(moment().format('L')),
            }
            localStorageService.set("entrevista_id", cita.interview_Id)
            localStorageService.set("fecha_seleccionada", vm.fechaEntrevista);
            $mdDialog.show({
                locals: { ctrl: ctrl },
                controller: ProponerFechaController,
                templateUrl: 'app/main/inicio_solicitante/html/dialogo.proponerfecha.html',
                parent: angular.element(document.body),
                targetEvent: cita,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.proponerFechaSolicitante()
            }, function () { });
        }
        // <========== METODO PROPONER FECHA SOLICITANTE ==========>

        // <========== CONTROLLER DEL PROPONER FECHA ==========>
        function ProponerFechaController($scope, $mdDialog, ctrl) {
            $scope.ctrl = ctrl;
            
            $scope.horario = {
                opciones: [{
                    value: "10:00 am"
                },
                {
                    value: "10:30 am"
                },
                {
                    value: "11:00 am"
                },
                {
                    value: "11:30 am"
                },
                {
                    value: "12:00 pm"
                },
                {
                    value: "12:30 pm"
                },
                {
                    value: "01:00 pm"
                },
                {
                    value: "01:30 pm"
                },
                {
                    value: "02:00 pm"
                },
                {
                    value: "02:30 pm"
                },
                {
                    value: "03:00 pm"
                },
                {
                    value: "03:30 pm"
                },
                {
                    value: "04:00 pm"
                },
                {
                    value: "04:30 pm"
                },
                {
                    value: "05:00 pm"
                },
                {
                    value: "05:30 pm"
                },
                {
                    value: "06:00 pm"
                }]
            };

            $scope.respuestaProponerFecha = function (agendar) {
                var modaltime = $("#datetimepickermodal").val();
                var validOne = modaltime.replace('"', '')
                var validTwo = validOne.replace('"', '')
                var fecha = moment(validTwo).format('YYYY-M-DD')
                var horario = fecha + " " + $scope.time;
                localStorageService.set("fecha_seleccionada", moment(horario).format('YYYY-M-DD h:mm a'))
                if (agendar) {
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLER DEL PROPONER FECHA ==========>

        // <========== GUARDAR FECHA DEL SOLICITANTE ==========>
        $scope.proponerFechaSolicitante = function () {
            var data = {
                "date": localStorageService.get("fecha_seleccionada")
            }
            var entrevistaId = localStorageService.get("entrevista_id")
            AjaxCall("POST", URL_SERVIDOR + "/Interview/proposedateapplicant/" + entrevistaId, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function () {
                            location.reload();
                        });
                    } else {
                        swal("¡Atención!", response.mensaje, "error")
                    }
                });
            }, function () { });
        }
        // <========== GUARDAR FECHA DEL SOLICITANTE ==========>

        // <========== METODO ACEPTAR FECHA SOLICITANTE ==========>
        function aceptarFecha(cita) {
            var entrevistaId = cita.interview_Id
            AjaxCall("POST", URL_SERVIDOR + "/Interview/acceptdate/" + entrevistaId, null, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function () {
                            location.reload();
                        });
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function () { });
                    }
                });
            }, function () { });
        }
        // <========== METODO ACEPTAR FECHA SOLICITANTE ==========>

        function verDocumentos(solicitud) {
            vm.mostrarCargando();
            var objData = {
                "id": solicitud.id,
                "Classification_Id": solicitud.Classification_Id
            };
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/showPerApplication", objData, function (response) {
                if (response.Codigo == "404") {
                    swal("Atención", response.mensaje, "info");
                }

                $scope.$apply(function () {
                    $scope.documentos = response.datos;
                    $scope.habilitarDocumentos = true;
                    $scope.ocultaPrincipal = false;

                });

            }, function () {
                vm.cerrarCargando();
            });
        }
        vm.verDocumentosAceptacion = verDocumentosAceptacion;

        function verDocumentosAceptacion(solicitud) {
            vm.mostrarCargando();
            var objData = {
                "id": solicitud.id,
                "Classification_Id": solicitud.Classification_Id
            };
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocumentFA/showPerApplication", objData, function (response) {
                if (response.Codigo == "404") {
                    swal("Atención", response.mensaje, "info");
                }

                $scope.$apply(function () {
                    $scope.documentosAceptacion = response.datos;
                    $scope.habilitarDocumentosAceptacion = true;
                    $scope.habilitarDocumentos = false;
                    $scope.ocultaPrincipal = false;

                });

            }, function () {
                vm.cerrarCargando();
            });
        }

        vm.modalArchivo = modalArchivo;

        function modalArchivo(ev, data) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;

                    $scope.data.bas64;
                    $scope.data.formato;
                    $scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocument/" + $scope.data.id, null, function (response) {

                        if (response.TemplateFile == " ") {
                            swal("Atención", "No se ha cargado un documento", "info");
                            $mdDialog.hide();
                        }

                        $scope.data.formato = response.datos[0].file_format;
                        $scope.data.bas64 = response.datos[0].value;

                    }, function () {

                        $scope.$apply(function () {
                            $scope.mostrarArchivo();
                        });
                    });


                    $scope.mostrarArchivo = function () {


                        switch ($scope.data.formato) {
                            case 'mp4':
                                return 'video/mp4';
                                break;
                            case 'mp3':
                                return 'audio/mp3'
                                break;
                            case 'msword':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.doc";
                                dlnk.href = pdf;
                                dlnk.click();
                                break;
                            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.docx";
                                dlnk.href = pdf;
                                dlnk.click();
                                break;
                            case 'vnd.ms-excel':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.xls";
                                dlnk.href = pdf;
                                dlnk.click();
                                break;
                            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.xlsx";
                                dlnk.href = pdf;
                                dlnk.click();
                                break;
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
                            case 'youtube':
                                $scope.file = "https://www.youtube.com/embed/" + $scope.data.bas64;

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

        $scope.anexarArchivo = function (documento) {

            $scope.subirArchivo(documento);
        }

        $scope.anexarArchivoAceptacion = function (documento) {
            $scope.subirArchivoAceptacion(documento);
        }

        $scope.subirArchivo = function (documento) {
            vm.mostrarCargando();

            if (documento.status == 1) {
                swal("Atención", "El documento se encuentra en validación con nuestros operadores", "info");
                return false;
            }

            if (documento.status == 2) {
                swal("Atención", "El documento ya fue validado", "info");
                return false;
            }


            $scope.disabledBoton = true;
            var file = document.getElementById('documentFile_' + documento.id).files;


            var files = file;
            var nombreArchivo = "";
            var archivos = new Array();

            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    /*if (files[i].type === "application/msword" ||
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
                    } //PERMITE VARIOS TIPOS DE ARCHIVO
                    */

                    //SOLO ARCHIVOS PDF

                    if (files[i].type === "application/pdf") {
                        nombreArchivo = "<b>" + files[i].name + "</b>";
                    } else {
                        swal("Atención", "Solamente puedes seleccionar archivos .pdf", "error");
                        return false;
                    }//SOLO ARCHIVOS PDF
                }

                /* 
                //VARIOS TIPOS DE ARCHIVOS
                if (files[0].type === "application/msword" ||
                    files[0].type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                    files[0].type === "application/vnd.ms-excel" ||
                    files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    files[0].type === "image/png" ||
                    files[0].type === "image/jpeg" ||
                    files[0].type === "image/jpg" ||
                    files[0].type === "application/pdf") {*/

                // SOLO ARCHIVOS PDF
                if (files[0].type === "application/pdf") {
                    for (var j = 0; j < files.length; j++) {
                        var _file = files[j];
                        var picReader = new FileReader();

                        picReader.addEventListener("load", function (event) {

                            var base64 = event.target.result;
                            var formatoDoc = _file.type.split("/")[1];
                            $scope.archivoEnBase64 = base64.split(",")[1];

                            var objData = {
                                "id": documento.id,
                                "name": files[0].name,
                                "value": $scope.archivoEnBase64,
                                "Application_id": documento.application_Id,
                                "file_format": formatoDoc
                            }

                            AjaxCall("POST", URL_SERVIDOR + '/ApplicationDocument/loadfile',
                                objData, function (response) {

                                    if (response.Codigo == "201") {
                                        StateMessage("Atención", response.mensaje, "success");
                                        for (var i = 0; i < $scope.solicitudes.length; i++) {
                                            if (documento.application_Id == $scope.solicitudes[i].id) {
                                                vm.verDocumentos($scope.solicitudes[i]);
                                            }
                                        }
                                        vm.cerrarCargando();
                                    } else if (response.Codigo == "422") {
                                        StateMessage("Atención", response.mensaje, "info");
                                    }
                                });
                        }, false);
                        picReader.readAsDataURL(_file);
                    }
                }
                $scope.disabledBoton = false;
            } else if (documento.name!="" && documento.url==1){

                var videoId = vm.extraerVideoId(documento.name);

                    if (videoId.ismatch){

                    var objData = {
                        "id": documento.id,
                        "name": "Video",
                        "value": videoId.id,
                        "Application_id": documento.application_Id,
                        "file_format": videoId.type
                    }

                    AjaxCall("POST", URL_SERVIDOR + '/ApplicationDocument/loadfile',
                        objData, function (response) {

                            if (response.Codigo == "201") {
                                StateMessage("Atención", response.mensaje, "success");
                                for (var i = 0; i < $scope.solicitudes.length; i++) {
                                    if (documento.application_Id == $scope.solicitudes[i].id) {
                                        vm.verDocumentos($scope.solicitudes[i]);
                                    }
                                }
                                vm.cerrarCargando();
                            } else if (response.Codigo == "422") {
                                StateMessage("Atención", response.mensaje, "info");
                            }
                        });
                }else{
                    swal("Atención", "URL inválida. Favor de Verificar", "error");
                    vm.cerrarCargando();
                    return false;
                }

            }else {
                swal("Atención", "Debes seleccionar un documento", "error");
                vm.cerrarCargando();
                return false;
            }
        };

        vm.extraerVideoId = extraerVideoId;

        function extraerVideoId(varurl) {

            var nuevoval = '';
            var newval = {
                ismatch : false,
                type : "",
                id: ""
            };
            var ismatch = false;

            if (nuevoval = varurl.match(/(\?|&)v=([^&#]+)/)) {
                newval.id = nuevoval.pop();
                newval.ismatch = true;
                newval.type="youtube";
            } else if (nuevoval = $this.val().match(/(\.be\/)+([^\/]+)/)) {
                newval.id = nuevoval.pop();
                ismatch = true;
                newval.type="youtube";
            } else if (nuevoval = $this.val().match(/(\embed\/)+([^\/]+)/)) {
                newval.id = nuevoval.pop().replace('?rel=0','');
                ismatch = true;
                newval.type="youtube";
            }

            return newval;
            
        }


        $scope.subirArchivoAceptacion = function (documento) {
            vm.mostrarCargando();

            if (documento.status == 1) {
                swal("Atención", "El documento se encuentra en validación con nuestros operadores", "info");
                return false;
            }

            if (documento.status == 2) {
                swal("Atención", "El documento ya fue validado", "info");
                return false;
            }


            $scope.disabledBoton = true;
            var file = document.getElementById('documentFileAceptacion_' + documento.id).files;


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

                            var objData = {
                                "id": documento.id,
                                "name": files[0].name,
                                "value": $scope.archivoEnBase64,
                                "Application_id": documento.application_Id,
                                "file_format": formatoDoc
                            }

                            AjaxCall("POST", URL_SERVIDOR + '/ApplicationDocumentFA/loadfile',
                                objData, function (response) {

                                    if (response.Codigo == "201") {
                                        StateMessage("Atención", response.mensaje, "success");
                                        for (var i = 0; i < $scope.solicitudes.length; i++) {
                                            if (documento.application_Id == $scope.solicitudes[i].id) {
                                                vm.verDocumentosAceptacion($scope.solicitudes[i]);
                                            }
                                        }
                                        vm.cerrarCargando();
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
                swal("Atención", "Debes seleccionar un documento", "error");
                vm.cerrarCargando();
                return false;
            }
        };

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

        // <========== CARGAR DATOS DEL SOLICITANTE ==========>
        function init() {
            var objData = { "person_id": localStorageService.get("session_idUsuario") };
            AjaxCall("POST", URL_SERVIDOR + "/personalApplications", objData, function (response) {

                $scope.$apply(function () {
                    $scope.solicitudes = response.datos;
                    loadAppointment(response.datos[response.datos.length-1]["id"])
                });
            }, function () { });
        };
        // <========== CARGAR DATOS DEL SOLICITANTE ==========>

        // <========== CARGAR DATOS DE LA ENTREVISTA ==========>
        function loadAppointment(application_Id) {
            var objData = {
                "application_Id": application_Id
            }
            AjaxCall("POST", URL_SERVIDOR + "/Interview/showapplication", objData, function (response) {
                $scope.$apply(function () {
                    $scope.cita = response.datos[0];
                    $scope.citaLength = response.datos.length;
                    if (response.datos.length != 0) {
                        $scope.diaCita = moment($scope.cita.date).format('DD')
                        $scope.mesCita = $scope.meses[moment($scope.cita.date).format('M')]
                        $scope.anioCita = moment($scope.cita.date).format('YYYY')
                        $scope.horaCita = moment($scope.cita.date).format('hh:mm a')
                    }
                });
            }, function () { });
        };
        // <========== CARGAR DATOS DE LA ENTREVISTA ==========>


        $scope.descargarFormatoAceptacion = function (documento) {
            vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocumentFA/" + documento.id, null, function (response) {
                var file = response.datos[0];


                if ("application/" + file.TemplateFile_Format == "application/msword") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".doc";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".docx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.ms-excel") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".xls";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;

                    dlnk.download = file.DocumentName + ".xlsx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + "." + file.TemplateFile_Format;
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();
                }
            }, function () {
                vm.cerrarCargando();
            });
        }

        $scope.eliminarArchivo = function(documento){
            vm.mostrarCargando();
            var objData = {
                "id": documento.id
            };
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/dropFile", objData, function (response) {
                if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function () {
                            for (var i = 0; i < $scope.solicitudes.length; i++) {
                                if (documento.application_Id == $scope.solicitudes[i].id) {
                                    vm.verDocumentos($scope.solicitudes[i]);
                                }
                            }
                        });
                    } else {
                        swal("¡Atención!", response.mensaje, "error")
                    }
            }, function () {
                vm.cerrarCargando();
            });
        }

        $scope.descargarFormato = function (documento) {
            vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocument/" + documento.id, null, function (response) {
                var file = response.datos[0];

                if ("application/" + file.TemplateFile_Format == "application/msword") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".doc";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".docx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.ms-excel") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + ".xls";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else if ("application/" + file.TemplateFile_Format == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;

                    dlnk.download = file.DocumentName + ".xlsx";
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();

                } else {
                    var dlnk = document.getElementById('descargarArchivo');
                    var pdf = 'data:application/octet-stream;base64,' + response.datos[0].TemplateFile;
                    dlnk.download = file.DocumentName + "." + file.TemplateFile_Format;
                    dlnk.href = pdf;
                    dlnk.click();
                    vm.cerrarCargando();
                }
            }, function () {
                vm.cerrarCargando();
            });
        }

        vm.modalArchivoAceptacion = modalArchivoAceptacion;

        function modalArchivoAceptacion(ev, data) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;

                    $scope.data.bas64;
                    $scope.data.formato;
                    $scope.trustSrc = function (src) {
                        return $sce.trustAsResourceUrl(src);
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocumentFA/" + $scope.data.id, null, function (response) {

                        if (response.TemplateFile == " ") {
                            swal("Atención", "No se ha cargado un documento", "info");
                            $mdDialog.hide();
                        }

                        $scope.data.formato = response.datos[0].file_format;
                        $scope.data.bas64 = response.datos[0].value;

                    }, function () {

                        $scope.$apply(function () {
                            $scope.mostrarArchivo();
                        });
                    });


                    $scope.mostrarArchivo = function () {


                        switch ($scope.data.formato) {
                            case 'mp4':
                                return 'video/mp4';
                                break;
                            case 'mp3':
                                return 'audio/mp3'
                                break;
                            case 'msword':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.doc";
                                dlnk.href = pdf;
                                dlnk.click();
                                $mdDialog.hide();
                                break;
                            case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.docx";
                                dlnk.href = pdf;
                                dlnk.click();
                                $mdDialog.hide();
                                break;
                            case 'vnd.ms-excel':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.xls";
                                dlnk.href = pdf;
                                dlnk.click();
                                $mdDialog.hide();
                                break;
                            case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                                var dlnk = document.getElementById('descargarArchivo');
                                var pdf = 'data:application/octet-stream;base64,' + $scope.data.bas64;
                                dlnk.download = "evidencia.xlsx";
                                dlnk.href = pdf;
                                dlnk.click();
                                $mdDialog.hide();
                                break;
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

        vm.init();
    }
})();
