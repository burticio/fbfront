(function () {
    'use strict';

    angular
        .module('app.reportesUniversidad')
        .controller('reportesUniversidadController', reportesUniversidadController);

    /** @ngInject */
    function reportesUniversidadController($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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

        $scope.activasdocs = [];
        $scope.validateddocs = [];
        $scope.interviewsactive = [];

        $scope.paises ={
            modelo: null,
            opciones: []
        };

        $scope.universidades ={
            modelo: null,
            opciones: []
        };

        vm.init = init;

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
            searching: false,
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

        vm.dtInstance1 ={};


        vm.mostrarCargando = mostrarCargando;
        vm.cerrarCargando = cerrarCargando;
        vm.cargaUniversidades = cargaUniversidades;
        vm.cargaReportes = cargaReportes;

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

        $scope.downloadFileDocsActive = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportdocsactiveuni/" + $scope.universidades.modelo;
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        $scope.downloadFileValidatedDocs = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportvalidateddocappactiveuni/" + $scope.universidades.modelo;
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        $scope.downloadFileInterviewsActive = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportinterviewsactiveuni/" + $scope.universidades.modelo;
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        $scope.downloadFileReportOperationPost = function () {
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportoperationpostreport";
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        function cargaReportes() {
            vm.mostrarCargando();
            var objData = {
                    "University_Id": $scope.universidades.modelo ? $scope.universidades.modelo : 0,
                }
            AjaxCall("POST", URL_SERVIDOR + "/Reports/listdocsactiveuni", objData, 
                function (response) { //success
                    $scope.activasdocs = response.datos;
                    //vm.dtInstance1.renderer();
                
            }, function () {//callback
                vm.dtInstance1.renderer();
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

            //vm.mostrarCargando();
            AjaxCall("POST", URL_SERVIDOR + "/Reports/listvalidateddocappactiveuni", objData, 
                function (response) { //success
                    $scope.validateddocs = response.datos;
                
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

            AjaxCall("POST", URL_SERVIDOR + "/Reports/listinterviewsactiveuni", objData, 
                function (response) { //success
                    $scope.interviewsactive = response.datos;
                
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

        function cargaUniversidades() {
            vm.mostrarCargando();
            var objData = {
                    "country_id": $scope.paises.modelo ? $scope.paises.modelo : 0,
                }

            AjaxCall("POST", URL_SERVIDOR + "/Application/universities", objData, 
                function (response) { //success
                    $scope.universidades.opciones = response.universities;
                    $scope.universidades.modelo = null;
                    $scope.activasdocs = [];
                    $scope.validateddocs = [];
                    $scope.interviewsactive = [];
                
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

        function init() {
            vm.mostrarCargando();

            AjaxCall("GET", URL_SERVIDOR + "/Application/countries", null, 
                function (response) { //success
                    $scope.paises.opciones = response.countries;
                
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
