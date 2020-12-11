(function () {
    'use strict';

    angular
        .module('app.asignacion_entrevista')
        .controller('AsignacionController', AsignacionController);

    function AsignacionController($scope, $mdDialog, localStorageService,$state) {

        var vm = this; // Variable general de la vista
        
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
        $scope.uType = localStorageService.get("session_typeId");

        // <========== VARIABLES INICIALES ==========>
        $scope.solicitantes = [];
        $scope.operadores = [];

        vm.initDatatable = initDatatable;
        vm.initSelect = initSelect;
        vm.saveInterview = saveInterview;
        // <========== VARIABLES INICIALES ==========>

        // <========== ABRIR MENSAJE DE CARGANDO ==========>
        var alert;
        vm.mostrarCargando = mostrarCargando;
        vm.cerrarCargando = cerrarCargando;
        function mostrarCargando() {
            alert = $mdDialog.alert({
                templateUrl: 'app/main/cargando/modalCargando.html',
                parent: angular.element('body')
            });
            $mdDialog.show(alert).finally(function () {
                alert = undefined;
            });
        }
        // <========== ABRIR MENSAJE DE CARGANDO ==========>

        // <========== CERRAR MENSAJE DE CARGANDO ==========>
        function cerrarCargando() {
            $mdDialog.hide(alert, "finished");
            alert = undefined;
        }
        // <========== CERRAR MENSAJE DE CARGANDO ==========>

        // <========== CONFIGURACION DEL DATATABLE ==========>
        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: true,
            pageLength: 10,
            dom: 'Bfrtip',
            buttons: [
                'print',
                'csv'
            ],
            responsive: true,
            language: {
                processing: "Procesando...",
                search: "Buscar",
                lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
                info: "Mostrando del _START_ al _END_ de _TOTAL_ elementos totales",
                infoEmpty: "Mostrando ningún elemento.",
                infoFiltered: "(filtrado de un total de _MAX_ elementos)",
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
        // <========== CONFIGURACION DEL DATATABLE ==========>

        // <========== METODO SELECCIONAR TODOS LOS ELEMENTOS ==========>
        $scope.seleccionarTodos = function () {
            for (var i = 0; i < $scope.solicitantes.length; i++) {
                if ($scope.solicitantes[i].chkEdicion) {
                    $scope.solicitantes[i].chkEdicion = false;
                } else {
                    $scope.solicitantes[i].chkEdicion = true;
                }
            }
        }
        // <========== METODO SELECCIONAR TODOS LOS ELEMENTOS ==========>

        // <========== METODO ASIGNAR AGENTE ==========>
        $scope.asignarOperador = function (operador) {
            var checados = [];
            var asignados = [];
            
            for (var i = 0; i < $scope.solicitantes.length; i++) {
                if ($scope.solicitantes[i].chkEdicion) {
                    checados.push($scope.solicitantes[i].id);
                    if ($scope.solicitantes[i].agent != null) {
                        asignados.push($scope.solicitantes[i].agent);
                    }
                }
            }

            if (operador === undefined) {
                swal({
                    title: "Atención",
                    text: "Debes seleccionar un agente",
                    icon: "warning",
                    buttons: false,
                    timer: 2000,
                    dangerMode: false
                }).then(function() {});
                return false;
            }

            if ($.isEmptyObject(checados)) {
                swal({
                    title: "Atención",
                    text: "Ningún elemento seleccionado",
                    icon: "warning",
                    buttons: false,
                    timer: 2000,
                    dangerMode: false
                }).then(function() {});
            } else {
                if (asignados[0] == null) {
                    swal({
                        title: "Atención",
                        text: "¿Estas seguro?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then(function (click) {
                        //vm.mostrarCargando();
                        if (click) {
                            vm.saveInterview(operador.email, checados);
                            vm.initDatatable();
                            //vm.cerrarCargando();
                        } else {
                            swal({
                                title: "Atención",
                                text: "Operación Cancelada",
                                icon: "warning",
                                buttons: false,
                                timer: 2000,
                                dangerMode: false
                            }).then(function() {});
                            vm.initDatatable();
                            //vm.cerrarCargando();
                        }
                    });
                } else {
                    swal({
                        title: "Atención",
                        text: "Reemplazaras operadores ya asignados",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then(function (click) {
                        //vm.mostrarCargando();
                        if (click) {
                            vm.saveInterview(operador.email, checados);
                            vm.initDatatable();
                            //vm.cerrarCargando();
                        } else {
                            swal({
                                title: "Atención",
                                text: "Operación Cancelada",
                                icon: "warning",
                                buttons: false,
                                timer: 2000,
                                dangerMode: false
                            }).then(function() {});
                            vm.initDatatable();
                            //vm.cerrarCargando();
                        }
                    });
                }
            }
            vm.initDatatable();
        }
        // <========== METODO ASIGNAR AGENTE ==========>

        // <========== GUARDAR ASIGNACION ==========>
        function saveInterview(operador, ids) {
            //vm.mostrarCargando();
            var data = {"application_Ids": ids, "email": operador};
            AjaxCall("POST", URL_SERVIDOR + "/Interview/assignagent", data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo == "201") {
                        //vm.cerrarCargando();
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                    } else {
                        //vm.cerrarCargando();
                        swal({
                            title: "Atención",
                            text: response.mensaje,
                            icon: "warning",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                    }
                    return response;
                });
                //vm.initDatatable();
            }, function () {});
        }
        // <========== GUARDAR ASIGNACION ==========>

        // <========== INICIALIZAR DATATABLE ==========>
        function initDatatable() {
            vm.mostrarCargando();
            vm.upload = false;
            AjaxCall("POST", URL_SERVIDOR + "/Interview/listapplications", null, function (response) {
                $scope.$apply(function () {
                    $scope.solicitantes = response.datos;
                    vm.cerrarCargando();
                });
            }, function () {});
        }
        // <========== INICIALIZAR DATATABLE ==========>

        // <========== INICIALIZAR SELECT DE OPERADORES ==========>
        function initSelect() {
            AjaxCall("POST", URL_SERVIDOR + "/User/getOperators", null, function (response) {
                $scope.$apply(function () {
                    $scope.operadores = response.datos;
                    $scope.users = response.datos;
                });
            }, function () {});
        }
        // <========== INICIALIZAR SELECT DE OPERADORES ==========>

        vm.initDatatable();
        vm.initSelect();
    }
})();
