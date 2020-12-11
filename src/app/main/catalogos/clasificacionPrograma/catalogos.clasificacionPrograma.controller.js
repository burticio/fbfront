(function ()
{
    'use strict';

    angular
        .module('app.catalogos.clasificacionPrograma')
        .controller('ClasificacionProgramaController', ClasificacionProgramaController);

    /** @ngInject */
    function ClasificacionProgramaController($scope,$mdDialog,localStorageService,$state) {
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
        }

        $scope.clasificacion = [];
        $scope.uType = localStorageService.get("session_typeId");


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

        vm.init = init;



        vm.agregarClasificacion = agregarClasificacion;
        vm.editarClasificacion = editarClasificacion;
        vm.eliminarClasificacion = eliminarClasificacion;

        function eliminarClasificacion(clasificacion){
            AjaxCall("DELETE", URL_SERVIDOR + "/ProgramClassification/"+clasificacion.id,null, function (response) {
                StateMessage("Atención","Clasificacion eliminada correctamentre","success");
                vm.init();
            });
        }

        function agregarClasificacion(ev, dataClasificacion)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.dataClasificacion = formWizardData;

                    $scope.enviarInformacion= function ()
                    {
                         AjaxCall("POST",URL_SERVIDOR+ '/ProgramClassification',
                            $scope.dataClasificacion,function(response){
                                if(response.Codigo == "202"){
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                }
                            });
                    };

                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/clasificacionPrograma/html/formularioClasificacion.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: dataClasificacion
                },
                clickOutsideToClose: true
            });
        }

        function editarClasificacion(ev, dataClasificacion)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.dataClasificacion = formWizardData;

                    $scope.enviarInformacion= function ()
                    {
                        AjaxCall("PUT",URL_SERVIDOR+ '/ProgramClassification',
                            $scope.dataClasificacion,function(response){
                                if(response.Codigo == "202"){
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                }
                            });
                    };

                    $scope.closeDialog = function ()
                    {
                        init();
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/clasificacionPrograma/html/formularioClasificacion.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: dataClasificacion
                },
                clickOutsideToClose: true
            });
        }


        function init(){
           vm.mostrarCargando();
            AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification",null, function (response) {
                $scope.$apply(function(){
                    $scope.clasificacion = response.datos;
                });
                vm.cerrarCargando();
            }, function () {
                vm.upload = true;
            });
        }

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


        vm.init();

    }


})();
