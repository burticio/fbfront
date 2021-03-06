(function () {
    'use strict';

    angular
        .module('app.validacionUniversidad')
        .controller('validacionUniversidadController', validacionUniversidadController);

    /** @ngInject */
    function validacionUniversidadController($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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


        $scope.solicitudes = {};
        $scope.resumen = {};
        //$scope.documentos = {};
        $scope.motivocancelacion="";
        $scope.uType = localStorageService.get("session_typeId");

        vm.init = init;

        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            order: [[ 6, "asc" ]],
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

        $scope.verDetalle = function (ev, data){
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.data = formWizardData;
 
                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/validacionUniversidad/html/modalDetalle.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        /******************************************************************/
        /*                 MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        $scope.dlgcancelarSolicitud = function (ev, solicitud) {
            $mdDialog.show({
                locals: { localSolicitud : solicitud },
                controller: CancelarSolicitudController,
                templateUrl: 'app/main/validacionUniversidad/html/dialogo.cancelarsolicitud.html',
                parent: angular.element('body'),
                targetEvent: solicitud,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.cancelarSolicitud(solicitud)
            }, function() {});
        };
        // <==========  ==========>

        // <========== CONTROLLER  ==========>
        function CancelarSolicitudController($scope, $mdDialog,localSolicitud) {
            //$scope.array_programs = array_programs;
            $scope.respuestaCancelarSolicitud = function (respuesta, motivocancelacion) {
                if (respuesta) {
                    localStorageService.set("cancel_reason", motivocancelacion);
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLER  ==========>

        // <==========  ==========>
        $scope.validarSolicitud = function (ev, solicitud) {
            var id = solicitud.id;
            var cancelreason = localStorageService.get("cancel_reason");
            var data = {
                "cancel_reason": cancelreason
            };
            AjaxCall("POST", URL_SERVIDOR + "/Application/ValidaUni/" + id, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    }
                });
            }, function () {});
        }

        $scope.cancelarSolicitud = function (solicitud) {
            var id = solicitud.id;
            var cancelreason = localStorageService.get("cancel_reason");
            var data = {
                "cancel_reason": cancelreason
            };
            AjaxCall("POST", URL_SERVIDOR + "/Application/opCancel/" + id, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    }
                });
            }, function () {});
        }

        /******************************************************************/
        /*             FIN MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        function init() {
            vm.mostrarCargando();
            $scope.aux = [];

            AjaxCall("GET", URL_SERVIDOR + "/ApplicationValUni", null, 
                function (response) { //success
                    $scope.solicitudes = response.datos;
                
            }, function () {//callback
                //vm.cerrarCargando();
            },function (jqXHR, exception) { //error
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Hubo un error en la conexión. Favor de verificar la red e intentar nuevamente.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Error de respuesta en el servidor [500].\nFavor de intentar nuevamente. Si el error persiste, llame a soporte técnico.';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Error desconocido.\n' + jqXHR.responseText;
                }
                swal("Atención", msg, "error");
                //vm.cerrarCargando();
            });

            AjaxCall("GET", URL_SERVIDOR + "/Reports/listapplicationsunivalidation", null, 
                function (response) { //success
                    $scope.resumen = response.datos;
                
            }, function () {//callback
                //vm.cerrarCargando();
            },function (jqXHR, exception) { //error
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Hubo un error en la conexión. Favor de verificar la red e intentar nuevamente.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Error de respuesta en el servidor [500].\nFavor de intentar nuevamente. Si el error persiste, llame a soporte técnico.';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Error desconocido.\n' + jqXHR.responseText;
                }
                swal("Atención", msg, "error");
                //vm.cerrarCargando();
            });

            vm.cerrarCargando();
        };       
        vm.init();
    }
})();
