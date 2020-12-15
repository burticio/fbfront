(function () {
    'use strict';

    angular
        .module('app.solicitudesCanceladas')
        .controller('solicitudesCanceladasController', solicitudesCanceladasController);

    /** @ngInject */
    function solicitudesCanceladasController($scope, localStorageService, msNavigationService, $state, $mdDialog) {
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


        $scope.solicitudes = {};
        //$scope.documentos = {};
        $scope.motivocancelacion="";
        $scope.uType = localStorageService.get("session_typeId");

        vm.init = init;

        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: false,
            pageLength: 10,
            order: [[ 1, "asc" ]],
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

        $scope.verDetalle = function (ev, data){
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData)
                {
                    $scope.data = formWizardData;
                    $scope.texto = "";
 
                    $scope.closeDialog = function ()
                    {
                        $mdDialog.hide();
                    };

                    $scope.copiartexto = function(){
                        var doc = document,
                        text = doc.getElementById('detallesolicitud'),
                        range,
                        selection;
                        if(doc.body.createTextRange){ //ms
                            range = doc.body.createTextRange();
                            range.moveToElementText(text);
                            range.select();
                        }else if(window.getSelection){ //all others
                            selection = window.getSelection();
                            range = doc.createRange();
                            range.selectNodeContents(text);
                            selection.removeAllRanges();
                            selection.addRange(range);
                        }

                        document.execCommand("copy");

                        /* Alert the copied text */
                        $scope.texto = "Copiado a Portapapeles";
                    }
                },
                templateUrl : 'app/main/solicitudesCanceladas/html/modalDetalle.html',
                parent             : angular.element('body'),
                targetEvent        : ev,
                locals             : {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
        }

        /******************************************************************/
        /*                 MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        $scope.dlgreactivarSolicitud = function (ev, solicitud) {
            $mdDialog.show({
                locals: { localSolicitud : solicitud },
                controller: ReactivarSolicitudController,
                templateUrl: 'app/main/solicitudesCanceladas/html/dialogo.reactivarsolicitud.html',
                parent: angular.element('body'),
                targetEvent: solicitud,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.reactivarSolicitud(solicitud)
            }, function() {});
        };
        // <==========  ==========>

        // <========== EXPORTAR CONTENIDO ==========>
        $scope.downloadFile = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportcancel";
            setTimeout(function(){
                vm.cerrarCargando();
            }, 500);
        }
        // <========== EXPORTAR CONTENIDO ==========>

        // <========== CONTROLLER  ==========>
        function ReactivarSolicitudController($scope, $mdDialog,localSolicitud) {
            //$scope.array_programs = array_programs;
            $scope.respuestaReactivarSolicitud = function (respuesta, motivocancelacion) {
                if (respuesta) {
                    localStorageService.set("cancel_reason", motivocancelacion);
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLER  ==========>

        // <==========  ==========>
        $scope.reactivarSolicitud = function (solicitud) {
            var id = solicitud.id;
            var cancelreason = localStorageService.get("cancel_reason");
            var data = {
                "cancel_reason": cancelreason
            };
            AjaxCall("POST", URL_SERVIDOR + "/Application/opReactivate/" + id, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 5000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.init();
                    }
                });
            }, function () {});
        }

        /******************************************************************/
        /*             FIN MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        function init() {
            vm.mostrarCargando();
            $scope.aux = [];
            AjaxCall("GET", URL_SERVIDOR + "/ApplicationCancel", null, function (response) {
                //response.datos.forEach(function(e){
                //    if(e.status == 0 || e.status == 3){
                //        $scope.aux.push(e);
                //    }
                $scope.solicitudes = response.datos;
                //});
            }, function () {
                $scope.$apply(function(){
                    //$scope.solicitudes =response.datos;
                });
                vm.cerrarCargando();
            });
        };       
        vm.init();
    }
})();
