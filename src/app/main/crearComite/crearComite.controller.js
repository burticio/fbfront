(function () {
    'use strict';

    angular
        .module('app.crearComite')
        .controller('CrearComiteController', CrearComiteController);

    /** @ngInject */
    function CrearComiteController($scope, $mdDialog, localStorageService, $state) {
        var vm = this;
        if (localStorageService.get("session_typeId") == null) {
            //console.log("NINGUN LOGIN");
            location.replace("/pages/auth/login");
        }else if (localStorageService.get("session_typeId") == 2) {//SUPERVISOR
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_supervisor');
        }else if (localStorageService.get("session_typeId") == 3) {//COMITE
            console.log("ACCESO CORRECTO");
            //$state.go('app.inicio_comite');
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
            //console.log("ACCESO CORRECTO");
            $state.go('app.inicio_operador_vista');
        }
        $scope.uType = localStorageService.get("session_typeId");

        vm.dtOptions = {
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

        $scope.accionSupervisor = false;

        if (localStorageService.get("session_typeId") == 2 || localStorageService.get("session_typeId") == 6 || localStorageService.get("session_typeId") == 7) {
            $scope.accionSupervisor = true;
        }

        $scope.comites = [];
        $scope.tablaSolicitudesComite = {};

        vm.init = init;

        vm.agregarSesion = agregarSesion;
        vm.cancelarSesion = cancelarSesion;
        vm.finalizarSesion = finalizarSesion;
        vm.extenderSesion = extenderSesion;

        vm.verSolicitudes = verSolicitudes;

         
        $scope.downloadFile = function(session){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/exportClosedSessionReport/" + session.id;
            setTimeout(function(){
                vm.cerrarCargando();
            }, 500);
        }

        function verSolicitudes(comite) {
            localStorageService.set("sessionIdComite", comite.id);   
            localStorageService.set("sessionEstatus", comite.status); 
            $state.go("app.verComite");
           
        }

        function cancelarSesion(id) {
            AjaxCall("POST", URL_SERVIDOR + "/cancelSession/" + id, null, function (response) {
                swal("Atención", response.mensaje, "success");
                vm.init();
            }, function () {

            });
        }

        function finalizarSesion(id) {
            AjaxCall("POST", URL_SERVIDOR + "/closeSession/" + id, null, function (response) {
                if (response.codigo == 422)
                    swal("Atención", response.mensaje, "info");

                if (response.codigo == 200)
                    swal("Atención", response.mensaje, "success");


            }, function () {
                vm.init();
            });
        }

        function agregarSesion(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = {}


                    $scope.clasificacion = {
                        modelo: 1,
                        opciones: []
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.$apply(function () {
                            $scope.clasificacion.opciones = response.datos;
                        });
                    }, function () {

                    });

                    $scope.enviarInformacion = function () {

                        $scope.data.Classification_Id = $scope.clasificacion.modelo;
                        $scope.data.date = moment(new Date($scope.data.date)).format('YYYY-MM-DD');

                        AjaxCall("POST", URL_SERVIDOR + "/createSession", $scope.data, function (response) {
                            
                            if (response.Codigo == "202") {
                                swal("Atención", response.mensaje, "success");
                            }

                            if (response.Codigo == "422") {
                                swal("Atención", response.mensaje, "info");
                            }

                        }, function () {
                            vm.init();
                            $mdDialog.hide();
                        });
                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/crearComite/html/modalCreacion.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function extenderSesion(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;

                    $scope.enviarInformacion = function () {
                        $scope.data.date = moment(new Date($scope.data.date)).format('YYYY-MM-DD');
                        AjaxCall("POST", URL_SERVIDOR + "/extendSession/" + $scope.data.id, $scope.data, function (response) {
                            swal("Atención", response.mensaje, "success");
                        }, function () {
                            $scope.closeDialog();
                            vm.init();
                        });
                    };

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/crearComite/html/modalExtender.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function init() {
            vm.mostrarCargando();
            var idPefil = localStorageService.get("session_typeId");
            $scope.comitesAux = {};
            AjaxCall("GET", URL_SERVIDOR + "/CommitteeSession", null, function (response) {
                $scope.comitesAux = response.datos;
            }, function () {

                if (idPefil == 2 || idPefil == 6 || idPefil == 7) {
                    $scope.$apply(function(){$scope.comites = $scope.comitesAux;});
                } else {
                    $scope.comitesAux.forEach(function(e) {
                        if (e.status == "0") {
                            $scope.comites.push(e);
                        }

                        if (e.status == "2") {
                            $scope.comites.push(e);
                        }
                    });

                    $scope.$apply(function(){
                        $scope.comites;
                    });
                }
                vm.cerrarCargando();
            });
        }

        vm.init();

    }


})();
