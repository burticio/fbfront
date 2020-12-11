(function () {
    'use strict';

    /**
     * Main module of the Fuse
     */
    angular
        .module('fuse', [
            // Core
            'app.core',
            // Navigation
            'app.navigation',
            // Toolbar
            'app.toolbar',
            // Quick Panel
            'app.quick-panel',
            'app.inicio_solicitante',
            'app.inicio_operador',
            'app.inicio_supervisor',
            'app.inicio_comite',
            'app.inicio_super',
            'app.inicio_operador_vista',
            'app.pages',

            'oitozero.ngSweetAlert',
            'LocalStorageModule',
            'app.catalogos',
            'app.documentoSolicitante',
            'app.documentoSolicitanteCompletos',
            'app.documentoSolicitanteIncompletos',
            'app.documentoSolicitanteVacios',
            'app.documentosSolicitanteAsignacion',
            'app.solicitudesActivas',
            'app.solicitudesCanceladas',
            'app.solicitudesCompletas',
            'app.validacionUniversidad',
            'app.crearComite',
            'app.verComite',
            'app.detalleComite',
            'app.donaciones',

            'app.busquedaPrograma',
            'app.detallePrograma',
            'app.solicitud',
            'app.solicitudv2',
            'app.validarDocumentos',
            'app.asignacion_entrevista',
            'app.orientacionVocacional',
            'app.ver_orientacionV',
            'app.reportes',
            'app.reporteaceptadas',
            'app.reporteemas',
            'app.reporteotros',
            'app.entrevistas',
            'app.entrevista_fecha',
            'app.programascanalizacion',
            'app.reportesOperacion',
            'app.reportesSabanaGeneral',
            'app.reportesUniversidad',
            'app.verEntrevista'
        ]).config(function (localStorageServiceProvider, $mdDateLocaleProvider, msNavigationServiceProvider,$qProvider) {
            localStorageServiceProvider
                .setPrefix('fuse')
                .setStorageType('sessionStorage')
                .setNotify(true, true);

            $mdDateLocaleProvider.formatDate = function (date) {
                return date ? moment(date).format('YYYY-MM-DD') : '';
            };

            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'YYYY-MM-DD', true);
                return m.isValid() ? m.toDate() : new Date(NaN);
            };

            $qProvider.errorOnUnhandledRejections(false);

            /*
                Catálogos
            */

            msNavigationServiceProvider.saveItem('apps', {
                title: 'Administración',
                group: true
            });
            
            msNavigationServiceProvider.saveItem('apps.donaciones', {
                title: 'Donaciones',
                icon: "icon-currency-btc",            
                state: 'app.donaciones'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos', {
                title: 'Catálogos',
                icon: 'icon-tile-four'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.usuarios', {
                title: 'Usuarios',
                icon: "icon-account",
                state: 'app.catalogos_usuarios'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.monedas', {
                title: 'Monedas',
                icon: "icon-currency-btc",
                state: 'app.catalogos_monedas'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.modalidadPrograma', {
                title: 'Modalidad Programa',
                icon: "icon-note-outline",
                state: 'app.catalogos_modalidadPrograma'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.areaPrograma', {
                title: 'Area Programa',
                icon: "icon-square-inc",
                state: 'app.catalogos_areaPrograma'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.docPrograma', {
                title: 'Documentos',
                icon: "icon-document",
                state: 'app.catalogos_docPrograma'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.criterios', {
                title: 'Criterios',
                icon: "icon-view-list",
                state: 'app.entrevistas_criterios'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.calificaciones', {
                title: 'Calificaciones',
                icon: "icon-poll",
                state: 'app.entrevistas_calificaciones'
            });

            // msNavigationServiceProvider.saveItem('apps.catalogos.subAreaPrograma', {
            //     title: 'Sub-Area Programa',
            //     icon: "icon-vector-square",
            //     state: 'app.catalogos_subAreaPrograma'
            // });

            msNavigationServiceProvider.saveItem('apps.catalogos.universidad', {
                title: 'Universidades',
                icon: "icon-school",
                state: 'app.catalogos_universidad'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.programa', {
                title: 'Programa',
                icon: "icon-content-paste",
                state: 'app.catalogos_programa'
            });


            msNavigationServiceProvider.saveItem('apps.catalogos.convocatorias', {
                title: 'Convocatorias',
                icon: "icon-cast-connected",
                state: 'app.catalogos_convocatorias'
            });

            msNavigationServiceProvider.saveItem('apps.catalogos.programascanalizacion', {
                title: 'Programas de Canalización',
                icon: "icon-basket-unfill",
                state: 'app.programascanalizacion'
            });

          
            /*Orientacion Vocacional
            */

            // msNavigationServiceProvider.saveItem('ver_orientacionV', {
            //     title: 'Orientación Voc.',
            //     state: 'app.ver_orientacionV',
            //     icon: 'icon-content-paste'
            // });

            msNavigationServiceProvider.saveItem('apps.solicitudes', {
                title: 'Solicitudes',
                icon: 'icon-tile-four'
            });

            msNavigationServiceProvider.saveItem('apps.solicitudes.solicitudesActivas', {
                title: 'Solicitudes Activas',
                icon: "icon-file-document-box",            
                state: 'app.solicitudesActivas'
            });

            

            msNavigationServiceProvider.saveItem('apps.solicitudes.solicitudesCanceladas', {
                title: 'Solicitudes Canceladas',
                icon: "icon-close",            
                state: 'app.solicitudesCanceladas'
            });

            msNavigationServiceProvider.saveItem('apps.solicitudes.solicitudesCompletas', {
                title: 'Solicitudes Completas',
                icon: "icon-check",            
                state: 'app.solicitudesCompletas'
            });

            msNavigationServiceProvider.saveItem('apps.docsSol', {
                title: 'Documentos de solicitud',
                icon: 'icon-file-document'
            });

            msNavigationServiceProvider.saveItem('apps.docsSol.documentoSolicitante', {
                title: 'General',
                state: 'app.documentoSolicitante',
                icon: 'icon-file-document'
            });
            msNavigationServiceProvider.saveItem('apps.docsSol.documentoSolicitanteCompletos', {
                title: 'Completos',
                state: 'app.documentoSolicitanteCompletos',
                icon: 'icon-file-document'
            });
            msNavigationServiceProvider.saveItem('apps.docsSol.documentoSolicitanteIncompletos', {
                title: 'Incompletos',
                state: 'app.documentoSolicitanteIncompletos',
                icon: 'icon-file-document'
            });
            msNavigationServiceProvider.saveItem('apps.docsSol.documentoSolicitanteVacios', {
                title: 'Vacios',
                state: 'app.documentoSolicitanteVacios',
                icon: 'icon-file-document'
            });
         
            /*
                Entrevistas
            */
            msNavigationServiceProvider.saveItem('apps.entrevistas', {
                title: 'Entrevistas',
                icon: 'icon-tile-four'
            });

            msNavigationServiceProvider.saveItem('apps.asignacion_entrevista', {
                title: 'Entrevistas - Asignar agente',
                icon: 'icon-calendar-clock',
                state: 'app.asignacion_entrevista'
            });

            msNavigationServiceProvider.saveItem('apps.entrevista_fecha', {
                title: 'Entrevistas - Capturar Entrevistas',
                icon: 'icon-calendar-clock',
                state: 'app.entrevista_fecha'
            });

            msNavigationServiceProvider.saveItem('apps.crearComite', {
                title: 'Sesiones de Comité',
                state: 'app.crearComite',
                icon: 'icon-comment-account-outline'
            });

            msNavigationServiceProvider.saveItem('apps.validacionUniversidad', {
                title: 'Validación de Universidad',
                state: 'app.validacionUniversidad',
                icon: 'icon-comment-check-outline'
            });

            msNavigationServiceProvider.saveItem('apps.documentosSolicitanteAsignacion', {
                title: 'Documentos de Aceptación',
                state: 'app.documentosSolicitanteAsignacion',
                icon: 'icon-file'
            }); 

            msNavigationServiceProvider.saveItem('apps.informes', {
                title: 'Reportes',
                icon: 'icon-library-books'
            });           

            msNavigationServiceProvider.saveItem('apps.informes', {
                title: 'Informes',
                icon: 'icon-library-books'
            });

            msNavigationServiceProvider.saveItem('apps.informes.reportesSabanaGeneral', {
                title: 'Sabana de Solicitudes',
                icon: "icon-clipboard-text",
                state: 'app.reportesSabanaGeneral'
            });

            msNavigationServiceProvider.saveItem('apps.informes.reportesOperacion', {
                title: 'Reportes de Operación',
                icon: "icon-clipboard-text",
                state: 'app.reportesOperacion'
            });

            msNavigationServiceProvider.saveItem('apps.informes.reportesUniversidad', {
                title: 'Reportes por Universidad',
                icon: "icon-clipboard-text",
                state: 'app.reportesUniversidad'
            });

            msNavigationServiceProvider.saveItem('apps.reportes.reporteaceptadasgenerales', {
                title: 'Aceptadas Totales',
                icon: "icon-clipboard-text",
                state: 'app.reporteaceptadasgenerales'
            });
            

            msNavigationServiceProvider.saveItem('apps.reportes.reporteaceptadas', {
                title: 'Aceptadas',
                icon: "icon-clipboard-text",
                state: 'app.reporteaceptadas'
            });

            msNavigationServiceProvider.saveItem('apps.reportes.reporterechazadas', {
                title: 'Rechazadas',
                icon: "icon-clipboard-text",
                state: 'app.reporterechazadas'
            });

            msNavigationServiceProvider.saveItem('apps.reportes.reporteemas', {
                title: 'Canalizados E-Más',
                icon: "icon-clipboard-text",
                state: 'app.reporteemas'
            });

            msNavigationServiceProvider.saveItem('apps.reportes.reporteotros', {
                title: 'Canalizados Otros',
                icon: "icon-clipboard-text",
                state: 'app.reporteotros'
            });

        });
})();