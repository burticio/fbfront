 (function ()
{
    'use strict';

    angular
        .module('app.catalogos.universidad')
        .controller('UniversidadController', UniversidadController);

    /** @ngInject */
    function UniversidadController($scope, $mdDialog,localStorageService,$state) {

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
        var vm = this;
        $scope.universidad = [];
        $scope.clasificaciones =[];
        $scope.uType = localStorageService.get("session_typeId");
        $scope.urlCompartir = "https://fundacionbeca.net/quienes-somos/universidades-con-convenio/";
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

        // <========== MODALES DE CARGANDO ==========>
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
        // <========== MODALES DE CARGANDO ==========>

 
        vm.agregarUniversidad = agregarUniversidad;
        vm.editarUniversidad = editarUniversidad;
        vm.eliminarUniverisdad = eliminarUniverisdad;
        vm.irSitioWeb = irSitioWeb;

        $scope.getGeneralContactEmail=function(strContacts){
            return(JSON.parse(strContacts)[0].contact_email);
        }
        $scope.getGeneralContactName=function(strContacts){
            return(JSON.parse(strContacts)[0].contact_name);
        }

        function irSitioWeb(url){
            var a = document.createElement('a');
                a.target="_blank";
                
            if(!validaURL(url)){                
                a.href="http://" + decodeURI(url);
            }else{
                a.href = decodeURI(url);
            }
            a.click();
        }
        
        function eliminarUniverisdad(idUniversidad){
            AjaxCall("POST", URL_SERVIDOR + "/University/delete/" + idUniversidad,  null, function (response) {
                StateMessage("Atención","Universidad eliminada correctamente","success");
                vm.init();
            });
        }

        function agregarUniversidad(ev, data)
        { 
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData,clasificaciones)
                { 
                    $scope.data = formWizardData; 
                    $scope.paises = {
                        modelo :null,
                        opciones:[]
                    };

                    $scope.clasif = {
                        modelo:null,
                        opciones:clasificaciones
                    };
                    $scope.clasificaciones_disponibles = [];
                    $scope.contactos=[];
                    $scope.newContactEmail ="";
                    $scope.newContactName = "";
                    $scope.mensaje ="";

                    AjaxCall("GET", URL_SERVIDOR +"/Country", null, function(response){
                        $scope.paises.opciones = response.datos;
                    },function(){
                        $scope.paises.modelo = 0;
                    });

                    $scope.addContact = function(){
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == parseInt($scope.clasif.modelo)})
                        if(i>=0){
                            $scope.contactos.splice(i,1);
                            $scope.contactos.splice(i,0,{
                                    classification:parseInt($scope.clasif.modelo),
                                    contact_email:$scope.newContactEmail,
                                    contact_name:$scope.newContactName});
                        }else{
                            $scope.contactos.push({
                                    classification:parseInt($scope.clasif.modelo),
                                    contact_email:$scope.newContactEmail,
                                    contact_name:$scope.newContactName});
                        }
                        $scope.newContactEmail ="";
                        $scope.newContactName = "";
                        $scope.clasif.modelo=null;
                    }

                    $scope.remContact = function(contacto){
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == parseInt(contacto)})
                        if(i>=0){
                            $scope.contactos.splice(i,1);
                        }
                    }

                    $scope.getClassification = function(clasId){
                        return($scope.clasif.opciones.find(function (elemento){return elemento.id == clasId}).Program_Classification);
                    }


                    $scope.enviarInformacion= function ()
                    {
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == 99})
                        if(i>=0){
                            $scope.data.country_id = $scope.paises.modelo;
                            $scope.data.contact_email = JSON.stringify($scope.contactos);
                            $scope.data.contact_name = "";
                            AjaxCall("POST",URL_SERVIDOR+ '/University',
                                $scope.data,function(response){
                                    if(response.Codigo == "201"){
                                        StateMessage("Atención", response.mensaje, "success");
                                        $scope.closeDialog();
                                        vm.init();
                                    }else if(response.Codigo == "422"){
                                        StateMessage("Atención", response.mensaje, "info");
                                        $scope.closeDialog();
                                        vm.init();
                                    }
                                });
                        }else{
                            $scope.mensaje = "ERROR: Se debe indicar al menos el contacto general.";
                        }
                    };

                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/universidad/html/formularioEscuela.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data,
                    clasificaciones: $scope.clasificaciones
                },
                clickOutsideToClose: true
            });
        }

        function editarUniversidad(ev, data)
        { 
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData, clasificaciones)
                {
                    $scope.data = formWizardData;
                    $scope.paises = {
                        modelo :null,
                        opciones:[]
                    };
                    $scope.clasif = {
                        modelo:null,
                        opciones:clasificaciones
                    };
                    $scope.clasificaciones_disponibles = [];
                    $scope.contactos=JSON.parse($scope.data.contact_email);
                    $scope.newContactEmail ="";
                    $scope.newContactName = "";
                    
                    AjaxCall("GET", URL_SERVIDOR +"/Country", null, function(response){
                        $scope.paises.opciones = response.datos;
                    },function(){                        
                        $scope.$apply(function(){$scope.paises.modelo = $scope.data.country_id;});
                    });

                    $scope.addContact = function(){
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == parseInt($scope.clasif.modelo)})
                        if(i>=0){
                            $scope.contactos.splice(i,1);
                            $scope.contactos.splice(i,0,{
                                    classification:parseInt($scope.clasif.modelo),
                                    contact_email:$scope.newContactEmail,
                                    contact_name:$scope.newContactName});
                        }else{
                            $scope.contactos.push({
                                    classification:parseInt($scope.clasif.modelo),
                                    contact_email:$scope.newContactEmail,
                                    contact_name:$scope.newContactName});
                        }
                        $scope.newContactEmail ="";
                        $scope.newContactName = "";
                        $scope.clasif.modelo=null;
                    }

                    $scope.remContact = function(contacto){
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == parseInt(contacto)})
                        if(i>=0){
                            $scope.contactos.splice(i,1);
                        }
                    }

                    $scope.getClassification = function(clasId){
                        return($scope.clasif.opciones.find(function (elemento){return elemento.id == clasId}).Program_Classification);
                    }

                    $scope.enviarInformacion= function ()
                    {
                        i = $scope.contactos.findIndex(function (elemento){
                            return elemento.classification == 99})
                            if(i>=0){
                            $scope.data.country_id = $scope.paises.modelo;
                            $scope.data.contact_email = JSON.stringify($scope.contactos);
                            AjaxCall("POST",URL_SERVIDOR+ '/University/update/'+$scope.data.id,
                                $scope.data,function(response){
                                    StateMessage("Atención","Modificación exitosa", "success");
                                    $scope.closeDialog();
                                    vm.init();     
                            });
                        }
                    };

                    $scope.closeDialog = function ()
                    { 
                        $mdDialog.hide();
                    };
                },
                templateUrl : 'app/main/catalogos/universidad/html/formularioEscuela.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data,
                    clasificaciones: $scope.clasificaciones
                },
                clickOutsideToClose: true
            });
        }

        $scope.downloadFile = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportuniversities";
            setTimeout(function(){
                vm.cerrarCargando();
            }, 500);
        }

        function init(){
            vm.upload = false;
            
            AjaxCall("GET", URL_SERVIDOR + "/University",  null, function (response) {  
                $scope.$apply(function(){
                    $scope.universidad = response.datos;
                    //$scope.urlCompartir = window.location.href;
                    //console.log($scope.urlCompartir);
                    //var urldir = $scope.urlCompartir.substring($scope.urlCompartir.length-21);
                    //console.log(urldir);
                    //$scope.urlCompartir = $scope.urlCompartir.substring(0,$scope.urlCompartir.length-21) + "busquedaPrograma?lead=";
                    //console.log($scope.urlCompartir); 
                });
            }, function () {
            });
            AjaxCall("GET", URL_SERVIDOR +"/ProgramClassification", null, function(response){
                $scope.clasificaciones = response.datos;
                $scope.clasificaciones.push({id:99,Program_Classification:"General"});
            },function(){                        
            });
        }
        vm.init();
    }
})();