(function ()
{
    'use strict';

    angular
        .module('app.catalogos.criterios')
        .controller('CriteriosController', CriteriosController);

    /** @ngInject */
    function CriteriosController($scope, $mdDialog,localStorageService,$state) {
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

        $scope.criterios  = []; 
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

        vm.agregarCriterios = agregarCriterios;
        vm.editarCriterios = editarCriterios;
        vm.eliminarCriterios = eliminarCriterios;

        function eliminarCriterios(moneda){
             
                    AjaxCall("POST", URL_SERVIDOR + "/InterviewCriteria/delete/" + moneda, null, function (response) {
                    StateMessage("Atención","Criterio eliminado correctamente","success");
                    vm.init();
                });                 
             
            
        }

        function agregarCriterios(ev, data)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.data = formWizardData;
                    $scope.clasificaciones ={
                        modelo:null,
                        opciones:[]
                    }
 
                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) { 
                            $scope.clasificaciones.opciones = response.datos;                         
                    }, function () {
                         $scope.clasificaciones.modelo = 0; 
                    });
 
                    $scope.enviarInformacion= function ()
                    {
                        if($scope.data === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.clasificaciones.modelo === 0){
                            swal("Atención","Selecciona una clasificacion", "info");
                            return false; 
                        }
                        
                        if($scope.data.name === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.data.MinimumScore === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.data.MaximumScore === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }
                        if($scope.data.MaximumScore < $scope.data.MinimumScore){
                            swal("Atención","Calificación máxima no puede ser menor a la calificación mínima", "error");
                            return false; 
                        }
 
                        var objData = {
                            "Classification_Id": $scope.clasificaciones.modelo,
                            "name": $scope.data.name ,
                            "MinimumScore": $scope.data.MinimumScore,
                            "MaximumScore": $scope.data.MaximumScore
                        };    
                         
                        AjaxCall("POST",URL_SERVIDOR+ '/InterviewCriteria',
                        objData,function(response){
                                if(response.Codigo == "201"){
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                }else if(response.Codigo == "422"){
                                    StateMessage("Atención", response.mensaje, "info");
                                    
                                }
                            });
                    };

                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/entrevista/criterios/html/formularioCriterios.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function editarCriterios(ev, data)
        {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.data = formWizardData;
                    $scope.clasificaciones ={
                        modelo:null,
                        opciones:[]
                    }
 
                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) { 
                            $scope.clasificaciones.opciones = response.datos;                         
                    }, function () {
                         $scope.clasificaciones.modelo = $scope.data.Classification_Id; 
                    });
                    $scope.enviarInformacion= function ()
                    {
                        if($scope.data === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.clasificaciones.modelo === 0){
                            swal("Atención","Selecciona una clasificacion", "info");
                            return false; 
                        }
                        
                        if($scope.data.name === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.data.MinimumScore === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.data.MaximumScore === undefined){
                            swal("Atención","Faltan campos", "info");
                            return false; 
                        }

                        if($scope.data.MaximumScore < $scope.data.MinimumScore){
                            swal("Atención","Calificación máxima no puede ser menor a la calificación mínima", "error");
                            return false; 
                        }
 
                        var objData = {
                            "Classification_Id": $scope.clasificaciones.modelo,
                            "name": $scope.data.name ,
                            "MinimumScore": $scope.data.MinimumScore,
                            "MaximumScore": $scope.data.MaximumScore
                        };    
 
                        AjaxCall("POST",URL_SERVIDOR+ '/InterviewCriteria/update/'+$scope.data.id,
                        objData,function(response){ 
                            StateMessage("Atención", "Actualización exitosa", "success");
                            $scope.closeDialog();
                            vm.init(); 
                        });
                    };

                    $scope.closeDialog = function ()
                    {
                        init();
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/entrevista/criterios/html/formularioCriterios.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }


        function init(){
            vm.upload = false;
            AjaxCall("GET", URL_SERVIDOR + "/InterviewCriteria", null, function (response) {
                $scope.$apply(function(){
                    $scope.criterios = response.datos;
                });
            }, function () {
                vm.upload = true;
            });
        } 
        vm.init(); 
    } 
})();