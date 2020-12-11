(function () {
    'use strict';

    angular
        .module('app.inicio_operador')
        .controller('InicioOperadorController', InicioOperadorController);

    /** @ngInject */
    function InicioOperadorController($scope, localStorageService, msNavigationService, $state) {
        var vm = this;
    

        $scope.solicitudes = {};
        $scope.documentos = {};

        $scope.irOrientacionVocacional = function(solicitud){
            localStorageService.set("objOV", solicitud);
            $state.go("app.orientacionVocacional");
        }
        
        vm.init = init;

          vm.dtOptions =  {
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
          

        $scope.validarDocumentos = function(solicitud) {
       
            localStorageService.set("validarDocumentos", solicitud);
            $state.go("app.validarDocumentos");
             
        }

        function init() {

            AjaxCall("GET", URL_SERVIDOR + "/Application", null, function (response) {
                $scope.$apply(function () {
                    $scope.solicitudes = response.datos;
                });
            }, function () {

            });
        };

        vm.init();
    }
})();
