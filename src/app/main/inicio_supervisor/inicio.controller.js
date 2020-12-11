(function () {
    'use strict';

    angular
        .module('app.inicio_supervisor')
        .controller('InicioSupervisorController', InicioSupervisorController);

    /** @ngInject */
    function InicioSupervisorController($scope, localStorageService, msNavigationService) {
        var vm = this;
 
      

        $scope.solicitudes = {};
        $scope.documentos = {};

        vm.verDocumentos = verDocumentos;
        vm.init = init;

        function verDocumentos(solicitud) {

            var objData = {
                "id": solicitud.id,
                "Classification_Id": solicitud.Classification_Id
            };

            AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/showPerApplication", objData, function (response) {

                if (response.Codigo == "404") {
                    swal("Atención", response.mensaje, "info");
                } 
                
                if (response.Codigo == "200") {
                    
                    $scope.documentos = response.datos;
                    
                }
            }, function () {

            });
        }

        function init() {
            var objData = { "person_id": localStorageService.get("session_idUsuario") };
            AjaxCall("POST", URL_SERVIDOR + "/personalApplications", objData, function (response) {
                $scope.$apply(function () {
                    $scope.solicitudes = response.datos;
                });
            }, function () {
                
            });
        };

        vm.init();
    }
})();
