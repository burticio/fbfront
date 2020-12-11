(function(){

    'use strict';

    angular.module('app.detallePrograma').controller("DetalleProgramaController",DetalleProgramaController);

    /** @ngInject */
    function DetalleProgramaController($scope,localStorageService,$state,$cookies){
        
        
                
        $scope.detallePrograma = localStorageService.get("detallePrograma"); 
        $scope.urlCompartir = "";
        $scope.mostrarhttp = $scope.detallePrograma.website.startsWith("http");
        
        var data = {
            "Program_Id" : $scope.detallePrograma.id,
            "Start_Date":$scope.detallePrograma.Start_Date
        };
        $scope.puedeCapturar = true;
        $scope.fechas_guardadas = JSON.parse($scope.detallePrograma.dates);
        switch($scope.detallePrograma.duration_period){
            case "H": $scope.periodo = "Horas";break;
            case "D": $scope.periodo = "Días";break;
            case "S": $scope.periodo = "Semanas";break;
            case "M": $scope.periodo = "Meses";break;
        }
        /*AjaxCall("POST", URL_SERVIDOR + "/ApplicationPeriod/CheckProgramDate", data, function (response) {
            $scope.urlCompartir = window.location.href;
            var urldir = $scope.urlCompartir.substring($scope.urlCompartir.length-15);
            if (urldir=="detallePrograma"){
                $scope.urlCompartir = $scope.urlCompartir.substring(0,$scope.urlCompartir.length-15) + "busquedaPrograma?pid=" + $scope.detallePrograma.id;
            }else{
                $scope.urlCompartir = "?pid=" + $scope.detallePrograma.id;            
            }
           if(response.Codigo =="423"){
                swal("Atención", response.mensaje, "info");
           }
           //$scope.$apply(function(){$scope.puedeCapturar = response.datos;});
           
        }, function () {
           
        //});*/
        var vm =this;
       
 
        vm.regresar = regresar;
        vm.enviarSolicitud = enviarSolicitud;
        vm.enviarSolicitudv2 = enviarSolicitudv2;

        function enviarSolicitud(){
           
            $state.go("app.solicitud");
        }

        function enviarSolicitudv2(){
           
            $state.go("app.solicitudv2");
        }

        function regresar(){
            $state.go("app.busquedaPrograma");
        } 
        
    };

}());
