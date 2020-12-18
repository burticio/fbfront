(function () {
    'use strict';

    angular
        .module('app.catalogos.convocatorias')
        .controller('ConvocatoriasController', ConvocatoriasController);

    /** @ngInject */
    function ConvocatoriasController($scope, $mdDialog, $sce,localStorageService,$state) {
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

        $scope.convocatorias = [];
        $scope.uType = localStorageService.get("session_typeId");

        vm.upload = false;

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

        vm.init = init;

        vm.agregarConvocatoria = agregarConvocatoria;
        vm.editarConvocatoria = editarConvocatoria;
        vm.eliminarConvocatoria = eliminarConvocatoria;
        vm.activarConvocatoria = activarConvocatoria;
        vm.desactivarConvocatoria = desactivarConvocatoria;
        vm.extenderConvocatoria = extenderConvocatoria;
        //vm.subirArchivo = subirArchivo;

        function extenderConvocatoria(ev, data) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;
                    var fecha = new Date($scope.data.End_Date);
                    
                    $scope.data.End_Date = fecha.toISOString().substring(0, 10).toString();
                    $scope.enviarInformacion = function () {
                        
                        if ($scope.data === undefined) {
                            swal("Atención", "Debes ingresar los datos que se te piden", "error");
                            return false;
                        }

                        if ($scope.data.End_Date === undefined || $scope.data.End_Date == "") {
                            swal("Atención", "Debes ingresar una fecha de fin", "error");
                            return false;
                        }

                        if ($scope.data.End_Date !== undefined) {
                            $scope.date2 = new Date($scope.data.End_Date);
                            $scope.date2 = $scope.date2.toISOString().substring(0, 10);
                            $scope.date2 = $scope.date2.toString();
                        }

                        var objData = {
                            "End_Date": $scope.date2
                        };

                        
                        AjaxCall("POST", URL_SERVIDOR + '/ApplicationPeriod/extend/' + $scope.data.id,
                            objData, function (response) {
                                if (response.Codigo == "201") {
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                } else if (response.Codigo == "422") {
                                    StateMessage("Atención", response.mensaje, "info");
                                } else if (response.Codigo == "423") {
                                    StateMessage("Atención", response.mensaje, "info");
                                }
                            });

                    };

                    $scope.closeDialog = function () {

                        $mdDialog.hide();
                    };

                },
                templateUrl: 'app/main/catalogos/convocatorias/html/formularioExtender.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function activarConvocatoria(document) {
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationPeriod/activate/" + document.id, null, function (response) {
                if (response.Codigo == "201") {
                    StateMessage("Atención", response.mensaje, "success");
                    vm.init();
                } else if (response.Codigo == "423") {
                    StateMessage("Atención", response.mensaje, "info");
                }
            });
        }

        function desactivarConvocatoria(document) {
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationPeriod/deactivate/" + document.id, null, function (response) {
                if (response.Codigo == "201") {
                    StateMessage("Atención", response.mensaje, "success");
                    vm.init();
                }
            });
        }

        function eliminarConvocatoria(document) {
            AjaxCall("POST", URL_SERVIDOR + "/ApplicationPeriod/delete/" + document.id, null, function (response) {
                if (response.Codigo == "200") {
                    StateMessage("Atención", response.mensaje, "success");
                    vm.init();
                }
            });
        }

        function agregarConvocatoria(ev, data) {
            // You can do an API call here to send the form to your server

            // Show the sent data.. you can delete this safely.
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;
                    $scope.disabledBoton = false;


                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    }

                    $scope.modalidad = {
                        modelo: null,
                        opciones: []
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.$apply(function () {
                            $scope.clasificacion.opciones = response.datos;
                            
                        });
                    }, function () {

                    });

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramModality", null, function (response) {
                        $scope.$apply(function () {
                            $scope.modalidad.opciones = response.datos;
                            
                        });
                    }, function () {

                    });

                    $scope.enviarInformacion = function () {



                        if ($scope.data === undefined) {
                            swal("Atención", "Debes ingresar los datos que se te piden", "error");
                            return false;
                        }

                        if ($scope.data.Start_Date === undefined || $scope.data.Start_Date == "") {
                            swal("Atención", "Debes ingresar una fecha de inicio", "error");
                            return false;
                        }

                        if ($scope.data.End_Date === undefined || $scope.data.End_Date == "") {
                            swal("Atención", "Debes ingresar una fecha de fin", "error");
                            return false;
                        }
                        var date = new Date($scope.data.Start_Date);
                        var date2 = new Date($scope.data.End_Date);
                        var objData = {
                            "Classification_Id": $scope.clasificacion.modelo,
                            "Modality_Id": $scope.modalidad.modelo,
                            "name": $scope.data.name,
                            "Start_Date": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay(),
                            "End_Date": date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDay(),
                            "extended": $scope.data.extended ? $scope.data.extended : false,
                            "active": $scope.data.active ? $scope.data.active : false
                        };
                        
                        AjaxCall("POST", URL_SERVIDOR + '/ApplicationPeriod',
                            objData, function (response) {
                                if (response.Codigo == "201") {
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                } else if (response.Codigo == "422") {
                                    StateMessage("Atención", response.mensaje, "info");
                                } else if (response.Codigo == "423") {
                                    StateMessage("Atención", response.mensaje, "info");
                                }
                            });

                        $scope.disabledBoton = false;

                    };

                    $scope.closeDialog = function () {

                        $mdDialog.hide();
                    };

                },
                templateUrl: 'app/main/catalogos/convocatorias/html/formularioConvocatoria.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        function editarConvocatoria(ev, data) {

            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {
                    $scope.data = formWizardData;
                    $scope.clasificacion = {
                        modelo: null,
                        opciones: []
                    }

                    $scope.modalidad = {
                        modelo: null,
                        opciones: []
                    }

                    if ($scope.data.active == 1) {
                        $scope.data.active = true;
                    }

                    if ($scope.data.extended == 1) {
                        $scope.data.extended = true;
                    }

                    AjaxCall("GET", URL_SERVIDOR + "/ProgramClassification", null, function (response) {
                        $scope.$apply(function () {
                            $scope.clasificacion.opciones = response.datos;
                            
                        });
                    }, function () {
                        $scope.clasificacion.modelo = $scope.data.Classification_Id;
                    });


                    AjaxCall("GET", URL_SERVIDOR + "/ProgramModality", null, function (response) {
                        $scope.$apply(function () {
                            $scope.modalidad.opciones = response.datos;
                            
                        });
                    }, function () {
                        $scope.modalidad.modelo = $scope.data.Modality_Id;
                    });

                    $scope.enviarInformacion = function () {

                        if ($scope.data === undefined) {
                            swal("Atención", "Debes ingresar los datos que se te piden", "error");
                            return false;
                        }

                        if ($scope.data.Start_Date === undefined || $scope.data.Start_Date == "") {
                            swal("Atención", "Debes ingresar una fecha de inicio", "error");
                            return false;
                        }

                        if ($scope.data.End_Date === undefined || $scope.data.End_Date == "") {
                            swal("Atención", "Debes ingresar una fecha de fin", "error");
                            return false;
                        }

                        var date = new Date($scope.data.Start_Date);
                        var date2 = new Date($scope.data.End_Date);
                        var objData = {
                            "Classification_Id": $scope.clasificacion.modelo,
                            "Modality_Id": $scope.modalidad.modelo,
                            "name": $scope.data.name,
                            "Start_Date": date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay(),
                            "End_Date": date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDay(),
                            "extended": $scope.data.extended ? $scope.data.extended : false,
                            "active": $scope.data.active ? $scope.data.active : false
                        };

                        AjaxCall("POST", URL_SERVIDOR + '/ApplicationPeriod/update/' + $scope.data.id,
                            objData, function (response) {
                                if (response.Codigo == "201") {
                                    StateMessage("Atención", response.mensaje, "success");
                                    $scope.closeDialog();
                                    vm.init();
                                } else if (response.Codigo == "422") {
                                    StateMessage("Atención", response.mensaje, "info");

                                }
                            });

                        $scope.disabledBoton = false;

                    };

                    $scope.closeDialog = function () {
                        init();

                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/catalogos/convocatorias/html/formularioConvocatoria.html',
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
            AjaxCall("GET", URL_SERVIDOR + "/ApplicationPeriod", null, function (response) {
                $scope.$apply(function () {
                    $scope.convocatorias = response.datos;
                });
                vm.cerrarCargando();
            }, function () {

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
