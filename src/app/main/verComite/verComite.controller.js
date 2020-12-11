(function () {
    'use strict';

    angular
        .module('app.verComite')
        .controller('verComiteController', verComiteController);

    /** @ngInject */
    function verComiteController($scope, $mdDialog, localStorageService, $state) {
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
        $scope.vanAVotar = false;
        vm.dtOptions = {
            pagingType: 'full_numbers',
            autoWidth: true,
            pageLength: 10,
            dom: 'Bfrtip',
            buttons: [
                'print',
                'csv'
            ],
            responsive: false,
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

        $scope.puedeDescargar = true;

        if(localStorageService.get("sessionEstatus") == 3){
            $scope.puedeDescargar = true;
        }

        $scope.listado = [];
  
        vm.init = init;

        $scope.columna1 = "";
        $scope.columna2 = "Solicitante";
        $scope.columna3 = "Programa";
        $scope.columna4 = "Universidad";
        $scope.columna5 = "V. Emitidos";
        $scope.columna6 = "V. Faltantes";
        $scope.columna7 = "Cal";
        $scope.columna8 = "R. Parcial";
        $scope.columna9 = "Comentarios";


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

        vm.irDetalleSolicitud = irDetalleSolicitud;

        function irDetalleSolicitud(sesion) {
            localStorageService.set("detalleComite", sesion);
            $state.go("app.detalleComite");
        }

        function cerrarCargando() {
            $mdDialog.hide(alert, "finished");
            alert = undefined;
        }

        $scope.seleccionarTodos = function () {
            $scope.listado.forEach(function (e) {
                if (e.chkMasivo) {
                    e.chkMasivo = false;
                } else {
                    e.chkMasivo = true;

                }
            });
        }

        $scope.verVotos = function (ev, data) {
            vm.mostrarCargando();
            $mdDialog.show({
                controller: function ($scope, $mdDialog, formWizardData) {

                    $scope.data = formWizardData;
                    $scope.votos = {};

                    var objData = {
                        "session_Application_Id": $scope.data.session_Application_Id
                    };

                    AjaxCall("POST", URL_SERVIDOR + "/votesForApplication", objData, function (response) {
                        $scope.$apply(function () { $scope.votos = response.datos });

                    }, function () {

                    });

                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    };
                },
                templateUrl: 'app/main/verComite/html/verVotos.html',
                parent: angular.element('body'),
                targetEvent: ev,
                locals: {
                    formWizardData: data
                },
                clickOutsideToClose: true
            });
            vm.cerrarCargando();
        }

        $scope.votoMasivoSolicitudes = function (voto) {
            var arr = new Array();
            $scope.listado.forEach(function (e) {
                if(e.chkMasivo){
                    arr.push(e.session_Application_Id);
                }
            });

            if(arr.length <= 0){
                swal("Atención", "Debes seleccionar al menos una solicitud", "info");
                return false;
            }

            var body = {
                "session_Application_Ids": arr,
                "email": localStorageService.get("session_email"),
                "status": voto
            };

            AjaxCall("POST", URL_SERVIDOR + "/addVote", body, function (response) {
                swal("Atención", response.mensaje, "success");
            }, function () {
                vm.init();
            });
        }

        function fillArray(){
            $scope.listado = [];
            for (var i = 0; i < $scope.sesiones.datos.length; i++) {
                for (var j = 0; j < $scope.sesiones.datos2.length; j++) {

                    if ($scope.sesiones.datos2[j].session_Application_Id == $scope.sesiones.datos[i].id) {
                        $scope.listado.push({
                            "id": $scope.sesiones.datos[i].id,
                            "name": $scope.sesiones.datos[i].name,
                            "lastName": $scope.sesiones.datos[i].lastName,
                            "mLastName": $scope.sesiones.datos[i].mLastName,
                            "session_Id": $scope.sesiones.datos[i].session_Id,
                            "program_Name": $scope.sesiones.datos[i].program_Name,
                            "university_Name": $scope.sesiones.datos[i].university_Name,
                            "number_Score": $scope.sesiones.datos[i].number_Score,
                            "text_Score": $scope.sesiones.datos[i].text_Score,
                            "session_Application_Id": $scope.sesiones.datos2[j].session_Application_Id,
                            "Votos_Emitidos": $scope.sesiones.datos2[j].Votos_Emitidos,
                            "votos_Faltantes": $scope.sesiones.datos2[j].votos_Faltantes,
                            "Resultado_Parcial": $scope.sesiones.datos2[j].Resultado_Parcial,
                            "No_Comentarios": $scope.sesiones.datos2[j].No_Comentarios,
                            "Votacion": $scope.sesiones.datos2[j].Votacion,
                            "chkMasivo": false,
                            "application_id": $scope.sesiones.datos[i].application_Id
                        });
                    }
                }
            }
            vm.cerrarCargando();
        }

        $scope.downloadFile = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/exportClosedSessionReport/" + localStorageService.get("sessionIdComite");
            setTimeout(function(){
                vm.cerrarCargando();
            }, 500);
        }

        function init() {
            vm.mostrarCargando();

            var idPerfil = localStorageService.get("session_typeId");

            if (idPerfil == 3) {
                $scope.vanAVotar = true;
            }

            if (idPerfil == 2 || idPerfil == 6 || idPerfil == 7) {

                var objData = {
                    "session_Id": localStorageService.get("sessionIdComite")
                }

                AjaxCall("POST", URL_SERVIDOR + "/sessionApplicationsForAdministrator", objData, function (response) {
                    $scope.sesiones = response;

                }, function () {
                    fillArray();

                });

            } else if (idPerfil == 3) {

                var objData = {
                    "session_Id": localStorageService.get("sessionIdComite"),
                    "committee_Mail": localStorageService.get("session_email")
                }

                AjaxCall("POST", URL_SERVIDOR + "/sessionApplicationsForCommittee", objData, function (response) {
                     
                    $scope.sesiones = response;

                }, function () {
                    fillArray();
                });

            } else if (idPerfil == 4) {
                var objData = {
                    "session_Id": localStorageService.get("sessionIdComite"),
                    "operator_Mail": localStorageService.get("session_email")
                }

                AjaxCall("POST", URL_SERVIDOR + "/sessionApplicationsForOperator", objData, function (response) {
                    $scope.sesiones = response;
                }, function () {
                    fillArray();

                });
            } 
        }

        vm.init();

    }


})();
