(function () {
    'use strict';

    angular
        .module('app.reporteemas')
        .controller('EmasController', EmasController);

    function EmasController($scope, $mdDialog, localStorageService, $sce,$state) {

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

        // <========== VARIABLES INICIALES ==========>
        $scope.solicitudes = [];

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

        // <========== MOSTRAR DETALLE SOLICITUD ==========>
        $scope.mostrarDetalle = function (solicitud) {

            vm.mostrarCargando();

            var id = solicitud.Application_Id;
            var dataInformation = {
                application_Id: id
            }

            var arrayentrevista = [];
            var arraysolicitud = [];
            var documentos = [];
            var documentosaceptacion = [];

            var country = [];
            var bycountry = [];

            var arraycountries = [];
            var arrayuniversities = [];
            var arrayProgram_Types = [];
            var arrayProgram_Modalities = [];

            var criterialNames = [];
            var criterialValues = [];

            var residenceCountry = "";
            var Interview_ID_From_BD = "";

            var estatus_entrevista = solicitud.Application_status;

            AjaxCall("GET", URL_SERVIDOR + "/Application/" + id, null, function (response) {
                $scope.$apply(function () {
                    arraysolicitud = response.datos[0];
                    residenceCountry = response.datos[0].residenceCountry;
                });
            }, function () {

                AjaxCall("POST", URL_SERVIDOR + "/Interview/showapplication", dataInformation, function (response) {
                    $scope.$apply(function () {
                        Interview_ID_From_BD = response.datos[0].interview_Id
                    });
                }, function () {

                    var dataInterviewDetail = {
                        "Interview_Id": Interview_ID_From_BD
                    };
                    AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showinterview", dataInterviewDetail, function (response) {
                        $scope.$apply(function () {
                            if (response.Codigo == 404) {
                                arrayentrevista = {
                                    Interview_Id: Interview_ID_From_BD,
                                    bach_career_alternative: null,
                                    bach_companion: null,
                                    bach_credit_bureau: null,
                                    bach_expenses_list: null,
                                    bach_extra_subject: null,
                                    bach_extraordinary_exams: null,
                                    bach_father_lives: null,
                                    bach_fix_income: 0,
                                    bach_general_average: 0,
                                    bach_high_school_actual_cost: 0,
                                    bach_high_school_desired_cost: 0,
                                    bach_high_school_specialty: null,
                                    bach_home_economics: null,
                                    bach_maximum_cost: 0,
                                    bach_mother_lives: null,
                                    bach_parents_civil_status_id: null,
                                    bach_parents_support: null,
                                    bach_siblings: null,
                                    bach_total_expenses: 0,
                                    bach_tutor_enterprise: null,
                                    bach_tutor_job_title: null,
                                    bach_tutor_labor_old_years: 0,
                                    bach_variable_income: 0,
                                    bach_workshop: null,
                                    bach_workshop_subject: null,
                                    both_actual_salary: 0,
                                    both_aditional_language: null,
                                    both_aditional_language_percentage: 0,
                                    both_chinese_percentage: 0,
                                    both_defects: null,
                                    both_english_percentage: 0,
                                    both_enterprise: null,
                                    both_french_percentage: 0,
                                    both_general_comments: null,
                                    both_german_percentage: 0,
                                    both_job_title: null,
                                    both_labor_old_years: 0,
                                    both_languages_comments: null,
                                    both_live_with: null,
                                    both_personal_vision: null,
                                    both_portuguese_percentage: 0,
                                    both_professional_vision: null,
                                    both_program_reasons: null,
                                    both_qualities: null,
                                    both_scholarship_merit: null,
                                    both_what_if_not: null,
                                    both_worker: null,
                                    id: null,
                                    post_SR_FB_acknowledgment: null,
                                    post_SR_FB_agreement: null,
                                    post_SR_FB_comments: null,
                                    post_additional_founding: null,
                                    post_additional_founding_text: null,
                                    post_budget: null,
                                    post_certificated: 0,
                                    post_children: 0,
                                    post_labor_experience: null,
                                    post_language_accreditation: null,
                                    post_last_semester: 0,
                                    post_other_studies: null,
                                    post_proud_about: null,
                                    post_recognition: null,
                                    post_social_labor: null,
                                    post_social_labor_text: null
                                };
                            } else {
                                arrayentrevista = {
                                    Interview_Id: response.datos[0].Interview_Id,
                                    bach_career_alternative: response.datos[0].bach_career_alternative,
                                    bach_companion: response.datos[0].bach_companion,
                                    bach_credit_bureau: response.datos[0].bach_credit_bureau,
                                    bach_expenses_list: response.datos[0].bach_expenses_list,
                                    bach_extra_subject: response.datos[0].bach_extra_subject,
                                    bach_extraordinary_exams: response.datos[0].bach_extraordinary_exams,
                                    bach_father_lives: response.datos[0].bach_father_lives,
                                    bach_fix_income: parseFloat(response.datos[0].bach_fix_income),
                                    bach_general_average: parseFloat(response.datos[0].bach_general_average),
                                    bach_high_school_actual_cost: parseFloat(response.datos[0].bach_high_school_actual_cost),
                                    bach_high_school_desired_cost: parseFloat(response.datos[0].bach_high_school_desired_cost),
                                    bach_high_school_specialty: response.datos[0].bach_high_school_specialty,
                                    bach_home_economics: response.datos[0].bach_home_economics,
                                    bach_maximum_cost: parseFloat(response.datos[0].bach_maximum_cost),
                                    bach_mother_lives: response.datos[0].bach_mother_lives,
                                    bach_parents_civil_status_id: response.datos[0].bach_parents_civil_status_id,
                                    bach_parents_support: response.datos[0].bach_parents_support,
                                    bach_siblings: response.datos[0].bach_siblings,
                                    bach_total_expenses: parseFloat(response.datos[0].bach_total_expenses),
                                    bach_tutor_enterprise: response.datos[0].bach_tutor_enterprise,
                                    bach_tutor_job_title: response.datos[0].bach_tutor_job_title,
                                    bach_tutor_labor_old_years: parseInt(response.datos[0].bach_tutor_labor_old_years),
                                    bach_variable_income: parseFloat(response.datos[0].bach_variable_income),
                                    bach_workshop: response.datos[0].bach_workshop,
                                    bach_workshop_subject: null,
                                    both_actual_salary: parseFloat(response.datos[0].both_actual_salary),
                                    both_aditional_language: response.datos[0].both_aditional_language,
                                    both_aditional_language_percentage: parseInt(response.datos[0].both_aditional_language_percentage),
                                    both_chinese_percentage: parseInt(response.datos[0].both_chinese_percentage),
                                    both_defects: response.datos[0].both_defects,
                                    both_english_percentage: parseInt(response.datos[0].both_english_percentage),
                                    both_enterprise: response.datos[0].both_enterprise,
                                    both_french_percentage: parseInt(response.datos[0].both_french_percentage),
                                    both_general_comments: response.datos[0].both_general_comments,
                                    both_german_percentage: parseInt(response.datos[0].both_german_percentage),
                                    both_job_title: response.datos[0].both_job_title,
                                    both_labor_old_years: parseFloat(response.datos[0].both_labor_old_years),
                                    both_languages_comments: response.datos[0].both_languages_comments,
                                    both_live_with: response.datos[0].both_live_with,
                                    both_personal_vision: response.datos[0].both_personal_vision,
                                    both_portuguese_percentage: parseInt(response.datos[0].both_portuguese_percentage),
                                    both_professional_vision: response.datos[0].both_professional_vision,
                                    both_program_reasons: response.datos[0].both_program_reasons,
                                    both_qualities: response.datos[0].both_qualities,
                                    both_scholarship_merit: response.datos[0].both_scholarship_merit,
                                    both_what_if_not: response.datos[0].both_what_if_not,
                                    both_worker: response.datos[0].both_worker,
                                    id: response.datos[0].id,
                                    post_SR_FB_acknowledgment: response.datos[0].post_SR_FB_acknowledgment,
                                    post_SR_FB_agreement: response.datos[0].post_SR_FB_agreement,
                                    post_SR_FB_comments: response.datos[0].post_SR_FB_comments,
                                    post_additional_founding: response.datos[0].post_additional_founding,
                                    post_additional_founding_text: response.datos[0].post_additional_founding_text,
                                    post_budget: response.datos[0].post_budget,
                                    post_certificated: parseInt(response.datos[0].post_certificated),
                                    post_children: parseInt(response.datos[0].post_children),
                                    post_labor_experience: response.datos[0].post_labor_experience,
                                    post_language_accreditation: response.datos[0].post_language_accreditation,
                                    post_last_semester: parseInt(response.datos[0].post_last_semester),
                                    post_other_studies: response.datos[0].post_other_studies,
                                    post_proud_about: response.datos[0].post_proud_about,
                                    post_recognition: response.datos[0].post_recognition,
                                    post_social_labor: response.datos[0].post_social_labor,
                                    post_social_labor_text: response.datos[0].post_social_labor_text
                                };
                            }
                        });
                    }, function () {

                        AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                            $scope.$apply(function () {
                                country = response.datos;
                            });
                        }, function () {

                            AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + residenceCountry, null, function (response) {
                                $scope.$apply(function () {
                                    bycountry = response.datos;
                                });
                            }, function () {

                                var dataCalifications = {
                                    "interview_Id": Interview_ID_From_BD
                                }
                                AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/listinterview", dataCalifications, function (response) {
                                    $scope.$apply(function () {

                                        if (response.Codigo == 200) {

                                            if (response.datos.length != 0) {

                                                criterialNames = {
                                                    "item1": response.datos[0].name,
                                                    "item2": response.datos[1].name,
                                                    "item3": response.datos[2].name,
                                                    "item4": response.datos[3].name
                                                };

                                                criterialValues = {
                                                    "item1": response.datos[0].Score,
                                                    "item2": response.datos[1].Score,
                                                    "item3": response.datos[2].Score,
                                                    "item4": response.datos[3].Score
                                                };

                                            }

                                        } else { }
                                    });
                                }, function () {

                                    var objData = {
                                        "id": solicitud.Application_Id
                                    }

                                    AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocument/showPerApplication", objData, function (response) {
                                        $scope.$apply(function () {
                                            documentos = response.datos;
                                        });
                                    }, function () {

                                        AjaxCall("POST", URL_SERVIDOR + "/ApplicationDocumentFA/showPerApplication", objData, function (response) {
                                            $scope.$apply(function () {
                                                documentosaceptacion = response.datos;
                                            });
                                        }, function () {

                                            $mdDialog.show({
                                                locals: {
                                                    solicitud: solicitud,
                                                    criterialNames: criterialNames,
                                                    criterialValues: criterialValues,
                                                    arraysolicitud: arraysolicitud,
                                                    arrayentrevista: arrayentrevista,
                                                    documentos: documentos,
                                                    documentosaceptacion: documentosaceptacion,
                                                    estatus_entrevista: estatus_entrevista,
                                                    country: country,
                                                    bycountry: bycountry,
                                                    arraycountries: arraycountries,
                                                    arrayuniversities: arrayuniversities,
                                                    arrayProgram_Types: arrayProgram_Types,
                                                    arrayProgram_Modalities: arrayProgram_Modalities
                                                },
                                                controller: MostrarDetalleController,
                                                templateUrl: 'app/main/reportes/emas/html/dialogo.mostrardetalle.html',
                                                parent: angular.element(document.body),
                                                targetEvent: solicitud,
                                                clickOutsideToClose: false,
                                                fullscreen: false
                                            }).then(function () { }, function () { });

                                            vm.cerrarCargando();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });

        };
        // <========== MOSTRAR DETALLE SOLICITUD ==========>

        // <========== CONTROLLLER DETALLE SOLICITUD ==========>
        function MostrarDetalleController($scope, $mdDialog, solicitud, criterialNames, criterialValues, arraysolicitud, arrayentrevista, country, bycountry, arraycountries, arrayuniversities, arrayProgram_Types, arrayProgram_Modalities, documentos, documentosaceptacion, estatus_entrevista) {
            $scope.solicitud = solicitud;
            $scope.criterialNames = criterialNames
            $scope.criterialValues = criterialValues;
            $scope.arraysolicitud = arraysolicitud;
            $scope.arrayentrevista = arrayentrevista;
            $scope.documentos = documentos;
            $scope.documentosaceptacion = documentosaceptacion;
            $scope.estatus_entrevista = estatus_entrevista;
            $scope.country = country;
            $scope.bycountry = bycountry;
            $scope.arraycountries = arraycountries;
            $scope.arrayuniversities = arrayuniversities;
            $scope.arrayProgram_Types = arrayProgram_Types;
            $scope.arrayProgram_Modalities = arrayProgram_Modalities;

            $scope.file = "";
            $scope.fileAceptacion = "";

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

            $scope.respuestaMostrarDetalle = function () { $mdDialog.cancel(); };

            $scope.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.verDocumento = function (ev, data) {
                var bas64="";
                var formato="";
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                }

                AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocument/" + data.id, null, function (response) {                    
                    formato = response.datos[0].file_format;
                    bas64 = response.datos[0].value;
                }, function () {
                    $scope.$apply(function () {
                        $scope.mostrarArchivo();
                    });
                });

                $scope.mostrarArchivo = function () {
                    switch (formato) {
                        case 'png':
                            $scope.file = "data:image/png;base64," + bas64;
                            break;
                        case 'jpg':
                            $scope.file = "data:image/jpg;base64," + bas64;
                            break;
                        case 'jpeg':
                            $scope.file = "data:image/jpeg;base64," + bas64;
                            break;
                        case 'pdf':
                            $scope.file = "data:application/pdf;base64," + bas64;
                            break;
                        case 'mp4':
                            return 'video/mp4';
                            break;
                        case 'mp3':
                            return 'audio/mp3'
                            break;
                        case 'msword':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.doc";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.docx";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.ms-excel':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.xls";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.xlsx";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                    }
                }
            }
            
            // =========== ACEPTACION =========== 

            $scope.trustSrcAceptacion = function (src) {
                return $sce.trustAsResourceUrl(src);
            }

            $scope.verDocumentoAceptacion = function (ev, data) {
                var bas64="";
                var formato="";
                $scope.trustSrc = function (src) {
                    return $sce.trustAsResourceUrl(src);
                }

                AjaxCall("GET", URL_SERVIDOR + "/ApplicationDocumentFA/" + data.id, null, function (response) {              
                    formato = response.datos[0].file_format;
                    bas64 = response.datos[0].value;
                }, function () {
                    $scope.$apply(function () {
                        $scope.mostrarArchivo();
                    });
                });

                $scope.mostrarArchivo = function () {
                    switch (formato) {
                        case 'png':
                            $scope.fileAceptacion = "data:image/png;base64," + bas64;
                            break;
                        case 'jpg':
                            $scope.fileAceptacion = "data:image/jpg;base64," + bas64;
                            break;
                        case 'jpeg':
                            $scope.fileAceptacion = "data:image/jpeg;base64," + bas64;
                            break;
                        case 'pdf':
                            $scope.fileAceptacion = "data:application/pdf;base64," + bas64;
                            break;
                        case 'mp4':
                            return 'video/mp4';
                            break;
                        case 'mp3':
                            return 'audio/mp3'
                            break;
                        case 'msword':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.doc";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.docx";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.ms-excel':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.xls";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            var dlnk = document.getElementById('descargarArchivo');
                            var pdf = 'data:application/octet-stream;base64,' + json;
                            dlnk.download = "evidencia.xlsx";
                            dlnk.href = pdf;
                            dlnk.click();
                            break;
                    }
                }
            }
        }
        // <========== CONTROLLLER DETALLE SOLICITUD ==========>

        // <========== EXPORTAR CONTENIDO ==========>
        $scope.downloadFile = function(){
            vm.mostrarCargando();
            window.location.href = URL_SERVIDOR + "/Reports/exportcanalizeemas";
            setTimeout(function(){
                vm.cerrarCargando();
            }, 500);
        }
        // <========== EXPORTAR CONTENIDO ==========>

        // <========== INICIALIZAR DATATABLE ==========>
        function initDatatable() {
            vm.upload = false;
            AjaxCall("GET", URL_SERVIDOR + "/Reports/listcanalizeemas", null, function (response) {
                $scope.$apply(function () {
                    $scope.solicitudes = response.datos;
                });
            }, function () {});
        }
        // <========== INICIALIZAR DATATABLE ==========>

        vm.initDatatable();

    }
})();