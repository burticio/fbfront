(function () {
    'use strict';

    angular
        .module('app.programascanalizacion')
        .controller('ProgramasCanalizacionController', ProgramasCanalizacionController);

    function ProgramasCanalizacionController($scope, $mdDialog, localStorageService,$state) {

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

        // <========== VARIABLES INICIALES ==========>
        $scope.solicitudes = [];
        $scope.uType = localStorageService.get("session_typeId");

        vm.initDatatable = initDatatable;
        // <========== VARIABLES INICIALES ==========>

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

        // <========== NUEVO PROGRAMA ==========>
        $scope.dialogNewProgram = function () {
            var programa = { nombreinstitucion: null, nombrecontacto: null, emailcontacto: null };
            $mdDialog.show({
                locals: { programa: programa },
                controller: NuevoProgramaController,
                templateUrl: 'app/main/programascanalizacion/html/dialogo.nuevoprograma.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.createNewProgram()
            }, function() {});
        };
        // <========== NUEVO PROGRAMA ==========>

        // <========== CONTROLLLER NUEVO PROGRAMA ==========>
        function NuevoProgramaController($scope, $mdDialog, programa) {
            $scope.programa = programa;
            $scope.respuestaProgramaNuevo = function (nuevoprograma) {
                localStorageService.set("data_new_program", { "name": $("#nombreinstitucion").val(), "contact_name": $("#nombrecontacto").val(), "contact_email": $("#emailcontacto").val() })
                if (nuevoprograma) {
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLLER NUEVO PROGRAMA ==========>

        // <========== CREAR NUEVO PROGRAMA ==========>
        $scope.createNewProgram = function () {
            var data = localStorageService.get("data_new_program");
            swal({
                title: "¡Alerta!",
                text: "¿Estas seguro de guardar el programa?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (confirm) {
                if (confirm) {
                    AjaxCall("POST", URL_SERVIDOR + "/ChannelingProgram", data, function (response) {
                        $scope.$apply(function () {
                            if (response.Codigo >= 200 && response.Codigo <= 299) {
                                swal({
                                    title: "¡Éxito!",
                                    text: response.mensaje,
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            } else {
                                swal({
                                    title: "¡Atención!",
                                    text: response.mensaje,
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            }
                        });
                    }, function() {});
                } else {
                    swal("¡Alerta!", "Ningun Cambio Realizado", "warning");
                }
            });
        }
        // <========== CREAR NUEVO PROGRAMA ==========>



        // <========== NUEVO PROGRAMA ==========>
        $scope.updateProgram = function (datos) {
            var programa = { id_institucion: datos.id, nombreinstitucion: datos.name, nombrecontacto: datos.contact_name, emailcontacto: datos.contact_email };
            $mdDialog.show({
                locals: { programa: programa },
                controller: ActualizarProgramaController,
                templateUrl: 'app/main/programascanalizacion/html/dialogo.modificarprograma.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.updateNewProgram()
            }, function() {});
        };
        // <========== NUEVO PROGRAMA ==========>

        // <========== CONTROLLLER NUEVO PROGRAMA ==========>
        function ActualizarProgramaController($scope, $mdDialog, programa) {
            $scope.programa = programa;
            $scope.respuestaProgramaActualizar = function (nuevoprograma) {
                localStorageService.set("id_new_program", { "id": $("#id_institucion").val() })
                localStorageService.set("data_new_program", { "name": $("#nombreinstitucion").val(), "contact_name": $("#nombrecontacto").val(), "contact_email": $("#emailcontacto").val() })
                if (nuevoprograma) {
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLLER NUEVO PROGRAMA ==========>

        // <========== CREAR NUEVO PROGRAMA ==========>
        $scope.updateNewProgram = function () {
            var id_new_program = localStorageService.get("id_new_program");
            var data_new_program = localStorageService.get("data_new_program");
            swal({
                title: "¡Alerta!",
                text: "¿Estas seguro de modificar el programa?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (confirm) {
                if (confirm) {
                    AjaxCall("POST", URL_SERVIDOR + "/ChannelingProgram/update/"+id_new_program.id+"", data_new_program, function (response) {
                        $scope.$apply(function () {
                            console.log(response)
                            if (response.Codigo >= 200 && response.Codigo <= 299) {
                                swal({
                                    title: "¡Éxito!",
                                    text: response.mensaje,
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            } else {
                                swal({
                                    title: "¡Atención!",
                                    text: "Hubo un error al modificar",
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            }
                        });
                    }, function() {});
                } else {
                    swal("¡Alerta!", "Ningun Cambio Realizado", "warning");
                }
            });
        }
        // <========== CREAR NUEVO PROGRAMA ==========>

        // <========== ELIMINAR PROGRAMA ==========>
        $scope.deleteProgram = function (array_data) {
            swal({
                title: "¡Alerta!",
                text: "¿Estas seguro de eliminar el programa de "+array_data.name+"?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (confirm) {
                if (confirm) {
                    AjaxCall("POST", URL_SERVIDOR + "/ChannelingProgram/delete/"+array_data.id, null, function (response) {
                        $scope.$apply(function () {
                            if (response.Codigo >= 200 && response.Codigo <= 299) {
                                swal({
                                    title: "¡Éxito!",
                                    text: response.mensaje,
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            } else {
                                swal({
                                    title: "¡Atención!",
                                    text: "Hubo un error al eliminar",
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {
                                    vm.initDatatable();
                                });
                            }
                        });
                    }, function() {});
                } else {
                    swal("¡Alerta!", "Ningun Cambio Realizado", "warning");
                }
            });
        };
        // <========== ELIMINAR PROGRAMA ==========>

        // <========== INICIALIZAR DATATABLE ==========>
        function initDatatable() {
            vm.upload = false;
            AjaxCall("GET", URL_SERVIDOR + "/ChannelingProgram", null, function (response) {
                $scope.$apply(function () {
                    $scope.solicitudes = response.datos;
                });
            }, function () {});
        }
        // <========== INICIALIZAR DATATABLE ==========>

        vm.initDatatable();

    }
})();