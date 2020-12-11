(function ()
{
    'use strict';

    angular
        .module('app.inicio_comite')
        .controller('InicioComiteController', InicioComiteController);

    /** @ngInject */
    function InicioComiteController($scope,localStorageService,msNavigationService)
    {
        var vm = this;
        msNavigationService.deleteItem("inicio_supervisor");
        msNavigationService.deleteItem("inicio_solicitante");
        msNavigationService.deleteItem("inicio_operador");
        /*if(localStorageService.get("session_typeId") == 3){
            
            msNavigationService.deleteItem('apps');
        }
        
        if(localStorageService.get("session_typeId") == 2){
            
            msNavigationService.deleteItem('busquedaPrograma');
        }*/

        $scope.solicitudes ={};
        $scope.documentos = {};

        vm.verDocumentos = verDocumentos;
        vm.init = init;

        function verDocumentos(solicitud){
            var objData = {
                "id": solicitud.id,
                "Classification_Id":solicitud.Classification_Id
            };
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/showPerApplication", objData, function(response){
                if(response.Codigo == "404"){
                    swal("Atención", response.mensaje, "info");
                }
                
                $scope.documentos = response.datos;

             }, function(){ 
                  
             });
        }
 
        function init(){
            var objData = {"person_id": localStorageService.get("session_idUsuario")};
            AjaxCall("POST", URL_SERVIDOR + "/personalApplications", objData, function(response){
               $scope.$apply(function(){
                $scope.solicitudes = response.datos;
               });
            }, function(){ 
                
            });
        };

        vm.init();    
    }
})();
