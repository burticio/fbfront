(function () {
    'use strict';

    angular
        .module('app.reportesSabanaGeneral')
        .controller('reportesSabanaGeneralController', reportesSabanaGeneralController);

    /** @ngInject */
    function reportesSabanaGeneralController($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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

        $scope.solicitudes = [];

        vm.init = init;
        $scope.uType = localStorageService.get("session_typeId");

        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            order: [[ 0, "asc" ]],
            dom: 'Bfrtip',
            buttons: [
                'print',
                'csv'
            ],
            responsive: true,
            searching: true,
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

        $scope.downloadFileGeneral = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportgeneralapplications";
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        $scope.downloadFileGeneralAgencia = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportgeneralapplicationsagency";
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }


        function init() {
            vm.mostrarCargando();

            AjaxCall("GET", URL_SERVIDOR + "/Reports/listgeneralapplications", null, 
                function (response) { //success
                    $scope.solicitudes = response.datos;
                
            }, function () {//callback
                vm.cerrarCargando();
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


            //vm.cerrarCargando();
        };       
        vm.init();
    }
})();
