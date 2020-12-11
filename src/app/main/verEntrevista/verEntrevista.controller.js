(function ()
{
    'use strict';

    angular
        .module('app.verEntrevista')
        .controller('verEntrevistaController', verEntrevistaController);

    /** @ngInject */
    function verEntrevistaController(msNavigationService, $sce, $scope, $state, $mdSidenav, $timeout, $document, $mdMedia, localStorageService, $mdDialog)
    {
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
        $scope.arraysolicitud = localStorageService.get('solicitud');
        $scope.entrevista = {};
        $scope.arrayentrevista = {};
        $scope.country = [];
        $scope.bycountry = [];
        $scope.genero = {
                opciones: [{
                        id: 1,
                        name: "Masculino"
                    },
                    {
                        id: 2,
                        name: "Femenino"
                    },
                    {
                        id: 3,
                        name: "Sin especificar"
                    }]
            };
        $scope.edoCivil = {
                opciones: [{
                        id: 1,
                        name: "Soltero(a)"
                    },
                    {
                        id: 2,
                        name: "Casado(a)"
                    },
                    {
                        id: 3,
                        name: "Divorciado(a)"
                    },
                    {
                        id: 4,
                        name: "Viudo(a)"
                    }]
            };

        vm.mostrarCargando = mostrarCargando;
        vm.cerrarCargando = cerrarCargando;
        vm.init = init;
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

        $scope.volver = function(){
            $state.go("app.solicitudesActivas");
        }

        $scope.exportarPDFPosgrado = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportfullinterviewpos/"+$scope.entrevista.interview_Id;
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        $scope.exportarPDFLic = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportfullinterviewlic/"+$scope.entrevista.interview_Id;
            setTimeout(function () {
                vm.cerrarCargando();
            }, 500);
        }

        function init(){
            vm.mostrarCargando();
            var data = {
                "application_Id" : $scope.arraysolicitud.id
            };
            AjaxCall("POST", URL_SERVIDOR + "/Interview/showapplication", data, 
                function (response) { //success
                    $scope.entrevista = response.datos[0];
                    //console.log($scope.entrevista);

                    var dataint = {
                        "Interview_Id": $scope.entrevista.interview_Id
                    };
                    //console.log(dataint);

                    AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showinterview", dataint, 
                        function (response) { //success
                            $scope.arrayentrevista = response.datos[0];
                        
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

                    AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.arraysolicitud.residenceCountry, null, 
                        function (response) { //success
                                $scope.bycountry = response.datos;
                            
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

            AjaxCall("GET", URL_SERVIDOR + "/Country", null, 
                function (response) { //success
                        $scope.country = response.datos;
                    
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

        }
        vm.init();
    }
})();
