(function () {
    'use strict';

    angular
        .module('app.entrevista_fecha')
        .controller('EntrevistaFechaController', EntrevistaFechaController);

    function EntrevistaFechaController($scope, $mdDialog, localStorageService,$state) {

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
        vm.initDatatable = initDatatable;

        $scope.motivocancelacion="";
        // vm.initCriterialInterview = initCriterialInterview;

        // <========== ARRAYS PARA MOSTRAR EN LA VISTA ==========>
        $scope.entrevistas = [];
        $scope.solicitudes = [];
        // <========== ARRAYS PARA MOSTRAR EN LA VISTA ==========>
        $scope.uType = localStorageService.get("session_typeId");

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

        // <========== VALORES INICIALES DE ELEMENNTOS ==========>
        vm.aceptarFecha = aceptarFecha;
        vm.fechaEntrevista = new Date();
        $scope.minFechaEntrevista = moment(new Date()).format('YYYY-MM-DD');
        // <========== VALORES INICIALES DE ELEMENNTOS ==========>

        // <========== VALORES DEL DATATABLE ==========>
        vm.dtInstance = {}
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
        // <========== VALORES DEL DATATABLE ==========>

        // <========== AGENDAR ENTREVISTA ==========>
        $scope.agendarFecha = function (entrevista) { 
            var ctrl = {
                minDateActual: new Date(moment().format('L'))
            }
            localStorageService.set("entrevista_id", entrevista.interview_Id)
            localStorageService.set("fecha_seleccionada", vm.fechaEntrevista);
            $mdDialog.show({
                locals: { solicitante: entrevista.applicant, ctrl: ctrl},
                controller: AgendarFechaController,
                templateUrl: 'app/main/entrevistas/entrevista_fecha/html/dialogo.agendarfecha.html',
                parent: angular.element(document.body),
                targetEvent: entrevista,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.agendarFechaAgente()
            }, function() {});
        };
        // <========== AGENDAR ENTREVISTA ==========>

        // <========== CONTROLLLER AGENDAR ENTREVISTA ==========>
        function AgendarFechaController($scope, $mdDialog, solicitante, ctrl,localStorageService) {
            $scope.solicitante = solicitante;
            $scope.ctrl = ctrl;
            $scope.uType = localStorageService.get("session_typeId");

            $scope.horario = {
                opciones: [{
                        value: "10:00 am"
                    },
                    {
                        value: "10:30 am"
                    },
                    {
                        value: "11:00 am"
                    },
                    {
                        value: "11:30 am"
                    },
                    {
                        value: "12:00 pm"
                    },
                    {
                        value: "12:30 pm"
                    },
                    {
                        value: "01:00 pm"
                    },
                    {
                        value: "01:30 pm"
                    },
                    {
                        value: "02:00 pm"
                    },
                    {
                        value: "02:30 pm"
                    },
                    {
                        value: "03:00 pm"
                    },
                    {
                        value: "03:30 pm"
                    },
                    {
                        value: "04:00 pm"
                    },
                    {
                        value: "04:30 pm"
                    },
                    {
                        value: "05:00 pm"
                    },
                    {
                        value: "05:30 pm"
                    },
                    {
                        value: "06:00 pm"
                    }]
            };

            $scope.respuestaAgendarFecha = function (agendar) {
                var modaltime = $("#datetimepickermodal").val();
                var validOne = modaltime.replace('"', '')
                var validTwo = validOne.replace('"', '')
                var fecha = moment(validTwo).format('YYYY-M-DD')
                var horario = fecha + " " + $scope.time;
                localStorageService.set("fecha_seleccionada", moment(horario).format('YYYY-M-DD h:mm a'))
                if (agendar) {
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLLER AGENDAR ENTREVISTA ==========>

        // <========== AGENTE PROPONE ENTREVISTA ==========>
        $scope.agendarFechaAgente = function () {
            var data = {
                "date": localStorageService.get("fecha_seleccionada")
            }
            var entrevistaId = localStorageService.get("entrevista_id")
            AjaxCall("POST", URL_SERVIDOR + "/Interview/proposedateagent/" + entrevistaId , data, function (response) {
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
                            location.reload();
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
                            location.reload();
                        });
                    }
                });
            }, function() {});
        }
        // <========== AGENTE PROPONE ENTREVISTA ==========>

        // <========== AGENTE ACEPTA ENTREVISTA ==========>
        function aceptarFecha(entrevista) {
            vm.mostrarCargando();
            var entrevistaId = entrevista.interview_Id
            AjaxCall("POST", URL_SERVIDOR + "/Interview/acceptdate/" + entrevistaId, null, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        vm.cerrarCargando();
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {
                            location.reload();
                        });
                    } else {
                        vm.cerrarCargando();
                        swal({
                            title: "Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {
                            location.reload();
                        });
                    }
                });
            }, function() {});
        }
        // <========== AGENTE ACEPTA ENTREVISTA ==========>

        // <========== CAPTURAR ENTREVISTA ==========>
        $scope.capturarEntrevista = function (entrevista) {

            localStorageService.set("entrevista_id", entrevista.interview_Id);

            vm.mostrarCargando();

            var id = entrevista.application_Id;
            var application_detail = entrevista.application_details;
            var data = {
                "Interview_Id": entrevista.interview_Id
            };

            var dataInterview = [];
            var dataApplication = [];
            var country = [];
            var bycountry = [];
            var dataApplicationDetail = [];

            var arraycountries = [];
            var arrayuniversities = [];
            var arrayProgram_Types = [];
            var arrayProgram_Modalities = [];
            var estatus = "";
            var intercambioprograma = 0;

            AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showinterview", data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo == 404) {
                        

                        dataInterview.push({
                            Interview_Id : entrevista.interview_Id,
                            bach_career_alternative : null,
                            bach_companion : null,
                            bach_credit_bureau : null,
                            bach_expenses_list : null,
                            bach_extra_subject : null,
                            bach_extraordinary_exams : null,
                            bach_father_lives : null,
                            bach_fix_income : 0,
                            bach_general_average : 0,
                            bach_high_school_actual_cost : 0,
                            bach_high_school_desired_cost : 0,
                            bach_high_school_specialty : null,
                            bach_home_economics : null,
                            bach_maximum_cost : 0,
                            bach_mother_lives : null,
                            bach_parents_civil_status_id : null,
                            bach_parents_support : null,
                            bach_siblings : null,
                            bach_total_expenses : 0,
                            bach_tutor_enterprise : null,
                            bach_tutor_job_title : null,
                            bach_tutor_labor_old_years : 0,
                            bach_variable_income : 0,
                            bach_workshop : null,
                            bach_workshop_subject: null,
                            both_actual_salary : 0,
                            both_aditional_language : null,
                            both_aditional_language_percentage : 0,
                            both_chinese_percentage : 0,
                            both_defects : null,
                            both_english_percentage : 0,
                            both_enterprise : null,
                            both_french_percentage : 0,
                            both_general_comments : null,
                            both_german_percentage : 0,
                            both_job_title : null,
                            both_labor_old_years : 0,
                            both_languages_comments : null,
                            both_live_with : null,
                            both_personal_vision : null,
                            both_portuguese_percentage : 0,
                            both_professional_vision : null,
                            both_program_reasons : null,
                            both_qualities : null,
                            both_scholarship_merit : null,
                            both_what_if_not : null,
                            both_worker : null,
                            id : null,
                            post_SR_FB_acknowledgment : null,
                            post_SR_FB_agreement : null,
                            post_SR_FB_comments : null,
                            post_additional_founding : null,
                            post_additional_founding_text : null,
                            post_budget : null,
                            post_certificated : 0,
                            post_children : 0,
                            post_labor_experience : null,
                            post_language_accreditation : null,
                            post_last_semester : 0,
                            post_other_studies : null,
                            post_proud_about : null,
                            post_recognition : null,
                            post_social_labor : null,
                            post_social_labor_text : null,
                            post_university_status :0,
                            post_university_status_comments : null
                        });
                    } else {
                        
                        dataInterview.push({
                            Interview_Id : response.datos[0].Interview_Id,
                            bach_career_alternative : response.datos[0].bach_career_alternative,
                            bach_companion : response.datos[0].bach_companion,
                            bach_credit_bureau : response.datos[0].bach_credit_bureau,
                            bach_expenses_list : response.datos[0].bach_expenses_list,
                            bach_extra_subject : response.datos[0].bach_extra_subject,
                            bach_extraordinary_exams : response.datos[0].bach_extraordinary_exams,
                            bach_father_lives : response.datos[0].bach_father_lives,
                            bach_fix_income : parseFloat(response.datos[0].bach_fix_income),
                            bach_general_average : parseFloat(response.datos[0].bach_general_average),
                            bach_high_school_actual_cost : parseFloat(response.datos[0].bach_high_school_actual_cost),
                            bach_high_school_desired_cost : parseFloat(response.datos[0].bach_high_school_desired_cost),
                            bach_high_school_specialty : response.datos[0].bach_high_school_specialty,
                            bach_home_economics :response.datos[0].bach_home_economics,
                            bach_maximum_cost : parseFloat(response.datos[0].bach_maximum_cost),
                            bach_mother_lives : response.datos[0].bach_mother_lives,
                            bach_parents_civil_status_id : response.datos[0].bach_parents_civil_status_id,
                            bach_parents_support : response.datos[0].bach_parents_support,
                            bach_siblings : response.datos[0].bach_siblings,
                            bach_total_expenses : parseFloat(response.datos[0].bach_total_expenses),
                            bach_tutor_enterprise : response.datos[0].bach_tutor_enterprise,
                            bach_tutor_job_title : response.datos[0].bach_tutor_job_title,
                            bach_tutor_labor_old_years : parseInt(response.datos[0].bach_tutor_labor_old_years),
                            bach_variable_income : parseFloat(response.datos[0].bach_variable_income),
                            bach_workshop : response.datos[0].bach_workshop,
                            bach_workshop_subject: null,
                            both_actual_salary : parseFloat(response.datos[0].both_actual_salary),
                            both_aditional_language : response.datos[0].both_aditional_language,
                            both_aditional_language_percentage : parseInt(response.datos[0].both_aditional_language_percentage),
                            both_chinese_percentage : parseInt(response.datos[0].both_chinese_percentage),
                            both_defects : response.datos[0].both_defects,
                            both_english_percentage : parseInt(response.datos[0].both_english_percentage),
                            both_enterprise : response.datos[0].both_enterprise,
                            both_french_percentage : parseInt(response.datos[0].both_french_percentage),
                            both_general_comments : response.datos[0].both_general_comments,
                            both_german_percentage : parseInt(response.datos[0].both_german_percentage),
                            both_job_title : response.datos[0].both_job_title,
                            both_labor_old_years : parseFloat(response.datos[0].both_labor_old_years),
                            both_languages_comments : response.datos[0].both_languages_comments,
                            both_live_with : response.datos[0].both_live_with,
                            both_personal_vision : response.datos[0].both_personal_vision,
                            both_portuguese_percentage : parseInt(response.datos[0].both_portuguese_percentage),
                            both_professional_vision : response.datos[0].both_professional_vision,
                            both_program_reasons : response.datos[0].both_program_reasons,
                            both_qualities : response.datos[0].both_qualities,
                            both_scholarship_merit : response.datos[0].both_scholarship_merit,
                            both_what_if_not : response.datos[0].both_what_if_not,
                            both_worker : response.datos[0].both_worker,
                            id : response.datos[0].id,
                            post_SR_FB_acknowledgment : response.datos[0].post_SR_FB_acknowledgment,
                            post_SR_FB_agreement : response.datos[0].post_SR_FB_agreement,
                            post_SR_FB_comments : response.datos[0].post_SR_FB_comments,
                            post_additional_founding : response.datos[0].post_additional_founding,
                            post_additional_founding_text : response.datos[0].post_additional_founding_text,
                            post_budget : response.datos[0].post_budget,
                            post_certificated : parseInt(response.datos[0].post_certificated),
                            post_children : parseInt(response.datos[0].post_children),
                            post_labor_experience : response.datos[0].post_labor_experience,
                            post_language_accreditation : response.datos[0].post_language_accreditation,
                            post_last_semester : parseInt(response.datos[0].post_last_semester),
                            post_other_studies : response.datos[0].post_other_studies,
                            post_proud_about : response.datos[0].post_proud_about,
                            post_recognition : response.datos[0].post_recognition,
                            post_social_labor : response.datos[0].post_social_labor,
                            post_social_labor_text : response.datos[0].post_social_labor_text,
                            post_university_status :response.datos[0].post_university_status,
                            post_university_status_comments : response.datos[0].post_university_status_comments
                        });
                    }
                })
            }, function () {

                AjaxCall("GET", URL_SERVIDOR + "/Application/" + id, null, function (response) {
                    $scope.$apply(function () {
                        dataApplication = response.datos[0];

                        AjaxCall("GET", URL_SERVIDOR + "/ApplicationDetail/" + application_detail, null, function (response) {
                            $scope.$apply(function () {
                                dataApplicationDetail = response.datos;
                            });
                        },function(){},function(){});

                    });
                }, function () {

                    AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                        $scope.$apply(function () {
                            country =  response.datos;
                        });
                    }, function() {

                        AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + dataApplication.residenceCountry, null, function (response) {
                            $scope.$apply(function () {
                                bycountry =  response.datos;
                            });
                        }, function() {

                            var dataFilters = {
                                "Interview_Id": entrevista.interview_Id
                            }

                            AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showapplicationprogramfilters", dataFilters, function (response) {
                                $scope.$apply(function () {
                                    arraycountries = response.countries;
                                    arrayuniversities = response.universities;
                                    arrayProgram_Types = response.program_types;
                                    arrayProgram_Modalities = response.program_modalities;
                                });
                            }, function() {

                                vm.cerrarCargando();

                                if (dataInterview[0].bach_workshop != "Freelance, empleado, empresario" && dataInterview[0].bach_workshop != "Cuanto cuesta la universidad") {
                                    dataInterview[0].bach_workshop_subject = dataInterview[0].bach_workshop;
                                    dataInterview[0].bach_workshop = "3";
                                }

                                var fecha = new Date();
                                var anio = fecha.getFullYear();
                                var minDateActual = anio - 65;
                                var maxDateActual = anio - 15;
                                var ctrl = {
                                    minDateActual: new Date(moment(minDateActual+"-01-01").format('L')),
                                    maxDateActual: new Date(moment(maxDateActual+"-12-31").format('L'))
                                }

                                if(application_detail=='0'){ //ENTREVSITA V1
                                    $mdDialog.show({
                                        locals: {
                                            solicitante: entrevista.applicant,
                                            clasificacion: entrevista.Program_Classification,
                                            arraysolicitud: dataApplication,
                                            arrayentrevista: dataInterview[0],
                                            arraycountries: arraycountries,
                                            arrayuniversities: arrayuniversities,
                                            arrayProgram_Types: arrayProgram_Types,
                                            arrayProgram_Modalities: arrayProgram_Modalities,
                                            intercambioprog: intercambioprograma,
                                            country: country,
                                            bycountry: bycountry,
                                            ctrl: ctrl,
                                            estatus: estatus
                                        },
                                        controller: CapturarEntrevistaController,
                                        templateUrl: 'app/main/entrevistas/entrevista_fecha/html/dialogo.capturarentrevista.html',
                                        parent: angular.element(document.body),
                                        targetEvent: entrevista,
                                        clickOutsideToClose: false,
                                        fullscreen: false
                                    }).then(function () {
                                        $scope.guardarEntrevista();
                                    }, function () { 
                                        vm.mostrarCargando();
                                        vm.initDatatable();
                                        vm.cerrarCargando();
                                    });
                                }else{

                                }

                            });
                        });
                    });
                });
            });
        }
        // <========== CAPTURAR ENTREVISTA ==========>

        // <========== CONTROLLER CAPTURAR ENTREVISTA ==========>
        function CapturarEntrevistaController($scope, $mdDialog, solicitante, clasificacion, arraysolicitud, arrayentrevista, country, bycountry, arraycountries, arrayuniversities, intercambioprog, arrayProgram_Types, arrayProgram_Modalities, ctrl,localStorageService) {
            $scope.solicitante = solicitante;
            $scope.clasificacion = clasificacion;
            $scope.arraysolicitud = arraysolicitud;
            $scope.intercambioprograma = intercambioprog;
            $scope.arrayentrevista = arrayentrevista;
            $scope.country = country;
            $scope.bycountry = bycountry;
            $scope.arraycountries = arraycountries;
            $scope.arrayuniversities = arrayuniversities;
            $scope.arrayProgram_Types = arrayProgram_Types;
            $scope.arrayProgram_Modalities = arrayProgram_Modalities;
            $scope.ctrl = ctrl;
            $scope.estatus = "";
            $scope.uType = localStorageService.get("session_typeId");

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

            $scope.respuestaCapturarEntrevista = function(capturar, flag,interprog) {
                if (capturar) {

                    if (clasificacion == "Licenciatura") {
                        arrayentrevista.bach_expenses_list = JSON.stringify(jsonDataExpenses);
                        arrayentrevista.bach_total_expenses = totalExpenses;
                    }
                    console.log("Inter antes: " + $scope.intercambioprograma);
                    //$scope.intercambioprograma=interprog;
                    console.log("Inter nuevo: " + interprog);
                    if (arrayentrevista.bach_workshop != "Freelance, empleado, empresario" && arrayentrevista.bach_workshop != "Cuanto cuesta la universidad") { arrayentrevista.bach_workshop = arrayentrevista.bach_workshop_subject;}
                    if ($("#cambioprimeraposgrado").val() == 1) { arraysolicitud.Program1_Id = $("#primerprogramaposgrado").val(); }
                    if ($("#cambiosegundaposgrado").val() == 1) { arraysolicitud.Program2_Id = $("#segundoprogramaposgrado").val(); }
                    if ($scope.intercambioprograma != interprog) {var temp =0; console.log("Intercambio"); temp = arraysolicitud.Program1_Id; arraysolicitud.Program1_Id = arraysolicitud.Program2_Id; arraysolicitud.Program2_Id = temp;$scope.intercambioprograma=interprog;}
                    if ($("#cambioprimeralicenciatura").val() == 1) { arraysolicitud.Program1_Id = $("#primerprogramalicenciatura").val(); }
                    if ($("#cambiosegundalicenciatura").val() == 1) { arraysolicitud.Program2_Id = $("#segundoprogramalicenciatura").val(); }
                    localStorageService.set("arraysolicitud", arraysolicitud)
                    localStorageService.set("arrayentrevista", arrayentrevista)
                    localStorageService.set("flagtype", flag)
                    //if(flag==0){
                        //$mdDialog.hide();





                    //}else{
                        var newDataInterview = localStorageService.get("arrayentrevista")
                        var newDataApplication = localStorageService.get("arraysolicitud")
                        var newFlagType = localStorageService.get("flagtype")

                        //if (newFlagType == 1) { vm.mostrarCargando(); }
                        //vm.mostrarCargando();
                        $scope.estatus="GUARDANDO DATOS";

                        var dataInterviewToDB = {
                            "Interview_Id": newDataInterview.Interview_Id,
                            "bach_career_alternative" : newDataInterview.bach_career_alternative,
                            "bach_companion" : newDataInterview.bach_companion,
                            "bach_credit_bureau" : newDataInterview.bach_credit_bureau,
                            "bach_expenses_list" : newDataInterview.bach_expenses_list,
                            "bach_extra_subject" : newDataInterview.bach_extra_subject,
                            "bach_extraordinary_exams" : newDataInterview.bach_extraordinary_exams,
                            "bach_father_lives" : newDataInterview.bach_father_lives,
                            "bach_fix_income" : newDataInterview.bach_fix_income,
                            "bach_general_average" : newDataInterview.bach_general_average,
                            "bach_high_school_actual_cost" : newDataInterview.bach_high_school_actual_cost,
                            "bach_high_school_desired_cost" : newDataInterview.bach_high_school_desired_cost,
                            "bach_high_school_specialty" : newDataInterview.bach_high_school_specialty,
                            "bach_home_economics" : newDataInterview.bach_home_economics,
                            "bach_maximum_cost" : newDataInterview.bach_maximum_cost,
                            "bach_mother_lives" : newDataInterview.bach_mother_lives,
                            "bach_parents_civil_status_id" : newDataInterview.bach_parents_civil_status_id,
                            "bach_parents_support" : newDataInterview.bach_parents_support,
                            "bach_siblings" : newDataInterview.bach_siblings,
                            "bach_total_expenses" : newDataInterview.bach_total_expenses,
                            "bach_tutor_enterprise" : newDataInterview.bach_tutor_enterprise,
                            "bach_tutor_job_title" : newDataInterview.bach_tutor_job_title,
                            "bach_tutor_labor_old_years" : newDataInterview.bach_tutor_labor_old_years,
                            "bach_variable_income" : newDataInterview.bach_variable_income,
                            "bach_workshop" : newDataInterview.bach_workshop,
                            "both_actual_salary" : newDataInterview.both_actual_salary,
                            "both_aditional_language" : newDataInterview.both_aditional_language,
                            "both_aditional_language_percentage" : newDataInterview.both_aditional_language_percentage,
                            "both_chinese_percentage" : newDataInterview.both_chinese_percentage,
                            "both_defects" : newDataInterview.both_defects,
                            "both_english_percentage" : newDataInterview.both_english_percentage,
                            "both_enterprise" : newDataInterview.both_enterprise,
                            "both_french_percentage" : newDataInterview.both_french_percentage,
                            "both_general_comments" : newDataInterview.both_general_comments,
                            "both_german_percentage" : newDataInterview.both_german_percentage,
                            "both_job_title" : newDataInterview.both_job_title,
                            "both_labor_old_years" : newDataInterview.both_labor_old_years,
                            "both_languages_comments" : newDataInterview.both_languages_comments,
                            "both_live_with" : newDataInterview.both_live_with,
                            "both_personal_vision" : newDataInterview.both_personal_vision,
                            "both_portuguese_percentage" : newDataInterview.both_portuguese_percentage,
                            "both_professional_vision" : newDataInterview.both_professional_vision,
                            "both_program_reasons" : newDataInterview.both_program_reasons,
                            "both_qualities" : newDataInterview.both_qualities,
                            "both_scholarship_merit" : newDataInterview.both_scholarship_merit,
                            "both_what_if_not" : newDataInterview.both_what_if_not,
                            "both_worker" : newDataInterview.both_worker,
                            //"id" : newDataInterview.id,
                            "post_SR_FB_acknowledgment" : newDataInterview.post_SR_FB_acknowledgment,
                            "post_SR_FB_agreement" : newDataInterview.post_SR_FB_agreement,
                            "post_SR_FB_comments" : newDataInterview.post_SR_FB_comments,
                            "post_additional_founding" : newDataInterview.post_additional_founding,
                            "post_additional_founding_text" : newDataInterview.post_additional_founding_text,
                            "post_budget" : newDataInterview.post_budget,
                            "post_certificated" : newDataInterview.post_certificated,
                            "post_children" : newDataInterview.post_children,
                            "post_labor_experience" : newDataInterview.post_labor_experience,
                            "post_language_accreditation" : newDataInterview.post_language_accreditation,
                            "post_last_semester" : newDataInterview.post_last_semester,
                            "post_other_studies" : newDataInterview.post_other_studies,
                            "post_proud_about" : newDataInterview.post_proud_about,
                            "post_recognition" : newDataInterview.post_recognition,
                            "post_social_labor" : newDataInterview.post_social_labor,
                            "post_social_labor_text" : newDataInterview.post_social_labor_text,
                            "post_university_status" : newDataInterview.post_university_status,
                            "post_university_status_comments" : newDataInterview.post_university_status_comments,
                        }

                        var dataApplicationToDB = {
                            "Person_Id": newDataApplication.Person_Id,
                            "Classification_Id": newDataApplication.Classification_Id,
                            "Program1_Id": newDataApplication.Program1_Id,
                            "Program2_Id": newDataApplication.Program2_Id,
                            "status": newDataApplication.status,
                            "How_Did_You_Find": newDataApplication.How_Did_You_Find,
                            "Other_How_Did_You_Find": newDataApplication.Other_How_Did_You_Find,
                            "email": newDataApplication.email,
                            "name": newDataApplication.Person_Name,
                            "lastName": newDataApplication.Person_lastName,
                            "mLastName": newDataApplication.Person_mLastName,
                            "nationality": newDataApplication.nationality,
                            "residenceCountry": newDataApplication.residenceCountry,
                            "gender": newDataApplication.gender,
                            "civilStatus": newDataApplication.civilStatus,
                            "phoneHome": newDataApplication.phoneHome,
                            "phoneOffice": newDataApplication.phoneOffice,
                            "cellphone": newDataApplication.cellphone,
                            "birthdate": newDataApplication.birthdate,
                            "street": newDataApplication.street,
                            "outdoorNumber": newDataApplication.outdoorNumber,
                            "indoorNumber": newDataApplication.indoorNumber,
                            "neighborhood": newDataApplication.neighborhood,
                            "state": newDataApplication.state,
                            "zipCode": newDataApplication.zipCode,
                            "facebook": newDataApplication.facebook,
                            "skype": newDataApplication.skype,
                            "lastGrade": newDataApplication.lastGrade,
                            "lastSchool": newDataApplication.lastSchool,
                            "Type_Id": "5"
                        }

                        AjaxCall("POST", URL_SERVIDOR + "/Application/update/" + newDataApplication.id, dataApplicationToDB, function (response) {
                            $scope.$apply(function () {
                                if (response.Codigo != 200){  }
                            });
                        }, function () {});

                        AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/store/" + newFlagType, dataInterviewToDB, function (response) {
                            $scope.$apply(function () {
                                
                                if (response.Codigo >= 200 && response.Codigo <= 299) {
                                    $scope.estatus = "DATOS GUARDADOS CORRECTAMENTE";
                                } else {
                                    $scope.estatus = "OCURRIO UN ERROR AL GUARDAR";
                                }
                                //vm.initDatatable();
                                //vm.cerrarCargando();
                                //document.body.scrollTop = 0; // For Safari
                                //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                            });
                        }, function () {},
                        function (jqXHR, exception) { //ERROR EN CONSUMO DE API
                            var msg = '';
                            if (jqXHR.status === 0) {
                                msg = 'ERROR EN LA CONEXIÓN.';
                            } else if (jqXHR.status == 404) {
                                msg = 'Requested page not found. [404]';
                            } else if (jqXHR.status == 500) {
                                msg = 'ERROR DE RESPUESTA EN SERVIDOR [500]';
                            } else if (exception === 'parsererror') {
                                msg = 'Requested JSON parse failed.';
                            } else if (exception === 'timeout') {
                                msg = 'Time out error.';
                            } else if (exception === 'abort') {
                                msg = 'Ajax request aborted.';
                            } else {
                                msg = 'Error desconocido.\n' + jqXHR.responseText;
                            }
                            $scope.estatus = msg;
                            //document.body.scrollTop = 0; // For Safari
                            //.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        });
                    //} 
                    $scope.estatus = "";

                    $("#id_entrevista").animate({ scrollTop: 0 }, "fast");
                } else {
                    $mdDialog.cancel();
                    //vm.mostrarCargando();
                    //vm.initDatatable();
                    //vm.cerrarCargando();
                }
            };

        }
        // <========== CONTROLLER CAPTURAR ENTREVISTA ==========>

        // <========== METODO GUARDAR ENTREVISTA ==========>
        $scope.guardarEntrevista = function () {

            var newDataInterview = localStorageService.get("arrayentrevista")
            var newDataApplication = localStorageService.get("arraysolicitud")
            var newFlagType = localStorageService.get("flagtype")

            //if (newFlagType == 1) { vm.mostrarCargando(); }
            vm.mostrarCargando();

            var dataInterviewToDB = {
                "Interview_Id": newDataInterview.Interview_Id,
                "bach_career_alternative" : newDataInterview.bach_career_alternative,
                "bach_companion" : newDataInterview.bach_companion,
                "bach_credit_bureau" : newDataInterview.bach_credit_bureau,
                "bach_expenses_list" : newDataInterview.bach_expenses_list,
                "bach_extra_subject" : newDataInterview.bach_extra_subject,
                "bach_extraordinary_exams" : newDataInterview.bach_extraordinary_exams,
                "bach_father_lives" : newDataInterview.bach_father_lives,
                "bach_fix_income" : newDataInterview.bach_fix_income,
                "bach_general_average" : newDataInterview.bach_general_average,
                "bach_high_school_actual_cost" : newDataInterview.bach_high_school_actual_cost,
                "bach_high_school_desired_cost" : newDataInterview.bach_high_school_desired_cost,
                "bach_high_school_specialty" : newDataInterview.bach_high_school_specialty,
                "bach_home_economics" : newDataInterview.bach_home_economics,
                "bach_maximum_cost" : newDataInterview.bach_maximum_cost,
                "bach_mother_lives" : newDataInterview.bach_mother_lives,
                "bach_parents_civil_status_id" : newDataInterview.bach_parents_civil_status_id,
                "bach_parents_support" : newDataInterview.bach_parents_support,
                "bach_siblings" : newDataInterview.bach_siblings,
                "bach_total_expenses" : newDataInterview.bach_total_expenses,
                "bach_tutor_enterprise" : newDataInterview.bach_tutor_enterprise,
                "bach_tutor_job_title" : newDataInterview.bach_tutor_job_title,
                "bach_tutor_labor_old_years" : newDataInterview.bach_tutor_labor_old_years,
                "bach_variable_income" : newDataInterview.bach_variable_income,
                "bach_workshop" : newDataInterview.bach_workshop,
                "both_actual_salary" : newDataInterview.both_actual_salary,
                "both_aditional_language" : newDataInterview.both_aditional_language,
                "both_aditional_language_percentage" : newDataInterview.both_aditional_language_percentage,
                "both_chinese_percentage" : newDataInterview.both_chinese_percentage,
                "both_defects" : newDataInterview.both_defects,
                "both_english_percentage" : newDataInterview.both_english_percentage,
                "both_enterprise" : newDataInterview.both_enterprise,
                "both_french_percentage" : newDataInterview.both_french_percentage,
                "both_general_comments" : newDataInterview.both_general_comments,
                "both_german_percentage" : newDataInterview.both_german_percentage,
                "both_job_title" : newDataInterview.both_job_title,
                "both_labor_old_years" : newDataInterview.both_labor_old_years,
                "both_languages_comments" : newDataInterview.both_languages_comments,
                "both_live_with" : newDataInterview.both_live_with,
                "both_personal_vision" : newDataInterview.both_personal_vision,
                "both_portuguese_percentage" : newDataInterview.both_portuguese_percentage,
                "both_professional_vision" : newDataInterview.both_professional_vision,
                "both_program_reasons" : newDataInterview.both_program_reasons,
                "both_qualities" : newDataInterview.both_qualities,
                "both_scholarship_merit" : newDataInterview.both_scholarship_merit,
                "both_what_if_not" : newDataInterview.both_what_if_not,
                "both_worker" : newDataInterview.both_worker,
                //"id" : newDataInterview.id,
                "post_SR_FB_acknowledgment" : newDataInterview.post_SR_FB_acknowledgment,
                "post_SR_FB_agreement" : newDataInterview.post_SR_FB_agreement,
                "post_SR_FB_comments" : newDataInterview.post_SR_FB_comments,
                "post_additional_founding" : newDataInterview.post_additional_founding,
                "post_additional_founding_text" : newDataInterview.post_additional_founding_text,
                "post_budget" : newDataInterview.post_budget,
                "post_certificated" : newDataInterview.post_certificated,
                "post_children" : newDataInterview.post_children,
                "post_labor_experience" : newDataInterview.post_labor_experience,
                "post_language_accreditation" : newDataInterview.post_language_accreditation,
                "post_last_semester" : newDataInterview.post_last_semester,
                "post_other_studies" : newDataInterview.post_other_studies,
                "post_proud_about" : newDataInterview.post_proud_about,
                "post_recognition" : newDataInterview.post_recognition,
                "post_social_labor" : newDataInterview.post_social_labor,
                "post_social_labor_text" : newDataInterview.post_social_labor_text,
                "post_university_status" : newDataInterview.post_university_status,
                "post_university_status_comments" : newDataInterview.post_university_status_comments,
            }

            var dataApplicationToDB = {
                "Person_Id": newDataApplication.Person_Id,
                "Classification_Id": newDataApplication.Classification_Id,
                "Program1_Id": newDataApplication.Program1_Id,
                "Program2_Id": newDataApplication.Program2_Id,
                "status": newDataApplication.status,
                "How_Did_You_Find": newDataApplication.How_Did_You_Find,
                "Other_How_Did_You_Find": newDataApplication.Other_How_Did_You_Find,
                "email": newDataApplication.email,
                "name": newDataApplication.Person_Name,
                "lastName": newDataApplication.Person_lastName,
                "mLastName": newDataApplication.Person_mLastName,
                "nationality": newDataApplication.nationality,
                "residenceCountry": newDataApplication.residenceCountry,
                "gender": newDataApplication.gender,
                "civilStatus": newDataApplication.civilStatus,
                "phoneHome": newDataApplication.phoneHome,
                "phoneOffice": newDataApplication.phoneOffice,
                "cellphone": newDataApplication.cellphone,
                "birthdate": newDataApplication.birthdate,
                "street": newDataApplication.street,
                "outdoorNumber": newDataApplication.outdoorNumber,
                "indoorNumber": newDataApplication.indoorNumber,
                "neighborhood": newDataApplication.neighborhood,
                "state": newDataApplication.state,
                "zipCode": newDataApplication.zipCode,
                "facebook": newDataApplication.facebook,
                "skype": newDataApplication.skype,
                "lastGrade": newDataApplication.lastGrade,
                "lastSchool": newDataApplication.lastSchool,
                "Type_Id": "5"
            }

            swal({
                title: "Se guardarán los datos de la entrevista.",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (click) {
                if (click) {

                    AjaxCall("POST", URL_SERVIDOR + "/Application/update/" + newDataApplication.id, dataApplicationToDB, function (response) {
                        $scope.$apply(function () {
                            if (response.Codigo != 200){  }
                        });
                    }, function () {});

                    AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/store/" + newFlagType, dataInterviewToDB, function (response) {
                        $scope.$apply(function () {
                            
                            if (response.Codigo >= 200 && response.Codigo <= 299) {
                                swal({
                                    title: "Guardado",
                                    text: response.mensaje,
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {});
                                //vm.initDatatable();
                            } else {
                                swal({
                                    title: "¡Atención!",
                                    text: "Ningún cambio hecho (" + response.mensaje + ")",
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {});
                                //vm.initDatatable();
                            }
                            vm.initDatatable();
                            vm.cerrarCargando();

                        });
                    }, function () {},
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

                } else {
                    swal({
                        title: "¡Atención!",
                        text: "Ningún cambio hecho",
                        icon: "error",
                        buttons: false,
                        timer: 2000,
                        dangerMode: false
                    }).then(function() {});
                    vm.initDatatable();
                }
            });
        }
        // <========== METODO GUARDAR ENTREVISTA ==========>




        // <========== CAPTURAR ENTREVISTA V2 ==========>
        $scope.capturarEntrevistaV2 = function (entrevista) {

            //debugger;

            localStorageService.set("entrevista_id", entrevista.interview_Id);

            vm.mostrarCargando();

            var id = entrevista.application_Id;
            var application_detail = entrevista.application_details;
            var data = {
                "Interview_Id": entrevista.interview_Id
            };

            var dataInterview = [];
            var dataApplication = [];
            var country = [];
            var bycountry = [];
            var dataApplicationDetail = [];

            var arraycountries = [];
            var arrayuniversities = [];
            var arrayProgram_Types = [];
            var arrayProgram_Modalities = [];
            var estatus = "";
            var intercambioprograma = 0;

            /*SOLICITUD V2*/
            var paisesnacimiento = {
                modelo: null,
                opciones: []
            };

            var estadosnacimiento = {
                modelo: null,
                opciones: []
            }

            var paises = {
                modelo: null,
                opciones: []
            };

            var estados = {
                modelo: null,
                opciones: []
            }

            var estatusEstudioTrabajo = {
                seleccionado:0,
                proximo:0,
                opciones:[
                    {id:0,txt:"Solo estudio",proximo:0},
                    {id:1,txt:"Solo trabajo",proximo:1},
                    {id:2,txt:"Estudio y trabajo",proximo:1},
                    {id:3,txt:"No estudio ni trabajo",proximo:0}
                ]
            };

            var antiguedadTrabajo = {
                seleccionado:null,
                seleccionado1:null,
                seleccionado2:null,
                opciones:[
                    {id:0,txt:"1 a 6 meses"},
                    {id:1,txt:"7 a 12 meses"},
                    {id:2,txt:"1 a 2 años"},
                    {id:3,txt:"más de 2 años"}
                ]
            };

            /*SOLICITUD V2*/

            AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showinterview", data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo == 404) {
                        

                        dataInterview.push({
                            Interview_Id : entrevista.interview_Id,
                            bach_career_alternative : null,
                            bach_companion : null,
                            bach_credit_bureau : null,
                            bach_expenses_list : null,
                            bach_extra_subject : null,
                            bach_extraordinary_exams : null,
                            bach_father_lives : null,
                            bach_fix_income : 0,
                            bach_general_average : 0,
                            bach_high_school_actual_cost : 0,
                            bach_high_school_desired_cost : 0,
                            bach_high_school_specialty : null,
                            bach_home_economics : null,
                            bach_maximum_cost : 0,
                            bach_mother_lives : null,
                            bach_parents_civil_status_id : null,
                            bach_parents_support : null,
                            bach_siblings : null,
                            bach_total_expenses : 0,
                            bach_tutor_enterprise : null,
                            bach_tutor_job_title : null,
                            bach_tutor_labor_old_years : 0,
                            bach_variable_income : 0,
                            bach_workshop : null,
                            bach_workshop_subject: null,
                            both_actual_salary : 0,
                            both_aditional_language : null,
                            both_aditional_language_percentage : 0,
                            both_chinese_percentage : 0,
                            both_defects : null,
                            both_english_percentage : 0,
                            both_enterprise : null,
                            both_french_percentage : 0,
                            both_general_comments : null,
                            both_german_percentage : 0,
                            both_job_title : null,
                            both_labor_old_years : 0,
                            both_languages_comments : null,
                            both_live_with : null,
                            both_personal_vision : null,
                            both_portuguese_percentage : 0,
                            both_professional_vision : null,
                            both_program_reasons : null,
                            both_qualities : null,
                            both_scholarship_merit : null,
                            both_what_if_not : null,
                            both_worker : null,
                            id : null,
                            post_SR_FB_acknowledgment : null,
                            post_SR_FB_agreement : null,
                            post_SR_FB_comments : null,
                            post_additional_founding : null,
                            post_additional_founding_text : null,
                            post_budget : null,
                            post_certificated : 0,
                            post_children : 0,
                            post_labor_experience : null,
                            post_language_accreditation : null,
                            post_last_semester : 0,
                            post_other_studies : null,
                            post_proud_about : null,
                            post_recognition : null,
                            post_social_labor : null,
                            post_social_labor_text : null,
                            post_university_status :0,
                            post_university_status_comments : null,
                            both_comments_section1:null,
                            both_comments_section2:null,
                            both_comments_section3:null,
                            both_comments_section4:null,
                            both_comments_section5:null,
                            both_comments_section6:null,
                            both_comments_section7:null,
                            both_comments_section8:null,
                            both_comments_section9:null,
                            both_comments_section10:null
                        });
                    } else {
                        
                        dataInterview.push({
                            Interview_Id : response.datos[0].Interview_Id,
                            bach_career_alternative : response.datos[0].bach_career_alternative,
                            bach_companion : response.datos[0].bach_companion,
                            bach_credit_bureau : response.datos[0].bach_credit_bureau,
                            bach_expenses_list : response.datos[0].bach_expenses_list,
                            bach_extra_subject : response.datos[0].bach_extra_subject,
                            bach_extraordinary_exams : response.datos[0].bach_extraordinary_exams,
                            bach_father_lives : response.datos[0].bach_father_lives,
                            bach_fix_income : parseFloat(response.datos[0].bach_fix_income),
                            bach_general_average : parseFloat(response.datos[0].bach_general_average),
                            bach_high_school_actual_cost : parseFloat(response.datos[0].bach_high_school_actual_cost),
                            bach_high_school_desired_cost : parseFloat(response.datos[0].bach_high_school_desired_cost),
                            bach_high_school_specialty : response.datos[0].bach_high_school_specialty,
                            bach_home_economics :response.datos[0].bach_home_economics,
                            bach_maximum_cost : parseFloat(response.datos[0].bach_maximum_cost),
                            bach_mother_lives : response.datos[0].bach_mother_lives,
                            bach_parents_civil_status_id : response.datos[0].bach_parents_civil_status_id,
                            bach_parents_support : response.datos[0].bach_parents_support,
                            bach_siblings : response.datos[0].bach_siblings,
                            bach_total_expenses : parseFloat(response.datos[0].bach_total_expenses),
                            bach_tutor_enterprise : response.datos[0].bach_tutor_enterprise,
                            bach_tutor_job_title : response.datos[0].bach_tutor_job_title,
                            bach_tutor_labor_old_years : parseInt(response.datos[0].bach_tutor_labor_old_years),
                            bach_variable_income : parseFloat(response.datos[0].bach_variable_income),
                            bach_workshop : response.datos[0].bach_workshop,
                            bach_workshop_subject: null,
                            both_actual_salary : parseFloat(response.datos[0].both_actual_salary),
                            both_aditional_language : response.datos[0].both_aditional_language,
                            both_aditional_language_percentage : parseInt(response.datos[0].both_aditional_language_percentage),
                            both_chinese_percentage : parseInt(response.datos[0].both_chinese_percentage),
                            both_defects : response.datos[0].both_defects,
                            both_english_percentage : parseInt(response.datos[0].both_english_percentage),
                            both_enterprise : response.datos[0].both_enterprise,
                            both_french_percentage : parseInt(response.datos[0].both_french_percentage),
                            both_general_comments : response.datos[0].both_general_comments,
                            both_german_percentage : parseInt(response.datos[0].both_german_percentage),
                            both_job_title : response.datos[0].both_job_title,
                            both_labor_old_years : parseFloat(response.datos[0].both_labor_old_years),
                            both_languages_comments : response.datos[0].both_languages_comments,
                            both_live_with : response.datos[0].both_live_with,
                            both_personal_vision : response.datos[0].both_personal_vision,
                            both_portuguese_percentage : parseInt(response.datos[0].both_portuguese_percentage),
                            both_professional_vision : response.datos[0].both_professional_vision,
                            both_program_reasons : response.datos[0].both_program_reasons,
                            both_qualities : response.datos[0].both_qualities,
                            both_scholarship_merit : response.datos[0].both_scholarship_merit,
                            both_what_if_not : response.datos[0].both_what_if_not,
                            both_worker : response.datos[0].both_worker,
                            id : response.datos[0].id,
                            post_SR_FB_acknowledgment : response.datos[0].post_SR_FB_acknowledgment,
                            post_SR_FB_agreement : response.datos[0].post_SR_FB_agreement,
                            post_SR_FB_comments : response.datos[0].post_SR_FB_comments,
                            post_additional_founding : response.datos[0].post_additional_founding,
                            post_additional_founding_text : response.datos[0].post_additional_founding_text,
                            post_budget : response.datos[0].post_budget,
                            post_certificated : parseInt(response.datos[0].post_certificated),
                            post_children : parseInt(response.datos[0].post_children),
                            post_labor_experience : response.datos[0].post_labor_experience,
                            post_language_accreditation : response.datos[0].post_language_accreditation,
                            post_last_semester : parseInt(response.datos[0].post_last_semester),
                            post_other_studies : response.datos[0].post_other_studies,
                            post_proud_about : response.datos[0].post_proud_about,
                            post_recognition : response.datos[0].post_recognition,
                            post_social_labor : response.datos[0].post_social_labor,
                            post_social_labor_text : response.datos[0].post_social_labor_text,
                            post_university_status :response.datos[0].post_university_status,
                            post_university_status_comments : response.datos[0].post_university_status_comments,
                            both_comments_section1: response.datos[0].both_comments_section1,
                            both_comments_section2: response.datos[0].both_comments_section2,
                            both_comments_section3: response.datos[0].both_comments_section3,
                            both_comments_section4: response.datos[0].both_comments_section4,
                            both_comments_section5: response.datos[0].both_comments_section5,
                            both_comments_section6: response.datos[0].both_comments_section6,
                            both_comments_section7: response.datos[0].both_comments_section7,
                            both_comments_section8: response.datos[0].both_comments_section8,
                            both_comments_section9: response.datos[0].both_comments_section9,
                            both_comments_section10: response.datos[0].both_comments_section10

                        });
                    }
                })
            }, function () {

                AjaxCall("GET", URL_SERVIDOR + "/Application/" + id, null, function (response) {
                    $scope.$apply(function () {
                        dataApplication = response.datos[0];

                        AjaxCall("GET", URL_SERVIDOR + "/ApplicationDetail/" + application_detail, null, function (response) {
                            $scope.$apply(function () {
                                dataApplicationDetail = response.datos;
                                estatusEstudioTrabajo.seleccionado=response.datos.study_work_status;
                                antiguedadTrabajo.seleccionado=response.datos.work_seniority;
                                antiguedadTrabajo.seleccionado1=response.datos.previous_job1_seniority;
                                antiguedadTrabajo.seleccionado2=response.datos.previous_job2_seniority;
                            });
                        },function(){},function(){});

                    });
                }, function () {

                    AjaxCall("GET", URL_SERVIDOR + "/Country", null, function (response) {
                        $scope.$apply(function () {
                            paises.opciones = response.datos;
                            paisesnacimiento.opciones = paises.opciones.filter(function(o){
                                return o.latinamerica == 1;
                                });  
                        });
                    }, function() {

                        AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + dataApplication.residenceCountry, null, function (response) {
                            $scope.$apply(function () {
                                estados.opciones =  response.datos;
                                AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + dataApplication.birth_country, null, function (response) {
                                    $scope.$apply(function () {
                                        estadosnacimiento.opciones = response.datos;
                                        vm.cerrarCargando();
                                    });
                                }, function () { });
                            });
                        }, function() {

                            var dataFilters = {
                                "Interview_Id": entrevista.interview_Id
                            }

                            AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/showapplicationprogramfilters", dataFilters, function (response) {
                                $scope.$apply(function () {
                                    arraycountries = response.countries;
                                    arrayuniversities = response.universities;
                                    arrayProgram_Types = response.program_types;
                                    arrayProgram_Modalities = response.program_modalities;
                                });
                            }, function() {

                                vm.cerrarCargando();

                                if (dataInterview[0].bach_workshop != "Freelance, empleado, empresario" && dataInterview[0].bach_workshop != "Cuanto cuesta la universidad") {
                                    dataInterview[0].bach_workshop_subject = dataInterview[0].bach_workshop;
                                    dataInterview[0].bach_workshop = "3";
                                }

                                var fecha = new Date();
                                var anio = fecha.getFullYear();
                                var minDateActual = anio - 65;
                                var maxDateActual = anio - 15;
                                var ctrl = {
                                    minDateActual: new Date(moment(minDateActual+"-01-01").format('L')),
                                    maxDateActual: new Date(moment(maxDateActual+"-12-31").format('L'))
                                }

                                if(application_detail!=null){ //ENTREVSITA V2
                                    $mdDialog.show({
                                        locals: {
                                            solicitante: entrevista.applicant,
                                            clasificacion: entrevista.Program_Classification,
                                            arraysolicitud: dataApplication,
                                            arraydetalles: dataApplicationDetail,
                                            arrayentrevista: dataInterview[0],
                                            arraycountries: arraycountries,
                                            arrayuniversities: arrayuniversities,
                                            arrayProgram_Types: arrayProgram_Types,
                                            arrayProgram_Modalities: arrayProgram_Modalities,
                                            intercambioprog: intercambioprograma,
                                            paisesnacimiento: paisesnacimiento,
                                            paises: paises,
                                            estados: estados,
                                            estadosnacimiento: estadosnacimiento,
                                            country: country,
                                            bycountry: bycountry,
                                            estatusEstudioTrabajo: estatusEstudioTrabajo,
                                            antiguedadTrabajo: antiguedadTrabajo,
                                            ctrl: ctrl,
                                            estatus: estatus
                                        },
                                        controller: CapturarEntrevistaV2Controller,
                                        templateUrl: 'app/main/entrevistas/entrevista_fecha/html/dialogo.capturarentrevistav2.html',
                                        parent: angular.element(document.body),
                                        targetEvent: entrevista,
                                        clickOutsideToClose: false,
                                        fullscreen: false
                                    }).then(function () {
                                        $scope.guardarEntrevistaV2();
                                    }, function () { 
                                        vm.mostrarCargando();
                                        vm.initDatatable();
                                        vm.cerrarCargando();
                                    });
                                }else{

                                }

                            });
                        });
                    });
                });
            });
        }
        // <========== CAPTURAR ENTREVISTA V2 ==========>

        // <========== CONTROLLER CAPTURAR ENTREVISTA V2 ==========>
        function CapturarEntrevistaV2Controller($scope, $mdDialog, solicitante, clasificacion, arraysolicitud, arraydetalles, arrayentrevista, country, bycountry, arraycountries, arrayuniversities, intercambioprog, arrayProgram_Types, arrayProgram_Modalities, ctrl,localStorageService, paises, paisesnacimiento, estados, estadosnacimiento,estatusEstudioTrabajo,antiguedadTrabajo) {
            $scope.solicitante = solicitante;
            $scope.clasificacion = clasificacion;
            $scope.arraysolicitud = arraysolicitud;
            $scope.arraydetalles = arraydetalles
            $scope.intercambioprograma = intercambioprog;
            $scope.arrayentrevista = arrayentrevista;
            $scope.country = country;
            $scope.bycountry = bycountry;
            $scope.arraycountries = arraycountries;
            $scope.arrayuniversities = arrayuniversities;
            $scope.arrayProgram_Types = arrayProgram_Types;
            $scope.arrayProgram_Modalities = arrayProgram_Modalities;
            $scope.ctrl = ctrl;
            $scope.estados = estados;
            $scope.estadosnacimiento = estadosnacimiento;
            $scope.paises = paises;
            $scope.paisesnacimiento = paisesnacimiento;
            $scope.estatusEstudioTrabajo=estatusEstudioTrabajo;
            $scope.antiguedadTrabajo=antiguedadTrabajo;
            $scope.estatus = "";
            $scope.uType = localStorageService.get("session_typeId");

            $scope.opcionprograma = "Primera";

            $scope.cambiaropcionprograma=false;

            $scope.empleosAnteriores=0;

            $scope.boleto=2500;
            $scope.gastosManutencion=0;
            $scope.totalGastos=0;
            if($scope.arraysolicitud.Program1_Modality_Id != 2){
                if($scope.arraysolicitud.Program1_Country_Id!=42){
                    $scope.gastosManutencion=1000;
                }
            }

            $scope.periodo="";
            switch($scope.arraysolicitud.Program1_Duration_Period){
                case "H": $scope.periodo = "Horas";break;
                case "D": $scope.periodo = "Días";break;
                case "S": $scope.periodo = "Semanas";break;
                case "M": $scope.periodo = "Meses";break;
            }

            $scope.arraysolicitud.Program1_Duration = parseInt($scope.arraysolicitud.Program1_Duration);
            $scope.arraysolicitud.Program1_Cost = parseInt($scope.arraysolicitud.Program1_Cost);
            $scope.totalGastos = $scope.arraysolicitud.Program1_Cost + ($scope.arraysolicitud.Program1_Duration * $scope.gastosManutencion) + $scope.boleto;

            $scope.arraysolicitud.outdoorNumber = parseInt($scope.arraysolicitud.outdoorNumber);
            $scope.arraydetalles.lastgrade_score_scale = parseInt($scope.arraydetalles.lastgrade_score_scale);

            $scope.arraydetalles.budget_family_support = parseInt($scope.arraydetalles.budget_family_support);
            $scope.arraydetalles.budget_savings = parseInt($scope.arraydetalles.budget_savings);
            $scope.arraydetalles.complementary_credit = parseInt($scope.arraydetalles.complementary_credit);

            $scope.arraydetalles.budget_assets = parseInt($scope.arraydetalles.budget_assets);
            $scope.arraydetalles.budget_credit = parseInt($scope.arraydetalles.budget_credit);

            $scope.arraydetalles.SR_FB_agreement = parseInt($scope.arraydetalles.SR_FB_agreement);

            $scope.arraydetalles.previous_job1_company_name!=""?$scope.empleosAnteriores=1:$scope.empleosAnteriores=0;

            $scope.idiomas=JSON.parse($scope.arraydetalles.languages);

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

            $scope.universidad2 = {
                modelo: null,
                opciones: []
            };

            $scope.pais2 = {
                modelo: null,
                opciones: []
            };

            $scope.tipo2 = {
                modelo: null,
                opciones: []
            };

            $scope.modalidad2 = {
                modelo: null,
                opciones: []
            };

            $scope.clasificacion2 = {
                modelo: null,
                opciones: []
            };
            $scope.programaSegundaOpcion = {
                modelo: {},
                opciones: []
            }

            $scope.getEdad = function(dateString) {
                var hoy = new Date()
                var fechaNacimiento = new Date(dateString)
                var edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
                var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
                if (
                  diferenciaMeses < 0 ||
                  (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
                ) {
                  edad--
                }
                return edad
            }

            $scope.edad = $scope.getEdad(arraysolicitud.birthdate);

            $scope.cambiarprograma =function(cual){
                $scope.borrarFiltros();
                if(cual=="Primera" || cual=="Segunda"){
                    $scope.opcionprograma=cual;
                    $scope.cambiaropcionprograma=true;
                }else{

                }
            }

            $scope.llenarComboEstado = function () {
                //vm.mostrarCargando();
                AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.arraysolicitud.residenceCountry, null, function (response) {
                    $scope.$apply(function () {
                        $scope.estados.opciones = response.datos;
                        //vm.cerrarCargando();
                    });
                }, function () { });
                //vm.cerrarCargando();
            }

            $scope.llenarComboEstadoNacimiento = function () {
                //vm.mostrarCargando();
                AjaxCall("GET", URL_SERVIDOR + "/State/getByCountry/" + $scope.arraysolicitud.birth_country, null, function (response) {
                    $scope.$apply(function () {
                        $scope.estadosnacimiento.opciones = response.datos;
                        //vm.cerrarCargando();
                    });
                }, function () { });
                //vm.cerrarCargando();
            }

            $scope.buscaPrograma = function() {

                var objData = {
                    "university_id": $scope.universidad2.modelo,
                    "country_id": $scope.pais2.modelo,
                    "type_id": $scope.tipo2.modelo,
                    "modality_id": $scope.modalidad2.modelo
                };

                AjaxCall("POST", URL_SERVIDOR + "/Program/search", objData, function (response) {
                    $scope.$apply(function () {
                        $scope.programaSegundaOpcion.opciones = response.datos;
                        $scope.universidad2.opciones = response.filtros.universities;
                        $scope.pais2.opciones = response.filtros.countries;
                        $scope.clasificacion2.opciones = response.filtros.Program_Classifications;
                        $scope.tipo2.opciones = response.filtros.Program_Types;
                        $scope.modalidad2.opciones = response.filtros.Program_Modalities; 
                    });
                }, function () {
                    
                });
            }

            $scope.segundoPrograma = function () {
                var programa = JSON.parse($scope.programaSegundaOpcion.modelo);
                if($scope.cambiaropcionprograma){
                    if($scope.opcionprograma=="Primera"){
                        $scope.arraysolicitud.Program1_Id=programa.id;
                        $scope.arraysolicitud.Program_Name_1=programa.ProgramName;
                        $scope.arraysolicitud.Program1_Coin=programa.coin_Name;
                        $scope.arraysolicitud.Program1_Coin_Id=programa.coin_Id;
                        $scope.arraysolicitud.Program1_Coin_Symbol=programa.coin_Symbol;
                        $scope.arraysolicitud.Program1_Cost=programa.Program_Cost;
                        $scope.arraysolicitud.Program1_Country_Id=programa.Country_Id;
                        $scope.arraysolicitud.Program1_Country_Name=programa.Country_Name;
                        $scope.arraysolicitud.Program1_Duration=programa.duration;
                        $scope.arraysolicitud.Program1_Duration_Period=programa.duration_period;
                        $scope.arraysolicitud.Program1_Medical_Expenses=programa.Medical_Expenses;
                        $scope.arraysolicitud.Program1_Modality_Id=programa.Modality_Id;
                        $scope.arraysolicitud.Program1_Scholarship_Percentage=programa.Scholarship_Percentage;
                        $scope.arraysolicitud.Program1_Settlement=programa.settlement;
                        $scope.arraysolicitud.Program1_State_Name=programa.State_Name;
                        $scope.arraysolicitud.Program1_TicketSupport=programa.TicketSupport;
                        $scope.arraysolicitud.Program1_University_Name=programa.University_Name;
                        $scope.arraysolicitud.Program1_modality=programa.Modality_Name;

                        $scope.boleto=2500;
                        $scope.gastosManutencion=0;
                        $scope.totalGastos=0;
                        if($scope.arraysolicitud.Program1_Modality_Id != 2){
                            if($scope.arraysolicitud.Program1_Country_Id!=42){
                                $scope.gastosManutencion=1000;
                            }
                        }

                        $scope.periodo="";
                        switch($scope.arraysolicitud.Program1_Duration_Period){
                            case "H": $scope.periodo = "Horas";break;
                            case "D": $scope.periodo = "Días";break;
                            case "S": $scope.periodo = "Semanas";break;
                            case "M": $scope.periodo = "Meses";break;
                        }

                        $scope.arraysolicitud.Program1_Duration = parseInt($scope.arraysolicitud.Program1_Duration);
                        $scope.arraysolicitud.Program1_Cost = parseInt($scope.arraysolicitud.Program1_Cost);
                        $scope.totalGastos = $scope.arraysolicitud.Program1_Cost + ($scope.arraysolicitud.Program1_Duration * $scope.gastosManutencion) + $scope.boleto;

                    }else{
                        $scope.arraysolicitud.Program2_Id=programa.id;
                        $scope.arraysolicitud.Program_Name_2=programa.ProgramName;
                        $scope.arraysolicitud.Program2_Coin=programa.coin_Name;
                        $scope.arraysolicitud.Program2_Coin_Id=programa.coin_Id;
                        $scope.arraysolicitud.Program2_Coin_Symbol=programa.coin_Symbol;
                        $scope.arraysolicitud.Program2_Cost=programa.Program_Cost;
                        $scope.arraysolicitud.Program2_Country_Id=programa.Country_Id;
                        $scope.arraysolicitud.Program2_Country_Name=programa.Country_Name;
                        $scope.arraysolicitud.Program2_Duration=programa.duration;
                        $scope.arraysolicitud.Program2_Duration_Period=programa.duration_period;
                        $scope.arraysolicitud.Program2_Medical_Expenses=programa.Medical_Expenses;
                        $scope.arraysolicitud.Program2_Modality_Id=programa.Modality_Id;
                        $scope.arraysolicitud.Program2_Scholarship_Percentage=programa.Scholarship_Percentage;
                        $scope.arraysolicitud.Program2_Settlement=programa.settlement;
                        $scope.arraysolicitud.Program2_State_Name=programa.State_Name;
                        $scope.arraysolicitud.Program2_TicketSupport=programa.TicketSupport;
                        $scope.arraysolicitud.Program2_University_Name=programa.University_Name;
                        $scope.arraysolicitud.Program2_modality=programa.Modality_Name;
                    }
                    $scope.cambiaropcionprograma=false;
                }
                //$scope.datosPersona.Program2_Id = $scope.programaSegundaOpcion.modelo;
            }

            $scope.borrarFiltros = function(){
            
                AjaxCall("GET", URL_SERVIDOR + "/availableFilters", null, function (response) {
                    $scope.universidad2.opciones = response.datos.universities;
                    $scope.pais2.opciones = response.datos.countries;
                    $scope.clasificacion2.opciones = response.datos.Program_Classifications;
                    $scope.tipo2.opciones = response.datos.Program_Types;
                    $scope.modalidad2.opciones = response.datos.Program_Modalities;
                }, function () {
                    $scope.clasificacion2.modelo = $scope.arraysolicitud.Classification_Id;
                });
            }

            $scope.respuestaCapturarEntrevistaV2 = function(capturar, flag,interprog) {
                if (capturar) {

                    if (arrayentrevista.bach_workshop != "Freelance, empleado, empresario" && arrayentrevista.bach_workshop != "Cuanto cuesta la universidad") { arrayentrevista.bach_workshop = arrayentrevista.bach_workshop_subject;}
                    if ($("#cambioprimeraposgrado").val() == 1) { arraysolicitud.Program1_Id = $("#primerprogramaposgrado").val(); }
                    if ($("#cambiosegundaposgrado").val() == 1) { arraysolicitud.Program2_Id = $("#segundoprogramaposgrado").val(); }
                    if ($scope.intercambioprograma != interprog) {var temp =0; console.log("Intercambio"); temp = arraysolicitud.Program1_Id; arraysolicitud.Program1_Id = arraysolicitud.Program2_Id; arraysolicitud.Program2_Id = temp;$scope.intercambioprograma=interprog;}
                    if ($("#cambioprimeralicenciatura").val() == 1) { arraysolicitud.Program1_Id = $("#primerprogramalicenciatura").val(); }
                    if ($("#cambiosegundalicenciatura").val() == 1) { arraysolicitud.Program2_Id = $("#segundoprogramalicenciatura").val(); }
                    localStorageService.set("arraysolicitud", arraysolicitud);
                    localStorageService.set("arraydetalles", arraydetalles);
                    localStorageService.set("arrayentrevista", arrayentrevista);
                    localStorageService.set("flagtype", flag);
                    //if(flag==0){
                        //$mdDialog.hide();





                    //}else{
                        var newDataInterview = localStorageService.get("arrayentrevista")
                        var newDataApplication = localStorageService.get("arraysolicitud")
                        var newFlagType = localStorageService.get("flagtype")

                        //if (newFlagType == 1) { vm.mostrarCargando(); }
                        //vm.mostrarCargando();
                        $scope.estatus="GUARDANDO DATOS";

                        var dataInterviewToDB = {
                            "Interview_Id": newDataInterview.Interview_Id,
                            "bach_career_alternative" : newDataInterview.bach_career_alternative,
                            "bach_companion" : newDataInterview.bach_companion,
                            "bach_credit_bureau" : newDataInterview.bach_credit_bureau,
                            "bach_expenses_list" : newDataInterview.bach_expenses_list,
                            "bach_extra_subject" : newDataInterview.bach_extra_subject,
                            "bach_extraordinary_exams" : newDataInterview.bach_extraordinary_exams,
                            "bach_father_lives" : newDataInterview.bach_father_lives,
                            "bach_fix_income" : newDataInterview.bach_fix_income,
                            "bach_general_average" : newDataInterview.bach_general_average,
                            "bach_high_school_actual_cost" : newDataInterview.bach_high_school_actual_cost,
                            "bach_high_school_desired_cost" : newDataInterview.bach_high_school_desired_cost,
                            "bach_high_school_specialty" : newDataInterview.bach_high_school_specialty,
                            "bach_home_economics" : newDataInterview.bach_home_economics,
                            "bach_maximum_cost" : newDataInterview.bach_maximum_cost,
                            "bach_mother_lives" : newDataInterview.bach_mother_lives,
                            "bach_parents_civil_status_id" : newDataInterview.bach_parents_civil_status_id,
                            "bach_parents_support" : newDataInterview.bach_parents_support,
                            "bach_siblings" : newDataInterview.bach_siblings,
                            "bach_total_expenses" : newDataInterview.bach_total_expenses,
                            "bach_tutor_enterprise" : newDataInterview.bach_tutor_enterprise,
                            "bach_tutor_job_title" : newDataInterview.bach_tutor_job_title,
                            "bach_tutor_labor_old_years" : newDataInterview.bach_tutor_labor_old_years,
                            "bach_variable_income" : newDataInterview.bach_variable_income,
                            "bach_workshop" : newDataInterview.bach_workshop,
                            "both_actual_salary" : newDataInterview.both_actual_salary,
                            "both_aditional_language" : newDataInterview.both_aditional_language,
                            "both_aditional_language_percentage" : newDataInterview.both_aditional_language_percentage,
                            "both_chinese_percentage" : newDataInterview.both_chinese_percentage,
                            "both_defects" : newDataInterview.both_defects,
                            "both_english_percentage" : newDataInterview.both_english_percentage,
                            "both_enterprise" : newDataInterview.both_enterprise,
                            "both_french_percentage" : newDataInterview.both_french_percentage,
                            "both_general_comments" : newDataInterview.both_general_comments,
                            "both_german_percentage" : newDataInterview.both_german_percentage,
                            "both_job_title" : newDataInterview.both_job_title,
                            "both_labor_old_years" : newDataInterview.both_labor_old_years,
                            "both_languages_comments" : newDataInterview.both_languages_comments,
                            "both_live_with" : newDataInterview.both_live_with,
                            "both_personal_vision" : newDataInterview.both_personal_vision,
                            "both_portuguese_percentage" : newDataInterview.both_portuguese_percentage,
                            "both_professional_vision" : newDataInterview.both_professional_vision,
                            "both_program_reasons" : newDataInterview.both_program_reasons,
                            "both_qualities" : newDataInterview.both_qualities,
                            "both_scholarship_merit" : newDataInterview.both_scholarship_merit,
                            "both_what_if_not" : newDataInterview.both_what_if_not,
                            "both_worker" : newDataInterview.both_worker,
                            //"id" : newDataInterview.id,
                            "post_SR_FB_acknowledgment" : newDataInterview.post_SR_FB_acknowledgment,
                            "post_SR_FB_agreement" : newDataInterview.post_SR_FB_agreement,
                            "post_SR_FB_comments" : newDataInterview.post_SR_FB_comments,
                            "post_additional_founding" : newDataInterview.post_additional_founding,
                            "post_additional_founding_text" : newDataInterview.post_additional_founding_text,
                            "post_budget" : newDataInterview.post_budget,
                            "post_certificated" : newDataInterview.post_certificated,
                            "post_children" : newDataInterview.post_children,
                            "post_labor_experience" : newDataInterview.post_labor_experience,
                            "post_language_accreditation" : newDataInterview.post_language_accreditation,
                            "post_last_semester" : newDataInterview.post_last_semester,
                            "post_other_studies" : newDataInterview.post_other_studies,
                            "post_proud_about" : newDataInterview.post_proud_about,
                            "post_recognition" : newDataInterview.post_recognition,
                            "post_social_labor" : newDataInterview.post_social_labor,
                            "post_social_labor_text" : newDataInterview.post_social_labor_text,
                            "post_university_status" : newDataInterview.post_university_status,
                            "post_university_status_comments" : newDataInterview.post_university_status_comments,
                            "both_comments_section1": newDataInterview.both_comments_section1,
                            "both_comments_section2": newDataInterview.both_comments_section2,
                            "both_comments_section3": newDataInterview.both_comments_section3,
                            "both_comments_section4": newDataInterview.both_comments_section4,
                            "both_comments_section5": newDataInterview.both_comments_section5,
                            "both_comments_section6": newDataInterview.both_comments_section6,
                            "both_comments_section7": newDataInterview.both_comments_section7,
                            "both_comments_section8": newDataInterview.both_comments_section8,
                            "both_comments_section9": newDataInterview.both_comments_section9,
                            "both_comments_section10": newDataInterview.both_comments_section10

                        }

                        var dataApplicationToDB = {
                            "Person_Id": newDataApplication.Person_Id,
                            "Classification_Id": newDataApplication.Classification_Id,
                            "Program1_Id": newDataApplication.Program1_Id,
                            "Program2_Id": newDataApplication.Program2_Id,
                            "status": newDataApplication.status,
                            "How_Did_You_Find": newDataApplication.How_Did_You_Find,
                            "Other_How_Did_You_Find": newDataApplication.Other_How_Did_You_Find,
                            "email": newDataApplication.email,
                            "name": newDataApplication.Person_Name,
                            "lastName": newDataApplication.Person_lastName,
                            "mLastName": newDataApplication.Person_mLastName,
                            "nationality": newDataApplication.nationality,
                            "residenceCountry": newDataApplication.residenceCountry,
                            "gender": newDataApplication.gender,
                            "civilStatus": newDataApplication.civilStatus,
                            "phoneHome": newDataApplication.phoneHome,
                            "phoneOffice": newDataApplication.phoneOffice,
                            "cellphone": newDataApplication.cellphone,
                            "birthdate": newDataApplication.birthdate,
                            "street": newDataApplication.street,
                            "outdoorNumber": newDataApplication.outdoorNumber,
                            "indoorNumber": newDataApplication.indoorNumber,
                            "neighborhood": newDataApplication.neighborhood,
                            "state": newDataApplication.state,
                            "zipCode": newDataApplication.zipCode,
                            "facebook": newDataApplication.facebook,
                            "skype": newDataApplication.skype,
                            "lastGrade": newDataApplication.lastGrade,
                            "lastSchool": newDataApplication.lastSchool,
                            "Type_Id": "5"
                        }

                        AjaxCall("POST", URL_SERVIDOR + "/Application/update/" + newDataApplication.id, dataApplicationToDB, function (response) {
                            $scope.$apply(function () {
                                if (response.Codigo != 200){  }
                            });
                        }, function () {});
                        AjaxCall("POST", URL_SERVIDOR + "/ApplicationDetail/update/" + arraydetalles.id, arraydetalles, function (response) {
                            $scope.$apply(function () {
                                if (response.Codigo != 200){  }
                            });
                        }, function () {});

                        AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/store/" + newFlagType, dataInterviewToDB, function (response) {
                            $scope.$apply(function () {
                                
                                if (response.Codigo >= 200 && response.Codigo <= 299) {
                                    $scope.estatus = "DATOS GUARDADOS CORRECTAMENTE";
                                } else {
                                    $scope.estatus = "OCURRIO UN ERROR AL GUARDAR";
                                }
                                //vm.initDatatable();
                                //vm.cerrarCargando();
                                //document.body.scrollTop = 0; // For Safari
                                //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

                            });
                        }, function () {},
                        function (jqXHR, exception) { //ERROR EN CONSUMO DE API
                            var msg = '';
                            if (jqXHR.status === 0) {
                                msg = 'ERROR EN LA CONEXIÓN.';
                            } else if (jqXHR.status == 404) {
                                msg = 'Requested page not found. [404]';
                            } else if (jqXHR.status == 500) {
                                msg = 'ERROR DE RESPUESTA EN SERVIDOR [500]';
                            } else if (exception === 'parsererror') {
                                msg = 'Requested JSON parse failed.';
                            } else if (exception === 'timeout') {
                                msg = 'Time out error.';
                            } else if (exception === 'abort') {
                                msg = 'Ajax request aborted.';
                            } else {
                                msg = 'Error desconocido.\n' + jqXHR.responseText;
                            }
                            $scope.estatus = msg;
                            //document.body.scrollTop = 0; // For Safari
                            //.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        });
                    //} 
                    $scope.estatus = "";

                    $("#id_entrevista").animate({ scrollTop: 0 }, "fast");
                } else {
                    $mdDialog.cancel();
                    //vm.mostrarCargando();
                    //vm.initDatatable();
                    //vm.cerrarCargando();
                }
            };

        }
        // <========== CONTROLLER CAPTURAR ENTREVISTA V2 ==========>


        // <========== METODO GUARDAR ENTREVISTA V2==========>
        $scope.guardarEntrevistaV2 = function () {

            var newDataInterview = localStorageService.get("arrayentrevista")
            var newDataApplication = localStorageService.get("arraysolicitud")
            var newFlagType = localStorageService.get("flagtype")

            //if (newFlagType == 1) { vm.mostrarCargando(); }
            vm.mostrarCargando();

            var dataInterviewToDB = {
                "Interview_Id": newDataInterview.Interview_Id,
                "bach_career_alternative" : newDataInterview.bach_career_alternative,
                "bach_companion" : newDataInterview.bach_companion,
                "bach_credit_bureau" : newDataInterview.bach_credit_bureau,
                "bach_expenses_list" : newDataInterview.bach_expenses_list,
                "bach_extra_subject" : newDataInterview.bach_extra_subject,
                "bach_extraordinary_exams" : newDataInterview.bach_extraordinary_exams,
                "bach_father_lives" : newDataInterview.bach_father_lives,
                "bach_fix_income" : newDataInterview.bach_fix_income,
                "bach_general_average" : newDataInterview.bach_general_average,
                "bach_high_school_actual_cost" : newDataInterview.bach_high_school_actual_cost,
                "bach_high_school_desired_cost" : newDataInterview.bach_high_school_desired_cost,
                "bach_high_school_specialty" : newDataInterview.bach_high_school_specialty,
                "bach_home_economics" : newDataInterview.bach_home_economics,
                "bach_maximum_cost" : newDataInterview.bach_maximum_cost,
                "bach_mother_lives" : newDataInterview.bach_mother_lives,
                "bach_parents_civil_status_id" : newDataInterview.bach_parents_civil_status_id,
                "bach_parents_support" : newDataInterview.bach_parents_support,
                "bach_siblings" : newDataInterview.bach_siblings,
                "bach_total_expenses" : newDataInterview.bach_total_expenses,
                "bach_tutor_enterprise" : newDataInterview.bach_tutor_enterprise,
                "bach_tutor_job_title" : newDataInterview.bach_tutor_job_title,
                "bach_tutor_labor_old_years" : newDataInterview.bach_tutor_labor_old_years,
                "bach_variable_income" : newDataInterview.bach_variable_income,
                "bach_workshop" : newDataInterview.bach_workshop,
                "both_actual_salary" : newDataInterview.both_actual_salary,
                "both_aditional_language" : newDataInterview.both_aditional_language,
                "both_aditional_language_percentage" : newDataInterview.both_aditional_language_percentage,
                "both_chinese_percentage" : newDataInterview.both_chinese_percentage,
                "both_defects" : newDataInterview.both_defects,
                "both_english_percentage" : newDataInterview.both_english_percentage,
                "both_enterprise" : newDataInterview.both_enterprise,
                "both_french_percentage" : newDataInterview.both_french_percentage,
                "both_general_comments" : newDataInterview.both_general_comments,
                "both_german_percentage" : newDataInterview.both_german_percentage,
                "both_job_title" : newDataInterview.both_job_title,
                "both_labor_old_years" : newDataInterview.both_labor_old_years,
                "both_languages_comments" : newDataInterview.both_languages_comments,
                "both_live_with" : newDataInterview.both_live_with,
                "both_personal_vision" : newDataInterview.both_personal_vision,
                "both_portuguese_percentage" : newDataInterview.both_portuguese_percentage,
                "both_professional_vision" : newDataInterview.both_professional_vision,
                "both_program_reasons" : newDataInterview.both_program_reasons,
                "both_qualities" : newDataInterview.both_qualities,
                "both_scholarship_merit" : newDataInterview.both_scholarship_merit,
                "both_what_if_not" : newDataInterview.both_what_if_not,
                "both_worker" : newDataInterview.both_worker,
                //"id" : newDataInterview.id,
                "post_SR_FB_acknowledgment" : newDataInterview.post_SR_FB_acknowledgment,
                "post_SR_FB_agreement" : newDataInterview.post_SR_FB_agreement,
                "post_SR_FB_comments" : newDataInterview.post_SR_FB_comments,
                "post_additional_founding" : newDataInterview.post_additional_founding,
                "post_additional_founding_text" : newDataInterview.post_additional_founding_text,
                "post_budget" : newDataInterview.post_budget,
                "post_certificated" : newDataInterview.post_certificated,
                "post_children" : newDataInterview.post_children,
                "post_labor_experience" : newDataInterview.post_labor_experience,
                "post_language_accreditation" : newDataInterview.post_language_accreditation,
                "post_last_semester" : newDataInterview.post_last_semester,
                "post_other_studies" : newDataInterview.post_other_studies,
                "post_proud_about" : newDataInterview.post_proud_about,
                "post_recognition" : newDataInterview.post_recognition,
                "post_social_labor" : newDataInterview.post_social_labor,
                "post_social_labor_text" : newDataInterview.post_social_labor_text,
                "post_university_status" : newDataInterview.post_university_status,
                "post_university_status_comments" : newDataInterview.post_university_status_comments,
                "both_comments_section1": newDataInterview.both_comments_section1,
                "both_comments_section2": newDataInterview.both_comments_section2,
                "both_comments_section3": newDataInterview.both_comments_section3,
                "both_comments_section4": newDataInterview.both_comments_section4,
                "both_comments_section5": newDataInterview.both_comments_section5,
                "both_comments_section6": newDataInterview.both_comments_section6,
                "both_comments_section7": newDataInterview.both_comments_section7,
                "both_comments_section8": newDataInterview.both_comments_section8,
                "both_comments_section9": newDataInterview.both_comments_section9,
                "both_comments_section10": newDataInterview.both_comments_section10

            }

            var dataApplicationToDB = {
                "Person_Id": newDataApplication.Person_Id,
                "Classification_Id": newDataApplication.Classification_Id,
                "Program1_Id": newDataApplication.Program1_Id,
                "Program2_Id": newDataApplication.Program2_Id,
                "status": newDataApplication.status,
                "How_Did_You_Find": newDataApplication.How_Did_You_Find,
                "Other_How_Did_You_Find": newDataApplication.Other_How_Did_You_Find,
                "email": newDataApplication.email,
                "name": newDataApplication.Person_Name,
                "lastName": newDataApplication.Person_lastName,
                "mLastName": newDataApplication.Person_mLastName,
                "nationality": newDataApplication.nationality,
                "residenceCountry": newDataApplication.residenceCountry,
                "gender": newDataApplication.gender,
                "civilStatus": newDataApplication.civilStatus,
                "phoneHome": newDataApplication.phoneHome,
                "phoneOffice": newDataApplication.phoneOffice,
                "cellphone": newDataApplication.cellphone,
                "birthdate": newDataApplication.birthdate,
                "street": newDataApplication.street,
                "outdoorNumber": newDataApplication.outdoorNumber,
                "indoorNumber": newDataApplication.indoorNumber,
                "neighborhood": newDataApplication.neighborhood,
                "state": newDataApplication.state,
                "zipCode": newDataApplication.zipCode,
                "facebook": newDataApplication.facebook,
                "skype": newDataApplication.skype,
                "lastGrade": newDataApplication.lastGrade,
                "lastSchool": newDataApplication.lastSchool,
                "Type_Id": "5"
            }

            swal({
                title: "Se guardarán los datos de la entrevista.",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(function (click) {
                if (click) {

                    AjaxCall("POST", URL_SERVIDOR + "/Application/update/" + newDataApplication.id, dataApplicationToDB, function (response) {
                        $scope.$apply(function () {
                            if (response.Codigo != 200){  }
                        });
                    }, function () {});

                    AjaxCall("POST", URL_SERVIDOR + "/InterviewDetail/store/" + newFlagType, dataInterviewToDB, function (response) {
                        $scope.$apply(function () {
                            
                            if (response.Codigo >= 200 && response.Codigo <= 299) {
                                swal({
                                    title: "Guardado",
                                    text: response.mensaje,
                                    icon: "success",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {});
                                //vm.initDatatable();
                            } else {
                                swal({
                                    title: "¡Atención!",
                                    text: "Ningún cambio hecho (" + response.mensaje + ")",
                                    icon: "error",
                                    buttons: false,
                                    timer: 2000,
                                    dangerMode: false
                                }).then(function() {});
                                //vm.initDatatable();
                            }
                            vm.initDatatable();
                            vm.cerrarCargando();

                        });
                    }, function () {},
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

                } else {
                    swal({
                        title: "¡Atención!",
                        text: "Ningún cambio hecho",
                        icon: "error",
                        buttons: false,
                        timer: 2000,
                        dangerMode: false
                    }).then(function() {});
                    vm.initDatatable();
                }
            });
        }
        // <========== METODO GUARDAR ENTREVISTA V2==========>



        // <========== CALIFICAR ENTREVISTA ==========>
        $scope.calificarEntrevista = function (entrevista) {
            localStorageService.set("entrevista_id", entrevista.interview_Id)

            vm.mostrarCargando();

            var data = [];
            var data = {
                "interview_Id": entrevista.interview_Id
            }

            var criterialIds = [];
            var criterialNames = [];
            var criterialValues = [];

            AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/listinterview", data, function (response) {
                $scope.$apply(function () {

                    if (response.Codigo == 200) {

                        criterialIds.push({
                            "item1": response.datos[0].id,
                            "item2": response.datos[1].id,
                            "item3": response.datos[2].id,
                            "item4": response.datos[3].id
                        })

                        criterialNames.push({
                            "item1": response.datos[0].name,
                            "item2": response.datos[1].name,
                            "item3": response.datos[2].name,
                            "item4": response.datos[3].name
                        })

                        criterialValues.push({
                            "item1": response.datos[0].Score,
                            "item2": response.datos[1].Score,
                            "item3": response.datos[2].Score,
                            "item4": response.datos[3].Score
                        })
                        
                    } else {
                        
                    }
                });
            }, function() {

                vm.cerrarCargando();

                $mdDialog.show({
                    locals: {
                        solicitante: entrevista.applicant,
                        criterialIds: criterialIds[0],
                        criterialNames: criterialNames[0],
                        criterialValues: criterialValues[0]
                    },
                    controller: CalificarEntrevistaController,
                    templateUrl: 'app/main/entrevistas/entrevista_fecha/html/dialogo.calificarentrevista.html',
                    parent: angular.element(document.body),
                    targetEvent: entrevista,
                    clickOutsideToClose: false,
                    fullscreen: false
                }).then(function () {

                    swal({
                        title: "¿Estas seguro?",
                        text: "",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then(function (click) {
                        if (click) {
                            $scope.saveScoresInterview();
                            swal({
                                title: "¡Éxito!",
                                text: "Datos almacenados correctamente",
                                icon: "success",
                                buttons: false,
                                timer: 2000,
                                dangerMode: false
                            }).then(function() { vm.initDatatable(); });
                            vm.initDatatable();
                        } else {
                            swal({
                                title: "¡Atención!",
                                text: "Ningún cambio hecho",
                                icon: "error",
                                buttons: false,
                                timer: 2000,
                                dangerMode: false
                            }).then(function() { vm.initDatatable(); });
                            vm.initDatatable();
                        }
                    });

                }, function () {});
            });
        }
        // <========== CALIFICAR ENTREVISTA ==========>

        // <========== CONTROLLER CALIFICAR ENTREVISTA ==========>
        function CalificarEntrevistaController($scope, $mdDialog, solicitante, criterialIds, criterialNames, criterialValues,localStorageService) {
            $scope.solicitante = solicitante;
            $scope.criterialIds = criterialIds;
            $scope.criterialNames = criterialNames;
            $scope.criterialValues = criterialValues;
            $scope.uType = localStorageService.get("session_typeId");

            $scope.respuestaCalificarEntrevista = function (calificar) {
                if (calificar) {
                    localStorageService.set("criterialIds", criterialIds)
                    localStorageService.set("criterialValues", criterialValues)
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };
        }
        // <========== CONTROLLER CALIFICAR ENTREVISTA ==========>

        // <========== GUARDAR CALIFICACION ==========>
        $scope.saveScoresInterview = function () {

            var newDataCriterialIds =  localStorageService.get("criterialIds")
            var newDataCriterialValues =  localStorageService.get("criterialValues")

            var newDataScore1 = { Score: newDataCriterialValues.item1 }
            var newDataScore2 = { Score: newDataCriterialValues.item2 }
            var newDataScore3 = { Score: newDataCriterialValues.item3 }
            var newDataScore4 = { Score: newDataCriterialValues.item4 }

            AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/update/" + newDataCriterialIds.item1, newDataScore1, function (response) {
                $scope.$apply(function () {});
            }, function() {});

            AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/update/" + newDataCriterialIds.item2, newDataScore2, function (response) {
                $scope.$apply(function () {});
            }, function() {});

            AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/update/" + newDataCriterialIds.item3, newDataScore3, function (response) {
                $scope.$apply(function () {});
            }, function() {});

            AjaxCall("POST", URL_SERVIDOR + "/InterviewQualificationCriteria/update/" + newDataCriterialIds.item4, newDataScore4, function (response) {
                $scope.$apply(function () {});
            }, function() {});
        }
        // <========== GUARDAR CALIFICACION ==========>

        // <========== FINALIZAR ENTREVISTA ==========>
        $scope.finalizarEntrevista = function (entrevista) {
            var array_programs = [];
            AjaxCall("GET", URL_SERVIDOR + "/ChannelingProgram", null, function (response) {
                $scope.$apply(function () {
                    array_programs = response.datos;
                    $mdDialog.show({
                        locals: { 
                            array_programs: array_programs,
                            entrevista: entrevista
                        },
                        controller: FinalizarEntrevistaController,
                        templateUrl: 'app/main/entrevistas/entrevista_fecha/html/dialogo.finalizarentrevista.html',
                        parent: angular.element(document.body),
                        targetEvent: entrevista,
                        clickOutsideToClose: false,
                        fullscreen: false
                    }).then(function () {
                        $scope.finalizarEntrevistaCanalizacion(entrevista);
                    }, function() {});
                });
            }, function() {});
        };
        // <========== FINALIZAR ENTREVISTA ==========>

        // <========== CONTROLLLER FINALIZAR ENTREVISTA ==========>
        function FinalizarEntrevistaController($scope, $mdDialog, array_programs, entrevista) {
            $scope.array_programs = array_programs;
            $scope.entrevista = entrevista;

            $scope.canalize_to_array = [];
            $scope.canalize_to = null;
            //$scope.canalize_aux = null;
            
            $scope.recomendacion = "INDEFINIDO";

            if(entrevista.text_Score=='C'){
                $scope.recomendacion = "RECHAZADO";
            }else if(entrevista.text_Score=='A+'){
                $scope.recomendacion = "ACEPTADO";
            }

            $scope.agregarCanalizacion = function(canalize_aux){
                //debugger;
                //console.log(canalize_aux);
                var objCanalizeAux = JSON.parse(canalize_aux);
                var i= $scope.canalize_to_array.find(function(x){return x.id == objCanalizeAux.id});
                if(!i){
                    $scope.canalize_to_array.push(objCanalizeAux);
                }
            }

            $scope.respuestaFinalizarEntrevista = function (respuesta, estatusSolicitud) {
                //debugger;

                //i=-1;
                var c =[];

                $scope.canalize_to_array.forEach(function(e){
                    c.push({program:e.id});
                })
                if(c.length>0){
                    $scope.canalize_to=JSON.stringify(c);
                }

                if (respuesta) {
                    localStorageService.set("canalize_to", $scope.canalize_to);
                    localStorageService.set("estatusSolicitud", estatusSolicitud);
                    $mdDialog.hide();
                } else {
                    $mdDialog.cancel();
                }
            };

            $scope.eliminarCanalizacion = function(canalize_aux){
                //debugger;
                //var objCanalizeAux = JSON.parse(canalize_aux);
                var i = $scope.canalize_to_array.findIndex(function(x){return x.id == canalize_aux.id});
                if(i > -1){
                    $scope.canalize_to_array.splice(i,1);
                }
            }
        }
        // <========== CONTROLLLER FINALIZAR ENTREVISTA ==========>

        // <========== FINALIZAR ENTREVISTA ==========>
        $scope.finalizarEntrevistaCanalizacion = function (entrevista) {
            //debugger;
            var id = entrevista.interview_Id;
            var canalizeId = localStorageService.get("canalize_to");
            var estatusSolicitud = localStorageService.get("estatusSolicitud");
            var data = {
                "canalize_to": canalizeId,
                "status_application":estatusSolicitud
            };
            AjaxCall("POST", URL_SERVIDOR + "/Interview/finish/" + id, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.initDatatable();
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.initDatatable();
                    }
                });
            }, function () {});
        }
        // <========== FINALIZAR ENTREVISTA ==========>


        /******************************************************************/
        /*                 MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        $scope.dlgcancelarSolicitud = function (ev, entrevista) {
            $mdDialog.show({
                locals: { localEntrevista : entrevista },
                controller: CancelarSolicitudController,
                templateUrl: 'app/main/validacionUniversidad/html/dialogo.cancelarsolicitud.html',
                parent: angular.element('body'),
                targetEvent: entrevista,
                clickOutsideToClose: false,
                fullscreen: false
            }).then(function () {
                $scope.cancelarSolicitud(entrevista)
            }, function() {});
        };
        // <==========  ==========>

        // <========== CONTROLLER  ==========>
        function CancelarSolicitudController($scope, $mdDialog,localEntrevista) {
            //$scope.array_programs = array_programs;
            $scope.respuestaCancelarSolicitud = function (respuesta, motivocancelacion) {
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

        $scope.cancelarSolicitud = function (entrevista) {
            var id = entrevista.application_Id;
            var cancelreason = localStorageService.get("cancel_reason");
            var data = {
                "cancel_reason": cancelreason
            };
            AjaxCall("POST", URL_SERVIDOR + "/Application/opCancel/" + id, data, function (response) {
                $scope.$apply(function () {
                    if (response.Codigo >= 200 && response.Codigo <= 299) {
                        swal({
                            title: "¡Éxito!",
                            text: response.mensaje,
                            icon: "success",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.initDatatable();
                    } else {
                        swal({
                            title: "¡Atención!",
                            text: response.mensaje,
                            icon: "error",
                            buttons: false,
                            timer: 2000,
                            dangerMode: false
                        }).then(function() {});
                        vm.initDatatable();
                    }
                });
            }, function () {});
        }

        /******************************************************************/
        /*             FIN MODAL PARA CANCELAR SOLICITUD                  */
        /******************************************************************/

        // <========== OBTENER EL CONTENIDO DE LA ENTREVISTA PARA LA TABLA ==========>
        function initDatatable() {
            var data = {
                "email": localStorageService.get('session_email')
            };
            $scope.entrevistas = [];
            AjaxCall("POST", URL_SERVIDOR + "/Interview/listassignedactive", data, function (response) {
                $scope.$apply(function () {
                    for (var index = 0; index < response.datos.length; index++) {
                        $scope.entrevistas.push({
                            Classification_Id: response.datos[index].Classification_Id,
                            Person_Id: response.datos[index].Person_Id,
                            ProgramName: response.datos[index].ProgramName,
                            Program_Classification: response.datos[index].Program_Classification,
                            applicant: response.datos[index].applicant,
                            application_Id: response.datos[index].application_Id,
                            date: moment(response.datos[index].date).format('DD/MM/YYYY - hh:mm a'),
                            email: response.datos[index].email,
                            id: response.datos[index].id,
                            interview_Id: response.datos[index].interview_Id,
                            number_Score: response.datos[index].number_Score,
                            status: response.datos[index].status,
                            text_Score: response.datos[index].text_Score,
                            application_details: response.datos[index].application_detail
                        });
                    }
                });
            }, function() {});
        }
        // <========== OBTENER EL CONTENIDO DE LA ENTREVISTA PARA LA TABLA ==========>

        vm.initDatatable();
    }
})();