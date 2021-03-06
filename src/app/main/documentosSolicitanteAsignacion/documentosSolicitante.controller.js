(function () {
    'use strict';

    angular
        .module('app.documentosSolicitanteAsignacion')
        .controller('documentosSolicitanteAsignacion', documentosSolicitanteAsignacion);

    /** @ngInject */
    function documentosSolicitanteAsignacion($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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
        $scope.documentos = {};
        $scope.uType = localStorageService.get("session_typeId");

        $scope.irOrientacionVocacional = function (solicitud) {
            localStorageService.set("objOV", solicitud);
            $state.go("app.orientacionVocacional");
        }

        vm.init = init;

        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            dom: 'Bfrtip',
            order: [[ 6, "asc" ]],
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

        $scope.validarDocumentos = function (solicitud) {
            localStorageService.set("validarDocumentos", solicitud);
            localStorageService.set("isDocumentosAceptacion",false);
            $state.go("app.validarDocumentos");
        }

        $scope.validarDocumentosAceptacion = function(solicitud){
            localStorageService.set("validarDocumentos", solicitud);
            localStorageService.set("isDocumentosAceptacion",true);
            $state.go("app.validarDocumentos");
        }

        function init() {
            vm.mostrarCargando();
            
            AjaxCall("GET", URL_SERVIDOR + "/ApplicationFA", null, function (response) {
                $scope.$apply(function () {
                    response.datos.forEach(function(element) {
                        if(element.status == 21 || element.status == 15){
                            $scope.solicitudes.push(element);
                        }
                    });
                });
            }, function () {
                vm.cerrarCargando();
            });
        };

        

        vm.init();
    }
})();
