(function(){

    'use strict';

    angular.module('app.validacionUni').
        controller("validacionUniController",validacionUniController);

    /** @ngInject */
    function validacionUniController($scope,$state, localStorageService, $cookies, $mdDialog){
        debugger;
        if($cookies.get("layoutStyle")!="contentWithToolbar"){
            $cookies.put('layoutStyle', 'contentWithToolbar');
            location.reload();
        }

        $scope.mostrarFiltro = true;
        $scope.mostrarBotonFiltro = true;
        $scope.txtBotonFiltro = "Ocultar Opciones de Busqueda";
        
        $scope.programas ={};
        $scope.programastemp = {};
        $scope.numeroProgramas = 0;
        $scope.mostrarBotonBusqueda = 0;
        $scope.mostrarfinal=false;
        $scope.busquedaurl = false;
        
        $scope.universidad = {
            modelo:0,
            opciones:[]
        };
        
        $scope.pais = {
            modelo:0,
            opciones:[]
        };

        $scope.tipo = {
            modelo:0,
            opciones:[]
        };
 
        $scope.modalidad = {
            modelo:0,
            opciones:[]
        };

        $scope.clasificacion = {
            modelo:0,
            opciones:[]
        };

        $scope.area = {
            modelo:0,
            opciones:[]
        };

        $scope.keywords = "";
        $scope.pname = 1;
        $scope.cname = 0;
        $scope.uname = 0;
        $scope.paname = 0;
        $scope.modo_busqueda = 0;
        $scope.datosiniciales = {
            lleno: 0,
            nombre : "",
            primerApellido : "",
            segundoApellido : "",
            email : "",
            telefono : ""
        }

        
        var vm =this;
        vm.init = init;

        vm.buscaPrograma = buscaPrograma;
        vm.borraFiltro = borraFiltro;
        //vm.buscaProgramakw = buscaProgramakw;
        vm.verDetalle = verDetalle;

        $scope.datosinicialesllenos = function(){
            $scope.datosiniciales.lleno = 1;
            $scope.mostrarFiltro = true;
            if($scope.busquedaurl){
                $scope.mostrarfinal=true;
            }else{
                $scope.mostrarfinal=false;
            }
        }

        function verDetalle(programa){
            localStorageService.set("detallePrograma", programa);
            localStorageService.set("datosIniciales", $scope.datosiniciales);
            
            $state.go("app.detallePrograma");
        }

        function borraFiltro(filt){
            console.log(filt);
            switch(filt){
                case 'clasificacion': $scope.clasificacion.modelo=0;break;
                case 'pais': $scope.pais.modelo=0;break;
                case 'universidad': $scope.universidad.modelo=0;break;
                case 'area': $scope.area.modelo=0;break;
                case 'modalidad': $scope.modalidad.modelo=0;break;
                default: break;
            }

            buscaPrograma(1);
        }

        function buscaPrograma(model){
           if(model != 0){
            vm.mostrarCargando();
            var objData ={
                "university_id": $scope.universidad.modelo,
                "country_id": $scope.pais.modelo,
                "type_id": $scope.tipo.modelo,
                "modality_id": $scope.modalidad.modelo,
                "classification_id" : $scope.clasificacion.modelo,
                "area_id" : $scope.area.modelo
            };
            

            AjaxCall("POST", URL_SERVIDOR + "/Program/searchoptions", objData, function (response) {                 
               $scope.$apply(function(){
                if(response.Codigo>=200 && response.Codigo<=299){
                    $scope.programas = response.datos; 
                    $scope.numeroProgramas = response.programas; 
                    $scope.universidad.opciones = response.filtros.universities;         
                    $scope.pais.opciones = response.filtros.countries;      
                    $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                    $scope.tipo.opciones = response.filtros.Program_Types;     
                    $scope.modalidad.opciones = response.filtros.Program_Modalities;
                    $scope.area.opciones = response.filtros.Program_Areas;

                    //$scope.numeroProgramas = $scope.programastemp.length;

                    if($scope.numeroProgramas<=100){
                        $scope.mostrarBotonBusqueda = 1;
                    }else{
                        $scope.mostrarBotonBusqueda = 0;
                    }
                    
                    //$scope.mostrarBotonBusqueda = ($scope.pais.modelo+$scope.universidad.modelo+$scope.area.modelo+$scope.modalidad.modelo);

                    //console.log($scope.programastemp);
                    //$scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                    //$scope.mostrarFiltro = false;
                }else{
                    //swal("Atención", response.mensaje, "error");
                    vm.borrarFiltros();
                }
                vm.cerrarCargando();
               });                            
            }, function () {
                 
            },
            function (jqXHR, exception) { 
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
                vm.cerrarCargando();
            });
           }
        }

        $scope.buscaProgramafilt = function(){
            
            vm.mostrarCargando();
            var objData ={
                "university_id": $scope.universidad.modelo,
                "country_id": $scope.pais.modelo,
                "type_id": $scope.tipo.modelo,
                "modality_id": $scope.modalidad.modelo,
                "classification_id" : $scope.clasificacion.modelo,
                "area_id" : $scope.area.modelo
            };
            

            AjaxCall("POST", URL_SERVIDOR + "/Program/search", objData, function (response) {                 
               $scope.$apply(function(){
                if(response.Codigo>=200 && response.Codigo<=299){
                    $scope.programas = response.datos; 
                    //$scope.numeroProgramas = response.datos; 
                    $scope.universidad.opciones = response.filtros.universities;         
                    $scope.pais.opciones = response.filtros.countries;      
                    $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                    $scope.tipo.opciones = response.filtros.Program_Types;     
                    $scope.modalidad.opciones = response.filtros.Program_Modalities;
                    $scope.area.opciones = response.filtros.Program_Areas;
                    $scope.mostrarfinal=true;

                    //$scope.numeroProgramas = $scope.programastemp.length;

                    //if($scope.numeroProgramas<=100){
                    //    $scope.mostrarBotonBusqueda = 1;
                    //}
                    
                    //$scope.mostrarBotonBusqueda = ($scope.pais.modelo+$scope.universidad.modelo+$scope.area.modelo+$scope.modalidad.modelo);

                    //console.log($scope.programastemp);
                    //$scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                    //$scope.mostrarFiltro = false;
                }else{
                    swal("Atención", response.mensaje, "error");
                }
                vm.cerrarCargando();
               });                            
            }, function () {
                 
            },
            function (jqXHR, exception) { 
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
                vm.cerrarCargando();
            });
           
        }

        $scope.buscaProgramakw = function(){
           //if(model != 0){
            vm.mostrarCargando();
            var objData ={
                "keywords": $scope.keywords,
                "pname": $scope.pname,
                "cname": $scope.cname,
                "uname": $scope.uname,
                "paname" : $scope.paname
            };
            

            AjaxCall("POST", URL_SERVIDOR + "/Program/searchkw", objData, 
                function (response) {
                    $scope.$apply(function(){
                        if(response.Codigo>=200 && response.Codigo<=299){
                            $scope.programas = response.datos;  
                            /*$scope.universidad.opciones = response.filtros.universities;         
                            $scope.pais.opciones = response.filtros.countries;      
                            $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                            $scope.tipo.opciones = response.filtros.Program_Types;     
                            $scope.modalidad.opciones = response.filtros.Program_Modalities;
                            $scope.area.opciones = response.filtros.Program_Areas;*/
                            $scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                            $scope.mostrarFiltro = false;
                            $scope.mostrarfinal=true;
                        }else{
                            swal("Atención", response.mensaje, "error");
                        }
                        vm.cerrarCargando();
                    });                            
            }, 
            function () {                 
            },
            function (jqXHR, exception) { 
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
                vm.cerrarCargando();
            });
           
        }

        function init(){
            vm.mostrarCargando();
            
            var clasificacionPredeterminada = "0";
            var uniLeads = "none";
            var progId = "none";
            var progsolId = "none";
            var classificationId = "none";
            var country = "none";
            var univ = "none";
            var areaId = "none";
            var modality = "none";
            var referrer = "none";
            var busqueda = false;

            var query = window.location.search.substr(1);
            var params = query.split("&");
            //if(params.toString() === ""){
            //    params = "cla=0";
            //}
            $scope.mostrarfinal=false;

            for (var i=0;i<params.length;i++) {
                var pair = params[i].split("=");
                if(pair[0] == "cla"){
                    clasificacionPredeterminada = pair[1];
                }
                if(pair[0] == "lead"){
                    uniLeads = pair[1];
                }
                if(pair[0] == "pid"){
                    progsolId = pair[1];
                }
                if(pair[0] == "program_id"){
                    progId = pair[1];
                }
                if(pair[0] == "classification_id"){
                    classificationId = pair[1];
                    busqueda = true;
                }
                if(pair[0] == "country_id"){
                    country = pair[1];
                    busqueda = true;
                }
                if(pair[0] == "university_id"){
                    univ = pair[1];
                    busqueda = true;
                }
                if(pair[0] == "area_id"){
                    areaId = pair[1];
                    busqueda = true;
                }
                if(pair[0] == "modality_id"){
                    modality = pair[1];
                    busqueda = true;
                }
                if(pair[0] == "referrer"){
                    referrer = pair[1];
                    localStorageService.set("referrer",referrer);
                }
            }
            //var arr = paramClasificacion.split("=");
            //var clasificacionPredeterminada = arr[1];

            if(localStorageService.get('referrer')==null){
                localStorageService.set("referrer",referrer);
            }

            if(progId.trim() != "none"){

                $scope.mostrarFiltro = false;
                $scope.mostrarBotonFiltro = false;
                var objData ={
                    "progid": progId
                };

                $scope.mostrarFiltro = false;
                $scope.mostrarBotonFiltro = false;
                $scope.datosiniciales.lleno = 1;
                $scope.busquedaurl = false;
                $scope.mostrarBotonBusqueda = -1;
                $scope.numeroProgramas = 1;
                
                

                AjaxCall("POST", URL_SERVIDOR + "/Program/searchpid", objData, 
                    function (response) {
                        $scope.$apply(function(){
                            if(response.Codigo>=200 && response.Codigo<=299){
                                $scope.programas = response.datos;  
                                $scope.universidad.opciones = response.filtros.universities;         
                                $scope.pais.opciones = response.filtros.countries;      
                                $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                                $scope.tipo.opciones = response.filtros.Program_Types;     
                                $scope.modalidad.opciones = response.filtros.Program_Modalities;
                                $scope.area.opciones = response.filtros.Program_Areas;
                                localStorageService.set("detallePrograma", $scope.programas[0]);
                                
                                //$state.go("app.solicitudv2");

                            }else{
                                swal("Atención", response.mensaje, "error");
                            }
                            vm.cerrarCargando();
                        });                            
                }, 
                function () {                 
                },
                function (jqXHR, exception) { 
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
                    vm.cerrarCargando();
                });

            }else if(progsolId.trim() != "none"){

                $scope.mostrarFiltro = false;
                $scope.mostrarBotonFiltro = false;
                var objData ={
                    "progid": progsolId
                };
                

                AjaxCall("POST", URL_SERVIDOR + "/Program/searchpid", objData, 
                    function (response) {
                        $scope.$apply(function(){
                            if(response.Codigo>=200 && response.Codigo<=299){
                                $scope.programas = response.datos;  
                                /*$scope.universidad.opciones = response.filtros.universities;         
                                $scope.pais.opciones = response.filtros.countries;      
                                $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                                $scope.tipo.opciones = response.filtros.Program_Types;     
                                $scope.modalidad.opciones = response.filtros.Program_Modalities;
                                $scope.area.opciones = response.filtros.Program_Areas;*/
                                localStorageService.set("detallePrograma", $scope.programas[0]);

                                $state.go("app.solicitudv2");

                            }else{
                                swal("Atención", response.mensaje, "error");
                            }
                            vm.cerrarCargando();
                        });                            
                }, 
                function () {                 
                },
                function (jqXHR, exception) { 
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
                    vm.cerrarCargando();
                });

            }else if(uniLeads.trim() != "none"){

                $scope.mostrarFiltro = false;
                $scope.mostrarBotonFiltro = false;
                $scope.datosiniciales.lleno = 1;
                $scope.busquedaurl = false;
                //$scope.modo_busqueda=1;
                var objData ={
                    "lead": uniLeads
                };
                

                AjaxCall("POST", URL_SERVIDOR + "/Program/searchlead", objData, 
                    function (response) {
                        $scope.$apply(function(){
                            if(response.Codigo>=200 && response.Codigo<=299){
                                $scope.programas = response.datos;  
                                /*$scope.universidad.opciones = response.filtros.universities;         
                                $scope.pais.opciones = response.filtros.countries;      
                                $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                                $scope.tipo.opciones = response.filtros.Program_Types;     
                                $scope.modalidad.opciones = response.filtros.Program_Modalities;
                                $scope.area.opciones = response.filtros.Program_Areas;*/
                                $scope.numeroProgramas = $scope.programas.length;
                                $scope.mostrarBotonBusqueda=-1;
                            }else{
                                swal("Atención", response.mensaje, "error");
                            }
                            vm.cerrarCargando();
                        });                            
                }, 
                function () {                 
                },
                function (jqXHR, exception) { 
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
                    vm.cerrarCargando();
                });

            }else if(clasificacionPredeterminada.trim() != "0"){
                var objData ={
                    "university_id": 0,
                    "country_id": 0,
                    "type_id": 0,
                    "modality_id": 0,
                    "classification_id": Number.parseInt(clasificacionPredeterminada),
                    "area_id": 0
                };

                $scope.mostrarBotonFiltro=false;
                $scope.mostrarFiltro = true;
                $scope.datosiniciales.lleno = 1;
                $scope.busquedaurl = false;
     
                AjaxCall("POST", URL_SERVIDOR + "/Program/filterForClassification", objData, function (response) {     
                    if(response.Codigo =="422"){
                        var objData ={
                            "university_id": 0,
                            "country_id": 0,
                            "type_id": 0,
                            "modality_id": 0,
                            "classification_id": 0,
                            "area_id": 0
                        };
             
                        AjaxCall("GET", URL_SERVIDOR + "/availableFilters", objData, function (response) {                 
                            $scope.universidad.opciones = response.datos.universities;         
                            $scope.pais.opciones = response.datos.countries;      
                            $scope.clasificacion.opciones = response.datos.Program_Classifications;     
                            $scope.tipo.opciones = response.datos.Program_Types;     
                            $scope.modalidad.opciones = response.datos.Program_Modalities;
                            $scope.area.opciones = response.datos.Program_Areas;
                            //$scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                            //$scope.mostrarFiltro = false;
                        }, function () {
                            vm.cerrarCargando();
                        });
                    }else{
                        $scope.universidad.opciones = response.filtros.universities;         
                        $scope.pais.opciones = response.filtros.countries;      
                        $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                        $scope.tipo.opciones = response.filtros.Program_Types;     
                        $scope.modalidad.opciones = response.filtros.Program_Modalities;
                        $scope.clasificacion.modelo = clasificacionPredeterminada;
                        $scope.area.opciones = response.filtros.Program_Areas;
                        //$scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                        //$scope.mostrarFiltro = false;
                    }   
                }, function () {
                    vm.cerrarCargando();
                });
            }else if(busqueda){
                var objData ={
                    "university_id": Number.parseInt(univ),
                    "country_id": Number.parseInt(country),
                    "type_id": 0,
                    "modality_id": Number.parseInt(modality),
                    "classification_id": Number.parseInt(classificationId),
                    "area_id": Number.parseInt(areaId)
                };

                //$scope.mostrarFiltro=true;
                $scope.mostrarBotonFiltro=false;
                $scope.mostrarFiltro = true;
                $scope.datosiniciales.lleno = 1;
                $scope.busquedaurl = true;
                $scope.mostrarfinal=true;

     
                AjaxCall("POST", URL_SERVIDOR + "/Program/search", objData, function (response) {                 
               $scope.$apply(function(){
                    if(response.Codigo>=200 && response.Codigo<=299){
                        $scope.programas = response.datos;  
                        $scope.universidad.opciones = response.filtros.universities;         
                        $scope.pais.opciones = response.filtros.countries;      
                        $scope.clasificacion.opciones = response.filtros.Program_Classifications;     
                        $scope.tipo.opciones = response.filtros.Program_Types;     
                        $scope.modalidad.opciones = response.filtros.Program_Modalities;
                        $scope.area.opciones = response.filtros.Program_Areas;
                        $scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                        //$scope.mostrarFiltro = false;

                        $scope.universidad.modelo = Number.parseInt(univ);
                        $scope.pais.modelo = Number.parseInt(country);
                        $scope.modalidad.modelo = Number.parseInt(modality);
                        $scope.clasificacion.modelo = Number.parseInt(classificationId);
                        $scope.area.modelo = Number.parseInt(areaId);

                        $scope.numeroProgramas = $scope.programas.length;
                        $scope.mostrarBotonBusqueda = -1;

                    }else{
                        swal("Atención", response.mensaje, "error");
                    }
                    vm.cerrarCargando();
                   });                            
                }, function () {
                     
                },
                function (jqXHR, exception) { 
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
                    vm.cerrarCargando();
                });
            }else{
                var objData ={
                    "university_id": 0,
                    "country_id": 0,
                    "type_id": 0,
                    "modality_id": 0,
                    "classification_id": 0,
                    "area_id": 0
                };

                $scope.mostrarBotonFiltro=false;
                $scope.mostrarFiltro = true;
                $scope.datosiniciales.lleno = 1;
                $scope.busquedaurl = false;
                // AjaxCall("POST", URL_SERVIDOR + "/Program/search", objData, function (response) {                 
                //     $scope.programas = response.datos;                             
                // }, function () {
                     
                // });
    
                AjaxCall("GET", URL_SERVIDOR + "/availableFilters", objData, function (response) {                 
                    $scope.universidad.opciones = response.datos.universities;         
                    $scope.pais.opciones = response.datos.countries;      
                    $scope.clasificacion.opciones = response.datos.Program_Classifications;     
                    $scope.tipo.opciones = response.datos.Program_Types;     
                    $scope.modalidad.opciones = response.datos.Program_Modalities;
                    $scope.area.opciones = response.datos.Program_Areas;
                }, function () {
                    vm.cerrarCargando();
                });
            }
            
            console.log("pais ["+$scope.pais.modelo+"]");
        }
        $scope.muestraFiltros = function(){
            if($scope.mostrarFiltro){
                $scope.txtBotonFiltro = "Mostrar Opciones de Busqueda";
                $scope.mostrarFiltro = false;
            }else{
                $scope.txtBotonFiltro = "Ocultar Opciones de Busqueda";
                $scope.mostrarFiltro = true;
            }
        }

        vm.borrarFiltros = borrarFiltros;

        function borrarFiltros(){

            $scope.clasificacion.modelo = 0;
                $scope.universidad.modelo = 0;
                $scope.pais.modelo = 0;                
                $scope.tipo.modelo = 0;
                $scope.modalidad.modelo = 0;
                $scope.area.modelo = 0;
                $scope.keywords = "";
                $scope.pname = 0;
                $scope.cname = 0;
                $scope.uname = 0;
                $scope.paname = 0;
                $scope.modo_busqueda = 0;
                $scope.programas ={};
                $scope.mostrarBotonBusqueda=0;
                $scope.numeroProgramas =0;
                $scope.mostrarfinal=false;
                AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                    $scope.universidad.opciones = response.datos.universities;
                    $scope.pais.opciones = response.datos.countries;
                    $scope.clasificacion.opciones = response.datos.Program_Classifications;
                    $scope.tipo.opciones = response.datos.Program_Types;
                    $scope.modalidad.opciones = response.datos.Program_Modalities;
                    $scope.area.opciones = response.datos.Program_Areas;
                }, function () {
                    
                });
        }
        vm.regresaHome = regresaHome;
        function regresaHome() {
            window.location.href = "http://fundacionbeca.net"
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

        init();
 
    };

}());
